import { getServiceRoleClient } from "../supabase";
import { calculateConfidence } from "./confidence";
import { calculateSocialValuation } from "./social";
import { calculateWebsiteValuation } from "./website";
import { calculateDomainValuation } from "./domain";
import { calculateCommunityValuation } from "./communities";
import { MARKET_DEMAND_RULES, DEFAULT_MARKET_DEMAND } from "./multipliers";
import { ValuationResult } from "./types";

/**
 * Calculates and persists the valuation report for an asset.
 * Integrates trust verification, quality score, valuation ranges, market demand, and explainability.
 */
export async function runAssetValuation(
  assetId: string,
  assetScore: number,
  scoreBreakdown: Record<string, number>,
  strengths: string[],
  weaknesses: string[],
  assetHealth: string
): Promise<ValuationResult> {
  const supabase = getServiceRoleClient();

  // 1. Fetch asset details
  const { data: asset, error: assetErr } = await supabase
    .from("valuation_assets")
    .select("*")
    .eq("id", assetId)
    .single();

  if (assetErr || !asset) {
    throw new Error(`Asset not found for valuation: ${assetId}`);
  }

  // 2. Fetch submitted metrics
  const { data: submittedMetrics } = await supabase
    .from("valuation_asset_metrics")
    .select("*")
    .eq("asset_id", assetId)
    .maybeSingle();

  // 3. Fetch completed verification uploads (to merge verified OCR figures)
  const { data: uploads } = await supabase
    .from("verification_uploads")
    .select("*")
    .eq("asset_id", assetId)
    .eq("upload_status", "completed");

  // 4. Fetch latest verification results trust score
  const { data: verifyResult } = await supabase
    .from("verification_results")
    .select("verification_score")
    .eq("asset_id", assetId)
    .maybeSingle();

  const verificationScore = verifyResult?.verification_score ?? 20; // Default to self-reported baseline if none

  // --- Step A: Calculate Confidence Score & Label ---
  const { confidenceScore, confidenceLabel } = calculateConfidence(assetScore, verificationScore);

  // --- Step B: Combine submitted metrics and OCR verified metrics ---
  const combinedMetrics: Record<string, any> = {
    url: asset.url,
    platform: asset.platform,
    ...submittedMetrics,
    metadata: {
      ...(submittedMetrics?.metadata || {}),
    },
  };

  if (uploads && uploads.length > 0) {
    uploads.forEach((up) => {
      if (up.extracted_json && typeof up.extracted_json === "object") {
        Object.entries(up.extracted_json).forEach(([k, v]) => {
          if (v !== undefined && v !== null && v !== 0) {
            combinedMetrics[k] = v;
          }
        });
      }
    });
  }

  // --- Step C: Compute Market Demand Score ---
  const platformLower = asset.platform.toLowerCase();
  const nicheLower = (submittedMetrics?.niche || "general").toLowerCase().trim();
  
  let marketDemand = DEFAULT_MARKET_DEMAND;
  const matchedRule = MARKET_DEMAND_RULES.find((rule) => {
    const platformMatch = platformLower.includes(rule.platform);
    const nicheMatch = nicheLower.includes(rule.niche) || rule.niche === "general";
    return platformMatch && nicheMatch;
  });

  if (matchedRule) {
    marketDemand = matchedRule.score;
  }

  // --- Step D: Route to Platform Scorer & Calculate Valuation ---
  const isCommunityPlatform = ["telegram", "whatsapp", "discord", "facebook group"].some((p) =>
    platformLower.includes(p)
  );

  let valuationMin = 0;
  let valuationMax = 0;
  let valuationBreakdown: Record<string, any> = {};
  let explainability: string[] = [];

  if (isCommunityPlatform) {
    const result = calculateCommunityValuation(combinedMetrics, assetScore);
    valuationMin = result.estimatedMin;
    valuationMax = result.estimatedMax;
    valuationBreakdown = result.breakdown;
    explainability = result.explainability;
  } else if (asset.asset_type === "social") {
    const result = calculateSocialValuation(combinedMetrics, assetScore);
    valuationMin = result.estimatedMin;
    valuationMax = result.estimatedMax;
    valuationBreakdown = result.breakdown;
    explainability = result.explainability;
  } else if (asset.asset_type === "website") {
    const result = calculateWebsiteValuation(combinedMetrics, assetScore);
    valuationMin = result.estimatedMin;
    valuationMax = result.estimatedMax;
    valuationBreakdown = result.breakdown;
    explainability = result.explainability;
  } else if (asset.asset_type === "domain") {
    const result = calculateDomainValuation(combinedMetrics, assetScore);
    valuationMin = result.estimatedMin;
    valuationMax = result.estimatedMax;
    valuationBreakdown = result.breakdown;
    explainability = result.explainability;
  } else {
    // Fallback Website
    const result = calculateWebsiteValuation(combinedMetrics, assetScore);
    valuationMin = result.estimatedMin;
    valuationMax = result.estimatedMax;
    valuationBreakdown = result.breakdown;
    explainability = result.explainability;
  }

  // --- Step E: Add Global Explainability Bullets ---
  if (verificationScore >= 70) {
    explainability.push(`High verification score (${verificationScore}/100) from verified proofs increased overall confidence.`);
  } else {
    explainability.push(`Verification score of ${verificationScore}/100 indicates self-reported details; uploading more screenshot proofs will increase estimate confidence.`);
  }

  explainability.push(
    `Market demand score of ${marketDemand}/100 indicates ${
      marketDemand >= 80 ? "strong buyer demand and high resale liquidity" : "stable buyer interest"
    } for ${asset.platform} assets in the "${submittedMetrics?.niche || "General"}" niche.`
  );

  // --- Step F: Persist to valuation_reports ---
  const { data: existingReport } = await supabase
    .from("valuation_reports")
    .select("*")
    .eq("asset_id", assetId)
    .maybeSingle();

  const reportData = {
    assetHealth,
    breakdown: scoreBreakdown,
    strengths,
    weaknesses,
    marketDemand,
    confidenceLabel,
    valuationBreakdown,
    explainability,
  };

  if (existingReport) {
    const { error: updateErr } = await supabase
      .from("valuation_reports")
      .update({
        asset_score: assetScore,
        verification_score: verificationScore,
        confidence_score: confidenceScore,
        estimated_min: valuationMin,
        estimated_max: valuationMax,
        report_data: reportData as any,
      })
      .eq("id", existingReport.id);

    if (updateErr) {
      console.error(`[Valuation Engine] Failed to update report for ${assetId}:`, updateErr);
      throw updateErr;
    }
  } else {
    const { error: insertErr } = await supabase
      .from("valuation_reports")
      .insert({
        asset_id: assetId,
        asset_score: assetScore,
        verification_score: verificationScore,
        confidence_score: confidenceScore,
        estimated_min: valuationMin,
        estimated_max: valuationMax,
        report_data: reportData as any,
      });

    if (insertErr) {
      console.error(`[Valuation Engine] Failed to insert report for ${assetId}:`, insertErr);
      throw insertErr;
    }
  }

  // --- Step G: Auto-Promote Status to 'Report Generated' ---
  // If we have calculated ranges, automatically advance status to "Report Generated"
  await supabase
    .from("valuation_assets")
    .update({ status: "Report Generated" })
    .eq("id", assetId);

  return {
    estimatedMin: valuationMin,
    estimatedMax: valuationMax,
    confidenceScore,
    confidenceLabel,
    marketDemand,
    breakdown: valuationBreakdown,
    explainability,
  };
}

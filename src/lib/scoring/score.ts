import { getServiceRoleClient } from "../supabase";
import { ScoringResult, HealthLabel } from "./types";
import { calculateSocialScore } from "./social";
import { calculateWebsiteScore } from "./website";
import { calculateDomainScore } from "./domain";
import { calculateCommunityScore } from "./community";
import { HEALTH_THRESHOLDS } from "./rules";
import { runAssetValuation } from "../valuation/market";

/**
 * Orchestrates and calculates quality scoring for an asset.
 * Merges raw metrics and verified OCR data to produce an accurate rating.
 */
export async function runAssetScoring(assetId: string): Promise<ScoringResult> {
  const supabase = getServiceRoleClient();

  // 1. Fetch asset record
  const { data: asset, error: assetErr } = await supabase
    .from("valuation_assets")
    .select("*")
    .eq("id", assetId)
    .single();

  if (assetErr || !asset) {
    throw new Error(`Asset not found: ${assetId}`);
  }

  // 2. Fetch submitted metrics
  const { data: submittedMetrics, error: metricsErr } = await supabase
    .from("valuation_asset_metrics")
    .select("*")
    .eq("asset_id", assetId)
    .maybeSingle();

  // 3. Fetch completed uploads (to merge verified OCR figures)
  const { data: uploads } = await supabase
    .from("verification_uploads")
    .select("*")
    .eq("asset_id", assetId)
    .eq("upload_status", "completed");

  // --- Step A: Merge Submitted & Verified Metrics ---
  const combinedMetrics: Record<string, any> = {
    url: asset.url,
    platform: asset.platform,
    ...submittedMetrics,
    metadata: {
      ...(submittedMetrics?.metadata || {}),
    },
  };

  // If we have completed uploads, override with verified OCR metrics
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

  // --- Step B: Route to Platform Scorer ---
  const platformLower = asset.platform.toLowerCase();
  const isCommunityPlatform = ["telegram", "whatsapp", "discord", "facebook group"].some((p) =>
    platformLower.includes(p)
  );

  let rawResult: Omit<ScoringResult, "assetHealth">;

  if (isCommunityPlatform) {
    rawResult = calculateCommunityScore(combinedMetrics);
  } else if (asset.asset_type === "social") {
    rawResult = calculateSocialScore(combinedMetrics);
  } else if (asset.asset_type === "website") {
    rawResult = calculateWebsiteScore(combinedMetrics);
  } else if (asset.asset_type === "domain") {
    rawResult = calculateDomainScore(combinedMetrics);
  } else {
    // Fallback: Default to website scoring if unrecognized
    rawResult = calculateWebsiteScore(combinedMetrics);
  }

  // --- Step C: Map Health Label ---
  const totalScore = rawResult.assetScore;
  const healthStep = HEALTH_THRESHOLDS.find((h) => totalScore <= h.maxScore);
  const assetHealth: HealthLabel = healthStep ? healthStep.label : "Excellent";

  const scorecard: ScoringResult = {
    ...rawResult,
    assetHealth,
  };

  // --- Step D: Save Results & Trigger Valuation Engine ---
  try {
    await runAssetValuation(
      assetId,
      totalScore,
      scorecard.breakdown,
      scorecard.strengths,
      scorecard.weaknesses,
      assetHealth
    );
  } catch (valErr) {
    console.error(`[Scoring Engine] Auto valuation trigger failed for ${assetId}:`, valErr);
    // Even if valuation fails, log and proceed so scoring isn't fully blocked
  }

  console.log(`[Scoring Engine] Computed Quality Score for ${assetId}: ${totalScore}/100 (${assetHealth})`);
  return scorecard;
}

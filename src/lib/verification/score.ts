import { getServiceRoleClient } from "../supabase";
import { VerificationScoreCard, VerificationDetails } from "./types";
import { compareSingleMetric } from "./compare";
import { getBadgeForScore } from "./badges";
import { 
  URL_VERIFICATION_WEIGHTS, 
  SCREENSHOT_VERIFICATION_WEIGHTS, 
  MAX_URL_VERIFICATION_SCORE, 
  MAX_SCREENSHOT_VERIFICATION_SCORE, 
  MAX_VARIANCE_ALLOWED 
} from "./rules";

/**
 * Calculates and stores the trust/verification score for a given asset.
 * Auto-triggers when OCR processing completes or when requested.
 */
export async function runVerificationScoring(assetId: string): Promise<VerificationScoreCard> {
  const supabase = getServiceRoleClient();

  // 1. Fetch asset details
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

  // 3. Fetch completed verification uploads
  const { data: uploads, error: uploadsErr } = await supabase
    .from("verification_uploads")
    .select("*")
    .eq("asset_id", assetId)
    .eq("upload_status", "completed");

  // 4. Fetch existing verification results if any (to preserve manually set url_verified status)
  const { data: existingResults } = await supabase
    .from("verification_results")
    .select("*")
    .eq("asset_id", assetId)
    .maybeSingle();

  // --- Step A: Metric Matching Logic ---
  const verification_details: VerificationDetails = {};
  let totalMetricScore = 0;
  let comparedCount = 0;
  const flags: string[] = [];

  if (submittedMetrics && uploads && uploads.length > 0) {
    // Merge all OCR extracted JSON metrics into a single object
    const extractedMetrics: Record<string, any> = {};
    uploads.forEach((up) => {
      if (up.extracted_json && typeof up.extracted_json === "object") {
        Object.entries(up.extracted_json).forEach(([key, val]) => {
          if (val !== undefined && val !== null) {
            extractedMetrics[key] = val;
          }
        });
      }
    });

    // List of metrics to check depending on the asset type
    const metricsToCheck: string[] = [];
    if (asset.asset_type === "social") {
      metricsToCheck.push("followers", "likes", "comments", "engagement_rate");
    } else {
      metricsToCheck.push("monthly_traffic", "monthly_views");
    }
    // All assets check revenue
    metricsToCheck.push("monthly_revenue");

    metricsToCheck.forEach((metricKey) => {
      const submittedVal = submittedMetrics[metricKey];
      const extractedVal = extractedMetrics[metricKey] ?? extractedMetrics[metricKey.replace("monthly_", "")];

      // Only compare if user submitted it (> 0) and OCR successfully extracted it
      if (submittedVal !== undefined && submittedVal !== null && submittedVal > 0 && extractedVal !== undefined && extractedVal !== null) {
        const comparison = compareSingleMetric(Number(submittedVal), Number(extractedVal));
        verification_details[metricKey] = comparison;
        totalMetricScore += comparison.score;
        comparedCount++;

        // Generate flags for large discrepancy
        if (comparison.difference > MAX_VARIANCE_ALLOWED) {
          flags.push(`DISCREPANCY_EXCEEDS_LIMIT_${metricKey.toUpperCase()}`);
        }
      }
    });
  }

  // Calculate average metric matching score (Max: 100)
  const metricsMatchScore = comparedCount > 0 ? Math.round(totalMetricScore / comparedCount) : 0;

  // --- Step B: URL Verification Logic (Max: 50) ---
  // If admin has set url_verified in database, preserve it
  const urlVerified = existingResults?.url_verified || false;
  let urlScore = 0;

  if (urlVerified) {
    urlScore = URL_VERIFICATION_WEIGHTS.asset_exists + 
               URL_VERIFICATION_WEIGHTS.public_profile_available + 
               URL_VERIFICATION_WEIGHTS.metrics_accessible;
  } else {
    // Default URL format check (if it has a valid format, award basic existence points)
    if (asset.url && (asset.url.startsWith("http://") || asset.url.startsWith("https://"))) {
      urlScore += URL_VERIFICATION_WEIGHTS.asset_exists;
    }
  }
  urlScore = Math.min(urlScore, MAX_URL_VERIFICATION_SCORE);

  // --- Step C: Screenshot Verification Logic (Max: 50) ---
  let screenshotScore = 0;
  const uploadedTypes = new Set<string>();

  if (uploads) {
    uploads.forEach((up) => {
      const type = up.file_type.toLowerCase();
      if (SCREENSHOT_VERIFICATION_WEIGHTS[type] && !uploadedTypes.has(type)) {
        uploadedTypes.add(type);
        screenshotScore += SCREENSHOT_VERIFICATION_WEIGHTS[type];
      }
    });
  }
  screenshotScore = Math.min(screenshotScore, MAX_SCREENSHOT_VERIFICATION_SCORE);

  // --- Step D: Final Overall Score Calculation (Normalized: 0-100) ---
  // Formula: (URL_Score * 0.5) + (Screenshot_Score * 0.5) + (MetricsMatch_Score * 0.5)
  // Max: (50 * 0.5) + (50 * 0.5) + (100 * 0.5) = 25 + 25 + 50 = 100
  const finalScore = Math.round((urlScore * 0.5) + (screenshotScore * 0.5) + (metricsMatchScore * 0.5));
  
  // Assign trust badge
  const badge = getBadgeForScore(finalScore);

  // --- Step E: Flag Suspicious Submissions ---
  // 1. Missing proof types
  if (asset.asset_type === "social" && !uploadedTypes.has("analytics") && !uploadedTypes.has("insights")) {
    flags.push("MISSING_AUDIENCE_PROOF");
  }
  if (submittedMetrics?.monthly_revenue > 0 && !uploadedTypes.has("revenue")) {
    flags.push("MISSING_REVENUE_PROOF");
  }
  // 2. Low score
  if (finalScore < 40) {
    flags.push("LOW_TRUST_SCORE");
  }
  // 3. No metrics could be compared (missing screenshots or OCR failure)
  if (comparedCount === 0 && uploads && uploads.length > 0) {
    flags.push("OCR_METRICS_EXTRACTION_MISSING");
  }

  // --- Step F: Save Results to Database ---
  const scorecard: VerificationScoreCard = {
    asset_id: assetId,
    url_verified: urlVerified,
    screenshot_verified: screenshotScore >= 25, // True if at least 25 points worth of screenshots uploaded
    metrics_match_score: metricsMatchScore,
    verification_score: finalScore,
    badge,
    flags,
    verification_details,
  };

  const { error: upsertErr } = await supabase
    .from("verification_results")
    .upsert({
      asset_id: assetId,
      url_verified: scorecard.url_verified,
      screenshot_verified: scorecard.screenshot_verified,
      metrics_match_score: scorecard.metrics_match_score,
      verification_score: scorecard.verification_score,
      badge: scorecard.badge,
      flags: scorecard.flags as any,
      verification_details: scorecard.verification_details as any,
    }, {
      onConflict: "asset_id"
    });

  if (upsertErr) {
    console.error(`[Scoring Engine] Failed to save scorecard for ${assetId}:`, upsertErr);
    throw upsertErr;
  }

  // --- Step G: Auto-Promote Status ---
  // If the verification score is high (>=70) and status is pending/verification pending, promote to Verified
  if (finalScore >= 70 && (asset.status === "Pending" || asset.status === "Proof Uploaded" || asset.status === "Verification Pending")) {
    await supabase
      .from("valuation_assets")
      .update({ status: "Verified" })
      .eq("id", assetId);
  }

  console.log(`[Scoring Engine] Completed scoring for asset ${assetId}. Score: ${finalScore}, Badge: ${badge}`);
  return scorecard;
}

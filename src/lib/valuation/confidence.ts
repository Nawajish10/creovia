/**
 * Calculates a trust-weighted Confidence Score (0-100) and maps it to a verbal label.
 */
export function calculateConfidence(assetScore: number, verificationScore: number) {
  // Formula: Confidence = (Asset Score * 0.4) + (Verification Score * 0.6)
  const confidenceScore = Math.min(
    100,
    Math.max(0, Math.round(assetScore * 0.4 + verificationScore * 0.6))
  );

  let confidenceLabel: "Low Confidence" | "Moderate Confidence" | "High Confidence" = "Low Confidence";

  if (confidenceScore >= 70) {
    confidenceLabel = "High Confidence";
  } else if (confidenceScore >= 40) {
    confidenceLabel = "Moderate Confidence";
  }

  return { confidenceScore, confidenceLabel };
}

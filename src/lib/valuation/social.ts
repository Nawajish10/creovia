import { SOCIAL_NICHE_MULTIPLIERS } from "./multipliers";
import { ValuationRange } from "./types";

interface SocialValuationResult extends ValuationRange {
  breakdown: Record<string, any>;
  explainability: string[];
}

/**
 * Calculates valuation range for social pages (Instagram, YouTube, Twitter/X, etc.).
 */
export function calculateSocialValuation(
  metrics: any,
  assetScore: number
): SocialValuationResult {
  const followers = Number(metrics.followers) || 0;
  const nicheName = (metrics.niche || "general").toLowerCase().trim();

  // 1. Fetch Niche Multiplier
  // Find matched key or default to general
  const matchedKey = Object.keys(SOCIAL_NICHE_MULTIPLIERS).find((k) =>
    nicheName.includes(k)
  ) || "general";
  const nicheMult = SOCIAL_NICHE_MULTIPLIERS[matchedKey];

  // Calculate Base Value
  const baseValue = followers * nicheMult;

  // 2. Apply Asset Score Multiplier
  let assetScoreMultiplier = 1.0;
  let scoreDescription = "average performance metrics";

  if (assetScore < 40) {
    assetScoreMultiplier = 0.5;
    scoreDescription = "below-average performance and lower organic traction";
  } else if (assetScore >= 80) {
    assetScoreMultiplier = 2.0;
    scoreDescription = "exceptional engagement rate and high audience growth";
  } else if (assetScore >= 60) {
    assetScoreMultiplier = 1.5;
    scoreDescription = "strong engagement rate and positive growth trends";
  }

  const finalBase = baseValue * assetScoreMultiplier;

  // 3. Generate Range
  // Low Value = Base * 0.8, High Value = Base * 1.2
  const estimatedMin = Math.round(finalBase * 0.8);
  const estimatedMax = Math.round(finalBase * 1.2);

  // 4. Generate Explainability Bullet Points
  const explainability: string[] = [];
  
  if (followers > 0) {
    explainability.push(
      `Audience scale of ${followers.toLocaleString()} followers establishes a solid baseline value.`
    );
  } else {
    explainability.push("Zero or undisclosed audience size results in a entry-level valuation baseline.");
  }

  explainability.push(
    `The content niche "${metrics.niche || "General"}" carries a market multiplier of ₹${nicheMult.toFixed(2)} per follower.`
  );

  explainability.push(
    `An Asset Quality Score of ${assetScore}/100 applies a ${assetScoreMultiplier.toFixed(1)}x modifier due to ${scoreDescription}.`
  );

  if (metrics.engagement_rate && Number(metrics.engagement_rate) > 4) {
    explainability.push(
      `Strong engagement rate of ${Number(metrics.engagement_rate).toFixed(1)}% positively increases advertiser appeal and range limits.`
    );
  }

  return {
    estimatedMin,
    estimatedMax,
    breakdown: {
      followers,
      nicheMultiplier: nicheMult,
      assetScoreMultiplier,
      baseValuation: baseValue,
      finalBaseValuation: finalBase,
    },
    explainability,
  };
}

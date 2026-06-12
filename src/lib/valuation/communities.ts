import { COMMUNITY_PLATFORM_RATES } from "./multipliers";
import { ValuationRange } from "./types";

interface CommunityValuationResult extends ValuationRange {
  breakdown: Record<string, any>;
  explainability: string[];
}

/**
 * Calculates valuation range for communities (WhatsApp, Telegram, Discord, Facebook Groups).
 */
export function calculateCommunityValuation(
  metrics: any,
  assetScore: number
): CommunityValuationResult {
  const members = Number(metrics.followers) || Number(metrics.members) || Number(metrics.monthly_traffic) || 0;
  const platformName = (metrics.platform || "general").toLowerCase().trim();

  // 1. Fetch Platform Rate
  const matchedPlatform = Object.keys(COMMUNITY_PLATFORM_RATES).find((p) =>
    platformName.includes(p)
  ) || "general";
  const baseRate = COMMUNITY_PLATFORM_RATES[matchedPlatform];

  // 2. Fetch Activity Multiplier
  const activityRate = Number(metrics.engagement_rate) || Number(metrics.metadata?.activity_rate) || 10.0;
  // Map activity rate percentage to a multiplier (e.g. 10% activity = 1.0x, 20% = 2.0x, max 3.0x, min 0.2x)
  const activityMultiplier = Math.max(0.2, Math.min(activityRate / 10.0, 3.0));

  // Base Value
  const baseValue = members * baseRate * activityMultiplier;

  // 3. Apply Asset Score Multiplier
  let assetScoreMultiplier = 1.0;
  let scoreDescription = "average community performance metrics";

  if (assetScore < 40) {
    assetScoreMultiplier = 0.5;
    scoreDescription = "dormant discussions and lower organic interaction";
  } else if (assetScore >= 80) {
    assetScoreMultiplier = 2.0;
    scoreDescription = "exceptional retention rates and high user dialogue velocity";
  } else if (assetScore >= 60) {
    assetScoreMultiplier = 1.5;
    scoreDescription = "healthy message engagement and positive growth trends";
  }

  const finalBase = baseValue * assetScoreMultiplier;

  // 4. Generate Range (Low = Base * 0.8, High = Base * 1.2)
  const estimatedMin = Math.round(finalBase * 0.8);
  const estimatedMax = Math.round(finalBase * 1.2);

  // 5. Generate Explainability
  const explainability: string[] = [];

  if (members > 0) {
    explainability.push(
      `Community scale of ${members.toLocaleString()} members provides a robust audience base.`
    );
  } else {
    explainability.push("Low member count limits primary community sponsorship options.");
  }

  explainability.push(
    `The platform rate of ₹${baseRate.toFixed(2)} per member is applied for ${metrics.platform || "Community"}.`
  );

  explainability.push(
    `An active member rate of ${activityRate.toFixed(1)}% yields a ${activityMultiplier.toFixed(1)}x participation multiplier.`
  );

  explainability.push(
    `An Asset Quality Score of ${assetScore}/100 commands a ${assetScoreMultiplier.toFixed(1)}x coefficient due to ${scoreDescription}.`
  );

  return {
    estimatedMin,
    estimatedMax,
    breakdown: {
      members,
      platformRate: baseRate,
      activityRate,
      activityMultiplier,
      assetScoreMultiplier,
      baseValuation: baseValue,
      finalBaseValuation: finalBase,
    },
    explainability,
  };
}

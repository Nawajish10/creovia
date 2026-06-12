import { ScoringResult } from "./types";
import { COMMUNITY_WEIGHTS, NICHE_SCORES } from "./rules";

/**
 * Calculates quality score, breakdown, strengths, and weaknesses for community assets (WhatsApp, Telegram, Discord).
 */
export function calculateCommunityScore(metrics: any): Omit<ScoringResult, "assetHealth"> {
  const breakdown: Record<string, number> = {};
  const strengths: string[] = [];
  const weaknesses: string[] = [];

  const members = Number(metrics.followers) || Number(metrics.members) || Number(metrics.monthly_traffic) || 0;
  const nicheName = (metrics.niche || "").toLowerCase().trim();

  // 1. Members / Subscribers Score (0-100 scale, Weight: 40%)
  let membersScore = 10;
  if (members >= 50000) {
    membersScore = 100;
    strengths.push("Massive community scale (exceeds 50k members)");
  } else if (members >= 20000) {
    membersScore = 85;
    strengths.push("Substantial community base (exceeds 20k members)");
  } else if (members >= 5000) {
    membersScore = 60;
  } else if (members >= 1000) {
    membersScore = 30;
  } else {
    membersScore = 10;
    weaknesses.push("Small community size limits monetization options");
  }
  breakdown.members = membersScore;

  // 2. Activity / Engagement Score (0-100 scale, Weight: 30%)
  const activityRate = Number(metrics.engagement_rate) || Number(metrics.metadata?.activity_rate) || 10; // default 10%
  let activityScore = 50;
  if (activityRate >= 30) {
    activityScore = 100;
    strengths.push(`Ultra-high active member participation (${activityRate.toFixed(1)}% daily)`);
  } else if (activityRate >= 15) {
    activityScore = 80;
    strengths.push("Healthy community chat activity");
  } else if (activityRate >= 5) {
    activityScore = 50;
  } else {
    activityScore = 20;
    weaknesses.push("Dormant group discussions or low daily active rates");
  }
  breakdown.activity = activityScore;

  // 3. Niche Quality Score (0-100 scale, Weight: 20%)
  let nicheScore = 50;
  const matchedNiche = Object.keys(NICHE_SCORES).find((key) => nicheName.includes(key));
  if (matchedNiche) {
    nicheScore = NICHE_SCORES[matchedNiche];
  }
  
  if (nicheScore >= 80) {
    strengths.push(`Premium advertiser demographic niche (${metrics.niche || "Finance"})`);
  } else if (nicheScore <= 30) {
    weaknesses.push("General meme or low advertiser interest niche");
  }
  breakdown.niche = nicheScore;

  // 4. Growth Score (0-100 scale, Weight: 10%)
  const growthTrend = (metrics.metadata?.growth_trend || "stable").toLowerCase();
  let growthScore = 60;
  if (growthTrend.includes("positive") || growthTrend.includes("high")) {
    growthScore = 100;
    strengths.push("High subscriber growth velocity");
  } else if (growthTrend.includes("declining") || growthTrend.includes("negative")) {
    growthScore = 20;
    weaknesses.push("Shrinking subscriber count");
  }
  breakdown.growth = growthScore;

  // Calculate Weighted Asset Score
  const totalScore = Math.round(
    (membersScore * COMMUNITY_WEIGHTS.members) +
    (activityScore * COMMUNITY_WEIGHTS.activity) +
    (nicheScore * COMMUNITY_WEIGHTS.niche) +
    (growthScore * COMMUNITY_WEIGHTS.growth)
  );

  return {
    assetScore: Math.min(totalScore, 100),
    breakdown,
    strengths,
    weaknesses,
  };
}

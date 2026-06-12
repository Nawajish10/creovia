import { ScoringResult } from "./types";
import { SOCIAL_WEIGHTS, NICHE_SCORES } from "./rules";

/**
 * Calculates quality score, breakdown, strengths, and weaknesses for social pages.
 */
export function calculateSocialScore(metrics: any): Omit<ScoringResult, "assetHealth"> {
  const breakdown: Record<string, number> = {};
  const strengths: string[] = [];
  const weaknesses: string[] = [];

  const followers = Number(metrics.followers) || 0;
  const likes = Number(metrics.likes) || 0;
  const comments = Number(metrics.comments) || 0;
  const nicheName = (metrics.niche || "").toLowerCase().trim();

  // 1. Followers Score (0-100 scale)
  let followersScore = 10;
  if (followers >= 100000) {
    followersScore = 100;
    strengths.push("Large audience scale (exceeds 100k followers)");
  } else if (followers >= 50000) {
    followersScore = 75;
    strengths.push("Established audience base (exceeds 50k followers)");
  } else if (followers >= 10000) {
    followersScore = 50;
  } else if (followers >= 1000) {
    followersScore = 30;
  } else {
    followersScore = 10;
    weaknesses.push("Small audience size limits sponsor appeal");
  }
  breakdown.followers = followersScore;

  // 2. Engagement Score (0-100 scale)
  let engRate = Number(metrics.engagement_rate) || 0;
  if (engRate === 0 && followers > 0) {
    // Fallback formula: (Avg Likes + Avg Comments) / Followers * 100
    engRate = ((likes + comments) / followers) * 100;
  }

  let engagementScore = 20;
  if (engRate >= 10) {
    engagementScore = 100;
    strengths.push(`Exceptional engagement rate (${engRate.toFixed(1)}%)`);
  } else if (engRate >= 6) {
    engagementScore = 85;
    strengths.push("High audience engagement and interaction");
  } else if (engRate >= 3) {
    engagementScore = 65;
  } else if (engRate >= 1) {
    engagementScore = 40;
  } else {
    engagementScore = 20;
    weaknesses.push("Below average audience interaction rates");
  }
  breakdown.engagement = engagementScore;

  // 3. Niche Quality Score (0-100 scale)
  let nicheScore = 50;
  // Match keyword niche
  const matchedNiche = Object.keys(NICHE_SCORES).find((key) => nicheName.includes(key));
  if (matchedNiche) {
    nicheScore = NICHE_SCORES[matchedNiche];
  }
  
  if (nicheScore >= 80) {
    strengths.push(`Highly monetizable content niche (${metrics.niche || "Finance"})`);
  } else if (nicheScore <= 30) {
    weaknesses.push("Lower yield niche reduces advertiser multipliers");
  }
  breakdown.niche = nicheScore;

  // 4. Audience Score (0-100 scale)
  // Presume target geo info is stored in metadata or default
  const geo = (metrics.metadata?.audience_geography || "unknown").toLowerCase();
  let audienceScore = 60;
  if (["us", "uk", "ca", "au", "united states", "united kingdom", "canada", "australia"].some(c => geo.includes(c))) {
    audienceScore = 100;
    strengths.push("High-value Tier 1 audience demographics");
  } else if (["in", "europe", "india"].some(c => geo.includes(c))) {
    audienceScore = 75;
  }
  breakdown.audience = audienceScore;

  // 5. Growth Score (0-100 scale)
  const growthTrend = (metrics.metadata?.growth_trend || "stable").toLowerCase();
  let growthScore = 60;
  if (growthTrend.includes("positive") || growthTrend.includes("high")) {
    growthScore = 100;
    strengths.push("Strong positive audience growth momentum");
  } else if (growthTrend.includes("declining") || growthTrend.includes("negative")) {
    growthScore = 20;
    weaknesses.push("Declining growth velocity");
  }
  breakdown.growth = growthScore;

  // Calculate Weighted Asset Score
  const totalScore = Math.round(
    (followersScore * SOCIAL_WEIGHTS.followers) +
    (engagementScore * SOCIAL_WEIGHTS.engagement) +
    (nicheScore * SOCIAL_WEIGHTS.niche) +
    (audienceScore * SOCIAL_WEIGHTS.audience) +
    (growthScore * SOCIAL_WEIGHTS.growth)
  );

  return {
    assetScore: Math.min(totalScore, 100),
    breakdown,
    strengths,
    weaknesses,
  };
}

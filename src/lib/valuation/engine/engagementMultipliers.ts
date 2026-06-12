/**
 * Engagement Rate Multipliers for the Automated Valuation Engine.
 * Maps engagement rate percentages to value multipliers.
 */

const ENGAGEMENT_TIER_EXCEPTIONAL = 10;
const ENGAGEMENT_TIER_STRONG = 5;
const ENGAGEMENT_TIER_AVERAGE = 2;

const ENGAGEMENT_MULTIPLIER_EXCEPTIONAL = 1.20;
const ENGAGEMENT_MULTIPLIER_STRONG = 1.10;
const ENGAGEMENT_MULTIPLIER_AVERAGE = 1.00;
const ENGAGEMENT_MULTIPLIER_LOW = 0.85;

export function getEngagementMultiplier(engagementRate: number): number {
  if (engagementRate > ENGAGEMENT_TIER_EXCEPTIONAL) {
    return ENGAGEMENT_MULTIPLIER_EXCEPTIONAL;
  }
  if (engagementRate >= ENGAGEMENT_TIER_STRONG) {
    return ENGAGEMENT_MULTIPLIER_STRONG;
  }
  if (engagementRate >= ENGAGEMENT_TIER_AVERAGE) {
    return ENGAGEMENT_MULTIPLIER_AVERAGE;
  }
  return ENGAGEMENT_MULTIPLIER_LOW;
}

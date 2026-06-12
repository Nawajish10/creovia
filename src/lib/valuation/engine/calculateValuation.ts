/**
 * Core Valuation Calculator for the Automated Valuation Engine.
 * Computes estimatedValue, lowRange, highRange, and breakdown from form inputs.
 */

import type { ValuationInput, ValuationResult } from "./types";
import { getRevenueMultiplier } from "./revenueMultipliers";
import { getEngagementMultiplier } from "./engagementMultipliers";
import { getNicheMultiplier } from "./nicheMultipliers";
import { getCountryMultiplier } from "./countryMultipliers";
import { getAgeMultiplier } from "./ageMultipliers";
import { getMonetizationMultiplier } from "./monetizationMultipliers";
import { calculateConfidenceScore } from "./calculateConfidence";

/**
 * Platform-specific audience value rates (value per follower/subscriber/member).
 */
const AUDIENCE_VALUE_RATES: Record<string, number> = {
  instagram: 0.05,
  youtube: 0.12,
  telegram: 0.03,
  "twitter/x": 0.04,
  twitter: 0.04,
  x: 0.04,
};

const DEFAULT_AUDIENCE_RATE = 0.03;

const LOW_RANGE_FACTOR = 0.85;
const HIGH_RANGE_FACTOR = 1.15;

/**
 * Resolves the audience value rate for a given platform using case-insensitive matching.
 */
function getAudienceRate(platform: string): number {
  const normalizedPlatform = platform.toLowerCase().trim();

  for (const [key, rate] of Object.entries(AUDIENCE_VALUE_RATES)) {
    if (normalizedPlatform.includes(key)) {
      return rate;
    }
  }

  return DEFAULT_AUDIENCE_RATE;
}

/**
 * Calculates the full valuation result from form submission input.
 */
export function calculateValuation(input: ValuationInput): ValuationResult {
  const revenueMultiplier = getRevenueMultiplier(input.monthlyRevenue);
  const revenueValue = input.monthlyRevenue * revenueMultiplier;

  const audienceRate = getAudienceRate(input.platform);
  const audienceValue = input.audienceSize * audienceRate;

  const baseValue = Math.max(revenueValue, audienceValue);

  const engagementMultiplier = getEngagementMultiplier(input.engagementRate);
  const nicheMultiplier = getNicheMultiplier(input.niche);
  const countryMultiplier = getCountryMultiplier(input.country);
  const ageMultiplier = getAgeMultiplier(input.assetAge);
  const monetizationMultiplier = getMonetizationMultiplier(input.monetizationStatus);

  const estimatedValue = Math.round(
    baseValue
    * engagementMultiplier
    * nicheMultiplier
    * countryMultiplier
    * ageMultiplier
    * monetizationMultiplier
  );

  const lowRange = Math.round(estimatedValue * LOW_RANGE_FACTOR);
  const highRange = Math.round(estimatedValue * HIGH_RANGE_FACTOR);

  const { score: confidenceScore, level: confidenceLevel } = calculateConfidenceScore(input);

  return {
    estimatedValue,
    lowRange,
    highRange,
    confidenceScore,
    confidenceLevel,
    breakdown: {
      revenueValue: Math.round(revenueValue),
      audienceValue: Math.round(audienceValue),
      engagementMultiplier,
      nicheMultiplier,
      countryMultiplier,
      ageMultiplier,
      monetizationMultiplier,
    },
  };
}

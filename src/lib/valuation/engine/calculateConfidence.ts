/**
 * Confidence Score Calculator for the Automated Valuation Engine.
 * Scores data completeness and quality (0–100) to indicate how reliable the valuation estimate is.
 */

import type { ConfidenceResult, ValuationInput } from "./types";

const CONFIDENCE_WEIGHT_REVENUE = 25;
const CONFIDENCE_WEIGHT_ASSET_URL = 15;
const CONFIDENCE_WEIGHT_ANALYTICS = 25;
const CONFIDENCE_WEIGHT_ENGAGEMENT = 15;
const CONFIDENCE_WEIGHT_ASSET_AGE = 10;
const CONFIDENCE_WEIGHT_MONETIZATION = 10;

const CONFIDENCE_THRESHOLD_HIGH = 80;
const CONFIDENCE_THRESHOLD_MEDIUM = 50;

export function calculateConfidenceScore(input: ValuationInput): ConfidenceResult {
  let score = 0;

  if (input.monthlyRevenue > 0) {
    score += CONFIDENCE_WEIGHT_REVENUE;
  }

  if (input.assetUrl && input.assetUrl.length > 0) {
    score += CONFIDENCE_WEIGHT_ASSET_URL;
  }

  if (input.analyticsScreenshot) {
    score += CONFIDENCE_WEIGHT_ANALYTICS;
  }

  if (input.engagementRate > 0) {
    score += CONFIDENCE_WEIGHT_ENGAGEMENT;
  }

  if (input.assetAge && input.assetAge.length > 0) {
    score += CONFIDENCE_WEIGHT_ASSET_AGE;
  }

  if (input.monetizationStatus && input.monetizationStatus.length > 0) {
    score += CONFIDENCE_WEIGHT_MONETIZATION;
  }

  const clampedScore = Math.min(100, Math.max(0, score));

  let level: ConfidenceResult["level"];
  if (clampedScore >= CONFIDENCE_THRESHOLD_HIGH) {
    level = "High";
  } else if (clampedScore >= CONFIDENCE_THRESHOLD_MEDIUM) {
    level = "Medium";
  } else {
    level = "Low";
  }

  return { score: clampedScore, level };
}

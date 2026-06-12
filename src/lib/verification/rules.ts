/**
 * Configurable rules and thresholds for the Axcrivo Verification Scoring Engine.
 * Modifying these values dynamically shifts trust calculations globally.
 */

// 1. Variance Scoring Rules (Step function)
// Difference % -> score out of 100
export const VARIANCE_SCORING_STEPS = [
  { maxVariance: 5, score: 100 },
  { maxVariance: 10, score: 80 },
  { maxVariance: 20, score: 60 },
  { maxVariance: 30, score: 40 },
];

export const MAX_VARIANCE_ALLOWED = 30; // Anything above triggers 0 points and raises flags

// 2. URL Verification Weights (Max: 50 points)
export const URL_VERIFICATION_WEIGHTS = {
  asset_exists: 20,
  public_profile_available: 20,
  metrics_accessible: 10,
};

export const MAX_URL_VERIFICATION_SCORE = 50;

// 3. Screenshot Verification Weights (Max: 50 points)
// File types and their associated point values
export const SCREENSHOT_VERIFICATION_WEIGHTS: Record<string, number> = {
  analytics: 15,
  revenue: 15,
  insights: 10,
  youtube: 10,
};

export const MAX_SCREENSHOT_VERIFICATION_SCORE = 50;

// 4. Badge Thresholds
export const BADGE_THRESHOLDS = {
  self_reported: {
    min: 0,
    max: 39,
    label: "🔴 Self Reported",
  },
  partially_verified: {
    min: 40,
    max: 69,
    label: "🟡 Partially Verified",
  },
  verified: {
    min: 70,
    max: 100,
    label: "🟢 Verified by Axcrivo",
  },
};

import { BADGE_THRESHOLDS } from "./rules";

/**
 * Returns the appropriate trust badge label based on the final normalized verification score.
 */
export function getBadgeForScore(score: number): string {
  const rounded = Math.round(score);

  if (rounded >= BADGE_THRESHOLDS.verified.min) {
    return BADGE_THRESHOLDS.verified.label;
  }
  
  if (rounded >= BADGE_THRESHOLDS.partially_verified.min) {
    return BADGE_THRESHOLDS.partially_verified.label;
  }

  return BADGE_THRESHOLDS.self_reported.label;
}

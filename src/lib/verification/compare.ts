import { MetricComparison } from "./types";
import { VARIANCE_SCORING_STEPS } from "./rules";

/**
 * Compares a single submitted metric against its OCR extracted counterpart.
 * Calculates variance percentage and yields a step-based score out of 100.
 */
export function compareSingleMetric(submitted: number, extracted: number): MetricComparison {
  if (submitted === null || submitted === undefined) {
    return { submitted: 0, extracted, difference: 100, score: 0 };
  }

  // 1. Calculate difference percentage
  let difference = 0;
  if (submitted === 0) {
    difference = extracted === 0 ? 0 : 100;
  } else {
    // Variance formula: |Extracted - Submitted| / Submitted * 100
    difference = (Math.abs(extracted - submitted) / submitted) * 100;
  }

  // Round difference to 2 decimal places (e.g. 4.62 for 4.62%)
  const roundedDifference = Math.round(difference * 100) / 100;

  // 2. Map to step score
  let score = 0;
  // Find matching interval step
  const step = VARIANCE_SCORING_STEPS.find((s) => roundedDifference <= s.maxVariance);
  if (step) {
    score = step.score;
  }

  return {
    submitted,
    extracted,
    difference: roundedDifference,
    score,
  };
}

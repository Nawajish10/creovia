/**
 * Barrel export for the Automated Valuation Engine.
 */

export { calculateValuation } from "./calculateValuation";
export { calculateConfidenceScore } from "./calculateConfidence";
export { getRevenueMultiplier } from "./revenueMultipliers";
export { getEngagementMultiplier } from "./engagementMultipliers";
export { getNicheMultiplier } from "./nicheMultipliers";
export { getCountryMultiplier } from "./countryMultipliers";
export { getAgeMultiplier } from "./ageMultipliers";
export { getMonetizationMultiplier } from "./monetizationMultipliers";

export type {
  ValuationInput,
  ValuationResult,
  ValuationBreakdown,
  ConfidenceResult,
} from "./types";

/**
 * Asset Age Multipliers for the Automated Valuation Engine.
 * Parses flexible text input (e.g. "3 years", "6 months") and returns age-based multipliers.
 */

const AGE_MULTIPLIER_UNDER_6_MONTHS = 0.75;
const AGE_MULTIPLIER_6_TO_12_MONTHS = 0.90;
const AGE_MULTIPLIER_1_TO_2_YEARS = 1.00;
const AGE_MULTIPLIER_2_TO_5_YEARS = 1.10;
const AGE_MULTIPLIER_OVER_5_YEARS = 1.15;
const AGE_MULTIPLIER_DEFAULT = 1.00;

/**
 * Parses asset age text into total months for comparison.
 * Supports formats like "3 years", "6 months", "2 Years", "1.5 years", "18 Months".
 */
function parseAgeToMonths(assetAge: string): number | null {
  const normalized = assetAge.toLowerCase().trim();

  const yearMatch = normalized.match(/(\d+(?:\.\d+)?)\s*year/);
  if (yearMatch) {
    return Math.round(parseFloat(yearMatch[1]) * 12);
  }

  const monthMatch = normalized.match(/(\d+(?:\.\d+)?)\s*month/);
  if (monthMatch) {
    return Math.round(parseFloat(monthMatch[1]));
  }

  return null;
}

export function getAgeMultiplier(assetAge: string | undefined): number {
  if (!assetAge) {
    return AGE_MULTIPLIER_DEFAULT;
  }

  const months = parseAgeToMonths(assetAge);

  if (months === null) {
    return AGE_MULTIPLIER_DEFAULT;
  }

  if (months < 6) {
    return AGE_MULTIPLIER_UNDER_6_MONTHS;
  }
  if (months < 12) {
    return AGE_MULTIPLIER_6_TO_12_MONTHS;
  }
  if (months <= 24) {
    return AGE_MULTIPLIER_1_TO_2_YEARS;
  }
  if (months <= 60) {
    return AGE_MULTIPLIER_2_TO_5_YEARS;
  }
  return AGE_MULTIPLIER_OVER_5_YEARS;
}

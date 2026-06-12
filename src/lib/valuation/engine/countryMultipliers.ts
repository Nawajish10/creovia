/**
 * Country/Geography Multipliers for the Automated Valuation Engine.
 * Maps audience geography to value multipliers using case-insensitive matching.
 */

const COUNTRY_MULTIPLIER_ENTRIES: ReadonlyArray<readonly [string, number]> = [
  ["australia", 1.10],
  ["canada", 1.10],
  ["europe", 1.10],
  ["global", 1.05],
  ["india", 1.00],
  ["uk", 1.15],
  ["us", 1.20],
] as const;

const DEFAULT_COUNTRY_MULTIPLIER = 1.00;

export function getCountryMultiplier(country: string | undefined): number {
  if (!country) {
    return DEFAULT_COUNTRY_MULTIPLIER;
  }

  const normalizedCountry = country.toLowerCase().trim();

  for (const [key, multiplier] of COUNTRY_MULTIPLIER_ENTRIES) {
    if (normalizedCountry.includes(key)) {
      return multiplier;
    }
  }

  return DEFAULT_COUNTRY_MULTIPLIER;
}

/**
 * Monetization Multipliers for the Automated Valuation Engine.
 * Awards higher multipliers for assets with diversified revenue streams.
 */

const MONETIZATION_MULTIPLIER_SINGLE = 1.00;
const MONETIZATION_MULTIPLIER_DUAL = 1.10;
const MONETIZATION_MULTIPLIER_MULTIPLE = 1.15;

export function getMonetizationMultiplier(monetizationStatus: string[] | undefined): number {
  if (!monetizationStatus || monetizationStatus.length === 0) {
    return MONETIZATION_MULTIPLIER_SINGLE;
  }

  const sourceCount = monetizationStatus.length;

  if (sourceCount >= 3) {
    return MONETIZATION_MULTIPLIER_MULTIPLE;
  }
  if (sourceCount === 2) {
    return MONETIZATION_MULTIPLIER_DUAL;
  }
  return MONETIZATION_MULTIPLIER_SINGLE;
}

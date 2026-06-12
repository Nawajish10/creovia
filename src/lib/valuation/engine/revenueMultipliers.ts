/**
 * Revenue Multipliers for the Automated Valuation Engine.
 * Determines the monthly-revenue-to-value multiplier based on revenue quality tiers.
 */

const REVENUE_MULTIPLIER_PREMIUM = 36;
const REVENUE_MULTIPLIER_GOOD = 30;
const REVENUE_MULTIPLIER_AVERAGE = 24;
const REVENUE_MULTIPLIER_LOW = 18;

const REVENUE_THRESHOLD_PREMIUM = 5000;
const REVENUE_THRESHOLD_GOOD = 1000;
const REVENUE_THRESHOLD_AVERAGE = 250;

export function getRevenueMultiplier(monthlyRevenue: number): number {
  if (monthlyRevenue > REVENUE_THRESHOLD_PREMIUM) {
    return REVENUE_MULTIPLIER_PREMIUM;
  }
  if (monthlyRevenue > REVENUE_THRESHOLD_GOOD) {
    return REVENUE_MULTIPLIER_GOOD;
  }
  if (monthlyRevenue > REVENUE_THRESHOLD_AVERAGE) {
    return REVENUE_MULTIPLIER_AVERAGE;
  }
  return REVENUE_MULTIPLIER_LOW;
}

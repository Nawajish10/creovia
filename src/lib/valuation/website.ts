import { WEBSITE_MULTIPLES, USD_TO_INR } from "./multipliers";
import { ValuationRange } from "./types";

interface WebsiteValuationResult extends ValuationRange {
  breakdown: Record<string, any>;
  explainability: string[];
}

/**
 * Calculates website/SaaS valuation using monthly profit and score multiples.
 * Auto-converts USD metrics to INR for consistency.
 */
export function calculateWebsiteValuation(
  metrics: any,
  assetScore: number
): WebsiteValuationResult {
  // 1. Determine Monthly Profit (USD, falling back to monthly_revenue)
  const monthlyProfitUSD = Number(metrics.metadata?.monthly_profit) || Number(metrics.monthly_revenue) || 0;
  
  // Convert profit to INR (Rupees) if it is likely USD (e.g. < 15000), otherwise assume it's already INR.
  const monthlyProfitINR = monthlyProfitUSD < 15000 ? monthlyProfitUSD * USD_TO_INR : monthlyProfitUSD;

  // 2. Fetch Score-based Multiple
  const matchedRule = WEBSITE_MULTIPLES.find((r) => assetScore <= r.maxScore) || WEBSITE_MULTIPLES[WEBSITE_MULTIPLES.length - 1];
  const multiple = matchedRule.multiple;

  // Calculate Base Value
  const baseValue = monthlyProfitINR * multiple;

  // 3. Generate Range (±15% variance)
  const estimatedMin = Math.round(baseValue * 0.85);
  const estimatedMax = Math.round(baseValue * 1.15);

  // 4. Generate Explainability
  const explainability: string[] = [];

  if (monthlyProfitINR > 0) {
    explainability.push(
      `Monthly cash flow of ₹${Math.round(monthlyProfitINR).toLocaleString()} (converted from USD) provides a strong base for multiples-based valuation.`
    );
  } else {
    explainability.push("Zero or undisclosed revenue/profit limits historical earning value.");
  }

  explainability.push(
    `An Asset Quality Score of ${assetScore}/100 commands a ${multiple}x monthly profit valuation multiplier.`
  );

  const traffic = Number(metrics.monthly_traffic) || Number(metrics.monthly_views) || 0;
  if (traffic > 20000) {
    explainability.push(
      `Healthy traffic velocity of ${traffic.toLocaleString()} monthly visits increases search positioning appeal.`
    );
  }

  const da = Number(metrics.metadata?.domain_authority);
  if (da && da >= 30) {
    explainability.push(
      `Strong domain authority (DA: ${da}) suggests robust backlink search equity.`
    );
  }

  return {
    estimatedMin,
    estimatedMax,
    breakdown: {
      monthlyProfitUSD,
      monthlyProfitINR,
      multiple,
      baseValuation: baseValue,
    },
    explainability,
  };
}

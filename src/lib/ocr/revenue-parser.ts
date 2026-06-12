import { RevenueProofMetrics } from "./types";

/**
 * Normalizes number strings from OCR text, handling currency symbols, commas, and K/M shorthand.
 */
function parseMetricValue(valStr: string): number | undefined {
  let cleaned = valStr.replace(/[$\u20B9\u20A8\u20A9\u20AA\u20AB\u20AC\u00A3\u00A5\s]/g, "");
  
  let multiplier = 1;
  if (cleaned.toLowerCase().endsWith("k")) {
    multiplier = 1000;
    cleaned = cleaned.slice(0, -1);
  } else if (cleaned.toLowerCase().endsWith("m")) {
    multiplier = 1000000;
    cleaned = cleaned.slice(0, -1);
  }

  cleaned = cleaned.replace(/,/g, "");

  const num = parseFloat(cleaned);
  if (!isNaN(num)) {
    return Math.round(num * multiplier);
  }
  return undefined;
}

/**
 * Parses Revenue Proof metrics from raw OCR text (e.g. Stripe payouts, invoices, order dashboards).
 */
export function parseRevenueMetrics(text: string): RevenueProofMetrics {
  const metrics: RevenueProofMetrics = {};

  const getNumberAfterLabel = (labelPattern: string): number | undefined => {
    const regex = new RegExp(`${labelPattern}\\s*[:\\-\\n=]*\\s*([$\\u20B9\\d.,]+[km]?)`, "i");
    const match = text.match(regex);
    if (match && match[1]) {
      return parseMetricValue(match[1]);
    }
    return undefined;
  };

  const getNumberBeforeLabel = (labelPattern: string): number | undefined => {
    const regex = new RegExp(`([$\\u20B9\\d.,]+[km]?)\\s*\\n*\\s*${labelPattern}`, "i");
    const match = text.match(regex);
    if (match && match[1]) {
      return parseMetricValue(match[1]);
    }
    return undefined;
  };

  const findMetric = (keywords: string[]): number | undefined => {
    for (const kw of keywords) {
      const val = getNumberAfterLabel(kw) ?? getNumberBeforeLabel(kw);
      if (val !== undefined && !isNaN(val)) return val;
    }
    return undefined;
  };

  metrics.revenue = findMetric([
    "gross volume", "net volume", "net volume", "net earnings", "gross earnings", "net revenue", 
    "total revenue", "revenue", "total earnings", "earnings", "payout", "balance"
  ]);
  metrics.orders = findMetric(["total orders", "orders", "orders count"]);
  metrics.transactions = findMetric(["total transactions", "transactions", "successful payments", "payments"]);

  return metrics;
}

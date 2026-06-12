import { YouTubeStudioMetrics } from "./types";

/**
 * Normalizes number strings from OCR text, handling currency symbols, commas, and K/M shorthand.
 * E.g., "$1.2K" -> 1200, "1.5M" -> 1500000, "10,500" -> 10500
 */
function parseMetricValue(valStr: string): number | undefined {
  // Remove spaces, currency symbols ($, rupee, euro, pound, yen)
  let cleaned = valStr.replace(/[$\u20B9\u20A8\u20A9\u20AA\u20AB\u20AC\u00A3\u00A5\s]/g, "");
  
  let multiplier = 1;
  if (cleaned.toLowerCase().endsWith("k")) {
    multiplier = 1000;
    cleaned = cleaned.slice(0, -1);
  } else if (cleaned.toLowerCase().endsWith("m")) {
    multiplier = 1000000;
    cleaned = cleaned.slice(0, -1);
  }

  // Remove comma formatting
  cleaned = cleaned.replace(/,/g, "");

  const num = parseFloat(cleaned);
  if (!isNaN(num)) {
    return Math.round(num * multiplier);
  }
  return undefined;
}

/**
 * Parses YouTube Studio metrics from raw OCR text.
 */
export function parseYouTubeMetrics(text: string): YouTubeStudioMetrics {
  const metrics: YouTubeStudioMetrics = {};

  const getNumberAfterLabel = (labelPattern: string): number | undefined => {
    // Captures digits with decimals, commas, currency symbols, and K/M multipliers
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

  metrics.subscribers = findMetric(["subscribers", "subs", "total subscribers", "subscriber count"]);
  metrics.views = findMetric(["views", "video views", "total views"]);
  metrics.watch_time = findMetric(["watch time", "watch hours", "watch time (hours)"]);
  metrics.revenue = findMetric(["estimated revenue", "your estimated revenue", "revenue", "earnings"]);

  return metrics;
}

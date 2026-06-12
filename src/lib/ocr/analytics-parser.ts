import { GoogleAnalyticsMetrics } from "./types";

/**
 * Parses Google Analytics metrics from raw OCR text.
 * Handles numbers appearing before or after keywords and cleans punctuation.
 */
export function parseAnalyticsMetrics(text: string): GoogleAnalyticsMetrics {
  const metrics: GoogleAnalyticsMetrics = {};

  const getNumberAfterLabel = (labelPattern: string): number | undefined => {
    const regex = new RegExp(`${labelPattern}\\s*[:\\-\\n=]*\\s*([\\d,]+)`, "i");
    const match = text.match(regex);
    if (match && match[1]) {
      return parseInt(match[1].replace(/,/g, ""), 10);
    }
    return undefined;
  };

  const getNumberBeforeLabel = (labelPattern: string): number | undefined => {
    const regex = new RegExp(`([\\d,]+)\\s*\\n*\\s*${labelPattern}`, "i");
    const match = text.match(regex);
    if (match && match[1]) {
      return parseInt(match[1].replace(/,/g, ""), 10);
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

  metrics.users = findMetric(["active users", "total users", "users"]);
  metrics.sessions = findMetric(["sessions"]);
  metrics.pageviews = findMetric(["page views", "pageviews", "views"]);
  metrics.active_users = findMetric(["active users", "active", "real-time users", "realtime"]);

  return metrics;
}

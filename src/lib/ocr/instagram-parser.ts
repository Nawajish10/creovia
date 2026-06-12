import { InstagramInsightsMetrics } from "./types";

/**
 * Parses Instagram Insights metrics from raw OCR text.
 * Support key metrics such as reached accounts, engaged accounts, and followers.
 */
export function parseInstagramMetrics(text: string): InstagramInsightsMetrics {
  const metrics: InstagramInsightsMetrics = {};

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

  metrics.followers = findMetric(["followers", "total followers", "followers count"]);
  metrics.reached = findMetric(["accounts reached", "reach", "reached"]);
  metrics.engaged = findMetric(["accounts engaged", "engaged", "engagement"]);
  metrics.profile_visits = findMetric(["profile visits", "profile views", "visits"]);

  return metrics;
}

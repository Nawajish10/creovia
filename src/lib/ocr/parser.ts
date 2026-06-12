import { parseAnalyticsMetrics } from "./analytics-parser";
import { parseInstagramMetrics } from "./instagram-parser";
import { parseYouTubeMetrics } from "./youtube-parser";
import { parseRevenueMetrics } from "./revenue-parser";
import { ExtractedMetrics } from "./types";

/**
 * Main parser entry point. Processes OCR text and maps keywords into structured metrics.
 * Uses proof-type metadata to select a parsing model, falling back to a highest-match candidate search.
 */
export function parseMetrics(text: string, fileType: string): ExtractedMetrics {
  if (!text) return {};
  
  const normalizedType = fileType.toLowerCase();

  // Route depending on proof file type
  if (normalizedType.includes("analytics") || normalizedType.includes("google")) {
    return parseAnalyticsMetrics(text);
  }
  
  if (normalizedType.includes("instagram") || normalizedType.includes("insights")) {
    return parseInstagramMetrics(text);
  }

  if (normalizedType.includes("youtube") || normalizedType.includes("studio")) {
    return parseYouTubeMetrics(text);
  }

  if (
    normalizedType.includes("revenue") || 
    normalizedType.includes("adsense") || 
    normalizedType.includes("stripe") || 
    normalizedType.includes("invoice")
  ) {
    return parseRevenueMetrics(text);
  }

  // Smart Fallback: If type is unknown, try all parsers and return the one that successfully extracts the most fields
  console.log(`[OCR Parser] Unknown proof category: "${fileType}". Running candidate score routing...`);
  
  const gaMetrics = parseAnalyticsMetrics(text);
  const igMetrics = parseInstagramMetrics(text);
  const ytMetrics = parseYouTubeMetrics(text);
  const revMetrics = parseRevenueMetrics(text);

  const getMetricDensity = (obj: Record<string, any>) => 
    Object.values(obj).filter(v => v !== undefined && v !== null).length;

  const candidates = [
    { parsed: gaMetrics, score: getMetricDensity(gaMetrics) },
    { parsed: igMetrics, score: getMetricDensity(igMetrics) },
    { parsed: ytMetrics, score: getMetricDensity(ytMetrics) },
    { parsed: revMetrics, score: getMetricDensity(revMetrics) }
  ];

  // Sort descending by count of extracted metrics
  candidates.sort((a, b) => b.score - a.score);
  
  console.log(`[OCR Parser] Candidate matching completed. Selected parser density score: ${candidates[0].score}`);
  return candidates[0].score > 0 ? candidates[0].parsed : {};
}

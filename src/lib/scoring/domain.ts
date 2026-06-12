import { ScoringResult } from "./types";
import { DOMAIN_WEIGHTS, DOMAIN_EXTENSION_SCORES } from "./rules";

/**
 * Normalizes and extracts TLD and domain length from URL string.
 */
function extractDomainMeta(urlStr: string) {
  let cleaned = urlStr.toLowerCase()
    .replace(/(^\w+:|^)\/\//, "") // remove protocol
    .replace(/^www\./, "")       // remove www
    .split("/")[0];              // get hostname only

  const parts = cleaned.split(".");
  const extension = parts[parts.length - 1] || "other";
  
  // Get main domain name length (excluding extension)
  const namePart = parts[0] || "";
  const length = namePart.length;

  return { extension, length };
}

/**
 * Calculates quality score, breakdown, strengths, and weaknesses for domains.
 */
export function calculateDomainScore(metrics: any): Omit<ScoringResult, "assetHealth"> {
  const breakdown: Record<string, number> = {};
  const strengths: string[] = [];
  const weaknesses: string[] = [];

  const url = metrics.url || metrics.metadata?.url || "";
  const { extension, length } = extractDomainMeta(url);

  // 1. Brandability Score (0-100 scale, Weight: 30%)
  const brandability = Number(metrics.metadata?.brandability) || 75; // default 75
  breakdown.brandability = brandability;
  if (brandability >= 85) {
    strengths.push("Highly brandable, catchy, and memorable domain name");
  }

  // 2. Keyword Quality (0-100 scale, Weight: 25%)
  const keywordQuality = Number(metrics.metadata?.keyword_quality) || 70; // default 70
  breakdown.keyword_quality = keywordQuality;
  if (keywordQuality >= 80) {
    strengths.push("Contains high-value search term keywords");
  }

  // 3. Extension Score (0-100 scale, Weight: 20%)
  const extScore = DOMAIN_EXTENSION_SCORES[extension] || DOMAIN_EXTENSION_SCORES.other;
  breakdown.extension = extScore;
  if (extScore === 100) {
    strengths.push("Premium .com TLD extension");
  } else if (extScore >= 70) {
    strengths.push(`Modern technology TLD extension (.${extension})`);
  } else {
    weaknesses.push(`Non-standard TLD extension (.${extension}) reduces reseller demand`);
  }

  // 4. Length Score (0-100 scale, Weight: 15%)
  let lengthScore = 30;
  if (length > 0) {
    if (length < 5) {
      lengthScore = 100;
      strengths.push(`Ultra-short premium domain length (${length} characters)`);
    } else if (length <= 10) {
      lengthScore = 85;
      strengths.push(`Short brandable domain length (${length} characters)`);
    } else if (length <= 15) {
      lengthScore = 60;
    } else {
      lengthScore = 30;
      weaknesses.push(`Long domain length (${length} characters) makes recall difficult`);
    }
  }
  breakdown.length = lengthScore;

  // 5. Market Demand (0-100 scale, Weight: 10%)
  const demand = Number(metrics.metadata?.market_demand) || 60;
  breakdown.demand = demand;
  if (demand >= 80) {
    strengths.push("High reseller market auction liquidity");
  }

  // Calculate Weighted Asset Score
  const totalScore = Math.round(
    (brandability * DOMAIN_WEIGHTS.brandability) +
    (keywordQuality * DOMAIN_WEIGHTS.keyword_quality) +
    (extScore * DOMAIN_WEIGHTS.extension) +
    (lengthScore * DOMAIN_WEIGHTS.length) +
    (demand * DOMAIN_WEIGHTS.demand)
  );

  return {
    assetScore: Math.min(totalScore, 100),
    breakdown,
    strengths,
    weaknesses,
  };
}

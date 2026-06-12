import { 
  DOMAIN_BASE_VALUE, 
  DOMAIN_EXTENSION_BONUSES 
} from "./multipliers";
import { ValuationRange } from "./types";

interface DomainValuationResult extends ValuationRange {
  breakdown: Record<string, any>;
  explainability: string[];
}

/**
 * Parses and extracts extension and character length of main domain name.
 */
function extractDomainMeta(urlStr: string) {
  let cleaned = urlStr.toLowerCase()
    .replace(/(^\w+:|^)\/\//, "") // remove protocol
    .replace(/^www\./, "")       // remove www
    .split("/")[0];              // get hostname only

  const parts = cleaned.split(".");
  const extension = parts[parts.length - 1] || "other";
  const namePart = parts[0] || "";
  const length = namePart.length;

  return { extension, length };
}

/**
 * Calculates rule-based valuation range for domains.
 */
export function calculateDomainValuation(
  metrics: any,
  assetScore: number
): DomainValuationResult {
  const url = metrics.url || metrics.metadata?.url || "";
  const { extension, length } = extractDomainMeta(url);

  // 1. Base value
  let baseValue = DOMAIN_BASE_VALUE;
  const explainability: string[] = [];

  // 2. TLD extension bonus
  const extBonus = DOMAIN_EXTENSION_BONUSES[extension] || DOMAIN_EXTENSION_BONUSES.other;
  baseValue += extBonus;

  if (extension === "com") {
    explainability.push("Premium .com top-level extension adds high commercial liquidity and brand trust.");
  } else {
    explainability.push(`The domain features a standard .${extension} extension.`);
  }

  // 3. Character length bonus
  let lengthBonus = 0;
  if (length > 0) {
    if (length < 5) {
      lengthBonus = 60000.0;
      explainability.push(`Ultra-short character length (${length} chars) holds exceptional premium appeal.`);
    } else if (length <= 10) {
      lengthBonus = 20000.0;
      explainability.push(`Short brandable character length (${length} chars) is highly memorable.`);
    } else if (length <= 15) {
      lengthBonus = 5000.0;
    } else {
      explainability.push(`Long domain length (${length} chars) slightly dampens typing recall value.`);
    }
  }
  baseValue += lengthBonus;

  // 4. Score metrics bonuses (Brandability, Keywords, Demand)
  const brandability = Number(metrics.metadata?.brandability) || 70;
  const keywordQuality = Number(metrics.metadata?.keyword_quality) || 60;
  const demand = Number(metrics.metadata?.market_demand) || 50;

  const brandabilityVal = (brandability / 100) * 30000.0;
  const keywordVal = (keywordQuality / 100) * 25000.0;
  const demandVal = (demand / 100) * 15000.0;

  baseValue += brandabilityVal + keywordVal + demandVal;

  if (brandability >= 80) {
    explainability.push("High brandability rating indicates marketing versatility and name catchiness.");
  }
  if (keywordQuality >= 80) {
    explainability.push("High search term keyword relevance boosts target traffic potential.");
  }

  // 5. Generate ranges (±15% variance)
  const estimatedMin = Math.round(baseValue * 0.85);
  const estimatedMax = Math.round(baseValue * 1.15);

  return {
    estimatedMin,
    estimatedMax,
    breakdown: {
      extension,
      length,
      extBonus,
      lengthBonus,
      brandabilityVal,
      keywordVal,
      demandVal,
      baseValuation: baseValue,
    },
    explainability,
  };
}

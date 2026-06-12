/**
 * Niche Multipliers for the Automated Valuation Engine.
 * Maps content niches to value multipliers using case-insensitive matching.
 */

const NICHE_MULTIPLIER_MAP: Record<string, number> = {
  finance: 1.40,
  business: 1.30,
  ai: 1.30,
  crypto: 1.25,
  education: 1.20,
  marketing: 1.20,
  lifestyle: 1.00,
  travel: 0.95,
  meme: 0.80,
};

const DEFAULT_NICHE_MULTIPLIER = 1.00;

export function getNicheMultiplier(niche: string | undefined): number {
  if (!niche) {
    return DEFAULT_NICHE_MULTIPLIER;
  }

  const normalizedNiche = niche.toLowerCase().trim();

  for (const [key, multiplier] of Object.entries(NICHE_MULTIPLIER_MAP)) {
    if (normalizedNiche.includes(key)) {
      return multiplier;
    }
  }

  return DEFAULT_NICHE_MULTIPLIER;
}

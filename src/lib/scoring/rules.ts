/**
 * Configurable weights and scoring ranges for the Asset Quality Scoring Engine.
 */

// 1. Social Page weights (Sum: 100)
export const SOCIAL_WEIGHTS = {
  followers: 0.30,
  engagement: 0.25,
  niche: 0.20,
  audience: 0.15,
  growth: 0.10,
};

// 2. Website weights (Sum: 100)
export const WEBSITE_WEIGHTS = {
  revenue: 0.40,
  traffic: 0.20,
  growth: 0.15,
  domain_strength: 0.10,
  seo_strength: 0.10,
  social_proof: 0.05,
};

// 3. Domain weights (Sum: 100)
export const DOMAIN_WEIGHTS = {
  brandability: 0.30,
  keyword_quality: 0.25,
  extension: 0.20,
  length: 0.15,
  demand: 0.10,
};

// 4. Community page weights (Sum: 100)
export const COMMUNITY_WEIGHTS = {
  members: 0.40,
  activity: 0.30,
  niche: 0.20,
  growth: 0.10,
};

// 5. Niche Quality Scores (0-100 scale)
export const NICHE_SCORES: Record<string, number> = {
  finance: 100,
  business: 90,
  ai: 90,
  marketing: 80,
  education: 70,
  technology: 70,
  travel: 60,
  sports: 60,
  gaming: 50,
  entertainment: 40,
  general: 35,
  memes: 20,
};

// 6. Domain TLD Extensions Scores
export const DOMAIN_EXTENSION_SCORES: Record<string, number> = {
  com: 100,
  io: 80,
  co: 70,
  in: 60,
  net: 50,
  org: 50,
  other: 40,
};

// 7. Health Labels Score Thresholds
export const HEALTH_THRESHOLDS = [
  { maxScore: 20, label: "Poor" as const },
  { maxScore: 40, label: "Weak" as const },
  { maxScore: 60, label: "Average" as const },
  { maxScore: 80, label: "Strong" as const },
  { maxScore: 100, label: "Excellent" as const },
];

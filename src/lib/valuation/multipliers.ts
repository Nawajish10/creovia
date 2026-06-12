/**
 * Configurable Pricing Models, Multipliers, and Rules for the Valuation Engine.
 */

// Exchange rate helper to convert USD figures (stored in DB) to INR (Rupees)
export const USD_TO_INR = 83.0;

// 1. Social Media Niche Followers Multipliers (in Rupees per follower)
export const SOCIAL_NICHE_MULTIPLIERS: Record<string, number> = {
  finance: 2.0,       // ₹2.0 / follower
  business: 1.8,      // ₹1.8 / follower
  ai: 1.8,            // ₹1.8 / follower
  marketing: 1.5,     // ₹1.5 / follower
  technology: 1.2,    // ₹1.2 / follower
  education: 1.2,     // ₹1.2 / follower
  travel: 1.0,        // ₹1.0 / follower
  sports: 0.8,        // ₹0.8 / follower
  gaming: 0.6,        // ₹0.6 / follower
  entertainment: 0.5, // ₹0.5 / follower
  general: 0.5,       // ₹0.5 / follower
  memes: 0.2,         // ₹0.2 / follower
};

// 2. Website Multiples based on Asset Score
export const WEBSITE_MULTIPLES = [
  { maxScore: 40, multiple: 20 }, // 20x monthly profit
  { maxScore: 60, multiple: 28 }, // 28x monthly profit
  { maxScore: 80, multiple: 35 }, // 35x monthly profit
  { maxScore: 100, multiple: 42 }, // 42x monthly profit
];

// 3. Domain Valuation Configurations (in Rupees)
export const DOMAIN_BASE_VALUE = 5000.0; // ₹5,000 baseline value

export const DOMAIN_EXTENSION_BONUSES: Record<string, number> = {
  com: 40000.0,  // Premium TLD
  io: 25000.0,
  co: 18000.0,
  in: 12000.0,
  net: 8000.0,
  org: 8000.0,
  other: 2000.0,
};

// 4. Community Platform Base Rates (in Rupees per member)
export const COMMUNITY_PLATFORM_RATES: Record<string, number> = {
  whatsapp: 1.0,       // ₹1.0 / member
  telegram: 1.2,       // ₹1.2 / member
  discord: 1.5,        // ₹1.5 / member
  "facebook group": 0.6, // ₹0.6 / member
  general: 0.5,
};

// 5. Static Market Demand Scores (0 - 100)
// Designed so future marketplace search volume data can dynamically replace it
export const MARKET_DEMAND_RULES = [
  { platform: "instagram", niche: "finance", score: 85 },
  { platform: "instagram", niche: "business", score: 82 },
  { platform: "instagram", niche: "ai", score: 80 },
  { platform: "instagram", niche: "travel", score: 70 },
  { platform: "youtube", niche: "finance", score: 88 },
  { platform: "youtube", niche: "technology", score: 84 },
  { platform: "youtube", niche: "education", score: 75 },
  { platform: "telegram", niche: "finance", score: 92 },
  { platform: "telegram", niche: "crypto", score: 90 },
  { platform: "telegram", niche: "business", score: 85 },
  { platform: "whatsapp", niche: "business", score: 78 },
  { platform: "discord", niche: "gaming", score: 80 },
  { platform: "discord", niche: "crypto", score: 88 },
  { platform: "website", niche: "saas", score: 95 },
  { platform: "website", niche: "ecommerce", score: 90 },
  { platform: "website", niche: "finance", score: 92 },
  { platform: "domain", niche: "general", score: 70 },
];

export const DEFAULT_MARKET_DEMAND = 50;

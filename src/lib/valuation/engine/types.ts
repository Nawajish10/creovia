/**
 * Shared types for the Automated Valuation Engine.
 * Used by both /valuation and /sell submission flows.
 */

export interface ValuationInput {
  platform: string;
  audienceSize: number;
  engagementRate: number;
  monthlyRevenue: number;
  niche?: string;
  country?: string;
  assetAge?: string;
  monetizationStatus?: string[];
  assetUrl?: string;
  analyticsScreenshot?: boolean;
}

export interface ValuationBreakdown {
  revenueValue: number;
  audienceValue: number;
  engagementMultiplier: number;
  nicheMultiplier: number;
  countryMultiplier: number;
  ageMultiplier: number;
  monetizationMultiplier: number;
}

export interface ValuationResult {
  estimatedValue: number;
  lowRange: number;
  highRange: number;
  confidenceScore: number;
  confidenceLevel: "Low" | "Medium" | "High";
  breakdown: ValuationBreakdown;
}

export interface ConfidenceResult {
  score: number;
  level: "Low" | "Medium" | "High";
}

export type HealthLabel = "Poor" | "Weak" | "Average" | "Strong" | "Excellent";

export interface ScoringBreakdown {
  [factorName: string]: number; // score out of 100 for each factor before weighting
}

export interface ScoringResult {
  assetScore: number;         // overall quality score (0-100)
  assetHealth: HealthLabel;   // health classification based on score ranges
  breakdown: ScoringBreakdown;
  strengths: string[];
  weaknesses: string[];
}

export interface ValuationRange {
  estimatedMin: number;
  estimatedMax: number;
}

export interface ValuationResult {
  estimatedMin: number;
  estimatedMax: number;
  confidenceScore: number;
  confidenceLabel: string;
  marketDemand: number;
  breakdown: Record<string, any>;
  explainability: string[];
}

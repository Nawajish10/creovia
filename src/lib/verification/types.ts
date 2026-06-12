export interface MetricComparison {
  submitted: number;
  extracted: number;
  difference: number; // percentage variance, e.g. 4.6 (for 4.6%)
  score: number;      // score out of 100 for this specific metric
}

export interface VerificationDetails {
  [metricName: string]: MetricComparison;
}

export interface VerificationScoreCard {
  asset_id: string;
  url_verified: boolean;
  screenshot_verified: boolean;
  metrics_match_score: number; // 0-100 score based on metric variance comparisons
  verification_score: number;  // 0-100 overall trust score
  badge: string;               // 🔴 Self Reported | 🟡 Partially Verified | 🟢 Verified by Axcrivo
  flags: string[];             // manual review flags
  verification_details: VerificationDetails;
}

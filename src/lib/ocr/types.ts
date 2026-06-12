export interface GoogleAnalyticsMetrics {
  users?: number;
  sessions?: number;
  pageviews?: number;
  active_users?: number;
}

export interface InstagramInsightsMetrics {
  followers?: number;
  reached?: number;
  engaged?: number;
  profile_visits?: number;
}

export interface YouTubeStudioMetrics {
  subscribers?: number;
  views?: number;
  watch_time?: number;
  revenue?: number;
}

export interface RevenueProofMetrics {
  revenue?: number;
  orders?: number;
  transactions?: number;
}

export type ExtractedMetrics = 
  | GoogleAnalyticsMetrics 
  | InstagramInsightsMetrics 
  | YouTubeStudioMetrics 
  | RevenueProofMetrics;

export interface OCRProcessingResult {
  raw_text: string;
  parsed_metrics: ExtractedMetrics;
}

export type AssetType = 'social' | 'website' | 'domain';

export interface ValuationAsset {
  id: string;
  user_id: string;
  asset_type: AssetType;
  platform: string;
  title: string;
  url: string;
  status: 'Pending' | 'Proof Uploaded' | 'Verification Pending' | 'Verified' | 'Report Generated';
  created_at: string;
}

export interface ValuationAssetMetrics {
  id: string;
  asset_id: string;
  followers?: number;
  likes?: number;
  comments?: number;
  engagement_rate?: number;
  monthly_views?: number;
  monthly_traffic?: number;
  monthly_revenue?: number;
  niche?: string;
  metadata: Record<string, any>;
  created_at: string;
}

export interface VerificationUpload {
  id: string;
  asset_id: string;
  file_url: string;
  file_type: string;
  upload_status: 'pending' | 'uploaded';
  extracted_text?: string;
  extracted_json?: Record<string, any>;
  created_at: string;
}

export interface VerificationResult {
  id: string;
  asset_id: string;
  url_verified: boolean;
  screenshot_verified: boolean;
  metrics_match_score?: number;
  verification_score?: number;
  flags: Record<string, any>;
  created_at: string;
}

export interface ValuationReport {
  id: string;
  asset_id: string;
  asset_score?: number;
  verification_score?: number;
  confidence_score?: number;
  estimated_min?: number;
  estimated_max?: number;
  report_data: Record<string, any>;
  created_at: string;
}

export interface AssetSubmission {
  asset: Omit<ValuationAsset, 'id' | 'user_id' | 'created_at' | 'status'>;
  metrics: Omit<ValuationAssetMetrics, 'id' | 'asset_id' | 'created_at'>;
}

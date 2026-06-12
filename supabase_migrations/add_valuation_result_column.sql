-- Migration: Add valuation_result jsonb column to valuation_requests and seller_leads tables.
-- This column stores the automated valuation engine output as structured JSON.
-- 
-- Structure stored:
-- {
--   "estimatedValue": number,
--   "lowRange": number,
--   "highRange": number,
--   "confidenceScore": number,
--   "confidenceLevel": "Low" | "Medium" | "High",
--   "breakdown": {
--     "revenueValue": number,
--     "audienceValue": number,
--     "engagementMultiplier": number,
--     "nicheMultiplier": number,
--     "countryMultiplier": number,
--     "ageMultiplier": number,
--     "monetizationMultiplier": number
--   }
-- }

ALTER TABLE valuation_requests
  ADD COLUMN IF NOT EXISTS valuation_result JSONB DEFAULT NULL;

ALTER TABLE seller_leads
  ADD COLUMN IF NOT EXISTS valuation_result JSONB DEFAULT NULL;

-- Optional: Add a GIN index for efficient JSON querying on valuation results
CREATE INDEX IF NOT EXISTS idx_valuation_requests_valuation_result
  ON valuation_requests USING GIN (valuation_result);

CREATE INDEX IF NOT EXISTS idx_seller_leads_valuation_result
  ON seller_leads USING GIN (valuation_result);

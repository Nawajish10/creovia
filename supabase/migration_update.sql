-- 1. Alter seller_leads table to store file metadata
ALTER TABLE public.seller_leads
ADD COLUMN IF NOT EXISTS analytics_image_path TEXT,
ADD COLUMN IF NOT EXISTS analytics_signed_url TEXT,
ADD COLUMN IF NOT EXISTS analytics_file_name TEXT,
ADD COLUMN IF NOT EXISTS analytics_file_size BIGINT,
ADD COLUMN IF NOT EXISTS analytics_uploaded_at TIMESTAMP WITH TIME ZONE;

-- 2. Ensure Storage Policies exist for analytics-screenshots bucket
-- Note: The bucket 'analytics-screenshots' has already been created programmatically via our setup script.
-- We allow anyone (anonymous users) to upload screenshots to this bucket:
CREATE POLICY "Allow anonymous uploads" ON storage.objects
FOR INSERT TO public
WITH CHECK (bucket_id = 'analytics-screenshots');

-- We restrict select permissions to service_role and authenticated users to protect seller privacy:
CREATE POLICY "Allow service_role and authenticated select" ON storage.objects
FOR SELECT TO authenticated, service_role
USING (bucket_id = 'analytics-screenshots');

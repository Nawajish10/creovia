-- Supabase Schema for Axcrivo Valuation & Verification System (Phase 1)

-- 1. Valuation Assets Table (Primary entity linking user and valuation workflow)
CREATE TABLE IF NOT EXISTS public.valuation_assets (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    asset_type TEXT NOT NULL CHECK (asset_type IN ('social', 'website', 'domain')),
    platform TEXT NOT NULL,
    title TEXT NOT NULL,
    url TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'Proof Uploaded', 'Verification Pending', 'Verified', 'Report Generated')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Valuation Asset Metrics Table
CREATE TABLE IF NOT EXISTS public.valuation_asset_metrics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    asset_id UUID NOT NULL REFERENCES public.valuation_assets(id) ON DELETE CASCADE,
    followers BIGINT,
    likes BIGINT,
    comments BIGINT,
    engagement_rate NUMERIC CHECK (engagement_rate >= 0 AND engagement_rate <= 100),
    monthly_views BIGINT,
    monthly_traffic BIGINT,
    monthly_revenue BIGINT,
    niche TEXT,
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Verification Uploads Table (Stores screenshot details)
CREATE TABLE IF NOT EXISTS public.verification_uploads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    asset_id UUID NOT NULL REFERENCES public.valuation_assets(id) ON DELETE CASCADE,
    file_url TEXT NOT NULL,
    file_type TEXT NOT NULL,
    upload_status TEXT NOT NULL DEFAULT 'pending' CHECK (upload_status IN ('pending', 'uploaded', 'processing', 'completed', 'failed')),
    extracted_text TEXT,
    extracted_json JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Verification Results Table
CREATE TABLE IF NOT EXISTS public.verification_results (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    asset_id UUID NOT NULL REFERENCES public.valuation_assets(id) ON DELETE CASCADE,
    url_verified BOOLEAN DEFAULT FALSE NOT NULL,
    screenshot_verified BOOLEAN DEFAULT FALSE NOT NULL,
    metrics_match_score NUMERIC,
    verification_score NUMERIC,
    flags JSONB NOT NULL DEFAULT '{}'::jsonb,
    badge TEXT,
    verification_details JSONB DEFAULT '{}'::jsonb NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Valuation Reports Table
CREATE TABLE IF NOT EXISTS public.valuation_reports (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    asset_id UUID NOT NULL REFERENCES public.valuation_assets(id) ON DELETE CASCADE,
    asset_score NUMERIC,
    verification_score NUMERIC,
    confidence_score NUMERIC,
    estimated_min NUMERIC,
    estimated_max NUMERIC,
    report_data JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Setup Row Level Security (RLS)
ALTER TABLE public.valuation_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.valuation_asset_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.verification_uploads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.verification_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.valuation_reports ENABLE ROW LEVEL SECURITY;

-- Enable public/authenticated access rules matching owners

-- Policies for valuation_assets
CREATE POLICY "Users can create their own assets" ON public.valuation_assets
    FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own assets" ON public.valuation_assets
    FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own assets" ON public.valuation_assets
    FOR UPDATE TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own assets" ON public.valuation_assets
    FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Policies for valuation_asset_metrics
CREATE POLICY "Users can insert metrics for their own assets" ON public.valuation_asset_metrics
    FOR INSERT TO authenticated WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.valuation_assets
            WHERE public.valuation_assets.id = asset_id AND public.valuation_assets.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can view metrics for their own assets" ON public.valuation_asset_metrics
    FOR SELECT TO authenticated USING (
        EXISTS (
            SELECT 1 FROM public.valuation_assets
            WHERE public.valuation_assets.id = asset_id AND public.valuation_assets.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can update metrics for their own assets" ON public.valuation_asset_metrics
    FOR UPDATE TO authenticated USING (
        EXISTS (
            SELECT 1 FROM public.valuation_assets
            WHERE public.valuation_assets.id = asset_id AND public.valuation_assets.user_id = auth.uid()
        )
    );

-- Policies for verification_uploads
CREATE POLICY "Users can insert uploads for their own assets" ON public.verification_uploads
    FOR INSERT TO authenticated WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.valuation_assets
            WHERE public.valuation_assets.id = asset_id AND public.valuation_assets.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can view uploads for their own assets" ON public.verification_uploads
    FOR SELECT TO authenticated USING (
        EXISTS (
            SELECT 1 FROM public.valuation_assets
            WHERE public.valuation_assets.id = asset_id AND public.valuation_assets.user_id = auth.uid()
        )
    );

-- Policies for verification_results
CREATE POLICY "Users can view verification results for their own assets" ON public.verification_results
    FOR SELECT TO authenticated USING (
        EXISTS (
            SELECT 1 FROM public.valuation_assets
            WHERE public.valuation_assets.id = asset_id AND public.valuation_assets.user_id = auth.uid()
        )
    );

-- Policies for valuation_reports
CREATE POLICY "Users can view valuation reports for their own assets" ON public.valuation_reports
    FOR SELECT TO authenticated USING (
        EXISTS (
            SELECT 1 FROM public.valuation_assets
            WHERE public.valuation_assets.id = asset_id AND public.valuation_assets.user_id = auth.uid()
        )
    );

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_valuation_assets_user_id ON public.valuation_assets(user_id);
CREATE INDEX IF NOT EXISTS idx_valuation_asset_metrics_asset_id ON public.valuation_asset_metrics(asset_id);
CREATE INDEX IF NOT EXISTS idx_verification_uploads_asset_id ON public.verification_uploads(asset_id);
CREATE INDEX IF NOT EXISTS idx_verification_results_asset_id ON public.verification_results(asset_id);
CREATE INDEX IF NOT EXISTS idx_valuation_reports_asset_id ON public.valuation_reports(asset_id);

-- Migration support: Expand status constraints for existing tables
ALTER TABLE public.verification_uploads DROP CONSTRAINT IF EXISTS verification_uploads_upload_status_check;
ALTER TABLE public.verification_uploads ADD CONSTRAINT verification_uploads_upload_status_check 
    CHECK (upload_status IN ('pending', 'uploaded', 'processing', 'completed', 'failed'));

-- Migration support: Add badge and verification_details columns to verification_results
ALTER TABLE public.verification_results ADD COLUMN IF NOT EXISTS badge TEXT;
ALTER TABLE public.verification_results ADD COLUMN IF NOT EXISTS verification_details JSONB DEFAULT '{}'::jsonb NOT NULL;

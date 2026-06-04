-- Supabase Schema for Creator Asset Marketplace

-- Valuation Requests Table
CREATE TABLE IF NOT EXISTS public.valuation_requests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    platform TEXT NOT NULL,
    niche TEXT,
    audience_size BIGINT NOT NULL,
    engagement_rate NUMERIC NOT NULL,
    country TEXT NOT NULL,
    monthly_revenue BIGINT NOT NULL,
    asking_price BIGINT,
    asset_url TEXT,
    status TEXT DEFAULT 'pending' NOT NULL,
    source TEXT DEFAULT 'valuation_form' NOT NULL
);

-- Seller Leads Table
CREATE TABLE IF NOT EXISTS public.seller_leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    platform TEXT NOT NULL,
    asset_url TEXT,
    niche TEXT NOT NULL,
    country TEXT NOT NULL,
    asset_age TEXT NOT NULL,
    audience_size BIGINT NOT NULL,
    monthly_reach TEXT NOT NULL,
    revenue_last_12_months BIGINT,
    average_monthly_profit BIGINT,
    asking_price BIGINT NOT NULL,
    screenshot_url TEXT NOT NULL,
    reason_for_selling TEXT,
    ownership_confirmed BOOLEAN DEFAULT FALSE NOT NULL,
    monetization_status TEXT NOT NULL,
    status TEXT DEFAULT 'pending' NOT NULL,
    source TEXT DEFAULT 'seller_form' NOT NULL
);

-- Buyer Leads Table
CREATE TABLE IF NOT EXISTS public.buyer_leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    budget BIGINT NOT NULL,
    platform TEXT NOT NULL,
    niche TEXT,
    country_preference TEXT,
    status TEXT DEFAULT 'pending' NOT NULL,
    source TEXT DEFAULT 'buyer_form' NOT NULL
);

-- Setup Row Level Security (RLS)
-- By default, allow inserting from anyone (anon), but reading only for authenticated admins (service role).

ALTER TABLE public.valuation_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seller_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.buyer_leads ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts
CREATE POLICY "Allow anonymous inserts" ON public.valuation_requests FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Allow anonymous inserts" ON public.seller_leads FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Allow anonymous inserts" ON public.buyer_leads FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Allow service role full access (This is implicit, but good to be aware of)

-- Newsletter Subscribers Table
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    email TEXT UNIQUE NOT NULL,
    status TEXT DEFAULT 'active' NOT NULL,
    source TEXT DEFAULT 'newsletter' NOT NULL
);

ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow anonymous inserts" ON public.newsletter_subscribers FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Migration query to add new fields to existing seller_leads table
ALTER TABLE public.seller_leads 
ADD COLUMN IF NOT EXISTS asset_age TEXT,
ADD COLUMN IF NOT EXISTS monthly_reach TEXT,
ADD COLUMN IF NOT EXISTS revenue_last_12_months BIGINT,
ADD COLUMN IF NOT EXISTS average_monthly_profit BIGINT,
ADD COLUMN IF NOT EXISTS screenshot_url TEXT,
ADD COLUMN IF NOT EXISTS ownership_confirmed BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS monetization_status TEXT;

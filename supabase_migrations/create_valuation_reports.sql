-- Create valuation_reports table
CREATE TABLE valuation_reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL, -- Optional, links to user if logged in
  email TEXT NOT NULL, -- Used to link report to user even if they buy as guest
  platform TEXT NOT NULL,
  profile_name TEXT NOT NULL,
  report_id TEXT NOT NULL UNIQUE, -- e.g., REP-2025-000124
  status TEXT NOT NULL DEFAULT 'Processing', -- Processing, Generating, Completed, Delivered
  payment_id TEXT, -- Razorpay Payment ID
  amount DECIMAL NOT NULL DEFAULT 999.00,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Add Row Level Security (RLS)
ALTER TABLE valuation_reports ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own reports (based on email or user_id)
CREATE POLICY "Users can view their own reports" ON valuation_reports
  FOR SELECT USING (
    auth.uid() = user_id OR 
    email = (SELECT email FROM auth.users WHERE id = auth.uid())
  );

-- Allow service role to insert/update reports (API routes)
-- Assuming service role bypasses RLS, but explicitly:
CREATE POLICY "Service role can manage reports" ON valuation_reports
  FOR ALL USING (true);

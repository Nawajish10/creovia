"use server"

import { getServiceRoleClient } from "@/lib/supabase"
import { valuationSchema, sellerSchema, buyerSchema } from "@/lib/schemas"
import { calculateValuation } from "@/lib/valuation/engine"
import type { ValuationInput, ValuationResult } from "@/lib/valuation/engine"

/**
 * Maps valuation form data (valuation_requests table schema) to the engine's ValuationInput.
 */
function mapValuationLeadToInput(data: {
  platform: string;
  audience_size: number;
  engagement_rate: number;
  monthly_revenue: number;
  niche?: string;
  country?: string;
  asset_url?: string;
}): ValuationInput {
  return {
    platform: data.platform,
    audienceSize: data.audience_size,
    engagementRate: data.engagement_rate,
    monthlyRevenue: data.monthly_revenue,
    niche: data.niche,
    country: data.country,
    assetUrl: data.asset_url || undefined,
    analyticsScreenshot: false,
    assetAge: undefined,
    monetizationStatus: undefined,
  };
}

/**
 * Maps seller form data (seller_leads table schema) to the engine's ValuationInput.
 * Derives monthly_revenue from revenue_last_12_months when available.
 */
function mapSellerLeadToInput(data: {
  platform: string;
  audience_size: number;
  niche: string;
  country: string;
  asset_age: string;
  revenue_last_12_months?: number;
  average_monthly_profit?: number;
  asset_url?: string;
  analytics_image_path: string;
  analytics_signed_url?: string;
  monetization_status: string[];
}): ValuationInput {
  const monthlyRevenue = data.average_monthly_profit
    || (data.revenue_last_12_months ? Math.round(data.revenue_last_12_months / 12) : 0);

  return {
    platform: data.platform,
    audienceSize: data.audience_size,
    engagementRate: 0,
    monthlyRevenue: monthlyRevenue,
    niche: data.niche,
    country: data.country,
    assetAge: data.asset_age,
    assetUrl: data.asset_url || undefined,
    analyticsScreenshot: Boolean(data.analytics_image_path || data.analytics_signed_url),
    monetizationStatus: data.monetization_status,
  };
}

/**
 * Serializes a ValuationResult into a plain JSON-safe record for Supabase jsonb storage.
 */
function serializeValuationResult(result: ValuationResult): Record<string, unknown> {
  return {
    estimatedValue: result.estimatedValue,
    lowRange: result.lowRange,
    highRange: result.highRange,
    confidenceScore: result.confidenceScore,
    confidenceLevel: result.confidenceLevel,
    breakdown: {
      revenueValue: result.breakdown.revenueValue,
      audienceValue: result.breakdown.audienceValue,
      engagementMultiplier: result.breakdown.engagementMultiplier,
      nicheMultiplier: result.breakdown.nicheMultiplier,
      countryMultiplier: result.breakdown.countryMultiplier,
      ageMultiplier: result.breakdown.ageMultiplier,
      monetizationMultiplier: result.breakdown.monetizationMultiplier,
    },
  };
}

export async function submitValuationLead(data: Record<string, unknown>) {
  try {
    const supabase = getServiceRoleClient()
    const parsed = valuationSchema.parse(data)
    const { website, ...dbData } = parsed

    // Run the valuation engine
    const valuationInput = mapValuationLeadToInput(dbData);
    const valuationResult = calculateValuation(valuationInput);
    const serializedValuation = serializeValuationResult(valuationResult);

    const insertData = {
      ...dbData,
      valuation_result: serializedValuation,
    };

    const { error } = await supabase.from('valuation_requests').insert([insertData])
    if (error) throw error;
    
    return {
      success: true,
      valuation: valuationResult,
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to submit form";
    return { success: false, error: message }
  }
}

export async function submitSellerLead(data: Record<string, unknown>) {
  try {
    const supabase = getServiceRoleClient()
    const parsed = sellerSchema.parse(data)
    
    const { website, ...rest } = parsed

    // Run the valuation engine
    const valuationInput = mapSellerLeadToInput(rest);
    const valuationResult = calculateValuation(valuationInput);
    const serializedValuation = serializeValuationResult(valuationResult);

    const dbData = {
      ...rest,
      screenshot_url: rest.analytics_signed_url || "", // legacy field fallback
      monthly_revenue: Math.round((rest.revenue_last_12_months || 0) / 12) || 0,
      monetization_status: Array.isArray(rest.monetization_status)
        ? rest.monetization_status.join(", ")
        : rest.monetization_status,
      analytics_uploaded_at: new Date().toISOString(),
      valuation_result: serializedValuation,
    }
    
    const { error } = await supabase.from('seller_leads').insert([dbData])
    if (error) throw error;
    
    return {
      success: true,
      valuation: valuationResult,
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to submit form";
    return { success: false, error: message }
  }
}

export async function submitBuyerLead(data: Record<string, unknown>) {
  try {
    const supabase = getServiceRoleClient()
    const parsed = buyerSchema.parse(data)
    const { website, ...dbData } = parsed
    const { error } = await supabase.from('buyer_leads').insert([dbData])
    if (error) throw error;
    
    return { success: true }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to submit form";
    return { success: false, error: message }
  }
}

export async function submitNewsletterSubscriber(email: string, source: string = "newsletter") {
  try {
    const supabase = getServiceRoleClient()
    const { error } = await supabase.from('newsletter_subscribers').insert([{ email, source }])
    if (error) throw error;
    
    return { success: true }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to subscribe";
    return { success: false, error: message }
  }
}

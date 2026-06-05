"use server"

import { getServiceRoleClient } from "@/lib/supabase"
import { valuationSchema, sellerSchema, buyerSchema } from "@/lib/schemas"

export async function submitValuationLead(data: any) {
  try {
    const supabase = getServiceRoleClient()
    const parsed = valuationSchema.parse(data)
    const { website, ...dbData } = parsed
    const { error } = await supabase.from('valuation_requests').insert([dbData])
    if (error) throw error;
    
    return { success: true }
  } catch (error: any) {
    console.error("Valuation Lead Error:", error)
    return { success: false, error: error.message || "Failed to submit form" }
  }
}

export async function submitSellerLead(data: any) {
  try {
    const supabase = getServiceRoleClient()
    const parsed = sellerSchema.parse(data)
    
    const { website, ...rest } = parsed
    const dbData = {
      ...rest,
      screenshot_url: rest.analytics_signed_url || "", // legacy field fallback
      monthly_revenue: Math.round((rest.revenue_last_12_months || 0) / 12) || 0,
      monetization_status: Array.isArray(rest.monetization_status)
        ? rest.monetization_status.join(", ")
        : rest.monetization_status,
      analytics_uploaded_at: new Date().toISOString()
    }
    
    const { error } = await supabase.from('seller_leads').insert([dbData])
    if (error) throw error;
    
    return { success: true }
  } catch (error: any) {
    console.error("Seller Lead Error:", error)
    return { success: false, error: error.message || "Failed to submit form" }
  }
}

export async function submitBuyerLead(data: any) {
  try {
    const supabase = getServiceRoleClient()
    const parsed = buyerSchema.parse(data)
    const { website, ...dbData } = parsed
    const { error } = await supabase.from('buyer_leads').insert([dbData])
    if (error) throw error;
    
    return { success: true }
  } catch (error: any) {
    console.error("Buyer Lead Error:", error)
    return { success: false, error: error.message || "Failed to submit form" }
  }
}

export async function submitNewsletterSubscriber(email: string, source: string = "newsletter") {
  try {
    const supabase = getServiceRoleClient()
    const { error } = await supabase.from('newsletter_subscribers').insert([{ email, source }])
    if (error) throw error;
    
    return { success: true }
  } catch (error: any) {
    console.error("Newsletter Sub Error:", error)
    return { success: false, error: error.message || "Failed to subscribe" }
  }
}

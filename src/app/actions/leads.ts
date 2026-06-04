"use server"

import { getServiceRoleClient } from "@/lib/supabase"
import { valuationSchema, sellerSchema, buyerSchema } from "@/lib/schemas"

export async function submitValuationLead(data: any) {
  try {
    const supabase = getServiceRoleClient()
    const parsed = valuationSchema.parse(data)
    const { error } = await supabase.from('valuation_requests').insert([parsed])
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
    const { error } = await supabase.from('seller_leads').insert([parsed])
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
    const { error } = await supabase.from('buyer_leads').insert([parsed])
    if (error) throw error;
    
    return { success: true }
  } catch (error: any) {
    console.error("Buyer Lead Error:", error)
    return { success: false, error: error.message || "Failed to submit form" }
  }
}

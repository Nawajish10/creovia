import { getServiceRoleClient } from "@/lib/supabase"
import { LeadsDashboardClient } from "./LeadsDashboardClient"

export default async function AdminLeadsPage() {
  try {
    const supabase = getServiceRoleClient()
    
    // Fetch data in parallel
    const [valuationRes, sellerRes, buyerRes] = await Promise.all([
      supabase.from('valuation_requests').select('*').order('created_at', { ascending: false }),
      supabase.from('seller_leads').select('*').order('created_at', { ascending: false }),
      supabase.from('buyer_leads').select('*').order('created_at', { ascending: false })
    ])

    return (
      <LeadsDashboardClient 
        initialValuationLeads={valuationRes.data || []}
        initialSellerLeads={sellerRes.data || []}
        initialBuyerLeads={buyerRes.data || []}
      />
    )
  } catch (error: any) {
    return (
      <div className="p-8">
        <div className="bg-error-container text-on-error-container p-6 rounded-xl">
          <h2 className="font-headline-md">Configuration Required</h2>
          <p className="mt-2">Failed to load leads from Supabase. Ensure that the <code>SUPABASE_SERVICE_ROLE_KEY</code> and <code>NEXT_PUBLIC_SUPABASE_URL</code> environment variables are correctly set, and that the tables have been created.</p>
          <pre className="mt-4 text-sm opacity-80">{error.message}</pre>
        </div>
      </div>
    )
  }
}

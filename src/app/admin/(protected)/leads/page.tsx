import { getServiceRoleClient } from "@/lib/supabase"
import { LeadsDashboardClient } from "./LeadsDashboardClient"

export default async function AdminLeadsPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ tab?: string }> 
}) {
  try {
    const { tab } = await searchParams;
    const initialTab = tab && ["valuation", "sellers", "buyers"].includes(tab) ? tab : "valuation";
    const supabase = getServiceRoleClient()
    
    // Fetch data in parallel
    const [valuationRes, sellerRes, buyerRes] = await Promise.all([
      supabase.from('valuation_requests').select('*').order('created_at', { ascending: false }),
      supabase.from('seller_leads').select('*').order('created_at', { ascending: false }),
      supabase.from('buyer_leads').select('*').order('created_at', { ascending: false })
    ])

    // Regenerate signed URLs dynamically for seller leads (1 year expiry)
    const sellerLeads = await Promise.all((sellerRes.data || []).map(async (lead: any) => {
      if (lead.analytics_image_path) {
        try {
          const { data } = await supabase.storage
            .from('analytics-screenshots')
            .createSignedUrl(lead.analytics_image_path, 31536000); // 1 year
          
          if (data?.signedUrl) {
            return {
              ...lead,
              analytics_signed_url: data.signedUrl
            };
          }
        } catch (err) {
          console.error(`Failed to generate signed URL for lead ${lead.id}:`, err);
        }
      }
      return lead;
    }));

    return (
      <LeadsDashboardClient 
        initialValuationLeads={valuationRes.data || []}
        initialSellerLeads={sellerLeads}
        initialBuyerLeads={buyerRes.data || []}
        initialTab={initialTab}
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

import { getServiceRoleClient } from "@/lib/supabase"
import Link from "next/link"

export default async function AdminDashboardPage() {
  let valuationCount = 0;
  let sellerCount = 0;
  let buyerCount = 0;
  let isDbConnected = false;
  let errorMsg = "";

  try {
    const supabase = getServiceRoleClient();
    
    const [valRes, sellerRes, buyerRes] = await Promise.all([
      supabase.from('valuation_requests').select('*', { count: 'exact', head: true }),
      supabase.from('seller_leads').select('*', { count: 'exact', head: true }),
      supabase.from('buyer_leads').select('*', { count: 'exact', head: true })
    ]);

    if (valRes.error) throw valRes.error;

    valuationCount = valRes.count || 0;
    sellerCount = sellerRes.count || 0;
    buyerCount = buyerRes.count || 0;
    isDbConnected = true;

  } catch (error: any) {
    errorMsg = error.message;
  }

  const totalLeads = valuationCount + sellerCount + buyerCount;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="font-headline-md text-on-surface">Dashboard Overview</h2>
        <p className="text-on-surface-variant mt-2 font-body-lg">
          Welcome to the Axcrivo admin dashboard. Here is a high-level summary of your project&apos;s activity.
        </p>
      </div>

      {!isDbConnected && (
        <div className="bg-error-container text-on-error-container p-6 rounded-2xl border border-error/20">
          <div className="flex items-center gap-3 mb-2">
            <span className="material-symbols-outlined text-error">warning</span>
            <h3 className="font-headline-sm font-bold">Database Connection Error</h3>
          </div>
          <p className="text-on-error-container/80">
            Failed to connect to Supabase. Ensure environment variables are set and tables exist.
          </p>
          <pre className="mt-4 p-4 bg-error/10 rounded-xl text-sm font-jetbrains overflow-auto">
            {errorMsg}
          </pre>
        </div>
      )}

      {/* Metrics Grid */}
      <div className="grid grid-cols-4 gap-6">
        <Link href="/admin/leads?tab=valuation" className="block transform hover:-translate-y-1 transition-all duration-300 cursor-pointer">
          <MetricCard 
            title="Total Leads" 
            value={totalLeads.toString()} 
            icon="group" 
            trend="All Time" 
            colorClass="bg-primary-container text-on-primary-container" 
          />
        </Link>
        <Link href="/admin/leads?tab=valuation" className="block transform hover:-translate-y-1 transition-all duration-300 cursor-pointer">
          <MetricCard 
            title="Valuation Requests" 
            value={valuationCount.toString()} 
            icon="real_estate_agent" 
            trend="All Time"
            colorClass="bg-secondary-container text-on-secondary-container" 
          />
        </Link>
        <Link href="/admin/leads?tab=sellers" className="block transform hover:-translate-y-1 transition-all duration-300 cursor-pointer">
          <MetricCard 
            title="Seller Leads" 
            value={sellerCount.toString()} 
            icon="sell" 
            trend="All Time"
            colorClass="bg-tertiary-container text-on-tertiary-container" 
          />
        </Link>
        <Link href="/admin/leads?tab=buyers" className="block transform hover:-translate-y-1 transition-all duration-300 cursor-pointer">
          <MetricCard 
            title="Buyer Leads" 
            value={buyerCount.toString()} 
            icon="shopping_cart" 
            trend="All Time"
            colorClass="bg-surface-container-high text-on-surface" 
          />
        </Link>
      </div>

      {/* Quick Links Section */}
      <div>
        <h3 className="font-headline-sm text-on-surface mb-6">Quick Actions</h3>
        <div className="grid grid-cols-3 gap-6">
          <Link href="/admin/leads" className="group block">
            <div className="bg-surface-container-low border border-outline-variant hover:border-primary/50 transition-all duration-300 p-6 rounded-2xl h-full flex flex-col justify-between group-hover:shadow-md">
              <div>
                <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-primary group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">contacts</span>
                </div>
                <h4 className="font-title-lg text-on-surface mb-2">Leads Dashboard</h4>
                <p className="text-on-surface-variant text-sm">
                  View, filter, and manage all incoming leads and requests in detail.
                </p>
              </div>
              <div className="mt-6 flex items-center text-primary font-medium text-sm">
                Go to Leads <span className="material-symbols-outlined ml-1 text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </div>
          </Link>

          <Link href="/" target="_blank" className="group block">
            <div className="bg-surface-container-low border border-outline-variant hover:border-primary/50 transition-all duration-300 p-6 rounded-2xl h-full flex flex-col justify-between group-hover:shadow-md">
              <div>
                <div className="bg-secondary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-secondary group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">open_in_new</span>
                </div>
                <h4 className="font-title-lg text-on-surface mb-2">Visit Live Site</h4>
                <p className="text-on-surface-variant text-sm">
                  Open the main Axcrivo website in a new tab.
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

function MetricCard({ title, value, icon, trend, colorClass }: { title: string, value: string, icon: string, trend: string, colorClass: string }) {
  return (
    <div className={`p-6 rounded-3xl ${colorClass} shadow-sm hover:shadow-md transition-shadow duration-300 h-full`}>
      <div className="flex justify-between items-start mb-4">
        <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
          <span className="material-symbols-outlined text-[28px]">{icon}</span>
        </div>
        <span className="text-xs font-medium bg-white/30 px-2 py-1 rounded-full backdrop-blur-sm">{trend}</span>
      </div>
      <div>
        <h4 className="opacity-90 font-medium text-sm mb-1">{title}</h4>
        <div className="font-headline-lg font-bold">{value}</div>
      </div>
    </div>
  )
}

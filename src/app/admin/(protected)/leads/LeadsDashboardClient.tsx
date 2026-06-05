"use client"

import { useEffect, useState } from "react"

export function LeadsDashboardClient({ 
  initialValuationLeads, 
  initialSellerLeads, 
  initialBuyerLeads,
  initialTab = "valuation"
}: any) {
  const [activeTab, setActiveTab] = useState(initialTab)
  const [selectedLead, setSelectedLead] = useState<any>(null)
  
  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab)
    }
  }, [initialTab])
  
  const downloadCSV = (data: any[], filename: string) => {
    if (data.length === 0) return;
    const headers = Object.keys(data[0]).join(",")
    const rows = data.map(obj => Object.values(obj).map(v => `"${String(v).replace(/"/g, '""')}"`).join(","))
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n")
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", `${filename}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="space-y-6 relative">
      <div className="flex justify-between items-center">
        <h2 className="font-headline-lg">Leads Management</h2>
      </div>
      
      <div className="flex gap-4 border-b border-outline-variant/30">
        <button 
          onClick={() => setActiveTab("valuation")}
          className={`px-4 py-2 font-label-md ${activeTab === 'valuation' ? 'border-b-2 border-primary text-primary' : 'text-on-surface-variant'}`}
        >
          Valuation Leads ({initialValuationLeads.length})
        </button>
        <button 
          onClick={() => setActiveTab("sellers")}
          className={`px-4 py-2 font-label-md ${activeTab === 'sellers' ? 'border-b-2 border-primary text-primary' : 'text-on-surface-variant'}`}
        >
          Seller Leads ({initialSellerLeads.length})
        </button>
        <button 
          onClick={() => setActiveTab("buyers")}
          className={`px-4 py-2 font-label-md ${activeTab === 'buyers' ? 'border-b-2 border-primary text-primary' : 'text-on-surface-variant'}`}
        >
          Buyer Leads ({initialBuyerLeads.length})
        </button>
      </div>

      <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/30 overflow-x-auto">
        {activeTab === "valuation" && (
          <div className="space-y-4">
            <div className="flex justify-end">
              <button onClick={() => downloadCSV(initialValuationLeads, "valuation-leads")} className="bg-primary text-on-primary px-4 py-2 rounded-lg font-label-sm cursor-pointer">Export CSV</button>
            </div>
            <table className="w-full text-left font-body-sm">
              <thead>
                <tr className="border-b border-outline-variant/30 text-on-surface-variant font-label-sm uppercase">
                  <th className="p-3">Date</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Platform</th>
                  <th className="p-3">Revenue</th>
                  <th className="p-3">Asking Price</th>
                </tr>
              </thead>
              <tbody>
                {initialValuationLeads.map((lead: any) => (
                  <tr key={lead.id} className="border-b border-outline-variant/10 hover:bg-surface-container/50">
                    <td className="p-3">{new Date(lead.created_at).toLocaleDateString()}</td>
                    <td className="p-3">{lead.name}</td>
                    <td className="p-3">{lead.email}</td>
                    <td className="p-3 uppercase">{lead.platform}</td>
                    <td className="p-3">{lead.monthly_revenue ? `₹${Number(lead.monthly_revenue).toLocaleString('en-IN')}` : '-'}</td>
                    <td className="p-3">{lead.asking_price ? `₹${Number(lead.asking_price).toLocaleString('en-IN')}` : '-'}</td>
                  </tr>
                ))}
                {initialValuationLeads.length === 0 && (
                  <tr><td colSpan={6} className="p-4 text-center text-outline">No leads yet</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "sellers" && (
          <div className="space-y-4">
            <div className="flex justify-end">
              <button onClick={() => downloadCSV(initialSellerLeads, "seller-leads")} className="bg-primary text-on-primary px-4 py-2 rounded-lg font-label-sm cursor-pointer">Export CSV</button>
            </div>
            <table className="w-full text-left font-body-sm">
              <thead>
                <tr className="border-b border-outline-variant/30 text-on-surface-variant font-label-sm uppercase">
                  <th className="p-3">Date</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Platform</th>
                  <th className="p-3">Asking Price</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {initialSellerLeads.map((lead: any) => (
                  <tr key={lead.id} className="border-b border-outline-variant/10 hover:bg-surface-container/50">
                    <td className="p-3">{new Date(lead.created_at).toLocaleDateString()}</td>
                    <td className="p-3 font-semibold text-on-surface">{lead.name}</td>
                    <td className="p-3">{lead.email}</td>
                    <td className="p-3 uppercase">{lead.platform}</td>
                    <td className="p-3 font-medium text-secondary">{lead.asking_price ? `₹${Number(lead.asking_price).toLocaleString('en-IN')}` : '-'}</td>
                    <td className="p-3 text-right">
                      <button 
                        onClick={() => setSelectedLead(lead)} 
                        className="bg-secondary text-on-secondary px-3.5 py-1.5 rounded-xl font-label-sm hover:opacity-90 transition-all cursor-pointer shadow-sm active:scale-95 text-xs uppercase tracking-wider"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
                {initialSellerLeads.length === 0 && (
                  <tr><td colSpan={6} className="p-4 text-center text-outline">No leads yet</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "buyers" && (
          <div className="space-y-4">
            <div className="flex justify-end">
              <button onClick={() => downloadCSV(initialBuyerLeads, "buyer-leads")} className="bg-primary text-on-primary px-4 py-2 rounded-lg font-label-sm cursor-pointer">Export CSV</button>
            </div>
            <table className="w-full text-left font-body-sm">
              <thead>
                <tr className="border-b border-outline-variant/30 text-on-surface-variant font-label-sm uppercase">
                  <th className="p-3">Date</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Budget</th>
                  <th className="p-3">Target Platform</th>
                </tr>
              </thead>
              <tbody>
                {initialBuyerLeads.map((lead: any) => (
                  <tr key={lead.id} className="border-b border-outline-variant/10 hover:bg-surface-container/50">
                    <td className="p-3">{new Date(lead.created_at).toLocaleDateString()}</td>
                    <td className="p-3">{lead.name}</td>
                    <td className="p-3">{lead.email}</td>
                    <td className="p-3 font-semibold text-secondary">{lead.budget ? `₹${Number(lead.budget).toLocaleString('en-IN')}` : '-'}</td>
                    <td className="p-3 uppercase">{lead.platform}</td>
                  </tr>
                ))}
                {initialBuyerLeads.length === 0 && (
                  <tr><td colSpan={5} className="p-4 text-center text-outline">No leads yet</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Details Dialog Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-surface-container-lowest border border-outline-variant/30 max-w-2xl w-full rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col my-8 max-h-[90vh]">
            {/* Header */}
            <div className="p-6 border-b border-outline-variant/20 flex justify-between items-center bg-surface-container-low/40">
              <div>
                <h3 className="font-headline-md text-on-surface font-bold">Lead Details</h3>
                <p className="text-xs text-on-surface-variant mt-1">Submitted on {new Date(selectedLead.created_at).toLocaleString()}</p>
              </div>
              <button 
                onClick={() => setSelectedLead(null)} 
                className="w-9 h-9 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Content (Scrollable) */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-on-surface">
              {/* Section 1: Seller Info */}
              <div>
                <h4 className="font-label-md text-primary uppercase tracking-widest text-[11px] mb-2.5 font-bold">Seller Information</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-surface-container-low/50 p-4 rounded-2xl border border-outline-variant/20">
                  <div>
                    <p className="text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">Name</p>
                    <p className="text-sm font-bold text-on-surface mt-0.5">{selectedLead.name}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">Email</p>
                    <p className="text-sm font-medium text-on-surface mt-0.5 break-all" title={selectedLead.email}>{selectedLead.email}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">Phone</p>
                    <p className="text-sm font-medium text-on-surface mt-0.5">{selectedLead.phone}</p>
                  </div>
                </div>
              </div>

              {/* Section 2: Asset Info */}
              <div>
                <h4 className="font-label-md text-primary uppercase tracking-widest text-[11px] mb-2.5 font-bold">Asset Information</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-surface-container-low/50 p-4 rounded-2xl border border-outline-variant/20">
                  <div>
                    <p className="text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">Platform</p>
                    <p className="text-sm font-bold text-on-surface mt-0.5 uppercase">{selectedLead.platform}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">Niche</p>
                    <p className="text-sm font-medium text-on-surface mt-0.5 capitalize">{selectedLead.niche}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">Geography</p>
                    <p className="text-sm font-medium text-on-surface mt-0.5">{selectedLead.country}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">Asset Age</p>
                    <p className="text-sm font-medium text-on-surface mt-0.5">{selectedLead.asset_age || '-'}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">Asset URL</p>
                    {selectedLead.asset_url ? (
                      <a href={selectedLead.asset_url} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-primary hover:underline break-all inline-flex items-center gap-1 mt-0.5">
                        {selectedLead.asset_url} <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                      </a>
                    ) : (
                      <p className="text-sm font-medium text-on-surface-variant mt-0.5">-</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Section 3: Revenue & Expected Price */}
              <div>
                <h4 className="font-label-md text-primary uppercase tracking-widest text-[11px] mb-2.5 font-bold">Financial & Reach Information</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-surface-container-low/50 p-4 rounded-2xl border border-outline-variant/20">
                  <div>
                    <p className="text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">Expected Price</p>
                    <p className="text-sm font-extrabold text-secondary mt-0.5">
                      {selectedLead.asking_price ? `₹${Number(selectedLead.asking_price).toLocaleString('en-IN')}` : '-'}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">Last 12-Month Revenue</p>
                    <p className="text-sm font-medium text-on-surface mt-0.5">
                      {selectedLead.revenue_last_12_months ? `₹${Number(selectedLead.revenue_last_12_months).toLocaleString('en-IN')}` : '-'}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">Avg. Monthly Profit</p>
                    <p className="text-sm font-medium text-on-surface mt-0.5">
                      {selectedLead.average_monthly_profit ? `₹${Number(selectedLead.average_monthly_profit).toLocaleString('en-IN')}` : '-'}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">Audience Size</p>
                    <p className="text-sm font-medium text-on-surface mt-0.5">{Number(selectedLead.audience_size).toLocaleString('en-IN')}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">Monthly Reach/Traffic</p>
                    <p className="text-sm font-medium text-on-surface mt-0.5">{selectedLead.monthly_reach || '-'}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">Monetization</p>
                    <p className="text-xs font-medium text-on-surface mt-0.5 leading-snug">{selectedLead.monetization_status || '-'}</p>
                  </div>
                </div>
              </div>

              {/* Section 4: Reason for Selling */}
              {selectedLead.reason_for_selling && (
                <div>
                  <h4 className="font-label-md text-primary uppercase tracking-widest text-[11px] mb-2.5 font-bold">Reason For Selling</h4>
                  <div className="bg-surface-container-low/50 p-4 rounded-2xl border border-outline-variant/20">
                    <p className="text-sm text-on-surface leading-relaxed">{selectedLead.reason_for_selling}</p>
                  </div>
                </div>
              )}

              {/* Section 5: Analytics Screenshot */}
              <div>
                <h4 className="font-label-md text-primary uppercase tracking-widest text-[11px] mb-2.5 font-bold">Analytics Screenshot</h4>
                <div className="space-y-4 bg-surface-container-low/50 p-4 rounded-2xl border border-outline-variant/20">
                  {selectedLead.analytics_signed_url || selectedLead.screenshot_url ? (
                    <div className="space-y-4">
                      {/* Image Frame */}
                      <div className="border border-outline-variant/20 rounded-xl overflow-hidden bg-surface-container-lowest max-h-[320px] flex items-center justify-center p-3 shadow-inner">
                        <img 
                          src={selectedLead.analytics_signed_url || selectedLead.screenshot_url} 
                          className="max-h-[300px] object-contain w-auto h-auto rounded-lg shadow-sm" 
                          alt="Analytics Screenshot" 
                        />
                      </div>
                      
                      {/* Copyable Signed URL */}
                      <div className="space-y-1.5">
                        <p className="text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">Signed Access URL</p>
                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            readOnly 
                            value={selectedLead.analytics_signed_url || selectedLead.screenshot_url} 
                            className="flex-1 bg-surface-container-lowest border border-outline-variant/50 rounded-xl px-3 py-2.5 text-xs font-mono text-on-surface-variant select-all outline-none"
                          />
                          <button 
                            onClick={() => {
                              navigator.clipboard.writeText(selectedLead.analytics_signed_url || selectedLead.screenshot_url);
                              alert("Signed URL copied to clipboard!");
                            }}
                            className="bg-primary text-on-primary px-4 py-2.5 rounded-xl text-xs font-label-md font-bold uppercase tracking-wider hover:opacity-95 transition-opacity flex items-center justify-center shrink-0 gap-1.5 cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[16px]">content_copy</span>
                            Copy
                          </button>
                          <a 
                            href={selectedLead.analytics_signed_url || selectedLead.screenshot_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="border border-outline-variant text-on-surface px-4 py-2.5 rounded-xl text-xs font-label-md font-bold uppercase tracking-wider hover:bg-surface-container transition-all flex items-center justify-center shrink-0 gap-1.5"
                          >
                            <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                            Open
                          </a>
                        </div>
                        {selectedLead.analytics_uploaded_at && (
                          <p className="text-[10px] text-on-surface-variant mt-1.5">
                            Uploaded at: {new Date(selectedLead.analytics_uploaded_at).toLocaleString()} 
                            {selectedLead.analytics_file_size && ` (${(selectedLead.analytics_file_size / (1024 * 1024)).toFixed(2)} MB)`}
                          </p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-on-surface-variant text-center py-6">No screenshot provided.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-outline-variant/20 bg-surface-container-low/40 flex justify-end">
              <button 
                onClick={() => setSelectedLead(null)} 
                className="bg-on-surface text-surface px-6 py-2.5 rounded-xl font-label-md font-bold uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all cursor-pointer text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

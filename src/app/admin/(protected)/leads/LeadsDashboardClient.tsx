"use client"

import { useState } from "react"

export function LeadsDashboardClient({ 
  initialValuationLeads, 
  initialSellerLeads, 
  initialBuyerLeads 
}: any) {
  const [activeTab, setActiveTab] = useState("valuation")
  
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
    <div className="space-y-6">
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
              <button onClick={() => downloadCSV(initialValuationLeads, "valuation-leads")} className="bg-primary text-on-primary px-4 py-2 rounded-lg font-label-sm">Export CSV</button>
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
                    <td className="p-3">{lead.platform}</td>
                    <td className="p-3">{lead.monthly_revenue}</td>
                    <td className="p-3">{lead.asking_price || '-'}</td>
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
              <button onClick={() => downloadCSV(initialSellerLeads, "seller-leads")} className="bg-primary text-on-primary px-4 py-2 rounded-lg font-label-sm">Export CSV</button>
            </div>
            <table className="w-full text-left font-body-sm">
              <thead>
                <tr className="border-b border-outline-variant/30 text-on-surface-variant font-label-sm uppercase">
                  <th className="p-3">Date</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Platform</th>
                  <th className="p-3">Asking Price</th>
                </tr>
              </thead>
              <tbody>
                {initialSellerLeads.map((lead: any) => (
                  <tr key={lead.id} className="border-b border-outline-variant/10 hover:bg-surface-container/50">
                    <td className="p-3">{new Date(lead.created_at).toLocaleDateString()}</td>
                    <td className="p-3">{lead.name}</td>
                    <td className="p-3">{lead.email}</td>
                    <td className="p-3">{lead.platform}</td>
                    <td className="p-3">{lead.asking_price}</td>
                  </tr>
                ))}
                {initialSellerLeads.length === 0 && (
                  <tr><td colSpan={5} className="p-4 text-center text-outline">No leads yet</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "buyers" && (
          <div className="space-y-4">
            <div className="flex justify-end">
              <button onClick={() => downloadCSV(initialBuyerLeads, "buyer-leads")} className="bg-primary text-on-primary px-4 py-2 rounded-lg font-label-sm">Export CSV</button>
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
                    <td className="p-3">{lead.budget}</td>
                    <td className="p-3">{lead.platform}</td>
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
    </div>
  )
}

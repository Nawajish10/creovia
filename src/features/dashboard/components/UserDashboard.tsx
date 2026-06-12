"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { ValuationAsset, ValuationAssetMetrics, ValuationReport } from "@/types/valuation";
import Link from "next/link";
import { VerificationSummary } from "@/features/verification/components/VerificationSummary";
import { AssetScoreCard } from "./AssetScoreCard";
import { ValuationExplainability } from "./ValuationExplainability";

interface UserDashboardProps {
  userEmail: string;
  onLogout: () => void;
}

interface FullAsset extends ValuationAsset {
  valuation_asset_metrics?: ValuationAssetMetrics[];
  verification_results?: any[];
  valuation_reports?: ValuationReport[];
  uploadCount?: number;
}

export function UserDashboard({ userEmail, onLogout }: UserDashboardProps) {
  const [assets, setAssets] = useState<FullAsset[]>([]);
  const [standaloneReports, setStandaloneReports] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"assets" | "reports">("reports");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedAsset, setSelectedAsset] = useState<FullAsset | null>(null);
  const [report, setReport] = useState<ValuationReport | null>(null);
  const [isLoadingReport, setIsLoadingReport] = useState(false);

  async function fetchDashboardData() {
    setIsLoading(true);
    setError("");
    try {
      // 1. Fetch assets with their metrics, verification results, and valuation reports
      const { data: assetData, error: assetErr } = await supabase
        .from("valuation_assets")
        .select(`
          *,
          valuation_asset_metrics (*),
          verification_results (*),
          valuation_reports (*)
        `)
        .order("created_at", { ascending: false });

      if (assetErr) throw assetErr;

      // 2. Fetch upload counts
      const { data: uploadData, error: uploadErr } = await supabase
        .from("verification_uploads")
        .select("asset_id");

      if (uploadErr) throw uploadErr;

      const enrichedAssets = (assetData || []).map((asset: any) => ({
        ...asset,
        uploadCount: (uploadData || []).filter((u: any) => u.asset_id === asset.id).length
      }));

      setAssets(enrichedAssets);
      
      // 3. Fetch standalone valuation reports (ordered from Verified Report checkout)
      const { data: reportsData, error: reportsErr } = await supabase
        .from("valuation_reports")
        .select("*")
        .eq("email", userEmail)
        .order("created_at", { ascending: false });

      if (reportsErr) {
        console.warn("Could not fetch valuation_reports (table might not exist yet)", reportsErr);
      } else {
        setStandaloneReports(reportsData || []);
      }

      if (enrichedAssets.length > 0) {
        if (!selectedAsset) {
          setSelectedAsset(enrichedAssets[0]);
        } else {
          const updated = enrichedAssets.find((a) => a.id === selectedAsset.id);
          if (updated) {
            setSelectedAsset(updated);
          }
        }
      }
    } catch (err: any) {
      setError(err.message || "Failed to load dashboard data.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Fetch report when selected asset changes or status is Report Generated
  useEffect(() => {
    if (selectedAsset) {
      setReport(null);
      if (selectedAsset.status === "Report Generated") {
        fetchReport(selectedAsset.id);
      }
    } else {
      setReport(null);
    }
  }, [selectedAsset]);

  async function fetchReport(assetId: string) {
    setIsLoadingReport(true);
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData?.session?.access_token;
      
      const res = await fetch(`/api/valuation/report/${assetId}`, {
        headers: {
          Authorization: `Bearer ${token || ""}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        setReport(data.report);
      }
    } catch (err) {
      console.error("Failed to fetch report:", err);
    } finally {
      setIsLoadingReport(false);
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    document.cookie = `sb-access-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    onLogout();
  }

  function getStatusBadge(status: string) {
    switch (status) {
      case "Pending":
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
            Pending Setup
          </span>
        );
      case "Proof Uploaded":
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
            Proof Uploaded
          </span>
        );
      case "Verification Pending":
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            Verification Pending
          </span>
        );
      case "Verified":
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            Verified
          </span>
        );
      case "Report Generated":
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            Report Ready
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
            {status}
          </span>
        );
    }
  }

  function getPlatformIcon(platform: string) {
    const p = platform.toLowerCase();
    if (p.includes("instagram")) return "photo_camera";
    if (p.includes("youtube")) return "video_library";
    if (p.includes("telegram")) return "send";
    if (p.includes("website")) return "language";
    if (p.includes("domain")) return "dns";
    return "grid_view";
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Top Bar */}
      <div className="bg-[#030712]/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 flex flex-row justify-between items-start md:items-center gap-4 shadow-sm">
        <div>
          <h1 className="font-headline-md text-white text-2xl md:text-3xl font-inter font-bold">
            Valuation Dashboard
          </h1>
          <p className="text-gray-400 text-sm mt-1 font-inter">
            Signed in as <span className="font-medium text-blue-400">{userEmail}</span>
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/valuation/submit"
            className="flex items-center bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:opacity-95 transition-opacity text-sm font-medium shadow-[0_0_15px_rgba(37,99,235,0.3)] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px] mr-1.5">add</span>
            Submit New Asset
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center border border-white/20 text-white px-4 py-2.5 rounded-xl hover:bg-white/5 transition-colors text-sm font-medium cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px] mr-1.5">logout</span>
            Sign Out
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-white/10 pb-4 mt-6 px-2">
        <button 
          onClick={() => setActiveTab("reports")}
          className={`text-sm font-inter font-bold tracking-wide uppercase px-4 py-2 rounded-xl transition-all ${activeTab === 'reports' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-[0_0_15px_rgba(37,99,235,0.2)]' : 'text-gray-500 hover:text-gray-300'}`}
        >
          My Reports
        </button>
        <button 
          onClick={() => setActiveTab("assets")}
          className={`text-sm font-inter font-bold tracking-wide uppercase px-4 py-2 rounded-xl transition-all ${activeTab === 'assets' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-[0_0_15px_rgba(37,99,235,0.2)]' : 'text-gray-500 hover:text-gray-300'}`}
        >
          My Assets
        </button>
      </div>

      {isLoading ? (
        <div className="bg-[#030712]/50 border border-white/10 rounded-3xl p-12 text-center shadow-sm">
          <div className="animate-spin text-blue-500 inline-block w-8 h-8 border-[3px] border-current border-t-transparent rounded-full mb-4"></div>
          <p className="text-gray-400 text-sm font-inter">Loading dashboard...</p>
        </div>
      ) : error ? (
        <div className="bg-red-500/10 text-red-400 p-6 rounded-3xl border border-red-500/20">
          <p className="font-medium font-inter">Error loading dashboard</p>
          <p className="text-sm opacity-90 mt-1">{error}</p>
        </div>
      ) : activeTab === "reports" ? (
        standaloneReports.length === 0 ? (
          <div className="bg-[#030712]/50 border border-white/10 rounded-3xl p-16 text-center shadow-sm space-y-6">
            <div className="bg-blue-500/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto text-blue-400">
              <span className="material-symbols-outlined text-[32px]">analytics</span>
            </div>
            <div className="max-w-md mx-auto space-y-2">
              <h3 className="text-white font-inter text-xl font-bold">
                No reports yet.
              </h3>
              <p className="text-gray-400 text-sm font-inter">
                Generate your first verified valuation report to see detailed insights and premium due diligence here.
              </p>
            </div>
            <Link
              href="/#valuation"
              className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-xl hover:opacity-95 transition-opacity text-sm font-medium shadow-[0_0_20px_rgba(37,99,235,0.3)] cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px] mr-2">add</span>
              Create Valuation Report
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-6">
            {standaloneReports.map(rep => (
               <div key={rep.id} className="bg-[#0A1325]/80 backdrop-blur-2xl border border-white/10 rounded-[24px] p-6 shadow-xl flex flex-col hover:border-blue-500/30 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                     <div className="flex flex-col">
                        <span className="text-xs text-gray-400 font-inter uppercase tracking-widest font-bold mb-1">Verified Valuation Report</span>
                        <div className="flex items-center gap-2">
                           <span className="text-white font-inter font-bold text-lg">{rep.platform}</span>
                           <span className="text-blue-400 font-inter font-medium text-sm">@{rep.profile_name}</span>
                        </div>
                     </div>
                     <div className="bg-blue-500/10 w-10 h-10 rounded-full flex items-center justify-center border border-blue-500/20 shadow-[0_0_15px_rgba(37,99,235,0.15)]">
                        <span className="material-symbols-outlined text-blue-400">description</span>
                     </div>
                  </div>
                  
                  <div className="flex flex-col gap-3 mt-4 flex-1">
                     <div className="flex justify-between items-center pb-2 border-b border-white/5">
                        <span className="text-xs text-gray-500 font-inter">Ordered</span>
                        <span className="text-xs text-white font-inter">{new Date(rep.created_at).toLocaleDateString()}</span>
                     </div>
                     <div className="flex justify-between items-center pb-2 border-b border-white/5">
                        <span className="text-xs text-gray-500 font-inter">Expected Delivery</span>
                        <span className="text-xs text-white font-inter">Within 3 Hours</span>
                     </div>
                     <div className="flex justify-between items-center pb-2">
                        <span className="text-xs text-gray-500 font-inter">Status</span>
                        <span className={`text-xs font-inter font-bold px-2 py-0.5 rounded ${rep.status === 'Completed' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'}`}>
                           {rep.status}
                        </span>
                     </div>
                  </div>

                  {rep.status === 'Completed' || rep.status === 'Delivered' ? (
                     <div className="flex gap-3 mt-6">
                        <button className="flex-1 bg-blue-600 text-white font-inter font-bold text-sm py-2.5 rounded-xl shadow-lg">View Report</button>
                        <button className="flex-1 bg-white/5 text-white border border-white/10 hover:bg-white/10 font-inter font-bold text-sm py-2.5 rounded-xl transition-colors">Download PDF</button>
                     </div>
                  ) : (
                     <div className="flex flex-col mt-6 bg-blue-500/5 border border-blue-500/10 p-3 rounded-xl">
                        <div className="flex items-center gap-2 mb-2">
                           <span className="material-symbols-outlined text-blue-400 text-[14px] animate-spin">autorenew</span>
                           <span className="text-blue-400 text-xs font-inter font-bold">Report Generating...</span>
                        </div>
                        <div className="w-full bg-blue-900/30 h-1.5 rounded-full overflow-hidden">
                           <div className="bg-blue-500 h-full w-[45%] animate-pulse"></div>
                        </div>
                     </div>
                  )}
               </div>
            ))}
          </div>
        )
      ) : assets.length === 0 ? (
        <div className="bg-[#030712]/50 border border-white/10 rounded-3xl p-16 text-center shadow-sm space-y-6">
          <div className="bg-blue-500/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto text-blue-400">
            <span className="material-symbols-outlined text-[32px]">folder_open</span>
          </div>
          <div className="max-w-md mx-auto space-y-2">
            <h3 className="font-headline-sm text-white text-xl font-inter font-bold">
              No Valuation Requests Yet
            </h3>
            <p className="text-gray-400 text-sm font-inter">
              Submit your first digital asset or creator page to receive a professional market valuation report and get verified.
            </p>
          </div>
          <Link
            href="/valuation/submit"
            className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-xl hover:opacity-95 transition-opacity text-sm font-medium shadow-[0_0_15px_rgba(37,99,235,0.3)] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px] mr-2">add</span>
            Get Your First Valuation
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-8 items-start">
          {/* Submissions List */}
          <div className="lg:col-span-1 space-y-4 max-h-[600px] overflow-y-auto pr-2">
            <h2 className="font-headline-sm text-lg text-on-surface px-1" style={{ fontFamily: "var(--font-hanken)", fontWeight: 600 }}>
              Submitted Assets ({assets.length})
            </h2>
            <div className="space-y-3">
              {assets.map((asset) => (
                <button
                  key={asset.id}
                  onClick={() => setSelectedAsset(asset)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-200 cursor-pointer ${
                    selectedAsset?.id === asset.id
                      ? "bg-surface-container-low border-primary/50 shadow-sm"
                      : "bg-surface-container-lowest border-outline-variant/20 hover:border-outline-variant/50"
                  }`}
                  style={{ minHeight: "unset" }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 w-10 h-10 rounded-xl flex items-center justify-center text-primary" style={{ color: "#003fd8" }}>
                        <span className="material-symbols-outlined text-[20px]">{getPlatformIcon(asset.platform)}</span>
                      </div>
                      <div>
                        <h4 className="font-headline-sm text-sm text-on-surface line-clamp-1" style={{ fontFamily: "var(--font-hanken)", fontWeight: 600 }}>
                          {asset.title}
                        </h4>
                        <p className="text-xs text-on-surface-variant line-clamp-1" style={{ color: "#434656" }}>
                          {asset.platform}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-xs text-on-surface-variant border-t border-outline-variant/10 pt-3" style={{ color: "#434656" }}>
                    <div>
                      Proofs: <span className="font-semibold text-on-surface">{asset.uploadCount}</span>
                    </div>
                    <div>{getStatusBadge(asset.status)}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Details Pane */}
          <div className="lg:col-span-2">
            {selectedAsset && (
              <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-6 md:p-8 space-y-8 shadow-sm">
                {/* Header */}
                <div className="flex flex-row md:items-center justify-between gap-4 border-b border-outline-variant/10 pb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-semibold uppercase tracking-wider text-primary bg-primary/5 px-2.5 py-1 rounded" style={{ color: "#003fd8" }}>
                        {selectedAsset.asset_type}
                      </span>
                      {getStatusBadge(selectedAsset.status)}
                    </div>
                    <h3 className="font-headline-md text-2xl text-on-surface" style={{ fontFamily: "var(--font-hanken)", fontWeight: 700 }}>
                      {selectedAsset.title}
                    </h3>
                    <a 
                      href={selectedAsset.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-primary hover:underline text-sm inline-flex items-center gap-1 mt-1 cursor-pointer"
                      style={{ color: "#003fd8", minHeight: "unset" }}
                    >
                      {selectedAsset.url}
                      <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                    </a>
                  </div>
                  <div className="text-xs text-on-surface-variant text-right" style={{ color: "#434656" }}>
                    Submitted on: {new Date(selectedAsset.created_at).toLocaleDateString()}
                  </div>
                </div>

                {/* Submitted Metrics */}
                <div>
                  <h4 className="font-headline-sm text-base text-on-surface mb-4" style={{ fontFamily: "var(--font-hanken)", fontWeight: 600 }}>
                    Submitted Metrics
                  </h4>
                  {selectedAsset.valuation_asset_metrics && selectedAsset.valuation_asset_metrics.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {selectedAsset.asset_type === "social" && (
                        <>
                          <MetricBox 
                            label="Followers / Subs" 
                            value={selectedAsset.valuation_asset_metrics[0].followers?.toLocaleString() || "N/A"} 
                          />
                          <MetricBox 
                            label="Average Likes" 
                            value={selectedAsset.valuation_asset_metrics[0].likes?.toLocaleString() || "N/A"} 
                          />
                          <MetricBox 
                            label="Average Comments" 
                            value={selectedAsset.valuation_asset_metrics[0].comments?.toLocaleString() || "N/A"} 
                          />
                          <MetricBox 
                            label="Engagement Rate" 
                            value={selectedAsset.valuation_asset_metrics[0].engagement_rate ? `${selectedAsset.valuation_asset_metrics[0].engagement_rate}%` : "N/A"} 
                          />
                        </>
                      )}
                      {(selectedAsset.asset_type === "website" || selectedAsset.asset_type === "domain") && (
                        <>
                          <MetricBox 
                            label="Monthly Traffic / Views" 
                            value={selectedAsset.valuation_asset_metrics[0].monthly_traffic?.toLocaleString() || selectedAsset.valuation_asset_metrics[0].monthly_views?.toLocaleString() || "N/A"} 
                          />
                        </>
                      )}
                      {(() => {
                        const rev = selectedAsset.valuation_asset_metrics[0].monthly_revenue;
                        if (rev === undefined || rev === null) return <MetricBox label="Monthly Revenue" value="N/A" />;
                        const revINR = rev < 15000 ? rev * 83 : rev;
                        return (
                          <MetricBox 
                            label="Monthly Revenue" 
                            value={`₹${Math.round(revINR).toLocaleString()}`} 
                          />
                        );
                      })()}
                      <MetricBox 
                        label="Niche" 
                        value={selectedAsset.valuation_asset_metrics[0].niche || "N/A"} 
                      />
                    </div>
                  ) : (
                    <p className="text-sm text-on-surface-variant" style={{ color: "#434656" }}>No metrics recorded for this asset.</p>
                  )}
                </div>

                {/* Upload Status */}
                <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/20">
                  <h4 className="font-headline-sm text-sm text-on-surface mb-3" style={{ fontFamily: "var(--font-hanken)", fontWeight: 600 }}>
                    Verification Status
                  </h4>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[20px] text-secondary" style={{ color: "#006c49" }}>cloud_done</span>
                    <span className="text-sm font-medium text-on-surface">
                      {selectedAsset.uploadCount} Verification proof screenshot(s) uploaded successfully.
                    </span>
                  </div>
                </div>

                {selectedAsset.verification_results && selectedAsset.verification_results[0] && (
                  <VerificationSummary scorecard={selectedAsset.verification_results[0]} />
                )}

                {/* Asset Quality Score Card */}
                {selectedAsset.valuation_reports && selectedAsset.valuation_reports[0] && (
                  <AssetScoreCard report={selectedAsset.valuation_reports[0]} />
                )}

                {/* Report Section */}
                <div className="border-t border-outline-variant/10 pt-6">
                  {selectedAsset.status !== "Report Generated" ? (
                    <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/20 text-center space-y-2">
                      <span className="material-symbols-outlined text-[32px] text-on-surface-variant opacity-50" style={{ color: "#434656" }}>pending_actions</span>
                      <h4 className="font-headline-sm text-base text-on-surface" style={{ fontFamily: "var(--font-hanken)", fontWeight: 600 }}>
                        Valuation Report in Progress
                      </h4>
                      <p className="text-xs text-on-surface-variant max-w-md mx-auto" style={{ color: "#434656" }}>
                        Our valuation team is analyzing your submitted proofs and verified metrics. You will be notified here once the report is finalized.
                      </p>
                    </div>
                  ) : isLoadingReport ? (
                    <div className="text-center p-8">
                      <div className="animate-spin text-primary inline-block w-6 h-6 border-[3px] border-current border-t-transparent rounded-full" style={{ color: "#003fd8" }}></div>
                      <p className="text-xs text-on-surface-variant mt-2" style={{ color: "#434656" }}>Retrieving valuation report...</p>
                    </div>
                  ) : report ? (
                    <div className="bg-gradient-to-br from-indigo-50 to-blue-50/50 p-6 md:p-8 rounded-3xl border border-primary/10 space-y-6">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <h4 className="font-headline-sm text-lg text-on-surface" style={{ fontFamily: "var(--font-hanken)", fontWeight: 700 }}>
                            Valuation Summary Report
                          </h4>
                          <p className="text-xs text-on-surface-variant" style={{ color: "#434656" }}>Generated on {new Date(report.created_at).toLocaleDateString()}</p>
                        </div>
                        <div className="bg-primary text-on-primary text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded" style={{ backgroundColor: "#003fd8", color: "#ffffff" }}>
                          Verified
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        {/* Estimate Range Card */}
                        <div className="bg-white p-5 rounded-2xl border border-outline-variant/10 shadow-sm space-y-1 flex flex-col justify-center">
                          <span className="text-xs text-on-surface-variant" style={{ color: "#434656" }}>Estimated Valuation Range</span>
                          <div className="text-2xl md:text-3xl font-extrabold text-primary" style={{ color: "#003fd8", fontFamily: "var(--font-hanken)" }}>
                            ₹{report.estimated_min?.toLocaleString() || "0"} - ₹{report.estimated_max?.toLocaleString() || "0"}
                          </div>
                          <span className="text-[10px] text-on-surface-variant block mt-1" style={{ color: "#434656" }}>Based on comparable digital business sales multiples</span>
                        </div>

                        {/* Scores Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-2">
                          <ScoreIndicator label="Asset Score" score={report.asset_score || 0} />
                          <ScoreIndicator label="Verification" score={report.verification_score || 0} />
                          <ScoreIndicator label="Confidence" score={report.confidence_score || 0} subLabel={report.report_data?.confidenceLabel} />
                          <ScoreIndicator label="Market Demand" score={report.report_data?.marketDemand || 50} />
                        </div>
                      </div>

                      {/* Explainability Section */}
                      <ValuationExplainability explainabilityList={report.report_data?.explainability} />

                      {/* Extra details from report_data */}
                      {report.report_data && (report.report_data.notes || report.report_data.notes === undefined) && (
                        <div className="bg-white/60 p-5 rounded-2xl border border-outline-variant/10 space-y-3">
                          <h5 className="font-headline-sm text-xs text-on-surface uppercase tracking-wider font-semibold" style={{ fontFamily: "var(--font-hanken)" }}>
                            Analysis Notes
                          </h5>
                          <p className="text-xs text-on-surface-variant leading-relaxed" style={{ color: "#434656" }}>
                            {report.report_data.notes || "Metrics match with high correlation to provided proof screenshots. Estimated valuations are calculated against a baseline 12-month average profit multiple of creator assets in the identical niche."}
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="bg-error-container text-on-error-container p-4 rounded-xl text-sm">
                      Failed to retrieve valuation report details.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function MetricBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-surface p-4 rounded-2xl border border-outline-variant/10 space-y-1">
      <span className="text-xs text-on-surface-variant block" style={{ color: "#434656", fontFamily: "var(--font-inter)" }}>{label}</span>
      <span className="font-headline-sm text-base text-on-surface font-semibold block" style={{ fontFamily: "var(--font-hanken)" }}>{value}</span>
    </div>
  );
}

function ScoreIndicator({ label, score, subLabel }: { label: string; score: number; subLabel?: string }) {
  return (
    <div className="bg-white p-3 rounded-xl border border-outline-variant/10 text-center space-y-0.5 flex flex-col justify-between">
      <span className="text-[10px] text-on-surface-variant block line-clamp-1" style={{ color: "#434656" }}>{label}</span>
      <div>
        <span className="text-base font-bold text-on-surface block" style={{ fontFamily: "var(--font-hanken)" }}>{score}/100</span>
        {subLabel && (
          <span className="text-[9px] font-semibold text-slate-500 dark:text-slate-400 block uppercase tracking-tight leading-tight mt-0.5">{subLabel}</span>
        )}
      </div>
    </div>
  );
}

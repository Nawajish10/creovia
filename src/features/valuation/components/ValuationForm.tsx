"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { UserAuth } from "@/features/dashboard/components/UserAuth";
import { useRouter } from "next/navigation";

type Step = 1 | 2 | 3 | 4 | 5; // Step 5 is Success screen

interface FileUploadState {
  id: string;
  name: string;
  size: number;
  type: string;
  progress: number;
  status: "uploading" | "success" | "error";
  dbId?: string;
  filePath?: string;
}

export function ValuationForm() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [authRequiredPrompt, setAuthRequiredPrompt] = useState(false);
  const [isSubmittingAsset, setIsSubmittingAsset] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Asset Information
  const [assetType, setAssetType] = useState<"social" | "website" | "domain">("social");
  const [platform, setPlatform] = useState("Instagram");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  // Metrics
  const [followers, setFollowers] = useState("");
  const [likes, setLikes] = useState("");
  const [comments, setComments] = useState("");
  const [engagementRate, setEngagementRate] = useState("");
  const [monthlyViews, setMonthlyViews] = useState("");
  const [monthlyTraffic, setMonthlyTraffic] = useState("");
  const [monthlyRevenue, setMonthlyRevenue] = useState("");
  const [niche, setNiche] = useState("");

  // Created Asset Metadata (set after step 2 submit)
  const [assetId, setAssetId] = useState<string | null>(null);

  // Uploads
  const [uploads, setUploads] = useState<FileUploadState[]>([]);

  // Check auth state
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
      setUserEmail(session?.user?.email || "");
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
      setUserEmail(session?.user?.email || "");
      if (session) {
        setAuthRequiredPrompt(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Update default platform when asset type changes
  useEffect(() => {
    if (assetType === "social") {
      setPlatform("Instagram");
    } else if (assetType === "website") {
      setPlatform("Content Website");
    } else {
      setPlatform("Domain Name");
    }
  }, [assetType]);

  // Submit asset to API to get assetId before uploading screenshots
  async function submitAssetInfoAndMetrics() {
    setIsSubmittingAsset(true);
    setErrorMessage("");
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData?.session?.access_token;

      if (!token) {
        setAuthRequiredPrompt(true);
        setIsSubmittingAsset(false);
        return;
      }

      const payload = {
        asset: {
          asset_type: assetType,
          platform,
          title,
          url,
        },
        metrics: {
          followers: followers ? parseInt(followers) : null,
          likes: likes ? parseInt(likes) : null,
          comments: comments ? parseInt(comments) : null,
          engagement_rate: engagementRate ? parseFloat(engagementRate) : null,
          monthly_views: monthlyViews ? parseInt(monthlyViews) : null,
          monthly_traffic: monthlyTraffic ? parseInt(monthlyTraffic) : null,
          monthly_revenue: monthlyRevenue ? parseInt(monthlyRevenue) : null,
          niche: niche || null,
          metadata: {},
        },
      };

      const res = await fetch("/api/valuation/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit asset.");
      }

      setAssetId(data.asset.id);
      setStep(3); // Go to uploads
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to create asset record.");
    } finally {
      setIsSubmittingAsset(false);
    }
  }

  // Handle file select and immediate upload
  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>, fileLabel: string) {
    const files = e.target.files;
    if (!files || files.length === 0 || !assetId) return;

    const file = files[0];
    const uploadId = Math.random().toString(36).substring(7);

    // Initial state
    const newUpload: FileUploadState = {
      id: uploadId,
      name: file.name,
      size: file.size,
      type: fileLabel,
      progress: 0,
      status: "uploading",
    };

    setUploads((prev) => [...prev, newUpload]);

    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData?.session?.access_token;

      const formData = new FormData();
      formData.append("asset_id", assetId);
      formData.append("file_type", fileLabel);
      formData.append("file", file);

      // Perform upload
      const res = await fetch("/api/valuation/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token || ""}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Upload failed");
      }

      setUploads((prev) =>
        prev.map((up) =>
          up.id === uploadId
            ? {
                ...up,
                progress: 100,
                status: "success",
                dbId: data.upload.id,
                filePath: data.upload.file_url,
              }
            : up
        )
      );
    } catch (err) {
      setUploads((prev) =>
        prev.map((up) =>
          up.id === uploadId ? { ...up, status: "error", progress: 0 } : up
        )
      );
    }
  }

  // Delete upload before submitting
  async function handleUploadDelete(upload: FileUploadState) {
    if (!upload.dbId) return;
    try {
      const supabaseClient = supabase;
      // Remove from database
      const { error: dbErr } = await supabaseClient
        .from("verification_uploads")
        .delete()
        .eq("id", upload.dbId);

      if (dbErr) throw dbErr;

      // Remove from storage
      if (upload.filePath) {
        await supabaseClient.storage.from("verification-proofs").remove([upload.filePath]);
      }

      setUploads((prev) => prev.filter((up) => up.id !== upload.id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  }

  // Final submit step
  async function finalizeSubmission() {
    if (!assetId) return;
    setIsSubmittingAsset(true);
    try {
      const supabaseClient = supabase;
      // Set status to Verification Pending
      const { error } = await supabaseClient
        .from("valuation_assets")
        .update({ status: "Verification Pending" })
        .eq("id", assetId);

      if (error) throw error;
      setStep(5); // Success step
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to finalize submission.");
    } finally {
      setIsSubmittingAsset(false);
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-6 md:p-8 shadow-sm space-y-8">
      {/* Steps Indicator */}
      {step < 5 && (
        <div className="flex justify-between items-center border-b border-outline-variant/10 pb-6">
          <StepIndicator currentStep={step} stepNumber={1} label="Asset Info" />
          <div className="flex-1 h-0.5 bg-outline-variant/20 mx-2"></div>
          <StepIndicator currentStep={step} stepNumber={2} label="Metrics" />
          <div className="flex-1 h-0.5 bg-outline-variant/20 mx-2"></div>
          <StepIndicator currentStep={step} stepNumber={3} label="Proofs" />
          <div className="flex-1 h-0.5 bg-outline-variant/20 mx-2"></div>
          <StepIndicator currentStep={step} stepNumber={4} label="Review" />
        </div>
      )}

      {errorMessage && (
        <div className="bg-error-container text-on-error-container p-4 rounded-xl text-sm flex gap-2 items-center border border-error/10">
          <span className="material-symbols-outlined text-[20px] text-error">error</span>
          <span>{errorMessage}</span>
        </div>
      )}

      {/* STEP 1: ASSET INFO */}
      {step === 1 && (
        <div className="space-y-6">
          <div>
            <h3 className="font-headline-md text-xl text-on-surface" style={{ fontFamily: "var(--font-hanken)", fontWeight: 700 }}>
              Step 1: Asset Information
            </h3>
            <p className="text-on-surface-variant text-sm mt-1" style={{ color: "#434656" }}>
              Provide the primary details about the creator channel or digital business.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-on-surface mb-1.5" style={{ fontFamily: "var(--font-inter)" }}>
                Asset Type
              </label>
              <div className="grid grid-cols-3 gap-3">
                <AssetTypeButton 
                  label="Social Account" 
                  value="social" 
                  current={assetType} 
                  onClick={() => setAssetType("social")} 
                />
                <AssetTypeButton 
                  label="Website / SaaS" 
                  value="website" 
                  current={assetType} 
                  onClick={() => setAssetType("website")} 
                />
                <AssetTypeButton 
                  label="Domain Name" 
                  value="domain" 
                  current={assetType} 
                  onClick={() => setAssetType("domain")} 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-on-surface mb-1" style={{ fontFamily: "var(--font-inter)" }}>
                Platform / Niche Type
              </label>
              {assetType === "social" ? (
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="w-full bg-surface border border-outline-variant/60 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-body-md"
                >
                  <option value="Instagram">Instagram</option>
                  <option value="YouTube">YouTube</option>
                  <option value="Telegram">Telegram</option>
                  <option value="TikTok">TikTok</option>
                  <option value="Twitter/X">Twitter/X</option>
                  <option value="Other Social">Other Social Page</option>
                </select>
              ) : assetType === "website" ? (
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="w-full bg-surface border border-outline-variant/60 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-body-md"
                >
                  <option value="Content Website">Content Blog / Media Site</option>
                  <option value="E-Commerce">E-Commerce Store</option>
                  <option value="SaaS">SaaS Platform</option>
                  <option value="Newsletter">Newsletter</option>
                  <option value="Other Website">Other Digital Business</option>
                </select>
              ) : (
                <input
                  type="text"
                  readOnly
                  value="Domain Name"
                  className="w-full bg-surface-container-low border border-outline-variant/60 rounded-xl px-4 py-3 text-on-surface-variant focus:outline-none text-body-md"
                />
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-on-surface mb-1" style={{ fontFamily: "var(--font-inter)" }}>
                Asset Title
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. 100k Tech Review Channel"
                className="w-full bg-surface border border-outline-variant/60 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-body-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-on-surface mb-1" style={{ fontFamily: "var(--font-inter)" }}>
                Asset URL / Handle link
              </label>
              <input
                type="url"
                required
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="e.g. https://instagram.com/yourhandle"
                className="w-full bg-surface border border-outline-variant/60 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-body-md"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="button"
              disabled={!title || !url}
              onClick={() => setStep(2)}
              className="bg-primary text-on-primary font-medium px-6 py-3 rounded-xl hover:opacity-95 transition-opacity disabled:opacity-50 flex items-center gap-2 cursor-pointer"
              style={{ backgroundColor: "#003fd8", color: "#ffffff", minHeight: "unset" }}
            >
              Continue to Metrics
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: METRICS */}
      {step === 2 && (
        <div className="space-y-6">
          <div>
            <h3 className="font-headline-md text-xl text-on-surface" style={{ fontFamily: "var(--font-hanken)", fontWeight: 700 }}>
              Step 2: Key Metrics
            </h3>
            <p className="text-on-surface-variant text-sm mt-1" style={{ color: "#434656" }}>
              Enter accurate metrics. They must match the verification proofs uploaded in the next step.
            </p>
          </div>

          <div className="space-y-4">
            {/* Dynamic metrics form fields */}
            {assetType === "social" ? (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-1" style={{ fontFamily: "var(--font-inter)" }}>
                    Followers / Subscribers
                  </label>
                  <input
                    type="number"
                    required
                    value={followers}
                    onChange={(e) => setFollowers(e.target.value)}
                    placeholder="e.g. 50000"
                    className="w-full bg-surface border border-outline-variant/60 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-body-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-1" style={{ fontFamily: "var(--font-inter)" }}>
                    Average Likes per Post
                  </label>
                  <input
                    type="number"
                    value={likes}
                    onChange={(e) => setLikes(e.target.value)}
                    placeholder="e.g. 2400"
                    className="w-full bg-surface border border-outline-variant/60 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-body-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-1" style={{ fontFamily: "var(--font-inter)" }}>
                    Average Comments per Post
                  </label>
                  <input
                    type="number"
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    placeholder="e.g. 150"
                    className="w-full bg-surface border border-outline-variant/60 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-body-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-1" style={{ fontFamily: "var(--font-inter)" }}>
                    Engagement Rate (%)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={engagementRate}
                    onChange={(e) => setEngagementRate(e.target.value)}
                    placeholder="e.g. 4.25"
                    className="w-full bg-surface border border-outline-variant/60 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-body-md"
                  />
                </div>
              </div>
            ) : assetType === "website" ? (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-1" style={{ fontFamily: "var(--font-inter)" }}>
                    Monthly Traffic (Pageviews)
                  </label>
                  <input
                    type="number"
                    required
                    value={monthlyTraffic}
                    onChange={(e) => setMonthlyTraffic(e.target.value)}
                    placeholder="e.g. 15000"
                    className="w-full bg-surface border border-outline-variant/60 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-body-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-1" style={{ fontFamily: "var(--font-inter)" }}>
                    Monthly Page views
                  </label>
                  <input
                    type="number"
                    value={monthlyViews}
                    onChange={(e) => setMonthlyViews(e.target.value)}
                    placeholder="e.g. 25000"
                    className="w-full bg-surface border border-outline-variant/60 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-body-md"
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-1" style={{ fontFamily: "var(--font-inter)" }}>
                    Monthly Unique Visitors
                  </label>
                  <input
                    type="number"
                    value={monthlyTraffic}
                    onChange={(e) => setMonthlyTraffic(e.target.value)}
                    placeholder="e.g. 2000"
                    className="w-full bg-surface border border-outline-variant/60 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-body-md"
                  />
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-on-surface mb-1" style={{ fontFamily: "var(--font-inter)" }}>
                  Monthly Net Revenue (₹ INR)
                </label>
                <input
                  type="number"
                  value={monthlyRevenue}
                  onChange={(e) => setMonthlyRevenue(e.target.value)}
                  placeholder="e.g. 100000"
                  className="w-full bg-surface border border-outline-variant/60 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-body-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-on-surface mb-1" style={{ fontFamily: "var(--font-inter)" }}>
                  Content Niche / Category
                </label>
                <input
                  type="text"
                  required
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  placeholder="e.g. Tech, Fashion, Finance"
                  className="w-full bg-surface border border-outline-variant/60 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-body-md"
                />
              </div>
            </div>
          </div>

          {authRequiredPrompt && (
            <div className="bg-surface-container-low border border-outline-variant rounded-2xl p-6 space-y-4 animate-in fade-in duration-300">
              <div className="flex gap-2.5 items-start">
                <span className="material-symbols-outlined text-primary" style={{ color: "#003fd8" }}>account_circle</span>
                <div>
                  <h4 className="font-headline-sm text-sm font-bold text-on-surface" style={{ fontFamily: "var(--font-hanken)" }}>
                    Account Required
                  </h4>
                  <p className="text-xs text-on-surface-variant mt-1" style={{ color: "#434656" }}>
                    Please register or sign in to complete your submission. We will save your metrics and link them directly to your profile.
                  </p>
                </div>
              </div>
              <UserAuth 
                title="Create Account to Proceed"
                subtitle="Link this submission to your secure profile dashboard"
                onAuthSuccess={() => {
                  setIsAuthenticated(true);
                  setAuthRequiredPrompt(false);
                }}
              />
            </div>
          )}

          <div className="flex justify-between pt-4 border-t border-outline-variant/10">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="flex items-center border border-outline-variant text-on-surface px-6 py-3 rounded-xl hover:bg-surface-container-low transition-colors text-sm font-medium cursor-pointer"
              style={{ minHeight: "unset" }}
            >
              <span className="material-symbols-outlined text-[18px] mr-2">arrow_back</span>
              Back
            </button>
            <button
              type="button"
              disabled={isSubmittingAsset || authRequiredPrompt}
              onClick={submitAssetInfoAndMetrics}
              className="bg-primary text-on-primary font-medium px-6 py-3 rounded-xl hover:opacity-95 transition-opacity disabled:opacity-50 flex items-center gap-2 cursor-pointer"
              style={{ backgroundColor: "#003fd8", color: "#ffffff", minHeight: "unset" }}
            >
              {isSubmittingAsset ? "Submitting..." : "Proceed to Upload Proofs"}
              {!isSubmittingAsset && <span className="material-symbols-outlined text-[18px]">cloud_upload</span>}
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: UPLOADS */}
      {step === 3 && (
        <div className="space-y-6">
          <div>
            <h3 className="font-headline-md text-xl text-on-surface" style={{ fontFamily: "var(--font-hanken)", fontWeight: 700 }}>
              Step 3: Verification Proofs
            </h3>
            <p className="text-on-surface-variant text-sm mt-1" style={{ color: "#434656" }}>
              Upload screenshots of your dashboard to verify metrics. Limit: 2MB per file (PNG, JPG, JPEG, WEBP).
            </p>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <UploadZone 
                label="Analytics Insights" 
                type="analytics" 
                onChange={(e) => handleFileSelect(e, "analytics")} 
                alreadyUploaded={uploads.some(u => u.type === "analytics" && u.status === "success")}
              />
              <UploadZone 
                label="Revenue Statement" 
                type="revenue" 
                onChange={(e) => handleFileSelect(e, "revenue")} 
                alreadyUploaded={uploads.some(u => u.type === "revenue" && u.status === "success")}
              />
              <UploadZone 
                label="Audience Demographics" 
                type="insights" 
                onChange={(e) => handleFileSelect(e, "insights")} 
                alreadyUploaded={uploads.some(u => u.type === "insights" && u.status === "success")}
              />
            </div>

            {/* List Uploaded Files */}
            {uploads.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-headline-sm text-sm text-on-surface" style={{ fontFamily: "var(--font-hanken)", fontWeight: 600 }}>
                  Uploaded Proofs
                </h4>
                <div className="divide-y divide-outline-variant/10 bg-surface-container-low border border-outline-variant/20 rounded-2xl p-4">
                  {uploads.map((up) => (
                    <div key={up.id} className="flex justify-between items-center py-3 first:pt-0 last:pb-0">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-[20px] text-primary" style={{ color: "#003fd8" }}>
                          {up.status === "success" ? "check_circle" : up.status === "error" ? "error" : "autorenew"}
                        </span>
                        <div>
                          <span className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant block" style={{ color: "#434656" }}>
                            {up.type} Proof
                          </span>
                          <span className="text-xs text-on-surface font-medium line-clamp-1 max-w-[250px]">{up.name}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {up.status === "uploading" && (
                          <div className="w-16 bg-surface border border-outline-variant/20 rounded-full h-1.5 overflow-hidden">
                            <div className="bg-primary h-full transition-all duration-300" style={{ width: "60%", backgroundColor: "#003fd8" }}></div>
                          </div>
                        )}
                        {up.status === "success" && (
                          <button
                            type="button"
                            onClick={() => handleUploadDelete(up)}
                            className="text-error hover:bg-error/5 p-1.5 rounded-lg transition-colors cursor-pointer"
                            style={{ minHeight: "unset" }}
                          >
                            <span className="material-symbols-outlined text-[18px]">delete</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between pt-4 border-t border-outline-variant/10">
            <div className="text-xs text-on-surface-variant self-center" style={{ color: "#434656" }}>
              Ready to proceed? Click Continue to review.
            </div>
            <button
              type="button"
              onClick={() => setStep(4)}
              className="bg-primary text-on-primary font-medium px-6 py-3 rounded-xl hover:opacity-95 transition-opacity flex items-center gap-2 cursor-pointer"
              style={{ backgroundColor: "#003fd8", color: "#ffffff", minHeight: "unset" }}
            >
              Continue to Review
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: REVIEW */}
      {step === 4 && (
        <div className="space-y-6">
          <div>
            <h3 className="font-headline-md text-xl text-on-surface" style={{ fontFamily: "var(--font-hanken)", fontWeight: 700 }}>
              Step 4: Review Submission
            </h3>
            <p className="text-on-surface-variant text-sm mt-1" style={{ color: "#434656" }}>
              Please check your asset details and verified metrics before final setup.
            </p>
          </div>

          <div className="space-y-6">
            {/* Info Summary */}
            <div className="bg-surface-container-low border border-outline-variant/20 rounded-2xl p-5 space-y-4">
              <h4 className="font-headline-sm text-sm text-primary uppercase tracking-wider font-semibold border-b border-outline-variant/10 pb-2" style={{ color: "#003fd8" }}>
                Asset Description
              </h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-on-surface-variant block text-xs" style={{ color: "#434656" }}>Platform / Type</span>
                  <span className="font-medium text-on-surface">{platform} ({assetType})</span>
                </div>
                <div>
                  <span className="text-on-surface-variant block text-xs" style={{ color: "#434656" }}>Title</span>
                  <span className="font-medium text-on-surface">{title}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-on-surface-variant block text-xs" style={{ color: "#434656" }}>Link / URL</span>
                  <span className="font-medium text-on-surface break-all">{url}</span>
                </div>
              </div>
            </div>

            {/* Metrics Summary */}
            <div className="bg-surface-container-low border border-outline-variant/20 rounded-2xl p-5 space-y-4">
              <h4 className="font-headline-sm text-sm text-primary uppercase tracking-wider font-semibold border-b border-outline-variant/10 pb-2" style={{ color: "#003fd8" }}>
                Reported Metrics
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                {assetType === "social" ? (
                  <>
                    <div>
                      <span className="text-on-surface-variant block text-xs" style={{ color: "#434656" }}>Followers</span>
                      <span className="font-semibold text-on-surface">{followers || "0"}</span>
                    </div>
                    <div>
                      <span className="text-on-surface-variant block text-xs" style={{ color: "#434656" }}>Likes</span>
                      <span className="font-semibold text-on-surface">{likes || "0"}</span>
                    </div>
                    <div>
                      <span className="text-on-surface-variant block text-xs" style={{ color: "#434656" }}>Comments</span>
                      <span className="font-semibold text-on-surface">{comments || "0"}</span>
                    </div>
                    <div>
                      <span className="text-on-surface-variant block text-xs" style={{ color: "#434656" }}>Engagement</span>
                      <span className="font-semibold text-on-surface">{engagementRate ? `${engagementRate}%` : "0%"}</span>
                    </div>
                  </>
                ) : (
                  <div>
                    <span className="text-on-surface-variant block text-xs" style={{ color: "#434656" }}>Monthly Traffic</span>
                    <span className="font-semibold text-on-surface">{monthlyTraffic || "0"}</span>
                  </div>
                )}
                <div>
                  <span className="text-on-surface-variant block text-xs" style={{ color: "#434656" }}>Monthly Net Revenue</span>
                  <span className="font-semibold text-on-surface">₹{Number(monthlyRevenue || 0).toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-on-surface-variant block text-xs" style={{ color: "#434656" }}>Category / Niche</span>
                  <span className="font-semibold text-on-surface">{niche || "N/A"}</span>
                </div>
              </div>
            </div>

            {/* Proofs Summary */}
            <div className="bg-surface-container-low border border-outline-variant/20 rounded-2xl p-5 space-y-3">
              <h4 className="font-headline-sm text-sm text-primary uppercase tracking-wider font-semibold border-b border-outline-variant/10 pb-2" style={{ color: "#003fd8" }}>
                Uploaded Proofs ({uploads.length})
              </h4>
              {uploads.length === 0 ? (
                <p className="text-xs text-on-surface-variant" style={{ color: "#434656" }}>No proof screenshots uploaded. Uploading proof is recommended to improve evaluation trust score.</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {uploads.map(up => (
                    <span key={up.id} className="inline-flex items-center px-2.5 py-1 rounded bg-white text-xs border border-outline-variant/20 font-medium text-on-surface-variant">
                      <span className="material-symbols-outlined text-[14px] text-secondary mr-1" style={{ color: "#006c49" }}>image</span>
                      {up.type}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-between pt-4 border-t border-outline-variant/10">
            <button
              type="button"
              onClick={() => setStep(3)}
              className="flex items-center border border-outline-variant text-on-surface px-6 py-3 rounded-xl hover:bg-surface-container-low transition-colors text-sm font-medium cursor-pointer"
              style={{ minHeight: "unset" }}
            >
              <span className="material-symbols-outlined text-[18px] mr-2">arrow_back</span>
              Back
            </button>
            <button
              type="button"
              disabled={isSubmittingAsset}
              onClick={finalizeSubmission}
              className="bg-primary text-on-primary font-medium px-8 py-3 rounded-xl hover:opacity-95 transition-opacity disabled:opacity-50 flex items-center gap-2 cursor-pointer"
              style={{ backgroundColor: "#003fd8", color: "#ffffff", minHeight: "unset" }}
            >
              {isSubmittingAsset ? "Submitting Request..." : "Request Valuation & Submit"}
              {!isSubmittingAsset && <span className="material-symbols-outlined text-[18px]">verified</span>}
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: SUCCESS */}
      {step === 5 && (
        <div className="text-center py-12 space-y-6 animate-in zoom-in duration-300">
          <div className="bg-secondary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto text-secondary" style={{ color: "#006c49" }}>
            <span className="material-symbols-outlined text-[48px]">check_circle</span>
          </div>
          <div className="max-w-md mx-auto space-y-2">
            <h3 className="font-headline-md text-2xl text-on-surface" style={{ fontFamily: "var(--font-hanken)", fontWeight: 700 }}>
              Submission Successful!
            </h3>
            <p className="text-on-surface-variant text-sm" style={{ color: "#434656" }}>
              Your digital asset metrics and screenshots are submitted. Our verification agents are generating your professional valuation report.
            </p>
          </div>
          <div className="pt-4">
            <button
              onClick={() => router.push("/dashboard")}
              className="bg-primary text-on-primary font-medium px-6 py-3 rounded-xl hover:opacity-95 transition-opacity cursor-pointer"
              style={{ backgroundColor: "#003fd8", color: "#ffffff", minHeight: "unset" }}
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function StepIndicator({ currentStep, stepNumber, label }: { currentStep: number; stepNumber: number; label: string }) {
  const isCompleted = currentStep > stepNumber;
  const isActive = currentStep === stepNumber;

  return (
    <div className="flex items-center gap-2">
      <div
        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
          isCompleted
            ? "bg-secondary text-on-secondary"
            : isActive
            ? "bg-primary text-on-primary shadow-sm"
            : "bg-surface-container-low text-on-surface-variant border border-outline-variant/20"
        }`}
        style={{
          backgroundColor: isCompleted ? "#006c49" : isActive ? "#003fd8" : undefined,
          color: isCompleted || isActive ? "#ffffff" : "#434656",
        }}
      >
        {isCompleted ? <span className="material-symbols-outlined text-[14px]">check</span> : stepNumber}
      </div>
      <span
        className={`text-xs font-semibold ${isActive ? "text-primary font-bold" : "text-on-surface-variant"}`}
        style={{ color: isActive ? "#003fd8" : "#434656" }}
      >
        {label}
      </span>
    </div>
  );
}

function AssetTypeButton({ label, value, current, onClick }: { label: string; value: string; current: string; onClick: () => void }) {
  const isSelected = current === value;
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-center py-3.5 px-3 rounded-xl font-semibold text-xs border transition-all duration-200 cursor-pointer ${
        isSelected
          ? "bg-primary/5 border-primary text-primary"
          : "bg-surface border-outline-variant/30 text-on-surface-variant hover:border-outline-variant/60"
      }`}
      style={{
        color: isSelected ? "#003fd8" : "#434656",
        borderColor: isSelected ? "#003fd8" : undefined,
        minHeight: "unset",
      }}
    >
      {label}
    </button>
  );
}

function UploadZone({ label, type, onChange, alreadyUploaded }: { label: string; type: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; alreadyUploaded: boolean }) {
  return (
    <div className="relative border border-dashed border-outline-variant/40 hover:border-primary/50 transition-colors bg-surface rounded-2xl p-5 text-center flex flex-col items-center justify-center gap-2 h-36">
      <input
        type="file"
        id={`upload-${type}`}
        onChange={onChange}
        accept="image/png, image/jpeg, image/jpg, image/webp"
        className="absolute inset-0 opacity-0 cursor-pointer"
      />
      <div 
        className={`w-9 h-9 rounded-xl flex items-center justify-center ${
          alreadyUploaded ? "bg-secondary/10 text-secondary" : "bg-primary/5 text-primary"
        }`}
        style={{ color: alreadyUploaded ? "#006c49" : "#003fd8" }}
      >
        <span className="material-symbols-outlined text-[20px]">{alreadyUploaded ? "cloud_done" : "cloud_upload"}</span>
      </div>
      <div>
        <span className="text-xs font-semibold text-on-surface block">{label}</span>
        <span className="text-[10px] text-on-surface-variant block mt-0.5" style={{ color: "#434656" }}>
          {alreadyUploaded ? "Proof uploaded" : "PNG, JPG max 2MB"}
        </span>
      </div>
    </div>
  );
}

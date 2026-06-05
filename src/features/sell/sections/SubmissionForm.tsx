"use client";

import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sellerSchema } from "@/lib/schemas";
import { submitSellerLead } from "@/app/actions/leads";
import { trackEvent } from "@/lib/analytics";
import { supabase } from "@/lib/supabase";
import { z } from "zod";

export function SubmissionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [hasStarted, setHasStarted] = useState(false);

  const [selectedMonetization, setSelectedMonetization] = useState<string[]>([]);
  const [screenshotName, setScreenshotName] = useState("");
  const [screenshotUploading, setScreenshotUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState("");
  const [uploadError, setUploadError] = useState("");

  // Asset Age input group states
  const [ageValue, setAgeValue] = useState("2");
  const [ageUnit, setAgeUnit] = useState("Years");

  const handleStart = () => {
    if (!hasStarted) {
      setHasStarted(true);
      trackEvent("seller_form_started");
    }
  };

  const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm<z.infer<typeof sellerSchema>>({
    resolver: zodResolver(sellerSchema) as any,
    defaultValues: {
      platform: "youtube",
      monetization_status: [],
      ownership_confirmed: false,
      screenshot_url: "",
      analytics_image_path: "",
      analytics_signed_url: "",
      analytics_file_name: "",
      analytics_file_size: 0
    }
  });

  const selectedPlatform = watch("platform") || "youtube";

  // Keep asset_age form field in sync with the input group states
  useEffect(() => {
    setValue("asset_age", `${ageValue} ${ageUnit}`, { shouldValidate: true });
  }, [ageValue, ageUnit, setValue]);

  const handleMonetizationToggle = (option: string) => {
    let updated: string[];
    if (selectedMonetization.includes(option)) {
      updated = selectedMonetization.filter(x => x !== option);
    } else {
      if (option === "Not Monetized") {
        updated = ["Not Monetized"];
      } else {
        updated = [...selectedMonetization.filter(x => x !== "Not Monetized"), option];
      }
    }
    setSelectedMonetization(updated);
    setValue("monetization_status", updated, { shouldValidate: true });
  };

  const handleScreenshotChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate type
      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        setUploadError("Invalid file type. Only PNG, JPG, JPEG, and WEBP are allowed.");
        return;
      }
      // Validate size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setUploadError("File size must be under 5MB.");
        return;
      }

      setUploadError("");
      setScreenshotName(file.name);
      setScreenshotUploading(true);
      setUploadProgress(0);

      // Create local preview URL immediately (low-memory impact, no base64 lag)
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      const localUrl = URL.createObjectURL(file);
      setPreviewUrl(localUrl);

      // Upload to Supabase Storage via our backend API (bypassing client RLS policies)
      try {
        const uploadViaAPI = () => {
          return new Promise<{ filePath: string; signedUrl: string; fileName: string; fileSize: number }>((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            const formData = new FormData();
            formData.append("file", file);

            xhr.upload.addEventListener("progress", (event) => {
              if (event.lengthComputable) {
                const pct = (event.loaded / event.total) * 100;
                setUploadProgress(Math.round(pct));
              }
            });

            xhr.addEventListener("load", () => {
              if (xhr.status >= 200 && xhr.status < 300) {
                try {
                  const response = JSON.parse(xhr.responseText);
                  resolve(response);
                } catch (err) {
                  reject(new Error("Failed to parse server response"));
                }
              } else {
                try {
                  const response = JSON.parse(xhr.responseText);
                  reject(new Error(response.error || `Upload failed with status ${xhr.status}`));
                } catch {
                  reject(new Error(`Upload failed with status ${xhr.status}`));
                }
              }
            });

            xhr.addEventListener("error", () => {
              reject(new Error("Network error during upload"));
            });

            xhr.open("POST", "/api/upload");
            xhr.send(formData);
          });
        };

        const uploadResult = await uploadViaAPI();

        // Populate metadata in form state
        setValue("analytics_image_path", uploadResult.filePath, { shouldValidate: true });
        setValue("analytics_signed_url", uploadResult.signedUrl, { shouldValidate: true });
        setValue("analytics_file_name", uploadResult.fileName, { shouldValidate: true });
        setValue("analytics_file_size", uploadResult.fileSize, { shouldValidate: true });
        setValue("screenshot_url", uploadResult.signedUrl, { shouldValidate: true });

      } catch (err: any) {
        console.error("Storage Upload Error:", err);
        setUploadError(err.message || "Failed to upload image. Please try again.");
        setScreenshotName("");
        if (previewUrl) {
          URL.revokeObjectURL(previewUrl);
          setPreviewUrl("");
        }
      } finally {
        setScreenshotUploading(false);
      }
    }
  };

  const onSubmit = async (data: z.infer<typeof sellerSchema>) => {
    setIsSubmitting(true);
    setErrorMsg("");
    trackEvent("seller_form_submitted");

    const res = await submitSellerLead(data);
    if (res.success) {
      setIsSuccess(true);
      reset();
      setSelectedMonetization([]);
      setScreenshotName("");
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl("");
      }
    } else {
      setErrorMsg(res.error || "Failed to submit. Please try again.");
    }
    setIsSubmitting(false);
  };

  const getAudienceUnit = (platform: string) => {
    switch (platform) {
      case 'youtube':
      case 'newsletter':
        return 'Subscribers';
      case 'telegram':
        return 'Members';
      case 'website':
        return 'Monthly Visitors';
      default:
        return 'Followers';
    }
  };

  const inputClasses = "w-full bg-white/50 dark:bg-surface-container/50 border border-outline-variant/50 rounded-xl px-4 py-3.5 font-label-md placeholder:text-outline/40 focus:ring-2 focus:ring-primary/50 focus:border-primary focus:outline-none transition-all shadow-sm hover:shadow-md text-on-surface";
  
  const inputGroupContainerClasses = "flex rounded-xl border border-outline-variant/50 focus-within:ring-2 focus-within:ring-primary/50 focus-within:border-primary transition-all shadow-sm bg-white/50 dark:bg-surface-container/50 hover:shadow-md overflow-hidden";
  const inputGroupInputClasses = "flex-1 bg-transparent px-4 py-3.5 font-label-md placeholder:text-outline/40 focus:outline-none text-on-surface";
  const inputGroupUnitClasses = "bg-surface-container border-l border-outline-variant/30 px-4 py-3.5 text-on-surface-variant font-label-md font-bold select-none shrink-0 flex items-center justify-center min-w-[120px] text-center text-xs";

  return (
    <SectionWrapper id="submissionform" className="py-12">
      <section className="px-margin-mobile md:px-margin-desktop max-w-[1000px] mx-auto py-12" id="submit-form">
        <div className="bg-surface-container-lowest/80 backdrop-blur-xl border border-outline-variant/30 shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-3xl p-8 md:p-14 relative overflow-hidden transition-all duration-500">
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/20 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-secondary/20 rounded-full blur-[100px] pointer-events-none"></div>
          
          {isSuccess ? (
            <div className="relative z-10 text-center py-16 space-y-6">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 ring-8 ring-primary/5">
                <span className="material-symbols-outlined text-primary text-5xl">check_circle</span>
              </div>
              <h2 className="font-headline-xl text-on-surface font-bold tracking-tight">Asset Submitted Successfully</h2>
              <p className="font-body-lg text-on-surface-variant max-w-xl mx-auto leading-relaxed">
                Thank you! Our advisory team will review your asset details and contact you within 24-48 hours to discuss the next steps.
              </p>
              <button onClick={() => setIsSuccess(false)} className="mt-8 py-4 px-8 rounded-xl border-2 border-outline-variant text-on-surface font-label-md font-bold uppercase tracking-widest hover:bg-surface-container hover:border-outline transition-all">
                Submit Another Asset
              </button>
            </div>
          ) : (
            <>
              <div className="text-center mb-10 relative z-10">
                <h2 className="font-headline-xl text-on-surface font-bold tracking-tight mb-3">List Your Asset</h2>
                <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto">Provide the details below to initiate the selling process. All submissions are strictly confidential.</p>
              </div>

              {errorMsg && <p className="text-error text-sm text-center font-medium bg-error-container text-on-error-container p-3 rounded-xl mb-8">{errorMsg}</p>}
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 relative z-10">
                {/* Honeypot — hidden from real users, filled by bots */}
                <div style={{ display: "none" }} aria-hidden="true">
                  <input {...register("website")} type="text" tabIndex={-1} autoComplete="off" />
                </div>
                
                {/* Section 1: Contact Information */}
                <div className="space-y-5">
                  <h3 className="font-label-lg text-on-surface font-bold border-b border-outline-variant/30 pb-2">Section 1: Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="space-y-1.5 group">
                      <label className="font-label-md text-on-surface-variant block transition-colors group-focus-within:text-primary">Full Name *</label>
                      <input {...register("name")} onFocus={handleStart} className={`${inputClasses} ${errors.name ? 'border-error ring-1 ring-error' : ''}`} placeholder="John Doe" type="text" />
                      {errors.name && <span className="text-error text-xs font-medium">{errors.name.message}</span>}
                    </div>
                    <div className="space-y-1.5 group">
                      <label className="font-label-md text-on-surface-variant block transition-colors group-focus-within:text-primary">Email *</label>
                      <input {...register("email")} className={`${inputClasses} ${errors.email ? 'border-error ring-1 ring-error' : ''}`} placeholder="john@example.com" type="email" />
                      {errors.email && <span className="text-error text-xs font-medium">{errors.email.message}</span>}
                    </div>
                    <div className="space-y-1.5 group">
                      <label className="font-label-md text-on-surface-variant block transition-colors group-focus-within:text-primary">Phone *</label>
                      <input {...register("phone")} className={`${inputClasses} ${errors.phone ? 'border-error ring-1 ring-error' : ''}`} placeholder="+91 98765 43210" type="tel" />
                      {errors.phone && <span className="text-error text-xs font-medium">{errors.phone.message}</span>}
                    </div>
                  </div>
                </div>

                {/* Section 2: Asset Information */}
                <div className="space-y-5">
                  <h3 className="font-label-lg text-on-surface font-bold border-b border-outline-variant/30 pb-2">Section 2: Asset Information</h3>
                  <div className="space-y-5">
                    {/* Row 1: Platform, URL, Niche */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      <div className="space-y-1.5 group">
                        <label className="font-label-md text-on-surface-variant block transition-colors group-focus-within:text-primary">Platform *</label>
                        <div className="relative">
                          <select {...register("platform")} className={`${inputClasses} appearance-none ${errors.platform ? 'border-error ring-1 ring-error' : ''}`}>
                            <option value="youtube">YouTube Channel</option>
                            <option value="instagram">Instagram Page</option>
                            <option value="tiktok">TikTok Account</option>
                            <option value="telegram">Telegram Community</option>
                            <option value="newsletter">Newsletter / Email List</option>
                            <option value="website">Website / Blog</option>
                            <option value="other">Other</option>
                          </select>
                          <span className="absolute right-4 top-3.5 text-outline-variant pointer-events-none material-symbols-outlined">expand_more</span>
                        </div>
                        {errors.platform && <span className="text-error text-xs font-medium">{errors.platform.message}</span>}
                      </div>
                      
                      <div className="space-y-1.5 group">
                        <label className="font-label-md text-on-surface-variant block transition-colors group-focus-within:text-primary">Asset URL</label>
                        <div className="relative">
                          <span className="absolute left-4 top-3.5 text-on-surface-variant material-symbols-outlined text-[20px]">link</span>
                          <input {...register("asset_url")} className={`${inputClasses} pl-11`} placeholder="https://..." type="url" />
                        </div>
                      </div>

                      <div className="space-y-1.5 group">
                        <label className="font-label-md text-on-surface-variant block transition-colors group-focus-within:text-primary">Niche *</label>
                        <input {...register("niche")} className={`${inputClasses} ${errors.niche ? 'border-error ring-1 ring-error' : ''}`} placeholder="e.g. Finance, Gaming, Tech" type="text" />
                        {errors.niche && <span className="text-error text-xs font-medium">{errors.niche.message}</span>}
                      </div>
                    </div>

                    {/* Row 2: Geography, Asset Age */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-1.5 group">
                        <label className="font-label-md text-on-surface-variant block transition-colors group-focus-within:text-primary">Audience Geography *</label>
                        <input {...register("country")} className={`${inputClasses} ${errors.country ? 'border-error ring-1 ring-error' : ''}`} placeholder="e.g. India, US, Global" type="text" />
                        {errors.country && <span className="text-error text-xs font-medium">{errors.country.message}</span>}
                      </div>

                      <div className="space-y-1.5 group">
                        <label className="font-label-md text-on-surface-variant block transition-colors group-focus-within:text-primary">Asset Age *</label>
                        <div className={inputGroupContainerClasses}>
                          <input 
                            type="number" 
                            value={ageValue} 
                            onChange={(e) => setAgeValue(e.target.value)} 
                            className={inputGroupInputClasses} 
                            placeholder="2" 
                            min="0"
                          />
                          <select 
                            value={ageUnit} 
                            onChange={(e) => setAgeUnit(e.target.value)} 
                            className="bg-surface-container border-l border-outline-variant/30 px-4 py-3.5 text-on-surface-variant font-label-md outline-none cursor-pointer text-on-surface"
                          >
                            <option value="Years">Years</option>
                            <option value="Months">Months</option>
                          </select>
                        </div>
                        {errors.asset_age && <span className="text-error text-xs font-medium">{errors.asset_age.message}</span>}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 3: Performance */}
                <div className="space-y-5">
                  <h3 className="font-label-lg text-on-surface font-bold border-b border-outline-variant/30 pb-2">Section 3: Performance</h3>
                  <div className="space-y-5">
                    {/* Row 1: Audience Size, Monthly Reach, Revenue */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      <div className="space-y-1.5 group">
                        <label className="font-label-md text-on-surface-variant block transition-colors group-focus-within:text-primary">Audience Size *</label>
                        <div className={inputGroupContainerClasses}>
                          <input {...register("audience_size")} className={inputGroupInputClasses} placeholder="e.g. 500000" type="number" />
                          <span className={inputGroupUnitClasses}>
                            {getAudienceUnit(selectedPlatform)}
                          </span>
                        </div>
                        {errors.audience_size && <span className="text-error text-xs font-medium">{errors.audience_size.message}</span>}
                      </div>

                      <div className="space-y-1.5 group">
                        <label className="font-label-md text-on-surface-variant block transition-colors group-focus-within:text-primary">Monthly Reach/Traffic *</label>
                        <input {...register("monthly_reach")} className={`${inputClasses} ${errors.monthly_reach ? 'border-error ring-1 ring-error' : ''}`} placeholder="e.g. 1M reach or 50K visits" type="text" />
                        {errors.monthly_reach && <span className="text-error text-xs font-medium">{errors.monthly_reach.message}</span>}
                      </div>
                      
                      <div className="space-y-1.5 group">
                        <label className="font-label-md text-on-surface-variant block transition-colors group-focus-within:text-primary">Revenue Last 12 Months</label>
                        <div className={inputGroupContainerClasses}>
                          <input {...register("revenue_last_12_months")} className={inputGroupInputClasses} placeholder="0" type="number" />
                          <span className={inputGroupUnitClasses}>INR</span>
                        </div>
                        {errors.revenue_last_12_months && <span className="text-error text-xs font-medium">{errors.revenue_last_12_months.message}</span>}
                      </div>
                    </div>

                    {/* Row 2: Monthly Profit, Expected Price */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-1.5 group">
                        <label className="font-label-md text-on-surface-variant block transition-colors group-focus-within:text-primary">Average Monthly Profit</label>
                        <div className={inputGroupContainerClasses}>
                          <input {...register("average_monthly_profit")} className={inputGroupInputClasses} placeholder="0" type="number" />
                          <span className={inputGroupUnitClasses}>INR</span>
                        </div>
                        {errors.average_monthly_profit && <span className="text-error text-xs font-medium">{errors.average_monthly_profit.message}</span>}
                      </div>

                      <div className="space-y-1.5 group">
                        <label className="font-label-md text-on-surface-variant block transition-colors group-focus-within:text-primary">Expected Price *</label>
                        <div className={inputGroupContainerClasses}>
                          <input {...register("asking_price")} className={`${inputGroupInputClasses} ${errors.asking_price ? 'border-error' : ''}`} placeholder="0" type="number" />
                          <span className={inputGroupUnitClasses}>INR</span>
                        </div>
                        {errors.asking_price && <span className="text-error text-xs font-medium">{errors.asking_price.message}</span>}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 4: Verification & Monetization */}
                <div className="space-y-5">
                  <h3 className="font-label-lg text-on-surface font-bold border-b border-outline-variant/30 pb-2">Section 4: Verification</h3>
                  
                  {/* Monetization Status Checklist */}
                  <div className="space-y-3">
                    <label className="font-label-md text-on-surface font-bold block text-on-surface">Monetization Status *</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {[
                        "Ad Revenue",
                        "Sponsorships",
                        "Affiliate Income",
                        "Digital Products",
                        "E-commerce",
                        "Not Monetized"
                      ].map((option) => {
                        const isChecked = selectedMonetization.includes(option);
                        return (
                          <button
                            key={option}
                            type="button"
                            onClick={() => handleMonetizationToggle(option)}
                            className={`flex items-center gap-3 p-3.5 rounded-xl border text-left font-body-md transition-all cursor-pointer ${
                              isChecked
                                ? 'bg-primary/10 border-primary text-primary font-semibold shadow-sm'
                                : 'bg-white/30 dark:bg-surface-container/30 border-outline-variant/50 text-on-surface-variant hover:bg-surface-container'
                            }`}
                          >
                            <span className="material-symbols-outlined text-[20px]">
                              {isChecked ? 'check_box' : 'check_box_outline_blank'}
                            </span>
                            {option}
                          </button>
                        );
                      })}
                    </div>
                    {errors.monetization_status && <span className="text-error text-xs font-medium block">{errors.monetization_status.message}</span>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
                    {/* Analytics Screenshot Upload */}
                    <div className="space-y-2">
                      <label className="font-label-md text-on-surface-variant block">Analytics Screenshot Upload *</label>
                      
                      {previewUrl ? (
                        <div className="relative border border-outline-variant/30 rounded-2xl overflow-hidden bg-surface-container-low max-w-[400px] shadow-sm group">
                          <img src={previewUrl} className="w-full h-48 object-contain p-2" alt="Screenshot Preview" />
                          <button
                            type="button"
                            disabled={screenshotUploading}
                            onClick={() => {
                              setValue("analytics_image_path", "");
                              setValue("analytics_signed_url", "");
                              setValue("analytics_file_name", "");
                              setValue("analytics_file_size", 0);
                              setValue("screenshot_url", "");
                              setScreenshotName("");
                              if (previewUrl) {
                                URL.revokeObjectURL(previewUrl);
                                setPreviewUrl("");
                              }
                            }}
                            className="absolute top-2 right-2 bg-error text-on-error w-8 h-8 rounded-full flex items-center justify-center shadow-md hover:bg-error/90 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
                            title="Remove image"
                          >
                            <span className="material-symbols-outlined text-[18px]">close</span>
                          </button>
                          <div className="p-3 bg-surface-container-lowest text-xs font-label-md text-on-surface-variant truncate border-t border-outline-variant/10 flex justify-between items-center">
                            <span className="truncate">{screenshotName}</span>
                          </div>
                        </div>
                      ) : (
                        <div className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer relative group transition-all ${
                          errors.analytics_image_path
                            ? 'border-error bg-error/5'
                            : 'border-outline-variant/50 hover:border-primary/50 bg-white/10 dark:bg-surface-container/10'
                        }`}>
                          <input
                            type="file"
                            accept="image/png, image/jpeg, image/jpg, image/webp"
                            onChange={handleScreenshotChange}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            disabled={screenshotUploading}
                          />
                          <div className="space-y-2">
                            <span className={`material-symbols-outlined text-4xl transition-colors ${
                              errors.analytics_image_path
                                ? 'text-error'
                                : 'text-outline-variant group-hover:text-primary'
                            }`}>
                              cloud_upload
                            </span>
                            <p className="font-label-md text-on-surface-variant">
                              Click or drag screenshot here
                            </p>
                            <p className="font-label-sm text-xs text-outline-variant/70">PNG, JPG, JPEG, or WEBP up to 5MB</p>
                          </div>
                        </div>
                      )}

                      {screenshotUploading && (
                        <div className="space-y-1.5 mt-2">
                          <div className="flex justify-between text-xs font-label-sm text-on-surface-variant">
                            <span>Uploading screenshot...</span>
                            <span>{uploadProgress}%</span>
                          </div>
                          <div className="w-full bg-surface-container rounded-full h-2 overflow-hidden border border-outline-variant/10">
                            <div className="bg-primary h-full transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
                          </div>
                        </div>
                      )}

                      {uploadError && <span className="text-error text-xs font-medium block mt-1">{uploadError}</span>}
                      {errors.analytics_image_path && <span className="text-error text-xs font-medium block mt-1">{errors.analytics_image_path.message}</span>}
                    </div>

                    {/* Reason for Selling */}
                    <div className="space-y-2">
                      <label className="font-label-md text-on-surface-variant block">Reason for Selling</label>
                      <textarea
                        {...register("reason_for_selling")}
                        className={`${inputClasses} resize-none h-[120px]`}
                        placeholder="e.g. Moving to other projects, Need capital..."
                      />
                    </div>
                  </div>

                  {/* Ownership Confirmation Checkbox */}
                  <div className="space-y-2 pt-2">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        {...register("ownership_confirmed")}
                        className="rounded border-outline-variant text-primary focus:ring-primary h-5 w-5 mt-0.5 cursor-pointer"
                      />
                      <span className="font-body-md text-on-surface-variant select-none">
                        I confirm that I am the legal owner of this asset or authorized to negotiate its sale. *
                      </span>
                    </label>
                    {errors.ownership_confirmed && <span className="text-error text-xs font-medium block">{errors.ownership_confirmed.message}</span>}
                  </div>
                </div>

                {/* Submit */}
                <div className="pt-4">
                  <button disabled={isSubmitting || screenshotUploading} className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-primary/80 text-on-primary font-label-md font-bold uppercase tracking-widest hover:shadow-[0_0_20px_rgba(var(--color-primary-rgb),0.4)] hover:-translate-y-0.5 transition-all duration-300 flex justify-center items-center gap-2 disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none cursor-pointer" type="submit">
                    {isSubmitting ? (
                      <><span className="material-symbols-outlined text-[18px] animate-spin">refresh</span> Submitting...</>
                    ) : screenshotUploading ? (
                      <><span className="material-symbols-outlined text-[18px] animate-spin">refresh</span> Uploading screenshot...</>
                    ) : (
                      "Submit Asset for Review"
                    )}
                  </button>
                  <p className="font-label-sm text-on-surface-variant text-center mt-4 flex items-center justify-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px]">lock</span>
                    Your data is secure and will not be shared without an NDA.
                  </p>
                </div>
              </form>
            </>
          )}
        </div>
      </section>
    </SectionWrapper>
  );
}

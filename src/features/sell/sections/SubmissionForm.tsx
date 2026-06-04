"use client";

import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sellerSchema } from "@/lib/schemas";
import { submitSellerLead } from "@/app/actions/leads";
import { trackEvent } from "@/lib/analytics";
import { z } from "zod";

export function SubmissionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [hasStarted, setHasStarted] = useState(false);

  const [selectedMonetization, setSelectedMonetization] = useState<string[]>([]);
  const [screenshotName, setScreenshotName] = useState("");
  const [screenshotUploading, setScreenshotUploading] = useState(false);

  const handleStart = () => {
    if (!hasStarted) {
      setHasStarted(true);
      trackEvent("seller_form_started");
    }
  };

  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm<z.infer<typeof sellerSchema>>({
    resolver: zodResolver(sellerSchema) as any,
    defaultValues: {
      platform: "youtube",
      monetization_status: [],
      ownership_confirmed: false,
      screenshot_url: ""
    }
  });

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

  const handleScreenshotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be under 5MB");
        return;
      }
      setScreenshotName(file.name);
      setScreenshotUploading(true);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue("screenshot_url", reader.result as string, { shouldValidate: true });
        setScreenshotUploading(false);
      };
      reader.readAsDataURL(file);
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
    } else {
      setErrorMsg(res.error || "Failed to submit. Please try again.");
    }
    setIsSubmitting(false);
  };

  const inputClasses = "w-full bg-white/50 dark:bg-surface-container/50 border border-outline-variant/50 rounded-xl px-4 py-3.5 font-label-md placeholder:text-outline/40 focus:ring-2 focus:ring-primary/50 focus:border-primary focus:outline-none transition-all shadow-sm hover:shadow-md";

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

                    <div className="space-y-1.5 group">
                      <label className="font-label-md text-on-surface-variant block transition-colors group-focus-within:text-primary">Audience Geography *</label>
                      <input {...register("country")} className={`${inputClasses} ${errors.country ? 'border-error ring-1 ring-error' : ''}`} placeholder="e.g. India, US, Global" type="text" />
                      {errors.country && <span className="text-error text-xs font-medium">{errors.country.message}</span>}
                    </div>

                    <div className="space-y-1.5 group">
                      <label className="font-label-md text-on-surface-variant block transition-colors group-focus-within:text-primary">Asset Age *</label>
                      <input {...register("asset_age")} className={`${inputClasses} ${errors.asset_age ? 'border-error ring-1 ring-error' : ''}`} placeholder="e.g. 2 years, 6 months" type="text" />
                      {errors.asset_age && <span className="text-error text-xs font-medium">{errors.asset_age.message}</span>}
                    </div>
                  </div>
                </div>

                {/* Section 3: Performance */}
                <div className="space-y-5">
                  <h3 className="font-label-lg text-on-surface font-bold border-b border-outline-variant/30 pb-2">Section 3: Performance</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="space-y-1.5 group">
                      <label className="font-label-md text-on-surface-variant block transition-colors group-focus-within:text-primary">Audience Size *</label>
                      <input {...register("audience_size")} className={`${inputClasses} ${errors.audience_size ? 'border-error ring-1 ring-error' : ''}`} placeholder="e.g. 500000" type="number" />
                      {errors.audience_size && <span className="text-error text-xs font-medium">{errors.audience_size.message}</span>}
                    </div>

                    <div className="space-y-1.5 group">
                      <label className="font-label-md text-on-surface-variant block transition-colors group-focus-within:text-primary">Monthly Reach/Traffic *</label>
                      <input {...register("monthly_reach")} className={`${inputClasses} ${errors.monthly_reach ? 'border-error ring-1 ring-error' : ''}`} placeholder="e.g. 1M reach or 50K visits" type="text" />
                      {errors.monthly_reach && <span className="text-error text-xs font-medium">{errors.monthly_reach.message}</span>}
                    </div>
                    
                    <div className="space-y-1.5 group">
                      <label className="font-label-md text-on-surface-variant block transition-colors group-focus-within:text-primary">Revenue Last 12 Months (INR)</label>
                      <div className="relative">
                        <span className="absolute left-4 top-3.5 text-on-surface-variant font-label-md font-bold">₹</span>
                        <input {...register("revenue_last_12_months")} className={`${inputClasses} pl-9`} placeholder="0" type="number" />
                      </div>
                    </div>

                    <div className="space-y-1.5 group">
                      <label className="font-label-md text-on-surface-variant block transition-colors group-focus-within:text-primary">Average Monthly Profit (INR)</label>
                      <div className="relative">
                        <span className="absolute left-4 top-3.5 text-on-surface-variant font-label-md font-bold">₹</span>
                        <input {...register("average_monthly_profit")} className={`${inputClasses} pl-9`} placeholder="0" type="number" />
                      </div>
                    </div>

                    <div className="space-y-1.5 group">
                      <label className="font-label-md text-on-surface-variant block transition-colors group-focus-within:text-primary">Expected Price (INR) *</label>
                      <div className="relative">
                        <span className="absolute left-4 top-3.5 text-on-surface-variant font-label-md font-bold">₹</span>
                        <input {...register("asking_price")} className={`${inputClasses} pl-9 ${errors.asking_price ? 'border-error ring-1 ring-error' : ''}`} placeholder="0" type="number" />
                      </div>
                      {errors.asking_price && <span className="text-error text-xs font-medium">{errors.asking_price.message}</span>}
                    </div>
                  </div>
                </div>

                {/* Section 4: Verification & Monetization */}
                <div className="space-y-5">
                  <h3 className="font-label-lg text-on-surface font-bold border-b border-outline-variant/30 pb-2">Section 4: Verification</h3>
                  
                  {/* Monetization Status Checklist */}
                  <div className="space-y-3">
                    <label className="font-label-md text-on-surface font-bold block">Monetization Status *</label>
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
                      <div className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer relative group transition-all ${
                        errors.screenshot_url
                          ? 'border-error bg-error/5'
                          : 'border-outline-variant/50 hover:border-primary/50 bg-white/10 dark:bg-surface-container/10'
                      }`}>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleScreenshotChange}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                        <div className="space-y-2">
                          <span className={`material-symbols-outlined text-4xl transition-colors ${
                            errors.screenshot_url
                              ? 'text-error'
                              : 'text-outline-variant group-hover:text-primary'
                          }`}>
                            cloud_upload
                          </span>
                          <p className="font-label-md text-on-surface-variant">
                            {screenshotUploading ? "Processing..." : screenshotName ? `Selected: ${screenshotName}` : "Click or drag screenshot here"}
                          </p>
                          <p className="font-label-sm text-xs text-outline-variant/70">PNG, JPG or WEBP up to 5MB</p>
                        </div>
                      </div>
                      {errors.screenshot_url && <span className="text-error text-xs font-medium">{errors.screenshot_url.message}</span>}
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
                  <button disabled={isSubmitting} className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-primary/80 text-on-primary font-label-md font-bold uppercase tracking-widest hover:shadow-[0_0_20px_rgba(var(--color-primary-rgb),0.4)] hover:-translate-y-0.5 transition-all duration-300 flex justify-center items-center gap-2 disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none" type="submit">
                    {isSubmitting ? <><span className="material-symbols-outlined text-[18px] animate-spin">refresh</span> Submitting...</> : "Submit Asset for Review"}
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

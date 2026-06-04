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

  const handleStart = () => {
    if (!hasStarted) {
      setHasStarted(true);
      trackEvent("seller_form_started");
    }
  };

  const { register, handleSubmit, formState: { errors }, reset } = useForm<z.infer<typeof sellerSchema>>({
    resolver: zodResolver(sellerSchema) as any,
    defaultValues: {
      platform: "youtube"
    }
  });

  const onSubmit = async (data: z.infer<typeof sellerSchema>) => {
    setIsSubmitting(true);
    setErrorMsg("");
    trackEvent("seller_form_submitted");

    const res = await submitSellerLead(data);
    if (res.success) {
      setIsSuccess(true);
      reset();
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
                
                {/* Personal Info Section */}
                <div className="space-y-5">
                  <h3 className="font-label-lg text-on-surface font-bold border-b border-outline-variant/30 pb-2">1. Personal Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="space-y-1.5 group">
                      <label className="font-label-md text-on-surface-variant block transition-colors group-focus-within:text-primary">Full Name *</label>
                      <input {...register("name")} onFocus={handleStart} className={`${inputClasses} ${errors.name ? 'border-error ring-1 ring-error' : ''}`} placeholder="John Doe" type="text" />
                      {errors.name && <span className="text-error text-xs font-medium">{errors.name.message}</span>}
                    </div>
                    <div className="space-y-1.5 group">
                      <label className="font-label-md text-on-surface-variant block transition-colors group-focus-within:text-primary">Email Address *</label>
                      <input {...register("email")} className={`${inputClasses} ${errors.email ? 'border-error ring-1 ring-error' : ''}`} placeholder="john@example.com" type="email" />
                      {errors.email && <span className="text-error text-xs font-medium">{errors.email.message}</span>}
                    </div>
                    <div className="space-y-1.5 group">
                      <label className="font-label-md text-on-surface-variant block transition-colors group-focus-within:text-primary">Phone Number</label>
                      <input {...register("phone")} className={`${inputClasses} ${errors.phone ? 'border-error ring-1 ring-error' : ''}`} placeholder="+91 98765 43210" type="tel" />
                      {errors.phone && <span className="text-error text-xs font-medium">{errors.phone.message}</span>}
                    </div>
                  </div>
                </div>

                {/* Asset Details Section */}
                <div className="space-y-5">
                  <h3 className="font-label-lg text-on-surface font-bold border-b border-outline-variant/30 pb-2">2. Asset Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5 group">
                      <label className="font-label-md text-on-surface-variant block transition-colors group-focus-within:text-primary">Primary Platform *</label>
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
                      <label className="font-label-md text-on-surface-variant block transition-colors group-focus-within:text-primary">Asset URL (Optional)</label>
                      <div className="relative">
                        <span className="absolute left-4 top-3.5 text-on-surface-variant material-symbols-outlined text-[20px]">link</span>
                        <input {...register("asset_url")} className={`${inputClasses} pl-11`} placeholder="https://..." type="url" />
                      </div>
                    </div>

                    <div className="space-y-1.5 group">
                      <label className="font-label-md text-on-surface-variant block transition-colors group-focus-within:text-primary">Content Niche</label>
                      <input {...register("niche")} className={inputClasses} placeholder="e.g. Finance, Gaming, Tech" type="text" />
                    </div>

                    <div className="space-y-1.5 group">
                      <label className="font-label-md text-on-surface-variant block transition-colors group-focus-within:text-primary">Primary Audience Geo *</label>
                      <input {...register("country")} className={`${inputClasses} ${errors.country ? 'border-error ring-1 ring-error' : ''}`} placeholder="e.g. India, US, Global" type="text" />
                      {errors.country && <span className="text-error text-xs font-medium">{errors.country.message}</span>}
                    </div>
                  </div>
                </div>

                {/* Metrics Section */}
                <div className="space-y-5">
                  <h3 className="font-label-lg text-on-surface font-bold border-b border-outline-variant/30 pb-2">3. Metrics & Expectations</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="space-y-1.5 group">
                      <label className="font-label-md text-on-surface-variant block transition-colors group-focus-within:text-primary">Total Audience Size *</label>
                      <input {...register("audience_size")} className={`${inputClasses} ${errors.audience_size ? 'border-error ring-1 ring-error' : ''}`} placeholder="e.g. 500000" type="number" />
                      {errors.audience_size && <span className="text-error text-xs font-medium">{errors.audience_size.message}</span>}
                    </div>
                    
                    <div className="space-y-1.5 group">
                      <label className="font-label-md text-on-surface-variant block transition-colors group-focus-within:text-primary">12M Revenue (INR)</label>
                      <div className="relative">
                        <span className="absolute left-4 top-3.5 text-on-surface-variant font-label-md font-bold">₹</span>
                        <input {...register("monthly_revenue")} className={`${inputClasses} pl-9`} placeholder="0" type="number" />
                      </div>
                      {errors.monthly_revenue && <span className="text-error text-xs font-medium">{errors.monthly_revenue.message}</span>}
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
                  <div className="space-y-1.5 group">
                    <label className="font-label-md text-on-surface-variant block transition-colors group-focus-within:text-primary">Reason for Selling</label>
                    <textarea {...register("reason_for_selling")} className={`${inputClasses} resize-none h-24`} placeholder="e.g. Moving to other projects, Need capital..." />
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

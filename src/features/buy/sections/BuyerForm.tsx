"use client";

import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { buyerSchema } from "@/lib/schemas";
import { submitBuyerLead } from "@/app/actions/leads";
import { trackEvent } from "@/lib/analytics";
import { z } from "zod";

export function BuyerForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [hasStarted, setHasStarted] = useState(false);

  const handleStart = () => {
    if (!hasStarted) {
      setHasStarted(true);
      trackEvent("buyer_form_started");
    }
  };

  const { register, handleSubmit, formState: { errors }, reset } = useForm<z.infer<typeof buyerSchema>>({
    resolver: zodResolver(buyerSchema) as any,
    defaultValues: {
      budget: 100000,
      platform: "youtube"
    }
  });

  const onSubmit = async (data: z.infer<typeof buyerSchema>) => {
    setIsSubmitting(true);
    setErrorMsg("");
    trackEvent("buyer_form_submitted");

    const res = await submitBuyerLead(data);
    if (res.success) {
      setIsSuccess(true);
      reset();
    } else {
      setErrorMsg(res.error || "Failed to submit. Please try again.");
    }
    setIsSubmitting(false);
  };

  const inputClasses = "w-full bg-white/50 dark:bg-surface-container/50 border border-outline-variant/50 rounded-xl px-3.5 md:px-4 py-2.5 md:py-3.5 font-body-md text-sm md:text-base placeholder:text-outline/40 focus:ring-2 focus:ring-primary/50 focus:border-primary focus:outline-none transition-all shadow-sm hover:shadow-md text-on-surface";

  return (
    <SectionWrapper id="buyerform" className="py-6 md:py-12">
      <section className="px-margin-mobile md:px-margin-desktop max-w-[1000px] mx-auto py-4 md:py-12" id="submit-form">
        <div className="bg-surface-container-lowest/80 backdrop-blur-xl border border-outline-variant/30 shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-2xl md:rounded-3xl p-5 md:p-14 relative overflow-hidden transition-all duration-500">
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/20 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-secondary/20 rounded-full blur-[100px] pointer-events-none"></div>
          
          {isSuccess ? (
            <div className="relative z-10 text-center py-16 space-y-6">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 ring-8 ring-primary/5">
                <span className="material-symbols-outlined text-primary text-5xl">check_circle</span>
              </div>
              <h2 className="font-headline-xl text-on-surface font-bold tracking-tight">Request Received Successfully</h2>
              <p className="font-body-lg text-on-surface-variant max-w-xl mx-auto leading-relaxed">
                Thank you! Our expert concierges will review your criteria and contact you shortly with exclusive off-market opportunities that match your needs.
              </p>
              <button onClick={() => setIsSuccess(false)} className="mt-8 py-4 px-8 rounded-xl border-2 border-outline-variant text-on-surface font-label-md font-bold uppercase tracking-widest hover:bg-surface-container hover:border-outline transition-all">
                Submit Another Request
              </button>
            </div>
          ) : (
            <>
              <div className="text-center mb-6 md:mb-10 relative z-10">
                <h2 className="font-headline-xl text-2xl md:text-headline-xl text-on-surface font-bold tracking-tight mb-2">Tell Us What You're Looking For</h2>
                <p className="font-body-md md:font-body-lg text-on-surface-variant max-w-2xl mx-auto">Our concierges will match you with exclusive off-market listings that fit your exact acquisition criteria.</p>
              </div>

              {errorMsg && <p className="text-error text-sm text-center font-medium bg-error-container text-on-error-container p-3 rounded-xl mb-6 md:mb-8">{errorMsg}</p>}
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 md:space-y-8 relative z-10">
                {/* Honeypot — hidden from real users, filled by bots */}
                <div style={{ display: "none" }} aria-hidden="true">
                  <input {...register("website")} type="text" tabIndex={-1} autoComplete="off" />
                </div>
                
                {/* Personal Info Section */}
                <div className="space-y-3 md:space-y-5">
                  <h3 className="font-label-md md:font-label-lg text-on-surface font-bold border-b border-outline-variant/30 pb-1.5 md:pb-2">1. Your Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-5">
                    <div className="space-y-1 group">
                      <label className="text-xs md:text-sm font-medium text-on-surface-variant block transition-colors group-focus-within:text-primary">Full Name *</label>
                      <input {...register("name")} onFocus={handleStart} className={`${inputClasses} ${errors.name ? 'border-error ring-1 ring-error' : ''}`} placeholder="John Doe" type="text" />
                      {errors.name && <span className="text-error text-xs font-medium">{errors.name.message}</span>}
                    </div>
                    <div className="space-y-1 group">
                      <label className="text-xs md:text-sm font-medium text-on-surface-variant block transition-colors group-focus-within:text-primary">Work Email *</label>
                      <input {...register("email")} className={`${inputClasses} ${errors.email ? 'border-error ring-1 ring-error' : ''}`} placeholder="john@company.com" type="email" />
                      {errors.email && <span className="text-error text-xs font-medium">{errors.email.message}</span>}
                    </div>
                    <div className="space-y-1 group">
                      <label className="text-xs md:text-sm font-medium text-on-surface-variant block transition-colors group-focus-within:text-primary">Phone Number</label>
                      <input {...register("phone")} className={`${inputClasses} ${errors.phone ? 'border-error ring-1 ring-error' : ''}`} placeholder="+91 98765 43210" type="tel" />
                      {errors.phone && <span className="text-error text-xs font-medium">{errors.phone.message}</span>}
                    </div>
                  </div>
                </div>

                {/* Requirements Section */}
                <div className="space-y-3 md:space-y-5">
                  <h3 className="font-label-md md:font-label-lg text-on-surface font-bold border-b border-outline-variant/30 pb-1.5 md:pb-2">2. Acquisition Criteria</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
                    <div className="space-y-1 group">
                      <label className="text-xs md:text-sm font-medium text-on-surface-variant block transition-colors group-focus-within:text-primary">Budget Range *</label>
                      <div className="relative">
                        <select {...register("budget")} className={`${inputClasses} appearance-none ${errors.budget ? 'border-error ring-1 ring-error' : ''}`}>
                          <option value="100000">₹1 Lakh - ₹5 Lakhs</option>
                          <option value="500000">₹5 Lakhs - ₹20 Lakhs</option>
                          <option value="2000000">₹20 Lakhs - ₹50 Lakhs</option>
                          <option value="5000000">₹50 Lakhs+</option>
                        </select>
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-outline-variant pointer-events-none material-symbols-outlined">expand_more</span>
                      </div>
                      {errors.budget && <span className="text-error text-xs font-medium">{errors.budget.message}</span>}
                    </div>

                    <div className="space-y-1 group">
                      <label className="text-xs md:text-sm font-medium text-on-surface-variant block transition-colors group-focus-within:text-primary">Primary Category *</label>
                      <div className="relative">
                        <select {...register("platform")} className={`${inputClasses} appearance-none ${errors.platform ? 'border-error ring-1 ring-error' : ''}`}>
                          <option value="youtube">YouTube Channels</option>
                          <option value="instagram">Instagram Accounts</option>
                          <option value="tiktok">TikTok Accounts</option>
                          <option value="newsletter">Newsletters</option>
                          <option value="website">Websites & Blogs</option>
                          <option value="other">Other</option>
                        </select>
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-outline-variant pointer-events-none material-symbols-outlined">expand_more</span>
                      </div>
                      {errors.platform && <span className="text-error text-xs font-medium">{errors.platform.message}</span>}
                    </div>

                    <div className="space-y-1 group">
                      <label className="text-xs md:text-sm font-medium text-on-surface-variant block transition-colors group-focus-within:text-primary">Preferred Niche</label>
                      <input {...register("niche")} className={inputClasses} placeholder="e.g. Finance, Tech, Entertainment" type="text" />
                    </div>

                    <div className="space-y-1 group">
                      <label className="text-xs md:text-sm font-medium text-on-surface-variant block transition-colors group-focus-within:text-primary">Target Audience Location</label>
                      <input {...register("country_preference")} className={inputClasses} placeholder="e.g. India, US, Global" type="text" />
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <div className="pt-2 md:pt-4">
                  <button disabled={isSubmitting} className="w-full h-12 md:h-14 rounded-xl bg-gradient-to-r from-primary to-primary/80 text-on-primary font-body-md font-bold uppercase tracking-widest hover:shadow-[0_0_20px_rgba(var(--color-primary-rgb),0.4)] hover:-translate-y-0.5 transition-all duration-300 flex justify-center items-center gap-2 disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none" type="submit">
                    {isSubmitting ? <><span className="material-symbols-outlined text-[18px] animate-spin">refresh</span> Submitting...</> : "Submit Requirements"}
                  </button>
                  <p className="text-[11px] md:text-xs text-on-surface-variant text-center mt-2.5 md:mt-4 flex items-center justify-center gap-1">
                    <span className="material-symbols-outlined text-[14px] md:text-[16px]">lock</span>
                    Your criteria will be kept confidential and matched privately.
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

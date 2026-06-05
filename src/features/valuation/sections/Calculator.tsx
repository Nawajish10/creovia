"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { valuationSchema } from "@/lib/schemas";
import { submitValuationLead } from "@/app/actions/leads";
import { trackEvent } from "@/lib/analytics";
import { z } from "zod";

const getAudienceUnit = (p: string) => {
  switch (p) {
    case 'youtube':
    case 'newsletter':
      return 'Subscribers';
    case 'podcast':
      return 'Listeners';
    default:
      return 'Followers';
  }
};

export function Calculator() {
  const inputGroupContainerClasses = "flex rounded-xl border border-outline-variant/50 focus-within:ring-2 focus-within:ring-primary/50 focus-within:border-primary transition-all shadow-sm bg-white/50 dark:bg-surface-container/50 hover:shadow-md overflow-hidden";
  const inputGroupInputClasses = "flex-1 bg-transparent px-4 py-3.5 font-label-md placeholder:text-outline/40 focus:outline-none text-on-surface";
  const inputGroupUnitClasses = "bg-surface-container border-l border-outline-variant/30 px-4 py-3.5 text-on-surface-variant font-label-md font-bold select-none shrink-0 flex items-center justify-center min-w-[100px] text-center text-xs";
  const [platform, setPlatform] = useState("youtube");
  const [niche, setNiche] = useState("entertainment");
  const [assetUrl, setAssetUrl] = useState("");
  const [audience, setAudience] = useState("");
  const [engagement, setEngagement] = useState("");
  const [revenue, setRevenue] = useState("");
  const [geo, setGeo] = useState("india");
  
  const [isCalculating, setIsCalculating] = useState(false);
  const [hasCalculated, setHasCalculated] = useState(false);
  const [valuation, setValuation] = useState(0);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const leadFormSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(7, "Enter a valid phone number"),
    // Honeypot — bots fill this, real users don't see it
    website: z.string().max(0, "Bot detected").optional(),
  });

  const { register, handleSubmit, formState: { errors }, reset } = useForm<z.infer<typeof leadFormSchema>>({
    resolver: zodResolver(leadFormSchema) as any,
    defaultValues: {
      name: "",
      email: "",
      phone: ""
    }
  });

  const onSubmitLead = async (data: z.infer<typeof leadFormSchema>) => {
    setIsSubmitting(true);
    setErrorMsg("");
    trackEvent("valuation_form_submitted");
    
    // Inject the calculator state into the form data
    const fullData = {
      ...data,
      platform,
      niche,
      asset_url: assetUrl,
      audience_size: Number(audience) || 0,
      engagement_rate: Number(engagement) || 0,
      monthly_revenue: Number(revenue) || 0,
      country: geo,
      asking_price: valuation
    };

    const res = await submitValuationLead(fullData);
    if (res.success) {
      setIsSuccess(true);
      reset();
    } else {
      setErrorMsg(res.error || "Something went wrong.");
    }
    setIsSubmitting(false);
  };

  const handleCalculate = () => {
    trackEvent("valuation_form_started");
    setIsCalculating(true);
    
    // Simulate API/calculation delay for premium feel
    setTimeout(() => {
      const rev = Number(revenue) || 0;
      const aud = Number(audience) || 0;
      const eng = Number(engagement) || 2.5;
      
      // Basic mock valuation formula for INR
      let mult = 3;
      if (platform === "youtube") mult = 4.5;
      if (platform === "instagram") mult = 3.2;
      if (platform === "newsletter") mult = 5.0;
      
      // Assuming 'rev' input is in INR. The multiplier and audience value is adjusted to look realistic in INR.
      let baseVal = (rev * mult) + (aud * (eng / 100) * 80); 
      if (baseVal === 0) baseVal = 2500000; // fallback if empty (₹25 Lakhs)
      
      setValuation(Math.round(baseVal));
      setIsCalculating(false);
      setHasCalculated(true);
    }, 1500);
  };

  const formattedValuation = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(valuation);

  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
        {/* Left Column: Input Form */}
        <div className="lg:col-span-5 bg-surface-container-lowest/80 backdrop-blur-xl border border-outline-variant/30 shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-2xl p-5 md:p-8 space-y-4 md:space-y-6 relative overflow-hidden transition-all duration-500">
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/20 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="space-y-1 relative z-10">
            <h2 className="font-headline-sm text-lg md:text-headline-sm text-on-surface font-bold tracking-tight">Asset Parameters</h2>
            <p className="font-body-md text-xs md:text-sm text-on-surface-variant">Input your primary metrics for baseline analysis.</p>
          </div>
          <form className="space-y-4 relative z-10" onSubmit={(e) => { e.preventDefault(); handleCalculate(); }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
              <div className="space-y-1 group">
                <label className="text-xs md:text-sm font-medium text-on-surface-variant block transition-colors group-focus-within:text-primary">Primary Platform</label>
                <div className="relative">
                  <select 
                    suppressHydrationWarning
                    className="w-full bg-white/50 dark:bg-surface-container/50 border border-outline-variant/50 rounded-xl px-3.5 md:px-4 py-2.5 md:py-3.5 font-body-md text-sm md:text-base appearance-none focus:ring-2 focus:ring-primary/50 focus:border-primary focus:outline-none transition-all shadow-sm hover:shadow-md"
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                  >
                    <option value="youtube">YouTube</option>
                    <option value="instagram">Instagram</option>
                    <option value="tiktok">TikTok</option>
                    <option value="newsletter">Newsletter / Email List</option>
                    <option value="podcast">Podcast</option>
                  </select>
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-outline-variant pointer-events-none material-symbols-outlined">expand_more</span>
                </div>
              </div>
              <div className="space-y-1 group">
                <label className="text-xs md:text-sm font-medium text-on-surface-variant block transition-colors group-focus-within:text-primary">Content Niche</label>
                <div className="relative">
                  <select 
                    suppressHydrationWarning
                    className="w-full bg-white/50 dark:bg-surface-container/50 border border-outline-variant/50 rounded-xl px-3.5 md:px-4 py-2.5 md:py-3.5 font-body-md text-sm md:text-base appearance-none focus:ring-2 focus:ring-primary/50 focus:border-primary focus:outline-none transition-all shadow-sm hover:shadow-md"
                    value={niche}
                    onChange={(e) => setNiche(e.target.value)}
                  >
                    <option value="entertainment">Entertainment & Comedy</option>
                    <option value="education">Education & How-To</option>
                    <option value="gaming">Gaming</option>
                    <option value="tech">Tech & Gadgets</option>
                    <option value="finance">Finance & Business</option>
                    <option value="fashion">Fashion & Beauty</option>
                    <option value="travel">Travel & Lifestyle</option>
                    <option value="sports">Sports & Fitness</option>
                    <option value="other">Other</option>
                  </select>
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-outline-variant pointer-events-none material-symbols-outlined">expand_more</span>
                </div>
              </div>
            </div>
            <div className="space-y-1 group">
              <label className="text-xs md:text-sm font-medium text-on-surface-variant block transition-colors group-focus-within:text-primary">Account / Page URL (Optional)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant material-symbols-outlined text-[20px]">link</span>
                <input 
                  suppressHydrationWarning
                  className="w-full bg-white/50 dark:bg-surface-container/50 border border-outline-variant/50 rounded-xl pl-11 pr-4 py-2.5 md:py-3.5 font-body-md text-sm md:text-base placeholder:text-outline/40 focus:ring-2 focus:ring-primary/50 focus:border-primary focus:outline-none transition-all shadow-sm hover:shadow-md" 
                  placeholder="https://..." 
                  type="url"
                  value={assetUrl}
                  onChange={(e) => setAssetUrl(e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                <div className="space-y-1 group">
                  <label className="text-xs md:text-sm font-medium text-on-surface-variant block transition-colors group-focus-within:text-primary">Total Audience Size</label>
                  <div className={inputGroupContainerClasses}>
                    <input 
                      suppressHydrationWarning
                      className={inputGroupInputClasses} 
                      placeholder="e.g. 500000" 
                      type="number"
                      value={audience}
                      onChange={(e) => setAudience(e.target.value)}
                    />
                    <span className={inputGroupUnitClasses}>
                      {getAudienceUnit(platform)}
                    </span>
                  </div>
                </div>
                <div className="space-y-1 group">
                  <label className="text-xs md:text-sm font-medium text-on-surface-variant block transition-colors group-focus-within:text-primary">Avg. Engagement (%)</label>
                  <div className={inputGroupContainerClasses}>
                    <input 
                      suppressHydrationWarning
                      className={inputGroupInputClasses} 
                      placeholder="e.g. 4.5" 
                      step="0.1" 
                      type="number"
                      value={engagement}
                      onChange={(e) => setEngagement(e.target.value)}
                    />
                    <span className={inputGroupUnitClasses}>%</span>
                  </div>
                </div>
            </div>
            <div className="space-y-1 group">
              <label className="text-xs md:text-sm font-medium text-on-surface-variant block transition-colors group-focus-within:text-primary">Trailing 12-Month Revenue</label>
              <div className={inputGroupContainerClasses}>
                <input 
                  suppressHydrationWarning
                  className={inputGroupInputClasses} 
                  placeholder="0" 
                  type="number"
                  value={revenue}
                  onChange={(e) => setRevenue(e.target.value)}
                />
                <span className={inputGroupUnitClasses}>INR</span>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs md:text-sm font-medium text-on-surface-variant block">Primary Audience Geography</label>
              <div className="relative">
                <select 
                  suppressHydrationWarning
                  className="w-full bg-white/50 dark:bg-surface-container/50 border border-outline-variant/50 rounded-xl px-3.5 md:px-4 py-2.5 md:py-3.5 font-body-md text-sm md:text-base appearance-none focus:ring-2 focus:ring-primary/50 focus:border-primary focus:outline-none transition-all shadow-sm hover:shadow-md"
                  value={geo}
                  onChange={(e) => setGeo(e.target.value)}
                >
                  <option value="india">India</option>
                  <option value="global">Global / Mixed</option>
                </select>
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-outline-variant pointer-events-none material-symbols-outlined">expand_more</span>
              </div>
            </div>
            <button 
              suppressHydrationWarning
              className="w-full mt-4 h-12 md:h-14 rounded-xl bg-gradient-to-r from-primary to-primary/80 text-on-primary font-body-md font-bold uppercase tracking-widest hover:shadow-[0_0_20px_rgba(var(--color-primary-rgb),0.4)] hover:-translate-y-0.5 transition-all duration-300 flex justify-center items-center gap-2 disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none" 
              type="submit"
              disabled={isCalculating}
            >
              {isCalculating ? (
                <>
                  <span className="material-symbols-outlined text-[18px] animate-spin">refresh</span>
                  Analyzing Data...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">bolt</span>
                  Calculate Value
                </>
              )}
            </button>
          </form>
        </div>
        {/* Right Column: Results & Lead Gen */}
        <div className="lg:col-span-7 space-y-4 md:space-y-6">
          <div className={`bg-gradient-to-br from-surface-container-lowest/90 to-surface-container-lowest/40 backdrop-blur-2xl border border-outline-variant/30 shadow-[0_20px_50px_rgb(0,0,0,0.1)] rounded-2xl p-5 md:p-8 border-t-4 border-t-secondary relative min-h-[350px] md:min-h-[400px] flex flex-col overflow-hidden transition-all duration-700 ${hasCalculated ? 'shadow-[0_20px_50px_rgba(var(--color-primary-rgb),0.15)] scale-[1.02] border-outline-variant/50' : 'opacity-90'}`}>
            <div className="flex justify-between items-start mb-6 md:mb-8 relative z-20">
              <div>
                <p className="text-[10px] md:text-xs text-on-surface-variant font-bold uppercase tracking-widest mb-1.5 md:mb-2">Estimated Market Value</p>
                <h3 className="text-3xl md:font-display-lg text-on-surface font-black leading-none tracking-tight transition-all duration-500">
                  {hasCalculated ? `${formattedValuation}` : '---'}
                </h3>
              </div>
              <div className="text-right hidden sm:block">
                <p className="text-[10px] md:text-xs text-on-surface-variant uppercase tracking-widest mb-1">Confidence Score</p>
                <div className={`inline-flex items-center gap-1 ${hasCalculated ? 'text-secondary' : 'text-outline-variant'} transition-colors duration-500`}>
                  <span className="material-symbols-outlined text-[16px] md:text-[18px]">verified</span>
                  <span className="text-[11px] md:text-xs font-semibold">{hasCalculated ? 'High (85%)' : 'Pending'}</span>
                </div>
              </div>
            </div>

            <div className="relative flex-grow flex flex-col min-h-[360px] md:min-h-[420px]">
              {/* Metrics Grid */}
              <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 pt-4 md:pt-6 border-t border-outline-variant/30 flex-grow transition-opacity duration-500 ${hasCalculated ? 'opacity-100' : 'opacity-30'}`}>
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-on-surface-variant">Demand Score</span>
                    <span className="font-bold text-on-surface">{hasCalculated ? '9.2/10' : '-'}</span>
                  </div>
                  <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
                    <div className={`h-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000 ${hasCalculated ? 'w-[92%]' : 'w-0'}`}></div>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-on-surface-variant">Audience Quality</span>
                    <span className="font-bold text-on-surface">{hasCalculated ? 'Tier A' : '-'}</span>
                  </div>
                  <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
                    <div className={`h-full bg-primary transition-all duration-1000 delay-100 ${hasCalculated ? 'w-[85%]' : 'w-0'}`}></div>
                  </div>
                </div>
                <div className="space-y-1.5 col-span-2 md:col-span-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-on-surface-variant">Market Interest</span>
                    <span className="font-bold text-on-surface">{hasCalculated ? 'Very High' : '-'}</span>
                  </div>
                  <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
                    <div className={`h-full bg-secondary transition-all duration-1000 delay-200 ${hasCalculated ? 'w-[95%]' : 'w-0'}`}></div>
                  </div>
                </div>
              </div>
              
              {/* Lead Capture Overlay - now scoped to just this container */}
              <div className={`absolute inset-0 -mx-5 md:-mx-8 -mb-5 md:-mb-8 p-5 md:p-8 pt-2 md:pt-4 bg-surface-container-lowest/80 dark:bg-surface/80 backdrop-blur-[8px] flex flex-col justify-start items-center z-10 transition-all duration-700 ${hasCalculated ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <div className="bg-surface-container-lowest border border-outline-variant/40 p-4 md:p-6 rounded-xl md:rounded-2xl text-center max-w-md w-full shadow-[0_10px_30px_rgb(0,0,0,0.06)] translate-y-0 transition-transform duration-500">
                  {isSuccess ? (
                    <div className="space-y-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-1 ring-4 ring-primary/5">
                        <span className="material-symbols-outlined text-primary text-2xl">check_circle</span>
                      </div>
                      <h4 className="text-base md:text-lg text-on-surface font-bold tracking-tight">Request Received</h4>
                      <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed">Thank you! We will send you the report in your mail within 24 hrs.</p>
                      <button onClick={() => { setIsSuccess(false); setHasCalculated(false); setValuation(0); }} className="w-full py-2.5 rounded-xl border border-outline-variant text-on-surface text-xs font-bold uppercase tracking-widest hover:bg-surface-container hover:border-outline transition-all mt-3" type="button">
                        Start New Valuation
                      </button>
                    </div>
                  ) : (
                    <>
                      <h4 className="text-base md:text-lg text-on-surface font-bold mb-1.5 tracking-tight">Request Full Report</h4>
                      <p className="text-[11px] md:text-xs text-on-surface-variant mb-4 leading-relaxed">Share your details to receive a comprehensive comp analysis and buyer density breakdown, curated by our experts within 24 hours.</p>
                      <form onSubmit={handleSubmit(onSubmitLead)} className="space-y-3 text-left">
                        {/* Honeypot — hidden from real users, filled by bots */}
                        <div style={{ display: "none" }} aria-hidden="true">
                          <input {...register("website")} type="text" tabIndex={-1} autoComplete="off" />
                        </div>
                        <div>
                          <input suppressHydrationWarning {...register("name")} className={`w-full rounded-xl px-3.5 py-2.5 bg-white/50 dark:bg-surface-container/50 border border-outline-variant/50 text-xs md:text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary focus:outline-none transition-all shadow-sm ${errors.name ? 'border-error' : ''}`} placeholder="Full Name" type="text" />
                          {errors.name && <p className="text-error text-[10px] mt-1 font-medium">{errors.name.message}</p>}
                        </div>
                        <div>
                          <input suppressHydrationWarning {...register("email")} className={`w-full rounded-xl px-3.5 py-2.5 bg-white/50 dark:bg-surface-container/50 border border-outline-variant/50 text-xs md:text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary focus:outline-none transition-all shadow-sm ${errors.email ? 'border-error' : ''}`} placeholder="Work Email" type="email" />
                          {errors.email && <p className="text-error text-[10px] mt-1 font-medium">{errors.email.message}</p>}
                        </div>
                        <div>
                          <input suppressHydrationWarning {...register("phone")} className={`w-full rounded-xl px-3.5 py-2.5 bg-white/50 dark:bg-surface-container/50 border border-outline-variant/50 text-xs md:text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary focus:outline-none transition-all shadow-sm ${errors.phone ? 'border-error' : ''}`} placeholder="Phone Number" type="tel" />
                          {errors.phone && <p className="text-error text-[10px] mt-1 font-medium">{errors.phone.message}</p>}
                        </div>
                        {errorMsg && <p className="text-error text-xs text-center font-medium bg-error-container text-on-error-container p-2 rounded-lg">{errorMsg}</p>}
                        <button suppressHydrationWarning disabled={isSubmitting} className="w-full h-11 md:h-12 rounded-xl bg-gradient-to-r from-on-surface to-on-surface/90 text-surface text-xs font-bold uppercase tracking-widest hover:shadow-lg hover:-translate-y-0.5 transition-all mt-1 disabled:opacity-70 disabled:hover:translate-y-0 flex justify-center items-center gap-2" type="submit">
                          {isSubmitting ? <><span className="material-symbols-outlined text-[16px] animate-spin">refresh</span> Requesting...</> : "Send My Report"}
                        </button>
                      </form>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Empty state overlay (before calculating) */}
            {!hasCalculated && (
              <div className="absolute inset-0 flex items-center justify-center z-10 bg-surface/40 backdrop-blur-[2px]">
                <p className="text-xs md:text-sm text-on-surface-variant tracking-widest uppercase font-bold">Awaiting Input Parameters</p>
              </div>
            )}
          </div>
        </div>
      </section>
  );
}

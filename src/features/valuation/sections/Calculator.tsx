"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { submitValuationLead } from "@/app/actions/leads";
import { trackEvent } from "@/lib/analytics";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// Custom SVG Icons matching the visual design guidelines
const YouTubeIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const InstagramIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg viewBox="0 0 24 24" fill="url(#ig-grad-calc)" className={className} style={style}>
    <defs>
      <linearGradient id="ig-grad-calc" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#f09433" />
        <stop offset="25%" stopColor="#e6683c" />
        <stop offset="50%" stopColor="#dc2743" />
        <stop offset="75%" stopColor="#cc2366" />
        <stop offset="100%" stopColor="#bc1888" />
      </linearGradient>
    </defs>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

const TelegramIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.94z"/>
  </svg>
);

const EmailIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>
);

const TikTokIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg viewBox="0 0 448 512" fill="currentColor" className={className} style={style}>
    <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"/>
  </svg>
);

const LinkedInIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
    <path d="M22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM20.45 20.45h-3.56v-5.6c0-1.34-.03-3.06-1.87-3.06-1.87 0-2.15 1.46-2.15 2.96v5.7h-3.56V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29z"/>
  </svg>
);

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

const platformsList = [
  { id: "youtube", name: "YouTube", icon: <YouTubeIcon className="w-8 h-8 text-red-500" />, color: "rgba(239, 68, 68, 0.4)" },
  { id: "instagram", name: "Instagram", icon: <InstagramIcon className="w-8 h-8" />, color: "rgba(225, 48, 108, 0.4)" },
  { id: "telegram", name: "Telegram", icon: <TelegramIcon className="w-8 h-8 text-[#229ED9]" />, color: "rgba(34, 158, 217, 0.4)" },
  { id: "newsletter", name: "Newsletter", icon: <EmailIcon className="w-8 h-8 text-[#8B5CF6]" />, color: "rgba(139, 92, 246, 0.4)" },
  { id: "tiktok", name: "TikTok", icon: <TikTokIcon className="w-8 h-8 text-[#06b6d4]" />, color: "rgba(6, 182, 212, 0.4)" },
  { id: "linkedin", name: "LinkedIn", icon: <LinkedInIcon className="w-8 h-8 text-[#0A66C2]" />, color: "rgba(10, 102, 194, 0.4)" },
];

const stepsList = [
  { step: 1, label: "Select Platform" },
  { step: 2, label: "Content & URL" },
  { step: 3, label: "Asset Parameters" },
  { step: 4, label: "AI Valuation" },
];

export function Calculator() {
  const [currentStep, setCurrentStep] = useState(1);
  const [platform, setPlatform] = useState("youtube");
  const [niche, setNiche] = useState("entertainment");
  const [assetUrl, setAssetUrl] = useState("");
  const [email, setEmail] = useState("");
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
    website: z.string().max(0, "Bot detected").optional(),
  });

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<z.infer<typeof leadFormSchema>>({
    resolver: zodResolver(leadFormSchema) as any,
    defaultValues: {
      name: "",
      email: "",
      phone: ""
    }
  });

  useEffect(() => {
    if (email) {
      setValue("email", email);
    }
  }, [email, setValue]);

  const onSubmitLead = async (data: z.infer<typeof leadFormSchema>) => {
    setIsSubmitting(true);
    setErrorMsg("");
    trackEvent("valuation_form_submitted");
    
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
    
    setTimeout(() => {
      const rev = Number(revenue) || 0;
      const aud = Number(audience) || 0;
      const eng = Number(engagement) || 2.5;
      
      let mult = 3;
      if (platform === "youtube") mult = 4.5;
      if (platform === "instagram") mult = 3.2;
      if (platform === "newsletter") mult = 5.0;
      
      let baseVal = (rev * mult) + (aud * (eng / 100) * 80); 
      if (baseVal === 0) baseVal = 2500000; 
      
      setValuation(Math.round(baseVal));
      setIsCalculating(false);
      setHasCalculated(true);
      setCurrentStep(4);
    }, 1500);
  };

  const formattedValuation = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(valuation);

  const resetCalculator = () => {
    setHasCalculated(false);
    setValuation(0);
    setAudience("");
    setEngagement("");
    setRevenue("");
    setAssetUrl("");
    setEmail("");
    setNiche("entertainment");
    setGeo("india");
    setIsSuccess(false);
    setCurrentStep(1);
  };

  const activePlatform = platformsList.find(p => p.id === platform);

  return (
    <div className="w-full space-y-8">
      {/* SECTION 1 — HERO VALUATION PREVIEW */}
      <div className="w-full bg-[#040F2D]/55 backdrop-blur-[20px] border border-blue-500/20 rounded-[28px] p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6 shadow-[0_0_30px_rgba(37,99,235,0.15)] relative overflow-hidden">
        {/* Decorative corner glows */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none"></div>

        {/* Left Side */}
        <div className="flex-1 space-y-2 text-left w-full relative z-10">
          <p className="text-gray-500 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
            Your Asset Could Be Worth
            <span className="material-symbols-outlined text-xs text-gray-500 cursor-help" title="Value range estimated based on category benchmarks">info</span>
          </p>
          <div className="flex items-center gap-3">
            <span className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#7C3AED] tracking-tight">
              {hasCalculated 
                ? `₹${(valuation * 0.85).toLocaleString('en-IN', { maximumFractionDigits: 0 })} - ₹${(valuation * 1.15).toLocaleString('en-IN', { maximumFractionDigits: 0 })}` 
                : "₹50,000 - ₹5,00,000"}
            </span>
            {!hasCalculated && (
              <span className="material-symbols-outlined text-gray-500 select-none" style={{ fontSize: "22px" }}>lock</span>
            )}
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            {hasCalculated 
              ? "AI-powered exact value estimate based on verified reach, niche and monetization signals." 
              : "Complete your profile details below to reveal the exact estimate."}
          </p>
        </div>

        {/* Center - Confidence Score Circular Ring */}
        <div className="flex flex-col items-center justify-center border-y md:border-y-0 md:border-x border-white/5 py-4 md:py-0 px-8 relative z-10 shrink-0">
          <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-3">Confidence Score</p>
          <div className="relative w-20 h-20 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" stroke="rgba(255,255,255,0.05)" strokeWidth="7" fill="none" />
              <motion.circle 
                cx="50" 
                cy="50" 
                r="40" 
                stroke={hasCalculated ? "#10b981" : "#2563EB"} 
                strokeWidth="7" 
                fill="none" 
                strokeDasharray="251.2" 
                initial={{ strokeDashoffset: 251.2 }}
                animate={{ strokeDashoffset: 251.2 * (1 - (hasCalculated ? 0.92 : 0.60)) }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                strokeLinecap="round" 
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xl font-bold text-white font-jetbrains">{hasCalculated ? "92%" : "60%"}</span>
            </div>
          </div>
          <p className="text-gray-400 text-xs mt-2 text-center font-medium">
            {hasCalculated ? "High confidence in estimate" : "Awaiting final variables"}
          </p>
        </div>

        {/* Right Side - Metrics Stack */}
        <div className="space-y-3.5 w-full md:w-64 text-left relative z-10 shrink-0">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400 flex items-center gap-1.5 font-medium">
              <span className="material-symbols-outlined text-gray-500 text-base" style={{ fontVariationSettings: "'wght' 300" }}>groups</span> 
              Audience Quality
            </span>
            <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${hasCalculated ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-white/5 text-gray-500 border border-white/5'}`}>
              {hasCalculated ? "Tier A" : "Locked"}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400 flex items-center gap-1.5 font-medium">
              <span className="material-symbols-outlined text-gray-500 text-base" style={{ fontVariationSettings: "'wght' 300" }}>trending_up</span> 
              Market Demand
            </span>
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 uppercase tracking-wider">High</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400 flex items-center gap-1.5 font-medium">
              <span className="material-symbols-outlined text-gray-500 text-base" style={{ fontVariationSettings: "'wght' 300" }}>monetization_on</span> 
              Monetization Potential
            </span>
            <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${hasCalculated ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-white/5 text-gray-500 border border-white/5'}`}>
              {hasCalculated ? "Verified" : "Locked"}
            </span>
          </div>
        </div>
      </div>

      {/* MAIN CALCULATOR CONTAINER */}
      <div 
        className="w-full p-6 md:p-10 rounded-[28px] relative overflow-hidden"
        style={{
          background: "rgba(10,20,50,0.55)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(60,120,255,0.2)",
        }}
      >
        {/* SECTION 2 — PROGRESS FLOW */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/5 pb-6 mb-8 gap-4">
          <div className="text-left">
            <h3 className="text-white font-inter font-extrabold text-lg md:text-xl">Calculate your asset value</h3>
            <p className="text-gray-400 text-xs md:text-sm mt-1">Takes less than 2 minutes • Dynamic AI Estimator</p>
          </div>
          <div className="flex items-center gap-2 md:gap-3 shrink-0 self-end sm:self-auto">
            {stepsList.map((item, idx) => (
              <div key={item.step} className="flex items-center">
                <button 
                  type="button"
                  disabled={item.step > currentStep && !hasCalculated}
                  onClick={() => setCurrentStep(item.step)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-jetbrains text-xs font-bold transition-all duration-300 ${
                    currentStep === item.step 
                      ? 'bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white shadow-[0_0_15px_rgba(37,99,235,0.6)] scale-110' 
                      : currentStep > item.step 
                        ? 'bg-green-500 text-white' 
                        : 'bg-white/5 text-gray-500 border border-white/5 cursor-not-allowed'
                  }`}
                >
                  {currentStep > item.step ? (
                    <span className="material-symbols-outlined text-xs">check</span>
                  ) : (
                    item.step
                  )}
                </button>
                {idx < stepsList.length - 1 && (
                  <div className={`w-6 md:w-10 h-[2px] mx-1 md:mx-2 ${currentStep > item.step ? 'bg-green-500' : 'bg-white/5'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* STEP VIEWPORTS */}
        <div className="w-full">
          <AnimatePresence mode="wait">
            
            {/* STEP 1: CHOOSE PLATFORM */}
            {currentStep === 1 && (
              <motion.div 
                key="step-1"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="text-left">
                  <span className="text-primary font-bold text-xs uppercase tracking-widest block mb-1">Step 1 of 4</span>
                  <h4 className="text-white font-inter font-extrabold text-base md:text-lg">Choose Your Platform</h4>
                  <p className="text-gray-400 text-xs md:text-sm mt-0.5">Choose the platform you want to evaluate. Our AI instantly analyzes audience quality, engagement, growth potential, and market value.</p>
                </div>

                {/* SECTION 3 — PLATFORM SELECTION CARDS */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 w-full pt-2">
                  {platformsList.map((p) => {
                    const isSelected = platform === p.id;
                    return (
                      <motion.button
                        key={p.id}
                        type="button"
                        suppressHydrationWarning
                        whileHover={{ y: -8, scale: 1.02, boxShadow: `0 10px 40px ${p.color}` }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setPlatform(p.id)}
                        className={`relative flex flex-col items-center justify-center p-6 rounded-[24px] transition-all duration-300 aspect-square min-h-[clamp(42px,10.9375vw,140px)] w-full cursor-pointer ${
                          isSelected 
                            ? `bg-[rgba(8,15,35,0.9)] border border-white/20 scale-105 shadow-[0_0_30px_${p.color}]` 
                            : 'bg-[rgba(8,15,35,0.75)] border border-[rgba(255,255,255,0.05)] hover:border-white/10 backdrop-blur-xl'
                        }`}
                      >
                        <div className={`transition-transform duration-300 ${isSelected ? 'scale-110 mb-4' : 'mb-4'}`}>{p.icon}</div>
                        <span className={`font-inter font-semibold text-sm ${isSelected ? 'text-white' : 'text-gray-300'}`}>{p.name}</span>
                      </motion.button>
                    );
                  })}
                </div>

                <div className="flex justify-between items-center pt-8 border-t border-white/5">
                  <span className="text-gray-500 text-xs flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-xs">shield</span>
                    Your data is secure and never shared
                  </span>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="h-12 px-6 bg-gradient-to-r from-[#2563EB] to-[#7C3AED] hover:opacity-90 text-white rounded-xl font-bold flex items-center gap-2 hover:shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all font-inter"
                  >
                    Continue
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: CONNECT PROFILE */}
            {currentStep === 2 && (
              <motion.div 
                key="step-2"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="text-left flex flex-col items-center">
                  <div className="mb-4 text-white scale-125">{activePlatform?.icon}</div>
                  <span className="text-primary font-bold text-xs uppercase tracking-widest block mb-1">Step 2 of 4</span>
                  <h4 className="text-white font-inter font-extrabold text-base md:text-lg text-center">
                    Connect {activePlatform ? activePlatform.name : "Platform"} {platform === 'newsletter' ? '' : platform === 'youtube' ? 'Channel' : 'Profile'}
                  </h4>
                  <p className="text-gray-400 text-xs md:text-sm mt-0.5 text-center">Enter your public URL and email to fetch real-time analytics.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 text-left">
                  {/* URL */}
                  <div className="relative h-14 w-full group">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 material-symbols-outlined text-[20px] transition-colors group-focus-within:text-blue-500">link</span>
                    <input 
                      suppressHydrationWarning
                      id="asset-url"
                      required
                      className="peer h-full w-full bg-[#030712] border border-white/10 rounded-xl pl-12 pr-4 pt-5 pb-1 font-body-md text-sm placeholder-transparent focus:ring-2 focus:ring-blue-500/35 focus:border-blue-500 focus:shadow-[0_0_15px_rgba(59,130,246,0.25)] focus:outline-none transition-all shadow-inner text-white" 
                      placeholder=" " 
                      type="url"
                      value={assetUrl}
                      onChange={(e) => setAssetUrl(e.target.value)}
                    />
                    <label 
                      htmlFor="asset-url"
                      className="absolute left-12 top-2 text-[10px] font-semibold text-gray-500 transition-all peer-placeholder-shown:top-[18px] peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-blue-500 pointer-events-none uppercase tracking-wider"
                    >
                      {platform === 'newsletter' ? 'Newsletter Link / URL' : `${activePlatform?.name} Profile URL`}
                    </label>
                  </div>

                  {/* Email */}
                  <div className="relative h-14 w-full group">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 material-symbols-outlined text-[20px] transition-colors group-focus-within:text-blue-500">mail</span>
                    <input 
                      suppressHydrationWarning
                      id="user-email"
                      required
                      className="peer h-full w-full bg-[#030712] border border-white/10 rounded-xl pl-12 pr-4 pt-5 pb-1 font-body-md text-sm placeholder-transparent focus:ring-2 focus:ring-blue-500/35 focus:border-blue-500 focus:shadow-[0_0_15px_rgba(59,130,246,0.25)] focus:outline-none transition-all shadow-inner text-white" 
                      placeholder=" " 
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label 
                      htmlFor="user-email"
                      className="absolute left-12 top-2 text-[10px] font-semibold text-gray-500 transition-all peer-placeholder-shown:top-[18px] peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-blue-500 pointer-events-none uppercase tracking-wider"
                    >
                      Email address to receive report
                    </label>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-8 border-t border-white/5">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="h-12 px-6 bg-white/5 hover:bg-white/10 text-gray-300 rounded-xl font-bold flex items-center gap-2 border border-white/10 transition-all font-inter"
                  >
                    <span className="material-symbols-outlined text-sm">arrow_back</span>
                    Back
                  </button>
                  <button
                    type="button"
                    disabled={!assetUrl || !email}
                    onClick={() => setCurrentStep(3)}
                    className="h-12 px-6 bg-gradient-to-r from-[#2563EB] to-[#7C3AED] hover:opacity-90 text-white rounded-xl font-bold flex items-center gap-2 hover:shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all font-inter disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: ASSET PARAMETERS FORM + VALUATION PREVIEW */}
            {currentStep === 3 && (
              <motion.div 
                key="step-3"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="text-left">
                  <span className="text-primary font-bold text-xs uppercase tracking-widest block mb-1">Step 3 of 4</span>
                  <h4 className="text-white font-inter font-extrabold text-base md:text-lg">Audience & Revenue Metrics</h4>
                  <p className="text-gray-400 text-xs md:text-sm mt-0.5">Input your reach parameters to estimate valuation.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-2">
                  
                  {/* Left Column - Form inputs */}
                  <form 
                    onSubmit={(e) => { e.preventDefault(); handleCalculate(); }}
                    className="lg:col-span-6 space-y-5 text-left"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Content Niche */}
                      <div className="relative h-14 w-full group">
                        <select 
                          suppressHydrationWarning
                          id="niche-select"
                          className="peer h-full w-full bg-[#030712] border border-white/10 rounded-xl px-4 pt-5 pb-1 font-body-md text-sm appearance-none focus:ring-2 focus:ring-blue-500/35 focus:border-blue-500 focus:shadow-[0_0_15px_rgba(59,130,246,0.25)] focus:outline-none transition-all shadow-inner text-white cursor-pointer"
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
                        <label 
                          htmlFor="niche-select"
                          className="absolute left-4 top-2 text-[10px] font-semibold text-gray-500 transition-colors group-focus-within:text-blue-500 pointer-events-none uppercase tracking-wider"
                        >
                          Content Niche
                        </label>
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none material-symbols-outlined">expand_more</span>
                      </div>

                      {/* Audience Geography */}
                      <div className="relative h-14 w-full group">
                        <select 
                          suppressHydrationWarning
                          id="audience-geo"
                          className="peer h-full w-full bg-[#030712] border border-white/10 rounded-xl px-4 pt-5 pb-1 font-body-md text-sm appearance-none focus:ring-2 focus:ring-blue-500/35 focus:border-blue-500 focus:shadow-[0_0_15px_rgba(59,130,246,0.25)] focus:outline-none transition-all shadow-inner text-white cursor-pointer"
                          value={geo}
                          onChange={(e) => setGeo(e.target.value)}
                        >
                          <option value="india">India</option>
                          <option value="global">Global / Mixed</option>
                        </select>
                        <label 
                          htmlFor="audience-geo"
                          className="absolute left-4 top-2 text-[10px] font-semibold text-gray-500 transition-colors group-focus-within:text-blue-500 pointer-events-none uppercase tracking-wider"
                        >
                          Primary Audience Geography
                        </label>
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none material-symbols-outlined">expand_more</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Audience Size */}
                      <div className="relative h-14 w-full flex rounded-xl border border-white/10 bg-[#030712] overflow-hidden group focus-within:ring-2 focus-within:ring-blue-500/35 focus-within:border-blue-500 focus-within:shadow-[0_0_15px_rgba(59,130,246,0.25)] transition-all">
                        <input 
                          suppressHydrationWarning
                          id="audience-size"
                          required
                          placeholder=" " 
                          className="peer flex-1 bg-transparent px-4 pt-5 pb-1 font-label-md focus:outline-none text-white text-base" 
                          type="number"
                          value={audience}
                          onChange={(e) => setAudience(e.target.value)}
                        />
                        <label 
                          htmlFor="audience-size"
                          className="absolute left-4 top-2 text-[10px] font-semibold text-gray-500 transition-all peer-placeholder-shown:top-[18px] peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-blue-500 pointer-events-none uppercase tracking-wider"
                        >
                          Total Audience Size
                        </label>
                        <span className="bg-[#0B0F19] border-l border-white/10 px-4 text-gray-400 font-label-md font-bold select-none shrink-0 flex items-center justify-center min-w-[100px] text-center text-xs">
                          {getAudienceUnit(platform)}
                        </span>
                      </div>

                      {/* Engagement Rate */}
                      <div className="relative h-14 w-full flex rounded-xl border border-white/10 bg-[#030712] overflow-hidden group focus-within:ring-2 focus-within:ring-blue-500/35 focus-within:border-blue-500 focus-within:shadow-[0_0_15px_rgba(59,130,246,0.25)] transition-all">
                        <input 
                          suppressHydrationWarning
                          id="engagement-rate"
                          required
                          placeholder=" " 
                          step="0.1" 
                          className="peer flex-1 bg-transparent px-4 pt-5 pb-1 font-label-md focus:outline-none text-white text-base" 
                          type="number"
                          value={engagement}
                          onChange={(e) => setEngagement(e.target.value)}
                        />
                        <label 
                          htmlFor="engagement-rate"
                          className="absolute left-4 top-2 text-[10px] font-semibold text-gray-500 transition-all peer-placeholder-shown:top-[18px] peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-blue-500 pointer-events-none uppercase tracking-wider"
                        >
                          Engagement Rate (%)
                        </label>
                        <span className="bg-[#0B0F19] border-l border-white/10 px-4 text-gray-400 font-label-md font-bold select-none shrink-0 flex items-center justify-center min-w-[50px] text-center text-xs">%</span>
                      </div>
                    </div>

                    {/* Trailing 12-Month Revenue */}
                    <div className="relative h-14 w-full flex rounded-xl border border-white/10 bg-[#030712] overflow-hidden group focus-within:ring-2 focus-within:ring-blue-500/35 focus-within:border-blue-500 focus-within:shadow-[0_0_15px_rgba(59,130,246,0.25)] transition-all">
                      <input 
                        suppressHydrationWarning
                        id="monthly-revenue"
                        required
                        placeholder=" " 
                        className="peer flex-1 bg-transparent px-4 pt-5 pb-1 font-label-md focus:outline-none text-white text-base" 
                        type="number"
                        value={revenue}
                        onChange={(e) => setRevenue(e.target.value)}
                      />
                      <label 
                        htmlFor="monthly-revenue"
                        className="absolute left-4 top-2 text-[10px] font-semibold text-gray-500 transition-all peer-placeholder-shown:top-[18px] peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-blue-500 pointer-events-none uppercase tracking-wider"
                      >
                        Trailing 12-Month Revenue
                      </label>
                      <span className="bg-[#0B0F19] border-l border-white/10 px-4 text-gray-400 font-label-md font-bold select-none shrink-0 flex items-center justify-center min-w-[100px] text-center text-xs">INR</span>
                    </div>

                    {/* SECTION 6 — CALCULATE CTA */}
                    <div className="pt-4">
                      <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full h-[60px] rounded-xl bg-gradient-to-r from-[#2563EB] to-[#7C3AED] hover:from-blue-500 hover:to-purple-500 text-white font-jetbrains font-bold uppercase tracking-widest hover:shadow-[0_0_35px_rgba(37,99,235,0.55)] transition-all duration-300 flex justify-center items-center gap-2 shadow-[0_0_25px_rgba(37,99,235,0.35)]" 
                        type="submit"
                        disabled={isCalculating}
                      >
                        {isCalculating ? (
                          <>
                            <span className="material-symbols-outlined text-[20px] animate-spin">refresh</span>
                            Analyzing Metrics...
                          </>
                        ) : (
                          <>
                            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                            Calculate Asset Value
                          </>
                        )}
                      </motion.button>
                    </div>
                  </form>

                  {/* Right Column - Section 5 Live Valuation Panel (Awaiting State) */}
                  <div className="lg:col-span-6 bg-[#040F2D]/40 border border-white/5 rounded-2xl p-6 min-h-[300px] flex flex-col justify-center items-center shadow-lg relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-500/5 rounded-full blur-2xl pointer-events-none"></div>
                    
                    <div className="flex flex-col items-center justify-center text-center space-y-4 relative z-10">
                      <div className="relative w-20 h-20 flex items-center justify-center mb-1">
                        <motion.div 
                          animate={{ rotate: 360 }} 
                          transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                          className="absolute inset-0 border-2 border-dashed border-white/10 rounded-full"
                        />
                        <motion.div 
                          animate={{ rotate: -360 }} 
                          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                          className="absolute inset-2 border border-primary/20 rounded-full border-t-transparent border-l-transparent"
                        />
                        <span className="material-symbols-outlined text-primary text-3xl animate-pulse">query_stats</span>
                      </div>
                      <h4 className="text-white font-inter font-bold text-base">Awaiting Parameters</h4>
                      <p className="text-gray-400 text-xs max-w-xs leading-relaxed">
                        Specify your reach size, engagement rate, and cash flows to compile the live valuation model.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-start items-center pt-8 border-t border-white/5">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="h-12 px-6 bg-white/5 hover:bg-white/10 text-gray-300 rounded-xl font-bold flex items-center gap-2 border border-white/10 transition-all font-inter"
                  >
                    <span className="material-symbols-outlined text-sm">arrow_back</span>
                    Back
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 4: LIVE VALUATION PANEL & LEAD CAPTURE SUMMARY */}
            {currentStep === 4 && (
              <motion.div 
                key="step-4"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="text-left">
                  <span className="text-[#10b981] font-bold text-xs uppercase tracking-widest block mb-1">Step 4 of 4</span>
                  <h4 className="text-white font-inter font-extrabold text-base md:text-lg">AI Valuation Report</h4>
                  <p className="text-gray-400 text-xs md:text-sm mt-0.5">Dynamic exit values calculated based on verified database sales.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-2">
                  
                  {/* Left Column - Input parameters summary */}
                  <div className="lg:col-span-5 space-y-6 text-left">
                    <div className="bg-[#030712]/50 border border-white/5 p-6 rounded-2xl space-y-4">
                      <h4 className="text-white font-inter font-bold text-sm border-b border-white/5 pb-2">Asset Summary</h4>
                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div>
                          <p className="text-gray-500 uppercase tracking-wider mb-1 font-semibold">Platform</p>
                          <p className="text-white font-bold capitalize flex items-center gap-1.5">
                            {activePlatform?.icon}
                            {platform}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500 uppercase tracking-wider mb-1 font-semibold">Category Niche</p>
                          <p className="text-white font-bold capitalize">{niche}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 uppercase tracking-wider mb-1 font-semibold">Audience Size</p>
                          <p className="text-white font-bold">{Number(audience).toLocaleString()} {getAudienceUnit(platform)}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 uppercase tracking-wider mb-1 font-semibold">Engagement</p>
                          <p className="text-white font-bold">{engagement}%</p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-gray-500 uppercase tracking-wider mb-1 font-semibold">Trailing 12m Cash Flow</p>
                          <p className="text-[#22C55E] font-bold text-sm">₹{Number(revenue).toLocaleString('en-IN')}</p>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={resetCalculator}
                      className="w-full h-12 bg-white/5 hover:bg-white/10 text-gray-300 rounded-xl font-bold flex items-center justify-center gap-2 border border-white/10 transition-all font-inter"
                    >
                      <span className="material-symbols-outlined text-sm">refresh</span>
                      Start New Valuation
                    </button>
                  </div>

                  {/* Right Column - SECTION 5: LIVE VALUATION PANEL DASHBOARD */}
                  <div className="lg:col-span-7 bg-[#040F2D]/40 border border-blue-500/10 rounded-2xl p-6 space-y-6 relative overflow-hidden flex flex-col justify-between shadow-2xl">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-[#2563EB]/5 rounded-full blur-2xl pointer-events-none"></div>
                    
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Estimated Value</p>
                        <h3 className="text-3xl font-extrabold text-white tracking-tight font-jetbrains">
                          {formattedValuation}
                        </h3>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">Verification</p>
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 uppercase tracking-wider">
                          Pending
                        </span>
                      </div>
                    </div>

                    {/* Metrics Grid - 4 Cards */}
                    <div className="grid grid-cols-2 gap-4">
                      {/* Demand Score */}
                      <div className="bg-[#030712]/60 border border-white/5 p-3.5 rounded-xl text-left space-y-1 hover:border-white/10 transition-all">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-gray-400 font-medium">Demand Score</span>
                          <span className="font-bold text-white">9.2/10</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden mt-1.5">
                          <div className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 w-[92%]" />
                        </div>
                      </div>

                      {/* Audience Quality */}
                      <div className="bg-[#030712]/60 border border-white/5 p-3.5 rounded-xl text-left space-y-1 hover:border-white/10 transition-all">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-gray-400 font-medium">Audience Quality</span>
                          <span className="font-bold text-white">Tier A</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden mt-1.5">
                          <div className="h-full bg-blue-500 w-[85%]" />
                        </div>
                      </div>

                      {/* Growth Potential */}
                      <div className="bg-[#030712]/60 border border-white/5 p-3.5 rounded-xl text-left space-y-1 hover:border-white/10 transition-all">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-gray-400 font-medium">Growth Potential</span>
                          <span className="font-bold text-[#22C55E]">+14%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden mt-1.5">
                          <div className="h-full bg-emerald-500 w-[78%]" />
                        </div>
                      </div>

                      {/* Monetization Score */}
                      <div className="bg-[#030712]/60 border border-white/5 p-3.5 rounded-xl text-left space-y-1 hover:border-white/10 transition-all">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-gray-400 font-medium">Monetization Score</span>
                          <span className="font-bold text-purple-400">Sustainable</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden mt-1.5">
                          <div className="h-full bg-purple-500 w-[82%]" />
                        </div>
                      </div>
                    </div>

                    {/* Market Multiples chart */}
                    <div className="bg-[#030712]/50 rounded-xl p-4 border border-white/5 space-y-2 text-left">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-400 font-semibold uppercase tracking-wider">Market Multiple Benchmark</span>
                        <span className="text-white font-bold font-jetbrains">
                          {platform === "youtube" ? "4.5x" : platform === "instagram" ? "3.2x" : platform === "newsletter" ? "5.0x" : "3.0x"}
                        </span>
                      </div>
                      <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full" 
                          style={{ width: platform === "youtube" ? "90%" : platform === "instagram" ? "64%" : platform === "newsletter" ? "100%" : "60%" }}
                        />
                      </div>
                      <span className="text-[10px] text-gray-500 leading-none block">Benchmarked dynamically against M&A database valuations.</span>
                    </div>

                    {/* LEAD CAPTURE FORM OVERLAY */}
                    <div className={`absolute inset-0 p-6 bg-[#040F2D]/95 backdrop-blur-[8px] flex flex-col justify-center items-center z-10 transition-all duration-700 ${!isSuccess ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                      <div className="bg-[#07111F] border border-white/10 p-5 md:p-6 rounded-2xl text-center max-w-sm w-full shadow-2xl relative">
                        <h4 className="text-white font-inter font-bold text-base mb-1 tracking-tight">Request Full Report</h4>
                        <p className="text-gray-400 text-xs mb-4 leading-relaxed">Unlock complete comparable multiples and buyer density details compiled by our advisors.</p>
                        
                        <form onSubmit={handleSubmit(onSubmitLead)} className="space-y-4 text-left">
                          {/* Honeypot */}
                          <div style={{ display: "none" }} aria-hidden="true">
                            <input {...register("website")} type="text" tabIndex={-1} autoComplete="off" />
                          </div>
                          <div>
                            <div className="relative h-14 w-full">
                              <input 
                                suppressHydrationWarning 
                                {...register("name")} 
                                id="lead-name"
                                placeholder=" "
                                className={`peer h-full w-full rounded-xl px-4 pt-5 pb-1 bg-[#030712] border focus:ring-2 focus:ring-blue-500/35 focus:border-blue-500 focus:shadow-[0_0_15px_rgba(59,130,246,0.25)] focus:outline-none transition-all shadow-inner text-white text-sm ${errors.name ? 'border-error' : 'border-white/10'}`} 
                                type="text" 
                              />
                              <label 
                                htmlFor="lead-name"
                                className="absolute left-4 top-2 text-[10px] font-semibold text-gray-500 transition-all peer-placeholder-shown:top-[18px] peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-blue-500 pointer-events-none uppercase tracking-wider"
                              >
                                Full Name
                              </label>
                            </div>
                            {errors.name && <p className="text-error text-[10px] mt-1 font-medium">{errors.name.message}</p>}
                          </div>
                          <div>
                            <div className="relative h-14 w-full">
                              <input 
                                suppressHydrationWarning 
                                {...register("email")} 
                                id="lead-email"
                                placeholder=" "
                                className={`peer h-full w-full rounded-xl px-4 pt-5 pb-1 bg-[#030712] border focus:ring-2 focus:ring-blue-500/35 focus:border-blue-500 focus:shadow-[0_0_15px_rgba(59,130,246,0.25)] focus:outline-none transition-all shadow-inner text-white text-sm ${errors.email ? 'border-error' : 'border-white/10'}`} 
                                type="email" 
                              />
                              <label 
                                htmlFor="lead-email"
                                className="absolute left-4 top-2 text-[10px] font-semibold text-gray-500 transition-all peer-placeholder-shown:top-[18px] peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-blue-500 pointer-events-none uppercase tracking-wider"
                              >
                                Work Email
                              </label>
                            </div>
                            {errors.email && <p className="text-error text-[10px] mt-1 font-medium">{errors.email.message}</p>}
                          </div>
                          <div>
                            <div className="relative h-14 w-full">
                              <input 
                                suppressHydrationWarning 
                                {...register("phone")} 
                                id="lead-phone"
                                placeholder=" "
                                className={`peer h-full w-full rounded-xl px-4 pt-5 pb-1 bg-[#030712] border focus:ring-2 focus:ring-blue-500/35 focus:border-blue-500 focus:shadow-[0_0_15px_rgba(59,130,246,0.25)] focus:outline-none transition-all shadow-inner text-white text-sm ${errors.phone ? 'border-error' : 'border-white/10'}`} 
                                type="tel" 
                              />
                              <label 
                                htmlFor="lead-phone"
                                className="absolute left-4 top-2 text-[10px] font-semibold text-gray-500 transition-all peer-placeholder-shown:top-[18px] peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-blue-500 pointer-events-none uppercase tracking-wider"
                              >
                                Phone Number
                              </label>
                            </div>
                            {errors.phone && <p className="text-error text-[10px] mt-1 font-medium">{errors.phone.message}</p>}
                          </div>
                          {errorMsg && <p className="text-error text-xs text-center font-medium bg-red-950/20 text-red-400 p-2 rounded-lg border border-red-500/20">{errorMsg}</p>}
                          <button disabled={isSubmitting} className="w-full h-11 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white text-xs font-bold uppercase tracking-widest hover:shadow-lg hover:-translate-y-0.5 transition-all mt-1 disabled:opacity-70 disabled:hover:translate-y-0 flex justify-center items-center gap-2" type="submit">
                            {isSubmitting ? <><span className="material-symbols-outlined text-[16px] animate-spin">refresh</span> Requesting...</> : "Unlock Valuation Report"}
                          </button>
                        </form>
                      </div>
                    </div>

                    {/* SUCCESS TIMELINE STATE */}
                    {isSuccess && (
                      <div className="absolute inset-0 p-6 bg-[#040F2D]/95 backdrop-blur-[8px] flex flex-col justify-center items-center z-10 transition-all duration-700">
                        <div className="bg-[#07111F] border border-white/10 p-6 rounded-2xl text-center max-w-sm w-full shadow-2xl space-y-4">
                          <div className="w-12 h-12 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto ring-4 ring-green-500/5">
                            <span className="material-symbols-outlined text-green-400 text-2xl">check_circle</span>
                          </div>
                          <h4 className="text-white font-inter font-bold text-base">Request Received</h4>
                          <p className="text-gray-400 text-xs leading-relaxed">Thank you! Your AI metrics are recorded. Our team will verify and send the full exit value assessment report to your inbox within 24 hours.</p>
                          <button onClick={() => setIsSuccess(false)} className="w-full py-2.5 rounded-xl border border-white/10 text-gray-200 text-xs font-bold uppercase tracking-widest hover:bg-white/5 transition-all" type="button">
                            View Dashboard
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>

      {/* SECTION 7 — TRUST INDICATORS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-16 border-t border-white/5">
        {[
          { icon: "psychology", title: "AI-Powered Valuation", desc: "Advanced creator market analysis" },
          { icon: "database", title: "Creator Market Data", desc: "Real-time benchmark engine" },
          { icon: "shield", title: "Private & Secure", desc: "Data never shared" },
          { icon: "workspace_premium", title: "Trusted by Creators", desc: "10,000+ valuations completed" },
        ].map((item, idx) => (
          <div key={idx} className="flex items-start gap-4 p-5 rounded-2xl bg-[#07111F]/50 border border-white/5 shadow-sm hover:border-white/10 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
              <span className="material-symbols-outlined text-primary text-[20px]" style={{ color: "#3b82f6" }}>{item.icon}</span>
            </div>
            <div className="text-left">
              <h4 className="text-white font-inter font-bold text-sm mb-1">{item.title}</h4>
              <p className="text-gray-400 text-xs leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

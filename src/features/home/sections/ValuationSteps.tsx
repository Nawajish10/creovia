"use client";

import { motion, AnimatePresence, useSpring, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const YouTubeIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="url(#ig-grad)" className={className}>
    <defs>
      <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
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

const TelegramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.94z"/>
  </svg>
);

const EmailIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>
);

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 448 512" fill="currentColor" className={className}>
    <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"/>
  </svg>
);

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM20.45 20.45h-3.56v-5.6c0-1.34-.03-3.06-1.87-3.06-1.87 0-2.15 1.46-2.15 2.96v5.7h-3.56V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29z"/>
  </svg>
);

const platforms = [
  { id: "youtube", name: "YouTube", icon: <YouTubeIcon className="w-8 h-8" />, color: "rgba(239, 68, 68, 0.4)" },
  { id: "instagram", name: "Instagram", icon: <InstagramIcon className="w-8 h-8" />, color: "rgba(225, 48, 108, 0.4)" },
  { id: "telegram", name: "Telegram", icon: <TelegramIcon className="w-8 h-8 text-[#229ED9]" />, color: "rgba(34, 158, 217, 0.4)" },
  { id: "newsletter", name: "Newsletter", icon: <EmailIcon className="w-8 h-8 text-[#8B5CF6]" />, color: "rgba(139, 92, 246, 0.4)" },
  { id: "tiktok", name: "TikTok", icon: <TikTokIcon className="w-8 h-8 text-[#06b6d4]" />, color: "rgba(6, 182, 212, 0.4)" },
  { id: "linkedin", name: "LinkedIn", icon: <LinkedInIcon className="w-8 h-8 text-[#0A66C2]" />, color: "rgba(10, 102, 194, 0.4)" },
];

const REVENUE_SOURCES = [
  "Sponsorships", "Affiliate Marketing", "Ad Revenue", "Product Sales", 
  "Services", "Memberships", "Newsletter Revenue", "Other"
];

const SkeletonBar = ({ width, delay }: { width: string, delay: number }) => (
  <motion.div 
    initial={{ opacity: 0.5 }}
    animate={{ opacity: 1 }}
    transition={{ repeat: Infinity, duration: 1, repeatType: "reverse", delay }}
    className={`h-2 bg-white/10 rounded-full ${width}`}
  />
);

const FREE_REPORT_CARDS = [
  {
    label: "Profile Overview",
    content: (
      <>
        <div className="flex flex-col gap-1 items-center text-center mt-2">
           <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white mb-2 shadow-inner">
             <span className="material-symbols-outlined text-[clamp(1.1rem,2.3vw,1.875rem)]">account_circle</span>
           </div>
           <h4 className="text-white font-inter font-bold text-[clamp(0.9rem,1.5vw,1.25rem)] truncate w-full px-4">Profile Overview</h4>
        </div>
        <div className="flex flex-col gap-4 mt-auto w-full">
           <div className="flex justify-between items-end border-b border-white/5 pb-3"><span className="text-gray-500 text-xs font-inter uppercase tracking-wider font-bold">Followers</span><span className="text-white font-bold font-inter text-[clamp(0.875rem,1.4vw,1.125rem)]">124K</span></div>
           <div className="flex justify-between items-end border-b border-white/5 pb-3"><span className="text-gray-500 text-xs font-inter uppercase tracking-wider font-bold">Engagement</span><span className="text-[#22C55E] font-bold font-inter text-[clamp(0.875rem,1.4vw,1.125rem)]">4.8%</span></div>
           <div className="pt-2 flex flex-col items-center">
             <span className="text-gray-400 font-inter uppercase tracking-widest text-[clamp(4px,0.78125vw,10px)] font-bold mb-1">Estimated Value Range</span>
             <div className="text-[clamp(1rem,1.8vw,1.5rem)] font-inter font-[800] text-white tracking-tighter flex items-center gap-2">$18K <span className="text-gray-500 font-light mx-1">-</span> $24K</div>
           </div>
        </div>
      </>
    )
  },
  {
    label: "Asset Score",
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <div className="relative w-32 h-32 flex items-center justify-center mb-6">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" stroke="rgba(255,255,255,0.05)" strokeWidth="8" fill="none" />
            <motion.circle cx="50" cy="50" r="40" stroke="#E1306C" strokeWidth="8" fill="none" strokeDasharray="251.2" strokeDashoffset={251.2 * 0.16} strokeLinecap="round" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center"><span className="text-[clamp(1.2rem,2.8vw,2.25rem)] font-bold font-inter text-white">84</span><span className="text-[clamp(4px,0.78125vw,10px)] font-inter text-gray-500 uppercase tracking-widest mt-1 font-bold">out of 100</span></div>
        </div>
        <p className="text-gray-400 text-sm font-inter leading-relaxed px-2">Strong overall asset health based on quality, engagement, and consistent growth metrics.</p>
      </div>
    )
  },
  {
    label: "Audience Quality",
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-inner relative overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent"></div>
           <span className="text-[clamp(1.2rem,2.8vw,2.25rem)] font-bold font-inter text-white drop-shadow-[0_0_20px_rgba(168,85,247,0.5)] z-10">A</span>
        </div>
        <h4 className="text-white font-inter font-bold text-[clamp(0.9rem,1.5vw,1.25rem)] mb-2">Premium Grade</h4>
        <div className="flex items-center gap-1.5 bg-green-500/10 text-green-400 text-[clamp(4px,0.78125vw,10px)] font-bold uppercase tracking-wider px-2 py-1 rounded mb-4">
           <span className="material-symbols-outlined text-[clamp(4.8px,0.9375vw,12px)]">verified</span> High Authenticity
        </div>
        <p className="text-gray-400 text-sm font-inter leading-relaxed">Highly authentic audience detected with minimal bot activity or fake engagement.</p>
      </div>
    )
  },
  {
    label: "Buyer Demand",
    content: (
      <div className="flex flex-col justify-center h-full">
        <span className="text-white font-inter font-bold text-[clamp(1.8rem,4.7vw,3.75rem)] mb-4 text-center tracking-tighter">8.1<span className="text-[clamp(0.9rem,1.5vw,1.25rem)] text-gray-500 font-normal">/10</span></span>
        <div className="flex flex-col gap-2 w-full mb-8">
          <div className="flex gap-1.5 h-3">
            <div className="flex-1 rounded-l-full bg-white/10"></div>
            <div className="flex-1 bg-white/10"></div>
            <div className="flex-1 bg-white/10"></div>
            <div className="flex-1 bg-orange-500/60 shadow-[0_0_10px_rgba(249,115,22,0.3)]"></div>
            <div className="flex-1 rounded-r-full bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.6)]"></div>
          </div>
          <div className="flex justify-between text-[clamp(4px,0.78125vw,10px)] uppercase font-bold text-gray-500 mt-1 tracking-widest"><span>Low</span><span className="text-orange-400">High Demand</span></div>
        </div>
        <p className="text-gray-400 text-sm font-inter text-center leading-relaxed">Strong market interest from verified buyers and institutional investors for this niche.</p>
      </div>
    )
  },
  {
    label: "Liquidity Score",
    content: (
      <div className="flex flex-col justify-center h-full text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
           <span className="material-symbols-outlined text-[clamp(1.2rem,2.8vw,2.25rem)] text-blue-400">water_drop</span>
           <span className="text-white font-inter font-bold text-[clamp(1.5rem,3.75vw,3rem)]">7.8</span>
        </div>
        <div className="w-full bg-white/5 rounded-2xl p-4 border border-white/10 mb-6 flex flex-col gap-2 relative overflow-hidden">
           <div className="absolute inset-0 bg-blue-500/5"></div>
           <span className="text-gray-400 text-[clamp(4px,0.78125vw,10px)] font-bold uppercase tracking-wider relative z-10">Expected Sale Timeline</span>
           <span className="text-white font-bold text-[clamp(0.875rem,1.4vw,1.125rem)] relative z-10">30 - 60 Days</span>
        </div>
        <p className="text-gray-400 text-sm font-inter leading-relaxed">Highly liquid asset. Expected to sell quickly at fair market valuation.</p>
      </div>
    )
  },
  {
    label: "Growth Potential",
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <div className="flex items-center gap-2 mb-8">
           <span className="text-[#22C55E] font-bold font-inter text-[clamp(1.5rem,3.75vw,3rem)] tracking-tighter">+14%</span>
           <span className="material-symbols-outlined text-[clamp(1.1rem,2.3vw,1.875rem)] text-[#22C55E] bg-green-500/10 rounded-full p-2">trending_up</span>
        </div>
        <div className="w-full h-14 flex items-end gap-1 mb-8 opacity-60">
           <div className="flex-1 bg-white/20 h-[30%] rounded-t-sm"></div>
           <div className="flex-1 bg-white/20 h-[45%] rounded-t-sm"></div>
           <div className="flex-1 bg-white/20 h-[50%] rounded-t-sm"></div>
           <div className="flex-1 bg-white/20 h-[70%] rounded-t-sm"></div>
           <div className="flex-1 bg-green-500 h-[90%] rounded-t-sm shadow-[0_0_15px_rgba(34,197,94,0.4)]"></div>
        </div>
        <p className="text-gray-400 text-sm font-inter leading-relaxed">Trailing 90-day trajectory indicates compounding organic reach and rising valuation.</p>
      </div>
    )
  },
  {
    label: "Risk Assessment",
    content: (
      <div className="flex flex-col justify-center h-full">
        <div className="flex items-center justify-center gap-2 mb-6">
           <span className="px-4 py-1.5 bg-green-500/10 text-green-400 border border-green-500/20 rounded-full text-sm font-bold tracking-widest uppercase flex items-center gap-2">
             <span className="material-symbols-outlined text-[clamp(6.4px,1.25vw,16px)]">shield_person</span> Low Risk
           </span>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4 bg-white/5 p-3 rounded-xl border border-white/5">
             <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center shrink-0 border border-green-500/20"><span className="material-symbols-outlined text-green-400 text-sm">check</span></div>
             <div><span className="text-white font-inter text-sm font-medium block mb-0.5">Audience Stability</span><span className="text-gray-500 text-[clamp(4px,0.78125vw,10px)] uppercase tracking-wider font-bold">Stable over 12 mo</span></div>
          </div>
          <div className="flex items-center gap-4 bg-white/5 p-3 rounded-xl border border-white/5">
             <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center shrink-0 border border-green-500/20"><span className="material-symbols-outlined text-green-400 text-sm">check</span></div>
             <div><span className="text-white font-inter text-sm font-medium block mb-0.5">Content Consistency</span><span className="text-gray-500 text-[clamp(4px,0.78125vw,10px)] uppercase tracking-wider font-bold">Predictable output</span></div>
          </div>
        </div>
      </div>
    )
  },
  {
    label: "AI Insights",
    content: (
      <div className="flex flex-col justify-center h-full relative">
        <span className="material-symbols-outlined absolute top-0 right-0 text-white/5 text-8xl pointer-events-none">psychology</span>
        <div className="flex items-center gap-2 mb-6">
           <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse shadow-[0_0_10px_rgba(192,132,252,0.8)]"></span>
           <span className="text-gray-400 font-inter uppercase tracking-widest text-[clamp(4px,0.78125vw,10px)] font-bold">Smart Analysis</span>
        </div>
        <div className="flex flex-col gap-4 relative z-10">
           <div className="bg-blue-500/10 border-l-2 border-blue-500 p-3 rounded-r-lg">
             <span className="text-blue-400 text-[clamp(4px,0.78125vw,10px)] uppercase font-bold tracking-wider block mb-1">Recommendation</span>
             <span className="text-white text-xs font-inter">Increase posting frequency to capture maximum engagement potential.</span>
           </div>
           <div className="bg-green-500/10 border-l-2 border-green-500 p-3 rounded-r-lg">
             <span className="text-green-400 text-[clamp(4px,0.78125vw,10px)] uppercase font-bold tracking-wider block mb-1">Opportunity</span>
             <span className="text-white text-xs font-inter">Audience demographics align perfectly with high-paying SaaS sponsors.</span>
           </div>
        </div>
      </div>
    )
  },
  {
    label: "Revenue Health Check",
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center relative group">
        <div className="absolute inset-0 flex items-center justify-center z-20">
           <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-2xl">
                 <span className="material-symbols-outlined text-white text-[clamp(1rem,1.8vw,1.5rem)]">lock</span>
              </div>
              <span className="text-white font-bold font-inter bg-black/60 px-3 py-1 rounded-full text-[clamp(4px,0.78125vw,10px)] border border-white/10 backdrop-blur-md">Available in Verified Report</span>
           </div>
        </div>
        <div className="blur-sm opacity-30 select-none pointer-events-none w-full flex flex-col items-center">
           <h4 className="text-white font-inter font-bold text-[clamp(0.9rem,1.5vw,1.25rem)] mb-4">Revenue Health</h4>
           <div className="w-full flex flex-col gap-3">
             <div className="w-full h-3 bg-white/20 rounded-full"></div>
             <div className="w-3/4 h-3 bg-white/20 rounded-full mx-auto"></div>
             <div className="w-full h-12 bg-white/10 rounded-xl mt-4"></div>
           </div>
        </div>
      </div>
    )
  },
  {
    label: "Comparable Sales",
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center relative group">
        <div className="absolute inset-0 flex items-center justify-center z-20">
           <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-2xl">
                 <span className="material-symbols-outlined text-white text-[clamp(1rem,1.8vw,1.5rem)]">lock</span>
              </div>
              <span className="text-white font-bold font-inter bg-black/60 px-3 py-1 rounded-full text-[clamp(4px,0.78125vw,10px)] border border-white/10 backdrop-blur-md">Available in Verified Report</span>
           </div>
        </div>
        <div className="blur-sm opacity-30 select-none pointer-events-none w-full flex flex-col items-center">
           <h4 className="text-white font-inter font-bold text-[clamp(0.9rem,1.5vw,1.25rem)] mb-4">Market Comparables</h4>
           <div className="w-full flex flex-col gap-3">
             <div className="w-full h-10 bg-white/10 rounded-xl"></div>
             <div className="w-full h-10 bg-white/10 rounded-xl"></div>
             <div className="w-full h-10 bg-white/10 rounded-xl"></div>
           </div>
        </div>
      </div>
    )
  },
  {
    label: "Seller Readiness",
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center relative group">
        <div className="absolute inset-0 flex items-center justify-center z-20">
           <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-2xl">
                 <span className="material-symbols-outlined text-white text-[clamp(1rem,1.8vw,1.5rem)]">lock</span>
              </div>
              <span className="text-white font-bold font-inter bg-black/60 px-3 py-1 rounded-full text-[clamp(4px,0.78125vw,10px)] border border-white/10 backdrop-blur-md">Available in Verified Report</span>
           </div>
        </div>
        <div className="blur-sm opacity-30 select-none pointer-events-none w-full flex flex-col items-center">
           <h4 className="text-white font-inter font-bold text-[clamp(0.9rem,1.5vw,1.25rem)] mb-4">Readiness Analysis</h4>
           <div className="w-24 h-24 rounded-full border-[8px] border-white/20 mx-auto mb-4"></div>
           <div className="w-20 h-3 bg-white/20 rounded-full mx-auto"></div>
        </div>
      </div>
    )
  }
];

const PREVIEW_CARDS = [
  {
    title: "Asset Valuation",
    metric: "$4.2k - $12.5k",
    insight: "High potential value based on current engagement rates.",
    visual: (
      <div className="w-full h-10 bg-black/50 rounded-full overflow-hidden relative shadow-inner mt-1">
        <div className="absolute top-0 bottom-0 left-[20%] right-[30%] bg-gradient-to-r from-blue-600/50 via-blue-500 to-purple-500/50 rounded-full"></div>
        <div className="absolute top-0 bottom-0 left-[45%] w-1.5 bg-white rounded-full shadow-[0_0_8px_white]"></div>
      </div>
    )
  },
  {
    title: "Buyer Demand",
    metric: "Very High",
    insight: "Current market heat indicates strong buyer interest.",
    visual: (
      <div className="flex gap-1.5 w-full h-6 mt-1">
        <div className="flex-1 bg-white/10 rounded-sm"></div>
        <div className="flex-1 bg-white/10 rounded-sm"></div>
        <div className="flex-1 bg-orange-500/40 rounded-sm"></div>
        <div className="flex-1 bg-orange-500/70 rounded-sm"></div>
        <div className="flex-1 bg-orange-500 rounded-sm shadow-[0_0_15px_rgba(249,115,22,0.5)]"></div>
      </div>
    )
  },
  {
    title: "Revenue Health Check",
    metric: "Sustainable",
    insight: "Diversified income streams reduce valuation risk.",
    visual: (
      <div className="flex flex-col gap-2.5 mt-1 w-full">
        <div className="w-full h-2.5 bg-black/50 rounded-full overflow-hidden">
          <div className="h-full bg-green-400 w-[65%] rounded-full shadow-[0_0_8px_rgba(74,222,128,0.5)]"></div>
        </div>
        <div className="w-full h-2.5 bg-black/50 rounded-full overflow-hidden">
          <div className="h-full bg-blue-400 w-[35%] rounded-full shadow-[0_0_8px_rgba(96,165,250,0.5)]"></div>
        </div>
      </div>
    )
  },
  {
    title: "Sell Now Or Later",
    metric: "+45% Growth",
    insight: "Waiting 6 months could significantly increase value.",
    visual: (
      <div className="flex items-center justify-between mt-1 w-full">
        <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 text-[clamp(4px,0.78125vw,10px)] font-semibold">1x</div>
        <div className="flex-1 border-t-2 border-dashed border-white/10 mx-3 relative">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#020617] px-1.5 py-0.5 rounded text-[clamp(3.2px,0.625vw,8px)] text-pink-400 font-bold uppercase tracking-wider border border-pink-500/20">6 MO</div>
        </div>
        <div className="w-8 h-8 rounded-full bg-pink-500/20 border border-pink-500/50 flex items-center justify-center text-pink-400 text-[clamp(4px,0.78125vw,10px)] font-bold shadow-[0_0_15px_rgba(236,72,153,0.3)]">1.4x</div>
      </div>
    )
  },
  {
    title: "Growth Opportunities",
    metric: "3 Key Actions",
    insight: "Optimizing these areas attracts higher offers.",
    visual: (
      <div className="flex flex-wrap gap-2 mt-1 justify-center">
        <span className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[clamp(4px,0.78125vw,10px)] px-2 py-1 rounded-md font-inter flex items-center gap-1"><span className="material-symbols-outlined text-[clamp(5.6px,1.09375vw,14px)]">trending_up</span> Monetize</span>
        <span className="bg-white/5 border border-white/10 text-gray-300 text-[clamp(4px,0.78125vw,10px)] px-2 py-1 rounded-md font-inter flex items-center gap-1"><span className="material-symbols-outlined text-[clamp(5.6px,1.09375vw,14px)]">group_add</span> Audience</span>
      </div>
    )
  },
  {
    title: "Comparable Sales",
    metric: "2 Recent Sales",
    insight: "Assets in your niche are selling above asking price.",
    visual: (
      <div className="flex flex-col gap-2 mt-1 w-full">
        <div className="bg-white/5 border border-white/5 rounded-lg p-2 flex justify-between items-center backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full opacity-80"></div>
            <div className="w-16 h-1.5 bg-white/20 rounded-full"></div>
          </div>
          <div className="w-10 h-2 bg-green-500/20 rounded blur-[clamp(0.3px,0.078125vw,1px)]"></div>
        </div>
      </div>
    )
  }
];

export function ValuationSteps() {
  const [step, setStep] = useState(1);
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [profileUrl, setProfileUrl] = useState("");
  const [email, setEmail] = useState("");
  
  // Multi-step Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState(1); // 1: Info, 2: Asset/Verify, 3: Success output
  const [previewIndex, setPreviewIndex] = useState(0);
  const [freeReportActiveIndex, setFreeReportActiveIndex] = useState(0);
  
  // Verification Data
  const [modalData, setModalData] = useState({ name: "", phone: "", purpose: "" });
  const [revenueAmount, setRevenueAmount] = useState("");
  const [revenueSources, setRevenueSources] = useState<string[]>([]);
  const [isOwner, setIsOwner] = useState(false);
  const [analyticsFile, setAnalyticsFile] = useState<File | null>(null);
  const [revenueFile, setRevenueFile] = useState<File | null>(null);
  
  const [isUploading, setIsUploading] = useState(false);

  // Native smooth drag support setup
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  
  const [particles, setParticles] = useState<Array<{top: string, left: string, size: string, duration: number, delay: number}>>([]);
  
  useEffect(() => {
    setParticles(Array.from({ length: 20 }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() > 0.5 ? 'w-1 h-1' : 'w-2 h-2',
      duration: 3 + Math.random() * 5,
      delay: Math.random() * 2
    })));
  }, []);

  const handleSelect = (id: string) => {
    setSelectedPlatform(id);
    setTimeout(() => setStep(2), 500); 
  };

  const handleBack = () => {
    setStep(1);
    setTimeout(() => {
      setSelectedPlatform(null);
      setProfileUrl("");
      setEmail("");
    }, 500);
  };

  const handleAnalyze = () => {
    setStep(3);
    setTimeout(() => setStep(4), 3000);
  };

  const slideVariants = {
    enter: (direction: number) => ({ x: direction > 0 ? 100 : -100, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction > 0 ? -100 : 100, opacity: 0 })
  };

  const modalVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2; 
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'analytics' | 'revenue') => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Set immediate UI feedback
    if (type === 'analytics') setAnalyticsFile(file);
    else setRevenueFile(file);

    // Simulate API call for now to keep the frontend responsive
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      if (!res.ok) console.warn("Backend upload failed, but maintaining UI state for flow demonstration.");
    } catch (err) {
      console.warn("Backend upload error:", err);
    } finally {
      setIsUploading(false);
    }
  };

  const submitFullReport = () => {
    setModalStep(3); // Premium Review Screen
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (typeof window !== "undefined" && (window as any).Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleCheckout = async () => {
    setModalStep(4); // Show "Processing Secure Payment" UI
    
    const res = await loadRazorpayScript();
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      setModalStep(3);
      return;
    }

    try {
      const orderData = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 999 }),
      }).then((t) => t.json());

      if (orderData.error) {
        alert("Failed to create order");
        setModalStep(3);
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_dummy",
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Social Xchange",
        description: "Verified Valuation Report",
        order_id: orderData.isMock ? undefined : orderData.id,
        handler: async function (response: any) {
          // Verify payment
          setModalStep(4); // Keep it at processing while verifying
          const verifyData = await fetch("/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              email: email || "guest@example.com",
              platform: selectedPlatform || "Unknown",
              profileName: profileUrl || "User",
              amount: 999,
              isMock: orderData.isMock
            }),
          }).then((t) => t.json());

          if (verifyData.success) {
            setModalStep(5); // Show Success Timeline
          } else {
            alert("Payment verification failed");
            setModalStep(3);
          }
        },
        prefill: {
          name: modalData.name,
          email: email,
          contact: modalData.phone,
        },
        theme: {
          color: "#3B82F6",
        },
        modal: {
          ondismiss: function () {
            setModalStep(3);
          }
        }
      };

      if (orderData.isMock) {
        // Skip opening Razorpay widget if no keys are setup
        console.warn("MOCK ORDER: Bypassing Razorpay widget UI");
        options.handler({
           razorpay_payment_id: "mock_payment_id_" + Date.now(),
           razorpay_order_id: orderData.id,
           razorpay_signature: "mock_signature"
        });
      } else {
        const paymentObject = new (window as any).Razorpay(options);
        paymentObject.open();
      }

    } catch (error) {
      console.error(error);
      alert("Error initiating checkout");
      setModalStep(3);
    }
  };

  const toggleRevenueSource = (source: string) => {
    setRevenueSources(prev => 
      prev.includes(source) ? prev.filter(s => s !== source) : [...prev, source]
    );
  };

  const platformData = platforms.find(p => p.id === selectedPlatform);
  const platformColor = platformData?.color?.replace('0.4', '1') || "#3B82F6";
  const platformShadowColor = platformData?.color || "rgba(59, 130, 246, 0.4)";
  const profileName = profileUrl ? profileUrl.split('/').pop()?.replace('@', '') || "Profile" : "Profile";

  return (
    <section id="valuation" className="relative w-full min-h-[clamp(150px,39.0625vw,500px)] md:min-h-[clamp(210px,54.6875vw,700px)] flex flex-col items-center justify-center py-20 overflow-hidden bg-[#020617]">
      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[clamp(240px,62.5vw,800px)] h-[clamp(240px,62.5vw,800px)] bg-blue-600/5 rounded-full blur-[clamp(45px,11.71875vw,150px)]"></div>
        <div className="absolute top-1/4 left-1/4 w-[clamp(150px,39.0625vw,500px)] h-[clamp(150px,39.0625vw,500px)] bg-purple-600/5 rounded-full blur-[clamp(36px,9.375vw,120px)]"></div>
        {particles.map((p, i) => (
          <motion.div key={i} animate={{ y: [-20, 20, -20], opacity: [0.1, 0.4, 0.1] }} transition={{ duration: p.duration, delay: p.delay, repeat: Infinity }} className={`absolute rounded-full blur-[clamp(0.3px,0.078125vw,1px)] bg-white ${p.size}`} style={{ top: p.top, left: p.left }} />
        ))}
      </div>

      <div className="w-full relative z-10 flex flex-col items-center">
        <AnimatePresence mode="wait" custom={step > 1 ? 1 : -1}>
          
          {/* STEP 1: CHOOSE PLATFORM */}
          {step === 1 && (
            <motion.div key="step1" custom={1} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="w-full max-w-[clamp(360px,93.75vw,1200px)] mx-auto px-4 flex flex-col items-center">
              <h2 className="text-[clamp(1.2rem,2.8vw,2.25rem)] md:text-[clamp(1.5rem,3.75vw,3rem)] lg:text-[clamp(25.6px,5vw,64px)] font-inter font-[800] text-white tracking-tight mb-4 text-center">Choose Your Platform</h2>
              <p className="text-gray-400 font-inter text-[clamp(0.875rem,1.4vw,1.125rem)] md:text-[clamp(0.9rem,1.5vw,1.25rem)] mb-12 text-center max-w-2xl">Choose the platform you want to evaluate. Our AI instantly analyzes audience quality, engagement, growth potential, and market value.</p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 w-full max-w-5xl">
                {platforms.map((platform) => {
                  const isSelected = selectedPlatform === platform.id;
                  return (
                    <motion.button key={platform.id} suppressHydrationWarning whileHover={{ y: -8, scale: 1.02, boxShadow: `0 10px 40px ${platform.color}` }} whileTap={{ scale: 0.95 }} onClick={() => handleSelect(platform.id)} className={`relative flex flex-col items-center justify-center p-6 rounded-[24px] transition-all duration-300 aspect-square min-h-[clamp(42px,10.9375vw,140px)] ${isSelected ? `bg-[rgba(8,15,35,0.9)] border border-white/20 scale-105 shadow-[0_0_30px_${platform.color}]` : 'bg-[rgba(8,15,35,0.75)] border border-[rgba(255,255,255,0.05)] hover:border-white/10 backdrop-blur-xl'}`}>
                      <div className={`transition-transform duration-300 ${isSelected ? 'scale-110 mb-4' : 'mb-4'}`}>{platform.icon}</div>
                      <span className={`font-inter font-semibold ${isSelected ? 'text-white' : 'text-gray-300'}`}>{platform.name}</span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* STEP 2: PROFILE FORM */}
          {step === 2 && selectedPlatform && (
            <motion.div key="step2" custom={1} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="w-full max-w-2xl mx-auto px-4 flex flex-col items-center pt-8">
              <button onClick={handleBack} className="self-start mb-8 text-gray-400 hover:text-white flex items-center gap-2 font-inter transition-colors"><span className="material-symbols-outlined text-sm">arrow_back</span>Back to Platforms</button>
              <div className="w-full bg-[rgba(8,15,35,0.75)] backdrop-blur-xl border border-[rgba(255,255,255,0.05)] rounded-[32px] p-10 md:p-14 text-center shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[clamp(30px,7.8125vw,100px)] pointer-events-none opacity-20" style={{ background: platformShadowColor }}></div>
                <div className="relative z-10 flex flex-col items-center w-full">
                  <div className="mb-4 text-white">{platformData?.icon}</div>
                  <h3 className="text-[clamp(1.1rem,2.3vw,1.875rem)] font-inter font-bold text-white mb-2">Connect {platformData?.name} {selectedPlatform === 'newsletter' ? '' : selectedPlatform === 'youtube' ? 'Channel' : 'Profile'}</h3>
                  <p className="text-gray-400 font-inter text-[clamp(0.875rem,1.4vw,1.125rem)] mb-8">Enter your public URL and email to fetch real-time analytics.</p>
                  <div className="w-full relative group text-left mb-4">
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-500 group-focus-within:text-white transition-colors">link</span>
                    <input type="text" suppressHydrationWarning value={profileUrl} onChange={(e) => setProfileUrl(e.target.value)} placeholder={`https://${selectedPlatform}.com/username`} className="w-full bg-[#030712] border border-white/10 rounded-[20px] py-5 pl-14 pr-6 text-white text-[clamp(0.875rem,1.4vw,1.125rem)] placeholder:text-gray-600 focus:outline-none focus:border-white/30 transition-all font-inter shadow-inner" />
                  </div>
                  <div className="w-full relative group text-left">
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-500 group-focus-within:text-white transition-colors">mail</span>
                    <input type="email" suppressHydrationWarning value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address to receive report" className="w-full bg-[#030712] border border-white/10 rounded-[20px] py-5 pl-14 pr-6 text-white text-[clamp(0.875rem,1.4vw,1.125rem)] placeholder:text-gray-600 focus:outline-none focus:border-white/30 transition-all font-inter shadow-inner" onKeyDown={(e) => e.key === 'Enter' && profileUrl && email && handleAnalyze()} />
                  </div>
                  <div className="w-full flex justify-end mt-6">
                    <button onClick={handleAnalyze} disabled={!profileUrl || !email} className="font-inter px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-[16px] font-semibold transition-all flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed">Analyze Metrics<span className="material-symbols-outlined">analytics</span></button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 3: FETCHING METRICS */}
          {step === 3 && (
            <motion.div key="step3" custom={1} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="w-full max-w-3xl mx-auto px-4 flex flex-col items-center justify-center text-center py-12">
              <div className="relative w-32 h-32 mb-10 flex items-center justify-center">
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }} className="absolute inset-0 border-[4px] border-dashed border-white/20 rounded-full"></motion.div>
                <div className="absolute inset-0 border-[4px] border-transparent rounded-full border-t-white/50 border-l-white/50 animate-spin" style={{ animationDuration: '2s' }}></div>
                <div className="w-16 h-16 rounded-full flex items-center justify-center bg-white/10"><span className="material-symbols-outlined text-[clamp(1.1rem,2.3vw,1.875rem)] text-white">satellite_alt</span></div>
              </div>
              <h3 className="text-[clamp(1.2rem,2.8vw,2.25rem)] font-inter font-bold text-white tracking-tight mb-4">Fetching Real-time Metrics</h3>
              <p className="text-[clamp(0.9rem,1.5vw,1.25rem)] text-gray-400 font-inter mb-16 max-w-xl mx-auto">Our AI model is securely analyzing audience quality, engagement patterns, and market comparables.</p>
              <div className="grid grid-cols-3 gap-6 w-full max-w-3xl">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[24px] p-6 text-left flex flex-col gap-4">
                    <SkeletonBar width="w-24" delay={i * 0.2} />
                    <SkeletonBar width="w-full" delay={i * 0.2 + 0.1} />
                    <SkeletonBar width="w-2/3" delay={i * 0.2 + 0.2} />
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 4: STORY CAROUSEL (PREMIUM FREE REPORT) */}
          {step === 4 && (
            <motion.div key="step4" custom={1} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.6, ease: "easeOut" }} className="w-full flex flex-col items-center justify-center min-h-[clamp(210px,54.6875vw,700px)] relative pt-8 pb-16">
              
              <button onClick={() => { setStep(1); setSelectedPlatform(null); setProfileUrl(""); setEmail(""); }} className="absolute top-4 left-4 md:left-8 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-inter px-4 py-2 rounded-xl transition-all flex items-center gap-2 text-sm font-medium backdrop-blur-md z-30">
                 <span className="material-symbols-outlined text-sm">refresh</span>Start Over
              </button>

              {/* Dynamic Background Glow based on platform */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                 <motion.div 
                   animate={{ 
                     background: platformData?.color || "rgba(59, 130, 246, 0.4)",
                     opacity: [0.1, 0.15, 0.1]
                   }}
                   transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
                   className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[clamp(210px,54.6875vw,700px)] max-h-[clamp(210px,54.6875vw,700px)] rounded-full blur-[clamp(45px,11.71875vw,150px)]"
                 />
              </div>

              {/* Compact Header */}
              <div className="relative z-20 w-full max-w-[clamp(102px,26.5625vw,340px)] md:max-w-[clamp(210px,54.6875vw,700px)] mx-auto px-4 mb-8 mt-12 md:mt-0">
                 <div className="bg-[#030712]/60 backdrop-blur-2xl border border-white/10 rounded-[20px] p-4 flex flex-row items-center justify-between gap-4 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white shadow-inner">{platformData?.icon}</div>
                       <div className="flex flex-col">
                         <span className="text-white font-bold font-inter text-sm">@{profileName}</span>
                         <span className="text-gray-400 text-xs font-inter mt-0.5">124K Followers • <span className="text-[#22C55E] font-medium">4.8% Eng.</span></span>
                       </div>
                    </div>
                    <div className="w-px h-10 bg-white/10 block"></div>
                    <div className="flex w-full md:w-auto justify-between md:justify-end gap-6 md:gap-8 px-2 md:px-0">
                      <div className="flex flex-col items-start md:items-end">
                         <span className="text-gray-500 text-[clamp(4px,0.78125vw,10px)] uppercase tracking-wider font-bold mb-1">Estimated Value</span>
                         <span className="text-white font-bold text-base font-inter">$18K - $24K</span>
                      </div>
                      <div className="flex flex-col items-start md:items-end">
                         <span className="text-gray-500 text-[clamp(4px,0.78125vw,10px)] uppercase tracking-wider font-bold mb-1">Confidence</span>
                         <span className="text-green-400 font-bold text-xs bg-green-500/10 px-2 py-0.5 rounded font-inter">60-70%</span>
                      </div>
                    </div>
                 </div>
              </div>

              {/* Carousel */}
              <div className="relative z-10 w-full overflow-hidden py-4 flex flex-col items-center">
                 <div className="w-full flex justify-center items-center h-[clamp(120px,31.25vw,400px)] md:h-[clamp(126px,32.8125vw,420px)] relative px-4 md:px-0">
                    
                    {/* Arrows */}
                    <button 
                      onClick={() => setFreeReportActiveIndex(prev => Math.max(0, prev - 1))}
                      disabled={freeReportActiveIndex === 0}
                      className={`flex absolute left-4 lg:left-[calc(50%-280px)] top-1/2 -translate-y-1/2 w-12 h-12 bg-black/40 hover:bg-black/60 border border-white/10 rounded-full items-center justify-center text-white z-30 transition-all backdrop-blur-md ${freeReportActiveIndex === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100 hover:scale-110'}`}
                    >
                      <span className="material-symbols-outlined text-[clamp(9.6px,1.875vw,24px)]">chevron_left</span>
                    </button>
                    <button 
                      onClick={() => setFreeReportActiveIndex(prev => Math.min(FREE_REPORT_CARDS.length - 1, prev + 1))}
                      disabled={freeReportActiveIndex === FREE_REPORT_CARDS.length - 1}
                      className={`flex absolute right-4 lg:right-[calc(50%-280px)] top-1/2 -translate-y-1/2 w-12 h-12 bg-black/40 hover:bg-black/60 border border-white/10 rounded-full items-center justify-center text-white z-30 transition-all backdrop-blur-md ${freeReportActiveIndex === FREE_REPORT_CARDS.length - 1 ? 'opacity-0 pointer-events-none' : 'opacity-100 hover:scale-110'}`}
                    >
                      <span className="material-symbols-outlined text-[clamp(9.6px,1.875vw,24px)]">chevron_right</span>
                    </button>

                    {FREE_REPORT_CARDS.map((card, index) => {
                       const offset = index - freeReportActiveIndex;
                       const isVisible = Math.abs(offset) <= 2;
                       if (!isVisible) return null;

                       const x = offset * 360; 
                       const scale = offset === 0 ? 1 : 0.85;
                       const opacity = offset === 0 ? 1 : 0.4;
                       const zIndex = 20 - Math.abs(offset);
                       const isActive = offset === 0;

                       return (
                          <motion.div 
                            key={index}
                            initial={false}
                            animate={{ x, scale, opacity, zIndex }}
                            transition={{ type: "spring", stiffness: 350, damping: 30 }}
                            className={`absolute w-[85vw] max-w-[clamp(102px,26.5625vw,340px)] h-[clamp(120px,31.25vw,400px)] md:h-[clamp(126px,32.8125vw,420px)] bg-[#030712]/90 backdrop-blur-2xl border border-white/10 rounded-[32px] p-6 shadow-2xl flex flex-col ${isActive ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer hover:opacity-60 transition-opacity'}`}
                            style={{ touchAction: "pan-y" }}
                            onClick={() => !isActive && setFreeReportActiveIndex(index)}
                            drag={isActive ? "x" : false}
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.2}
                            onDragEnd={(e, { offset, velocity }) => {
                               if (!isActive) return;
                               const swipe = offset.x;
                               if ((swipe < -20 || velocity.x < -200) && freeReportActiveIndex < FREE_REPORT_CARDS.length - 1) {
                                  setFreeReportActiveIndex(prev => prev + 1);
                               } else if ((swipe > 20 || velocity.x > 200) && freeReportActiveIndex > 0) {
                                  setFreeReportActiveIndex(prev => prev - 1);
                               }
                            }}
                          >
                             <span className="text-gray-400 font-inter uppercase tracking-widest text-[clamp(4px,0.78125vw,10px)] font-bold block mb-4 border-b border-white/10 pb-3">{card.label}</span>
                             <div className="flex-1 flex flex-col">
                                {card.content}
                             </div>
                          </motion.div>
                       );
                    })}
                 </div>
                 
                 {/* Progress Indicator */}
                 <div className="mt-8 flex flex-col items-center gap-2">
                    <div className="flex gap-1.5">
                      {FREE_REPORT_CARDS.map((_, i) => (
                        <div key={i} className={`w-2 h-2 rounded-full transition-colors duration-300 ${i === freeReportActiveIndex ? 'bg-white' : 'bg-white/20'}`} />
                      ))}
                    </div>
                    <span className="text-gray-500 text-[clamp(4px,0.78125vw,10px)] font-inter font-bold tracking-widest">{freeReportActiveIndex + 1} / {FREE_REPORT_CARDS.length}</span>
                 </div>
              </div>

              {/* Compact Premium CTA */}
              <div className="relative z-20 w-full max-w-[clamp(120px,31.25vw,400px)] mx-auto px-4 mt-8">
                 <div className="bg-gradient-to-br from-[#060B1A] to-[#0A1325] border border-blue-500/30 rounded-[24px] p-5 shadow-[0_0_40px_rgba(37,99,235,0.15)] flex flex-col items-center text-center">
                    <div className="flex items-center gap-2 mb-2">
                       <span className="material-symbols-outlined text-blue-400 text-[clamp(7.2px,1.40625vw,18px)]">lock</span>
                       <span className="text-white font-bold text-base font-inter">Verified Valuation Report</span>
                    </div>
                    <div className="flex items-center gap-3 text-[clamp(4.4px,0.859375vw,11px)] font-bold font-inter tracking-wider uppercase mb-5">
                       <span className="text-green-400 bg-green-500/10 px-2 py-1 rounded">90%+ Confidence</span>
                       <span className="text-gray-400 flex items-center gap-1"><span className="material-symbols-outlined text-[clamp(5.6px,1.09375vw,14px)]">timer</span> 30–60 Min</span>
                    </div>
                    <button onClick={() => { setIsModalOpen(true); setModalStep(1); }} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-inter font-bold py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:scale-[1.02] flex items-center justify-center gap-2 text-sm">
                       Get Full Report - ₹999
                       <span className="material-symbols-outlined text-[clamp(6.4px,1.25vw,16px)]">arrow_forward</span>
                    </button>
                 </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* MULTI-STEP PREMIUM VERIFICATION MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center sm:px-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
            
            <motion.div 
              initial={{ opacity: 0, y: "100%" }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: "100%" }} 
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className={`relative w-full ${modalStep === 3 ? 'max-w-4xl' : 'max-w-lg'} bg-[#0B0F19] border border-white/10 rounded-t-[32px] md:rounded-[32px] p-6 md:p-8 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] overflow-y-auto`}
            >
              <div className=" w-12 h-1.5 bg-white/20 rounded-full mx-auto mb-6 shrink-0" />
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[clamp(24px,6.25vw,80px)] pointer-events-none"></div>

              <div className="flex justify-between items-start mb-2 relative z-10">
                <div>
                  <h3 className="text-[clamp(1rem,1.8vw,1.5rem)] font-inter font-bold text-white">Get Full Report</h3>
                  {modalStep < 3 && (
                     <div className="flex items-center gap-2 mt-1">
                       <span className="material-symbols-outlined text-green-400 text-sm">verified</span>
                       <span className="text-gray-400 text-xs font-inter font-medium tracking-wide">CONFIDENCE SYSTEM: <span className="text-white">90%+ Verified</span></span>
                     </div>
                  )}
                </div>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              {/* Progress Indicator */}
              {modalStep < 3 && (
                <div className="flex gap-2 w-full mb-8 mt-4">
                   <div className={`h-1.5 flex-1 rounded-full transition-colors ${modalStep >= 1 ? 'bg-blue-500' : 'bg-white/10'}`}></div>
                   <div className={`h-1.5 flex-1 rounded-full transition-colors ${modalStep >= 2 ? 'bg-blue-500' : 'bg-white/10'}`}></div>
                </div>
              )}

              <div className="relative z-10">
                <AnimatePresence mode="wait">
                  {/* TAB 1: PERSONAL INFO */}
                  {modalStep === 1 && (
                    <motion.div key="tab1" variants={modalVariants} initial="hidden" animate="visible" exit="exit" transition={{ duration: 0.3 }} className="flex flex-col gap-4">
                      <div>
                        <label className="text-xs font-inter text-gray-400 font-medium uppercase tracking-wider mb-1 block">Full Name</label>
                        <input type="text" value={modalData.name} onChange={(e) => setModalData({...modalData, name: e.target.value})} className="w-full bg-[#030712] border border-white/10 rounded-xl px-4 py-3 text-white font-inter focus:outline-none focus:border-blue-500/50 transition-colors" placeholder="Jane Doe" />
                      </div>
                      <div>
                        <label className="text-xs font-inter text-gray-400 font-medium uppercase tracking-wider mb-1 block">Email Address</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-[#030712] border border-white/10 rounded-xl px-4 py-3 text-white font-inter focus:outline-none focus:border-blue-500/50 transition-colors" placeholder="jane@example.com" />
                      </div>
                      <div>
                        <label className="text-xs font-inter text-gray-400 font-medium uppercase tracking-wider mb-1 block">Phone Number</label>
                        <input type="tel" value={modalData.phone} onChange={(e) => setModalData({...modalData, phone: e.target.value})} className="w-full bg-[#030712] border border-white/10 rounded-xl px-4 py-3 text-white font-inter focus:outline-none focus:border-blue-500/50 transition-colors" placeholder="+1 (555) 000-0000" />
                      </div>
                      <div>
                        <label className="text-xs font-inter text-gray-400 font-medium uppercase tracking-wider mb-1 block">Primary Purpose</label>
                        <select value={modalData.purpose} onChange={(e) => setModalData({...modalData, purpose: e.target.value})} className="w-full bg-[#030712] border border-white/10 rounded-xl px-4 py-3 text-white font-inter focus:outline-none focus:border-blue-500/50 transition-colors appearance-none">
                          <option value="" disabled>Select a purpose...</option>
                          <option value="Selling Asset">Selling Asset</option>
                          <option value="Buying Asset">Buying Asset</option>
                          <option value="Investment Research">Investment Research</option>
                          <option value="Market Research">Market Research</option>
                        </select>
                      </div>

                      <button 
                        onClick={() => setModalStep(2)}
                        disabled={!modalData.name || !email || !modalData.phone || !modalData.purpose}
                        className="w-full bg-white text-gray-900 disabled:bg-white/10 disabled:text-gray-500 font-inter font-bold py-3.5 rounded-xl mt-4 transition-colors flex items-center justify-center gap-2"
                      >
                        Continue to Verification <span className="material-symbols-outlined text-sm">arrow_forward</span>
                      </button>
                    </motion.div>
                  )}

                  {/* TAB 2: ASSET VERIFICATION */}
                  {modalStep === 2 && (
                    <motion.div key="tab2" variants={modalVariants} initial="hidden" animate="visible" exit="exit" transition={{ duration: 0.3 }} className="flex flex-col gap-5">
                      
                      {/* Revenue Input */}
                      <div>
                        <label className="text-xs font-inter text-gray-400 font-medium uppercase tracking-wider mb-1 block">Monthly Revenue</label>
                        <div className="relative">
                          <input type="text" value={revenueAmount} onChange={(e) => setRevenueAmount(e.target.value)} className="w-full bg-[#030712] border border-white/10 rounded-xl px-4 py-3 text-white font-inter focus:outline-none focus:border-blue-500/50 transition-colors" placeholder="$5,000" />
                        </div>
                      </div>

                      {/* Revenue Sources */}
                      <div>
                        <label className="text-xs font-inter text-gray-400 font-medium uppercase tracking-wider mb-2 block">Revenue Sources</label>
                        <div className="flex flex-wrap gap-2">
                          {REVENUE_SOURCES.map(source => (
                            <button key={source} onClick={() => toggleRevenueSource(source)} className={`px-3 py-1.5 rounded-full text-xs font-inter font-medium transition-all border ${revenueSources.includes(source) ? 'bg-blue-600/20 text-blue-300 border-blue-500/50' : 'bg-white/5 text-gray-400 border-white/10 hover:border-white/30'}`}>
                              {source}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Upload Zones */}
                      <div className="flex flex-col gap-3">
                        <label className="text-xs font-inter text-gray-400 font-medium uppercase tracking-wider block">Verification Uploads</label>
                        
                        {/* Analytics Upload */}
                        <div className="relative w-full">
                          <input type="file" onChange={(e) => handleFileUpload(e, 'analytics')} accept="image/*,.pdf" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                          <div className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border ${analyticsFile ? 'bg-green-500/10 border-green-500/30' : 'bg-[#030712] border-dashed border-white/20'}`}>
                            <div className="flex items-center gap-3">
                              <span className={`material-symbols-outlined ${analyticsFile ? 'text-green-400' : 'text-gray-500'}`}>{analyticsFile ? 'check_circle' : 'monitoring'}</span>
                              <div className="flex flex-col">
                                <span className={`text-sm font-inter font-medium ${analyticsFile ? 'text-green-400' : 'text-white'}`}>{analyticsFile ? analyticsFile.name : 'Upload Analytics Screenshot'}</span>
                                {!analyticsFile && <span className="text-xs text-gray-500 font-inter">PNG, JPG, PDF (e.g. YouTube Studio)</span>}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Revenue Upload */}
                        <div className="relative w-full">
                          <input type="file" onChange={(e) => handleFileUpload(e, 'revenue')} accept="image/*,.pdf" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                          <div className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border ${revenueFile ? 'bg-green-500/10 border-green-500/30' : 'bg-[#030712] border-dashed border-white/20'}`}>
                            <div className="flex items-center gap-3">
                              <span className={`material-symbols-outlined ${revenueFile ? 'text-green-400' : 'text-gray-500'}`}>{revenueFile ? 'check_circle' : 'payments'}</span>
                              <div className="flex flex-col">
                                <span className={`text-sm font-inter font-medium ${revenueFile ? 'text-green-400' : 'text-white'}`}>{revenueFile ? revenueFile.name : 'Upload Revenue Screenshot'}</span>
                                {!revenueFile && <span className="text-xs text-gray-500 font-inter">PNG, JPG, PDF (e.g. Stripe Dashboard)</span>}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Declaration */}
                      <label className="flex items-start gap-3 mt-2 cursor-pointer group">
                        <div className="relative flex items-center justify-center w-5 h-5 mt-0.5 shrink-0">
                          <input type="checkbox" checked={isOwner} onChange={(e) => setIsOwner(e.target.checked)} className="peer appearance-none w-5 h-5 border border-white/20 rounded bg-[#030712] checked:bg-blue-600 checked:border-blue-600 transition-colors" />
                          <span className="material-symbols-outlined absolute text-white text-[clamp(6.4px,1.25vw,16px)] pointer-events-none opacity-0 peer-checked:opacity-100">check</span>
                        </div>
                        <span className="text-xs font-inter text-gray-400 group-hover:text-gray-300 transition-colors">I confirm that I own or manage this asset and the submitted information is accurate.</span>
                      </label>

                      <div className="flex flex-col gap-3 mt-2">
                        <button 
                          onClick={submitFullReport}
                          disabled={!revenueAmount || revenueSources.length === 0 || !analyticsFile || !revenueFile || !isOwner || isUploading}
                          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 disabled:from-white/10 disabled:to-white/10 disabled:text-gray-500 text-white font-inter font-bold py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] disabled:shadow-none"
                        >
                          {isUploading ? 'Uploading...' : 'Generate Verified Valuation Report'}
                        </button>
                        <p className="text-[clamp(4px,0.78125vw,10px)] text-gray-500 text-center font-inter px-4 leading-tight">
                          Your uploaded documents are used only for valuation verification and are never shared with third parties.
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 3: PREMIUM REVIEW SCREEN (CAROUSEL) */}
                  {modalStep === 3 && (
                    <motion.div key="tab3" variants={modalVariants} initial="hidden" animate="visible" exit="exit" transition={{ duration: 0.3 }} className="flex flex-col items-center justify-center py-4 w-full">
                      
                      {/* Inner Preview Box */}
                      <div className="relative w-full max-w-[clamp(126px,32.8125vw,420px)] h-[clamp(78px,20.3125vw,260px)] bg-[#0A1325]/80 backdrop-blur-2xl border border-blue-500/30 rounded-3xl shadow-[0_0_50px_rgba(37,99,235,0.15)] flex flex-col group mb-8">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-transparent pointer-events-none rounded-3xl"></div>
                        <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/10 rounded-full blur-[clamp(15px,3.90625vw,50px)] pointer-events-none"></div>

                        <div className="relative z-10 flex flex-col items-center text-center justify-center h-full w-full overflow-hidden rounded-3xl">
                          <AnimatePresence mode="wait">
                            <motion.div 
                              key={previewIndex}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -20 }}
                              transition={{ duration: 0.2 }}
                              className="flex flex-col items-center w-full px-8 cursor-grab active:cursor-grabbing"
                              drag="x"
                              dragConstraints={{ left: 0, right: 0 }}
                              dragElastic={0.2}
                              onDragEnd={(e, { offset, velocity }) => {
                                const swipe = Math.abs(offset.x) * velocity.x;
                                if (swipe < -50 || offset.x < -50) {
                                  setPreviewIndex((prev) => (prev + 1) % PREVIEW_CARDS.length);
                                } else if (swipe > 50 || offset.x > 50) {
                                  setPreviewIndex((prev) => (prev - 1 + PREVIEW_CARDS.length) % PREVIEW_CARDS.length);
                                }
                              }}
                            >
                               <span className="text-gray-500 font-inter text-[clamp(4px,0.78125vw,10px)] uppercase tracking-widest font-bold mb-3">Preview {previewIndex + 1} of {PREVIEW_CARDS.length}</span>
                               <h4 className="text-[clamp(0.9rem,1.5vw,1.25rem)] font-inter font-bold text-white mb-1">{PREVIEW_CARDS[previewIndex].title}</h4>
                               <span className="text-blue-400 font-inter font-bold text-base mb-5">{PREVIEW_CARDS[previewIndex].metric}</span>
                               
                               <div className="w-full max-w-[clamp(72px,18.75vw,240px)] mb-5 min-h-[clamp(12px,3.125vw,40px)] flex items-center justify-center pointer-events-none">
                                 {PREVIEW_CARDS[previewIndex].visual}
                               </div>

                               <p className="text-gray-400 font-inter text-xs max-w-[clamp(84px,21.875vw,280px)] leading-relaxed">
                                 {PREVIEW_CARDS[previewIndex].insight}
                               </p>
                            </motion.div>
                          </AnimatePresence>
                        </div>

                        {/* Arrows */}
                        <button 
                          onClick={() => setPreviewIndex((prev) => (prev - 1 + PREVIEW_CARDS.length) % PREVIEW_CARDS.length)}
                          className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/40 hover:bg-black/60 border border-white/10 rounded-full flex items-center justify-center text-white z-20 transition-all opacity-0 group-hover:opacity-100 hover:scale-110 backdrop-blur-md"
                        >
                          <span className="material-symbols-outlined text-[clamp(6.4px,1.25vw,16px)]">chevron_left</span>
                        </button>
                        <button 
                          onClick={() => setPreviewIndex((prev) => (prev + 1) % PREVIEW_CARDS.length)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/40 hover:bg-black/60 border border-white/10 rounded-full flex items-center justify-center text-white z-20 transition-all opacity-0 group-hover:opacity-100 hover:scale-110 backdrop-blur-md"
                        >
                          <span className="material-symbols-outlined text-[clamp(6.4px,1.25vw,16px)]">chevron_right</span>
                        </button>

                        {/* Indicators */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20 pointer-events-none">
                          {PREVIEW_CARDS.map((_, i) => (
                            <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === previewIndex ? 'w-4 bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]' : 'w-1.5 bg-white/20'}`} />
                          ))}
                        </div>
                      </div>

                      {/* Bottom Section */}
                      <div className="flex flex-col items-center gap-5 w-full max-w-[clamp(126px,32.8125vw,420px)]">
                        <div className="flex items-center justify-center gap-6 w-full">
                           <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-[0_0_15px_rgba(34,197,94,0.1)]">
                             <span className="material-symbols-outlined text-[clamp(5.6px,1.09375vw,14px)]">verified</span>
                             90%+ Confidence
                           </div>
                           <div className="flex items-center gap-2 bg-white/5 border border-white/10 text-white text-xs font-medium px-3 py-1.5 rounded-full">
                             <span className="material-symbols-outlined text-gray-400 text-[clamp(5.6px,1.09375vw,14px)]">timer</span>
                             30–60 Minutes
                           </div>
                        </div>

                        <button onClick={handleCheckout} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-inter font-bold py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] hover:scale-[1.02] flex items-center justify-center gap-2 text-[clamp(0.875rem,1.4vw,1.125rem)] group">
                          Get Full Report - ₹999
                          <span className="material-symbols-outlined text-[clamp(8px,1.5625vw,20px)] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                        </button>
                      </div>

                    </motion.div>
                  )}

                  {/* TAB 4: CHECKOUT PROCESSING */}
                  {modalStep === 4 && (
                    <motion.div key="tab4" variants={modalVariants} initial="hidden" animate="visible" exit="exit" transition={{ duration: 0.3 }} className="flex flex-col items-center text-center py-12">
                      <div className="relative w-20 h-20 mb-6 flex items-center justify-center">
                        <div className="absolute inset-0 border-[3px] border-transparent rounded-full border-t-blue-500 border-l-blue-500 animate-spin"></div>
                        <span className="material-symbols-outlined text-blue-500 text-[clamp(1.1rem,2.3vw,1.875rem)]">lock</span>
                      </div>
                      <h4 className="text-[clamp(0.9rem,1.5vw,1.25rem)] font-inter font-bold text-white mb-2">Processing Secure Payment</h4>
                      <p className="text-gray-400 font-inter text-sm">Please do not close this window.</p>
                    </motion.div>
                  )}

                  {/* TAB 5: REPORT STATUS TIMELINE */}
                  {modalStep === 5 && (
                    <motion.div key="tab5" variants={modalVariants} initial="hidden" animate="visible" exit="exit" transition={{ duration: 0.3 }} className="flex flex-col py-2 px-2 w-full max-w-[clamp(126px,32.8125vw,420px)] mx-auto">
                      <div className="text-center mb-6 mt-4">
                        <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4 border border-green-500/30 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                          <span className="material-symbols-outlined text-green-400 text-[clamp(1.1rem,2.3vw,1.875rem)]">task_alt</span>
                        </div>
                        <h4 className="text-[clamp(1rem,1.8vw,1.5rem)] font-inter font-bold text-white mb-2">Payment Successful 🎉</h4>
                        <p className="text-blue-400 font-inter text-sm font-medium">Your Verified Valuation Report is now being prepared.</p>
                      </div>

                      <div className="bg-[#030712]/50 border border-white/10 rounded-2xl p-4 mb-6 shadow-inner">
                        <div className="flex justify-between items-center mb-3 pb-3 border-b border-white/10">
                          <span className="text-gray-400 text-xs font-inter uppercase tracking-wider font-bold">Order Status</span>
                          <span className="text-white text-sm font-inter font-bold bg-blue-500/20 px-2 py-0.5 rounded border border-blue-500/30">Processing</span>
                        </div>
                        <div className="flex justify-between items-center mb-3 pb-3 border-b border-white/10">
                          <span className="text-gray-400 text-xs font-inter uppercase tracking-wider font-bold">Report Type</span>
                          <span className="text-white text-sm font-inter font-medium">Verified Valuation Report</span>
                        </div>
                        <div className="flex justify-between items-center mb-3 pb-3 border-b border-white/10">
                          <span className="text-gray-400 text-xs font-inter uppercase tracking-wider font-bold">Delivery</span>
                          <span className="text-white text-sm font-inter font-medium flex items-center gap-1"><span className="material-symbols-outlined text-[clamp(5.6px,1.09375vw,14px)]">timer</span> Within 3 Hours</span>
                        </div>
                        <div className="flex justify-between items-center mb-3 pb-3 border-b border-white/10">
                          <span className="text-gray-400 text-xs font-inter uppercase tracking-wider font-bold">Payment Status</span>
                          <span className="text-green-400 text-sm font-inter font-bold">Paid</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400 text-xs font-inter uppercase tracking-wider font-bold">Confidence</span>
                          <span className="text-white text-sm font-inter font-medium">90%+</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-5 ml-4 relative mb-8">
                        <div className="absolute left-[11px] top-4 bottom-4 w-0.5 bg-white/10"></div>

                        <div className="flex items-center gap-5 relative z-10">
                          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(34,197,94,0.5)]">
                            <span className="material-symbols-outlined text-white text-[clamp(5.6px,1.09375vw,14px)]">check</span>
                          </div>
                          <span className="text-white font-inter text-sm font-medium">Payment Received</span>
                        </div>

                        <div className="flex items-center gap-5 relative z-10">
                          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(34,197,94,0.5)]">
                            <span className="material-symbols-outlined text-white text-[clamp(5.6px,1.09375vw,14px)]">check</span>
                          </div>
                          <span className="text-white font-inter text-sm font-medium">Data Verification Started</span>
                        </div>

                        <div className="flex items-center gap-5 relative z-10">
                          <div className="w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500 flex items-center justify-center shrink-0">
                            <span className="material-symbols-outlined text-blue-400 text-[clamp(5.6px,1.09375vw,14px)] animate-spin">autorenew</span>
                          </div>
                          <span className="text-blue-400 font-inter text-sm font-medium">Report Generation In Progress</span>
                        </div>

                        <div className="flex items-center gap-5 relative z-10 opacity-50">
                          <div className="w-6 h-6 rounded-full bg-[#030712] border border-white/20 flex items-center justify-center shrink-0">
                            <span className="material-symbols-outlined text-gray-500 text-[clamp(5.6px,1.09375vw,14px)]">autorenew</span>
                          </div>
                          <span className="text-gray-400 font-inter text-sm">PDF Creation</span>
                        </div>

                        <div className="flex items-center gap-5 relative z-10 opacity-50">
                          <div className="w-6 h-6 rounded-full bg-[#030712] border border-white/20 flex items-center justify-center shrink-0">
                            <span className="material-symbols-outlined text-gray-500 text-[clamp(5.6px,1.09375vw,14px)]">mail</span>
                          </div>
                          <span className="text-gray-400 font-inter text-sm">Report Delivery</span>
                        </div>
                      </div>

                      <div className="text-center bg-white/5 p-4 rounded-xl border border-white/10 mb-6">
                         <p className="text-xs text-gray-400 font-inter">We will email the final report to <span className="text-white font-medium">{email}</span> and it will be available in your dashboard.</p>
                      </div>

                      <a href="/dashboard" className="w-full bg-white text-gray-900 hover:bg-gray-200 font-inter font-bold py-4 rounded-xl transition-all flex justify-center shadow-lg hover:shadow-xl">
                        Go to My Dashboard
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}

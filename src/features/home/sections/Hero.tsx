"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const YouTubeIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const InstagramIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
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

const floatingCards = [
  {
    platform: "YouTube",
    Icon: YouTubeIcon,
    iconBg: "bg-red-500",
    title: "Kickoff Daily",
    metric1: "125K Subscribers",
    metric2: "Engagement 6.4%",
    value: "$18,400",
    delay: 0,
    position: "top-[0%] left-1/2 -translate-x-1/2",
    floatY: [-8, 8, -8]
  },
  {
    platform: "Instagram",
    Icon: InstagramIcon,
    iconBg: "bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500",
    title: "FootballHub",
    metric1: "84K Followers",
    metric2: "Engagement 4.8%",
    value: "$9,200",
    delay: 0.2,
    position: "top-[32%] left-[0%]",
    floatY: [8, -8, 8]
  },
  {
    platform: "Telegram",
    Icon: TelegramIcon,
    iconBg: "bg-[#2563EB]",
    title: "Investors Club",
    metric1: "12.7K Members",
    metric2: "Engagement 8.2%",
    value: "$7,650",
    delay: 0.4,
    position: "top-[32%] right-[0%]",
    floatY: [-6, 6, -6]
  },
  {
    platform: "Newsletter",
    Icon: EmailIcon,
    iconBg: "bg-[#7C3AED]",
    title: "The Growth Letter",
    metric1: "18K Subscribers",
    metric2: "Open Rate 42%",
    value: "$6,300",
    delay: 0.6,
    position: "top-[64%] left-1/2 -translate-x-1/2",
    floatY: [6, -6, 6]
  }
];

const bgIcons = [
  { Icon: InstagramIcon, color: "text-pink-500", top: "25%", left: "5%", delay: 0 },
  { Icon: YouTubeIcon, color: "text-red-500", top: "5%", left: "85%", delay: 1 },
  { Icon: TelegramIcon, color: "text-[#2563EB]", top: "75%", left: "5%", delay: 0.5 },
  { Icon: EmailIcon, color: "text-[#7C3AED]", top: "85%", left: "85%", delay: 2 },
];

export function Hero() {
  const [particles, setParticles] = useState<Array<{top: string, left: string, size: string, duration: number, delay: number}>>([]);

  useEffect(() => {
    setParticles(Array.from({ length: 15 }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() > 0.5 ? 'w-1 h-1' : 'w-1.5 h-1.5',
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4
    })));
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#020617]" style={{ padding: 'clamp(1rem, 2vw, 1.5rem) clamp(12px, 5vw, 64px) clamp(1.5rem, 3vw, 3rem)' }}>
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#2563EB]/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#7C3AED]/10 rounded-full blur-[150px] pointer-events-none"></div>
      
      {/* Always side-by-side: ~38% text / ~62% floating cards — proportional to desktop */}
      <div className="max-w-7xl mx-auto flex w-full items-center relative z-10" style={{ gap: 'clamp(0.75rem, 3vw, 4rem)', minHeight: 'clamp(300px, 47vw, 600px)' }}>
        
        {/* Left Column - Copy & CTA */}
        <div className="flex flex-col w-[38%] shrink-0" style={{ gap: 'clamp(0.4rem, 1.2vw, 1.5rem)' }}>
          {/* Pill Badge */}
          <div className="inline-flex items-center bg-[#0A1325] border border-white/5 rounded-full w-fit shadow-[0_4px_20px_rgba(0,0,0,0.5)]" style={{ gap: 'clamp(3px, 0.5vw, 8px)', padding: 'clamp(3px, 0.4vw, 8px) clamp(6px, 0.8vw, 16px)' }}>
            <span className="rounded-full bg-[#22C55E] animate-pulse shadow-[0_0_10px_#22C55E]" style={{ width: 'clamp(4px, 0.5vw, 8px)', height: 'clamp(4px, 0.5vw, 8px)' }}></span>
            <span className="font-jetbrains text-gray-300 uppercase tracking-widest font-semibold" style={{ fontSize: 'clamp(5px, 0.75vw, 12px)' }}>
              Market Intelligence
            </span>
          </div>

          <h1 className="font-inter font-[800] text-white tracking-tight" style={{ fontSize: 'clamp(0.85rem, 3.5vw, 72px)', lineHeight: 1.1 }}>
            What&apos;s Your Audience{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#7C3AED]">
              Worth?
            </span>
          </h1>
          
          <p className="text-gray-400 font-inter leading-relaxed" style={{ fontSize: 'clamp(0.4rem, 1.3vw, 20px)', lineHeight: 1.6 }}>
            AI-powered valuations for your social media accounts, channels, communities, and newsletters.
          </p>
          
          {/* Trust Indicators */}
          <div className="flex flex-col" style={{ gap: 'clamp(3px, 0.6vw, 12px)', marginTop: 'clamp(2px, 0.3vw, 8px)' }}>
            <div className="flex items-center" style={{ gap: 'clamp(1px, 0.15vw, 4px)' }}>
              {[...Array(5)].map((_, i) => (
                <span key={i} className="material-symbols-outlined text-yellow-400" style={{ fontSize: 'clamp(8px, 1.2vw, 20px)', fontVariationSettings: "'FILL' 1" }}>star</span>
              ))}
            </div>
            <div className="flex items-center" style={{ gap: 'clamp(4px, 0.8vw, 16px)' }}>
              <div className="flex" style={{ marginLeft: 0 }}>
                {[1,2,3,4].map(i => (
                  <div key={i} className="rounded-full border-2 border-[#020617] bg-[#07111F] overflow-hidden" style={{ width: 'clamp(16px, 2vw, 40px)', height: 'clamp(16px, 2vw, 40px)', marginLeft: i > 1 ? 'clamp(-6px, -0.6vw, -12px)' : 0 }}>
                    <img src={`https://i.pravatar.cc/100?img=${i}`} alt="User" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <p className="text-gray-400 font-inter" style={{ fontSize: 'clamp(5px, 0.85vw, 14px)', lineHeight: 1.4 }}>
                Trusted by 5,000+ creators<br />and businesses worldwide
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-row items-center" style={{ gap: 'clamp(4px, 0.8vw, 16px)', marginTop: 'clamp(4px, 1vw, 24px)' }}>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/#valuation"
                className="group bg-gradient-to-r from-[#2563EB] to-[#7C3AED] hover:from-blue-500 hover:to-purple-500 text-white font-inter rounded-[16px] transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] flex items-center justify-center border border-white/10 whitespace-nowrap"
                style={{ padding: 'clamp(4px, 0.8vw, 16px) clamp(8px, 1.2vw, 20px)', fontSize: 'clamp(5px, 1vw, 15px)', gap: 'clamp(3px, 0.5vw, 8px)', minHeight: 'unset' }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 'clamp(8px, 1.2vw, 20px)', fontVariationSettings: "'FILL' 0, 'wght' 300" }}>vital_signs</span>
                <span className="font-semibold tracking-wide">Get Free Valuation</span>
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform" style={{ fontSize: 'clamp(10px, 1.5vw, 24px)', fontVariationSettings: "'FILL' 0, 'wght' 200" }}>arrow_circle_right</span>
              </Link>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/valuation/sample"
                className="group bg-[rgba(255,255,255,0.02)] hover:bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.15)] text-gray-200 font-inter rounded-[16px] transition-all flex items-center justify-center backdrop-blur-[10px] whitespace-nowrap"
                style={{ padding: 'clamp(4px, 0.8vw, 16px) clamp(8px, 1.2vw, 20px)', fontSize: 'clamp(5px, 1vw, 15px)', gap: 'clamp(3px, 0.5vw, 8px)', minHeight: 'unset' }}
              >
                <span className="material-symbols-outlined text-gray-400 group-hover:text-gray-200 transition-colors" style={{ fontSize: 'clamp(8px, 1.2vw, 20px)', fontVariationSettings: "'FILL' 0, 'wght' 300" }}>description</span>
                <span className="font-medium tracking-wide">View Sample Report</span>
                <span className="material-symbols-outlined text-gray-500 group-hover:text-gray-300 group-hover:translate-x-1 transition-all" style={{ fontSize: 'clamp(10px, 1.5vw, 24px)', fontVariationSettings: "'FILL' 0, 'wght' 200" }}>arrow_circle_right</span>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Right Column - Diamond Floating Cards Layout (always visible) */}
        <div className="relative w-[62%] shrink-0" style={{ height: 'clamp(300px, 47vw, 600px)' }}>
          <div className="absolute inset-0 flex items-center justify-center">
            
            {/* Large Radial Glow behind cards */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#2563EB]/15 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="relative w-full max-w-[550px] h-full">
              
              {/* Ambient Blue Light Particles */}
              {particles.map((p, idx) => (
                <motion.div
                  key={`particle-${idx}`}
                  animate={{ 
                    y: [0, -30, 0],
                    opacity: [0.2, 0.8, 0.2],
                    scale: [1, 1.5, 1]
                  }}
                  transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "easeInOut" as const }}
                  className={`absolute bg-[#2563EB] rounded-full blur-[1px] ${p.size}`}
                  style={{ top: p.top, left: p.left }}
                />
              ))}

              {/* Floating Social Background Icons */}
              {bgIcons.map((item, idx) => {
                const Icon = item.Icon;
                return (
                  <motion.div
                    key={`icon-${idx}`}
                    animate={{ y: [-15, 15, -15], opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 6, repeat: Infinity, delay: item.delay, ease: "easeInOut" as const }}
                    className={`absolute ${item.color} drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]`}
                    style={{ top: item.top, left: item.left }}
                  >
                    <div className="rounded-xl bg-[#07111F]/80 backdrop-blur-md border border-[rgba(255,255,255,0.05)] flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.5)]" style={{ width: 'clamp(20px, 2.5vw, 40px)', height: 'clamp(20px, 2.5vw, 40px)' }}>
                      <Icon className="w-1/2 h-1/2" />
                    </div>
                  </motion.div>
                );
              })}

              {/* Premium Glassmorphism Cards */}
              {floatingCards.map((card, idx) => {
                const Icon = card.Icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1, y: card.floatY }}
                    transition={{ 
                      y: { duration: 5, repeat: Infinity, ease: "easeInOut" as const, delay: card.delay },
                      opacity: { duration: 0.6, delay: idx * 0.2 },
                      scale: { duration: 0.6, delay: idx * 0.2, type: "spring" }
                    }}
                    className={`absolute ${card.position} rounded-[20px] bg-[#07111F]/90 backdrop-blur-[18px] border border-[rgba(255,255,255,0.05)] shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:border-white/20 hover:shadow-[0_8px_32px_rgba(37,99,235,0.2)] transition-all duration-300 flex flex-col justify-between`}
                    style={{ width: 'clamp(110px, 20vw, 260px)', height: 'clamp(55px, 10vw, 130px)', padding: 'clamp(6px, 1.2vw, 20px)', zIndex: 40 - idx * 10 }}
                  >
                    <div className="flex items-start" style={{ gap: 'clamp(4px, 0.8vw, 16px)' }}>
                      <div className={`rounded-[14px] ${card.iconBg} flex items-center justify-center shrink-0 shadow-lg`} style={{ width: 'clamp(20px, 3vw, 48px)', height: 'clamp(20px, 3vw, 48px)' }}>
                        <Icon className="text-white" style={{ width: 'clamp(10px, 1.5vw, 24px)', height: 'clamp(10px, 1.5vw, 24px)' }} />
                      </div>
                      <div className="flex-1 min-w-0" style={{ paddingTop: 'clamp(1px, 0.15vw, 2px)' }}>
                        <div className="flex items-center" style={{ gap: 'clamp(2px, 0.3vw, 6px)' }}>
                          <h3 className="text-white font-semibold font-inter truncate tracking-tight" style={{ fontSize: 'clamp(5px, 1.1vw, 15px)' }}>{card.title}</h3>
                          <span className="material-symbols-outlined text-[#2563EB] shrink-0" style={{ fontSize: 'clamp(6px, 1vw, 14px)', fontVariationSettings: "'FILL' 1" }}>verified</span>
                        </div>
                        <p className="text-gray-400 tracking-wide" style={{ fontSize: 'clamp(4px, 0.85vw, 12px)', marginTop: 'clamp(1px, 0.1vw, 2px)' }}>{card.metric1}</p>
                        <p className="flex items-center" style={{ fontSize: 'clamp(4px, 0.85vw, 12px)', marginTop: 'clamp(2px, 0.3vw, 6px)', gap: 'clamp(2px, 0.25vw, 6px)' }}>
                          <span className="text-gray-400">{card.metric2.split(" ")[0]}</span>
                          <span className="text-[#22C55E] font-medium">{card.metric2.split(" ")[1]}</span>
                          <span className="material-symbols-outlined text-[#22C55E]" style={{ fontSize: 'clamp(5px, 0.85vw, 12px)' }}>arrow_outward</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-gray-500 uppercase tracking-widest font-jetbrains font-medium" style={{ fontSize: 'clamp(4px, 0.8vw, 11px)' }}>Est. Value</span>
                      <span className="text-[#22C55E] font-bold font-inter tracking-tight" style={{ fontSize: 'clamp(6px, 1.2vw, 17px)' }}>{card.value}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

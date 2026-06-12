"use client";

import { ValuationReport } from "@/types/valuation";

interface AssetScoreCardProps {
  report?: ValuationReport | null;
}

export function AssetScoreCard({ report }: AssetScoreCardProps) {
  if (!report || typeof report.asset_score !== "number") {
    return null;
  }

  const score = report.asset_score;
  const reportData = report.report_data || {};
  const healthLabel = reportData.assetHealth || "Average";
  const breakdown = (reportData.breakdown || {}) as Record<string, number>;
  const strengths = (reportData.strengths || []) as string[];
  const weaknesses = (reportData.weaknesses || []) as string[];

  // Color mapping based on health status
  const getHealthConfig = (label: string) => {
    const l = label.toLowerCase();
    if (l === "excellent") {
      return {
        bg: "bg-emerald-50/50 dark:bg-emerald-950/20",
        border: "border-emerald-200/60 dark:border-emerald-900/30",
        text: "text-emerald-700 dark:text-emerald-400",
        badge: "bg-emerald-500 text-white dark:bg-emerald-600",
        gradient: "from-emerald-500 to-teal-600",
        glow: "shadow-[0_0_20px_rgba(16,185,129,0.2)]",
        ringColor: "#10b981",
        ringBg: "#e2e8f0",
      };
    }
    if (l === "strong") {
      return {
        bg: "bg-teal-50/50 dark:bg-teal-950/20",
        border: "border-teal-200/60 dark:border-teal-900/30",
        text: "text-teal-700 dark:text-teal-400",
        badge: "bg-teal-500 text-white dark:bg-teal-600",
        gradient: "from-teal-400 to-cyan-500",
        glow: "shadow-[0_0_20px_rgba(20,184,166,0.15)]",
        ringColor: "#14b8a6",
        ringBg: "#e2e8f0",
      };
    }
    if (l === "average") {
      return {
        bg: "bg-amber-50/50 dark:bg-amber-950/20",
        border: "border-amber-200/60 dark:border-amber-900/30",
        text: "text-amber-700 dark:text-amber-400",
        badge: "bg-amber-500 text-white dark:bg-amber-600",
        gradient: "from-amber-400 to-orange-500",
        glow: "shadow-[0_0_20px_rgba(245,158,11,0.15)]",
        ringColor: "#f59e0b",
        ringBg: "#e2e8f0",
      };
    }
    if (l === "weak") {
      return {
        bg: "bg-orange-50/50 dark:bg-orange-950/20",
        border: "border-orange-200/60 dark:border-orange-900/30",
        text: "text-orange-700 dark:text-orange-400",
        badge: "bg-orange-500 text-white dark:bg-orange-600",
        gradient: "from-orange-400 to-red-500",
        glow: "shadow-[0_0_20px_rgba(249,115,22,0.15)]",
        ringColor: "#f97316",
        ringBg: "#e2e8f0",
      };
    }
    // Poor
    return {
      bg: "bg-red-50/50 dark:bg-red-950/20",
      border: "border-red-200/60 dark:border-red-900/30",
      text: "text-red-700 dark:text-red-400",
      badge: "bg-red-500 text-white dark:bg-red-600",
      gradient: "from-red-400 to-rose-600",
      glow: "shadow-[0_0_20px_rgba(239,68,68,0.15)]",
      ringColor: "#ef4444",
      ringBg: "#e2e8f0",
    };
  };

  const health = getHealthConfig(healthLabel);

  // Map database keys to user-friendly UI labels
  const formatMetricKey = (key: string): string => {
    const keyMap: Record<string, string> = {
      followers: "Audience Size",
      engagement: "Engagement Rate",
      niche: "Niche Monetizability",
      audience: "Audience Geography",
      growth: "Growth Velocity",
      revenue: "Monthly Revenue",
      traffic: "Traffic Volume",
      domain_strength: "Domain Authority (DA)",
      seo_strength: "SEO Search Strength",
      social_proof: "Social Proof & Brand Presence",
      brandability: "Domain Brandability",
      keyword_quality: "Search Keyword Quality",
      extension: "TLD Extension Grade",
      length: "Character Length",
      demand: "Market Auction Demand",
      members: "Community Member Count",
      activity: "Active Member Participation",
    };

    if (keyMap[key]) return keyMap[key];

    // Fallback: replace underscores with spaces and capitalize
    return key
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Circular progress calculation
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className={`p-6 md:p-8 rounded-3xl border transition-all duration-300 ${health.bg} ${health.border} ${health.glow} space-y-6 animate-in fade-in duration-500`}>
      {/* Header section with Score & Health Label */}
      <div className="flex flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <span className="text-xs uppercase font-bold tracking-widest text-on-surface-variant" style={{ color: "#434656" }}>
            Asset Quality Assessment
          </span>
          <h4 className="font-headline-md text-xl md:text-2xl text-on-surface font-bold" style={{ fontFamily: "var(--font-hanken)" }}>
            Asset Quality Score: <span className={health.text}>{score}/100</span>
          </h4>
          <p className="text-xs text-on-surface-variant leading-relaxed max-w-sm" style={{ color: "#434656" }}>
            A unified valuation rating measuring traffic health, monetization velocity, niche demand, and audience verification.
          </p>
        </div>

        {/* Circular Progress Gauge */}
        <div className="relative flex items-center justify-center w-32 h-32 select-none">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r={radius}
              className="text-slate-200/70 dark:text-slate-800/40"
              strokeWidth="10"
              stroke="currentColor"
              fill="transparent"
            />
            <circle
              cx="64"
              cy="64"
              r={radius}
              strokeWidth="10"
              stroke={health.ringColor}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="text-3xl font-extrabold text-on-surface tracking-tight" style={{ fontFamily: "var(--font-hanken)" }}>
              {score}
            </span>
            <span className={`text-[10px] font-bold px-2 py-0.5 mt-0.5 rounded-full uppercase tracking-wider ${health.badge}`}>
              {healthLabel}
            </span>
          </div>
        </div>
      </div>

      {/* Progress Bars for Individual Factors */}
      <div className="bg-white/80 dark:bg-slate-900/60 p-5 md:p-6 rounded-2xl border border-outline-variant/10 space-y-4 shadow-sm">
        <h5 className="font-headline-sm text-xs font-bold text-on-surface uppercase tracking-wider" style={{ fontFamily: "var(--font-hanken)" }}>
          Metric Breakdown & Ratings
        </h5>
        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
          {Object.entries(breakdown).map(([factor, val]) => (
            <div key={factor} className="space-y-1.5">
              <div className="flex justify-between items-center text-xs font-medium text-on-surface-variant" style={{ color: "#434656" }}>
                <span>{formatMetricKey(factor)}</span>
                <span className="font-semibold text-on-surface font-mono">{val}/100</span>
              </div>
              <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${health.gradient} rounded-full transition-all duration-1000 ease-out`}
                  style={{ width: `${val}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strengths & Weaknesses Checklist */}
      <div className="grid grid-cols-2 gap-6">
        {/* Strengths Card */}
        {strengths.length > 0 && (
          <div className="bg-emerald-50/20 dark:bg-emerald-950/5 p-5 rounded-2xl border border-emerald-500/10 space-y-3">
            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-semibold text-sm">
              <span className="material-symbols-outlined text-[18px]">verified</span>
              <span style={{ fontFamily: "var(--font-hanken)" }}>Key Strengths</span>
            </div>
            <ul className="space-y-2 text-xs text-on-surface-variant" style={{ color: "#434656" }}>
              {strengths.map((s, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[14px] text-emerald-600 dark:text-emerald-400 mt-0.5">check_circle</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Weaknesses Card */}
        {weaknesses.length > 0 && (
          <div className="bg-red-50/20 dark:bg-red-950/5 p-5 rounded-2xl border border-red-500/10 space-y-3">
            <div className="flex items-center gap-2 text-red-700 dark:text-red-400 font-semibold text-sm">
              <span className="material-symbols-outlined text-[18px]">gpp_maybe</span>
              <span style={{ fontFamily: "var(--font-hanken)" }}>Areas of Risk</span>
            </div>
            <ul className="space-y-2 text-xs text-on-surface-variant" style={{ color: "#434656" }}>
              {weaknesses.map((w, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[14px] text-red-500 dark:text-red-400 mt-0.5">error</span>
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

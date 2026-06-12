"use client";

interface ValuationExplainabilityProps {
  explainabilityList?: string[];
}

export function ValuationExplainability({ explainabilityList }: ValuationExplainabilityProps) {
  if (!explainabilityList || explainabilityList.length === 0) {
    return null;
  }

  return (
    <div className="bg-white/80 dark:bg-slate-900/60 p-5 md:p-6 rounded-3xl border border-outline-variant/20 space-y-4 shadow-sm animate-in fade-in duration-500">
      <div className="flex items-center gap-2 text-primary font-bold text-sm">
        <span className="material-symbols-outlined text-[20px]" style={{ color: "#003fd8" }}>info</span>
        <span className="font-headline-sm uppercase tracking-wider text-xs" style={{ fontFamily: "var(--font-hanken)" }}>
          Valuation Breakdown & Explainability
        </span>
      </div>
      
      <div className="space-y-3">
        {explainabilityList.map((sentence, index) => {
          // Check if it's a positive/strength factor or a warning/caution factor
          const isCaution = sentence.toLowerCase().includes("self-reported") || 
                            sentence.toLowerCase().includes("zero or undisclosed") || 
                            sentence.toLowerCase().includes("risk") ||
                            sentence.toLowerCase().includes("dampens");

          return (
            <div key={index} className="flex items-start gap-3 text-xs leading-relaxed text-on-surface-variant" style={{ color: "#434656" }}>
              <span className={`material-symbols-outlined text-[16px] mt-0.5 shrink-0 ${
                isCaution ? "text-amber-500" : "text-emerald-500"
              }`}>
                {isCaution ? "warning" : "verified_user"}
              </span>
              <span>{sentence}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

"use client";

interface ReportCoverPageProps {
  assetTitle: string;
  assetType: string;
  platform: string;
  url: string;
  date: string;
  ownerEmail: string;
}

export function ReportCoverPage({
  assetTitle,
  assetType,
  platform,
  url,
  date,
  ownerEmail,
}: ReportCoverPageProps) {
  return (
    <div className="w-full min-h-[297mm] flex flex-col justify-between p-16 bg-[#fbf8ff] border border-outline-variant/30 rounded-3xl relative overflow-hidden shadow-sm select-none">
      {/* Decorative Brand Gradients */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/5 rounded-full blur-[100px]" />

      {/* Header Logo */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[32px] font-bold" style={{ color: "#003fd8" }}>
            monitoring
          </span>
          <span className="text-xl font-bold tracking-tight text-on-surface" style={{ fontFamily: "var(--font-hanken)" }}>
            Axcrivo
          </span>
        </div>
        <div className="bg-primary-fixed text-on-primary-fixed-variant text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded">
          Certified Valuation
        </div>
      </div>

      {/* Body Content */}
      <div className="my-auto space-y-8 max-w-xl">
        <div className="space-y-4">
          <span className="text-xs uppercase font-extrabold tracking-widest text-primary font-mono" style={{ color: "#003fd8" }}>
            Official Asset Appraisal
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-on-surface tracking-tight leading-tight" style={{ fontFamily: "var(--font-hanken)" }}>
            Creator Asset Valuation Report
          </h1>
          <p className="text-sm text-on-surface-variant leading-relaxed" style={{ color: "#434656" }}>
            A structured analysis detailing transaction quality metrics, active audience engagement indicators, and marketplace resale pricing multiples.
          </p>
        </div>

        {/* Asset Specifications Block */}
        <div className="bg-white border border-outline-variant/10 rounded-2xl p-6 space-y-4 shadow-sm">
          <h3 className="font-headline-sm text-xs font-bold text-on-surface uppercase tracking-wider border-b border-outline-variant/10 pb-2" style={{ fontFamily: "var(--font-hanken)" }}>
            Report Metadata
          </h3>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-on-surface-variant block uppercase tracking-wider text-[9px] mb-0.5" style={{ color: "#434656" }}>Asset Title</span>
              <span className="font-semibold text-on-surface line-clamp-1">{assetTitle}</span>
            </div>
            <div>
              <span className="text-on-surface-variant block uppercase tracking-wider text-[9px] mb-0.5" style={{ color: "#434656" }}>Platform / Type</span>
              <span className="font-semibold text-on-surface capitalize">{platform} ({assetType})</span>
            </div>
            <div className="col-span-2">
              <span className="text-on-surface-variant block uppercase tracking-wider text-[9px] mb-0.5" style={{ color: "#434656" }}>Asset Reference Link</span>
              <span className="font-semibold text-primary break-all" style={{ color: "#003fd8" }}>{url}</span>
            </div>
            <div>
              <span className="text-on-surface-variant block uppercase tracking-wider text-[9px] mb-0.5" style={{ color: "#434656" }}>Owner Session</span>
              <span className="font-semibold text-on-surface">{ownerEmail}</span>
            </div>
            <div>
              <span className="text-on-surface-variant block uppercase tracking-wider text-[9px] mb-0.5" style={{ color: "#434656" }}>Assessment Date</span>
              <span className="font-semibold text-on-surface">{new Date(date).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Branding & Disclaimer */}
      <div className="border-t border-outline-variant/10 pt-6 space-y-4">
        <div className="flex justify-between items-center text-[10px] text-on-surface-variant" style={{ color: "#434656" }}>
          <span>© {new Date().getFullYear()} Axcrivo Marketplace. All rights reserved.</span>
          <span className="font-mono">Ref ID: {Math.random().toString(36).substring(3, 9).toUpperCase()}</span>
        </div>
        <p className="text-[9px] leading-relaxed text-on-surface-variant/70 border border-outline-variant/10 rounded-xl p-4 bg-slate-50" style={{ color: "#434656" }}>
          <strong>Legal Disclaimer:</strong> This valuation report is generated dynamically by the Axcrivo Valuation Engine using self-reported seller metrics and verified OCR screenshot proofs. The estimates represent simulated marketplace multiples and do not constitute formal financial appraisal, guarantee of sale, or transaction commitments. Actual transaction value is subject to diligence and final agreement.
        </p>
      </div>
    </div>
  );
}

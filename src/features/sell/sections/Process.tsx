import { SectionWrapper } from "@/components/layout/SectionWrapper";
import Link from "next/link";

const processes = [
  {
    step: "01",
    title: "Seller Verification",
    subtitle: "Confirming Asset Ownership",
    desc: "We verify asset ownership through meta-data checks, analytics page verification, and KYC auditing. This ensures all listings on our marketplace are 100% legitimate and prevents domain hijacking."
  },
  {
    step: "02",
    title: "Asset Valuation",
    subtitle: "Data-Backed Price Appraisals",
    desc: "Using our proprietary valuation models, we evaluate the asset's trailing financials, engagement metrics, audience quality, and niche multiples to establish a fair and competitive asking price."
  },
  {
    step: "03",
    title: "Due Diligence Framework",
    subtitle: "Auditing Operational Integrity",
    desc: "Our financial and operational M&A advisors conduct trailing-twelve-month profit validation, organic follower growth audit (to weed out bots), and compliance checks before introducing buyers."
  },
  {
    step: "04",
    title: "Confidentiality & Secure Transfer",
    subtitle: "Escrow-Backed Migrations",
    desc: "We keep all negotiations confidential. Once a deal is struck, Axcrivo Escrow holds funds securely while our technical advisors migrate the channels, domains, and assets safely."
  }
];

export function Process() {
  return (
    <SectionWrapper id="sell-process" className="py-12 md:py-20" background="default">
      <div className="max-w-[1280px] mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="font-headline-xl text-3xl text-on-surface">The Axcrivo Seller Journey</h2>
          <p className="font-body-lg text-on-surface-variant text-base md:text-lg">
            We guide you step-by-step from initial submission to final payout, ensuring complete security and structural integrity.
          </p>
        </div>

        {/* Process Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {processes.map((p, idx) => (
            <div 
              key={idx} 
              className="bg-surface-container-lowest border border-outline-variant/30 p-8 rounded-2xl flex gap-6 hover:border-primary/40 hover:shadow-md transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-4 right-4 font-label-md font-bold text-4xl text-outline-variant/20 select-none">
                {p.step}
              </div>
              <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-primary text-2xl">
                  {idx === 0 ? "verified" : idx === 1 ? "analytics" : idx === 2 ? "fact_check" : "security"}
                </span>
              </div>
              <div className="space-y-2">
                <span className="font-label-sm text-xs text-primary uppercase tracking-widest block font-bold">
                  {p.subtitle}
                </span>
                <h3 className="font-headline-sm text-xl text-on-surface font-semibold">
                  {p.title}
                </h3>
                <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic CTA Banner */}
        <div className="bg-surface-container p-6 md:p-8 rounded-3xl border border-outline-variant/30 text-center max-w-4xl mx-auto space-y-4">
          <h3 className="font-headline-sm text-lg md:text-xl text-on-surface font-semibold">
            Not sure what asking price to command?
          </h3>
          <p className="font-body-md text-xs md:text-sm text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            Get an instant baseline valuation using our calculator, or read our extensive documentation on how multiples are computed.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link 
              href="/valuation" 
              className="bg-primary text-on-primary px-6 py-3 rounded-xl font-label-md text-xs uppercase tracking-wider font-bold"
            >
              Get Free Valuation
            </Link>
            <Link 
              href="/valuation-methodology" 
              className="bg-transparent border border-primary/20 text-primary px-6 py-3 rounded-xl font-label-md text-xs uppercase tracking-wider font-bold hover:bg-primary/5"
            >
              Methodology Guide
            </Link>
          </div>
        </div>

      </div>
    </SectionWrapper>
  );
}

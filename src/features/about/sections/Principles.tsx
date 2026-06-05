import { SectionWrapper } from "@/components/layout/SectionWrapper";

export function Principles() {
  return (
    <SectionWrapper id="principles" className="py-6 md:py-12">
      {/* Marketplace Principles (Bento Grid) */}
      <section className="py-8 md:py-16 px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto w-full">
        <div className="text-center mb-8 md:mb-16 space-y-2 md:space-y-4">
          <h2 className="font-headline-md text-headline-md text-on-surface">Marketplace Principles</h2>
          <p className="font-body-md text-body-md text-on-surface-variant text-sm md:text-base">The core tenets that govern our platform architecture and operations.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Principle 1 */}
          <div className="bg-surface-container-low rounded-xl p-4 md:p-8 space-y-3 md:space-y-4 border border-outline-variant hover:border-primary transition-colors">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary-fixed flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-[20px] md:text-[24px]">visibility</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface text-base md:text-xl">Transparency</h3>
            <p className="font-body-md text-body-md text-on-surface-variant text-xs md:text-sm">
              Absolute clarity in valuation models, historical performance data, and fee structures. No hidden variables.
            </p>
          </div>
          {/* Principle 2 */}
          <div className="bg-surface-container-low rounded-xl p-4 md:p-8 space-y-3 md:space-y-4 border border-outline-variant hover:border-primary transition-colors">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary-fixed flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-[20px] md:text-[24px]">verified</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface text-base md:text-xl">Verification</h3>
            <p className="font-body-md text-body-md text-on-surface-variant text-xs md:text-sm">
              Rigorous, multi-layered auditing of all listed assets, ensuring ownership provenance and revenue authenticity.
            </p>
          </div>
          {/* Principle 3 */}
          <div className="bg-surface-container-low rounded-xl p-4 md:p-8 space-y-3 md:space-y-4 border border-outline-variant hover:border-primary transition-colors">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary-fixed flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-[20px] md:text-[24px]">security</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface text-base md:text-xl">Trust</h3>
            <p className="font-body-md text-body-md text-on-surface-variant text-xs md:text-sm">
              Escrow-backed transactions and legally binding transfer frameworks designed to protect both institutional buyers and creators.
            </p>
          </div>
          {/* Principle 4 */}
          <div className="bg-surface-container-low rounded-xl p-4 md:p-8 space-y-3 md:space-y-4 border border-outline-variant hover:border-primary transition-colors">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary-fixed flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-[20px] md:text-[24px]">insights</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface text-base md:text-xl">Market Intelligence</h3>
            <p className="font-body-md text-body-md text-on-surface-variant text-xs md:text-sm">
              Providing actionable, real-time analytics and predictive modeling to empower informed investment decisions.
            </p>
          </div>
        </div>
      </section>
    </SectionWrapper>
  );
}

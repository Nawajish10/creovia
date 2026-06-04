import { SectionWrapper } from "@/components/layout/SectionWrapper";

export function Principles() {
  return (
    <SectionWrapper id="principles" className="py-12">
      {/* Marketplace Principles (Bento Grid) */}
      <section className="py-16 px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto w-full">
        <div className="text-center mb-16 space-y-4">
          <h2 className="font-headline-md text-headline-md text-on-surface">Marketplace Principles</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">The core tenets that govern our platform architecture and operations.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
          {/* Principle 1 */}
          <div className="bg-surface-container-low rounded-xl p-8 space-y-4 border border-outline-variant hover:border-primary transition-colors">
            <div className="w-12 h-12 rounded-lg bg-primary-fixed flex items-center justify-center">
              <span className="material-symbols-outlined text-primary">visibility</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface">Transparency</h3>
            <p className="font-body-md text-body-md text-on-surface-variant text-sm">
              Absolute clarity in valuation models, historical performance data, and fee structures. No hidden variables.
            </p>
          </div>
          {/* Principle 2 */}
          <div className="bg-surface-container-low rounded-xl p-8 space-y-4 border border-outline-variant hover:border-primary transition-colors">
            <div className="w-12 h-12 rounded-lg bg-primary-fixed flex items-center justify-center">
              <span className="material-symbols-outlined text-primary">verified</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface">Verification</h3>
            <p className="font-body-md text-body-md text-on-surface-variant text-sm">
              Rigorous, multi-layered auditing of all listed assets, ensuring ownership provenance and revenue authenticity.
            </p>
          </div>
          {/* Principle 3 */}
          <div className="bg-surface-container-low rounded-xl p-8 space-y-4 border border-outline-variant hover:border-primary transition-colors">
            <div className="w-12 h-12 rounded-lg bg-primary-fixed flex items-center justify-center">
              <span className="material-symbols-outlined text-primary">security</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface">Trust</h3>
            <p className="font-body-md text-body-md text-on-surface-variant text-sm">
              Escrow-backed transactions and legally binding transfer frameworks designed to protect both institutional buyers and creators.
            </p>
          </div>
          {/* Principle 4 */}
          <div className="bg-surface-container-low rounded-xl p-8 space-y-4 border border-outline-variant hover:border-primary transition-colors">
            <div className="w-12 h-12 rounded-lg bg-primary-fixed flex items-center justify-center">
              <span className="material-symbols-outlined text-primary">insights</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface">Market Intelligence</h3>
            <p className="font-body-md text-body-md text-on-surface-variant text-sm">
              Providing actionable, real-time analytics and predictive modeling to empower informed investment decisions.
            </p>
          </div>
        </div>
      </section>
    </SectionWrapper>
  );
}

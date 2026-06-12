import { SectionWrapper } from "@/components/layout/SectionWrapper";

export function FAQ() {
  return (
    <SectionWrapper id="faq" className="py-12">
      <section className="space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="font-headline-xl text-on-surface">How Valuation Works</h2>
          <p className="font-body-lg text-on-surface-variant">Our proprietary algorithm evaluates four core pillars to determine the institutional value of a Social Pages & Digital Assets.</p>
        </div>
        <div className="grid grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-surface-container-lowest p-6 rounded-xl space-y-4 border border-outline-variant/20 hover:border-primary/30 transition-colors group">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <span className="material-symbols-outlined text-primary">groups</span>
            </div>
            <h3 className="font-headline-sm text-on-surface text-xl">Audience Size</h3>
            <p className="font-body-md text-on-surface-variant text-sm">Total reach across platforms, weighted by platform monetization potential.</p>
          </div>
          {/* Card 2 */}
          <div className="bg-surface-container-lowest p-6 rounded-xl space-y-4 border border-outline-variant/20 hover:border-secondary/30 transition-colors group">
            <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
              <span className="material-symbols-outlined text-secondary">vital_signs</span>
            </div>
            <h3 className="font-headline-sm text-on-surface text-xl">Engagement</h3>
            <p className="font-body-md text-on-surface-variant text-sm">Active interaction rates relative to benchmarks. High engagement multipliers apply.</p>
          </div>
          {/* Card 3 */}
          <div className="bg-surface-container-lowest p-6 rounded-xl space-y-4 border border-outline-variant/20 hover:border-tertiary/30 transition-colors group">
            <div className="w-12 h-12 rounded-lg bg-tertiary-container/10 flex items-center justify-center group-hover:bg-tertiary-container/20 transition-colors">
              <span className="material-symbols-outlined text-tertiary">category</span>
            </div>
            <h3 className="font-headline-sm text-on-surface text-xl">Niche &amp; Category</h3>
            <p className="font-body-md text-on-surface-variant text-sm">Fintech and B2B SaaS command higher multiples than general entertainment.</p>
          </div>
          {/* Card 4 */}
          <div className="bg-surface-container-lowest p-6 rounded-xl space-y-4 border border-outline-variant/20 hover:border-primary/30 transition-colors group">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <span className="material-symbols-outlined text-primary">monitoring</span>
            </div>
            <h3 className="font-headline-sm text-on-surface text-xl">Historical Revenue</h3>
            <p className="font-body-md text-on-surface-variant text-sm">Trailing 12-month provable cash flow from all monetization channels.</p>
          </div>
        </div>
      </section>
    </SectionWrapper>
  );
}

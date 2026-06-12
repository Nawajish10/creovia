export function HowWorks() {
  return (
    <section className="space-y-10 pt-8">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h2 className="font-headline-xl text-on-surface">How Valuation Works</h2>
        <p className="font-body-lg text-on-surface-variant">
          Our proprietary algorithm evaluates four core pillars to determine the institutional value of a Social Pages & Digital Assets.
        </p>
      </div>
      <div className="grid grid-cols-4 gap-6">
        {/* Card 1 */}
        <div className="bg-surface-container-lowest/80 backdrop-blur-sm p-8 rounded-xl space-y-4 border border-white/5 hover:border-primary/30 transition-all group hover:shadow-xl hover:-translate-y-1">
          <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <span className="material-symbols-outlined text-primary text-3xl">groups</span>
          </div>
          <h3 className="font-headline-sm text-on-surface text-xl">Audience Size</h3>
          <p className="font-body-md text-on-surface-variant text-sm leading-relaxed">
            Total reach across platforms, weighted by platform monetization potential.
          </p>
        </div>
        {/* Card 2 */}
        <div className="bg-surface-container-lowest/80 backdrop-blur-sm p-8 rounded-xl space-y-4 border border-white/5 hover:border-secondary/30 transition-all group hover:shadow-xl hover:-translate-y-1">
          <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
            <span className="material-symbols-outlined text-secondary text-3xl">vital_signs</span>
          </div>
          <h3 className="font-headline-sm text-on-surface text-xl">Engagement</h3>
          <p className="font-body-md text-on-surface-variant text-sm leading-relaxed">
            Active interaction rates relative to benchmarks. High engagement multipliers apply.
          </p>
        </div>
        {/* Card 3 */}
        <div className="bg-surface-container-lowest/80 backdrop-blur-sm p-8 rounded-xl space-y-4 border border-white/5 hover:border-tertiary/30 transition-all group hover:shadow-xl hover:-translate-y-1">
          <div className="w-14 h-14 rounded-xl bg-tertiary-container/10 flex items-center justify-center group-hover:bg-tertiary-container/20 transition-colors">
            <span className="material-symbols-outlined text-tertiary text-3xl">category</span>
          </div>
          <h3 className="font-headline-sm text-on-surface text-xl">Niche & Category</h3>
          <p className="font-body-md text-on-surface-variant text-sm leading-relaxed">
            Fintech and B2B SaaS command higher multiples than general entertainment.
          </p>
        </div>
        {/* Card 4 */}
        <div className="bg-surface-container-lowest/80 backdrop-blur-sm p-8 rounded-xl space-y-4 border border-white/5 hover:border-primary/30 transition-all group hover:shadow-xl hover:-translate-y-1">
          <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <span className="material-symbols-outlined text-primary text-3xl">monitoring</span>
          </div>
          <h3 className="font-headline-sm text-on-surface text-xl">Historical Revenue</h3>
          <p className="font-body-md text-on-surface-variant text-sm leading-relaxed">
            Trailing 12-month provable cash flow from all monetization channels.
          </p>
        </div>
      </div>
    </section>
  );
}

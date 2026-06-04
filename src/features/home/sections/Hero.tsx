import Link from "next/link";

export function Hero() {
  return (
    <section className="relative pt-24 pb-32 px-margin-mobile md:px-margin-desktop overflow-hidden bg-white">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-container/5 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        <div className="flex flex-col gap-6">
          <h1 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-text-primary leading-tight">
            Buy & Sell Creator Assets With <span className="text-primary">Confidence</span>
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl leading-relaxed">
            Acquire or sell Instagram pages, YouTube channels, Telegram communities, and digital audiences through a trusted, data-driven marketplace designed for professionals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Link
              href="/valuation"
              className="bg-primary text-white font-body-md text-body-md px-8 py-4 rounded-xl hover:opacity-95 transition-all glow-effect text-center font-medium shadow-lg shadow-primary/20 active:scale-98"
            >
              Get Valuation
            </Link>
            <Link
              href="/buy"
              className="glass-panel text-text-primary font-body-md text-body-md px-8 py-4 rounded-xl hover:bg-surface-container-high transition-all text-center font-medium flex items-center justify-center gap-2 active:scale-98"
            >
              Browse Opportunities
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
        </div>

        {/* Hero Visual Mockup */}
        <div className="glass-panel rounded-2xl p-6 relative glow-effect border-border-subtle bg-white/40 shadow-xl">
          {/* Faux Browser Header */}
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border-subtle">
            <div className="w-3 h-3 rounded-full bg-surface-container-highest"></div>
            <div className="w-3 h-3 rounded-full bg-surface-container-highest"></div>
            <div className="w-3 h-3 rounded-full bg-surface-container-highest"></div>
            <div className="mx-auto text-on-surface-variant font-label-sm text-label-sm">Asset Valuation Dashboard</div>
          </div>
          <div className="space-y-6">
            <div className="flex justify-between items-end">
              <div>
                <div className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Est. Asset Value</div>
                <div className="font-headline-xl text-headline-xl text-primary">$125,000</div>
              </div>
              <div className="bg-surface-container-high px-3 py-1 rounded-full flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-neon-green-accent animate-pulse"></div>
                <span className="font-label-sm text-label-sm text-text-primary">High Demand</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/60 p-4 rounded-xl border border-border-subtle">
                <div className="flex items-center gap-2 mb-2 text-on-surface-variant">
                  <span className="material-symbols-outlined text-sm">groups</span>
                  <span className="font-label-sm text-label-sm">Audience Quality</span>
                </div>
                <div className="font-headline-lg text-2xl text-text-primary">94/100</div>
                <div className="w-full h-1 bg-surface-container-highest mt-2 rounded-full overflow-hidden">
                  <div className="h-full w-[94%] bg-gradient-to-r from-primary to-neon-green-accent"></div>
                </div>
              </div>
              <div className="bg-white/60 p-4 rounded-xl border border-border-subtle">
                <div className="flex items-center gap-2 mb-2 text-on-surface-variant">
                  <span className="material-symbols-outlined text-sm">monitoring</span>
                  <span className="font-label-sm text-label-sm">Engagement Rate</span>
                </div>
                <div className="font-headline-lg text-2xl text-text-primary">12.4%</div>
                <div className="w-full h-1 bg-surface-container-highest mt-2 rounded-full overflow-hidden">
                  <div className="h-full w-[75%] bg-gradient-to-r from-primary to-neon-green-accent"></div>
                </div>
              </div>
            </div>
            {/* Mini Chart Area */}
            <div className="h-24 w-full border-b border-l border-border-subtle relative mt-4">
              <svg className="absolute bottom-0 left-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                <path d="M0,90 Q20,80 40,50 T80,30 T100,10" fill="none" stroke="#2d5af7" strokeWidth="2"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

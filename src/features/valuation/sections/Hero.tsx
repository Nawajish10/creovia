export function Hero() {
  return (
    <section className="text-center max-w-3xl mx-auto space-y-4">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-secondary/20 bg-secondary-container/20 mb-2">
        <span className="w-2 h-2 rounded-full bg-secondary pulse-dot"></span>
        <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">Market Intelligence</span>
      </div>
      <h1 className="font-display-lg-mobile md:font-display-lg text-on-surface tracking-tight leading-tight">
        Get a Professional <span className="text-primary">Creator Asset Valuation</span>
      </h1>
      <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
        Understand the true value of your Instagram page, YouTube channel, Telegram community, or newsletter.
      </p>
    </section>
  );
}

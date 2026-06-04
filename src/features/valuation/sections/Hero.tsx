export function Hero() {
  return (
    <section className="text-center max-w-3xl mx-auto space-y-4">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-secondary/20 bg-secondary-container/20 mb-2">
        <span className="w-2 h-2 rounded-full bg-secondary pulse-dot"></span>
        <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">Market Intelligence</span>
      </div>
      <h1 className="font-display-lg-mobile md:font-display-lg text-on-surface tracking-tight">
        Get Your Creator Asset <span className="text-primary">Valuation</span>
      </h1>
      <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto">
        Leverage institutional-grade data models to understand the true market value of your digital presence. Enter your metrics below to generate a real-time estimate.
      </p>
    </section>
  );
}

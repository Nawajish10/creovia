import { SectionWrapper } from "@/components/layout/SectionWrapper";

export function Hero() {
  return (
    <SectionWrapper id="hero" className="py-12">
      <section className="pt-16 pb-8 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-center relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-fixed-dim/30 via-background to-background -z-10 pointer-events-none"></div>
        <h1 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-on-background mb-6">India's Creator Asset Resources</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-12">Expert insights, valuation methodologies, and definitive guides for navigating the Indian digital asset economy.</p>
        {/* Resource Categories */}
        <div className="flex flex-wrap justify-center gap-3">
          <button className="px-6 py-2 rounded-full border border-primary bg-primary text-on-primary font-label-md text-label-md transition-all cursor-pointer shadow-sm">All Resources</button>
          <button className="px-6 py-2 rounded-full border border-outline-variant bg-surface-container-low text-on-surface-variant font-label-md text-label-md hover:text-primary hover:border-primary transition-colors cursor-pointer">Valuation Guides</button>
          <button className="px-6 py-2 rounded-full border border-outline-variant bg-surface-container-low text-on-surface-variant font-label-md text-label-md hover:text-primary hover:border-primary transition-colors cursor-pointer">Buying Guides</button>
          <button className="px-6 py-2 rounded-full border border-outline-variant bg-surface-container-low text-on-surface-variant font-label-md text-label-md hover:text-primary hover:border-primary transition-colors cursor-pointer">Selling Guides</button>
          <button className="px-6 py-2 rounded-full border border-outline-variant bg-surface-container-low text-on-surface-variant font-label-md text-label-md hover:text-primary hover:border-primary transition-colors cursor-pointer">Insights</button>
          <button className="px-6 py-2 rounded-full border border-outline-variant bg-surface-container-low text-on-surface-variant font-label-md text-label-md hover:text-primary hover:border-primary transition-colors cursor-pointer">News</button>
        </div>
      </section>
    </SectionWrapper>
  );
}

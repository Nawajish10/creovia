import { SectionWrapper } from "@/components/layout/SectionWrapper";

export function Hero() {
  return (
    <SectionWrapper id="hero" className="py-12">
      <section className="pt-16 pb-8 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-center relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-fixed-dim/30 via-background to-background -z-10 pointer-events-none"></div>
        <h1 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-on-background mb-6">India's Creator Asset Resources</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-12">Expert insights, valuation methodologies, and definitive guides for navigating the Indian digital asset economy.</p>
      </section>
    </SectionWrapper>
  );
}

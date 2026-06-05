import { SectionWrapper } from "@/components/layout/SectionWrapper";

export function Hero() {
  return (
    <SectionWrapper id="hero" className="py-4 md:py-12">
      <section className="pt-6 md:pt-16 pb-4 md:pb-8 px-5 md:px-margin-desktop max-w-container-max mx-auto text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-fixed-dim/30 via-background to-background -z-10 pointer-events-none"></div>
        <h1
          className="font-display-lg-mobile text-on-background mb-3 md:mb-6 break-words hyphens-auto"
          style={{ fontSize: "clamp(24px, 6vw, 48px)", lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: 700 }}
        >
          India's Social Pages & Digital Assets Resources
        </h1>
        <p
          className="text-on-surface-variant max-w-2xl mx-auto mb-6 md:mb-12"
          style={{ fontSize: "clamp(14px, 3.5vw, 18px)", lineHeight: "1.6" }}
        >
          Expert insights, valuation methodologies, and definitive guides for navigating the Indian digital asset economy.
        </p>
      </section>
    </SectionWrapper>
  );
}



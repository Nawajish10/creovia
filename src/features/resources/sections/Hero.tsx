import { SectionWrapper } from "@/components/layout/SectionWrapper";

export function Hero() {
  return (
    <SectionWrapper id="hero" className="py-6 md:py-12 overflow-hidden">
      <div className="text-center relative w-full">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-fixed-dim/30 via-background to-background -z-10 pointer-events-none"></div>
        <h1
          className="text-on-background mb-3 md:mb-5 w-full"
          style={{
            fontFamily: "var(--font-hanken)",
            fontSize: "clamp(22px, 5.5vw, 48px)",
            lineHeight: "1.2",
            letterSpacing: "-0.02em",
            fontWeight: 700,
            wordBreak: "break-word",
            overflowWrap: "anywhere",
          }}
        >
          India&apos;s Social Pages &amp; Digital Assets Resources
        </h1>
        <p
          className="text-on-surface-variant max-w-2xl mx-auto mb-6 md:mb-10"
          style={{ fontSize: "clamp(14px, 3.5vw, 18px)", lineHeight: "1.6" }}
        >
          Expert insights, valuation methodologies, and definitive guides for navigating the Indian digital asset economy.
        </p>
      </div>
    </SectionWrapper>
  );
}




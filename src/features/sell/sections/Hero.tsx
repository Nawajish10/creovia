import { SectionWrapper } from "@/components/layout/SectionWrapper";
import Link from "next/link";
import Image from "next/image";

export function Hero() {
  return (
    <SectionWrapper id="hero" className="py-24 relative overflow-hidden">
      {/* Premium Background Image */}
      <div className="absolute inset-0 z-0">
        <Image src="/images/premium_bg.png" alt="Premium Background" fill className="object-cover opacity-60 mix-blend-overlay" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-surface/30 via-surface/80 to-surface"></div>
      </div>

      <section className="relative pt-12 md:pt-16 pb-8 px-margin-mobile md:px-margin-desktop max-w-[1280px] mx-auto text-center z-10">
        {/* Decorative Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
        <h2 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-on-surface mb-6 relative z-10 font-black tracking-tight drop-shadow-sm">
          Sell Your Social Pages & Digital Assets in India
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-12 relative z-10 leading-relaxed text-lg">
          Connect directly with India's largest buyers, D2C brands, and media groups. Sell your digital property with the best valuation and secure escrow.
        </p>
        <Link href="#submit-form" className="inline-flex items-center justify-center font-label-md text-label-md uppercase tracking-widest bg-gradient-to-r from-primary to-primary/80 text-on-primary px-10 py-4 rounded-xl shadow-lg hover:shadow-[0_0_20px_rgba(var(--color-primary-rgb),0.4)] hover:-translate-y-0.5 transition-all duration-300 relative z-10 font-bold glow-hover">
          Start Submission
        </Link>
      </section>
    </SectionWrapper>
  );
}

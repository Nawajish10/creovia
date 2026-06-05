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
      
      <section className="text-center flex flex-col items-center max-w-4xl mx-auto pt-12 md:pt-16 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-outline-variant/50 bg-surface-container-lowest/50 backdrop-blur-md mb-8 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-secondary animate-pulse shadow-[0_0_10px_rgba(var(--color-secondary-rgb),0.8)]"></span>
          <span className="font-label-sm text-on-surface uppercase tracking-widest font-bold">Premium Indian Assets Available</span>
        </div>
        <h1 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-on-surface mb-6 font-black tracking-tight drop-shadow-sm">Acquire Verified Indian Social Pages & Digital Assets</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mb-12 leading-relaxed text-lg">Purchase India's top YouTube channels, Instagram pages, Telegram groups, and WhatsApp communities — fully verified and priced in INR.</p>
        <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
          <Link href="#featuredassets" className="bg-gradient-to-r from-primary to-primary/80 text-on-primary font-label-md px-10 py-4 rounded-xl hover:shadow-[0_0_20px_rgba(var(--color-primary-rgb),0.4)] hover:-translate-y-0.5 transition-all glow-hover uppercase tracking-widest font-bold shadow-lg">Browse Listings</Link>
          <Link href="#submit-form" className="bg-surface-container-lowest/50 backdrop-blur-md border border-outline-variant/50 text-on-surface font-label-md px-10 py-4 rounded-xl hover:bg-surface-variant/80 transition-all uppercase tracking-widest font-bold hover:shadow-md hover:-translate-y-0.5">Join Buyer Network</Link>
        </div>
      </section>
    </SectionWrapper>
  );
}

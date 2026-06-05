import { SectionWrapper } from "@/components/layout/SectionWrapper";
import Image from "next/image";

export function Mission() {
  return (
    <SectionWrapper id="mission" className="py-6 md:py-12">
      {/* Hero Section */}
      <section className="relative pt-8 pb-6 md:pt-16 md:pb-12 px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto w-full flex flex-col items-center text-center">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-fixed via-background to-background"></div>
        <div className="z-10 max-w-4xl space-y-4 md:space-y-8">
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg leading-tight text-on-surface">
            The Marketplace for <span className="text-primary">Creator Assets</span>
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto text-base md:text-lg">
            Buy, sell, and value digital audiences, creator communities, social channels, newsletters, and online media properties through a trusted marketplace designed for creators, operators, agencies, and investors.
          </p>
        </div>
      </section>
      {/* Mission Section */}
      <section className="py-6 md:py-12 px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto w-full border-t border-outline-variant">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
          <div className="space-y-4 md:space-y-6">
            <h2 className="font-headline-md text-headline-md text-on-surface">Creating the most trusted platform.</h2>
            <p className="font-body-md text-body-md text-on-surface-variant text-sm md:text-base">
              Our mission is to establish the gold standard for liquidity in India's creator economy. By blending institutional stability with cutting-edge technological prowess, we eliminate opacity and friction from digital asset acquisitions in the subcontinent.
            </p>
          </div>
          <div className="glass-panel rounded-xl p-4 md:p-8 aspect-video flex items-center justify-center glow-accent relative overflow-hidden">
            <Image alt="Abstract representation of data and trust" className="object-cover opacity-20 mix-blend-multiply" fill src="https://lh3.googleusercontent.com/aida-public/AB6AXuBo8wrTPB2Y0vc4bDsIbLjGi2kd5_AuTA1N1uzsKLZuoXWjzmgnxr7oISxCr3BVosQ6OlX8kkY9mkoGuaFsK9nGHu4bAOFDbJSIeePt1BIoJDiRAMJljUAwFdbi93Gaa6xp7S8KvPhTAx7jrmepmoWu_tNI55XWV7WcJnEfHtZqS1tCbx3TcvxnPJ9hfBAMR3NquQPewUkGqKXRNJaHZ8xkP_2QoxUotczvIndF7hgBlZco-Nice3_9B5EPkZXntpLa2LYSFfEpF7A"/>
            <span className="material-symbols-outlined text-4xl md:text-6xl text-primary z-10" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance</span>
          </div>
        </div>
      </section>
    </SectionWrapper>
  );
}

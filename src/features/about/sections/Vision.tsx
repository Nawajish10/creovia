import { SectionWrapper } from "@/components/layout/SectionWrapper";

export function Vision() {
  return (
    <SectionWrapper id="vision" className="py-12">
      {/* Vision Section */}
      <section className="py-16 px-margin-mobile md:px-margin-desktop bg-primary-fixed border-t border-outline-variant w-full relative overflow-hidden">
        <div className="max-w-3xl mx-auto text-center space-y-8 relative z-10">
          <span className="material-symbols-outlined text-4xl text-primary mb-4 block">rocket_launch</span>
          <h2 className="font-headline-md text-headline-md text-on-surface">
            The future of India's creator economy transactions.
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            We envision a landscape where Indian digital intellectual property is traded with the same fluidity, security, and analytical depth as traditional financial equities. A future where Indian creators can instantly capitalize on their life's work, and enterprises can acquire validated, revenue-generating digital assets seamlessly.
          </p>
          <div className="pt-8">
            <button className="bg-primary text-on-primary px-8 py-3 rounded-lg font-label-md text-label-md tracking-wide hover:opacity-90 transition-all glow-accent">
              Explore The Market
            </button>
          </div>
        </div>
      </section>
    </SectionWrapper>
  );
}

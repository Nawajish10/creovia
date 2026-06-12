import { SectionWrapper } from "@/components/layout/SectionWrapper";

export function Benefits() {
  return (
    <SectionWrapper id="benefits" className="py-12">
      <section className="px-margin-mobile md:px-margin-desktop max-w-[1280px] mx-auto py-16">
        <div className="grid grid-cols-4 gap-gutter">
          {/* Card 1 */}
          <div className="bg-surface-container-lowest border border-outline-variant p-8 rounded-xl hover:border-primary transition-colors duration-300 flex flex-col gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-lg bg-primary-fixed flex items-center justify-center">
              <span className="material-symbols-outlined text-on-primary-fixed-variant">groups</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">Serious Buyers</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">Direct access to verified institutional and private equity buyers actively acquiring digital assets.</p>
            </div>
          </div>
          {/* Card 2 */}
          <div className="bg-surface-container-lowest border border-outline-variant p-8 rounded-xl hover:border-primary transition-colors duration-300 flex flex-col gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-lg bg-primary-fixed flex items-center justify-center">
              <span className="material-symbols-outlined text-on-primary-fixed-variant">monitoring</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">Pro Valuation</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">Data-driven appraisal models based on cash flow, audience retention, and niche multiples.</p>
            </div>
          </div>
          {/* Card 3 */}
          <div className="bg-surface-container-lowest border border-outline-variant p-8 rounded-xl hover:border-primary transition-colors duration-300 flex flex-col gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-lg bg-secondary-container flex items-center justify-center">
              <span className="material-symbols-outlined text-on-secondary-container">verified</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">Verified Market</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">All listings undergo strict KYC and financial audits to maintain our premium marketplace integrity.</p>
            </div>
          </div>
          {/* Card 4 */}
          <div className="bg-surface-container-lowest border border-outline-variant p-8 rounded-xl hover:border-primary transition-colors duration-300 flex flex-col gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-lg bg-primary-fixed flex items-center justify-center">
              <span className="material-symbols-outlined text-on-primary-fixed-variant">handshake</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">Guided Exits</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">End-to-end M&amp;A advisory support from initial listing through complex asset migration and escrow.</p>
            </div>
          </div>
        </div>
      </section>
    </SectionWrapper>
  );
}

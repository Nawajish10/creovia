import Link from "next/link";
import { SectionWrapper } from "@/components/layout/SectionWrapper";

export function SEOHomeContent() {
  return (
    <SectionWrapper id="seo-content" className="py-12 md:py-20" background="muted">
      <div className="max-w-container-max mx-auto space-y-16">
        
        {/* H1 SEO Headline Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="font-headline-xl text-on-surface text-3xl md:text-4xl tracking-tight">
            India&apos;s Leading <span className="text-primary">Social Pages & Digital Assets Marketplace</span>
          </h2>
          <p className="font-body-lg text-on-surface-variant text-base md:text-lg leading-relaxed">
            Axcrivo is the premier digital asset marketplace designed for professional acquisitions. We connect creator businesses, digital brands, and serious investors through a transparent, secure, and data-driven platform.
          </p>
        </div>

        {/* 3 Core Services Grid: Buy, Sell, Value */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          
          {/* Card 1: Buy */}
          <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/30 flex flex-col gap-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-2xl">shopping_cart</span>
            </div>
            <div className="space-y-3 flex-grow">
              <h3 className="font-headline-md text-xl md:text-2xl text-on-surface">Buy Social Pages & Digital Assets</h3>
              <p className="font-body-md text-sm md:text-base text-on-surface-variant leading-relaxed">
                Acquire verified digital businesses and audiences with active cash flows. Browse audited YouTube channels, high-engagement Instagram profiles, Telegram communities, and premium newsletters.
              </p>
            </div>
            <Link 
              href="/buy" 
              className="text-primary font-label-md text-xs md:text-sm uppercase tracking-wider font-bold flex items-center gap-2 hover:underline w-fit"
            >
              Buy Social Pages & Digital Assets
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>

          {/* Card 2: Sell */}
          <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/30 flex flex-col gap-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-secondary text-2xl">sell</span>
            </div>
            <div className="space-y-3 flex-grow">
              <h3 className="font-headline-md text-xl md:text-2xl text-on-surface">Sell Social Pages & Digital Assets</h3>
              <p className="font-body-md text-sm md:text-base text-on-surface-variant leading-relaxed">
                Connect with serious private equity investors, digital roll-ups, and D2C brands. List your digital property, command premium multiples, and exit safely with structured escrow contracts.
              </p>
            </div>
            <Link 
              href="/sell" 
              className="text-secondary font-label-md text-xs md:text-sm uppercase tracking-wider font-bold flex items-center gap-2 hover:underline w-fit"
            >
              Sell Social Pages & Digital Assets
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>

          {/* Card 3: Valuation */}
          <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/30 flex flex-col gap-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-tertiary-container/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-tertiary text-2xl">calculate</span>
            </div>
            <div className="space-y-3 flex-grow">
              <h3 className="font-headline-md text-xl md:text-2xl text-on-surface">Social Pages & Digital Assets Valuation</h3>
              <p className="font-body-md text-sm md:text-base text-on-surface-variant leading-relaxed">
                Calculate the accurate enterprise value of your digital property. Our algorithm factors in niche multiples, historical net revenue, audience demographics, and geographic distribution.
              </p>
            </div>
            <Link 
              href="/valuation" 
              className="text-tertiary font-label-md text-xs md:text-sm uppercase tracking-wider font-bold flex items-center gap-2 hover:underline w-fit"
            >
              Get Free Valuation
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>

        </div>

        {/* Verification, Due Diligence & Benefits Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center pt-8 border-t border-outline-variant/30">
          
          {/* Due Diligence details */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="font-label-sm text-xs text-primary uppercase tracking-widest">Risk Mitigation</span>
            </div>
            <h3 className="font-headline-xl text-2xl md:text-3xl text-on-surface">
              Verification & Creator Due Diligence
            </h3>
            <p className="font-body-md text-on-surface-variant leading-relaxed">
              We eliminate risk in the digital asset space. Every listing on Axcrivo is verified through active integrations and manual auditing.
            </p>
            <ul className="space-y-3 font-body-md text-on-surface-variant text-sm md:text-base">
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-secondary text-sm md:text-base shrink-0 mt-1">check_circle</span>
                <span><strong>Audited Analytics:</strong> Real-time integration checks verify true engagement, story views, and historical growth trends.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-secondary text-sm md:text-base shrink-0 mt-1">check_circle</span>
                <span><strong>Financial Audits:</strong> Verified proof-of-funds and Stripe/Paypal bank transaction history validation.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-secondary text-sm md:text-base shrink-0 mt-1">check_circle</span>
                <span><strong>Legal Transfer:</strong> Direct account migrations, secure credential escrow, and intellectual property transfers.</span>
              </li>
            </ul>
            <div className="pt-2">
              <Link 
                href="/valuation-methodology" 
                className="font-label-md text-xs md:text-sm text-primary uppercase tracking-widest font-semibold hover:underline flex items-center gap-2"
              >
                Our Valuation Methodology
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </div>

          {/* Marketplace Benefits */}
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-6 md:p-10 space-y-6 shadow-sm">
            <h3 className="font-headline-md text-xl md:text-2xl text-on-surface">
              The Axcrivo Advantage
            </h3>
            <p className="font-body-md text-sm md:text-base text-on-surface-variant">
              Why professional acquirers and high-growth creators transact on our platform:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h4 className="font-headline-sm text-base text-on-surface font-semibold">100% Secure Escrow</h4>
                <p className="font-body-md text-xs md:text-sm text-on-surface-variant leading-relaxed">
                  Funds and assets are held securely in escrow during migrations.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-headline-sm text-base text-on-surface font-semibold">Curated Buyer Network</h4>
                <p className="font-body-md text-xs md:text-sm text-on-surface-variant leading-relaxed">
                  Direct connection to verified capital pools, D2C brands, and private holdcos.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-headline-sm text-base text-on-surface font-semibold">SDE-Based Multiples</h4>
                <p className="font-body-md text-xs md:text-sm text-on-surface-variant leading-relaxed">
                  Real value based on industry standard multiples and cash predictability.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-headline-sm text-base text-on-surface font-semibold">Expert Advisory M&A</h4>
                <p className="font-body-md text-xs md:text-sm text-on-surface-variant leading-relaxed">
                  Dedicated transition and negotiation assistance for complex handovers.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </SectionWrapper>
  );
}

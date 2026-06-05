import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { FAQJsonLd } from "@/components/seo/JsonLd";
import Link from "next/link";

const steps = [
  {
    num: "01",
    title: "Browse & Filter Listings",
    desc: "Vetted listings on our marketplace display audited audience stats, niches, and revenue streams. Filter by platform, category, and budget to find matching properties."
  },
  {
    num: "02",
    title: "Perform Due Diligence",
    desc: "Request read-only access to analytics dashboards, verify demographic distribution (Tier 1 vs Tier 3), check growth curves, and review P&L financial records."
  },
  {
    num: "03",
    title: "Submit a Safe Offer",
    desc: "Submit competitive offers via our secure broker portal. Our experienced digital M&A advisors assist with deal structure, letters of intent (LOI), and negotiations."
  },
  {
    num: "04",
    title: "Secure Escrow & Migration",
    desc: "Deposit funds safely in Axcrivo Escrow. Our migration specialists transfer original emails, domains, credentials, and assets. Upon validation, funds are released."
  }
];

const criteria = [
  {
    title: "Audience Retention & Health",
    desc: "We look for stable, organic growth curves with no sudden spikes indicating bot traffic. Verified high story views (5%+) and active comment sentiment are preferred."
  },
  {
    title: "Clean Trailing Bookkeeping",
    desc: "We prioritize assets with documented Stripe, PayPal, or bank statements showing at least 6 months of stable, repeatable monetization."
  },
  {
    title: "Evergreen & Faceless Frameworks",
    desc: "Digital assets that do not depend on the owner's personal face or voice are highly valued due to transition stability and scalability."
  },
  {
    title: "Diversified Revenue Mix",
    desc: "Channels generating profits across multiple streams (e.g., AdSense + affiliate sales + direct sponsorships) command higher exit multiples."
  }
];

const faqs = [
  {
    question: "How does Axcrivo verify listing authenticity?",
    answer: "Every digital asset on Axcrivo undergoes financial verification and audience analysis. We examine historical search data, cross-check live dashboard metrics via video, and verify banking deposits before publishing."
  },
  {
    question: "Why is the Original Email (OG Email) critical for security?",
    answer: "The Original Email (OG Email) is the email account used to create the page. Without receiving original email control, a seller can recover the asset via support recovery. Axcrivo requires the OG email for secure transfers."
  },
  {
    question: "What legal agreements govern creator acquisitions?",
    answer: "All transactions on our platform are governed by a legally binding Asset Purchase Agreement (APA). This contract details the specific assets, intellectual property, domains, and transition assistance being acquired."
  },
  {
    question: "Can I verify the analytics live before releasing escrow?",
    answer: "Yes. Once funds are deposited in escrow, you enter a verification window (usually 3 to 5 days). You will receive credentials to verify all dashboard parameters live before authorizing the payout."
  },
  {
    question: "What is the typical multiple for buying digital businesses?",
    answer: "Most Social Pages & Digital Assets sell for multiples of 2.0x to 4.5x Annual SDE (Seller Discretionary Earnings), varying based on niche strength, platform compliance, and passive cash flow reliability."
  }
];

export function BuySEOInfo() {
  return (
    <SectionWrapper id="buy-seo-info" className="py-12 md:py-20" background="default">
      <FAQJsonLd items={faqs} />
      <div className="max-w-[1280px] mx-auto space-y-16">
        
        {/* Section 1: Acquisition Process */}
        <div className="space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="font-headline-xl text-3xl text-on-surface">The Acquisition Process</h2>
            <p className="font-body-lg text-on-surface-variant text-base md:text-lg">
              A structured, risk-free transaction flow designed to protect buyer capital.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, idx) => (
              <div 
                key={idx} 
                className="bg-surface-container-lowest border border-outline-variant/30 p-6 rounded-2xl flex flex-col gap-4 hover:border-primary/30 transition-colors shadow-sm"
              >
                <div className="flex justify-between items-center">
                  <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-xl">
                      {idx === 0 ? "pageview" : idx === 1 ? "fact_check" : idx === 2 ? "gavel" : "vpn_key"}
                    </span>
                  </div>
                  <span className="font-label-md font-bold text-2xl text-outline-variant/20">{s.num}</span>
                </div>
                <div className="space-y-1">
                  <h3 className="font-headline-sm text-base md:text-lg text-on-surface font-semibold">{s.title}</h3>
                  <p className="font-body-md text-xs md:text-sm text-on-surface-variant leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Due Diligence & Investment Criteria */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center pt-8 border-t border-outline-variant/30">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-secondary/20 bg-secondary/5">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              <span className="font-label-sm text-xs text-secondary uppercase tracking-widest">Investment Quality</span>
            </div>
            <h3 className="font-headline-xl text-2xl md:text-3xl text-on-surface">
              Asset Verification & Due Diligence Framework
            </h3>
            <p className="font-body-md text-on-surface-variant leading-relaxed">
              We apply institutional-grade auditing filters to weed out bot accounts, false revenue reports, and platform violation risks. Buyers receive fully verified digital properties.
            </p>
            <div className="pt-2">
              <Link 
                href="/valuation-methodology" 
                className="font-label-md text-xs md:text-sm text-secondary uppercase tracking-widest font-semibold hover:underline flex items-center gap-2"
              >
                Learn Our Auditing Framework
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </div>

          <div className="bg-surface-container p-6 md:p-8 rounded-3xl border border-outline-variant/30 space-y-6">
            <h4 className="font-headline-md text-xl text-on-surface font-semibold">Our Investment Criteria</h4>
            <div className="space-y-4">
              {criteria.map((c, i) => (
                <div key={i} className="space-y-1 bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/20">
                  <h5 className="font-headline-sm text-sm md:text-base text-on-surface font-bold">{c.title}</h5>
                  <p className="font-body-md text-xs md:text-sm text-on-surface-variant leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section 3: Frequently Asked Questions */}
        <div className="space-y-8 max-w-4xl mx-auto pt-8 border-t border-outline-variant/30">
          <div className="text-center space-y-4">
            <h2 className="font-headline-xl text-2xl md:text-3xl text-on-surface">Frequently Asked Questions</h2>
            <p className="font-body-md text-on-surface-variant text-sm">
              Answers to common queries regarding buyer acquisitions.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="bg-surface-container-lowest p-5 md:p-6 rounded-2xl border border-outline-variant/20 space-y-2 hover:border-primary/20 transition-all shadow-sm"
              >
                <h4 className="font-headline-sm text-sm md:text-base text-on-surface font-semibold flex gap-2">
                  <span className="text-primary font-bold">Q:</span>
                  {faq.question}
                </h4>
                <p className="font-body-md text-xs md:text-sm text-on-surface-variant leading-relaxed pl-5">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center pt-4 flex flex-wrap justify-center gap-4 text-xs md:text-sm font-body-md">
            <span className="text-on-surface-variant">Still exploring options?</span>
            <Link href="/valuation" className="text-primary hover:underline font-bold">Value An Asset</Link>
            <span className="text-outline-variant">•</span>
            <Link href="/sell" className="text-primary hover:underline font-bold">List Your Account</Link>
            <span className="text-outline-variant">•</span>
            <Link href="/resources" className="text-primary hover:underline font-bold">Read Buyers Guides</Link>
          </div>
        </div>

      </div>
    </SectionWrapper>
  );
}

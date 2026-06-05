import { PageWrapper } from "@/components/layout/PageWrapper";
import { createMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FAQJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import Link from "next/link";

export const metadata = createMetadata({
  title: "Social Pages & Digital Assets Valuation Methodology | How We Price Audients",
  description: "Learn how Axcrivo values Social Pages & Digital Assets, Instagram accounts, YouTube channels, and email lists using revenue multiples, SDE, audience quality indexes, and geo modifiers.",
  path: "/valuation-methodology",
  keywords: [
    "Social Pages & Digital Assets valuation methodology",
    "how Social Pages & Digital Assets are valued",
    "instagram valuation formula",
    "youtube channel valuation",
    "multiplier calculation"
  ]
});

const methodologyFaqs = [
  {
    question: "What is a Seller Discretionary Earnings (SDE) multiple?",
    answer: "SDE is the net profit of a creator business plus any owner salary or personal expenses added back. Acquirers use this to determine the baseline profit floor and apply a multiple (e.g. 2.5x annual SDE) based on risk."
  },
  {
    question: "How do face-less cash cow channels differ in valuation from personality-driven channels?",
    answer: "Personality-driven channels rely on a specific creator's voice or face, making transfer risky. They command lower multiples (1.5x - 2.5x SDE) unless structured with transition earn-outs. Face-less cash cow channels transition seamlessly, commanding higher multiples (3.0x - 4.5x SDE)."
  },
  {
    question: "Why is the target audience country modifier so powerful?",
    answer: "Advertising CPM rates and e-commerce conversions vary by country. An audience mostly in Tier-1 countries (US, UK, CA) yields up to 10x higher RPM than Tier-3 audiences, directly inflating the valuation multiple."
  }
];

export default function ValuationMethodologyPage() {
  const breadcrumbs = [
    { name: "Valuation Hub", href: "/valuation" },
    { name: "Methodology" }
  ];

  return (
    <PageWrapper className="pt-24 pb-16 bg-surface text-on-surface min-h-screen">
      <BreadcrumbJsonLd 
        items={[
          { name: "Home", item: "https://www.axcrivo.in" },
          { name: "Valuation Hub", item: "https://www.axcrivo.in/valuation" },
          { name: "Methodology", item: "https://www.axcrivo.in/valuation-methodology" }
        ]} 
      />
      <FAQJsonLd items={methodologyFaqs} />

      <div className="max-w-[1000px] mx-auto px-margin-mobile md:px-0 space-y-12">
        
        {/* Navigation Breadcrumbs */}
        <Breadcrumbs steps={breadcrumbs} />

        {/* Hero / Introduction */}
        <header className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5">
            <span className="w-2 h-2 rounded-full bg-primary pulse-dot"></span>
            <span className="font-label-sm text-xs text-primary uppercase tracking-widest font-bold">Advisory & Mathematics</span>
          </div>
          <h1 className="font-display-lg-mobile md:font-display-lg text-on-surface tracking-tight leading-tight">
            Axcrivo Social Pages & Digital Assets <span className="text-primary">Valuation Methodology</span>
          </h1>
          <p className="font-body-lg text-on-surface-variant leading-relaxed text-base md:text-lg">
            This document outlines the operational and financial frameworks used by Axcrivo to analyze, audit, and appraise creator-economy properties, establishing a standardized baseline for asset acquisitions.
          </p>
        </header>

        <hr className="border-outline-variant/30" />

        {/* Section 1: Introduction & Executive Summary */}
        <section className="space-y-4 font-body-md text-sm md:text-base text-on-surface-variant">
          <h2 className="font-headline-md text-xl md:text-2xl text-on-surface font-semibold">1. Executive Summary</h2>
          <p className="leading-relaxed">
            Creator properties represent a hybrid between traditional intellectual property (IP) and real-time digital media assets. Unlike software (SaaS) or brick-and-mortar operations, creator businesses operate on audience attention and platform algorithms. Our framework translates qualitative audience indicators into standardized financial valuations.
          </p>
        </section>

        {/* Section 2: Valuation Framework (Pillars) */}
        <section className="space-y-6">
          <h2 className="font-headline-md text-xl md:text-2xl text-on-surface font-semibold">2. The Four Pillars Valuation Framework</h2>
          <p className="font-body-md text-sm md:text-base text-on-surface-variant leading-relaxed">
            Our valuation models evaluate four quantitative and qualitative metrics to determine value:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/20 space-y-2">
              <h3 className="font-headline-sm text-base text-on-surface font-bold">Pillar 1: Audience Reach & Volume</h3>
              <p className="font-body-md text-xs md:text-sm text-on-surface-variant leading-relaxed">
                Raw volume parameters (Subscribers, Followers, Newsletter sign-ups) across core platforms, normalized against overlap duplicates.
              </p>
            </div>
            <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/20 space-y-2">
              <h3 className="font-headline-sm text-base text-on-surface font-bold">Pillar 2: Interaction Quality Index</h3>
              <p className="font-body-md text-xs md:text-sm text-on-surface-variant leading-relaxed">
                Platform-specific engagement parameters (like average story views, click-throughs, comment volume, share frequency) checked for bot activity.
              </p>
            </div>
            <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/20 space-y-2">
              <h3 className="font-headline-sm text-base text-on-surface font-bold">Pillar 3: Revenue Multiples (SDE)</h3>
              <p className="font-body-md text-xs md:text-sm text-on-surface-variant leading-relaxed">
                Calculations based on verified trailing 6 to 12 months of Seller Discretionary Earnings (SDE) or net cash profit.
              </p>
            </div>
            <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/20 space-y-2">
              <h3 className="font-headline-sm text-base text-on-surface font-bold">Pillar 4: Systemic Risk Coefficient</h3>
              <p className="font-body-md text-xs md:text-sm text-on-surface-variant leading-relaxed">
                Platform dependencies, trademark boundaries, copyright integrity, and founder personality dependence discount indicators.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Audience Quality Analysis */}
        <section className="space-y-4 font-body-md text-sm md:text-base text-on-surface-variant">
          <h2 className="font-headline-md text-xl md:text-2xl text-on-surface font-semibold">3. Audience Quality Analysis</h2>
          <p className="leading-relaxed">
            Vanity parameters (like total follower counts) can be manipulated. Axcrivo utilizes algorithmic validation to verify active human attention:
          </p>
          <ul className="list-disc pl-6 space-y-2 leading-relaxed">
            <li><strong>Growth Uniformity:</strong> Spikes in follower count are audited against viral content indexes to identify purchased bots.</li>
            <li><strong>Interaction Distribution:</strong> Verification of comment-to-like metrics and natural sentiment analysis. Emojis and boilerplate responses indicate engagement pods.</li>
            <li><strong>Access Metrics:</strong> Story views (Instagram) or open rates (Newsletters) are verified as true daily active signals.</li>
          </ul>
        </section>

        {/* Section 4: Engagement Analysis */}
        <section className="space-y-4 font-body-md text-sm md:text-base text-on-surface-variant">
          <h2 className="font-headline-md text-xl md:text-2xl text-on-surface font-semibold">4. Platform Engagement Benchmarks</h2>
          <p className="leading-relaxed">
            Valuation multiples apply a premium or discount depending on target engagement indices relative to platform norms:
          </p>
          <div className="bg-surface-container p-6 rounded-2xl border border-outline-variant/30 overflow-x-auto">
            <table className="w-full text-left text-xs md:text-sm">
              <thead>
                <tr className="border-b border-outline-variant/40 pb-2 font-bold text-on-surface">
                  <th className="py-2">Platform</th>
                  <th className="py-2">Below Benchmark (Discount)</th>
                  <th className="py-2">Standard (Baseline)</th>
                  <th className="py-2">Outstanding (Premium)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20 text-on-surface-variant">
                <tr>
                  <td className="py-3 font-semibold text-on-surface">Instagram (ER)</td>
                  <td className="py-3">&lt; 1.5%</td>
                  <td className="py-3">1.5% - 4.5%</td>
                  <td className="py-3">&gt; 4.5% (+20% multiple)</td>
                </tr>
                <tr>
                  <td className="py-3 font-semibold text-on-surface">YouTube (View/Sub Ratio)</td>
                  <td className="py-3">&lt; 10%</td>
                  <td className="py-3">10% - 25%</td>
                  <td className="py-3">&gt; 25% (+15% multiple)</td>
                </tr>
                <tr>
                  <td className="py-3 font-semibold text-on-surface">Newsletters (Open Rate)</td>
                  <td className="py-3">&lt; 20%</td>
                  <td className="py-3">20% - 40%</td>
                  <td className="py-3">&gt; 40% (+25% multiple)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 5: Revenue Multiples & SDE */}
        <section className="space-y-4 font-body-md text-sm md:text-base text-on-surface-variant">
          <h2 className="font-headline-md text-xl md:text-2xl text-on-surface font-semibold">5. Revenue Multiples & SDE Calculations</h2>
          <p className="leading-relaxed">
            Financial valuation centers on **SDE (Seller Discretionary Earnings)**. The valuation formula evaluates:
          </p>
          <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/20 font-mono text-xs md:text-sm text-primary text-center">
            Valuation = (Annual SDE × Baseline Niche Multiple) ± Modifier Adjustments
          </div>
          <p className="leading-relaxed">
            Annual SDE multiples for creator properties typically fall between **2.0x and 4.5x SDE** (or 24x to 54x monthly net profit). High CPM niche sectors (Fintech, Real Estate, Business) sit at the top of the range.
          </p>
        </section>

        {/* Section 6: Growth Analysis & Algorithmic Stability */}
        <section className="space-y-4 font-body-md text-sm md:text-base text-on-surface-variant">
          <h2 className="font-headline-md text-xl md:text-2xl text-on-surface font-semibold">6. Algorithmic Stability Index</h2>
          <p className="leading-relaxed">
            Assets relying entirely on organic discoverability loops (like TikTok algorithms or Reels) present high risk. Axcrivo applies a discount coefficient to algorithmic channels, while rewarding assets that build owned lists (email lists, SMS, direct communities) which bypass platform filters.
          </p>
        </section>

        {/* Section 7: Risk Adjustments */}
        <section className="space-y-4 font-body-md text-sm md:text-base text-on-surface-variant">
          <h2 className="font-headline-md text-xl md:text-2xl text-on-surface font-semibold">7. Risk Adjustments (Face vs Faceless)</h2>
          <p className="leading-relaxed">
            Founder dependency is a significant multiplier variable. If the audience connects specifically to a creator's personal face and character, post-acquisition retention declines. Such assets are discounted up to 35%, or require multi-month transition handover agreements (earn-outs). Faceless channels transfer with negligible risk.
          </p>
        </section>

        {/* Section 8: Example Valuation Breakdown */}
        <section className="space-y-4">
          <h2 className="font-headline-md text-xl md:text-2xl text-on-surface font-semibold">8. Example Valuation Breakdown</h2>
          <div className="bg-surface-container p-6 rounded-2xl border border-outline-variant/30 overflow-x-auto font-body-md text-xs md:text-sm">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-outline-variant/40 pb-2 font-bold text-on-surface">
                  <th className="py-2">Metric Type</th>
                  <th className="py-2">Example Case A (Instagram Page)</th>
                  <th className="py-2">Example Case B (YouTube Channel)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20 text-on-surface-variant">
                <tr>
                  <td className="py-3 font-semibold text-on-surface">Audience Size</td>
                  <td className="py-3">5,00,000 Followers</td>
                  <td className="py-3">2,50,000 Subscribers</td>
                </tr>
                <tr>
                  <td className="py-3 font-semibold text-on-surface">Monthly Net Profit</td>
                  <td className="py-3">₹1,50,000 (INR)</td>
                  <td className="py-3">₹2,80,000 (INR)</td>
                </tr>
                <tr>
                  <td className="py-3 font-semibold text-on-surface">Engagement Index</td>
                  <td className="py-3">4.2% (Standard)</td>
                  <td className="py-3">28% (Premium)</td>
                </tr>
                <tr>
                  <td className="py-3 font-semibold text-on-surface">Dependency Risk</td>
                  <td className="py-3">Faceless (No risk modifier)</td>
                  <td className="py-3">Personality-driven (-15% modifier)</td>
                </tr>
                <tr>
                  <td className="py-3 font-semibold text-on-surface">Applied SDE Multiple</td>
                  <td className="py-3">2.4x Annual Multiple (28.8x Monthly)</td>
                  <td className="py-3">3.5x Annual Multiple (42x Monthly)</td>
                </tr>
                <tr className="font-bold text-primary">
                  <td className="py-3">Appraised Value</td>
                  <td className="py-3">₹43,20,000 (₹43.2 Lakhs)</td>
                  <td className="py-3">₹1,17,60,000 (₹1.17 Crore)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 9: FAQ */}
        <section className="space-y-6 max-w-4xl mx-auto pt-8 border-t border-outline-variant/30">
          <h2 className="font-headline-md text-xl md:text-2xl text-on-surface font-semibold text-center">Valuation Methodology FAQ</h2>
          <div className="space-y-4">
            {methodologyFaqs.map((faq, idx) => (
              <div key={idx} className="bg-surface-container-lowest p-5 md:p-6 rounded-2xl border border-outline-variant/20 space-y-2">
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
        </section>

        {/* Section 10: CTA */}
        <section className="max-w-4xl mx-auto pt-8 border-t border-outline-variant/30">
          <div className="bg-inverse-surface text-surface rounded-[2rem] p-8 md:p-12 text-center space-y-6">
            <h2 className="font-headline-xl text-2xl md:text-3xl text-white">Value or Exit Your Asset with Axcrivo</h2>
            <p className="font-body-lg text-sm md:text-base text-white/80 max-w-2xl mx-auto leading-relaxed">
              Ready to verify your metrics and get a professional exit appraisal? Access our valuation engine in under 60 seconds.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
              <Link 
                href="/valuation" 
                className="bg-primary text-on-primary px-8 py-3.5 rounded-xl font-label-md text-xs uppercase tracking-wider font-bold shadow-lg shadow-primary/20"
              >
                Get Free Valuation
              </Link>
              <Link 
                href="/sell" 
                className="bg-transparent border border-white/20 text-white px-8 py-3.5 rounded-xl font-label-md text-xs uppercase tracking-wider font-bold hover:bg-white/5"
              >
                Submit Listing Profile
              </Link>
            </div>
          </div>
        </section>

      </div>
    </PageWrapper>
  );
}

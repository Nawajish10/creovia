import Link from "next/link";
import { FAQJsonLd } from "@/components/seo/JsonLd";

const factors = [
  {
    title: "Audience Quality",
    desc: "Verify that followers represent genuine engagement. A localized, active audience is worth significantly more than generic or artificially inflated follower counts."
  },
  {
    title: "Engagement Rate",
    desc: "High likes, comments, shares, or click-through rates relative to benchmarks trigger a multiple premium of 20% to 50%."
  },
  {
    title: "Revenue & Cash Flow",
    desc: "Trailing 12-month net profits are the ultimate baseline. Assets with diversified monetization (AdSense + Merch + Sponsors) command highest values."
  },
  {
    title: "Content Niche",
    desc: "Commercial niches like Finance, Business, Tech, and Wealth management command higher multiples due to high brand CPMs."
  },
  {
    title: "Growth Trends",
    desc: "Consistent month-over-month growth indicates algorithmic momentum and stability, leading to premium valuations."
  },
  {
    title: "Audience Geography",
    desc: "Audiences based in Tier-1 countries (US, UK, CA, AU) yield higher ad rates and conversion rates, increasing overall asset value."
  }
];

const categories = [
  {
    title: "Instagram Pages",
    desc: "Valued on organic reach, story views (5-10% of followers), niche, and geo-targeted sponsor relevance. Typical multiples: 1.5x - 3.5x annual profit."
  },
  {
    title: "YouTube Channels",
    desc: "Valued on evergreen search traffic, AdSense history, RPM, and dependency. Faceless channels command a premium due to ease of owner transfer."
  },
  {
    title: "Telegram Groups",
    desc: "Valued on view-to-member ratios (15-30%) and monetization channels. Due diligence focuses heavily on verifying bot-free members."
  },
  {
    title: "Newsletters",
    desc: "Valued on open rates (35%+), active subscriber list health, and direct advertising potential. High multiples of 3x - 5x annual SDE."
  }
];

const faqs = [
  {
    question: "How does Axcrivo calculate the value of my Social Pages & Digital Assets?",
    answer: "Axcrivo uses a proprietary valuation engine that combines your trailing 12-month net revenue, platform-specific engagement metrics, audience geography, and niche standard multiples to calculate a realistic market value range."
  },
  {
    question: "What is the typical multiple for an Instagram page in India?",
    answer: "Most verified Instagram pages in India sell for 18x to 30x monthly net profit, heavily influenced by audience engagement rates, content niche, and target sponsor demographics."
  },
  {
    question: "Why does my content niche impact my valuation so heavily?",
    answer: "Different niches attract different sponsor budgets. High CPM niches like Finance, Tech, and Business command premium acquisition multiples because brands are willing to pay much more to reach those highly commercial audiences."
  },
  {
    question: "Can I get a valuation if my channel is not yet monetized?",
    answer: "Yes. Pre-revenue assets are valued based on the 'Audience Replacement Cost' — the estimated advertising cost required to build a similar scale and quality of active followers in that specific niche."
  },
  {
    question: "How does the escrow transfer process protect buyers and sellers?",
    answer: "Axcrivo Escrow holds the buyer's funds securely while our transition team facilitates the safe handover of the digital credentials. Once the buyer confirms ownership and original email access, the funds are released to the seller."
  }
];

export function ValuationFAQ() {
  return (
    <section className="space-y-16 pt-16 border-t border-outline-variant/30">
      <FAQJsonLd items={faqs} />

      {/* Section 1: Factors Impacting Value */}
      <div className="space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="font-headline-xl text-on-surface text-2xl md:text-3xl">Factors That Impact Value</h2>
          <p className="font-body-md text-on-surface-variant text-sm md:text-base leading-relaxed">
            Acquirers inspect a wide array of criteria before valuing a creator business. These six primary factors dictate the final listing price.
          </p>
        </div>
        
        <div className="grid grid-cols-3 gap-6">
          {factors.map((f, i) => (
            <div key={i} className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/20 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-headline-sm text-base md:text-lg text-on-surface font-semibold mb-2">{f.title}</h3>
              <p className="font-body-md text-xs md:text-sm text-on-surface-variant leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: Valuation Categories */}
      <div className="space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="font-headline-xl text-on-surface text-2xl md:text-3xl">Valuation Categories We Support</h2>
          <p className="font-body-md text-on-surface-variant text-sm md:text-base leading-relaxed">
            Our valuation models are tailored dynamically based on platform conventions and monetization parameters.
          </p>
        </div>

        <div className="grid grid-cols-4 gap-6">
          {categories.map((c, i) => (
            <div key={i} className="bg-surface-container p-6 rounded-2xl border border-outline-variant/30 space-y-2">
              <h3 className="font-headline-sm text-base md:text-lg text-on-surface font-bold">{c.title}</h3>
              <p className="font-body-md text-xs md:text-sm text-on-surface-variant leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Section 3: Why Choose Axcrivo */}
      <div className="bg-surface-container-lowest p-8 md:p-12 rounded-3xl border border-outline-variant/25 grid grid-cols-2 gap-8 items-center shadow-sm">
        <div className="space-y-4">
          <h2 className="font-headline-xl text-2xl md:text-3xl text-on-surface">Why Value & Sell Through Axcrivo?</h2>
          <p className="font-body-md text-sm md:text-base text-on-surface-variant leading-relaxed">
            Axcrivo is the premier M&A marketplace built specifically for digital creators in India. We offer:
          </p>
          <ul className="space-y-2 font-body-md text-xs md:text-sm text-on-surface-variant">
            <li className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-sm shrink-0">check_circle</span>
              <span><strong>Institutional Pricing Models:</strong> Standardized formulas verified by actual transactions.</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-sm shrink-0">check_circle</span>
              <span><strong>Advisory Exit Support:</strong> Guided exit support from listing to financial closing.</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-sm shrink-0">check_circle</span>
              <span><strong>Secure Custody Transfer:</strong> Legally backed contracts with escrow safety protocols.</span>
            </li>
          </ul>
        </div>
        <div className="bg-surface-container/50 p-6 md:p-8 rounded-2xl border border-outline-variant/20 flex flex-col gap-4">
          <h3 className="font-headline-md text-lg md:text-xl text-on-surface font-semibold">Want to dig deeper into the math?</h3>
          <p className="font-body-md text-xs md:text-sm text-on-surface-variant leading-relaxed">
            Read our complete technical guide detailing revenue multiples, multiplier adjustments, and sample breakdowns.
          </p>
          <div className="pt-2">
            <Link 
              href="/valuation-methodology" 
              className="inline-block bg-primary text-on-primary px-6 py-3 rounded-xl font-label-md text-xs uppercase tracking-wider text-center font-bold hover:opacity-90 transition-opacity"
            >
              Read Valuation Methodology
            </Link>
          </div>
        </div>
      </div>

      {/* Section 4: Frequently Asked Questions */}
      <div className="space-y-8 max-w-4xl mx-auto">
        <div className="text-center space-y-4">
          <h2 className="font-headline-xl text-2xl md:text-3xl text-on-surface">Frequently Asked Questions</h2>
          <p className="font-body-md text-on-surface-variant text-sm">
            Everything you need to know about Social Pages & Digital Assets valuations and acquisitions.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
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

        <div className="text-center pt-4 flex flex-wrap justify-center gap-4 text-xs md:text-sm font-body-md">
          <span className="text-on-surface-variant">Ready to list?</span>
          <Link href="/sell" className="text-primary hover:underline font-bold">Sell Your Asset</Link>
          <span className="text-outline-variant">•</span>
          <Link href="/buy" className="text-primary hover:underline font-bold">Browse Listings</Link>
          <span className="text-outline-variant">•</span>
          <Link href="/resources" className="text-primary hover:underline font-bold">Read Guides</Link>
        </div>
      </div>

    </section>
  );
}

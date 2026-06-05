import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { FAQJsonLd } from "@/components/seo/JsonLd";
import Link from "next/link";

const faqs = [
  {
    question: "What is required to list my creator asset for sale?",
    answer: "You need to confirm ownership of the asset (social profile, channel, or newsletter domain), provide trailing 3 to 12 months of financial documentation (Stripe, bank statements, or dashboard screenshots), and provide active read-only analytics access to verify engagement and demographics."
  },
  {
    question: "How long does the average digital asset sale take?",
    answer: "On average, transactions close within 14 to 21 days from listing. The timeline depends heavily on niche demand, financial transparency, and prompt buyer-seller negotiation."
  },
  {
    question: "What fees does Axcrivo charge for broker and escrow services?",
    answer: "We charge a success fee of 5% to 8% of the final transaction value upon successful closing. There are no upfront fees for listing or professional valuation assessments."
  },
  {
    question: "How is confidentiality maintained during the sale?",
    answer: "All asset URLs, brand names, and sensitive financials are kept private. They are only disclosed to vetted, serious buyers who have verified their proof of funds and signed a Non-Disclosure Agreement (NDA)."
  },
  {
    question: "Why do I need the Original Email (OG Email) to sell?",
    answer: "The original creation email is the primary security signal for platforms like Instagram. Buyers require the original email to prevent recovery hacks or account reclamation disputes post-transfer. Listing without an OG email may discount the asset price."
  }
];

export function FAQ() {
  return (
    <SectionWrapper id="faq" className="py-12 md:py-20" background="muted">
      <FAQJsonLd items={faqs} />
      <div className="max-w-[800px] mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h2 className="font-headline-xl text-3xl text-on-surface">Frequently Asked Questions</h2>
          <p className="font-body-lg text-on-surface-variant text-base">
            Find immediate answers to standard questions about selling creator businesses.
          </p>
        </div>

        {/* FAQs list */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/20 space-y-2 hover:border-primary/20 transition-all shadow-sm"
            >
              <h3 className="font-headline-sm text-base md:text-lg text-on-surface font-semibold flex gap-2">
                <span className="text-primary font-bold">Q:</span>
                {faq.question}
              </h3>
              <p className="font-body-md text-xs md:text-sm text-on-surface-variant leading-relaxed pl-5">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

        {/* Cross linking */}
        <div className="text-center pt-4 flex flex-wrap justify-center gap-4 text-xs md:text-sm font-body-md">
          <span className="text-on-surface-variant">Still have questions?</span>
          <Link href="/valuation" className="text-primary hover:underline font-bold">Value Your Asset</Link>
          <span className="text-outline-variant">•</span>
          <Link href="/valuation-methodology" className="text-primary hover:underline font-bold">Methodology Guide</Link>
          <span className="text-outline-variant">•</span>
          <Link href="/resources" className="text-primary hover:underline font-bold">Read Advisory Blog</Link>
        </div>

      </div>
    </SectionWrapper>
  );
}

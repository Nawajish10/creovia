import { PageWrapper } from "@/components/layout/PageWrapper";
import { createMetadata } from "@/lib/seo";
import { Calculator } from "@/features/valuation/sections/Calculator";
import { HowWorks } from "@/features/valuation/sections/HowWorks";
import { ValuationFAQ } from "@/features/valuation/sections/ValuationFAQ";

export const metadata = createMetadata({
  title: "Free Social Pages & Digital Assets Valuation | Axcrivo",
  description: "Get the true market value of your Instagram page, YouTube channel, Telegram group or newsletter with Axcrivo's data-driven valuation tool. Free & instant.",
  ogImage: "/og-image-v3.png",
  path: "/valuation",
  keywords: [
    "social pages valuation",
    "instagram page valuation",
    "youtube channel valuation",
    "telegram group valuation",
    "newsletter valuation",
    "how to value digital business"
  ]
});

export default function ValuationPage() {
  return (
    <PageWrapper className="bg-[#020617] relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#2563EB]/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#7C3AED]/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="relative z-10 flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-24 pb-24 flex flex-col gap-lg">
        <Calculator />
        <HowWorks />
        <ValuationFAQ />
      </div>
    </PageWrapper>
  );
}

import { PageWrapper } from "@/components/layout/PageWrapper";
import { createMetadata } from "@/lib/seo";
import { Hero } from "@/features/valuation/sections/Hero";
import { Calculator } from "@/features/valuation/sections/Calculator";
import { HowWorks } from "@/features/valuation/sections/HowWorks";
import { ValuationFAQ } from "@/features/valuation/sections/ValuationFAQ";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

export const metadata = createMetadata({
  title: "Creator Asset Valuation Hub | Value Your Account",
  description: "Understand the true market value of your Instagram page, YouTube channel, Telegram group, or email newsletter using Axcrivo's data-driven valuation models.",
  path: "/valuation",
  keywords: [
    "creator asset valuation",
    "instagram page valuation",
    "youtube channel valuation",
    "telegram group valuation",
    "newsletter valuation",
    "how to value digital business"
  ]
});

export default function ValuationPage() {
  return (
    <PageWrapper className="full-bg-image !bg-transparent">
      <div className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-24 pb-24 flex flex-col gap-lg">
        <Breadcrumbs steps={[{ name: "Valuation Hub" }]} />
        <Hero />
        <Calculator />
        <HowWorks />
        <ValuationFAQ />
      </div>
    </PageWrapper>
  );
}

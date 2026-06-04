import { PageWrapper } from "@/components/layout/PageWrapper";
import { createMetadata } from "@/lib/seo";
import { Hero } from "@/features/valuation/sections/Hero";
import { Calculator } from "@/features/valuation/sections/Calculator";
import { HowWorks } from "@/features/valuation/sections/HowWorks";

export const metadata = createMetadata({
  title: "Asset Valuation",
  description: "Get a free, data-driven valuation for your creator asset.",
  path: "/valuation"
});

export default function ValuationPage() {
  return (
    <PageWrapper className="full-bg-image !bg-transparent">
      <div className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-12 pb-24 flex flex-col gap-lg">
        <Hero />
        <Calculator />
        <HowWorks />
      </div>
    </PageWrapper>
  );
}

import { Hero } from "@/features/home/sections/Hero";
import { ValuationSteps } from "@/features/home/sections/ValuationSteps";
import { MetricsBanner } from "@/features/home/sections/MetricsBanner";
import { HowItWorks } from "@/features/home/sections/HowItWorks";
import { FinalCTA } from "@/features/home/sections/FinalCTA";
import { createMetadata } from "@/lib/seo";
import { OrganizationJsonLd, WebsiteJsonLd } from "@/components/seo/JsonLd";

export const metadata = createMetadata({
  title: "Buy & Sell Social Pages & Digital Assets | Axcrivo",
  description: "India's marketplace to buy & sell Instagram pages, YouTube channels, Telegram groups, newsletters & digital businesses. Get a free expert valuation today.",
  ogImage: "/og-image-v3.png",
  path: "/",
  exactTitle: true,
});

export default function HomePage() {
  return (
    <main className="flex-1 flex flex-col bg-[#020617]">
      <OrganizationJsonLd />
      <WebsiteJsonLd />
      <Hero />
      <ValuationSteps />
      <MetricsBanner />
      <HowItWorks />
      <FinalCTA />
    </main>
  );
}

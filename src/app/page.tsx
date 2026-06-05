import { Hero } from "@/features/home/sections/Hero";
import { Categories } from "@/features/home/sections/Categories";
import { FeaturedOpportunities } from "@/features/home/sections/FeaturedOpportunities";
import { HowItWorks } from "@/features/home/sections/HowItWorks";
import { Trust } from "@/features/home/sections/Trust";
import { MarketplaceStats } from "@/features/home/sections/MarketplaceStats";
import { FinalCTA } from "@/features/home/sections/FinalCTA";
import { createMetadata } from "@/lib/seo";
import { OrganizationJsonLd, WebsiteJsonLd } from "@/components/seo/JsonLd";
import { SEOHomeContent } from "@/features/home/sections/SEOHomeContent";

export const metadata = createMetadata({
  title: "Buy & Sell Creator Assets | Creator Asset Marketplace | Axcrivo",
  description: "Buy, sell and value creator assets including Instagram pages, YouTube channels, Telegram communities and newsletters. Get expert valuation and acquisition support from Axcrivo.",
  path: "/",
  exactTitle: true,
});

export default function HomePage() {
  return (
    <main className="flex-1 flex flex-col" style={{ backgroundColor: "#fbf8ff" }}>
      <OrganizationJsonLd />
      <WebsiteJsonLd />
      <Hero />
      <Categories />
      <FeaturedOpportunities />
      <HowItWorks />
      <Trust />
      <SEOHomeContent />
      <MarketplaceStats />
      <FinalCTA />
    </main>
  );
}

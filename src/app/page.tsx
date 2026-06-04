import { Hero } from "@/features/home/sections/Hero";
import { Categories } from "@/features/home/sections/Categories";
import { FeaturedOpportunities } from "@/features/home/sections/FeaturedOpportunities";
import { HowItWorks } from "@/features/home/sections/HowItWorks";
import { Trust } from "@/features/home/sections/Trust";
import { MarketplaceStats } from "@/features/home/sections/MarketplaceStats";
import { FinalCTA } from "@/features/home/sections/FinalCTA";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Buy & Sell Creator Assets With Confidence",
  description: "Acquire or sell Instagram pages, YouTube channels, Telegram communities, and digital audiences through a trusted, data-driven marketplace designed for professionals.",
  path: "/",
});

export default function HomePage() {
  return (
    <main className="flex-1 flex flex-col" style={{ backgroundColor: "#fbf8ff" }}>
      <Hero />
      <Categories />
      <FeaturedOpportunities />
      <HowItWorks />
      <Trust />
      <MarketplaceStats />
      <FinalCTA />
    </main>
  );
}

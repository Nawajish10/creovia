import { PageWrapper } from "@/components/layout/PageWrapper";
import { createMetadata } from "@/lib/seo";
import { Hero } from "@/features/buy/sections/Hero";
import { Categories } from "@/features/buy/sections/Categories";
import { FeaturedAssets } from "@/features/buy/sections/FeaturedAssets";
import { Benefits } from "@/features/buy/sections/Benefits";
import { BuyerForm } from "@/features/buy/sections/BuyerForm";
import { BuySEOInfo } from "@/features/buy/sections/BuySEOInfo";

export const metadata = createMetadata({
  title: "Buy Instagram Pages, YouTube Channels & Digital Businesses | Axcrivo",
  description: "Acquire verified Indian Instagram pages, YouTube channels, Telegram groups & newsletters. Audited traffic & financials with secure escrow protection.",
  ogImage: "/og-image-v2.png",
  path: "/buy",
  keywords: [
    "buy instagram page",
    "buy youtube channel",
    "buy telegram group",
    "buy social pages",
    "creator acquisitions",
    "digital business marketplace"
  ]
});

export default function BuyPage() {
  return (
    <PageWrapper>
      <Hero />
      <Categories />
      <FeaturedAssets />
      <Benefits />
      <BuySEOInfo />
      <BuyerForm />
    </PageWrapper>
  );
}

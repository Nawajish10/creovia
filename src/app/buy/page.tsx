import { PageWrapper } from "@/components/layout/PageWrapper";
import { createMetadata } from "@/lib/seo";
import { Hero } from "@/features/buy/sections/Hero";
import { Categories } from "@/features/buy/sections/Categories";
import { FeaturedAssets } from "@/features/buy/sections/FeaturedAssets";
import { Benefits } from "@/features/buy/sections/Benefits";
import { BuyerForm } from "@/features/buy/sections/BuyerForm";
import { BuySEOInfo } from "@/features/buy/sections/BuySEOInfo";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

export const metadata = createMetadata({
  title: "Buy Creator Assets & Digital Businesses | Browse Listings | Axcrivo",
  description: "Acquire verified Instagram pages, YouTube channels, Telegram groups, and creator businesses in India. Fully audited traffic and financials with secure escrow protection.",
  path: "/buy",
  keywords: [
    "buy instagram page",
    "buy youtube channel",
    "buy telegram group",
    "buy creator assets",
    "creator acquisitions",
    "digital business marketplace"
  ]
});

export default function BuyPage() {
  return (
    <PageWrapper>
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-24 pb-8">
        <Breadcrumbs steps={[{ name: "Buy Assets" }]} />
      </div>
      <Hero />
      <Categories />
      <FeaturedAssets />
      <Benefits />
      <BuySEOInfo />
      <BuyerForm />
    </PageWrapper>
  );
}

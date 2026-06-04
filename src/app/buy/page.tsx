import { PageWrapper } from "@/components/layout/PageWrapper";
import { createMetadata } from "@/lib/seo";
import { Hero } from "@/features/buy/sections/Hero";
import { Categories } from "@/features/buy/sections/Categories";
import { FeaturedAssets } from "@/features/buy/sections/FeaturedAssets";
import { Benefits } from "@/features/buy/sections/Benefits";
import { BuyerForm } from "@/features/buy/sections/BuyerForm";

export const metadata = createMetadata({
  title: "Buy Assets",
  description: "Browse and buy profitable creator assets and digital businesses.",
  path: "/buy"
});

export default function BuyPage() {
  return (
    <PageWrapper>
      <Hero />
      <Categories />
      <FeaturedAssets />
      <Benefits />
      <BuyerForm />
    </PageWrapper>
  );
}

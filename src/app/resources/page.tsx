import { PageWrapper } from "@/components/layout/PageWrapper";
import { createMetadata } from "@/lib/seo";
import { Hero } from "@/features/resources/sections/Hero";
import { CategoryFilter } from "@/features/resources/sections/CategoryFilter";
import { ResourceCards } from "@/features/resources/sections/ResourceCards";
import { NewsletterCTA } from "@/features/resources/sections/NewsletterCTA";

export const metadata = createMetadata({
  title: "Resources",
  description: "Guides and market reports for buying and selling creator assets.",
  path: "/resources"
});

export default function ResourcesPage() {
  return (
    <PageWrapper>
      <Hero />
      <CategoryFilter />
      <ResourceCards />
      <NewsletterCTA />
    </PageWrapper>
  );
}

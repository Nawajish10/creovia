import { PageWrapper } from "@/components/layout/PageWrapper";
import { createMetadata } from "@/lib/seo";
import { ResourceHub } from "@/features/resources/components/ResourceHub";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

export const metadata = createMetadata({
  title: "Creator Economy & Marketplace Resources | Browse Guides",
  description: "Explore creator economy research, valuation guides, buying resources, and selling strategies compiled by Axcrivo advisors.",
  path: "/resources",
  keywords: [
    "creator economy guides",
    "buy creator business tips",
    "sell youtube channel guide",
    "instagram value metrics"
  ]
});

export default function ResourcesPage() {
  return (
    <PageWrapper>
      <div className="max-w-screen-2xl mx-auto px-margin-mobile md:px-margin-desktop pt-24 pb-4">
        <Breadcrumbs steps={[{ name: "Resources" }]} />
      </div>
      <ResourceHub />
    </PageWrapper>
  );
}

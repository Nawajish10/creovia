import { PageWrapper } from "@/components/layout/PageWrapper";
import { createMetadata } from "@/lib/seo";
import { ResourceHub } from "@/features/resources/components/ResourceHub";

export const metadata = createMetadata({
  title: "Buy & Sell Social Pages Resources | Valuation Guides | Axcrivo",
  description: "Research, valuation guides, buying tips & selling strategies for Instagram pages, YouTube channels, Telegram groups & digital businesses in India.",
  ogImage: "/og-image-v3.png",
  path: "/resources",
  keywords: [
    "creator economy guides",
    "buy social pages tips",
    "sell youtube channel guide",
    "instagram value metrics"
  ]
});

export default function ResourcesPage() {
  return (
    <PageWrapper>
      <ResourceHub />
    </PageWrapper>
  );
}

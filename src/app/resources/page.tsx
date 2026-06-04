import { PageWrapper } from "@/components/layout/PageWrapper";
import { createMetadata } from "@/lib/seo";
import { ResourceHub } from "@/features/resources/components/ResourceHub";

export const metadata = createMetadata({
  title: "Resources",
  description: "Guides and market reports for buying and selling creator assets.",
  path: "/resources"
});

export default function ResourcesPage() {
  return (
    <PageWrapper>
      <ResourceHub />
    </PageWrapper>
  );
}

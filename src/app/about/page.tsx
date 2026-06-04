import { PageWrapper } from "@/components/layout/PageWrapper";
import { createMetadata } from "@/lib/seo";
import { Mission } from "@/features/about/sections/Mission";
import { Vision } from "@/features/about/sections/Vision";
import { Principles } from "@/features/about/sections/Principles";
import { Roadmap } from "@/features/about/sections/Roadmap";

export const metadata = createMetadata({
  title: "About Us",
  description: "Learn about Creovia's mission to empower the creator economy.",
  path: "/about"
});

export default function AboutPage() {
  return (
    <PageWrapper>
      <Mission />
      <Vision />
      <Principles />
      <Roadmap />
    </PageWrapper>
  );
}

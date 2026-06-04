import { PageWrapper } from "@/components/layout/PageWrapper";
import { createMetadata } from "@/lib/seo";
import { Hero } from "@/features/sell/sections/Hero";
import { Benefits } from "@/features/sell/sections/Benefits";
import { Process } from "@/features/sell/sections/Process";
import { SubmissionForm } from "@/features/sell/sections/SubmissionForm";
import { FAQ } from "@/features/sell/sections/FAQ";

export const metadata = createMetadata({
  title: "Sell Your Asset",
  description: "List your creator asset on the premier marketplace.",
  path: "/sell"
});

export default function SellPage() {
  return (
    <PageWrapper>
      <Hero />
      <Benefits />
      <Process />
      <SubmissionForm />
      <FAQ />
    </PageWrapper>
  );
}

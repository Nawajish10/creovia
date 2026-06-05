import { PageWrapper } from "@/components/layout/PageWrapper";
import { createMetadata } from "@/lib/seo";
import { Hero } from "@/features/sell/sections/Hero";
import { Benefits } from "@/features/sell/sections/Benefits";
import { Process } from "@/features/sell/sections/Process";
import { SubmissionForm } from "@/features/sell/sections/SubmissionForm";
import { FAQ } from "@/features/sell/sections/FAQ";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

export const metadata = createMetadata({
  title: "Sell Instagram Page, YouTube Channel & Creator Assets | Axcrivo",
  description: "Sell your creator business, YouTube channel, Instagram page, or newsletter with confidence in India. Access verified buyers, professional valuations, and secure escrow.",
  path: "/sell",
  keywords: [
    "sell instagram page",
    "sell youtube channel",
    "sell telegram group",
    "sell newsletter",
    "sell creator business",
    "digital asset broker"
  ]
});

export default function SellPage() {
  return (
    <PageWrapper>
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-24 pb-8">
        <Breadcrumbs steps={[{ name: "Sell Asset" }]} />
      </div>
      <Hero />
      <Benefits />
      <Process />
      <SubmissionForm />
      <FAQ />
    </PageWrapper>
  );
}

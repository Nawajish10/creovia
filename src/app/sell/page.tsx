import { PageWrapper } from "@/components/layout/PageWrapper";
import { createMetadata } from "@/lib/seo";
import { Hero } from "@/features/sell/sections/Hero";
import { Benefits } from "@/features/sell/sections/Benefits";
import { Process } from "@/features/sell/sections/Process";
import { SubmissionForm } from "@/features/sell/sections/SubmissionForm";
import { FAQ } from "@/features/sell/sections/FAQ";

export const metadata = createMetadata({
  title: "Sell Instagram Pages, YouTube Channels & Digital Assets | Axcrivo",
  description: "Sell your Instagram page, YouTube channel, Telegram group or newsletter in India. Verified buyers, professional valuations & secure escrow on Axcrivo.",
  ogImage: "/og-image-v3.png",
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
      <Hero />
      <Benefits />
      <Process />
      <SubmissionForm />
      <FAQ />
    </PageWrapper>
  );
}

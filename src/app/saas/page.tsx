import { Hero } from "@/features/saas/components/Hero";
import { ProductShowcase } from "@/features/saas/components/ProductShowcase";
import { Metrics } from "@/features/saas/components/Metrics";
import { Features } from "@/features/saas/components/Features";
import { Testimonials } from "@/features/saas/components/Testimonials";
import { Pricing } from "@/features/saas/components/Pricing";
import { FAQ } from "@/features/saas/components/FAQ";

export const metadata = {
  title: "NexAI | Next-Gen AI Workflows",
  description: "Deploy intelligent agents, automate complex data pipelines, and scale your operations.",
};

export default function SaasLandingPage() {
  return (
    <main className="flex-1 flex flex-col bg-[#0B0F19] text-white selection:bg-blue-500/30">
      <Hero />
      <ProductShowcase />
      <Metrics />
      <Features />
      <Testimonials />
      <Pricing />
      <FAQ />
    </main>
  );
}

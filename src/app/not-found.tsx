import Link from "next/link";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTAButton } from "@/components/ui/CTAButton";

export default function NotFound() {
  return (
    <PageWrapper>
      <SectionWrapper className="flex-1 flex flex-col justify-center items-center py-20">
        <div className="text-center max-w-md mx-auto">
          <div className="text-9xl font-bold text-muted mb-6">404</div>
          <SectionHeading 
            title="Page not found" 
            subtitle="The page you are looking for doesn't exist or has been moved."
            centered
          />
          <div className="mt-8">
            <CTAButton href="/">
              Return Home
            </CTAButton>
          </div>
        </div>
      </SectionWrapper>
    </PageWrapper>
  );
}

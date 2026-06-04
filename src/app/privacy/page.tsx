import { createMetadata } from "@/lib/seo";
import { PageWrapper } from "@/components/layout/PageWrapper";

export const metadata = createMetadata({
  title: "Privacy Policy",
  description: "Read Creovia's privacy policy to understand how we collect, use, and protect your personal data.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <PageWrapper>
      <main className="max-w-3xl mx-auto px-[20px] md:px-[64px] py-16 md:py-24">
        <h1 className="font-headline-xl text-on-surface font-bold mb-4">Privacy Policy</h1>
        <p className="text-on-surface-variant text-sm mb-10">Last updated: June 2025</p>

        <div className="space-y-10 text-on-surface-variant leading-relaxed">
          <section>
            <h2 className="font-headline-sm text-on-surface mb-3">1. Information We Collect</h2>
            <p>
              When you submit a valuation request, seller listing, or buyer inquiry on Creovia, we collect personal information including your name, email address, phone number, and details about the digital asset you are buying or selling. We use this data solely to facilitate the transaction process and connect buyers with sellers.
            </p>
          </section>

          <section>
            <h2 className="font-headline-sm text-on-surface mb-3">2. How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>To contact you regarding your submission or inquiry</li>
              <li>To match buyers and sellers based on stated preferences</li>
              <li>To improve our platform and services</li>
              <li>To send relevant updates (with your consent)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-headline-sm text-on-surface mb-3">3. Data Storage & Security</h2>
            <p>
              Your data is stored securely on Supabase infrastructure with industry-standard encryption. We do not sell, trade, or rent your personal information to third parties. All asset details and negotiations are treated as strictly confidential and protected under NDA where applicable.
            </p>
          </section>

          <section>
            <h2 className="font-headline-sm text-on-surface mb-3">4. Cookies & Analytics</h2>
            <p>
              We use Google Analytics and Microsoft Clarity to understand how users interact with our platform. These tools may set cookies on your browser. No personally identifiable information is shared with these analytics providers. You can opt out of analytics tracking by using a browser extension or adjusting your browser settings.
            </p>
          </section>

          <section>
            <h2 className="font-headline-sm text-on-surface mb-3">5. Third-Party Services</h2>
            <p>
              We use the following third-party services to operate our platform: Supabase (database), Vercel (hosting), Resend (email delivery), Google Analytics, and Microsoft Clarity. Each of these providers maintains their own privacy policies.
            </p>
          </section>

          <section>
            <h2 className="font-headline-sm text-on-surface mb-3">6. Your Rights</h2>
            <p>
              You have the right to access, correct, or delete your personal data at any time. To exercise these rights, please contact us at the email address below.
            </p>
          </section>

          <section>
            <h2 className="font-headline-sm text-on-surface mb-3">7. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at{" "}
              <a href="mailto:privacy@creovia.in" className="text-primary hover:underline">
                privacy@creovia.in
              </a>
            </p>
          </section>
        </div>
      </main>
    </PageWrapper>
  );
}

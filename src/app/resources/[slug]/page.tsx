import { RESOURCES } from "@/content/resources";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { TableOfContents } from "@/features/resources/components/TableOfContents";

// Generate static routes at build time for all resources
export function generateStaticParams() {
  return RESOURCES.map((resource) => ({
    slug: resource.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const decodedSlug = decodeURIComponent(resolvedParams.slug);
  
  const cleanSlug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
  const resource = RESOURCES.find((r) => cleanSlug(r.slug) === cleanSlug(decodedSlug));
  
  if (!resource) return { title: "Resource Not Found" };

  return {
    title: `${resource.title} | Axcrivo Resources`,
    description: resource.description,
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const decodedSlug = decodeURIComponent(resolvedParams.slug);

  const cleanSlug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
  const resource = RESOURCES.find((r) => cleanSlug(r.slug) === cleanSlug(decodedSlug));

  if (!resource) {
    notFound();
  }

  // 1. Parse headings for Table of Contents
  const headings = resource.content
    .split("\n")
    .filter((line) => line.startsWith("## ") || line.startsWith("### "))
    .map((line) => {
      const depth = line.startsWith("### ") ? 3 : 2;
      const text = line.replace(/^###?\s+/, "").trim();
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      return { depth, text, id };
    });

  // 2. Custom Markdown rendering to assign IDs to headers
  const markdownComponents = {
    h2: ({ children, ...props }: any) => {
      const text = children?.toString() || "";
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      return <h2 id={id} {...props} className="font-headline-md text-headline-md text-on-surface mt-10 mb-4">{children}</h2>;
    },
    h3: ({ children, ...props }: any) => {
      const text = children?.toString() || "";
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      return <h3 id={id} {...props} className="font-headline-sm text-headline-sm text-on-surface mt-8 mb-3">{children}</h3>;
    },
  };

  // 3. Dynamic Key Takeaways based on category
  const getTakeaways = (category: string) => {
    switch (category) {
      case "Valuation Guides":
        return [
          "Standard multiples range from 2x to 4.5x annual profit for verified accounts.",
          "Engagement rate (ER) above 3.5% triggers a valuation premium of 20% or more.",
          "Tier-1 geography (US/UK/CA) remains the strongest driver of CPM and asset price.",
          "Niche specialization in Fintech or B2B SaaS doubles typical asset value."
        ];
      case "Buying Guides":
        return [
          "Always transact using a secure escrow service like Axcrivo to protect funds.",
          "Verify the Original Email (OG Email) to ensure the seller cannot recover the account.",
          "Request screen recordings (not screenshots) of live analytics to verify true metrics.",
          "Perform a comprehensive due diligence audit covering legal rights and copyright status."
        ];
      case "Selling Guides":
        return [
          "Document clean trailing 12-month financials via Stripe, bank statements, or PayPal.",
          "Create Standard Operating Procedures (SOPs) to prove operations are turnkey.",
          "Establish long-term brand sponsor contracts to significantly boost exit multiples.",
          "Clean up any artificially inflated engagement metrics before listing the asset."
        ];
      case "Insights":
      case "News":
      default:
        return [
          "Creator economy assets are priced on SDE multiples and cash-flow predictability.",
          "Algorithmic dependencies can be mitigated by building evergreen search traffic.",
          "Owned channels (email newsletters, SMS lists) command a higher valuation premium.",
          "Deal transitions must include documented handover protocols for smooth operations."
        ];
    }
  };

  const takeaways = getTakeaways(resource.category);

  // 4. Fetch 4 related resources
  const relatedResources = RESOURCES
    .filter((r) => r.category === resource.category && r.slug !== resource.slug)
    .slice(0, 4);

  if (relatedResources.length < 4) {
    const extra = RESOURCES
      .filter((r) => r.slug !== resource.slug && !relatedResources.find((x) => x.slug === r.slug))
      .slice(0, 4 - relatedResources.length);
    relatedResources.push(...extra);
  }

  return (
    <PageWrapper>
      <div className="pt-28 pb-16 bg-surface text-on-surface min-h-screen">
        {/* Minimal Hero */}
        <section className="max-w-4xl mx-auto px-margin-mobile md:px-0 mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Link href="/resources" className="flex items-center gap-1 text-primary font-label-md text-label-md hover:underline">
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Back to Resources
            </Link>
            <span className="h-4 w-px bg-outline-variant/50"></span>
            <span className="px-3 py-1 bg-primary/10 text-primary border border-primary-container/20 rounded-full font-label-sm text-label-sm">
              {resource.category}
            </span>
            <span className="text-on-surface-variant font-label-sm text-label-sm">
              {resource.readTime}
            </span>
            <span className="text-on-surface-variant font-label-sm text-label-sm">•</span>
            <span className="text-on-surface-variant font-label-sm text-label-sm">
              Updated {new Date(resource.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
          
          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-4 tracking-tight leading-[1.1]">
            {resource.title}
          </h1>
          
          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed max-w-3xl">
            {resource.description}
          </p>
        </section>

        {/* Executive Summary Card (Key Takeaways) */}
        <section className="max-w-4xl mx-auto px-margin-mobile md:px-0 mb-12">
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-6 md:p-8 shadow-sm">
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">lightbulb</span>
              Key Takeaways
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {takeaways.map((takeaway, idx) => (
                <li key={idx} className="flex gap-2">
                  <span className="material-symbols-outlined text-secondary shrink-0">check_circle</span>
                  <p className="font-body-md text-body-md text-on-surface-variant">{takeaway}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Main Content Area */}
        <section className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar / Table of Contents */}
          <aside className="lg:col-span-3 order-2 lg:order-1">
            <div className="sticky top-28 space-y-8">
              {headings.length > 0 && (
                <div>
                  <h4 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest mb-4">Table of Contents</h4>
                  <TableOfContents headings={headings} />
                </div>
              )}
              {/* Sidebar CTA */}
              <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/20">
                <span className="material-symbols-outlined text-primary mb-4 text-3xl">query_stats</span>
                <h5 className="font-headline-sm text-headline-sm text-on-surface mb-2">Free Valuation</h5>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6">Get a precise estimate of your account's market value in 60 seconds.</p>
                <Link href="/valuation" className="block text-center w-full bg-primary text-on-primary py-3 rounded-xl font-label-md text-label-md shadow-lg shadow-primary/20 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(0,63,216,0.3)] transition-all duration-300">
                  Start Now
                </Link>
              </div>
            </div>
          </aside>

          {/* Article Content */}
          <div className="lg:col-span-9 order-1 lg:order-2 space-y-12">
            <article className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-headline-sm prose-headings:text-on-surface prose-p:text-on-surface-variant prose-p:font-body-md prose-p:leading-relaxed prose-a:text-primary prose-strong:text-on-surface">
              <ReactMarkdown components={markdownComponents}>{resource.content}</ReactMarkdown>
            </article>
          </div>
        </section>

        {/* Related Resources */}
        <section className="bg-surface-container-low mt-20 py-16">
          <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="flex justify-between items-end mb-8">
              <h3 className="font-headline-md text-headline-md text-on-surface">Further Insights</h3>
              <Link href="/resources" className="text-primary font-label-md text-label-md hover:underline flex items-center gap-1">
                View All Guides <span className="material-symbols-outlined text-sm">open_in_new</span>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedResources.map((related) => (
                <Link key={related.id} href={`/resources/${related.slug}`} className="group bg-surface-container-lowest rounded-2xl border border-outline-variant/20 overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1 flex flex-col h-full">
                  <div className="aspect-video relative overflow-hidden">
                    <Image 
                      src={related.thumbnail} 
                      alt={related.title} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <span className="text-primary font-label-sm text-label-sm uppercase mb-2 block">{related.category}</span>
                    <h4 className="font-headline-sm text-[18px] text-on-surface leading-tight mb-2 group-hover:text-primary transition-colors">{related.title}</h4>
                    <p className="font-body-md text-sm text-on-surface-variant line-clamp-2 mt-auto">{related.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-16">
          <div className="bg-on-surface rounded-[2rem] p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "40px 40px" }}></div>
            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-surface leading-tight">Know What Your Creator Asset Is Worth</h2>
              <p className="font-body-lg text-body-lg text-surface-variant/80">
                Stop guessing and start negotiating with confidence. Use our proprietary data engine to get an enterprise-grade valuation of your social media property.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/valuation" className="bg-primary text-on-primary px-10 py-4 rounded-xl font-label-md text-label-md hover:scale-105 transition-all shadow-xl shadow-primary/20">
                  Get Free Valuation
                </Link>
                <Link href="/about" className="bg-transparent border border-surface-variant/30 text-surface px-10 py-4 rounded-xl font-label-md text-label-md hover:bg-surface/10 transition-all">
                  Speak to an Advisor
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
}

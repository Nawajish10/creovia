"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { RESOURCES, CATEGORIES } from "@/content/resources";
import { submitNewsletterSubscriber } from "@/app/actions/leads";

const POPULAR_TOPICS = [
  { name: "Instagram Valuation", slug: "instagram-valuation-guide" },
  { name: "YouTube Multiples", slug: "youtube-multiples-explained" },
  { name: "Letter of Intent (LOI)", slug: "letter-of-intent-loi-creator-asset-acquisitions" },
  { name: "Due Diligence", slug: "creator-asset-due-diligence-checklist" },
  { name: "EBITDA Analysis", slug: "ebitda-analysis-for-digital-businesses" },
  { name: "Creator IP Rights", slug: "creator-intellectual-property-rights" },
  { name: "Telegram Valuation", slug: "telegram-channel-valuation-guide" },
  { name: "WhatsApp Valuation", slug: "whatsapp-community-valuation-guide" },
  { name: "Website Acquisition", slug: "website-acquisition-framework" },
  { name: "Social Media Buying", slug: "social-media-account-buying-guide" }
];

export function ResourceHub() {
  const [activeCategory, setActiveCategory] = useState("All Resources");
  const [searchQuery, setSearchQuery] = useState("");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Focus search input on Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Filter resources based on query and active category
  const filteredResources = RESOURCES.filter((resource) => {
    const matchesCategory =
      activeCategory === "All Resources" || resource.category === activeCategory;
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      resource.title.toLowerCase().includes(searchLower) ||
      resource.description.toLowerCase().includes(searchLower) ||
      resource.category.toLowerCase().includes(searchLower);

    return matchesCategory && matchesSearch;
  });

  // Find featured article
  const featuredResource = RESOURCES.find((r) => r.featured);
  // Show featured banner only when category is "All Resources" and search is empty
  const showFeatured =
    activeCategory === "All Resources" && searchQuery === "" && featuredResource;

  // Exclude featured resource from grid to prevent double display
  const gridResources = showFeatured
    ? filteredResources.filter((r) => r.id !== featuredResource?.id)
    : filteredResources;

  // Only show topics that have at least one article
  const activeTopics = POPULAR_TOPICS.filter((topic) =>
    RESOURCES.some((r) => r.slug === topic.slug)
  );

  // Show only categories that have at least one resource, plus All Resources
  const activeCategories = CATEGORIES.filter((category) => {
    if (category === "All Resources") return true;
    return RESOURCES.some((r) => r.category === category);
  });

  const handleSubscribeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    if (email.trim()) {
      const res = await submitNewsletterSubscriber(email, "resource_hub");
      if (res.success) {
        setSubscribed(true);
        setEmail("");
        setTimeout(() => setSubscribed(false), 5000);
      } else {
        setErrorMsg(res.error || "Failed to subscribe.");
      }
    }
  };

  return (
    <div className="pt-2 md:pt-6 pb-8 md:pb-16 px-4 md:px-[64px] w-full max-w-screen-2xl mx-auto" style={{ overflowX: "hidden" }}>
      {/* Section 1: Compact Hero */}
      <section className="mb-4 md:mb-12">
        {/* Title + description */}
        <div className="w-full min-w-0 mb-4">
          <h2
            className="text-on-surface mb-2 break-words w-full min-w-0"
            style={{
              fontFamily: "var(--font-hanken)",
              fontSize: "clamp(20px, 5vw, 36px)",
              lineHeight: "1.25",
              fontWeight: 700,
              letterSpacing: "-0.01em",
              wordBreak: "break-word",
              overflowWrap: "anywhere",
            }}
          >
            Social Pages &amp; Digital Assets Intelligence
          </h2>
          <p
            className="text-on-surface-variant leading-relaxed"
            style={{ fontSize: "clamp(13px, 3.2vw, 16px)", lineHeight: "1.55" }}
          >
            Research, valuation frameworks, market insights, and practical guides to navigating the institutional creator economy.
          </p>
        </div>
        {/* Stats row — on mobile: single row, equal width columns */}
        <div className="grid grid-cols-3 gap-2 bg-surface-container rounded-xl p-3 border border-outline-variant/20">
          <div className="text-center">
            <div className="font-headline-sm text-primary" style={{ fontSize: "clamp(18px, 4vw, 24px)", fontWeight: 700 }}>{RESOURCES.length}+</div>
            <div className="text-on-surface-variant uppercase tracking-wider" style={{ fontSize: "10px" }}>Resources</div>
          </div>
          <div className="text-center border-x border-outline-variant/30">
            <div className="font-headline-sm text-primary" style={{ fontSize: "clamp(18px, 4vw, 24px)", fontWeight: 700 }}>{activeCategories.length - 1}</div>
            <div className="text-on-surface-variant uppercase tracking-wider" style={{ fontSize: "10px" }}>Categories</div>
          </div>
          <div className="text-center">
            <div className="font-headline-sm text-primary" style={{ fontSize: "clamp(18px, 4vw, 24px)", fontWeight: 700 }}>Weekly</div>
            <div className="text-on-surface-variant uppercase tracking-wider" style={{ fontSize: "10px" }}>Updates</div>
          </div>
        </div>
      </section>

      {/* Section 2: Search */}
      <section className="mb-4 md:mb-12">
        <div className="relative w-full">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline" style={{ fontSize: "20px" }}>
            search
          </span>
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search guides..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl py-3.5 pl-10 pr-4 md:pr-24 text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all"
            style={{ fontSize: "15px" }}
            suppressHydrationWarning
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 items-center gap-1 pointer-events-none hidden sm:flex">
            <kbd className="px-2 py-1 bg-surface-container-high text-on-surface-variant rounded text-[10px] border border-outline-variant/30">Ctrl</kbd>
            <kbd className="px-2 py-1 bg-surface-container-high text-on-surface-variant rounded text-[10px] border border-outline-variant/30">K</kbd>
          </div>
        </div>
      </section>

      {/* Section 3: Featured Research */}
      {showFeatured && featuredResource && (
        <section className="mb-5 md:mb-12">
          <div className="group relative bg-surface-container-lowest border border-outline-variant/20 rounded-2xl overflow-hidden flex flex-col shadow-sm hover:shadow-lg transition-all duration-300">
            {/* Image — compact on mobile */}
            <Link href={`/resources/${featuredResource.slug}`} className="w-full overflow-hidden relative" style={{ height: "clamp(140px, 35vw, 220px)" }}>
              <Image
                src={featuredResource.thumbnail}
                alt={featuredResource.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                priority
              />
            </Link>
            {/* Content */}
            <div className="p-4 md:p-8 flex flex-col">
              <div className="inline-flex items-center gap-1.5 bg-secondary-container/20 text-on-secondary-container px-2.5 py-0.5 rounded-full w-fit mb-2 md:mb-4">
                <span className="material-symbols-outlined text-secondary" style={{ fontSize: "14px", fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                <span className="uppercase tracking-wider font-bold" style={{ fontSize: "10px" }}>Featured Intelligence</span>
              </div>
              <Link href={`/resources/${featuredResource.slug}`}>
                <h3
                  className="mb-2 md:mb-3 leading-snug group-hover:text-primary transition-colors"
                  style={{ fontFamily: "var(--font-hanken)", fontSize: "clamp(16px, 4vw, 22px)", fontWeight: 600, lineHeight: "1.3" }}
                >
                  {featuredResource.title}
                </h3>
              </Link>
              <p className="text-on-surface-variant line-clamp-2 mb-3" style={{ fontSize: "13px", lineHeight: "1.5" }}>
                {featuredResource.description}
              </p>
              <div className="flex items-center gap-4 mb-3 text-outline" style={{ fontSize: "12px" }}>
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>schedule</span>
                  <span>{featuredResource.readTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>person</span>
                  <span>{featuredResource.author}</span>
                </div>
              </div>
              <Link
                href={`/resources/${featuredResource.slug}`}
                className="flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all w-fit"
                style={{ fontSize: "14px" }}
              >
                Read Full Research <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>arrow_forward</span>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Section 4: Category Navigation */}
      <section className="mb-4 md:mb-8 overflow-x-auto hide-scrollbar whitespace-nowrap mask-linear-fade">
        <div className="flex gap-2 pb-2">
          {activeCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 md:px-6 md:py-2.5 rounded-full font-label-md text-[13px] md:text-label-md transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === category
                  ? "bg-primary text-on-primary shadow-md"
                  : "bg-surface-container-high text-on-surface-variant hover:bg-outline-variant/30 transition-colors"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Section 5: Popular Topics */}
      <section className="mb-6 md:mb-12 bg-surface-container-low/50 p-4 md:p-6 rounded-2xl md:rounded-3xl border border-outline-variant/10">
        <h3 className="font-label-sm text-[11px] md:text-label-sm text-on-surface-variant uppercase tracking-widest mb-3 md:mb-4">Popular Topics</h3>
        <div className="flex flex-wrap gap-1.5 md:gap-2">
          {activeTopics.map((topic) => (
            <Link
              key={topic.slug}
              href={`/resources/${topic.slug}`}
              className="px-3 py-1.5 md:px-4 md:py-2 bg-surface-container-lowest border border-outline-variant/30 rounded-lg font-body-md text-sm md:text-body-md hover:border-primary hover:text-primary transition-all shadow-sm cursor-pointer inline-flex items-center"
              style={{ minHeight: "unset" }}
            >
              {topic.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Section 6: Resource Grid */}
      {gridResources.length > 0 ? (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-16">
          {gridResources.map((resource) => (
            <article
              key={resource.id}
              className="group bg-surface-container-lowest border border-outline-variant/20 rounded-xl overflow-hidden hover:shadow-lg transition-all flex flex-col h-full"
            >
              <Link href={`/resources/${resource.slug}`} className="h-40 md:h-48 overflow-hidden relative block">
                <Image
                  src={resource.thumbnail}
                  alt={resource.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </Link>
              <div className="p-4 md:p-6 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-3 md:mb-4">
                  <span className="font-label-sm text-[11px] md:text-[12px] text-primary uppercase font-bold">
                    {resource.category}
                  </span>
                  <span className="font-label-sm text-[12px] text-outline">
                    {new Date(resource.publishDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                
                <Link href={`/resources/${resource.slug}`}>
                  <h3 className="font-headline-sm text-title-medium md:text-headline-sm mb-2 md:mb-3 group-hover:text-primary transition-colors leading-snug">
                    {resource.title}
                  </h3>
                </Link>
                
                <p className="font-body-md text-sm md:text-body-md text-on-surface-variant line-clamp-3 mb-4 md:mb-6">
                  {resource.description}
                </p>
                
                <div className="mt-auto pt-3 md:pt-4 flex items-center justify-between border-t border-outline-variant/10 text-outline">
                  <span className="font-label-sm text-[11px] md:text-[12px]">{resource.readTime}</span>
                  <Link href={`/resources/${resource.slug}`} className="text-primary hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-[18px] md:text-[20px]">open_in_new</span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </section>
      ) : (
        /* Empty State */
        <section className="py-20 text-center flex flex-col items-center justify-center bg-surface-container border border-outline-variant/30 rounded-2xl border-dashed mb-16">
          <div className="w-16 h-16 bg-surface-container-high rounded-full flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-outline text-3xl">search_off</span>
          </div>
          <h3 className="font-headline-sm text-on-surface mb-2">No resources found</h3>
          <p className="font-body-md text-on-surface-variant max-w-md mx-auto mb-6">
            We couldn&apos;t find any resources matching &ldquo;{searchQuery}&rdquo;. Try adjusting your filters or search term.
          </p>
          <button
            onClick={() => {
              setActiveCategory("All Resources");
              setSearchQuery("");
            }}
            className="px-6 py-2 bg-primary text-on-primary font-label-md rounded-full hover:opacity-95 transition-opacity"
          >
            Clear Filters
          </button>
        </section>
      )}

      {/* Section 7: Newsletter */}
      <section className="mb-8 md:mb-16 bg-inverse-surface rounded-2xl md:rounded-[2rem] p-6 md:p-12 text-white relative overflow-hidden">
        {/* Decorative background pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg height="100%" preserveAspectRatio="none" viewBox="0 0 100 100" width="100%">
            <pattern height="10" id="grid" patternUnits="userSpaceOnUse" width="10">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"></path>
            </pattern>
            <rect fill="url(#grid)" height="100" width="100"></rect>
          </svg>
        </div>
        <div className="relative z-10 max-w-2xl">
          <h2 className="font-headline-md text-title-large md:text-headline-md mb-2">Stay Ahead of the Creator Economy</h2>
          <p className="font-body-md text-sm md:text-body-md text-surface-variant/80 mb-4 md:mb-6">
            Get institutional-grade market intelligence, acquisition alerts, and valuation trends delivered to your inbox weekly.
          </p>
          {subscribed ? (
            <div className="bg-primary/20 border border-primary/50 text-white rounded-xl p-4 font-semibold text-center max-w-md animate-fade-in">
              🎉 Thank you for subscribing! Keep an eye on your inbox.
            </div>
          ) : (
            <div className="flex flex-col gap-2 max-w-md">
              <form onSubmit={handleSubscribeSubmit} className="flex flex-col md:flex-row gap-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 flex-1 text-white font-body-md placeholder:text-white/40 focus:bg-white/20 focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                  placeholder="professional@email.com"
                  suppressHydrationWarning
                />
                <button
                  type="submit"
                  className="bg-primary text-on-primary font-bold px-8 py-3 rounded-lg hover:opacity-95 active:scale-98 transition-all cursor-pointer"
                >
                  Subscribe
                </button>
              </form>
              {errorMsg && (
                <p className="text-red-400 text-xs font-medium pl-2">{errorMsg}</p>
              )}
            </div>
          )}
          <p className="font-label-sm text-[11px] text-white/40 mt-4">
            No spam. Only high-signal research. Unsubscribe at any time.
          </p>
        </div>
      </section>

      {/* Section 8: Final CTA */}
      <section className="text-center py-8 md:py-16 border-t border-outline-variant/30">
        <h2 className="font-headline-md text-title-large md:text-display-lg mb-2 md:mb-4 tracking-tight">
          Want To Know What Your Social Pages & Digital Assets Is Worth?
        </h2>
        <p className="font-body-lg text-sm md:text-body-lg text-on-surface-variant mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed">
          Use our proprietary valuation engine to get a baseline estimate of your brand&apos;s market value in under 2 minutes.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
          <Link
            href="/valuation"
            className="bg-primary text-on-primary px-6 py-3.5 md:px-10 md:py-4 rounded-xl font-headline-sm text-[16px] md:text-[18px] font-semibold shadow-xl shadow-primary/20 hover:scale-105 active:scale-98 transition-all text-center"
          >
            Get Free Valuation
          </Link>
          <Link
            href="/resources"
            onClick={(e) => {
              e.preventDefault();
              setActiveCategory("Insights");
              window.scrollTo({ top: 350, behavior: "smooth" });
            }}
            className="bg-surface-container-lowest text-primary border border-primary/20 px-6 py-3.5 md:px-10 md:py-4 rounded-xl font-headline-sm text-[16px] md:text-[18px] font-semibold hover:bg-surface-container active:scale-98 transition-all text-center"
          >
            View Market Data
          </Link>
        </div>
      </section>
    </div>
  );
}

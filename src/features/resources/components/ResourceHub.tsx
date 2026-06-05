"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { RESOURCES, CATEGORIES } from "@/content/resources";
import { submitNewsletterSubscriber } from "@/app/actions/leads";

const POPULAR_TOPICS = [
  "Instagram Valuation",
  "YouTube Multiples",
  "Letter of Intent (LOI)",
  "Due Diligence",
  "EBITDA Analysis",
  "Creator IP Rights"
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

  // Popular topics click handler
  const handleTopicClick = (topic: string) => {
    setSearchQuery(topic);
    setActiveCategory("All Resources");
    searchInputRef.current?.focus();
  };

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
    <div className="pt-4 md:pt-6 pb-8 md:pb-16 px-margin-mobile md:px-margin-desktop max-w-screen-2xl mx-auto">
      {/* Section 1: Compact Hero */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 md:gap-6 mb-6 md:mb-12">
        <div className="max-w-3xl">
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-2 md:mb-3 tracking-tight">
            Social Pages & Digital Assets Intelligence
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
            Research, valuation frameworks, market insights, and practical guides to navigating the institutional creator economy.
          </p>
        </div>
        
        <div className="flex gap-3 md:gap-6 bg-surface-container rounded-xl p-3 md:p-4 border border-outline-variant/20 shrink-0 w-full md:w-auto">
          <div className="text-center flex-1 md:flex-initial">
            <div className="font-headline-sm text-headline-sm text-primary">{RESOURCES.length}+</div>
            <div className="font-label-sm text-[10px] md:font-label-sm text-on-surface-variant uppercase tracking-wider">Resources</div>
          </div>
          <div className="w-[1px] h-8 md:h-10 bg-outline-variant/30 self-center"></div>
          <div className="text-center flex-1 md:flex-initial">
            <div className="font-headline-sm text-headline-sm text-primary">{CATEGORIES.length - 1}</div>
            <div className="font-label-sm text-[10px] md:font-label-sm text-on-surface-variant uppercase tracking-wider">Categories</div>
          </div>
          <div className="w-[1px] h-8 md:h-10 bg-outline-variant/30 self-center"></div>
          <div className="text-center flex-1 md:flex-initial">
            <div className="font-headline-sm text-headline-sm text-primary">Weekly</div>
            <div className="font-label-sm text-[10px] md:font-label-sm text-on-surface-variant uppercase tracking-wider">Updates</div>
          </div>
        </div>
      </section>

      {/* Section 2: Search Experience */}
      <section className="mb-6 md:mb-12">
        <div className="relative max-w-4xl font-body-md">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline">
            search
          </span>
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search guides..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl py-4 pl-12 pr-24 font-body-md text-body-md focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all"
            suppressHydrationWarning
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1 pointer-events-none hidden sm:flex">
            <kbd className="px-2 py-1 bg-surface-container-high text-on-surface-variant rounded font-label-sm text-[10px] border border-outline-variant/30">
              Ctrl
            </kbd>
            <kbd className="px-2 py-1 bg-surface-container-high text-on-surface-variant rounded font-label-sm text-[10px] border border-outline-variant/30">
              K
            </kbd>
          </div>
        </div>
      </section>

      {/* Section 3: Featured Research (Only shown under All Categories / No Search) */}
      {showFeatured && featuredResource && (
        <section className="mb-6 md:mb-12">
          <div className="group relative bg-surface-container-lowest border border-outline-variant/20 rounded-2xl md:rounded-[2rem] overflow-hidden flex flex-col md:flex-row shadow-sm hover:shadow-xl transition-all duration-500">
            <Link href={`/resources/${featuredResource.slug}`} className="md:w-1/2 h-48 md:h-auto overflow-hidden relative min-h-[200px] md:min-h-[250px]">
              <Image
                src={featuredResource.thumbnail}
                alt={featuredResource.title}
                fill
                className="object-cover group-hover:scale-102 transition-transform duration-700"
                priority
              />
            </Link>
            <div className="md:w-1/2 p-5 md:p-8 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 bg-secondary-container/20 text-on-secondary-container px-2.5 py-0.5 md:px-3 md:py-1 rounded-full w-fit mb-3 md:mb-4">
                <span className="material-symbols-outlined text-[16px] text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
                  auto_awesome
                </span>
                <span className="font-label-sm text-[10px] font-bold uppercase tracking-wider">Featured Intelligence</span>
              </div>
              
              <Link href={`/resources/${featuredResource.slug}`}>
                <h2 className="font-headline-md text-title-large md:text-headline-lg mb-2 md:mb-4 leading-tight group-hover:text-primary transition-colors">
                  {featuredResource.title}
                </h2>
              </Link>
              
              <p className="font-body-md text-sm md:text-body-md text-on-surface-variant mb-4 md:mb-6 line-clamp-3">
                {featuredResource.description}
              </p>
              
              <div className="flex items-center gap-6 mb-4 md:mb-8 text-outline">
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">schedule</span>
                  <span className="font-label-sm text-[12px]">{featuredResource.readTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">person</span>
                  <span className="font-label-sm text-[12px]">{featuredResource.author}</span>
                </div>
              </div>
              
              <Link
                href={`/resources/${featuredResource.slug}`}
                className="flex items-center gap-2 text-primary font-bold font-body-md hover:translate-x-2 transition-transform w-fit"
              >
                Read Full Research <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Section 4: Category Navigation */}
      <section className="mb-4 md:mb-8 overflow-x-auto hide-scrollbar whitespace-nowrap mask-linear-fade">
        <div className="flex gap-2 pb-2">
          {CATEGORIES.map((category) => (
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
          {POPULAR_TOPICS.map((topic) => (
            <button
              key={topic}
              onClick={() => handleTopicClick(topic)}
              className={`px-3 py-1.5 md:px-4 md:py-2 bg-surface-container-lowest border border-outline-variant/30 rounded-lg font-body-md text-sm md:text-body-md hover:border-primary hover:text-primary transition-all shadow-sm cursor-pointer ${
                searchQuery === topic ? "border-primary text-primary ring-1 ring-primary" : ""
              }`}
            >
              {topic}
            </button>
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

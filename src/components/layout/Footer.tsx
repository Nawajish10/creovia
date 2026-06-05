"use client";

import { useState } from "react";
import Link from "next/link";
import { submitNewsletterSubscriber } from "@/app/actions/leads";

interface SocialLink {
  platform: string;
  url: string;
  svg: React.ReactNode;
}

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // Social Links config - empty strings will be dynamically hidden
  const SOCIAL_LINKS: SocialLink[] = [
    {
      platform: "LinkedIn",
      url: "https://linkedin.com/company/axcrivo",
      svg: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      )
    },
    {
      platform: "X",
      url: "https://x.com/axcrivo",
      svg: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      )
    },
    {
      platform: "Instagram",
      url: "", // Empty to demonstrate hiding capability
      svg: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0 3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      )
    },
    {
      platform: "YouTube",
      url: "", // Empty to demonstrate hiding capability
      svg: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      )
    }
  ];

  const [errorMsg, setErrorMsg] = useState("");

  const handleSubscribeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    if (email.trim()) {
      const res = await submitNewsletterSubscriber(email, "footer");
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
    <footer className="w-full flex flex-col mt-auto bg-surface-container-lowest text-on-surface">
      {/* SECTION 1: PRE-FOOTER CTA */}
      <section className="bg-surface py-6 md:py-12 px-margin-mobile md:px-margin-desktop border-t border-outline-variant/30">
        <div className="max-w-container-max mx-auto bg-gradient-to-br from-primary/10 via-background to-primary/5 rounded-2xl md:rounded-[2rem] p-6 md:p-12 border border-outline-variant/30 relative overflow-hidden shadow-sm">
          <div className="absolute right-0 bottom-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 md:gap-8">
            <div className="max-w-2xl space-y-2 md:space-y-3">
              <h2 className="font-headline-xl text-headline-lg md:text-headline-xl text-text-primary tracking-tight leading-tight">
                Know What Your Creator Asset Is Worth?
              </h2>
              <p className="font-body-md md:font-body-lg text-on-surface-variant leading-relaxed">
                Get a professional valuation for your Instagram page, YouTube channel, Telegram community, newsletter, or digital audience.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 shrink-0 w-full lg:w-auto">
              <Link href="/valuation" className="bg-primary text-on-primary px-6 md:px-8 py-3 md:py-4 rounded-xl font-label-md text-label-md hover:opacity-95 text-center transition-all shadow-md shadow-primary/20 active:scale-98">
                Get Free Valuation
              </Link>
              <Link href="/sell" className="bg-white text-text-primary border border-outline-variant/30 px-6 md:px-8 py-3 md:py-4 rounded-xl font-label-md text-label-md hover:bg-surface-container-low text-center transition-all active:scale-98">
                Sell Your Asset
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: MARKETPLACE TRUST BAR */}
      <section className="bg-surface-container-low/30 border-t border-outline-variant/30 py-5 md:py-8 px-margin-mobile md:px-margin-desktop">
        <div className="max-w-container-max mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {[
            { icon: "monitoring", title: "Market-Based Valuation", desc: "Real-time comparables and multiples." },
            { icon: "menu_book", title: "Creator Economy Research", desc: "Data-driven reports & frameworks." },
            { icon: "verified", title: "Verified Opportunities", desc: "100% verified metrics & analytics." },
            { icon: "lock", title: "Secure Data Handling", desc: "Protected due diligence & escrow." }
          ].map((item, idx) => (
            <div key={idx} className="flex gap-3 md:gap-4 p-3 md:p-4 bg-white rounded-2xl border border-outline-variant/20 shadow-sm hover:shadow-md transition-shadow">
              <span className="material-symbols-outlined text-primary text-3xl shrink-0 mt-0.5">{item.icon}</span>
              <div>
                <h4 className="font-headline-sm text-[16px] font-bold text-on-surface mb-0.5">{item.title}</h4>
                <p className="font-body-md text-[13px] text-on-surface-variant leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ENHANCED FOOTER CONTAINER */}
      <div className="border-t border-outline-variant/30 py-8 md:py-16 px-margin-mobile md:px-margin-desktop bg-surface-container-lowest">
        <div className="max-w-container-max mx-auto">
          {/* SECTION 4: NEWSLETTER SIGNUP */}
          <div className="border-b border-outline-variant/20 pb-6 mb-6 md:pb-12 md:mb-12 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="max-w-xl space-y-2">
              <h3 className="font-headline-sm text-lg md:text-headline-sm text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">mail</span>
                Stay Ahead of the Creator Economy
              </h3>
              <p className="font-body-md text-sm md:text-body-md text-on-surface-variant">
                Receive creator asset valuation insights, marketplace trends, and acquisition opportunities.
              </p>
            </div>
            {subscribed ? (
              <div className="bg-secondary-container/20 text-on-secondary-container border border-secondary-container/30 rounded-xl px-6 py-3 font-semibold text-center w-full lg:w-auto animate-fade-in">
                🎉 Thank you for subscribing! Keep an eye on your inbox.
              </div>
            ) : (
              <div className="flex flex-col gap-2 w-full lg:w-auto max-w-md">
                <form onSubmit={handleSubscribeSubmit} className="flex gap-2 w-full">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-surface-container border border-outline-variant/50 rounded-xl px-4 py-2.5 md:py-3 text-body-md placeholder:text-on-surface-variant/50 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none w-full lg:w-72"
                    placeholder="professional@email.com"
                    suppressHydrationWarning
                  />
                  <button type="submit" className="bg-primary text-on-primary px-6 py-2.5 md:py-3 rounded-xl font-label-md text-label-md hover:opacity-95 transition-all cursor-pointer">
                    Subscribe
                  </button>
                </form>
                {errorMsg && (
                  <p className="text-error text-xs font-medium pl-2">{errorMsg}</p>
                )}
              </div>
            )}
          </div>

          {/* SECTION 3: 4-COLUMN FOOTER LINKS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 md:gap-8 mb-6 md:mb-12">
            {/* COLUMN 1: Brand Section */}
            <div className="lg:col-span-4 flex flex-col gap-3 md:gap-4">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>grid_view</span>
                  <span className="font-headline-lg text-text-primary tracking-tight font-bold text-lg md:text-[22px]">Axcrivo</span>
                </div>
                <span className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-widest leading-none mt-1">
                  The Marketplace for Creator Assets
                </span>
              </div>
              <p className="font-body-md text-sm md:text-body-md text-on-surface-variant leading-relaxed">
                Buy, sell, and value digital audiences, creator communities, social channels, newsletters, and online media properties.
              </p>
              
              {/* SECTION 7: SOCIAL LINKS (Hide if URL is not configured) */}
              <div className="flex items-center gap-4 text-on-surface-variant mt-2">
                {SOCIAL_LINKS.map((social) => {
                  if (!social.url) return null;
                  return (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary transition-colors p-2 hover:bg-surface-container rounded-lg"
                      aria-label={social.platform}
                    >
                      {social.svg}
                    </a>
                  );
                })}
              </div>
            </div>

            {/* COLUMN 2: Marketplace */}
            <nav className="lg:col-span-2 flex flex-col gap-3 md:gap-4">
              <h4 className="font-label-md text-label-md font-bold text-on-surface uppercase tracking-widest text-[11px] md:text-[12px]">Marketplace</h4>
              <ul className="flex flex-col gap-1.5 md:gap-2.5">
                <li><Link href="/buy" className="text-on-surface-variant text-sm md:text-body-md hover:text-primary transition-colors py-0.5 block">Buy Assets</Link></li>
                <li><Link href="/sell" className="text-on-surface-variant text-sm md:text-body-md hover:text-primary transition-colors py-0.5 block">Sell Assets</Link></li>
                <li><Link href="/valuation" className="text-on-surface-variant text-sm md:text-body-md hover:text-primary transition-colors py-0.5 block">Get Valuation</Link></li>
                <li><Link href="/buy" className="text-on-surface-variant text-sm md:text-body-md hover:text-primary transition-colors py-0.5 block">Marketplace</Link></li>
                <li><Link href="/#how-it-works" className="text-on-surface-variant text-sm md:text-body-md hover:text-primary transition-colors py-0.5 block">How It Works</Link></li>
              </ul>
            </nav>

            {/* COLUMN 3: Resources */}
            <nav className="lg:col-span-3 flex flex-col gap-3 md:gap-4">
              <h4 className="font-label-md text-label-md font-bold text-on-surface uppercase tracking-widest text-[11px] md:text-[12px]">Resources</h4>
              <ul className="flex flex-col gap-1.5 md:gap-2.5">
                <li><Link href="/resources" className="text-on-surface-variant text-sm md:text-body-md hover:text-primary transition-colors py-0.5 block">Valuation Guides</Link></li>
                <li><Link href="/resources" className="text-on-surface-variant text-sm md:text-body-md hover:text-primary transition-colors py-0.5 block">Buying Guides</Link></li>
                <li><Link href="/resources" className="text-on-surface-variant text-sm md:text-body-md hover:text-primary transition-colors py-0.5 block">Selling Guides</Link></li>
                <li><Link href="/resources" className="text-on-surface-variant text-sm md:text-body-md hover:text-primary transition-colors py-0.5 block">Creator Economy Insights</Link></li>
                <li><Link href="/resources" className="text-on-surface-variant text-sm md:text-body-md hover:text-primary transition-colors py-0.5 block">News</Link></li>
              </ul>
            </nav>

            {/* COLUMN 4: Company */}
            <nav className="lg:col-span-3 flex flex-col gap-3 md:gap-4">
              <h4 className="font-label-md text-label-md font-bold text-on-surface uppercase tracking-widest text-[11px] md:text-[12px]">Company</h4>
              <ul className="flex flex-col gap-1.5 md:gap-2.5">
                <li><Link href="/about" className="text-on-surface-variant text-sm md:text-body-md hover:text-primary transition-colors py-0.5 block">About Us</Link></li>
                <li><a href="mailto:support@axcrivo.in" className="text-on-surface-variant text-sm md:text-body-md hover:text-primary transition-colors py-0.5 block">Contact</a></li>
                <li><Link href="/privacy" className="text-on-surface-variant text-sm md:text-body-md hover:text-primary transition-colors py-0.5 block">Privacy Policy</Link></li>
                <li><Link href="/privacy" className="text-on-surface-variant text-sm md:text-body-md hover:text-primary transition-colors py-0.5 block">Terms of Service</Link></li>
                <li><Link href="/privacy" className="text-on-surface-variant text-sm md:text-body-md hover:text-primary transition-colors py-0.5 block">Disclaimer</Link></li>
                <li><Link href="/admin" className="text-on-surface-variant text-sm md:text-body-md hover:text-primary transition-colors py-0.5 block">Admin</Link></li>
              </ul>
            </nav>
          </div>

          {/* SECTION 5: SUPPORTED ASSETS */}
          <div className="border-t border-outline-variant/10 pt-6 pb-2 mb-6 md:pt-8 md:pb-4 md:mb-8">
            <h4 className="font-label-md text-label-md font-bold text-on-surface uppercase tracking-widest text-[11px] md:text-[12px] mb-3 md:mb-4">Supported Creator Assets</h4>
            <div className="flex flex-wrap gap-1.5 md:gap-2">
              {[
                "Instagram Pages",
                "YouTube Channels",
                "Telegram Communities",
                "Facebook Pages",
                "WhatsApp Channels",
                "Newsletters",
                "Content Websites"
              ].map((asset, idx) => (
                <span
                  key={idx}
                  className="bg-surface-container-high text-on-surface-variant text-[11px] md:text-xs font-semibold px-2.5 py-1 md:px-3.5 md:py-1.5 rounded-full border border-outline-variant/30 hover:border-primary/30 transition-colors"
                >
                  {asset}
                </span>
              ))}
            </div>
          </div>

          {/* SECTION 6: LEGAL DISCLAIMER & COPYRIGHT */}
          <div className="border-t border-outline-variant/10 pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6">
            <p className="font-body-md text-xs text-outline leading-relaxed max-w-3xl">
              Axcrivo provides marketplace intelligence, valuation tools, and educational resources. Users are responsible for complying with the policies and terms of the platforms associated with their assets.
            </p>
            <span className="font-body-md text-xs text-on-surface-variant shrink-0">
              © 2026 Axcrivo. All rights reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/sell", label: "Sell" },
  { href: "/buy", label: "Buy" },
  { href: "/about", label: "About" },
  { href: "/resources", label: "Resources" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-outline-variant shadow-sm" style={{ backgroundColor: "rgba(251,248,255,0.85)" }}>
      <div className="flex justify-between items-center px-margin-mobile px-[20px] md:px-[64px] h-20 max-w-container-max mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <span
            className="material-symbols-outlined text-primary text-3xl"
            style={{ fontVariationSettings: "'FILL' 1", color: "#003fd8" }}
          >grid_view</span>
          <span
            className="font-headline-sm text-on-background tracking-tight"
            style={{ fontFamily: "var(--font-hanken)", fontSize: "20px", lineHeight: "28px", fontWeight: 700, color: "#191b24" }}
          >
            Axcrivo
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                pathname === link.href
                  ? "text-primary font-bold border-b-2 border-primary pb-1"
                  : "text-on-surface-variant font-medium hover:text-primary transition-colors duration-300"
              }
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "16px",
                lineHeight: "24px",
                color: pathname === link.href ? "#003fd8" : "#434656",
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <Link
          href="/valuation"
          className="hidden md:flex items-center bg-primary text-on-primary px-6 py-3 rounded-xl hover:opacity-90 transition-opacity shadow-sm"
          style={{
            backgroundColor: "#003fd8",
            color: "#ffffff",
            fontFamily: "var(--font-jetbrains)",
            fontSize: "12px",
            lineHeight: "16px",
            fontWeight: 500,
            borderRadius: "0.75rem",
          }}
        >
          Get Valuation
        </Link>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-on-surface"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span className="material-symbols-outlined">{mobileOpen ? "close" : "menu"}</span>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-outline-variant" style={{ backgroundColor: "#fbf8ff" }}>
          <div className="flex flex-col px-5 py-4 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block rounded-lg px-3 py-2.5 font-medium transition-colors ${
                  pathname === link.href
                    ? "bg-primary/10 text-primary"
                    : "text-on-surface-variant hover:text-primary hover:bg-surface-container-low"
                }`}
                style={{ fontFamily: "var(--font-inter)", fontSize: "16px" }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/valuation"
              onClick={() => setMobileOpen(false)}
              className="mt-3 block text-center bg-primary text-on-primary px-6 py-3 rounded-xl"
              style={{ backgroundColor: "#003fd8", color: "#ffffff", fontFamily: "var(--font-jetbrains)", fontSize: "12px" }}
            >
              Get Valuation
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

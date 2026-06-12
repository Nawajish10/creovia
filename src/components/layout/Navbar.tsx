"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/sell", label: "Sell Social Pages & Assets", mobileLabel: "Sell Assets" },
  { href: "/buy", label: "Buy Social Pages & Assets", mobileLabel: "Buy Assets" },
  { href: "/about", label: "About", mobileLabel: "About" },
  { href: "/resources", label: "Resources", mobileLabel: "Resources" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 w-full z-50 bg-[#0B0F19]/80 backdrop-blur-xl border-b border-white/5 shadow-sm">
      <div className="flex justify-between items-center px-margin-mobile px-[20px] md:px-[64px] h-16 md:h-20 max-w-container-max mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <span
            className="material-symbols-outlined text-primary text-3xl"
            style={{ fontVariationSettings: "'FILL' 1", color: "#3b82f6" }}
          >grid_view</span>
          <span
            className="font-headline-sm text-white tracking-tight"
            style={{ fontFamily: "var(--font-hanken)", fontSize: "20px", lineHeight: "28px", fontWeight: 700 }}
          >
            Axcrivo
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-5 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                pathname === link.href
                  ? "text-primary font-semibold border-b-2 border-primary pb-1"
                  : "text-gray-400 font-medium hover:text-white transition-colors duration-300"
              }
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "15px",
                lineHeight: "24px",
                whiteSpace: "nowrap",
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <Link
          href="/valuation"
          className="hidden md:flex items-center bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white px-5 py-2.5 rounded-xl hover:opacity-90 transition-all shadow-[0_0_20px_rgba(37,99,235,0.2)]"
          style={{
            fontFamily: "var(--font-jetbrains)",
            fontSize: "12px",
            lineHeight: "16px",
            fontWeight: 500,
          }}
        >
          Get Valuation
        </Link>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span className="material-symbols-outlined">{mobileOpen ? "close" : "menu"}</span>
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-white/5 bg-[#0B0F19]/95 backdrop-blur-xl">
          <div className="flex flex-col px-5 py-2.5 gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block rounded-lg px-3 py-2 font-medium transition-colors ${
                  pathname === link.href
                    ? "bg-[#2563EB]/10 text-white border-l-2 border-[#2563EB]"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
                style={{ fontFamily: "var(--font-inter)", fontSize: "15px" }}
              >
                {link.mobileLabel}
              </Link>
            ))}
            <Link
              href="/valuation"
              onClick={() => setMobileOpen(false)}
              className="mt-2 block text-center bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white px-6 py-2.5 rounded-xl font-medium shadow-[0_0_15px_rgba(37,99,235,0.15)]"
              style={{ fontFamily: "var(--font-jetbrains)", fontSize: "12px" }}
            >
              Get Valuation
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

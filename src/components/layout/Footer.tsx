import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full py-16 border-t" style={{ backgroundColor: "#ffffff", borderColor: "#c4c5d8" }}>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4"
        style={{
          gap: "24px",
          paddingLeft: "20px",
          paddingRight: "20px",
          maxWidth: "1280px",
          margin: "0 auto",
        }}
      >
        {/* Brand */}
        <div className="col-span-1 sm:col-span-2 md:col-span-1 flex flex-col gap-4">
          <span style={{ fontFamily: "var(--font-hanken)", fontSize: "36px", lineHeight: "44px", fontWeight: 600, color: "#003fd8" }}>
            Creovia.
          </span>
          <p style={{ fontFamily: "var(--font-inter)", fontSize: "16px", lineHeight: "24px", color: "#434656" }}>
            © {new Date().getFullYear()} Creovia. All rights reserved.
          </p>
        </div>

        {/* Column 1 */}
        <div className="flex flex-col gap-3">
          <Link href="/buy" className="hover:text-primary transition-colors" style={{ fontFamily: "var(--font-inter)", fontSize: "16px", color: "#434656" }}>Marketplace</Link>
          <Link href="/valuation" className="hover:text-primary transition-colors" style={{ fontFamily: "var(--font-inter)", fontSize: "16px", color: "#434656" }}>Valuation Tool</Link>
        </div>

        {/* Column 2 */}
        <div className="flex flex-col gap-3">
          <Link href="/sell" className="hover:text-primary transition-colors" style={{ fontFamily: "var(--font-inter)", fontSize: "16px", color: "#434656" }}>Selling</Link>
          <Link href="/about" className="hover:text-primary transition-colors" style={{ fontFamily: "var(--font-inter)", fontSize: "16px", color: "#434656" }}>About Us</Link>
        </div>

        {/* Column 3 */}
        <div className="flex flex-col gap-3">
          <Link href="/resources" className="hover:text-primary transition-colors" style={{ fontFamily: "var(--font-inter)", fontSize: "16px", color: "#434656" }}>Resources</Link>
          <Link href="/privacy" className="hover:text-primary transition-colors" style={{ fontFamily: "var(--font-inter)", fontSize: "16px", color: "#434656" }}>Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
}

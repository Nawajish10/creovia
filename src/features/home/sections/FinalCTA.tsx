import Link from "next/link";

export function FinalCTA() {
  return (
    <section
      className="px-[20px] md:px-[64px]"
      style={{ paddingTop: "48px", paddingBottom: "48px", backgroundColor: "#dde1ff" }}
    >
      <div
        className="text-center flex flex-col items-center gap-8"
        style={{ maxWidth: "1280px", margin: "0 auto" }}
      >
        <div className="flex flex-col gap-4 max-w-2xl">
          <h2
            style={{
              fontFamily: "var(--font-hanken)",
              fontSize: "clamp(28px, 5vw, 48px)",
              lineHeight: "clamp(36px, 6vw, 56px)",
              letterSpacing: "-0.02em",
              fontWeight: 700,
              color: "#191b24",
            }}
          >
            Buy or sell your creator asset at the{" "}
            <span style={{ color: "#003fd8" }}>right price</span>
          </h2>
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "18px",
              lineHeight: "28px",
              color: "#434656",
            }}
          >
            Whether you're selling a high-value Instagram page or looking to acquire the next big YouTube channel — our platform helps you close the deal with complete transparency and security.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/valuation"
            className="hover:opacity-90 transition-opacity"
            style={{
              backgroundColor: "#003fd8",
              color: "#ffffff",
              fontFamily: "var(--font-jetbrains)",
              fontSize: "14px",
              fontWeight: 500,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              padding: "16px 32px",
              borderRadius: "0.75rem",
              boxShadow: "0px 4px 20px rgba(45, 90, 247, 0.15)",
              display: "inline-block",
            }}
          >
            Get Free Valuation
          </Link>
          <Link
            href="/buy"
            className="flex items-center justify-center gap-2 hover:bg-surface-container-low transition-colors"
            style={{
              backgroundColor: "rgba(255,255,255,0.7)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(0,0,0,0.05)",
              color: "#191b24",
              fontFamily: "var(--font-inter)",
              fontSize: "16px",
              fontWeight: 500,
              padding: "16px 32px",
              borderRadius: "0.75rem",
              display: "inline-flex",
            }}
          >
            Browse Listings
            <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>arrow_forward</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

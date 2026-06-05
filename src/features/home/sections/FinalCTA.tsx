import Link from "next/link";

export function FinalCTA() {
  return (
    <section
      className="px-[20px] md:px-[64px] py-8 md:py-16"
      style={{ backgroundColor: "#dde1ff" }}
    >
      <div
        className="text-center flex flex-col items-center gap-6 md:gap-8"
        style={{ maxWidth: "1280px", margin: "0 auto" }}
      >
        <div className="flex flex-col gap-3 md:gap-4 max-w-2xl">
          <h2
            style={{
              fontFamily: "var(--font-hanken)",
              fontSize: "clamp(24px, 5vw, 48px)",
              lineHeight: "clamp(32px, 6vw, 56px)",
              letterSpacing: "-0.02em",
              fontWeight: 700,
              color: "#191b24",
            }}
          >
            Buy or sell your Social Pages & Digital Assets at the{" "}
            <span style={{ color: "#003fd8" }}>right price</span>
          </h2>
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "16px",
              lineHeight: "26px",
              color: "#434656",
            }}
            className="text-sm md:text-lg"
          >
            Whether you're selling a high-value Instagram page or looking to acquire the next big YouTube channel — our platform helps you close the deal with complete transparency and security.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full sm:w-auto">
          <Link
            href="/valuation"
            className="hover:opacity-90 transition-opacity px-6 py-3 md:px-8 md:py-4 rounded-xl text-center"
            style={{
              backgroundColor: "#003fd8",
              color: "#ffffff",
              fontFamily: "var(--font-jetbrains)",
              fontSize: "14px",
              fontWeight: 500,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              boxShadow: "0px 4px 20px rgba(45, 90, 247, 0.15)",
              display: "inline-block",
            }}
          >
            Get Free Valuation
          </Link>
          <Link
            href="/buy"
            className="flex items-center justify-center gap-2 hover:bg-surface-container-low transition-colors px-6 py-3 md:px-8 md:py-4 rounded-xl"
            style={{
              backgroundColor: "rgba(255,255,255,0.7)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(0,0,0,0.05)",
              color: "#191b24",
              fontFamily: "var(--font-inter)",
              fontSize: "16px",
              fontWeight: 500,
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

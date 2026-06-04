import Link from "next/link";

export function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ paddingTop: "64px", paddingBottom: "80px", paddingLeft: "20px", paddingRight: "20px" }}
    >
      {/* Background Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{ width: "800px", height: "800px", background: "rgba(0,63,216,0.05)", filter: "blur(120px)" }}
      />

      <div
        className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10"
        style={{ maxWidth: "1280px" }}
      >
        {/* Text Column */}
        <div className="flex flex-col gap-6">
          <div
            className="inline-flex items-center gap-2 w-fit px-4 py-1.5 rounded-full"
            style={{ backgroundColor: "rgba(108,248,187,0.2)", border: "1px solid rgba(0,108,73,0.2)" }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "#006c49" }} />
            <span style={{ fontFamily: "var(--font-jetbrains)", fontSize: "12px", fontWeight: 500, color: "#00714d", letterSpacing: "0.08em" }}>
              India's #1 Creator Asset Marketplace
            </span>
          </div>

          <h1
            style={{
              fontFamily: "var(--font-hanken)",
              fontSize: "clamp(36px, 5vw, 48px)",
              lineHeight: "clamp(44px, 5.5vw, 56px)",
              letterSpacing: "-0.02em",
              fontWeight: 700,
              color: "#191b24",
            }}
          >
            Buy &amp; Sell Indian Creator Assets With{" "}
            <span style={{ color: "#003fd8" }}>Confidence</span>
          </h1>
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "18px",
              lineHeight: "28px",
              color: "#434656",
              maxWidth: "540px",
            }}
          >
            India&apos;s trusted marketplace to acquire or sell Instagram pages, YouTube channels, Telegram communities, WhatsApp groups, and regional digital audiences — fully verified, data-driven, and priced in INR.
          </p>
          <div className="flex flex-col sm:flex-row gap-4" style={{ marginTop: "16px" }}>
            <Link
              href="/valuation"
              style={{
                backgroundColor: "#003fd8",
                color: "#ffffff",
                fontFamily: "var(--font-inter)",
                fontSize: "16px",
                lineHeight: "24px",
                fontWeight: 500,
                padding: "16px 32px",
                borderRadius: "0.75rem",
                textAlign: "center",
                boxShadow: "0 4px 20px rgba(0,63,216,0.2)",
                display: "inline-block",
              }}
            >
              Get Free Valuation
            </Link>
            <Link
              href="/buy"
              className="flex items-center justify-center gap-2"
              style={{
                background: "rgba(255,255,255,0.7)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(0,0,0,0.05)",
                color: "#191b24",
                fontFamily: "var(--font-inter)",
                fontSize: "16px",
                fontWeight: 500,
                padding: "16px 32px",
                borderRadius: "0.75rem",
                textAlign: "center",
              }}
            >
              View Listings
              <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>arrow_forward</span>
            </Link>
          </div>
        </div>

        {/* Hero Visual Mockup */}
        <div
          className="rounded-xl p-6 relative"
          style={{
            background: "rgba(255,255,255,0.7)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(0,0,0,0.05)",
            boxShadow: "0 4px 20px -2px rgba(0,0,0,0.05)",
          }}
        >
          {/* Browser Header */}
          <div
            className="flex items-center gap-2 mb-6 pb-4"
            style={{ borderBottom: "1px solid #c4c5d8" }}
          >
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#c4c5d8" }} />
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#c4c5d8" }} />
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#c4c5d8" }} />
            <div
              className="mx-auto"
              style={{ fontFamily: "var(--font-jetbrains)", fontSize: "12px", color: "#434656" }}
            >
              Asset Valuation Dashboard — INR
            </div>
          </div>

          <div className="space-y-6">
            {/* Value Row */}
            <div className="flex justify-between items-end">
              <div>
                <div style={{ fontFamily: "var(--font-jetbrains)", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.04em", color: "#434656", marginBottom: "4px" }}>
                  Estimated Asset Value
                </div>
                <div style={{ fontFamily: "var(--font-hanken)", fontSize: "36px", lineHeight: "44px", fontWeight: 600, color: "#006c49" }}>
                  ₹1,05,00,000
                </div>
              </div>
              <div
                className="flex items-center gap-2 px-3 py-1 rounded-full"
                style={{ backgroundColor: "rgba(108,248,187,0.3)", border: "1px solid rgba(0,108,73,0.2)" }}
              >
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "#006c49" }} />
                <span style={{ fontFamily: "var(--font-jetbrains)", fontSize: "12px", color: "#00714d" }}>High Demand</span>
              </div>
            </div>

            {/* Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl" style={{ backgroundColor: "#f3f2ff", border: "1px solid rgba(196,197,216,0.3)" }}>
                <div className="flex items-center gap-2 mb-2" style={{ color: "#434656" }}>
                  <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>groups</span>
                  <span style={{ fontFamily: "var(--font-jetbrains)", fontSize: "12px" }}>Audience Quality</span>
                </div>
                <div style={{ fontFamily: "var(--font-hanken)", fontSize: "24px", fontWeight: 600, color: "#191b24" }}>94/100</div>
                <div className="w-full rounded-full overflow-hidden" style={{ height: "4px", backgroundColor: "rgba(196,197,216,0.2)", marginTop: "8px" }}>
                  <div style={{ height: "100%", width: "94%", background: "linear-gradient(to right, #003fd8, #006c49)" }} />
                </div>
              </div>
              <div className="p-4 rounded-xl" style={{ backgroundColor: "#f3f2ff", border: "1px solid rgba(196,197,216,0.3)" }}>
                <div className="flex items-center gap-2 mb-2" style={{ color: "#434656" }}>
                  <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>monitoring</span>
                  <span style={{ fontFamily: "var(--font-jetbrains)", fontSize: "12px" }}>Engagement Rate</span>
                </div>
                <div style={{ fontFamily: "var(--font-hanken)", fontSize: "24px", fontWeight: 600, color: "#191b24" }}>12.4%</div>
                <div className="w-full rounded-full overflow-hidden" style={{ height: "4px", backgroundColor: "rgba(196,197,216,0.2)", marginTop: "8px" }}>
                  <div style={{ height: "100%", width: "75%", background: "linear-gradient(to right, #003fd8, #006c49)" }} />
                </div>
              </div>
            </div>

            {/* Chart */}
            <div
              className="relative"
              style={{ height: "96px", width: "100%", borderBottom: "1px solid rgba(196,197,216,0.3)", borderLeft: "1px solid rgba(196,197,216,0.3)", marginTop: "16px" }}
            >
              <svg className="absolute bottom-0 left-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0,90 Q20,80 40,50 T80,30 T100,10" fill="none" stroke="#2d5af7" strokeLinecap="round" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

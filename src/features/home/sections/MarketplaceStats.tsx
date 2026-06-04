const stats = [
  { value: "₹380 Cr+", label: "Total Asset Transaction Value" },
  { value: "2,400+", label: "Verified Listings Published" },
  { value: "96%", label: "Avg. Audience Quality Score" },
  { value: "18 Days", label: "Average Time to Close" },
];

export function MarketplaceStats() {
  return (
    <section
      className="px-[20px] md:px-[64px]"
      style={{ paddingTop: "48px", paddingBottom: "48px", backgroundColor: "#2e303a" }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div className="text-center mb-12">
          <h2
            style={{
              fontFamily: "var(--font-hanken)",
              fontSize: "30px",
              lineHeight: "38px",
              fontWeight: 600,
              color: "#ffffff",
              marginBottom: "12px",
            }}
          >
            Numbers That Speak
          </h2>
          <p style={{ fontFamily: "var(--font-inter)", fontSize: "18px", lineHeight: "28px", color: "#c4c5d8" }}>
            Institutional-grade results for Indian creators and buyers
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center text-center gap-3 p-8 rounded-xl"
              style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <span
                style={{
                  fontFamily: "var(--font-hanken)",
                  fontSize: "36px",
                  lineHeight: "44px",
                  fontWeight: 600,
                  color: "#6cf8bb",
                  letterSpacing: "-0.02em",
                }}
              >
                {stat.value}
              </span>
              <span style={{ fontFamily: "var(--font-inter)", fontSize: "16px", lineHeight: "24px", color: "#c4c5d8" }}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

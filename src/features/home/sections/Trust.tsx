const benefits = [
  {
    icon: "verified_user",
    iconColor: "#006c49",
    iconBg: "#6cf8bb",
    title: "Verified Listings",
    description:
      "Every asset undergoes rigorous financial and operational auditing to ensure authenticity and mitigate buyer risk.",
  },
  {
    icon: "monitoring",
    iconColor: "#003fd8",
    iconBg: "#dde1ff",
    title: "Audience Analysis",
    description:
      "Gain deep insights into audience demographics, engagement rates, and geographic distribution before making an offer.",
  },
  {
    icon: "rocket_launch",
    iconColor: "#943100",
    iconBg: "#ffdbcf",
    title: "Growth Potential",
    description:
      "Identify undervalued assets with scalable frameworks and untapped monetization avenues tailored for enterprise growth.",
  },
  {
    icon: "security",
    iconColor: "#003fd8",
    iconBg: "#dde1ff",
    title: "Escrow Protection",
    description:
      "All transactions are escrow-backed with legally binding transfer frameworks designed to protect every party.",
  },
];

export function Trust() {
  return (
    <section
      className="px-[20px] md:px-[64px] py-8 md:py-20"
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Header */}
        <div className="text-center mb-8 md:mb-16">
          <h2
            style={{
              fontFamily: "var(--font-hanken)",
              fontSize: "30px",
              lineHeight: "38px",
              fontWeight: 600,
              color: "#191b24",
              marginBottom: "12px",
            }}
          >
            Why Professionals Choose Us
          </h2>
          <p style={{ fontFamily: "var(--font-inter)", fontSize: "18px", lineHeight: "28px", color: "#434656" }} className="text-base md:text-lg">
            Built for institutional-grade transactions with unmatched security
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="flex flex-col gap-3 md:gap-4 p-4 md:p-8 rounded-xl transition-colors duration-300"
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #c4c5d8",
              }}
            >
              <div
                className="w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: b.iconBg }}
              >
                <span className="material-symbols-outlined text-[20px] md:text-[24px]" style={{ color: b.iconColor }}>{b.icon}</span>
              </div>
              <h3 style={{ fontFamily: "var(--font-hanken)", fontWeight: 600, color: "#191b24" }} className="text-lg md:text-2xl">
                {b.title}
              </h3>
              <p style={{ fontFamily: "var(--font-inter)", color: "#434656" }} className="text-sm md:text-base leading-relaxed">
                {b.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const steps = [
  {
    number: "01",
    icon: "search",
    title: "List or Browse",
    description:
      "Sellers submit their creator asset for valuation and listing review. Buyers browse verified, data-rich listings filtered by niche, size, and revenue.",
  },
  {
    number: "02",
    icon: "monitoring",
    title: "Due Diligence",
    description:
      "Our team conducts rigorous financial and operational auditing. Buyers receive full analytics access — engagement, audience quality, and revenue verification.",
  },
  {
    number: "03",
    icon: "handshake",
    title: "Offer & Negotiate",
    description:
      "Submit competitive offers through our secure platform. Our M&A advisors facilitate negotiations to ensure both parties reach a fair and transparent agreement.",
  },
  {
    number: "04",
    icon: "verified",
    title: "Secure Transfer",
    description:
      "Funds are held in escrow while assets are migrated. Upon confirmation, the transfer is complete. Clean, legally-binding, and risk-free for all parties.",
  },
];

export function HowItWorks() {
  return (
    <section
      className="px-[20px] md:px-[64px]"
      style={{ paddingTop: "80px", paddingBottom: "80px", backgroundColor: "#ededfa" }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Header */}
        <div className="text-center mb-16">
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
            How It Works
          </h2>
          <p style={{ fontFamily: "var(--font-inter)", fontSize: "18px", lineHeight: "28px", color: "#434656" }}>
            A transparent, institutional-grade process from listing to transfer
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className="flex flex-col gap-4 p-8 rounded-xl"
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #c4c5d8",
              }}
            >
              <div className="flex items-start justify-between">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: "#dde1ff" }}
                >
                  <span className="material-symbols-outlined" style={{ color: "#0036bc" }}>{step.icon}</span>
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-jetbrains)",
                    fontSize: "28px",
                    fontWeight: 700,
                    color: "#c4c5d8",
                    lineHeight: 1,
                  }}
                >
                  {step.number}
                </span>
              </div>
              <h3 style={{ fontFamily: "var(--font-hanken)", fontSize: "24px", lineHeight: "32px", fontWeight: 600, color: "#191b24" }}>
                {step.title}
              </h3>
              <p style={{ fontFamily: "var(--font-inter)", fontSize: "16px", lineHeight: "24px", color: "#434656" }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const steps = [
  {
    number: "01",
    icon: "search",
    title: "List or Browse",
    description:
      "Sellers submit their Social Pages & Digital Assets for valuation and listing review. Buyers browse verified, data-rich listings filtered by niche, size, and revenue.",
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
      className="relative overflow-hidden px-[20px] md:px-[64px] py-12 md:py-24 bg-[#0B0F19]"
    >
      {/* Background Glows */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-[#2563EB]/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#7C3AED]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10" style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Header */}
        <div className="text-center mb-10 md:mb-20">
          <h2
            className="text-[clamp(1.2rem,2.8vw,2.25rem)] md:text-[clamp(1.5rem,3.5vw,3rem)] font-inter font-[800] text-white tracking-tight mb-4"
          >
            How It Works
          </h2>
          <p className="text-gray-400 font-inter text-sm md:text-lg max-w-2xl mx-auto leading-relaxed">
            A transparent, institutional-grade process from listing to transfer
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-4 gap-4 md:gap-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className="flex flex-col gap-3 md:gap-4 p-5 md:p-8 rounded-[24px] bg-[#07111F]/75 border border-white/5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/15 hover:shadow-[0_8px_30px_rgba(37,99,235,0.08)]"
            >
              <div className="flex items-start justify-between">
                <div
                  className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center bg-[#2563EB]/10 border border-[#2563EB]/20"
                >
                  <span className="material-symbols-outlined text-[20px] md:text-[24px] text-primary" style={{ color: "#3b82f6" }}>{step.icon}</span>
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-jetbrains)",
                    fontWeight: 700,
                    color: "rgba(255,255,255,0.15)",
                    lineHeight: 1,
                  }}
                  className="text-2xl md:text-3xl"
                >
                  {step.number}
                </span>
              </div>
              <h3 className="text-white font-inter font-bold text-base md:text-lg tracking-tight">
                {step.title}
              </h3>
              <p className="text-gray-400 font-inter text-xs md:text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

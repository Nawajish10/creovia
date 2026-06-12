import Link from "next/link";

export function FinalCTA() {
  return (
    <section
      className="relative overflow-hidden px-[20px] md:px-[64px] py-16 md:py-28 bg-[#020617]"
    >
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#2563EB]/10 rounded-full blur-[130px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#7C3AED]/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div
        className="relative z-10 text-center flex flex-col items-center gap-8 md:gap-10"
        style={{ maxWidth: "1280px", margin: "0 auto" }}
      >
        <div className="flex flex-col gap-3 md:gap-4 max-w-3xl">
          <h2
            className="text-[clamp(1.5rem,3.8vw,3.5rem)] font-inter font-[800] text-white tracking-tight"
            style={{
              lineHeight: 1.15,
            }}
          >
            Buy or sell your Social Pages & Digital Assets at the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#7C3AED]">right price</span>
          </h2>
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "18px",
              lineHeight: "28px",
              color: "#9ca3af",
            }}
            className="text-sm md:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Whether you&apos;re selling a high-value Instagram page or looking to acquire the next big YouTube channel — our platform helps you close the deal with complete transparency and security.
          </p>
        </div>

        <div className="flex flex-row gap-3 md:gap-4 justify-center items-center flex-wrap">
          <Link
            href="/valuation"
            className="hover:opacity-95 transition-all px-8 py-4 rounded-2xl text-center bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white font-semibold shadow-[0_0_30px_rgba(37,99,235,0.3)] whitespace-nowrap"
            style={{
              fontFamily: "var(--font-jetbrains)",
              fontSize: "14px",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            Get Free Valuation
          </Link>
          <Link
            href="/buy"
            className="flex items-center justify-center gap-2 hover:bg-white/[0.06] hover:border-white/20 transition-all px-8 py-4 rounded-2xl bg-white/[0.02] border border-white/10 text-gray-200 font-inter whitespace-nowrap"
            style={{
              fontSize: "16px",
              fontWeight: 500,
            }}
          >
            Browse Listings
            <span className="material-symbols-outlined text-gray-400" style={{ fontSize: "20px" }}>arrow_forward</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";

const categories = [
  { icon: "photo_camera", label: "Instagram", href: "/buy?category=instagram" },
  { icon: "smart_display", label: "YouTube", href: "/buy?category=youtube" },
  { icon: "send", label: "Telegram", href: "/buy?category=telegram" },
  { icon: "chat_bubble", label: "WhatsApp", href: "/buy?category=whatsapp" },
  { icon: "groups", label: "ShareChat", href: "/buy?category=sharechat" },
  { icon: "language", label: "Websites", href: "/buy?category=websites" },
];

export function Categories() {
  return (
    <section
      className="px-[20px] md:px-[64px]"
      style={{ paddingTop: "32px", paddingBottom: "32px", backgroundColor: "#f3f2ff" }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Header */}
        <div className="flex flex-col gap-2 md:gap-3 mb-6 md:mb-10">
          <h2
            style={{
              fontFamily: "var(--font-hanken)",
              letterSpacing: "-0.01em",
              fontWeight: 600,
              color: "#191b24",
            }}
            className="text-[26px] md:text-[30px] leading-[34px] md:leading-[38px]"
          >
            Explore by Platform
          </h2>
          <p style={{ fontFamily: "var(--font-inter)", fontSize: "16px", lineHeight: "24px", color: "#434656" }} className="text-sm md:text-base">
            Browse verified assets across major Indian platforms
          </p>
        </div>
        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.label}
              href={cat.href}
              className="group flex flex-col items-center justify-center gap-2 md:gap-4 p-4 md:p-6 rounded-xl transition-all duration-300 hover:-translate-y-1"
              style={{
                background: "rgba(255,255,255,0.7)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(0,0,0,0.05)",
                boxShadow: "0 4px 20px -2px rgba(0,0,0,0.05)",
              }}
            >
              <span
                className="material-symbols-outlined transition-colors duration-300"
                style={{ color: "#434656", fontSize: "32px" }}
              >
                {cat.icon}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-jetbrains)",
                  fontSize: "12px",
                  lineHeight: "16px",
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#191b24",
                }}
              >
                {cat.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

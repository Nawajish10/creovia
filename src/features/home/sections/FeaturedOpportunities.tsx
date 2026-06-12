import Link from "next/link";
import Image from "next/image";

const listings = [
  {
    title: "Finance & Stock Market Channel",
    platform: "YouTube",
    price: "₹1.2 Cr",
    subscribers: "9,80,000",
    revenue: "₹1,10,000/mo",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDn_9_ocqImFFYlBzh49goKac9MfQ74p4kYM21iu75Tz02imzOs3BxFUcpjtxQgZccrwbm8QgAdvBJm5gWyp4FcPu-FMZkrk2o1jMYlApQ0hdHJ7ncshwCUq474reQ4Pc3AsI7xbAHSDsjoe3QjJMW2-Z_JgLTmBPdbKz_NOH3-2vSPJ93k1HrVZmIXhSyezh6S24dfrkeRiQigmWhY7R3Jn3cWXXP2Xq3WOu7-5basdCixGHldWEyO75La-Xn1YPTk1xniJ2oLNus",
    audienceLabel: "Subscribers",
    revenueLabel: "Monthly Rev",
    tag: "Mumbai, Maharashtra",
  },
  {
    title: "Fashion & Lifestyle Page",
    platform: "Instagram Theme Page",
    price: "₹68 L",
    subscribers: "8,50,000",
    revenue: "₹75,000/mo",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBcvQy0BqLxBZdGkzl06ZIKtFSvwAVlng0vi0oFHeqST1BzbPMY7tBV65c39w3klsT3oIZXVKGDVIw4GzlkD5iAFhPyNWcJ0KvWlnjCMI6u2LC0QHGPJN74DHUUh9atdu0vrzII98DCfjfvAYnfO2ALlIwVSkTQheksnT62ysepgWRnBST6rscb_naKsBopBK1RjTe7xeZtpmYgR-7h__3rB5HyRrmjGQjju2iqwjVIefMJ5Vn0cxkoiXxAQKlTsgx8tzcpHPvonkQ",
    audienceLabel: "Followers",
    revenueLabel: "Monthly Rev",
    tag: "Delhi, India",
  },
  {
    title: "Tech & Startup Newsletter",
    platform: "Email Newsletter",
    price: "₹1.8 Cr",
    subscribers: "2,20,000",
    revenue: "₹1,65,000/mo",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBr2pS7In0xEerAh8hWj5sy_SFam9_rNHsjhnaqBkNSXfS9Vbx3f6FeS80u54h_hM7FFhJ3nqYYbBfrPOGpbjkp6p0ra6WCe54wamlruTASi_1VUKGoHQSSXssk0RvOPYPHPQrxjMICNrw-GyhAzMTUT8qPyDVisihCGWOEIy0N6oMzGYHBoR5ByMDgUaHNXzbAEX5SD0g6FtoSbf3XGxY12_HYkliMF2lG2yTYNMUFyqmHspwWOOFz8MDiyDIiLY0T10TLbOn4Vlw",
    audienceLabel: "Subscribers",
    revenueLabel: "Monthly Rev",
    tag: "Bengaluru, Karnataka",
  },
];

export function FeaturedOpportunities() {
  return (
    <section
      className="px-[20px] md:px-[64px]"
      style={{ paddingTop: "32px", paddingBottom: "32px", backgroundColor: "#f3f2ff" }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Header */}
        <div className="flex justify-between items-end mb-8">
          <h2
            style={{
              fontFamily: "var(--font-hanken)",
              fontSize: "30px",
              lineHeight: "38px",
              fontWeight: 600,
              color: "#191b24",
            }}
          >
            Featured Listings
          </h2>
          <Link
            href="/buy"
            className="flex items-center gap-1 hover:opacity-80 transition-opacity"
            style={{
              fontFamily: "var(--font-jetbrains)",
              fontSize: "14px",
              color: "#003fd8",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            View All
            <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>arrow_forward</span>
          </Link>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-3 gap-6">
          {listings.map((listing) => (
            <div
              key={listing.title}
              className="flex flex-col overflow-hidden rounded-xl hover:-translate-y-1 transition-transform duration-300"
              style={{
                background: "rgba(255,255,255,0.9)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(0,0,0,0.08)",
                boxShadow: "0 4px 12px -2px rgba(0,0,0,0.05)",
              }}
            >
              {/* Image */}
              <div className="h-40 md:h-48 w-full relative" style={{ backgroundColor: "#e8e7f4" }}>
                <Image src={listing.image} alt={listing.title} fill className="object-cover" />
                <div
                  className="absolute top-3 left-3 md:top-4 md:left-4 flex items-center gap-1.5 px-2.5 py-0.5 md:px-3 md:py-1 rounded-full"
                  style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(8px)", border: "1px solid rgba(0,0,0,0.08)" }}
                >
                  <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full" style={{ backgroundColor: "#006c49" }}></span>
                  <span style={{ fontFamily: "var(--font-jetbrains)", fontWeight: 500 }} className="text-[11px] md:text-xs">Verified</span>
                </div>
                <div
                  className="absolute bottom-3 right-3 md:bottom-4 md:right-4 px-2 py-0.5 md:py-1 rounded"
                  style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
                >
                  <span style={{ fontFamily: "var(--font-jetbrains)", color: "#ffffff" }} className="text-[10px] md:text-xs">{listing.tag}</span>
                </div>
              </div>
              {/* Content */}
              <div className="p-4 md:p-6 flex flex-col gap-3 md:gap-4 flex-grow">
                <div className="flex justify-between items-start gap-2">
                  <div className="flex-1">
                    <h3 style={{ fontFamily: "var(--font-inter)", fontWeight: 600, color: "#191b24" }} className="text-base md:text-lg leading-snug">
                      {listing.title}
                    </h3>
                    <p style={{ fontFamily: "var(--font-jetbrains)", letterSpacing: "0.04em", textTransform: "uppercase", color: "#434656", marginTop: "2px" }} className="text-[11px] md:text-xs">
                      {listing.platform}
                    </p>
                  </div>
                  <span style={{ fontFamily: "var(--font-hanken)", fontWeight: 600, color: "#003fd8" }} className="text-lg md:text-2xl shrink-0 leading-none">
                    {listing.price}
                  </span>
                </div>
                <hr style={{ borderColor: "rgba(0,0,0,0.08)" }} />
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <p style={{ fontFamily: "var(--font-jetbrains)", textTransform: "uppercase", color: "#434656" }} className="text-[11px] md:text-xs">{listing.audienceLabel}</p>
                    <p style={{ fontFamily: "var(--font-inter)", fontWeight: 500, color: "#191b24", marginTop: "2px" }} className="text-sm md:text-base">{listing.subscribers}</p>
                  </div>
                  <div>
                    <p style={{ fontFamily: "var(--font-jetbrains)", textTransform: "uppercase", color: "#434656" }} className="text-[11px] md:text-xs">{listing.revenueLabel}</p>
                    <p style={{ fontFamily: "var(--font-inter)", fontWeight: 500, color: "#191b24", marginTop: "2px" }} className="text-sm md:text-base">{listing.revenue}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

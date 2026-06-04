import Link from "next/link";

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <div className="h-48 w-full relative" style={{ backgroundColor: "#e8e7f4" }}>
                <img src={listing.image} alt={listing.title} className="w-full h-full object-cover" />
                <div
                  className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 rounded-full"
                  style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(8px)", border: "1px solid rgba(0,0,0,0.08)" }}
                >
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "#006c49" }}></span>
                  <span style={{ fontFamily: "var(--font-jetbrains)", fontSize: "12px", fontWeight: 500 }}>Verified</span>
                </div>
                <div
                  className="absolute bottom-4 right-4 px-2 py-1 rounded"
                  style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
                >
                  <span style={{ fontFamily: "var(--font-jetbrains)", fontSize: "11px", color: "#ffffff" }}>{listing.tag}</span>
                </div>
              </div>
              {/* Content */}
              <div className="p-6 flex flex-col gap-4 flex-grow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 style={{ fontFamily: "var(--font-inter)", fontSize: "18px", lineHeight: "28px", fontWeight: 600, color: "#191b24" }}>
                      {listing.title}
                    </h3>
                    <p style={{ fontFamily: "var(--font-jetbrains)", fontSize: "12px", letterSpacing: "0.04em", textTransform: "uppercase", color: "#434656", marginTop: "4px" }}>
                      {listing.platform}
                    </p>
                  </div>
                  <span style={{ fontFamily: "var(--font-hanken)", fontSize: "24px", lineHeight: "32px", fontWeight: 600, color: "#003fd8" }}>
                    {listing.price}
                  </span>
                </div>
                <hr style={{ borderColor: "rgba(0,0,0,0.08)" }} />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p style={{ fontFamily: "var(--font-jetbrains)", fontSize: "12px", textTransform: "uppercase", color: "#434656" }}>{listing.audienceLabel}</p>
                    <p style={{ fontFamily: "var(--font-inter)", fontSize: "16px", fontWeight: 500, color: "#191b24", marginTop: "4px" }}>{listing.subscribers}</p>
                  </div>
                  <div>
                    <p style={{ fontFamily: "var(--font-jetbrains)", fontSize: "12px", textTransform: "uppercase", color: "#434656" }}>{listing.revenueLabel}</p>
                    <p style={{ fontFamily: "var(--font-inter)", fontSize: "16px", fontWeight: 500, color: "#191b24", marginTop: "4px" }}>{listing.revenue}</p>
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

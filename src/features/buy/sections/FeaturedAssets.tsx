import { SectionWrapper } from "@/components/layout/SectionWrapper";
import Image from "next/image";

export function FeaturedAssets() {
  return (
    <SectionWrapper id="featuredassets" className="py-12">
      <section className="flex flex-col gap-8">
        <div className="flex justify-between items-end">
          <h2 className="font-headline-md text-on-surface">Featured Listings</h2>
          <a className="font-label-md text-primary hover:text-primary-container uppercase tracking-wider flex items-center gap-1" href="#">View All <span className="material-symbols-outlined text-sm">arrow_forward</span></a>
        </div>
        <div className="grid grid-cols-3 gap-gutter">
          {/* Card 1 */}
          <div className="glass-panel rounded-xl overflow-hidden flex flex-col hover:-translate-y-1 transition-transform duration-300">
            <div className="h-48 w-full bg-surface-container-high relative">
              <Image fill alt="Abstract visualization of a vibrant digital community and social media growth, featuring glowing neon connections against a dark obsidian background, conveying a high-tech enterprise aesthetic." className="object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDn_9_ocqImFFYlBzh49goKac9MfQ74p4kYM21iu75Tz02imzOs3BxFUcpjtxQgZccrwbm8QgAdvBJm5gWyp4FcPu-FMZkrk2o1jMYlApQ0hdHJ7ncshwCUq474reQ4Pc3AsI7xbAHSDsjoe3QjJMW2-Z_JgLTmBPdbKz_NOH3-2vSPJ93k1HrVZmIXhSyezh6S24dfrkeRiQigmWhY7R3Jn3cWXXP2Xq3WOu7-5basdCixGHldWEyO75La-Xn1YPTk1xniJ2oLNus"/>
              <div className="absolute top-4 left-4 bg-surface-container-lowest/90 backdrop-blur-md px-3 py-1 rounded-full border border-border-subtle flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-secondary"></span>
                <span className="font-label-sm text-on-surface uppercase">Verified</span>
              </div>
            </div>
            <div className="p-6 flex flex-col gap-4 flex-grow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-body-lg text-on-surface font-semibold">Finance & Stock Tips Channel</h3>
                  <p className="font-label-sm text-on-surface-variant uppercase tracking-wider mt-1">YouTube • Mumbai</p>
                </div>
                <span className="font-headline-sm text-primary">₹1.2 Cr</span>
              </div>
              <hr className="border-border-subtle my-2"/>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-label-sm text-on-surface-variant uppercase">Subscribers</p>
                  <p className="font-body-md text-on-surface font-medium">9,80,000</p>
                </div>
                <div>
                  <p className="font-label-sm text-on-surface-variant uppercase">Monthly Rev</p>
                  <p className="font-body-md text-on-surface font-medium">₹1,10,000</p>
                </div>
              </div>
            </div>
          </div>
          {/* Card 2 */}
          <div className="glass-panel rounded-xl overflow-hidden flex flex-col hover:-translate-y-1 transition-transform duration-300">
            <div className="h-48 w-full bg-surface-container-high relative">
              <Image fill alt="A sleek, modern visualization of an e-commerce storefront dashboard, emphasizing dark mode UI elements, precise data graphs, and subtle electric blue highlights on a deep black canvas." className="object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcvQy0BqLxBZdGkzl06ZIKtFSvwAVlng0vi0oFHeqST1BzbPMY7tBV65c39w3klsT3oIZXVKGDVIw4GzlkD5iAFhPyNWcJ0KvWlnjCMI6u2LC0QHGPJN74DHUUh9atdu0vrzII98DCfjfvAYnfO2ALlIwVSkTQheksnT62ysepgWRnBST6rscb_naKsBopBK1RjTe7xeZtpmYgR-7h__3rB5HyRrmjGQjju2iqwjVIefMJ5Vn0cxkoiXxAQKlTsgx8tzcpHPvonkQ"/>
              <div className="absolute top-4 left-4 bg-surface-container-lowest/90 backdrop-blur-md px-3 py-1 rounded-full border border-border-subtle flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-secondary"></span>
                <span className="font-label-sm text-on-surface uppercase">Verified</span>
              </div>
            </div>
            <div className="p-6 flex flex-col gap-4 flex-grow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-body-lg text-on-surface font-semibold">Fashion & Bollywood Page</h3>
                  <p className="font-label-sm text-on-surface-variant uppercase tracking-wider mt-1">Instagram Theme Page • Delhi</p>
                </div>
                <span className="font-headline-sm text-primary">₹68 L</span>
              </div>
              <hr className="border-border-subtle my-2"/>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-label-sm text-on-surface-variant uppercase">Followers</p>
                  <p className="font-body-md text-on-surface font-medium">12.5 L</p>
                </div>
                <div>
                  <p className="font-label-sm text-on-surface-variant uppercase">Monthly Rev</p>
                  <p className="font-body-md text-on-surface font-medium">₹75,000</p>
                </div>
              </div>
            </div>
          </div>
          {/* Card 3 */}
          <div className="glass-panel rounded-xl overflow-hidden flex flex-col hover:-translate-y-1 transition-transform duration-300 md:hidden lg:flex">
            <div className="h-48 w-full bg-surface-container-high relative">
              <Image fill alt="Abstract data representation showing upward trending metrics and code snippets in a highly technical, dark mode environment with sharp contrasts and subtle glassmorphism effects." className="object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBr2pS7In0xEerAh8hWj5sy_SFam9_rNHsjhnaqBkNSXfS9Vbx3f6FeS80u54h_hM7FFhJ3nqYYbBfrPOGpbjkp6p0ra6WCe54wamlruTASi_1VUKGoHQSSXssk0RvOPYPHPQrxjMICNrw-GyhAzMTUT8qPyDVisihCGWOEIy0N6oMzGYHBoR5ByMDgUaHNXzbAEX5SD0g6FtoSbf3XGxY12_HYkliMF2lG2yTYNMUFyqmHspwWOOFz8MDiyDIiLY0T10TLbOn4Vlw"/>
              <div className="absolute top-4 left-4 bg-surface-container-lowest/90 backdrop-blur-md px-3 py-1 rounded-full border border-border-subtle flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-secondary"></span>
                <span className="font-label-sm text-on-surface uppercase">Verified</span>
              </div>
            </div>
            <div className="p-6 flex flex-col gap-4 flex-grow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-body-lg text-on-surface font-semibold">Tech Startups Newsletter</h3>
                  <p className="font-label-sm text-on-surface-variant uppercase tracking-wider mt-1">Email Newsletter • Bengaluru</p>
                </div>
                <span className="font-headline-sm text-primary">₹1.8 Cr</span>
              </div>
              <hr className="border-border-subtle my-2"/>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-label-sm text-on-surface-variant uppercase">Subscribers</p>
                  <p className="font-body-md text-on-surface font-medium">2,20,000</p>
                </div>
                <div>
                  <p className="font-label-sm text-on-surface-variant uppercase">Monthly Rev</p>
                  <p className="font-body-md text-on-surface font-medium">₹1,65,000</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SectionWrapper>
  );
}

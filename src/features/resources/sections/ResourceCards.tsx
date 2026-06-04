import { SectionWrapper } from "@/components/layout/SectionWrapper";
import Image from "next/image";

export function ResourceCards() {
  return (
    <SectionWrapper id="resourcecards" className="py-12">
      <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto pb-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          {/* Featured Article (Span 8) */}
          <a className="md:col-span-8 group relative rounded-xl overflow-hidden bg-surface-container-lowest border border-outline-variant/30 hover:border-primary/50 transition-all duration-500 shadow-md hover:shadow-xl flex flex-col min-h-[400px]" href="#">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
            <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
              <Image fill className="object-cover" alt="How Much Is My Instagram Page Worth?" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1xfmfelIjOHiv-ZRjXNFsx_c2CJuv51GT4CjvN7uNzsqBUbIAXr-782aRUMBtLJV4WVNQDVhy_MkNNES_Mk3zRBqx2puoootxT7gYVkqbWBrJ2i-dXEPtm4d-mR6j-Epa3f9Mfn740XWhhGU3pJeBfc8GhN0y5iYdLuCqcZf0q7oqDB-l1PwMB1iRmlGRJ-l15L3uuZPyjoWDtxQQJKsl2sSNmHPdtuXDMiQ6JSaMkfc22NsAD8t4llgGDoObOPv8PqoVOBE7-s0" />
            </div>
            <div className="relative z-20 mt-auto p-8 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="bg-primary/90 text-white px-3 py-1 rounded-full font-label-sm text-label-sm">Valuation</span>
                <span className="text-white/80 font-label-sm text-label-sm flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">schedule</span> 8 min read</span>
              </div>
              <h2 className="font-headline-md text-headline-md text-white group-hover:text-primary-fixed transition-colors">How Much Is My Instagram Page Worth?</h2>
              <p className="font-body-md text-body-md text-white/90 max-w-xl line-clamp-2">Discover the proprietary metrics and market multiples used by top brokers to determine the exact enterprise value of highly engaged social media assets.</p>
            </div>
          </a>
          {/* Standard Article (Span 4) */}
          <a className="md:col-span-4 group rounded-xl overflow-hidden bg-surface-container-lowest border border-outline-variant/30 hover:border-primary/50 transition-all duration-300 flex flex-col shadow-sm hover:shadow-md" href="#">
            <div className="h-48 bg-surface-container-low relative overflow-hidden">
              <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                <Image fill className="object-cover" alt="YouTube Channel Valuation Guide" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCP4Cx6xOiTDMS90ceOgzfjQMgmLOC_yTmzheAMFgfilMbyQE9nQIs9EIkju92hleVhxzSUki9Cx29iQGc8sjkn2Dz2oCbZUJ0jlcI7wdL0dLO1t9PI8tC-INtOqH0_21eLv0u3_0pklytih4sWPLDTW8sPivY0KszWendGOdhGSbD9fVyZ-2wIAg8eC5NFWyTHZpH_AYRlkt9th7u96psQyZLlEOs6xxj2DcFFjoQvhUdzo_WgV6Tp6qkVMJX7yFLSwmAqQKFrZGI" />
              </div>
            </div>
            <div className="p-6 flex flex-col flex-grow gap-3">
              <span className="text-secondary font-label-sm text-label-sm uppercase tracking-wider">Guide</span>
              <h3 className="font-headline-sm text-headline-sm text-on-surface leading-tight group-hover:text-primary transition-colors">YouTube Channel Valuation Guide</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mt-auto pt-4 line-clamp-2">A comprehensive breakdown of RPM, subscriber loyalty indices, and library decay rates.</p>
            </div>
          </a>
          {/* Standard Article (Span 4) */}
          <a className="md:col-span-4 group rounded-xl overflow-hidden bg-surface-container-lowest border border-outline-variant/30 hover:border-primary/50 transition-all duration-300 flex flex-col shadow-sm hover:shadow-md mt-gutter md:mt-0" href="#">
            <div className="h-48 bg-surface-container-low relative overflow-hidden">
              <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                <Image fill className="object-cover" alt="How To Sell A Creator Asset" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDm40IbhlBxgb9H2j85mf35m32Rb3z2EOdVnv5g9k_3we94Us2Y7xs2KMup33k0bLG_Jjt5J20cMAjDLfYsSep2XBvoLqj1NUI8cDFj6yx6FB1H6pOTeT6U1kGZ_FG_0Lhm0mA6EfLokFdgynHgfDDXJ-UzonHMQNLF503bp_yfQ6kwLhtrfyFG9F2KRR_52NyABwMLx9N1kEbFP86MqBfREys_glqfzza9ZUdf3V6XbqsjVbMLV5k6tzr7JjpnDCdD1rQjSsqJVpg" />
              </div>
            </div>
            <div className="p-6 flex flex-col flex-grow gap-3">
              <span className="text-tertiary font-label-sm text-label-sm uppercase tracking-wider">Selling</span>
              <h3 className="font-headline-sm text-headline-sm text-on-surface leading-tight group-hover:text-primary transition-colors">How To Sell A Creator Asset</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mt-auto pt-4 line-clamp-2">Step-by-step instructions on preparing your digital property for acquisition, from escrow to handover.</p>
            </div>
          </a>
          {/* Standard Article (Span 4) */}
          <a className="md:col-span-4 group rounded-xl overflow-hidden bg-surface-container-lowest border border-outline-variant/30 hover:border-primary/50 transition-all duration-300 flex flex-col shadow-sm hover:shadow-md mt-gutter md:mt-0" href="#">
            <div className="h-48 bg-surface-container-low relative overflow-hidden">
              <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                <Image fill className="object-cover" alt="How To Buy Instagram Pages Safely" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAT-1xwhk1uNwRByvxARhYPCdz3SXxopZcLj5CeIpvA6dJ1B0DyQXQZcfQPirM8p7EcEmMcLH0HLWCDMyk5N6rAwW7NX1MheQHow0PmJ0EeJNeHM7ea1o3ZYQGA8gKM3Ulbqr1w3tqoC5aQ_om0bOuPY3RLCJpnDzC90Q6_c6wm_QyMxEDhwbljMCQhzCHemYPPYF9VH19wtWuZspWYjAJcBTHnLvcN5izt58vbwF-Mgf6jyLRpbnPfC-0H-NfGbpNbjkaAhVh7CuM" />
              </div>
            </div>
            <div className="p-6 flex flex-col flex-grow gap-3">
              <span className="text-secondary font-label-sm text-label-sm uppercase tracking-wider">Buying</span>
              <h3 className="font-headline-sm text-headline-sm text-on-surface leading-tight group-hover:text-primary transition-colors">How To Buy Instagram Pages Safely</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mt-auto pt-4 line-clamp-2">Mitigate risk during acquisition with our due diligence checklist and escrow best practices.</p>
            </div>
          </a>
          {/* Standard Article (Span 4) */}
          <a className="md:col-span-4 group rounded-xl overflow-hidden bg-surface-container-lowest border border-outline-variant/30 hover:border-primary/50 transition-all duration-300 flex flex-col shadow-sm hover:shadow-md mt-gutter md:mt-0" href="#">
            <div className="h-48 bg-surface-container-low relative overflow-hidden">
              <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                <Image fill className="object-cover" alt="Digital Asset Marketplace Explained" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDs-D4Zsw56QWH1IfGqy7Ok7-LZjif_vTl1V8hcXwH66_gRrS7H_RgrInX7_zha0dCQadMz-y1WN0_Eldza0vlCgbslRzoYmNp0IuptywJUTnIFJBOaYoK4MTM9JWDL9ZkSyOSWzZ3LQ2BgL2dB7MfRP6hHBNxQvCBD3lCR9Q5pQ-dqv0S_ELMN46txcr1fQ5IHWiCTNcFtqoCnIqYnHI_joxHc1po_O_tfL1KI9x6GgQ3Fz4u2VyZWTnbF-ACAfxhBEgS1IZO8rKY" />
              </div>
            </div>
            <div className="p-6 flex flex-col flex-grow gap-3">
              <span className="text-primary font-label-sm text-label-sm uppercase tracking-wider">Insights</span>
              <h3 className="font-headline-sm text-headline-sm text-on-surface leading-tight group-hover:text-primary transition-colors">Digital Asset Marketplace Explained</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mt-auto pt-4 line-clamp-2">Understand the fundamental economics and infrastructure powering the trade of creator-led businesses.</p>
            </div>
          </a>
        </div>
      </section>
    </SectionWrapper>
  );
}

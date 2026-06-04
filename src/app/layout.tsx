import type { Metadata } from "next";
import { inter, hankenGrotesk, jetbrainsMono } from "@/lib/fonts";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Script from "next/script";
import Link from "next/link";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://axcrivo.in"),
  title: "Axcrivo",
  description: "Buy & Sell Creator Assets With Confidence",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        {/* Google Analytics 4 — only loads when a real ID is configured */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && !process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID.includes('X') && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}

        {/* Microsoft Clarity — only loads when a real ID is configured */}
        {process.env.NEXT_PUBLIC_CLARITY_ID && !process.env.NEXT_PUBLIC_CLARITY_ID.includes('X') && (
          <Script
            id="microsoft-clarity"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(c,l,a,r,i,t,y){
                    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_ID}");
              `,
            }}
          />
        )}
      </head>
      <body
        className={`${inter.variable} ${hankenGrotesk.variable} ${jetbrainsMono.variable} antialiased min-h-screen flex flex-col`}
        style={{ backgroundColor: "#fbf8ff", color: "#191b24" }}
      >
        {/* Announcement Bar */}
        <div className="bg-primary-container text-white text-center py-2 px-4 font-body-md text-[14px] flex items-center justify-center gap-2 z-50 relative">
          <span className="material-symbols-outlined text-sm">campaign</span>
          Early Access Open — Get a Free Creator Asset Valuation.
          <Link className="underline font-semibold ml-2 hover:opacity-90 transition-opacity" href="/valuation">Apply Now</Link>
        </div>
        <Navbar />
        <div className="flex-1 flex flex-col">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}

import { Metadata } from "next";
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from "@/constants";

interface SeoProps {
  title?: string;
  description?: string;
  ogImage?: string;
  path?: string;
  keywords?: string[];
  exactTitle?: boolean;
}

export function createMetadata({
  title,
  description = SITE_DESCRIPTION,
  ogImage = "/og-image-v3.png",
  path = "",
  keywords = [],
  exactTitle = false,
}: SeoProps = {}): Metadata {
  const url = `${SITE_URL}${path}`;
  const fullTitle = exactTitle && title ? title : (title ? `${title} | ${SITE_NAME}` : SITE_NAME);

  // Always use absolute URL with cache-busting v=3 for social crawlers (WhatsApp, FB, LinkedIn)
  const absoluteImageUrl = ogImage.startsWith("http")
    ? ogImage
    : `${SITE_URL}${ogImage}?v=3`;

  return {
    title: fullTitle,
    description,
    keywords,
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      images: [
        {
          url: absoluteImageUrl,
          width: 1200,
          height: 630,
          alt: `${fullTitle} — Axcrivo`,
          type: "image/png",
        },
      ],
      type: "website",
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [absoluteImageUrl],
      site: "@axcrivo",
    },
    alternates: {
      canonical: url,
    },
  };
}



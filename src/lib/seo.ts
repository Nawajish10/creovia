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
  ogImage = "/og-image.png",
  path = "",
  keywords = [],
  exactTitle = false,
}: SeoProps = {}): Metadata {
  const url = `${SITE_URL}${path}`;
  const fullTitle = exactTitle && title ? title : (title ? `${title} | ${SITE_NAME}` : SITE_NAME);

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
          url: ogImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: url,
    },
  };
}

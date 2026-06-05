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
  ogImage = "/og-image-v2.png",
  path = "",
  keywords = [],
  exactTitle = false,
}: SeoProps = {}): Metadata {
  const url = `${SITE_URL}${path}`;
  const fullTitle = exactTitle && title ? title : (title ? `${title} | ${SITE_NAME}` : SITE_NAME);

  // Append cache-busting version query ?v=2 to OG image if not already present
  const imageUrl = ogImage.includes("v=") ? ogImage : `${ogImage}${ogImage.includes("?") ? "&" : "?"}v=1`;

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
          url: imageUrl,
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
      images: [imageUrl],
    },
    alternates: {
      canonical: url,
    },
  };
}


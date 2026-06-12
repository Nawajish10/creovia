/**
 * Recommendation Engine for Axcrivo.
 * Generates custom improvement tips based on the weakest factors from quality score breakdowns.
 */
export function generateRecommendations(
  assetType: "social" | "website" | "domain",
  breakdown: Record<string, number>,
  verificationScore: number,
  platform: string
): string[] {
  const recommendations: string[] = [];
  const platformLower = platform.toLowerCase();

  // 1. Check trust / verification score
  if (verificationScore < 70) {
    recommendations.push(
      "Upload additional verification screenshots (such as demographic insights, Stripe payouts, or domain ownership screenshots) to boost verification trust score."
    );
  }

  // 2. Check platform-specific metric factor scores
  if (assetType === "social") {
    const isCommunity = ["telegram", "whatsapp", "discord", "facebook group"].some((p) =>
      platformLower.includes(p)
    );

    if (isCommunity) {
      if ((breakdown.members ?? 100) < 60) {
        recommendations.push(
          "Establish promotional cross-partnerships with allied groups to scale up the community member size."
        );
      }
      if ((breakdown.activity ?? 100) < 60) {
        recommendations.push(
          "Host member polls, QA sessions, or exclusive giveaways to increase daily active chat participation."
        );
      }
    } else {
      if ((breakdown.followers ?? 100) < 50) {
        recommendations.push(
          "Crosspost short-form video snippets (such as Reels, Shorts, and TikToks) to accelerate follower acquisition scale."
        );
      }
      if ((breakdown.engagement ?? 100) < 60) {
        recommendations.push(
          "Optimize post engagement by replying to comments in the first hour and designing posts that invite shares or saves."
        );
      }
      if ((breakdown.audience ?? 100) < 70) {
        recommendations.push(
          "Target content or hashtags relevant to Tier 1 geographies (US, UK, CA, AU) to attract high-yield advertising scores."
        );
      }
    }

    if ((breakdown.niche ?? 100) < 50) {
      recommendations.push(
        "Integrate content themes around high-CPM advertiser categories (finance, tech, AI, or business) to elevate multiplier valuation."
      );
    }
    if ((breakdown.growth ?? 100) < 60) {
      recommendations.push(
        "Maintain post frequency consistency to reverse audience churn rates and restore growth velocity."
      );
    }
  } else if (assetType === "website") {
    if ((breakdown.revenue ?? 100) < 50) {
      recommendations.push(
        "Diversify revenue streams (such as digital products, sponsors, or newsletter subscriptions) to build a stable cash flow."
      );
    }
    if ((breakdown.traffic ?? 100) < 60) {
      recommendations.push(
        "Implement target keyword clustering for SEO to capture broader search traffic footfalls."
      );
    }
    if ((breakdown.domain_strength ?? 100) < 50) {
      recommendations.push(
        "Build backlink authority (DA) by contributing authoritative guest articles within your niche."
      );
    }
    if ((breakdown.seo_strength ?? 100) < 60) {
      recommendations.push(
        "Fix technical search optimization issues (slow loading speeds, broken links, image formats) to rank higher organically."
      );
    }
    if ((breakdown.social_proof ?? 100) < 60) {
      recommendations.push(
        "Create active supporting social accounts to build direct audience brand equity outside organic search channels."
      );
    }
  } else if (assetType === "domain") {
    if ((breakdown.length ?? 100) < 60) {
      recommendations.push(
        "Consider registering or redirecting shorter matching domain alternatives (less than 10 characters) to improve recall value."
      );
    }
    if ((breakdown.brandability ?? 100) < 65) {
      recommendations.push(
        "Ensure domain branding avoids complex hyphens, double characters, or confusing numerals."
      );
    }
    if ((breakdown.extension ?? 100) < 70) {
      recommendations.push(
        "Acquire the primary '.com' or '.io' top-level extensions to maximize reseller auction demand ratings."
      );
    }
  }

  // Fallback: Default recommendation if all criteria are healthy
  if (recommendations.length === 0) {
    recommendations.push(
      "Maintain consistent audience engagement and monthly revenue growth velocity to lock in premium valuation ranges."
    );
  }

  return recommendations;
}

import { ScoringResult } from "./types";
import { WEBSITE_WEIGHTS } from "./rules";

/**
 * Calculates quality score, breakdown, strengths, and weaknesses for websites/SaaS.
 */
export function calculateWebsiteScore(metrics: any): Omit<ScoringResult, "assetHealth"> {
  const breakdown: Record<string, number> = {};
  const strengths: string[] = [];
  const weaknesses: string[] = [];

  const rawRevenue = Number(metrics.monthly_revenue) || 0;
  // Convert legacy USD revenue to INR for unified scoring checks
  const revenue = rawRevenue < 15000 ? rawRevenue * 83 : rawRevenue;
  const traffic = Number(metrics.monthly_traffic) || Number(metrics.monthly_views) || 0;

  // 1. Revenue Score (0-100 scale, Weight: 40%)
  let revenueScore = 10;
  if (revenue >= 415000) {
    revenueScore = 100;
    strengths.push("High revenue asset (exceeds ₹4.15L monthly)");
  } else if (revenue >= 83000) {
    revenueScore = 70;
    strengths.push("Established monthly cash flow (exceeds ₹83k monthly)");
  } else if (revenue >= 8300) {
    revenueScore = 40;
  } else {
    revenueScore = 10;
    weaknesses.push("Low monetization yield limit");
  }
  breakdown.revenue = revenueScore;

  // 2. Traffic Score (0-100 scale, Weight: 20%)
  let trafficScore = 10;
  if (traffic >= 200000) {
    trafficScore = 100;
    strengths.push("High volume traffic profile (exceeds 200k pageviews/mo)");
  } else if (traffic >= 50000) {
    trafficScore = 80;
    strengths.push("Healthy traffic volume (exceeds 50k pageviews/mo)");
  } else if (traffic >= 10000) {
    trafficScore = 55;
  } else if (traffic >= 1000) {
    trafficScore = 30;
  } else {
    trafficScore = 10;
    weaknesses.push("Small traffic footfalls limits organic monetizability");
  }
  breakdown.traffic = trafficScore;

  // 3. Growth Score (0-100 scale, Weight: 15%)
  const growthTrend = (metrics.metadata?.growth_trend || "stable").toLowerCase();
  let growthScore = 60;
  if (growthTrend.includes("positive") || growthTrend.includes("high")) {
    growthScore = 100;
    strengths.push("Accelerating monthly traffic and cashflow growth");
  } else if (growthTrend.includes("declining") || growthTrend.includes("negative")) {
    growthScore = 20;
    weaknesses.push("Declining traffic and revenue trajectory");
  }
  breakdown.growth = growthScore;

  // 4. Domain Strength Score (0-100 scale, Weight: 10%)
  const da = Number(metrics.metadata?.domain_authority) || 20; // default to 20
  let daScore = 30;
  if (da >= 50) {
    daScore = 100;
    strengths.push(`Excellent Domain Authority (DA: ${da})`);
  } else if (da >= 35) {
    daScore = 80;
    strengths.push(`Strong Domain Authority (DA: ${da})`);
  } else if (da >= 15) {
    daScore = 50;
  } else {
    daScore = 20;
    weaknesses.push(`Low backlink domain authority (DA: ${da})`);
  }
  breakdown.domain_strength = daScore;

  // 5. SEO Strength Score (0-100 scale, Weight: 10%)
  const seoProfile = (metrics.metadata?.seo_strength || "average").toLowerCase();
  let seoScore = 70;
  if (seoProfile.includes("strong") || seoProfile.includes("excellent")) {
    seoScore = 100;
    strengths.push("High organic search keyword positioning");
  } else if (seoProfile.includes("weak") || seoProfile.includes("poor")) {
    seoScore = 30;
    weaknesses.push("Weak search optimization (reliance on paid channels)");
  }
  breakdown.seo_strength = seoScore;

  // 6. Social Proof / Brand Presence (0-100 scale, Weight: 5%)
  const socialProof = (metrics.metadata?.social_proof || "average").toLowerCase();
  let socialScore = 60;
  if (socialProof.includes("strong")) {
    socialScore = 100;
    strengths.push("Established brand authority with robust community support");
  }
  breakdown.social_proof = socialScore;

  // Calculate Weighted Asset Score
  const totalScore = Math.round(
    (revenueScore * WEBSITE_WEIGHTS.revenue) +
    (trafficScore * WEBSITE_WEIGHTS.traffic) +
    (growthScore * WEBSITE_WEIGHTS.growth) +
    (daScore * WEBSITE_WEIGHTS.domain_strength) +
    (seoScore * WEBSITE_WEIGHTS.seo_strength) +
    (socialScore * WEBSITE_WEIGHTS.social_proof)
  );

  return {
    assetScore: Math.min(totalScore, 100),
    breakdown,
    strengths,
    weaknesses,
  };
}

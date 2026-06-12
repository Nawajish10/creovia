/**
 * Comprehensive test suite for the Automated Valuation Engine.
 * Tests all multiplier modules, confidence scoring, and end-to-end valuation calculations.
 *
 * Run: npx tsx src/lib/valuation/engine/__tests__/valuationEngine.test.ts
 */

import { calculateValuation } from "../calculateValuation";
import { calculateConfidenceScore } from "../calculateConfidence";
import { getRevenueMultiplier } from "../revenueMultipliers";
import { getEngagementMultiplier } from "../engagementMultipliers";
import { getNicheMultiplier } from "../nicheMultipliers";
import { getCountryMultiplier } from "../countryMultipliers";
import { getAgeMultiplier } from "../ageMultipliers";
import { getMonetizationMultiplier } from "../monetizationMultipliers";
import type { ValuationInput, ValuationResult } from "../types";

let passed = 0;
let failed = 0;

function assert(condition: boolean, testName: string): void {
  if (condition) {
    passed++;
    process.stdout.write(`  ✓ ${testName}\n`);
  } else {
    failed++;
    process.stderr.write(`  ✗ FAIL: ${testName}\n`);
  }
}

function assertClose(actual: number, expected: number, tolerance: number, testName: string): void {
  assert(Math.abs(actual - expected) <= tolerance, `${testName} (got ${actual}, expected ~${expected})`);
}

// ─── Revenue Multiplier Tests ───────────────────────────────────────────────

process.stdout.write("\n═══ Revenue Multipliers ═══\n");

assert(getRevenueMultiplier(6000) === 36, "Premium: Revenue > 5000 → 36x");
assert(getRevenueMultiplier(5001) === 36, "Premium boundary: Revenue = 5001 → 36x");
assert(getRevenueMultiplier(5000) === 30, "Good boundary: Revenue = 5000 → 30x");
assert(getRevenueMultiplier(2000) === 30, "Good: Revenue = 2000 → 30x");
assert(getRevenueMultiplier(1001) === 30, "Good boundary: Revenue = 1001 → 30x");
assert(getRevenueMultiplier(1000) === 24, "Average boundary: Revenue = 1000 → 24x");
assert(getRevenueMultiplier(500) === 24, "Average: Revenue = 500 → 24x");
assert(getRevenueMultiplier(251) === 24, "Average boundary: Revenue = 251 → 24x");
assert(getRevenueMultiplier(250) === 18, "Low boundary: Revenue = 250 → 18x");
assert(getRevenueMultiplier(100) === 18, "Low: Revenue = 100 → 18x");
assert(getRevenueMultiplier(0) === 18, "Zero revenue → 18x");

// ─── Engagement Multiplier Tests ────────────────────────────────────────────

process.stdout.write("\n═══ Engagement Multipliers ═══\n");

assert(getEngagementMultiplier(15) === 1.20, "Exceptional: ER > 10 → 1.20");
assert(getEngagementMultiplier(10.1) === 1.20, "Exceptional boundary: ER = 10.1 → 1.20");
assert(getEngagementMultiplier(10) === 1.10, "Strong boundary: ER = 10 → 1.10");
assert(getEngagementMultiplier(5) === 1.10, "Strong: ER = 5 → 1.10");
assert(getEngagementMultiplier(4.99) === 1.00, "Average: ER = 4.99 → 1.00");
assert(getEngagementMultiplier(2) === 1.00, "Average boundary: ER = 2 → 1.00");
assert(getEngagementMultiplier(1.99) === 0.85, "Low: ER = 1.99 → 0.85");
assert(getEngagementMultiplier(0) === 0.85, "Zero engagement → 0.85");

// ─── Niche Multiplier Tests ─────────────────────────────────────────────────

process.stdout.write("\n═══ Niche Multipliers ═══\n");

assert(getNicheMultiplier("finance") === 1.40, "finance → 1.40");
assert(getNicheMultiplier("Finance & Business") === 1.40, "Finance & Business (case insensitive) → 1.40");
assert(getNicheMultiplier("BUSINESS") === 1.30, "BUSINESS → 1.30");
assert(getNicheMultiplier("ai") === 1.30, "ai → 1.30");
assert(getNicheMultiplier("AI & Tech") === 1.30, "AI & Tech → 1.30");
assert(getNicheMultiplier("crypto") === 1.25, "crypto → 1.25");
assert(getNicheMultiplier("education") === 1.20, "education → 1.20");
assert(getNicheMultiplier("marketing") === 1.20, "marketing → 1.20");
assert(getNicheMultiplier("lifestyle") === 1.00, "lifestyle → 1.00");
assert(getNicheMultiplier("travel") === 0.95, "travel → 0.95");
assert(getNicheMultiplier("meme") === 0.80, "meme → 0.80");
assert(getNicheMultiplier("cooking") === 1.00, "Unknown niche → 1.00");
assert(getNicheMultiplier(undefined) === 1.00, "No niche → 1.00");
assert(getNicheMultiplier("") === 1.00, "Empty niche → 1.00");

// ─── Country Multiplier Tests ───────────────────────────────────────────────

process.stdout.write("\n═══ Country Multipliers ═══\n");

assert(getCountryMultiplier("us") === 1.20, "us → 1.20");
assert(getCountryMultiplier("US") === 1.20, "US (case insensitive) → 1.20");
assert(getCountryMultiplier("uk") === 1.15, "uk → 1.15");
assert(getCountryMultiplier("canada") === 1.10, "canada → 1.10");
assert(getCountryMultiplier("Australia") === 1.10, "Australia → 1.10");
assert(getCountryMultiplier("Europe") === 1.10, "Europe → 1.10");
assert(getCountryMultiplier("Global") === 1.05, "Global → 1.05");
assert(getCountryMultiplier("India") === 1.00, "India → 1.00");
assert(getCountryMultiplier("brazil") === 1.00, "Unknown country → 1.00");
assert(getCountryMultiplier(undefined) === 1.00, "No country → 1.00");

// ─── Age Multiplier Tests ───────────────────────────────────────────────────

process.stdout.write("\n═══ Age Multipliers ═══\n");

assert(getAgeMultiplier("3 months") === 0.75, "3 months → 0.75");
assert(getAgeMultiplier("5 Months") === 0.75, "5 Months → 0.75");
assert(getAgeMultiplier("6 months") === 0.90, "6 months → 0.90");
assert(getAgeMultiplier("10 months") === 0.90, "10 months → 0.90");
assert(getAgeMultiplier("12 months") === 1.00, "12 months → 1.00");
assert(getAgeMultiplier("1 year") === 1.00, "1 year → 1.00");
assert(getAgeMultiplier("1.5 years") === 1.00, "1.5 years → 1.00");
assert(getAgeMultiplier("2 years") === 1.00, "2 years → 1.00");
assert(getAgeMultiplier("2 Years") === 1.00, "2 Years (case insensitive) → 1.00");
assert(getAgeMultiplier("3 years") === 1.10, "3 years → 1.10");
assert(getAgeMultiplier("5 years") === 1.10, "5 years → 1.10");
assert(getAgeMultiplier("6 years") === 1.15, "6 years → 1.15");
assert(getAgeMultiplier("10 years") === 1.15, "10 years → 1.15");
assert(getAgeMultiplier(undefined) === 1.00, "No age → 1.00");
assert(getAgeMultiplier("") === 1.00, "Empty age → 1.00");
assert(getAgeMultiplier("unknown") === 1.00, "Unparseable age → 1.00");

// ─── Monetization Multiplier Tests ──────────────────────────────────────────

process.stdout.write("\n═══ Monetization Multipliers ═══\n");

assert(getMonetizationMultiplier(undefined) === 1.00, "No monetization → 1.00");
assert(getMonetizationMultiplier([]) === 1.00, "Empty array → 1.00");
assert(getMonetizationMultiplier(["Ad Revenue"]) === 1.00, "1 source → 1.00");
assert(getMonetizationMultiplier(["Ad Revenue", "Sponsorships"]) === 1.10, "2 sources → 1.10");
assert(getMonetizationMultiplier(["Ad Revenue", "Sponsorships", "Affiliate"]) === 1.15, "3 sources → 1.15");
assert(getMonetizationMultiplier(["A", "B", "C", "D"]) === 1.15, "4 sources → 1.15");

// ─── Confidence Score Tests ─────────────────────────────────────────────────

process.stdout.write("\n═══ Confidence Scoring ═══\n");

const fullInput: ValuationInput = {
  platform: "instagram",
  audienceSize: 100000,
  engagementRate: 5.5,
  monthlyRevenue: 3000,
  niche: "finance",
  country: "us",
  assetAge: "3 years",
  assetUrl: "https://instagram.com/test",
  analyticsScreenshot: true,
  monetizationStatus: ["Ad Revenue", "Sponsorships"],
};
const fullConfidence = calculateConfidenceScore(fullInput);
assert(fullConfidence.score === 100, "Full data → score 100");
assert(fullConfidence.level === "High", "Full data → High confidence");

const minimalInput: ValuationInput = {
  platform: "instagram",
  audienceSize: 100000,
  engagementRate: 0,
  monthlyRevenue: 0,
  analyticsScreenshot: false,
};
const minimalConfidence = calculateConfidenceScore(minimalInput);
assert(minimalConfidence.score === 0, "Minimal data → score 0");
assert(minimalConfidence.level === "Low", "Minimal data → Low confidence");

const mediumInput: ValuationInput = {
  platform: "youtube",
  audienceSize: 50000,
  engagementRate: 4.0,
  monthlyRevenue: 2000,
  assetUrl: "https://youtube.com/test",
  analyticsScreenshot: false,
};
const mediumConfidence = calculateConfidenceScore(mediumInput);
assert(mediumConfidence.score === 55, "Medium data → score 55 (revenue+url+engagement)");
assert(mediumConfidence.level === "Medium", "Medium data → Medium confidence");

// ─── End-to-End Valuation Tests ─────────────────────────────────────────────

process.stdout.write("\n═══ End-to-End: Instagram Account ═══\n");

const instagramResult = calculateValuation({
  platform: "instagram",
  audienceSize: 100000,
  engagementRate: 5.5,
  monthlyRevenue: 3000,
  niche: "finance",
  country: "us",
  assetAge: "3 years",
  assetUrl: "https://instagram.com/test",
  analyticsScreenshot: true,
  monetizationStatus: ["Ad Revenue", "Sponsorships"],
});

// Revenue: 3000 * 30 = 90000
// Audience: 100000 * 0.05 = 5000
// Base = max(90000, 5000) = 90000
// * 1.10 (engagement ≥5%) * 1.40 (finance) * 1.20 (US) * 1.10 (3 years) * 1.10 (2 sources)
// = 90000 * 1.10 * 1.40 * 1.20 * 1.10 * 1.10 = 90000 * 2.2869... ≈ 226,513
assert(instagramResult.estimatedValue > 0, "Instagram: estimatedValue > 0");
assert(instagramResult.lowRange < instagramResult.estimatedValue, "Instagram: lowRange < estimatedValue");
assert(instagramResult.highRange > instagramResult.estimatedValue, "Instagram: highRange > estimatedValue");
assertClose(instagramResult.lowRange, Math.round(instagramResult.estimatedValue * 0.85), 1, "Instagram: lowRange = estimatedValue * 0.85");
assertClose(instagramResult.highRange, Math.round(instagramResult.estimatedValue * 1.15), 1, "Instagram: highRange = estimatedValue * 1.15");
assert(instagramResult.confidenceScore === 100, "Instagram: full confidence");
assert(instagramResult.confidenceLevel === "High", "Instagram: High confidence level");
assert(instagramResult.breakdown.revenueValue === 90000, "Instagram: revenueValue = 90000");
assert(instagramResult.breakdown.audienceValue === 5000, "Instagram: audienceValue = 5000");
assert(instagramResult.breakdown.engagementMultiplier === 1.10, "Instagram: engagementMultiplier = 1.10");
assert(instagramResult.breakdown.nicheMultiplier === 1.40, "Instagram: nicheMultiplier = 1.40");
assert(instagramResult.breakdown.countryMultiplier === 1.20, "Instagram: countryMultiplier = 1.20");
assert(instagramResult.breakdown.ageMultiplier === 1.10, "Instagram: ageMultiplier = 1.10");
assert(instagramResult.breakdown.monetizationMultiplier === 1.10, "Instagram: monetizationMultiplier = 1.10");

// Manual calculation verification
const expectedInstagram = Math.round(90000 * 1.10 * 1.40 * 1.20 * 1.10 * 1.10);
assert(instagramResult.estimatedValue === expectedInstagram, `Instagram: estimatedValue = ${expectedInstagram}`);

process.stdout.write("\n═══ End-to-End: YouTube Channel ═══\n");

const youtubeResult = calculateValuation({
  platform: "YouTube",
  audienceSize: 500000,
  engagementRate: 3.2,
  monthlyRevenue: 8000,
  niche: "education",
  country: "global",
  assetAge: "5 years",
  assetUrl: "https://youtube.com/test",
  analyticsScreenshot: true,
  monetizationStatus: ["Ad Revenue", "Sponsorships", "Digital Products"],
});

// Revenue: 8000 * 36 = 288000
// Audience: 500000 * 0.12 = 60000
// Base = max(288000, 60000) = 288000
// * 1.00 (engagement ≥2%) * 1.20 (education) * 1.05 (global) * 1.10 (5 years) * 1.15 (3 sources)
const expectedYoutubeBase = 288000;
assert(youtubeResult.breakdown.revenueValue === 288000, "YouTube: revenueValue = 288000");
assert(youtubeResult.breakdown.audienceValue === 60000, "YouTube: audienceValue = 60000");
assert(youtubeResult.breakdown.engagementMultiplier === 1.00, "YouTube: engagementMultiplier = 1.00");
assert(youtubeResult.breakdown.nicheMultiplier === 1.20, "YouTube: nicheMultiplier = 1.20");
assert(youtubeResult.breakdown.countryMultiplier === 1.05, "YouTube: countryMultiplier = 1.05");
assert(youtubeResult.breakdown.ageMultiplier === 1.10, "YouTube: ageMultiplier = 1.10");
assert(youtubeResult.breakdown.monetizationMultiplier === 1.15, "YouTube: monetizationMultiplier = 1.15");

const expectedYoutube = Math.round(expectedYoutubeBase * 1.00 * 1.20 * 1.05 * 1.10 * 1.15);
assert(youtubeResult.estimatedValue === expectedYoutube, `YouTube: estimatedValue = ${expectedYoutube}`);

process.stdout.write("\n═══ End-to-End: Revenue Only Asset ═══\n");

const revenueOnlyResult = calculateValuation({
  platform: "website",
  audienceSize: 0,
  engagementRate: 0,
  monthlyRevenue: 2000,
  analyticsScreenshot: false,
});

// Revenue: 2000 * 30 = 60000
// Audience: 0 * 0.03 = 0
// Base = max(60000, 0) = 60000
// * 0.85 (ER=0 <2%) * 1.00 (no niche) * 1.00 (no country) * 1.00 (no age) * 1.00 (no monetization)
const expectedRevenueOnly = Math.round(60000 * 0.85);
assert(revenueOnlyResult.estimatedValue === expectedRevenueOnly, `Revenue only: estimatedValue = ${expectedRevenueOnly}`);
assert(revenueOnlyResult.breakdown.audienceValue === 0, "Revenue only: audienceValue = 0");
assert(revenueOnlyResult.confidenceLevel === "Low", "Revenue only: Low confidence (only revenue provided)");

process.stdout.write("\n═══ End-to-End: Audience Only Asset ═══\n");

const audienceOnlyResult = calculateValuation({
  platform: "telegram",
  audienceSize: 200000,
  engagementRate: 8.0,
  monthlyRevenue: 0,
  analyticsScreenshot: false,
});

// Revenue: 0 * 18 = 0
// Audience: 200000 * 0.03 = 6000
// Base = max(0, 6000) = 6000
// * 1.10 (ER ≥5%) * 1.00 * 1.00 * 1.00 * 1.00
const expectedAudienceOnly = Math.round(6000 * 1.10);
assert(audienceOnlyResult.estimatedValue === expectedAudienceOnly, `Audience only: estimatedValue = ${expectedAudienceOnly}`);
assert(audienceOnlyResult.breakdown.revenueValue === 0, "Audience only: revenueValue = 0");

process.stdout.write("\n═══ End-to-End: Low Engagement Asset ═══\n");

const lowEngagementResult = calculateValuation({
  platform: "instagram",
  audienceSize: 50000,
  engagementRate: 0.5,
  monthlyRevenue: 500,
  niche: "meme",
  analyticsScreenshot: false,
});

// Revenue: 500 * 24 = 12000
// Audience: 50000 * 0.05 = 2500
// Base = max(12000, 2500) = 12000
// * 0.85 (ER <2%) * 0.80 (meme) * 1.00 * 1.00 * 1.00
const expectedLowEng = Math.round(12000 * 0.85 * 0.80);
assert(lowEngagementResult.estimatedValue === expectedLowEng, `Low engagement: estimatedValue = ${expectedLowEng}`);
assert(lowEngagementResult.breakdown.engagementMultiplier === 0.85, "Low engagement: engagementMultiplier = 0.85");
assert(lowEngagementResult.breakdown.nicheMultiplier === 0.80, "Low engagement: nicheMultiplier = 0.80 (meme)");

process.stdout.write("\n═══ End-to-End: High Engagement Asset ═══\n");

const highEngagementResult = calculateValuation({
  platform: "instagram",
  audienceSize: 50000,
  engagementRate: 15,
  monthlyRevenue: 500,
  niche: "finance",
  country: "us",
  assetAge: "2 years",
  analyticsScreenshot: false,
});

assert(highEngagementResult.breakdown.engagementMultiplier === 1.20, "High engagement: engagementMultiplier = 1.20");
assert(highEngagementResult.breakdown.nicheMultiplier === 1.40, "High engagement: nicheMultiplier = 1.40 (finance)");
assert(highEngagementResult.breakdown.countryMultiplier === 1.20, "High engagement: countryMultiplier = 1.20 (US)");

process.stdout.write("\n═══ End-to-End: Premium Niche ═══\n");

const premiumNicheResult = calculateValuation({
  platform: "youtube",
  audienceSize: 100000,
  engagementRate: 4.0,
  monthlyRevenue: 6000,
  niche: "Crypto Trading",
  country: "uk",
  analyticsScreenshot: false,
});

assert(premiumNicheResult.breakdown.nicheMultiplier === 1.25, "Premium niche: crypto → 1.25");
assert(premiumNicheResult.breakdown.countryMultiplier === 1.15, "Premium niche: UK → 1.15");

process.stdout.write("\n═══ End-to-End: Default Niche ═══\n");

const defaultNicheResult = calculateValuation({
  platform: "instagram",
  audienceSize: 10000,
  engagementRate: 3.0,
  monthlyRevenue: 100,
  niche: "gardening",
  analyticsScreenshot: false,
});

assert(defaultNicheResult.breakdown.nicheMultiplier === 1.00, "Default niche: gardening → 1.00");

process.stdout.write("\n═══ End-to-End: No Monetization ═══\n");

const noMonetizationResult = calculateValuation({
  platform: "telegram",
  audienceSize: 50000,
  engagementRate: 3.0,
  monthlyRevenue: 0,
  monetizationStatus: [],
  analyticsScreenshot: false,
});

assert(noMonetizationResult.breakdown.monetizationMultiplier === 1.00, "No monetization: multiplier = 1.00");

process.stdout.write("\n═══ End-to-End: Multiple Monetization Sources ═══\n");

const multiMonetizationResult = calculateValuation({
  platform: "youtube",
  audienceSize: 200000,
  engagementRate: 6.0,
  monthlyRevenue: 10000,
  monetizationStatus: ["Ad Revenue", "Sponsorships", "Affiliate", "Digital Products"],
  niche: "business",
  country: "canada",
  assetAge: "4 years",
  assetUrl: "https://youtube.com/channel",
  analyticsScreenshot: true,
});

assert(multiMonetizationResult.breakdown.monetizationMultiplier === 1.15, "Multi monetization: 4 sources → 1.15");
assert(multiMonetizationResult.confidenceScore === 100, "Multi monetization: full confidence");
assert(multiMonetizationResult.confidenceLevel === "High", "Multi monetization: High confidence");

// Verify the exact calculation
const expectedMultiRevenue = 10000 * 36; // Premium tier
const expectedMultiAudience = 200000 * 0.12; // YouTube
const expectedMultiBase = Math.max(expectedMultiRevenue, expectedMultiAudience);
const expectedMultiFinal = Math.round(
  expectedMultiBase * 1.10 * 1.30 * 1.10 * 1.10 * 1.15
);
assert(multiMonetizationResult.estimatedValue === expectedMultiFinal,
  `Multi monetization: exact value = ${expectedMultiFinal}`);

// ─── Range Verification ─────────────────────────────────────────────────────

process.stdout.write("\n═══ Range Verification ═══\n");

const rangeResult = calculateValuation({
  platform: "instagram",
  audienceSize: 50000,
  engagementRate: 5.0,
  monthlyRevenue: 1500,
  analyticsScreenshot: false,
});

assert(rangeResult.lowRange === Math.round(rangeResult.estimatedValue * 0.85), "Range: lowRange = 85% of estimated");
assert(rangeResult.highRange === Math.round(rangeResult.estimatedValue * 1.15), "Range: highRange = 115% of estimated");
assert(Number.isInteger(rangeResult.estimatedValue), "Range: estimatedValue is integer");
assert(Number.isInteger(rangeResult.lowRange), "Range: lowRange is integer");
assert(Number.isInteger(rangeResult.highRange), "Range: highRange is integer");

// ─── Summary ────────────────────────────────────────────────────────────────

process.stdout.write("\n══════════════════════════════════════\n");
process.stdout.write(`Total: ${passed + failed} | Passed: ${passed} | Failed: ${failed}\n`);
process.stdout.write("══════════════════════════════════════\n\n");

if (failed > 0) {
  process.exit(1);
}

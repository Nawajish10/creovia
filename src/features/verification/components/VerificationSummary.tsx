"use client";

import { VerificationScoreCard } from "@/lib/verification/types";

interface VerificationSummaryProps {
  scorecard: VerificationScoreCard;
}

export function VerificationSummary({ scorecard }: VerificationSummaryProps) {
  const {
    verification_score,
    badge,
    url_verified,
    screenshot_verified,
    metrics_match_score,
    flags,
    verification_details,
  } = scorecard;

  function getScoreColorClass(score: number) {
    if (score >= 70) return "text-emerald-600 bg-emerald-50 border-emerald-200";
    if (score >= 40) return "text-amber-600 bg-amber-50 border-amber-200";
    return "text-red-600 bg-red-50 border-red-200";
  }

  function getScoreProgressColor(score: number) {
    if (score >= 70) return "#10b981"; // emerald-500
    if (score >= 40) return "#f59e0b"; // amber-500
    return "#ef4444"; // red-500
  }

  function formatMetricName(name: string) {
    return name
      .replace("monthly_", "")
      .replace("engagement_rate", "Engagement")
      .replace(/^\w/, (c) => c.toUpperCase());
  }

  return (
    <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
      <div className="flex flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-outline-variant/10">
        <div>
          <h3 className="font-headline-md text-lg text-on-surface font-bold" style={{ fontFamily: "var(--font-hanken)" }}>
            Trust & Verification Audit
          </h3>
          <p className="text-on-surface-variant text-xs mt-0.5" style={{ color: "#434656" }}>
            Real-time validation analysis matching user inputs against OCR-extracted proof documents.
          </p>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-semibold border ${getScoreColorClass(verification_score)}`}>
          {badge}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Score Ring Gauge */}
        <div className="flex flex-col items-center justify-center p-6 bg-surface-container-low border border-outline-variant/20 rounded-2xl text-center space-y-3">
          <div className="relative w-28 h-28 flex items-center justify-center">
            {/* SVG Progress Circle */}
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="56"
                cy="56"
                r="46"
                stroke="#e2e1ee"
                strokeWidth="8"
                fill="transparent"
              />
              <circle
                cx="56"
                cy="56"
                r="46"
                stroke={getScoreProgressColor(verification_score)}
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={289}
                strokeDashoffset={289 - (289 * verification_score) / 100}
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center leading-none">
              <span className="text-3xl font-black text-on-surface" style={{ fontFamily: "var(--font-hanken)" }}>
                {verification_score}
              </span>
              <span className="text-[10px] text-on-surface-variant uppercase tracking-widest mt-1 font-semibold" style={{ color: "#434656" }}>
                Trust Score
              </span>
            </div>
          </div>
          <p className="text-xs text-on-surface-variant max-w-[150px] leading-relaxed" style={{ color: "#434656" }}>
            Aggregated from profile URLs, screenshots, and metrics.
          </p>
        </div>

        {/* Verification Checkpoints */}
        <div className="md:col-span-2 space-y-4 flex flex-col justify-center">
          <h4 className="font-headline-sm text-xs uppercase tracking-wider text-on-surface-variant font-semibold" style={{ color: "#434656" }}>
            Checkpoint Checklist
          </h4>
          <div className="space-y-3">
            <CheckpointItem
              label="URL Verification (Handles, accessibility checks)"
              passed={url_verified}
              score={url_verified ? 50 : 20}
              max={50}
              details={url_verified ? "Public profile accessible & online check verified." : "Profile format check approved. Direct data access pending manual admin review."}
            />
            <CheckpointItem
              label="Verification Screenshots Uploaded"
              passed={screenshot_verified}
              score={screenshot_verified ? 50 : 15}
              max={50}
              details="Checks for presence of Analytics, Revenue, and Insights dashboard proof files."
            />
            <CheckpointItem
              label="Metrics Matching Correlation"
              passed={metrics_match_score >= 70}
              score={metrics_match_score}
              max={100}
              details="Calculates percentage variance between manually reported fields and OCR text values."
            />
          </div>
        </div>
      </div>

      {/* Comparisons Table */}
      {Object.keys(verification_details).length > 0 && (
        <div className="space-y-3">
          <h4 className="font-headline-sm text-xs uppercase tracking-wider text-on-surface-variant font-semibold" style={{ color: "#434656" }}>
            Comparison Breakdown
          </h4>
          <div className="border border-outline-variant/30 rounded-2xl overflow-hidden bg-surface-container-low">
            <table className="w-full border-collapse text-left text-xs">
              <thead className="bg-surface-container border-b border-outline-variant/30 text-on-surface-variant uppercase tracking-wider text-[10px] font-semibold" style={{ color: "#434656" }}>
                <tr>
                  <th className="p-3 pl-4">Metric</th>
                  <th className="p-3 text-right">Submitted</th>
                  <th className="p-3 text-right">OCR Extracted</th>
                  <th className="p-3 text-right">Variance %</th>
                  <th className="p-3 pr-4 text-right">Metric Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/15 text-on-surface">
                {Object.entries(verification_details).map(([key, details]) => (
                  <tr key={key} className="hover:bg-surface-container-lowest/40 transition-colors">
                    <td className="p-3 pl-4 font-medium">{formatMetricName(key)}</td>
                    <td className="p-3 text-right font-mono">{details.submitted.toLocaleString()}</td>
                    <td className="p-3 text-right font-mono">{details.extracted.toLocaleString()}</td>
                    <td className="p-3 text-right font-mono">
                      {details.difference === 0 ? "0%" : `±${details.difference}%`}
                    </td>
                    <td className="p-3 pr-4 text-right">
                      <span className={`inline-block px-2 py-0.5 rounded font-mono font-bold ${
                        details.score >= 80 ? "text-emerald-700 bg-emerald-50" : 
                        details.score >= 50 ? "text-amber-700 bg-amber-50" : 
                        "text-red-700 bg-red-50"
                      }`}>
                        {details.score}/100
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Flags & Warnings */}
      {flags && flags.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-headline-sm text-xs uppercase tracking-wider text-red-600 font-semibold">
            Manual Review Flags & Discrepancies
          </h4>
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 space-y-2">
            {flags.map((flag, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-red-800 leading-normal">
                <span className="material-symbols-outlined text-[16px] text-red-600 mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
                <div>
                  <span className="font-semibold block">{flag.replace(/_/g, " ")}</span>
                  <span className="opacity-90">{getFlagDescription(flag)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function CheckpointItem({ label, passed, score, max, details }: { label: string; passed: boolean; score: number; max: number; details: string }) {
  return (
    <div className="flex items-start gap-3 p-3 bg-surface rounded-xl border border-outline-variant/10 hover:border-outline-variant/30 transition-colors">
      <div 
        className={`w-6 h-6 rounded-full flex items-center justify-center mt-0.5 ${
          passed ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-400"
        }`}
      >
        <span className="material-symbols-outlined text-[16px] font-bold">
          {passed ? "check" : "circle"}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <span className="text-xs font-semibold text-on-surface">{label}</span>
          <span className="text-[10px] font-mono font-bold bg-surface-container-low px-1.5 py-0.5 rounded text-on-surface-variant">
            {score}/{max}
          </span>
        </div>
        <p className="text-[10px] text-on-surface-variant mt-0.5 leading-relaxed" style={{ color: "#434656" }}>{details}</p>
      </div>
    </div>
  );
}

function getFlagDescription(flag: string): string {
  if (flag.includes("EXCEEDS_LIMIT")) {
    return "A submitted metric variance exceeds the permitted 30% difference threshold. Requires manual verification of uploaded dashboard documents.";
  }
  if (flag.includes("MISSING_ANALYTICS") || flag.includes("MISSING_AUDIENCE")) {
    return "No completed audience demographics or profile analytics screenshot was uploaded for this asset type. Highly recommended to provide screenshots.";
  }
  if (flag.includes("MISSING_REVENUE")) {
    return "The asset reported net monthly revenue, but no matching Stripe/earnings invoice was uploaded to verify. Please upload a payout proof.";
  }
  if (flag.includes("LOW_TRUST_SCORE")) {
    return "The combined verification score falls below 40. The asset is labeled Self-Reported and will trigger alert warnings on prospective buy requests.";
  }
  if (flag.includes("OCR_METRICS_EXTRACTION_MISSING")) {
    return "Screenshots were uploaded, but the parser failed to extract numeric fields from the OCR raw text stream. Requires manual review of image readability.";
  }
  return "Suspicious submission indicators. Checked and flag added for administrator audits.";
}

"use client";

import { useState } from "react";
import Link from "next/link";

interface AdminOcrClientProps {
  initialUploads: any[];
}

export function AdminOcrClient({ initialUploads }: AdminOcrClientProps) {
  const [uploads, setUploads] = useState<any[]>(initialUploads);
  const [selectedUploadId, setSelectedUploadId] = useState<string | null>(
    initialUploads.length > 0 ? initialUploads[0].id : null
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [processError, setProcessError] = useState("");
  const [processSuccess, setProcessSuccess] = useState("");

  const selectedUpload = uploads.find((u) => u.id === selectedUploadId);

  async function handleTriggerOCR() {
    if (!selectedUploadId) return;
    setIsProcessing(true);
    setProcessError("");
    setProcessSuccess("");

    try {
      // Set status in local UI state to processing
      setUploads((prev) =>
        prev.map((u) =>
          u.id === selectedUploadId ? { ...u, upload_status: "processing" } : u
        )
      );

      const res = await fetch("/api/valuation/process-upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ upload_id: selectedUploadId }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "OCR Processing failed");
      }

      setProcessSuccess("OCR processing completed successfully!");
      
      // Update local UI state with results
      setUploads((prev) =>
        prev.map((u) =>
          u.id === selectedUploadId
            ? {
                ...u,
                upload_status: "completed",
                extracted_text: data.raw_text,
                extracted_json: data.parsed_metrics,
              }
            : u
        )
      );
    } catch (err: any) {
      setProcessError(err.message || "An error occurred during OCR pipeline execution.");
      setUploads((prev) =>
        prev.map((u) =>
          u.id === selectedUploadId ? { ...u, upload_status: "failed" } : u
        )
      );
    } finally {
      setIsProcessing(false);
    }
  }

  function getStatusBadge(status: string) {
    switch (status) {
      case "pending":
      case "uploaded":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
            Uploaded
          </span>
        );
      case "processing":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 animate-pulse">
            Processing
          </span>
        );
      case "completed":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            Completed
          </span>
        );
      case "failed":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200">
            Failed
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
            {status}
          </span>
        );
    }
  }

  function getPlatformIcon(platform?: string) {
    const p = (platform || "").toLowerCase();
    if (p.includes("instagram")) return "photo_camera";
    if (p.includes("youtube")) return "video_library";
    if (p.includes("telegram")) return "send";
    if (p.includes("website")) return "language";
    if (p.includes("domain")) return "dns";
    return "grid_view";
  }

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      {/* Header */}
      <header className="bg-surface-container-lowest border-b border-outline-variant/30 py-4 px-8 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
          <Link href="/admin" className="text-on-surface-variant hover:text-on-surface flex items-center" style={{ minHeight: "unset" }}>
            <span className="material-symbols-outlined mr-1">arrow_back</span>
            Dashboard
          </Link>
          <span className="text-outline-variant/40">|</span>
          <h1 className="font-headline-sm text-on-surface font-bold text-lg">OCR Inspector</h1>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/leads" className="text-sm font-medium border border-outline-variant text-on-surface px-4 py-2 rounded-xl hover:bg-surface-container-low transition-colors" style={{ minHeight: "unset" }}>
            Leads
          </Link>
        </div>
      </header>

      {/* Main Layout */}
      <main className="flex-grow flex p-6 gap-6 max-w-[1600px] w-full mx-auto">
        {uploads.length === 0 ? (
          <div className="flex-1 bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-16 text-center shadow-sm space-y-4">
            <span className="material-symbols-outlined text-[48px] text-on-surface-variant/40">document_scanner</span>
            <h3 className="font-headline-sm text-xl text-on-surface font-bold">No Screenshots Uploaded</h3>
            <p className="text-on-surface-variant text-sm max-w-md mx-auto" style={{ color: "#434656" }}>
              There are no verification proofs uploaded to the system yet. Once a user submits screenshots, they will appear here.
            </p>
          </div>
        ) : (
          <>
            {/* Sidebar List */}
            <div className="w-1/4 space-y-4 max-h-[calc(100vh-140px)] overflow-y-auto pr-2">
              <h2 className="font-headline-sm text-sm text-on-surface px-1 uppercase tracking-wider font-semibold">
                Uploaded Proofs ({uploads.length})
              </h2>
              <div className="space-y-2">
                {uploads.map((up) => (
                  <button
                    key={up.id}
                    onClick={() => {
                      setSelectedUploadId(up.id);
                      setProcessError("");
                      setProcessSuccess("");
                    }}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                      selectedUploadId === up.id
                        ? "bg-surface-container-low border-primary/50 shadow-sm"
                        : "bg-surface-container-lowest border-outline-variant/10 hover:border-outline-variant/40"
                    }`}
                    style={{ minHeight: "unset" }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 w-9 h-9 rounded-lg flex items-center justify-center text-primary" style={{ color: "#003fd8" }}>
                        <span className="material-symbols-outlined text-[18px]">
                          {getPlatformIcon(up.valuation_assets?.platform)}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-headline-sm text-xs text-on-surface font-bold truncate">
                          {up.valuation_assets?.title || "Untitled Asset"}
                        </h4>
                        <p className="text-[10px] text-on-surface-variant uppercase tracking-wider mt-0.5" style={{ color: "#434656" }}>
                          {up.file_type} proof
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 flex justify-between items-center text-[10px] text-on-surface-variant pt-2 border-t border-outline-variant/10" style={{ color: "#434656" }}>
                      <span>{new Date(up.created_at).toLocaleDateString()}</span>
                      {getStatusBadge(up.upload_status)}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Panel */}
            <div className="w-3/4 flex flex-col gap-6">
              {selectedUpload && (
                <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm flex-grow">
                  {/* Top Header */}
                  <div className="flex justify-between items-start border-b border-outline-variant/10 pb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/5 px-2 py-0.5 rounded" style={{ color: "#003fd8" }}>
                          {selectedUpload.valuation_assets?.platform || "Unknown Platform"}
                        </span>
                        {getStatusBadge(selectedUpload.upload_status)}
                      </div>
                      <h3 className="font-headline-md text-xl text-on-surface font-bold">
                        {selectedUpload.valuation_assets?.title || "Valuation Request"}
                      </h3>
                      <p className="text-xs text-on-surface-variant" style={{ color: "#434656" }}>
                        Category: <span className="font-medium text-on-surface">{selectedUpload.file_type} proof</span> · Path: {selectedUpload.file_url}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <button
                        onClick={handleTriggerOCR}
                        disabled={isProcessing}
                        className="bg-primary text-on-primary text-xs font-semibold px-4 py-2.5 rounded-xl hover:opacity-95 transition-opacity disabled:opacity-50 flex items-center gap-1.5 cursor-pointer shadow-sm"
                        style={{ backgroundColor: "#003fd8", color: "#ffffff", minHeight: "unset" }}
                      >
                        <span className="material-symbols-outlined text-[16px]">{isProcessing ? "autorenew" : "document_scanner"}</span>
                        {isProcessing ? "Processing..." : selectedUpload.upload_status === "completed" ? "Re-run OCR" : "Run OCR Extraction"}
                      </button>
                      <span className="text-[10px] text-on-surface-variant" style={{ color: "#434656" }}>
                        ID: {selectedUpload.id}
                      </span>
                    </div>
                  </div>

                  {processError && (
                    <div className="bg-error-container text-on-error-container p-4 rounded-xl text-xs flex gap-2 items-center border border-error/15">
                      <span className="material-symbols-outlined text-[18px]">error</span>
                      {processError}
                    </div>
                  )}

                  {processSuccess && (
                    <div className="bg-secondary/5 text-on-secondary-container p-4 rounded-xl text-xs flex gap-2 items-center border border-secondary/20">
                      <span className="material-symbols-outlined text-[18px]">check_circle</span>
                      {processSuccess}
                    </div>
                  )}

                  {/* Split Visual Grid */}
                  <div className="grid grid-cols-2 gap-6 items-start">
                    {/* Left Split: Image Preview */}
                    <div className="space-y-3">
                      <h4 className="font-headline-sm text-xs uppercase tracking-wider text-on-surface-variant font-semibold" style={{ color: "#434656" }}>
                        Screenshot Image
                      </h4>
                      <div className="border border-outline-variant/30 rounded-2xl overflow-hidden bg-surface-container-low max-h-[450px] flex items-center justify-center p-4">
                        {selectedUpload.signed_url ? (
                          <img
                            src={selectedUpload.signed_url}
                            alt="Verification screenshot"
                            className="max-h-[400px] object-contain rounded-xl hover:scale-[1.03] transition-transform duration-300"
                          />
                        ) : (
                          <div className="text-center p-12 text-on-surface-variant/40 space-y-2">
                            <span className="material-symbols-outlined text-[36px]">image_not_supported</span>
                            <p className="text-xs">No signed image URL available.</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right Split: Text & Metrics Data */}
                    <div className="space-y-6">
                      {/* Parsed JSON Metrics */}
                      <div className="space-y-3">
                        <h4 className="font-headline-sm text-xs uppercase tracking-wider text-on-surface-variant font-semibold" style={{ color: "#434656" }}>
                          Parsed Metrics (Structured JSON)
                        </h4>
                        <div className="bg-surface border border-outline-variant/30 rounded-2xl p-4 font-mono text-xs max-h-[200px] overflow-auto shadow-inner">
                          {selectedUpload.extracted_json ? (
                            <pre className="text-on-surface">
                              {JSON.stringify(selectedUpload.extracted_json, null, 2)}
                            </pre>
                          ) : (
                            <p className="text-on-surface-variant/50 italic py-4 text-center">Run OCR to parse metrics</p>
                          )}
                        </div>
                      </div>

                      {/* Raw Extracted Text */}
                      <div className="space-y-3">
                        <h4 className="font-headline-sm text-xs uppercase tracking-wider text-on-surface-variant font-semibold" style={{ color: "#434656" }}>
                          Raw Extracted Text
                        </h4>
                        <div className="bg-surface border border-outline-variant/30 rounded-2xl p-4 font-mono text-xs max-h-[220px] overflow-auto shadow-inner">
                          {selectedUpload.extracted_text ? (
                            <pre className="text-on-surface-variant whitespace-pre-wrap leading-relaxed text-[11px]" style={{ color: "#434656" }}>
                              {selectedUpload.extracted_text}
                            </pre>
                          ) : (
                            <p className="text-on-surface-variant/50 italic py-4 text-center">Run OCR to extract raw text</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

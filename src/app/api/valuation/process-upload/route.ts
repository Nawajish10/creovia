import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser, getServiceRoleClient } from "@/lib/supabase";
import { extractTextFromBuffer } from "@/lib/ocr/extract-text";
import { parseMetrics } from "@/lib/ocr/parser";
import { runVerificationScoring } from "@/lib/verification/score";
import { runAssetScoring } from "@/lib/scoring/score";

export async function POST(request: NextRequest) {
  let uploadId = "";
  const supabase = getServiceRoleClient();

  try {
    // 1. Authenticate user
    const { user, error: authError } = await getAuthenticatedUser(request);
    
    // Check if caller has admin cookies
    const adminSession = request.cookies.get("admin_session")?.value;
    const adminValid = request.cookies.get("admin_session_valid")?.value;
    const isAdmin = adminSession && adminValid && adminSession === adminValid && adminSession.length === 64;

    if (!user && !isAdmin) {
      return NextResponse.json({ error: "Unauthorized. Please log in first." }, { status: 401 });
    }

    // 2. Parse request body
    const body = await request.json();
    uploadId = body.upload_id;

    if (!uploadId) {
      return NextResponse.json({ error: "Missing upload_id parameter." }, { status: 400 });
    }

    // 3. Fetch upload record
    const { data: upload, error: uploadErr } = await supabase
      .from("verification_uploads")
      .select("*")
      .eq("id", uploadId)
      .single();

    if (uploadErr || !upload) {
      return NextResponse.json({ error: "Upload record not found." }, { status: 404 });
    }

    // 4. Validate ownership (bypass check if admin)
    if (!isAdmin) {
      const { data: asset, error: assetErr } = await supabase
        .from("valuation_assets")
        .select("user_id")
        .eq("id", upload.asset_id)
        .single();

      if (assetErr || !asset) {
        return NextResponse.json({ error: "Associated asset not found." }, { status: 404 });
      }

      if (asset.user_id !== user?.id) {
        return NextResponse.json({ error: "Access denied. You do not own the asset associated with this upload." }, { status: 403 });
      }
    }

    // 5. Transition state to 'processing'
    await supabase
      .from("verification_uploads")
      .update({ upload_status: "processing" })
      .eq("id", uploadId);

    console.log(`[OCR Pipeline] Processing upload ${uploadId} (File: ${upload.file_url})...`);

    // 6. Download screenshot from private storage
    const { data: fileData, error: downloadError } = await supabase.storage
      .from("verification-proofs")
      .download(upload.file_url);

    if (downloadError || !fileData) {
      console.error("[OCR Pipeline] Storage download failed:", downloadError);
      
      await supabase
        .from("verification_uploads")
        .update({
          upload_status: "failed",
          extracted_json: { error: "Failed to download image file from storage." },
        })
        .eq("id", uploadId);

      return NextResponse.json({ error: "Failed to fetch image file." }, { status: 500 });
    }

    // 7. Extract raw text
    const buffer = Buffer.from(await fileData.arrayBuffer());
    let rawText = "";
    try {
      rawText = await extractTextFromBuffer(buffer);
    } catch (ocrErr: any) {
      console.error("[OCR Pipeline] Tesseract extraction failed:", ocrErr);
      
      await supabase
        .from("verification_uploads")
        .update({
          upload_status: "failed",
          extracted_json: { error: `OCR engine error: ${ocrErr.message || ocrErr}` },
        })
        .eq("id", uploadId);

      return NextResponse.json({ error: "OCR engine extraction failed." }, { status: 500 });
    }

    // 8. Parse metrics
    console.log(`[OCR Pipeline] Extracting metrics for file type "${upload.file_type}"...`);
    const parsedMetrics = parseMetrics(rawText, upload.file_type);

    // 9. Save final metrics to DB
    const { data: updatedUpload, error: updateErr } = await supabase
      .from("verification_uploads")
      .update({
        upload_status: "completed",
        extracted_text: rawText,
        extracted_json: parsedMetrics as any,
      })
      .eq("id", uploadId)
      .select()
      .single();

    if (updateErr) {
      console.error("[OCR Pipeline] Database update failed:", updateErr);
      return NextResponse.json({ error: "Failed to save parsed metrics." }, { status: 500 });
    }

    // 10. Trigger status update check for the asset itself
    // Update asset status to 'Verification Pending' if it was 'Proof Uploaded' or 'Pending'
    const { data: asset } = await supabase
      .from("valuation_assets")
      .select("status")
      .eq("id", upload.asset_id)
      .single();
    
    if (asset && (asset.status === "Pending" || asset.status === "Proof Uploaded")) {
      await supabase
        .from("valuation_assets")
        .update({ status: "Verification Pending" })
        .eq("id", upload.asset_id);
    }

    // 11. Run Verification Scoring Engine
    try {
      await runVerificationScoring(upload.asset_id);
    } catch (scoreErr) {
      console.error("[OCR Pipeline] Auto verification scoring trigger failed:", scoreErr);
    }

    // 12. Run Asset Quality Scoring Engine
    try {
      await runAssetScoring(upload.asset_id);
    } catch (scoreErr) {
      console.error("[OCR Pipeline] Auto asset quality scoring trigger failed:", scoreErr);
    }

    return NextResponse.json({
      success: true,
      message: "OCR processing completed successfully.",
      status: "completed",
      raw_text: rawText,
      parsed_metrics: parsedMetrics,
    });
  } catch (err: any) {
    console.error("[OCR Pipeline] Critical crash:", err);
    if (uploadId) {
      await supabase
        .from("verification_uploads")
        .update({
          upload_status: "failed",
          extracted_json: { error: `Internal Server Error: ${err.message || err}` },
        })
        .eq("id", uploadId);
    }
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}

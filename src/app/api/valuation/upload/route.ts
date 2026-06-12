import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser, getServiceRoleClient } from "@/lib/supabase";

const ALLOWED_MIME_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

export async function POST(request: NextRequest) {
  try {
    // 1. Authenticate user
    const { user, error: authError } = await getAuthenticatedUser(request);
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized. Please log in first." }, { status: 401 });
    }

    // 2. Parse request form data
    const formData = await request.formData();
    const assetId = formData.get("asset_id") as string;
    const fileType = formData.get("file_type") as string; // 'analytics' | 'revenue' | 'insights'
    const file = formData.get("file") as File | null;

    if (!assetId || !fileType || !file) {
      return NextResponse.json({ error: "Missing required fields (asset_id, file_type, file)." }, { status: 400 });
    }

    // 3. Validate asset ownership
    const supabase = getServiceRoleClient();
    const { data: asset, error: assetError } = await supabase
      .from("valuation_assets")
      .select("id, user_id, status")
      .eq("id", assetId)
      .single();

    if (assetError || !asset) {
      return NextResponse.json({ error: "Asset not found." }, { status: 404 });
    }

    if (asset.user_id !== user.id) {
      return NextResponse.json({ error: "Access denied. You do not own this asset." }, { status: 403 });
    }

    // 4. Validate file type and size
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json({ error: `Invalid file type: ${file.type}. Only PNG, JPG, JPEG, and WEBP are accepted.` }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "File exceeds 2MB limit." }, { status: 400 });
    }

    // 5. Read file buffer
    const arrayBuffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(arrayBuffer);

    // 6. Generate file path in the bucket
    const fileExtension = file.type.split("/")[1] || "png";
    const uniqueFileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExtension}`;
    const filePath = `${assetId}/${uniqueFileName}`;

    // 7. Upload to Supabase Private Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("verification-proofs")
      .upload(filePath, fileBuffer, {
        contentType: file.type,
        upsert: true,
      });

    if (uploadError) {
      console.error("Storage upload error:", uploadError);
      return NextResponse.json({ error: "Failed to upload file to storage." }, { status: 500 });
    }

    // 8. Store upload record in the database
    const { data: record, error: recordError } = await supabase
      .from("verification_uploads")
      .insert({
        asset_id: assetId,
        file_url: filePath,
        file_type: fileType,
        upload_status: "uploaded",
      })
      .select()
      .single();

    if (recordError) {
      console.error("Database insert error:", recordError);
      // Clean up uploaded file
      await supabase.storage.from("verification-proofs").remove([filePath]);
      return NextResponse.json({ error: "Failed to record upload in database." }, { status: 500 });
    }

    // 9. Update asset status to 'Proof Uploaded' if it was 'Pending'
    if (asset.status === "Pending") {
      await supabase
        .from("valuation_assets")
        .update({ status: "Proof Uploaded" })
        .eq("id", assetId);
    }

    return NextResponse.json({
      success: true,
      message: "Verification proof uploaded successfully.",
      upload: record,
    });
  } catch (err: any) {
    console.error("Upload handler crash:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}

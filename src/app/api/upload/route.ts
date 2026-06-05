import { NextRequest, NextResponse } from "next/server";
import { getServiceRoleClient } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "File exceeds 5MB size limit" }, { status: 400 });
    }

    // Validate type
    const validTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json({ error: "Invalid file type. Only PNG, JPG, JPEG, and WEBP are allowed." }, { status: 400 });
    }

    const supabase = getServiceRoleClient();
    const fileExt = file.name.split('.').pop();
    const filePath = `screenshots/${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;

    const buffer = Buffer.from(await file.arrayBuffer());

    const { data, error: uploadError } = await supabase.storage
      .from('analytics-screenshots')
      .upload(filePath, buffer, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      console.error("Storage upload error:", uploadError);
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    // Generate signed URL (1 year = 31536000 seconds)
    const { data: signedData, error: signedError } = await supabase.storage
      .from('analytics-screenshots')
      .createSignedUrl(filePath, 31536000);

    if (signedError) {
      console.error("Signed URL error:", signedError);
      return NextResponse.json({ error: signedError.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      filePath,
      signedUrl: signedData?.signedUrl || "",
      fileName: file.name,
      fileSize: file.size
    });
  } catch (error: any) {
    console.error("API Upload handler error:", error);
    return NextResponse.json({ error: error.message || "Failed to upload file" }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser, getServiceRoleClient } from "@/lib/supabase";
import { generateRecommendations } from "@/lib/valuation/recommendations";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 1. Authenticate user
    const { user, error: authError } = await getAuthenticatedUser(request);
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized. Please log in first." }, { status: 401 });
    }

    const { id: assetId } = await params;
    if (!assetId) {
      return NextResponse.json({ error: "Missing asset ID." }, { status: 400 });
    }

    const supabase = getServiceRoleClient();

    // 2. Verify asset exists, user owns it, and fetch metrics
    const { data: asset, error: assetError } = await supabase
      .from("valuation_assets")
      .select(`
        *,
        valuation_asset_metrics (*)
      `)
      .eq("id", assetId)
      .single();

    if (assetError || !asset) {
      return NextResponse.json({ error: "Asset not found." }, { status: 404 });
    }

    if (asset.user_id !== user.id) {
      return NextResponse.json({ error: "Access denied. You do not own this asset." }, { status: 403 });
    }

    // 3. Query report data
    const { data: report, error: reportError } = await supabase
      .from("valuation_reports")
      .select("*")
      .eq("asset_id", assetId)
      .maybeSingle();

    if (reportError) {
      console.error("Report query error:", reportError);
      return NextResponse.json({ error: "Failed to fetch report data." }, { status: 500 });
    }

    if (!report) {
      // If the report doesn't exist yet, return a status block indicating it is pending
      return NextResponse.json({
        success: false,
        status: asset.status,
        message: "Valuation report is still pending generation.",
      });
    }

    // 4. Query verification results & completed upload proofs
    const { data: verification } = await supabase
      .from("verification_results")
      .select("*")
      .eq("asset_id", assetId)
      .maybeSingle();

    const { data: uploads } = await supabase
      .from("verification_uploads")
      .select("*")
      .eq("asset_id", assetId)
      .eq("upload_status", "completed");

    // 5. Generate dynamic recommendations
    const breakdown = report.report_data?.breakdown || {};
    const verificationScore = report.verification_score ?? verification?.verification_score ?? 20;
    const recommendations = generateRecommendations(
      asset.asset_type,
      breakdown,
      verificationScore,
      asset.platform
    );

    return NextResponse.json({
      success: true,
      status: "Report Generated",
      asset,
      report,
      verification,
      uploads,
      recommendations,
      explainability: report.report_data?.explainability || [],
      pdf_metadata: {
        title: `Valuation Report - ${asset.title}`,
        author: "Axcrivo Certified Valuation System",
        generated_at: report.created_at,
      },
    });
  } catch (err: any) {
    console.error("Get report crash:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}

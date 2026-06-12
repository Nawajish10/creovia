import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser, getServiceRoleClient } from "@/lib/supabase";
import { z } from "zod";
import { runAssetScoring } from "@/lib/scoring/score";

const submitSchema = z.object({
  asset: z.object({
    asset_type: z.enum(["social", "website", "domain"]),
    platform: z.string().min(1),
    title: z.string().min(1),
    url: z.string().min(1),
  }),
  metrics: z.object({
    followers: z.number().int().nonnegative().nullable().optional(),
    likes: z.number().int().nonnegative().nullable().optional(),
    comments: z.number().int().nonnegative().nullable().optional(),
    engagement_rate: z.number().min(0).max(100).nullable().optional(),
    monthly_views: z.number().int().nonnegative().nullable().optional(),
    monthly_traffic: z.number().int().nonnegative().nullable().optional(),
    monthly_revenue: z.number().int().nonnegative().nullable().optional(),
    niche: z.string().nullable().optional(),
    metadata: z.record(z.string(), z.any()).optional().default({}),
  }),
});

export async function POST(request: NextRequest) {
  try {
    const { user, error } = await getAuthenticatedUser(request);
    if (error || !user) {
      return NextResponse.json({ error: "Unauthorized. Please log in first." }, { status: 401 });
    }

    const body = await request.json();
    const result = submitSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: "Invalid submission details.", details: result.error.format() }, { status: 400 });
    }

    const validated = result.data;
    const supabase = getServiceRoleClient();

    // 1. Insert core asset record
    const { data: assetData, error: assetError } = await supabase
      .from("valuation_assets")
      .insert({
        user_id: user.id,
        asset_type: validated.asset.asset_type,
        platform: validated.asset.platform,
        title: validated.asset.title,
        url: validated.asset.url,
        status: "Pending",
      })
      .select()
      .single();

    if (assetError) {
      console.error("Asset creation error:", assetError);
      return NextResponse.json({ error: "Failed to create asset record." }, { status: 500 });
    }

    // 2. Insert metrics linked to the asset
    const { error: metricsError } = await supabase
      .from("valuation_asset_metrics")
      .insert({
        asset_id: assetData.id,
        followers: validated.metrics.followers,
        likes: validated.metrics.likes,
        comments: validated.metrics.comments,
        engagement_rate: validated.metrics.engagement_rate,
        monthly_views: validated.metrics.monthly_views,
        monthly_traffic: validated.metrics.monthly_traffic,
        monthly_revenue: validated.metrics.monthly_revenue,
        niche: validated.metrics.niche,
        metadata: validated.metrics.metadata,
      });

    if (metricsError) {
      console.error("Metrics creation error:", metricsError);
      // Clean up orphaned asset record
      await supabase.from("valuation_assets").delete().eq("id", assetData.id);
      return NextResponse.json({ error: "Failed to create asset metrics." }, { status: 500 });
    }

    // 3. Run Asset Quality Scoring
    try {
      await runAssetScoring(assetData.id);
    } catch (scoreErr) {
      console.error("[Submit API] Auto asset scoring trigger failed:", scoreErr);
    }

    return NextResponse.json({
      success: true,
      message: "Valuation request submitted successfully.",
      asset: assetData,
    });
  } catch (err: any) {
    console.error("Endpoint crash:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}

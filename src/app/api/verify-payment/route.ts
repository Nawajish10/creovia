import { NextResponse } from "next/server";
import crypto from "crypto";
import { getServiceRoleClient, supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      email,
      platform,
      profileName,
      userId,
      amount = 999,
      isMock = false
    } = body;

    const secret = process.env.RAZORPAY_KEY_SECRET || "dummy_secret";

    // 1. Verify Signature (Skip if mock mode)
    if (!isMock) {
      const generated_signature = crypto
        .createHmac("sha256", secret)
        .update(razorpay_order_id + "|" + razorpay_payment_id)
        .digest("hex");

      if (generated_signature !== razorpay_signature) {
        return NextResponse.json(
          { error: "Invalid payment signature" },
          { status: 400 }
        );
      }
    }

    // 2. Generate Report ID
    const year = new Date().getFullYear();
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const report_id = `REP-${year}-${randomNum}`;

    // 3. Save to Supabase Database
    let dbClient;
    try {
      dbClient = getServiceRoleClient();
    } catch (e) {
      console.warn("⚠️ Service role key missing, falling back to anon client.");
      dbClient = supabase;
    }

    const { data, error } = await dbClient
      .from("valuation_reports")
      .insert([
        {
          user_id: userId || null,
          email,
          platform,
          profile_name: profileName,
          report_id,
          payment_id: razorpay_payment_id || "mock_payment",
          status: "Processing",
          amount,
        },
      ])
      .select("*")
      .single();

    if (error) {
      console.error("Supabase Insert Error:", error);
      // Even if DB insert fails (e.g., table doesn't exist yet), we return success for the payment
      // so the user sees the success screen in development.
      return NextResponse.json({
        success: true,
        report_id,
        message: "Payment verified, but DB insert failed (table might be missing)",
        error: error.message
      });
    }

    return NextResponse.json({
      success: true,
      report_id,
      data
    });

  } catch (error: any) {
    console.error("Payment Verification Error:", error);
    return NextResponse.json(
      { error: "Payment verification failed", details: error.message },
      { status: 500 }
    );
  }
}

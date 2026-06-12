import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(request: Request) {
  try {
    const { amount = 999 } = await request.json();

    // Check if keys exist, if not, we use dummy keys for development flow
    // In production, these must be set in .env.local
    const key_id = process.env.RAZORPAY_KEY_ID || "rzp_test_dummy";
    const key_secret = process.env.RAZORPAY_KEY_SECRET || "dummy_secret";

    if (key_id === "rzp_test_dummy") {
      // Return a mock order if no keys are provided
      console.warn("⚠️ RAZORPAY_KEY_ID not found. Using mock order response.");
      return NextResponse.json({
        id: `order_mock_${Date.now()}`,
        amount: amount * 100,
        currency: "INR",
        isMock: true
      });
    }

    const instance = new Razorpay({
      key_id,
      key_secret,
    });

    const options = {
      amount: amount * 100, // amount in smallest currency unit (paise)
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`,
    };

    const order = await instance.orders.create(options);

    return NextResponse.json(order);
  } catch (error: any) {
    console.error("Razorpay Order Creation Error:", error);
    return NextResponse.json(
      { error: "Failed to create order", details: error.message },
      { status: 500 }
    );
  }
}

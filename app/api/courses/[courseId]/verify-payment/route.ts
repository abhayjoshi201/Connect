import { NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/lib/db";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
): Promise<NextResponse> {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
      await req.json();

    // Step 1: Validate request payload
    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      return new NextResponse(
        JSON.stringify({ success: false, message: "Invalid request data." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Step 2: Generate the expected signature
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    // Step 3: Verify signature
    if (generatedSignature !== razorpay_signature) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          message: "Payment verification failed. Invalid signature.",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Step 4: Update the purchase status in the database if verification is successful
    const courseId = params.courseId;
    const userId = "retrieve_user_id_from_session"; // Use an authenticated user's ID
    await db.purchase.create({
      data: {
        courseID: courseId,
        userId: userId,
        paymentId: razorpay_payment_id,
      },
    });

    return new NextResponse(
      JSON.stringify({
        success: true,
        message: "Payment verified and course unlocked.",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error verifying payment:", error);
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: "Internal server error.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

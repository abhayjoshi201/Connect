import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import Razorpay from "razorpay";
import { db } from "@/lib/db";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
): Promise<NextResponse> {
  try {
    // CORS headers
    const headers = new Headers({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    });

    // Get current user
    const user = await currentUser();
    if (!user || !user.id || !user.emailAddresses?.[0]?.emailAddress) {
      console.error("User is unauthorized or missing necessary fields.");
      return new NextResponse("Unauthorized", { status: 401, headers });
    }

    // Retrieve course details
    const course = await db.course.findUnique({
      where: { id: params.courseId, isPublished: true },
    });
    if (!course) {
      console.error("Course not found or not published.");
      return new NextResponse("Course not found", { status: 404, headers });
    }

    // Check for existing purchase
    const purchase = await db.purchase.findUnique({
      where: {
        userId_courseID: {
          userId: user.id,
          courseID: params.courseId,
        },
      },
    });
    if (purchase) {
      console.error("User has already purchased this course.");
      return new NextResponse("Already purchased", { status: 409, headers });
    }

    // Initialize Razorpay instance
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      console.error("Razorpay environment variables are missing.");
      return new NextResponse("Internal Server Error", {
        status: 500,
        headers,
      });
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    // Order options
    const options = {
      amount: (course.price ?? 0) * 100, // Convert to paise
      currency: "INR",
      receipt: `r_${user.id.slice(-5)}_${params.courseId.slice(
        -5
      )}_${Date.now()}`,
    };

    // Create order
    const order = await razorpay.orders.create(options);
    console.log("Order created successfully:", order);

    // Send JSON response
    return new NextResponse(JSON.stringify(order), {
      headers: { ...headers, "Content-Type": "application/json" },
    });
  } catch (error) {
    // Detailed error logging
    console.error("Error occurred during order creation:", error);

    return new NextResponse(
      JSON.stringify({
        message: "Internal Server Error",
        error: error instanceof Error ? error.message : String(error),
      }),
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      }
    );
  }
}
  
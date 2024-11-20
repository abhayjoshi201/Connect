// pages/api/courses/[courseId]/purchase.ts
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
): Promise<NextResponse> {
  try {
    const user = await currentUser();

    if (!user || !user.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json(); // Parse the request body as JSON

    // Record the purchase in the database
    const purchase = await db.purchase.create({
      data: {
        userId: user.id,
        courseID: params.courseId,
        paymentId: body.paymentId, // Access paymentId from the parsed body
      },
    });

    return new NextResponse(
      JSON.stringify({ message: "Purchase successful", purchase }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error processing purchase:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

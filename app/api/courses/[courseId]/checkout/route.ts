import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { Razorpay } from "razorpay";
import { db } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { Order } from "razorpay/dist/types/order";
import { razorpay } from "@/lib/razorpay";

export async function POST(
    req:Request,
    {params}:{params:{courseId:string}}
) {
    try {

       const user = await currentUser();

       if(!user || !user.id || !user.emailAddresses?.[0]?.emailAddress) {
        return new NextResponse("Unauthorized", { status: 401 });
       }

       const course = await db.course.findUnique({
        where:{
           id:params.courseId,
           isPublished:true
        }
       });
       const purchase = await db.purchase.findUnique({
        where:{
            userId_courseId:{
                userId:user.id,
                courseId:params.courseId
            }
        }
       });
       if(purchase) {
        return new NextResponse("Already purchased", { status: 400 });
       }

       if(!course) {
        return new NextResponse("Not found", { status: 401 });
       }
       const line_items:Razorpay.OrderDataItem[] = [
        {
            id:course.id,
            title:course.title,
            description:course.description,
            price:course.price,
            currency:"INR",
            quantity:1
        }
       ];

       let razorpayCustomer = await db.razorpayCustomer .findUnique({
        where:{
            userId:user.id
        },
        select:{
            razorpayCustomerId:true
        }
       });

       if(!razorpayCustomer) {
        const customer = await razorpay.customers.create({
            email:user.emailAddresses[0].emailAddress,
        });
        razorpayCustomer = await db.razorpayCustomer.create({
            data:{
                userId:user.id,
                razorpayCustomerId:customer.id
            }
        })
       }

       const order = await razorpay.orders.create({
        
       })

       
        
    } catch (error) {
        console.log("[COURSE_CHECKOUT]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
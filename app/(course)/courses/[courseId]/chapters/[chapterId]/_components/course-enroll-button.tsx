"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState } from "react";
import Script from "next/script";

interface CourseEnrollButtonProps {
  courseID: string;
  price: number;
}

export const CourseEnrollButton = ({
  courseID,
  price,
}: CourseEnrollButtonProps) => {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);

    try {
      // Step 1: Create the Razorpay order
      const { data } = await axios.post(`/api/courses/${courseID}/checkout`, {
        amount: price * 100,
      });

      const options = {
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        name: "Your LMS Platform",
        description: `Enroll in Course ${courseID}`,
        order_id: data.id,
        handler: async function (response: any) {
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
            response;

          try {
            // Step 2: Verify the payment
            const verifyResponse = await axios.post(
              `/api/courses/${courseID}/verify-payment`,
              {
                razorpay_payment_id,
                razorpay_order_id,
                razorpay_signature,
              }
            );

            if (verifyResponse.data.success) {
              // Step 3: Purchase the course
              const purchaseResponse = await axios.post(
                `/api/courses/${courseID}/purchase`,
                {
                  paymentId: razorpay_payment_id, // You can pass any relevant information you need
                }
              );

              alert(purchaseResponse.data.message); // Show success message
            } else {
              alert("Payment verification failed. Please try again.");
            }
          } catch (error) {
            console.error("Payment verification error:", error);
            alert("Payment verification failed. Please try again.");
          }
        },
        prefill: {
          name: "Abhay Joshi",
          email: "abhay@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on("payment.failed", function (response: any) {
        alert(`Payment failed: ${response.error.description}`);
        console.error("Payment failed:", response.error);
      });

      // Open the Razorpay payment modal
      rzp.open();
    } catch (error) {
      console.error("Payment initiation error:", error);
      if (axios.isAxiosError(error) && error.response) {
        alert(
          `Failed to initiate payment: ${
            error.response.data.message || "Unknown error"
          }`
        );
      } else {
        alert("Failed to initiate payment: Unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Include the Razorpay checkout script */}
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
        onLoad={() => {
          console.log("Razorpay script loaded");
        }}
      />
      <Button
        className="w-full md:w-auto"
        size="sm"
        onClick={handlePayment}
        disabled={loading}
      >
        {loading ? "Processing..." : `Enroll for ₹${price}`}
      </Button>
    </>
  );
};

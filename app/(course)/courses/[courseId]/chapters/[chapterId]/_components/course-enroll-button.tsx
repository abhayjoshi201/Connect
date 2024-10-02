"use client"

import { Button } from "@/components/ui/button"

interface CourseEnrollButtonProps {
    courseID: string;
    price: number;
}

export const CourseEnrollButton = ({
    courseID,
    price,
}: CourseEnrollButtonProps) => {
    return (
        <Button
        className="w-full md:w-auto"
        size="sm"
        >
            Enroll for {price}
        </Button>
    )
}


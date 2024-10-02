"use client";

import { cn } from "@/lib/utils";
import { Category } from "@prisma/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
    FcEngineering,
    FcFilmReel,
    FcMusic,
    FcMultipleDevices,
    FcOldTimeCamera,
    FcSalesPerformance,
    FcSportsMode,
} from "react-icons/fc"
import { IconType } from "react-icons";
import { CategoryItem } from "./category-item";
interface CategoriesProps {
  items: Category[];
}

const iconMap: Record<Category["name"], IconType> = {
  "Accounting": FcSalesPerformance,
  "Computer Science": FcMultipleDevices,
  "Engineering": FcEngineering,
  "Filming": FcFilmReel,
  "Fitness": FcSportsMode,
  "Marketing": FcSportsMode,
  "Music": FcMusic,
  "Photography": FcOldTimeCamera,
};

export const Categories = ({
    items
}: CategoriesProps) => {
    return (
        <div className="flex items-center justify-items-center gap-x-2 overflow-x-auto pb-2">
            <div className="flex items-center gap-x-2"> 
                {items.map((item) => (
                    <CategoryItem
                        key={item.id}
                        label={item.name}
                        icon={iconMap[item.name]}
                        value={item.id}
                    />
            ))}
        </div>
        </div>
    )
}

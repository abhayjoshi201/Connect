"use client";

import {BarChart, Book, Calendar, Camera, Compass, Home, HomeIcon, icons, Layout, List, MessageSquareIcon, User, Video} from "lucide-react";
import { SidebarItem } from "./sidebar-item";
import { usePathname } from "next/navigation";

const guestRoutes = [
  {
    icon: Home,
    label: "Dashboard",
    href: "/search",
  },
  {
    icon: Video,
    label: "Browse",
    href: "/",
  },
  {
    icon: MessageSquareIcon,
    label: "Message",
    href: "/meet",
  },
  {
    icon: User,
    label: "User",
    href: "/user",
  },
];

const teacherRoutes = [
  {
    icon: List,
    label: "Courses",
    href: "/teacher/courses",
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/teacher/analytics",
  },
  {
    icon: MessageSquareIcon,
    label: "Message",
    href: "/teacher/meet",
  },
  {
    icon: Calendar,
    label: "Calendar",
    href: "/teacher/calendar",
  },
  {
    icon: User,
    label: "User",
    href: "/teacher/user",
  },
];

export const SidebarRoutes =()=>{
    const pathname = usePathname();

    const isTeacherPage = pathname?.includes("/teacher");
    const routes = isTeacherPage? teacherRoutes: guestRoutes;
    return (
        <div className="flex flex-col w-full">
            {
                routes.map((route)=>(
                    <SidebarItem
                        key={route.href}
                        icon={route.icon}
                        label={route.label}
                        href={route.href}
                    />
                ))
            }
        </div>
    )
}
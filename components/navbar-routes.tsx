"use client"

import { UserButton } from "@clerk/nextjs"
import { usePathname } from "next/navigation"
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { SearchInput } from "./search-input";

export const NavbarRoutes =() => {
    const pathname = usePathname();

    const isTeacherPage = pathname?.startsWith("/teacher");
    const isCoursePage = pathname?.startsWith("/courses");
    const isSearchPage = pathname ==="/search";
    return (
      <>
        {isSearchPage && (
          <div className=" flex justify-center w-full">
            <div className=" hidden md:block">
              <SearchInput />
            </div>
          </div>
        )}

        <div className="flex gap-x-2 ml-auto">
          {isCoursePage || isTeacherPage ? (
            <Link href="/">
              <Button size="sm" variant="ghost">
                <LogOut className="h-4 w-4 mr-2" />
                Exit
              </Button>

            </Link>
          ) : (
            <Link href="/teacher/courses">
              <Button size="sm" variant="ghost">
                Teacher mode
              </Button>
            </Link>
          )}
          <UserButton afterSignOutUrl="/" />
        </div>
      </>
    );
};

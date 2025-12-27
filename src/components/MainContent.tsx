"use client";

import { useSidebar } from "@/contexts/SidebarContext";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function MainContent({ children }: { children: ReactNode }) {
    const { isOpen } = useSidebar();

    return (
        <main className={cn(
            "pt-16 transition-all duration-300 ease-in-out",
            isOpen ? "lg:pl-[260px]" : "lg:pl-[60px]"
        )}>
            <div className="p-4 md:p-6">{children}</div>
        </main>
    );
}

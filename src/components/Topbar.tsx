"use client";

import { Search, Menu, Plus } from "lucide-react";
import Avatar from "./Avatar";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/contexts/SidebarContext";


const userAvatars = [
    { name: "Armin A." },
    { name: "Eren Y." },
    { name: "Mikasa A." },
];

export default function Topbar() {
    const { isOpen, toggleMobileMenu } = useSidebar();

    return (
        <header className={cn(
            "fixed top-0 right-0 h-16 z-40 px-4 md:px-6 transition-all duration-300 ease-in-out flex items-center justify-between",
            isOpen ? "left-0 lg:left-[260px]" : "left-0 lg:left-[60px]"
        )}>
            {/* Left: Search */}
            <div className="flex-1 max-w-2xl">
                <button className="lg:hidden mr-4" onClick={toggleMobileMenu}>
                    <Menu className="w-5 h-5 text-neutral-600" />
                </button>
                <div className="relative max-w-[480px] w-full hidden sm:block group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 group-hover:text-neutral-500 transition-colors" />
                    <input
                        type="text"
                        placeholder='Try searching "insights"'
                        className="w-full pl-11 pr-4 h-10 bg-white rounded-full text-sm focus:outline-none shadow-sm text-neutral-600 placeholder:text-neutral-400 font-medium transition-shadow hover:shadow-md focus:shadow-md"
                    />
                </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3">
                {/* Menu + Profile Pill */}
                <div className="flex items-center bg-white rounded-full shadow-sm h-10 pr-1 pl-4 gap-3 hover:shadow-md transition-shadow cursor-pointer">
                    <Menu className="w-4 h-4 text-neutral-600" />
                    <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-sm flex-shrink-0">
                        <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=100&h=100&fit=crop" alt="Company" className="w-full h-full object-cover" />
                    </div>
                </div>

                {/* Add Button */}
                <button className="w-10 h-10 bg-[#E11D48] rounded-full flex items-center justify-center shadow-md hover:bg-[#BE123C] transition-all hover:shadow-lg active:scale-95 group">
                    <Plus className="w-5 h-5 text-white" strokeWidth={3} />
                </button>
            </div>
        </header>
    );
}

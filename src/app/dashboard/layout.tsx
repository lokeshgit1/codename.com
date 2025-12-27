import { ReactNode } from "react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { SidebarProvider } from "@/contexts/SidebarContext";
import MainContent from "@/components/MainContent";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <SidebarProvider>
            <div className="min-h-screen bg-[#F7F7F5]">
                <Sidebar />
                <Topbar />
                <MainContent>{children}</MainContent>
            </div>
        </SidebarProvider>
    );
}

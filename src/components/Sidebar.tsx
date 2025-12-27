"use client";

import { cn } from "@/lib/utils";
import { useSidebar, TabType } from "@/contexts/SidebarContext";
import {
    Star,
    History,
    FileText,
    Target,
    LayoutDashboard,
    ChevronDown,
    Settings,
    MessageCircle,
    Plus,
    Minus,
    Link as LinkIcon,
} from "lucide-react";
import { useState } from "react";

// --- Components ---

function IconRailItem({ icon: Icon, active, onClick }: { icon: any, active?: boolean, onClick?: () => void }) {
    return (
        <button
            onClick={onClick}
            className="relative w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200 group active:scale-95"
        >
            {active ? (
                <div className="w-10 h-10 bg-[#Ef3061] rounded-full flex items-center justify-center shadow-sm z-10">
                    <Icon className="w-5 h-5 text-white" />
                </div>
            ) : (
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:bg-white/80 transition-colors border border-transparent group-hover:border-neutral-200">
                    <Icon className="w-4 h-4 text-neutral-600" />
                </div>
            )}
        </button>
    );
}

function NavItem({ icon: Icon, label, active, className }: { icon?: any, label: string, active?: boolean, className?: string }) {
    return (
        <button className={cn(
            "w-full flex items-center gap-3 px-3 py-1.5 rounded-lg group transition-colors",
            active ? "bg-neutral-100/80" : "hover:bg-neutral-100/50"
        )}>
            {Icon && <Icon className="w-4 h-4 text-neutral-400 group-hover:text-neutral-600 transition-colors" />}
            <span className={cn(
                "text-sm font-medium transition-colors",
                active ? "text-neutral-900" : "text-neutral-500 group-hover:text-[#F43F5E]",
                className
            )}>{label}</span>
        </button>
    );
}

function SectionHeader({ label, action }: { label: string, action?: React.ReactNode }) {
    return (
        <div className="flex items-center justify-between px-3 py-2 group cursor-pointer mt-2">
            <span className="text-sm font-medium text-neutral-900">{label}</span>
            {action}
        </div>
    );
}

function CollapsibleHeader({ label, isOpen, onClick, className }: { label: string, isOpen: boolean, onClick?: () => void, className?: string }) {
    return (
        <div
            className={cn("flex items-center gap-2 py-1.5 cursor-pointer group select-none relative", className)}
            onClick={onClick}
        >
            <span className="text-sm font-medium text-neutral-800 group-hover:text-[#F43F5E] transition-colors">{label}</span>
            <ChevronDown className={cn("w-3 h-3 text-neutral-400 transition-transform duration-200", !isOpen && "-rotate-90")} />
        </div>
    );
}

function TreeItem({ label, badge, badgeColor, isNew }: { label: string, badge?: string, badgeColor?: string, isNew?: boolean }) {
    return (
        <div className="relative flex items-center justify-between py-1.5 pr-2 pl-4 cursor-pointer group hover:bg-neutral-100/50 rounded-lg transition-colors">
            <span className={cn("text-sm transition-colors", isNew ? "text-[#F43F5E] font-medium" : "text-neutral-500 group-hover:text-[#F43F5E] group-hover:font-medium")}>
                {label}
            </span>
            {badge && (
                <span className={cn(
                    "text-[10px] font-bold text-white px-1.5 min-w-[1.25rem] h-5 flex items-center justify-center",
                    badgeColor || "bg-neutral-400",
                    badgeColor?.includes("rounded") ? "" : "rounded-full"
                )}>
                    {badge}
                </span>
            )}
        </div>
    );
}

export default function Sidebar() {
    // State for collapsible sections
    const [isSharedExpanded, setIsSharedExpanded] = useState(true);
    const [isMyReportsExpanded, setIsMyReportsExpanded] = useState(true);
    const [isReportSharedExpanded, setIsReportSharedExpanded] = useState(true);
    const [isDashboardMainExpanded, setIsDashboardMainExpanded] = useState(true);
    const [isReportsMainExpanded, setIsReportsMainExpanded] = useState(true);
    const { isOpen: isSidebarOpen, setOpen: setIsSidebarOpen, activeTab, setActiveTab, isMobileMenuOpen, setMobileMenuOpen } = useSidebar();
    const [isProjectMenuOpen, setIsProjectMenuOpen] = useState(false);


    const handleTabClick = (tab: TabType) => {
        if (activeTab === tab) {
            setIsSidebarOpen(!isSidebarOpen);
        } else {
            setActiveTab(tab);
            setIsSidebarOpen(true);
        }
    };

    const renderDashboardContent = () => (
        <>
            {/* Top Links */}
            <div className="space-y-0.5 mb-2">
                <NavItem icon={Star} label="Starred" />
                <NavItem icon={History} label="Recent" />
            </div>

            <div className="space-y-0.5 mb-2">
                <NavItem label="Sales list" className="text-neutral-900 font-medium" />
                <NavItem label="Goals" className="text-neutral-900 font-medium" />
            </div>

            {/* Dashboard Section */}
            <div>
                <div
                    className="flex items-center justify-between px-3 py-1.5 group cursor-pointer hover:bg-neutral-100/50 rounded-lg"
                    onClick={() => setIsDashboardMainExpanded(!isDashboardMainExpanded)}
                >
                    <span className="text-sm font-medium text-neutral-900">Dashboard</span>
                    <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-sm border border-neutral-100 group-hover:border-neutral-200 transition-colors">
                        {isDashboardMainExpanded ? (
                            <Minus className="w-3 h-3 text-neutral-500" />
                        ) : (
                            <Plus className="w-3 h-3 text-neutral-500" />
                        )}
                    </div>
                </div>

                {/* Tree Structure */}
                {isDashboardMainExpanded && (
                    <div className="relative mt-1">
                        {/* MAIN VERTICAL LINE (From Dashboard down) */}
                        <div className="absolute left-[13px] top-0 bottom-2 w-[1px] bg-[#D4D4D4]" />

                        {/* Codename Root */}
                        <div className="relative flex items-center gap-3 py-1.5 pl-[28px] pr-2 mb-0.5 cursor-pointer hover:bg-neutral-100/50 rounded-lg transition-colors group">
                            <div className="absolute left-[13px] top-1/2 w-[12px] h-[1px] bg-[#D4D4D4]" />
                            <span className="text-sm text-neutral-600 font-medium group-hover:text-[#F43F5E] transition-colors">Codename</span>
                        </div>

                        {/* Shared with me */}
                        <div className="relative">
                            <div className="absolute left-[13px] top-[18px] w-[12px] h-[1px] bg-[#D4D4D4]" />
                            <div className="pl-[28px]">
                                <CollapsibleHeader
                                    label="Shared with me"
                                    isOpen={isSharedExpanded}
                                    onClick={() => setIsSharedExpanded(!isSharedExpanded)}
                                />
                            </div>
                            {isSharedExpanded && (
                                <div className="relative mt-0.5">
                                    <div className="absolute left-[29px] top-0 bottom-3 w-[1px] bg-[#D4D4D4]" />
                                    <div className="pl-[29px]">
                                        <div className="relative">
                                            <div className="absolute left-[0px] top-[16px] w-[12px] h-[1px] bg-[#D4D4D4]" />
                                            <TreeItem label="Cargo2go" />
                                        </div>
                                        <div className="relative">
                                            <div className="absolute left-[0px] top-[16px] w-[12px] h-[1px] bg-[#D4D4D4]" />
                                            <TreeItem label="Cloudz3r" badge="2" badgeColor="bg-[#E11D48] rounded-[6px]" />
                                        </div>
                                        <div className="relative">
                                            <div className="absolute left-[0px] top-[16px] w-[12px] h-[1px] bg-[#D4D4D4]" />
                                            <TreeItem label="Idioma" />
                                        </div>
                                        <div className="relative">
                                            <div className="absolute left-[0px] top-[16px] w-[12px] h-[1px] bg-[#D4D4D4]" />
                                            <TreeItem label="Syllables" />
                                        </div>
                                        <div className="relative">
                                            <div className="absolute left-[0px] top-[16px] w-[12px] h-[1px] bg-[#D4D4D4]" />
                                            <TreeItem label="x-0b" />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Reports Section */}
            <div className="mt-4">
                <div onClick={() => setIsReportsMainExpanded(!isReportsMainExpanded)}>
                    <SectionHeader
                        label="Reports"
                        action={
                            <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-sm border border-neutral-100 group-hover:border-neutral-200 transition-colors">
                                {isReportsMainExpanded ? (
                                    <Minus className="w-3 h-3 text-neutral-500" />
                                ) : (
                                    <Plus className="w-3 h-3 text-neutral-500" />
                                )}
                            </div>
                        }
                    />
                </div>

                {/* Tree Structure */}
                {isReportsMainExpanded && (
                    <div className="relative mt-1">
                        <div className="absolute left-[13px] top-0 bottom-2 w-[1px] bg-[#D4D4D4]" />

                        {/* Share with me */}
                        <div className="relative mb-2">
                            <div className="absolute left-[13px] top-[18px] w-[12px] h-[1px] bg-[#D4D4D4]" />
                            <div className="pl-[28px]">
                                <CollapsibleHeader
                                    label="Share with me"
                                    isOpen={isReportSharedExpanded}
                                    onClick={() => setIsReportSharedExpanded(!isReportSharedExpanded)}
                                />
                            </div>
                            {isReportSharedExpanded && (
                                <div className="relative mt-0.5">
                                    <div className="absolute left-[29px] top-0 bottom-3 w-[1px] bg-[#D4D4D4]" />
                                    <div className="pl-[29px]">
                                        <div className="relative">
                                            <div className="absolute left-[0px] top-[16px] w-[12px] h-[1px] bg-[#D4D4D4]" />
                                            <TreeItem label="Deals by user" />
                                        </div>
                                        <div className="relative">
                                            <div className="absolute left-[0px] top-[16px] w-[12px] h-[1px] bg-[#D4D4D4]" />
                                            <TreeItem label="Deal duration" />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* My reports */}
                        <div className="relative">
                            <div className="absolute left-[13px] top-[18px] w-[12px] h-[1px] bg-[#D4D4D4]" />
                            <div className="pl-[28px]">
                                <CollapsibleHeader
                                    label="My reports"
                                    isOpen={isMyReportsExpanded}
                                    onClick={() => setIsMyReportsExpanded(!isMyReportsExpanded)}
                                />
                            </div>
                            {isMyReportsExpanded && (
                                <div className="relative mt-0.5">
                                    <div className="absolute left-[29px] top-0 bottom-3 w-[1px] bg-[#D4D4D4]" />
                                    <div className="pl-[29px]">
                                        <div className="relative">
                                            <div className="absolute left-[0px] top-[16px] w-[12px] h-[1px] bg-[#D4D4D4]" />
                                            <TreeItem label="Emails received" />
                                        </div>
                                        <div className="relative">
                                            <div className="absolute left-[0px] top-[16px] w-[12px] h-[1px] bg-[#D4D4D4]" />
                                            <TreeItem label="Deal duration" />
                                        </div>
                                        <div className="relative">
                                            <div className="absolute left-[0px] top-[16px] w-[12px] h-[1px] bg-[#D4D4D4]" />
                                            <TreeItem label="New report" />
                                        </div>
                                        <div className="relative">
                                            <div className="absolute left-[0px] top-[16px] w-[12px] h-[1px] bg-[#D4D4D4]" />
                                            <TreeItem label="Analytics" badge="7" badgeColor="bg-[#E11D48] rounded-[6px]" />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Manage Folders */}
            <div className="mt-4 pt-2">
                <button className="flex items-center gap-2 px-3 py-2 text-sm text-neutral-400 hover:text-neutral-900 transition-colors w-full rounded-lg hover:bg-neutral-100">
                    <LinkIcon className="w-4 h-4" />
                    <span>Manage folders</span>
                </button>
            </div>
        </>
    );

    const renderPlaceholderContent = (title: string) => (
        <div className="p-4">
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">{title}</h3>
            <p className="text-sm text-neutral-500">Content for {title} goes here.</p>
        </div>
    );

    return (
        <>
            {/* Mobile Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden animate-in fade-in duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            <aside className={cn(
                "fixed left-0 top-0 h-screen flex z-50 transition-transform duration-300 ease-in-out",
                isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
            )}>

                {/* SIDEBAR 1: Icon Rail (60px) */}
                <div className="w-[60px] bg-[#F7F7F5] h-full flex flex-col items-center py-6 z-20">
                    {/* Logo */}
                    <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center shadow-md mb-8 cursor-pointer hover:scale-105 transition-transform">
                        <span className="text-white font-bold text-lg leading-none pb-1">C</span>
                    </div>

                    {/* Navigation Icons */}
                    <div className="flex flex-col gap-3">
                        <IconRailItem icon={History} active={activeTab === 'history' && isSidebarOpen} onClick={() => handleTabClick('history')} />
                        <IconRailItem icon={LayoutDashboard} active={activeTab === 'dashboard' && isSidebarOpen} onClick={() => handleTabClick('dashboard')} />
                        <IconRailItem icon={FileText} active={activeTab === 'files' && isSidebarOpen} onClick={() => handleTabClick('files')} />
                        <IconRailItem icon={Target} active={activeTab === 'goals' && isSidebarOpen} onClick={() => handleTabClick('goals')} />
                        <IconRailItem icon={Star} active={activeTab === 'starred' && isSidebarOpen} onClick={() => handleTabClick('starred')} />
                    </div>

                    {/* Bottom Actions */}
                    <div className="mt-auto flex flex-col gap-3 mb-2">
                        <button className="relative w-10 h-10 rounded-full bg-white border border-transparent shadow-sm hover:shadow-md hover:border-neutral-200 transition-all group flex items-center justify-center">
                            <MessageCircle className="w-4 h-4 text-neutral-600 group-hover:text-neutral-900" />
                            <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-[#F43F5E] rounded-full border-2 border-white"></span>
                        </button>
                        <button className="w-10 h-10 rounded-full bg-white border border-transparent shadow-sm hover:shadow-md hover:border-neutral-200 transition-all group flex items-center justify-center">
                            <Settings className="w-4 h-4 text-neutral-600 group-hover:text-neutral-900" />
                        </button>
                    </div>
                </div>

                {/* SIDEBAR 2: Navigation Drawer (200px) */}
                <div className={cn(
                    "bg-[#F7F7F5] h-full flex flex-col overflow-y-auto no-scrollbar transition-all duration-300 ease-in-out relative z-10",
                    isSidebarOpen ? "w-[200px] opacity-100" : "w-0 opacity-0 overflow-hidden"
                )}>

                    {/* Header Text */}
                    <div className="pt-8 px-5 pb-4 flex items-center justify-between relative z-50">
                        <div
                            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={() => setIsProjectMenuOpen(!isProjectMenuOpen)}
                        >
                            <span className="text-sm font-bold text-neutral-900">Codename.com</span>
                            <ChevronDown className={cn("w-3 h-3 text-neutral-500 transition-transform duration-200", isProjectMenuOpen && "-rotate-180")} />
                        </div>
                        {isProjectMenuOpen && (
                            <div className="absolute top-[60px] left-5 w-48 bg-white rounded-xl shadow-[0_10px_40px_-5px_rgba(0,0,0,0.1)] border border-neutral-100 py-1.5 animate-in fade-in zoom-in-95 duration-100 origin-top-left">
                                <div className="px-3 py-2 hover:bg-neutral-50 cursor-pointer text-sm font-medium text-neutral-700 flex items-center gap-2 transition-colors">
                                    <span>Project list</span>
                                </div>
                                <div className="h-[1px] bg-neutral-100 my-0.5" />
                                <div className="px-3 py-2 hover:bg-neutral-50 cursor-pointer text-sm font-medium text-[#F43F5E] flex items-center gap-2 transition-colors">
                                    <Plus className="w-3.5 h-3.5" />
                                    <span>Add new project</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 px-3 space-y-0.5 pb-6">
                        {activeTab === 'dashboard' ? renderDashboardContent() : renderPlaceholderContent(activeTab.charAt(0).toUpperCase() + activeTab.slice(1))}
                    </div>
                </div>
            </aside>
        </>
    );
}

"use client";
import { useState } from "react";
import Link from "next/link";

import {
    MoreHorizontal,
    ArrowUpRight,
    ArrowDownRight,
    Filter,
    MoreVertical,
    ChevronDown,
    Plus,
    SlidersHorizontal,
    Download,
    Upload,
    ChevronRight,
    Star,

    ChevronsUp,
    Instagram,
    Dribbble,
    BarChart3,
    ShoppingBag,
} from "lucide-react";
import { cn, formatNumber, formatCurrency, formatPercentage } from "@/lib/utils";
import Badge from "@/components/Badge";
import { useSidebar } from "@/contexts/SidebarContext";
import { Coffee } from "lucide-react";
import PlatformBarChart from "@/components/PlatformBarChart";
import { motion } from "framer-motion";

// Custom component for detailed stat cards
function MetricCard({ title, value, change, isPositive, extra }: any) {
    return (
        <div className={cn("card p-4 flex flex-col justify-between", title === "Value" && "border-pink-200 border-2")}>
            <div className="flex justify-between items-start mb-2">
                <span className="text-sm font-medium text-neutral-500">{title}</span>
                {title === "Value" && isPositive && (
                    <Badge variant="pink" className="text-xs">
                        {extra}
                    </Badge>
                )}
            </div>
            <div className="flex items-end gap-2">
                <span className="text-xl font-bold">{value}</span>
                {change && (
                    <div className={cn("flex items-center text-xs font-medium mb-1", isPositive ? "text-green-500" : "text-neutral-400")}>
                        {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                        {change}
                    </div>
                )}
            </div>
            {title === "Deals" && (
                <div className="flex items-center gap-1 text-xs text-neutral-400 mt-1">
                    <ArrowDownRight className="w-3 h-3" />
                    <span>5</span>
                </div>
            )}
        </div>
    );
}

// Custom component for platform row
function PlatformRow({ name, amount, percentage, color }: any) {
    const textColor = color ? color.replace('bg-', 'text-').replace('100', '500') : 'text-neutral-500';
    return (
        <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
                <div className={cn("w-8 h-8 rounded-full flex items-center justify-center bg-white shadow-sm border border-neutral-100", color)}>
                    <span className={cn("text-[10px] font-black uppercase tracking-tighter", textColor)}>{name ? name.substring(0, 2) : '??'}</span>
                </div>
                <span className="text-sm font-medium">{name}</span>
            </div>
            <div className="flex items-center gap-4">
                <span className="text-sm font-bold">{amount ? formatCurrency(amount) : '-'}</span>
                {percentage && <span className="text-xs text-neutral-400 bg-neutral-100 px-2 py-1 rounded-full">{percentage}%</span>}
            </div>
        </div>
    );
}

export default function Dashboard() {
    const [expandedUser, setExpandedUser] = useState<string | null>("Mikasa A.");
    const [activeMetric, setActiveMetric] = useState<"revenue" | "leads" | "wl">("revenue");
    const { activeTab } = useSidebar();
    const [isTimeframeOn, setIsTimeframeOn] = useState(true);
    const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);
    const [selectedRange, setSelectedRange] = useState("Sep 1 - Nov 30, 2023");

    if (activeTab !== 'dashboard') {
        return (
            <div className="bg-white rounded-3xl p-6 shadow-sm min-h-[calc(100vh-6rem)] flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-20 h-20 bg-neutral-50 rounded-full flex items-center justify-center mb-2">
                    <Coffee className="w-10 h-10 text-neutral-300" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-neutral-800 mb-1">No data available</h3>
                    <p className="text-neutral-500 max-w-sm">This section is currently empty. Please switch back to the Dashboard to see your reports.</p>
                </div>
                <div className="pt-4">
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-2 bg-neutral-900 text-white rounded-full text-sm font-bold hover:bg-neutral-800 transition-all active:scale-95"
                    >
                        Refresh status
                    </button>
                </div>
            </div>
        );
    }

    const salesData = [
        {
            name: "Armin A.",
            image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop",
            revenue: "$209,633",
            leads: { active: 41, total: 118 },
            kpi: "0.84",
            winLoss: { rate: "31%", win: 12, loss: 29 },
            status: null
        },
        {
            name: "Mikasa A.",
            image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
            revenue: "$156,841",
            leads: { active: 54, total: 103 },
            kpi: "0.89",
            winLoss: { rate: "39%", win: 21, loss: 33 },
            status: "Top sales 💪"
        },
        {
            name: "Eren Y.",
            image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop",
            revenue: "$134,200",
            leads: { active: 25, total: 89 },
            kpi: "0.76",
            winLoss: { rate: "28%", win: 15, loss: 12 },
            status: null
        }
    ];

    return (
        <div className="bg-white rounded-3xl p-6 shadow-sm min-h-[calc(100vh-6rem)]">
            {/* Internal Header */}
            <div className="flex flex-col gap-6 mb-8">
                {/* Top Row: User Avatars & Actions */}
                <div className="flex justify-between items-center overflow-x-auto pb-2 -mb-2 no-scrollbar md:overflow-visible">
                    <div className="flex items-center gap-2 sm:gap-3 min-w-max">
                        <button className="w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 bg-white shadow-sm flex-shrink-0">
                            <Plus className="w-5 h-5 text-neutral-600" />
                        </button>
                        {[
                            { name: "Armin A.", image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop" },
                            { name: "Eren Y.", image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop" },
                            { name: "Mikasa A.", image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop" }
                        ].map((user, i) => (
                            <div key={i} className="flex items-center gap-2 border border-neutral-200 rounded-full pl-1 pr-1 sm:pr-4 py-1 bg-white hover:bg-neutral-50 cursor-pointer shadow-sm hover:scale-105 hover:shadow-md transition-all duration-300">
                                <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-sm flex-shrink-0">
                                    <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                                </div>
                                <span className="text-sm font-medium text-neutral-700 hidden sm:block">{user.name}</span>
                            </div>
                        ))}
                        <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white font-bold text-lg hover:opacity-80 cursor-pointer border-[3px] border-white shadow-[0_2px_8px_rgba(0,0,0,0.1)] transition-all hover:scale-105 flex-shrink-0">
                            C
                        </div>
                    </div>

                    <div className="hidden sm:flex gap-3">
                        <button className="min-w-[44px] min-h-[44px] rounded-full border border-neutral-200 flex items-center justify-center bg-white hover:bg-neutral-50 shadow-sm hover:scale-105 active:scale-95 transition-all">
                            <SlidersHorizontal className="w-4 h-4 text-neutral-600" />
                        </button>
                        <button className="min-w-[44px] min-h-[44px] rounded-full border border-neutral-200 flex items-center justify-center bg-white hover:bg-neutral-50 shadow-sm hover:scale-105 active:scale-95 transition-all">
                            <Download className="w-4 h-4 text-neutral-600" />
                        </button>
                        <button className="min-w-[44px] min-h-[44px] rounded-full border border-neutral-200 flex items-center justify-center bg-white hover:bg-neutral-50 shadow-sm hover:scale-105 active:scale-95 transition-all">
                            <Upload className="w-4 h-4 text-neutral-600" />
                        </button>
                    </div>
                </div>

                {/* Title and Logo */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <h1 className="text-3xl font-bold text-neutral-300">New report</h1>

                    <div className="flex items-center gap-3 self-end md:self-auto">
                        <div
                            className="flex items-center gap-2 cursor-pointer group min-h-[44px] px-1 select-none"
                            onClick={() => setIsTimeframeOn(!isTimeframeOn)}
                        >
                            <div className={cn(
                                "w-9 h-5 rounded-full relative transition-colors duration-300",
                                isTimeframeOn ? "bg-neutral-800" : "bg-neutral-200"
                            )}>
                                <div className={cn(
                                    "absolute top-1 w-3 h-3 bg-white rounded-full transition-all duration-300 shadow-sm",
                                    isTimeframeOn ? "left-5" : "left-1"
                                )}></div>
                            </div>
                            <span className={cn(
                                "text-sm font-medium transition-colors",
                                isTimeframeOn ? "text-neutral-700" : "text-neutral-400"
                            )}>Timeframe</span>
                        </div>

                        <div className="relative">
                            <div
                                className={cn(
                                    "px-4 py-2 min-h-[44px] rounded-full text-xs font-medium flex items-center gap-2 cursor-pointer transition-all select-none",
                                    isDateDropdownOpen ? "bg-neutral-800 text-white shadow-lg scale-105" : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                                )}
                                onClick={() => setIsDateDropdownOpen(!isDateDropdownOpen)}
                            >
                                {selectedRange}
                                <ChevronDown className={cn(
                                    "w-3 h-3 transition-transform duration-300",
                                    isDateDropdownOpen ? "rotate-180 text-white" : "text-neutral-400"
                                )} />
                            </div>

                            {isDateDropdownOpen && (
                                <>
                                    <div
                                        className="fixed inset-0 z-40"
                                        onClick={() => setIsDateDropdownOpen(false)}
                                    ></div>
                                    <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-neutral-100 py-2 z-50 animate-in fade-in zoom-in duration-200 origin-top-right">
                                        {[
                                            "Sep 1 - Nov 30, 2023",
                                            "Jun 1 - Aug 31, 2023",
                                            "Mar 1 - May 31, 2023",
                                            "All time"
                                        ].map((range) => (
                                            <button
                                                key={range}
                                                className={cn(
                                                    "w-full px-4 py-2 text-left text-xs font-semibold hover:bg-neutral-50 transition-colors",
                                                    selectedRange === range ? "text-pink-600" : "text-neutral-600"
                                                )}
                                                onClick={() => {
                                                    setSelectedRange(range);
                                                    setIsDateDropdownOpen(false);
                                                }}
                                            >
                                                {range}
                                            </button>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Row 1: Revenue & Key Metrics */}
            <div className="flex flex-col xl:flex-row gap-4 mb-6 xl:items-stretch">
                {/* Revenue Section */}
                <div className="flex-1 flex flex-col justify-center min-w-0 md:min-w-[300px] hover:scale-[1.01] transition-transform origin-left cursor-pointer">
                    <h3 className="text-lg font-bold mb-1">Revenue</h3>
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <span className="text-4xl font-bold">$528,976<span className="text-neutral-300">.82</span></span>
                        <div className="flex gap-2">
                            <div className="bg-pink-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5 min-h-[20px]">
                                <ChevronsUp className="w-2.5 h-2.5" strokeWidth={4} />
                                7.9%
                            </div>
                            <div className="bg-pink-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full min-h-[20px]">
                                $27,335<span className="opacity-70">.09</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] font-semibold tracking-wide cursor-pointer mt-1 flex-wrap">
                        <span className="text-neutral-500">vs prev.</span>
                        <span className="text-neutral-800">$501,641.73</span>
                        <span className="text-neutral-800 ml-1">Jun 1 - Aug 31, 2023</span>
                        <ChevronDown className="w-3 h-3 text-neutral-500 ml-0.5" />
                    </div>
                </div>

                {/* Right Cards Cluster */}
                <div className="flex flex-wrap md:flex-nowrap gap-3 h-auto md:h-24">
                    {/* Top Sales */}
                    <div className="relative w-full md:w-40 group cursor-pointer h-24 md:h-auto">
                        <div className="absolute inset-x-2 -bottom-1 top-1 bg-neutral-100 rounded-[24px] pointer-events-none group-hover:top-2 transition-all duration-300"></div>
                        <div className="card h-full px-4 py-3 flex flex-col justify-between shadow-sm hover:shadow-lg transition-all duration-300 bg-white rounded-[20px] relative z-10 hover:-translate-y-1">
                            <span className="text-xs text-neutral-400 font-medium tracking-wide">Top sales</span>
                            <div>
                                <span className="text-xl font-bold block mb-2 text-neutral-800">72</span>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 rounded-full overflow-hidden border border-rose-100 shadow-sm">
                                            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop" alt="Mikasa" className="w-full h-full object-cover" />
                                        </div>
                                        <span className="text-[11px] font-semibold text-neutral-600">Mikasa</span>
                                    </div>
                                    <button className="w-6 h-6 bg-white rounded-[8px] shadow-sm border border-neutral-100 flex items-center justify-center hover:bg-neutral-50 group-hover:scale-110 transition-transform">
                                        <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Best Deal */}
                    <div className="relative w-full md:w-40 group cursor-pointer h-24 md:h-auto">
                        <div className="absolute inset-x-2 -bottom-1 top-1 bg-neutral-200 rounded-[24px] pointer-events-none group-hover:top-2 transition-all duration-300"></div>
                        <div className="card h-full px-4 py-3 bg-black text-white flex flex-col justify-between shadow-sm hover:shadow-lg transition-all duration-300 rounded-[18px] relative z-10 hover:-translate-y-1">
                            <div className="flex justify-between items-start mb-1">
                                <span className="text-xs text-neutral-400 font-medium tracking-wide">Best deal</span>
                                <Star className="w-3.5 h-3.5 text-neutral-500 group-hover:text-yellow-400 transition-colors" />
                            </div>
                            <div>
                                <span className="text-xl font-bold block mb-2">$42,300</span>
                                <div className="flex items-center justify-between">
                                    <span className="text-[11px] text-neutral-300 font-medium">Rolf Inc.</span>
                                    <button className="w-6 h-6 bg-white rounded-[8px] flex items-center justify-center hover:bg-neutral-200 group-hover:scale-110 transition-transform">
                                        <ChevronRight className="w-3.5 h-3.5 text-black" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Vertical Metrics Group */}
                    <div className="flex gap-3 w-full md:w-auto mt-2 md:mt-0 justify-between md:justify-start">
                        {/* Deals */}
                        <div className="card w-full md:w-20 py-2 flex flex-col items-center justify-between shadow-sm rounded-[16px] bg-white border border-neutral-100 hover:border-pink-500 hover:ring-1 hover:ring-pink-100 hover:scale-105 hover:shadow-md transition-all cursor-pointer group h-24">
                            <span className="text-[10px] font-semibold text-neutral-600 mt-1">Deals</span>
                            <div className="bg-neutral-200 rounded-full px-2.5 py-0.5 text-[10px] font-bold text-neutral-500 group-hover:bg-pink-600 group-hover:text-white transition-colors">256</div>
                            <span className="text-[9px] font-bold text-neutral-800 flex items-center gap-0.5 mb-1">
                                <div className="flex flex-col items-center -space-y-1">
                                    <ChevronDown className="w-2.5 h-2.5 mt-0" strokeWidth={5} />
                                </div>
                                5
                            </span>
                        </div>

                        {/* Value */}
                        <div className="card w-full md:w-20 py-2 flex flex-col items-center justify-between shadow-sm rounded-[16px] bg-white border border-neutral-100 hover:border-pink-500 hover:ring-1 hover:ring-pink-100 hover:scale-105 hover:shadow-md transition-all cursor-pointer group h-24">
                            <span className="text-[10px] font-semibold text-neutral-600 mt-1">Value</span>
                            <div className="bg-neutral-200 rounded-full px-2.5 py-0.5 text-[10px] font-bold text-neutral-500 group-hover:bg-pink-600 group-hover:text-white transition-colors">528k</div>
                            <span className="text-[9px] font-bold text-neutral-600 flex items-center gap-0.5 mb-1">
                                <ArrowUpRight className="w-2.5 h-2.5" /> 7.9%
                            </span>
                        </div>

                        {/* Win Rate */}
                        <div className="card w-full md:w-20 py-2 flex flex-col items-center justify-between shadow-sm rounded-[16px] bg-white border border-neutral-100 hover:border-pink-500 hover:ring-1 hover:ring-pink-100 hover:scale-105 hover:shadow-md transition-all cursor-pointer group h-24">
                            <span className="text-[10px] font-semibold text-neutral-600 mt-1">Win rate</span>
                            <div className="bg-neutral-200 rounded-full px-2.5 py-0.5 text-[10px] font-bold text-neutral-500 group-hover:bg-pink-600 group-hover:text-white transition-colors">44%</div>
                            <span className="text-[9px] font-bold text-neutral-600 flex items-center gap-0.5 mb-1">
                                <ArrowUpRight className="w-2.5 h-2.5" /> 1.2%
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sales Leaderboard Row */}
            <div className="mb-5 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="bg-neutral-100/80 rounded-[2rem] md:rounded-full p-2 md:p-1.5 w-full md:flex-1 overflow-hidden">
                    <div className="flex flex-col md:flex-row items-center gap-2 w-full h-full">
                        {/* Armin A. */}
                        <div className="flex items-center gap-2 bg-white rounded-full pr-4 pl-1 py-1 shadow-sm border border-neutral-100/50 w-full md:w-[calc(35%-6px)] h-12 md:h-full hover:scale-105 hover:shadow-md hover:z-10 transition-all origin-center cursor-pointer">
                            <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-white flex-shrink-0">
                                <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop" alt="Armin" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex items-baseline justify-between w-full overflow-hidden">
                                <span className="font-bold text-neutral-800 text-sm truncate">$209,633</span>
                                <span className="text-neutral-400 text-xs font-semibold ml-1">39.63%</span>
                            </div>
                        </div>

                        {/* Mikasa A. */}
                        <div className="flex items-center gap-2 bg-white rounded-full pr-4 pl-1 py-1 shadow-sm border border-neutral-100/50 w-full md:w-[calc(27%-6px)] h-12 md:h-full hover:scale-105 hover:shadow-md hover:z-10 transition-all origin-center cursor-pointer">
                            <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-white flex-shrink-0">
                                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop" alt="Mikasa" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex items-baseline justify-between w-full overflow-hidden">
                                <span className="font-bold text-neutral-800 text-sm truncate">$156,841</span>
                                <span className="text-neutral-400 text-xs font-semibold ml-1">29.65%</span>
                            </div>
                        </div>

                        {/* Eren Y. */}
                        <div className="flex items-center gap-2 bg-white rounded-full pr-4 pl-1 py-1 shadow-sm border border-neutral-100/50 w-full md:w-[calc(21%-6px)] h-12 md:h-full hover:scale-105 hover:shadow-md hover:z-10 transition-all origin-center cursor-pointer">
                            <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-white flex-shrink-0">
                                <img src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop" alt="Eren" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex items-baseline justify-between w-full overflow-hidden">
                                <span className="font-bold text-neutral-800 text-sm truncate">$117,115</span>
                                <span className="text-neutral-400 text-xs font-semibold ml-1">22.14%</span>
                            </div>
                        </div>

                        {/* Company / Other */}
                        <div className="flex items-center gap-2 rounded-full pr-4 pl-1 py-1 border border-neutral-100/50 w-full md:w-[calc(17%-6px)] h-12 md:h-full hover:scale-105 hover:z-10 transition-all origin-center cursor-pointer">
                            <div className="w-9 h-9 bg-black rounded-full flex items-center justify-center text-white text-xs font-bold border-[3px] border-white shadow-sm flex-shrink-0">C</div>
                            <div className="flex items-baseline justify-between w-full overflow-hidden">
                                <span className="font-bold text-neutral-800 text-sm truncate">$45,386</span>
                                <span className="text-neutral-400 text-xs font-semibold ml-1">8.58%</span>
                            </div>
                        </div>

                    </div>
                </div>
                <Link href="/details">
                    <button className="bg-black text-white px-5 py-2 rounded-full text-[11px] font-bold tracking-wide hover:bg-neutral-800 hover:scale-105 active:scale-95 transition-all shadow-sm whitespace-nowrap">
                        Details
                    </button>
                </Link>
            </div>


            {/* Main Grid: 2 Columns on XL (Equal Space) */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

                {/* Left Column */}
                <div className="space-y-6">
                    {/* Filters / Platform Stats */}
                    {/* Top Row: Filters & Deals Amount */}
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        {/* Filters / Platform Stats */}
                        <div className="bg-[#f2f2f5] pt-4 px-4 pb-3 rounded-[24px]">
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center gap-2 cursor-pointer">
                                    <div className="flex flex-col gap-1">
                                        <div className="w-4 h-0.5 bg-neutral-800 rounded-full"></div>
                                        <div className="w-4 h-0.5 bg-neutral-800 rounded-full"></div>
                                        <div className="w-2.5 h-0.5 bg-neutral-800 rounded-full"></div>
                                    </div>
                                    <ChevronDown className="w-3 h-3 text-neutral-800" strokeWidth={2.5} />
                                </div>
                                <div className="bg-white/50 px-2.5 py-1 rounded-lg text-[11px] font-bold text-neutral-700 flex items-center gap-1.5 cursor-pointer border border-neutral-200/50 shadow-sm">
                                    Filters <div className="flex flex-col gap-[2px]"><div className="w-2 h-[1px] bg-neutral-600 rounded-full"></div><div className="w-1.5 h-[1px] bg-neutral-600 rounded-full self-center"></div><div className="w-2 h-[1px] bg-neutral-600 rounded-full"></div></div>
                                </div>
                            </div>
                            {/* Platform Stats Grid */}
                            <div className="space-y-2">
                                <div className="bg-white rounded-full p-1.5 pr-3 flex items-center justify-between shadow-sm hover:shadow-md hover:scale-[1.02] transition-all cursor-pointer">
                                    <div className="flex items-center gap-2 flex-1 min-w-0">
                                        <div className="w-8 h-8 rounded-full bg-white border border-neutral-100 flex items-center justify-center shrink-0">
                                            <Dribbble className="w-4 h-4 text-pink-500" />
                                        </div>
                                        <span className="text-neutral-500 font-medium text-xs">Dribbble</span>
                                        <span className="font-bold text-neutral-800 text-xs ml-auto">$227,459</span>
                                    </div>
                                    <span className="bg-neutral-100/80 text-neutral-400 font-bold text-[10px] px-2 py-0.5 rounded-full shrink-0 ml-2">43%</span>
                                </div>

                                <div className="bg-white rounded-full p-1.5 pr-3 flex items-center justify-between shadow-sm hover:shadow-md hover:scale-[1.02] transition-all cursor-pointer">
                                    <div className="flex items-center gap-2 flex-1 min-w-0">
                                        <div className="w-8 h-8 rounded-full bg-white border border-neutral-100 flex items-center justify-center shrink-0">
                                            <Instagram className="w-4 h-4 text-pink-600" />
                                        </div>
                                        <span className="text-neutral-500 font-medium text-xs">Instagram</span>
                                        <span className="font-bold text-neutral-800 text-xs ml-auto">$142,823</span>
                                    </div>
                                    <span className="bg-neutral-100/80 text-neutral-400 font-bold text-[10px] px-2 py-0.5 rounded-full shrink-0 ml-2">27%</span>
                                </div>

                                <div className="bg-white rounded-full p-1.5 pr-3 flex items-center justify-between shadow-sm hover:shadow-md hover:scale-[1.02] transition-all cursor-pointer">
                                    <div className="flex items-center gap-2 flex-1 min-w-0">
                                        <div className="w-8 h-8 rounded-full bg-white border border-neutral-100 flex items-center justify-center shrink-0">
                                            <span className="font-bold text-blue-600 text-xs">Bē</span>
                                        </div>
                                        <span className="text-neutral-500 font-medium text-xs">Behance</span>
                                        <span className="font-bold text-neutral-800 text-xs ml-auto">$89,935</span>
                                    </div>
                                    <span className="bg-neutral-100/80 text-neutral-400 font-bold text-[10px] px-2 py-0.5 rounded-full shrink-0 ml-2">11%</span>
                                </div>

                                <div className="bg-white rounded-full p-1.5 pr-3 flex items-center justify-between shadow-sm hover:shadow-md hover:scale-[1.02] transition-all cursor-pointer">
                                    <div className="flex items-center gap-2 flex-1 min-w-0">
                                        <div className="w-8 h-8 rounded-full bg-white border border-neutral-100 flex items-center justify-center shrink-0">
                                            <svg className="w-4 h-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                            </svg>
                                        </div>
                                        <span className="text-neutral-500 font-medium text-xs">Google</span>
                                        <span className="font-bold text-neutral-800 text-xs ml-auto">$37,028</span>
                                    </div>
                                    <span className="bg-neutral-100/80 text-neutral-400 font-bold text-[10px] px-2 py-0.5 rounded-full shrink-0 ml-2">7%</span>
                                </div>
                            </div>
                        </div>

                        {/* Deals Amount Card */}
                        <div className="bg-[#f2f2f5] pt-4 px-4 pb-3 rounded-[24px] flex flex-col">
                            <div className="flex justify-between items-center mb-3">
                                <div className="flex items-center gap-2 cursor-pointer">
                                    <BarChart3 className="w-4 h-4 text-neutral-800" strokeWidth={2.5} />
                                    <ChevronDown className="w-3 h-3 text-neutral-800" strokeWidth={2.5} />
                                </div>
                                <div className="bg-white/50 px-2.5 py-1 rounded-lg text-[11px] font-bold text-neutral-700 flex items-center gap-1.5 cursor-pointer border border-neutral-200/50 shadow-sm">
                                    Filters <div className="flex flex-col gap-[2px]"><div className="w-2 h-[1px] bg-neutral-600 rounded-full"></div><div className="w-1.5 h-[1px] bg-neutral-600 rounded-full self-center"></div><div className="w-2 h-[1px] bg-neutral-600 rounded-full"></div></div>
                                </div>
                            </div>

                            <div className="flex-1 flex items-end justify-between gap-1.5 min-h-[100px] pb-2">
                                {/* Be - Striped */}
                                <div className="w-9 h-20 rounded-[14px] bg-white relative overflow-hidden flex items-start justify-center pt-2 shadow-sm hover:brightness-105 hover:scale-[1.02] origin-bottom transition-all">
                                    <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,#f2f2f5_25%,#f2f2f5_50%,transparent_50%,transparent_75%,#f2f2f5_75%,#f2f2f5_100%)] bg-[length:6px_6px] opacity-60"></div>
                                    <span className="relative z-10 font-bold text-blue-600 text-xs">Bē</span>
                                </div>

                                {/* Dribbble - Tall White */}
                                <div className="w-9 h-28 rounded-[14px] bg-white flex items-start justify-center pt-2 shadow-sm hover:brightness-105 hover:scale-[1.02] origin-bottom transition-all">
                                    <Dribbble className="w-4 h-4 text-pink-500" />
                                </div>

                                {/* Google - Medium White */}
                                <div className="w-9 h-16 rounded-[14px] bg-white flex items-start justify-center pt-2 shadow-sm hover:brightness-105 hover:scale-[1.02] origin-bottom transition-all">
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                    </svg>
                                </div>

                                {/* Instagram - Short White */}
                                <div className="w-9 h-14 rounded-[14px] bg-white flex items-start justify-center pt-2 shadow-sm hover:brightness-105 hover:scale-[1.02] origin-bottom transition-all">
                                    <Instagram className="w-4 h-4 text-pink-600" />
                                </div>

                                {/* Shop - Tall Striped */}
                                <div className="w-9 h-24 rounded-[14px] bg-white relative overflow-hidden flex items-start justify-center pt-2 shadow-sm hover:brightness-105 hover:scale-[1.02] origin-bottom transition-all">
                                    <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,#f2f2f5_25%,#f2f2f5_50%,transparent_50%,transparent_75%,#f2f2f5_75%,#f2f2f5_100%)] bg-[length:6px_6px] opacity-60"></div>
                                    <ShoppingBag className="relative z-10 w-4 h-4 text-neutral-800" strokeWidth={2.5} />
                                </div>
                            </div>

                            <div className="mt-1">
                                <p className="text-neutral-400 text-[10px] font-semibold">Deals amount</p>
                                <div className="flex items-center gap-1 cursor-pointer">
                                    <p className="text-neutral-800 text-xs font-bold">by referrer category</p>
                                    <ChevronDown className="w-3 h-3 text-neutral-500" />
                                </div>
                            </div>
                        </div>
                    </div>



                    {/* Platform Value - Pink Section */}
                    <div className="bg-[#ECECEC] rounded-[20px] overflow-hidden">
                        {/* Header */}
                        <div className="p-4 pb-4 sm:p-4 sm:pb-3 bg-[#F4F4F5] sm:bg-[#ECECEC]">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 sm:gap-0">
                                {/* Section 1: Logo & Title */}
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 sm:w-9 sm:h-9 rounded-full bg-pink-100 flex items-center justify-center">
                                        <Dribbble className="w-5 h-5 sm:w-4 sm:h-4 text-pink-500" />
                                    </div>
                                    <div>
                                        <span className="text-neutral-400 text-xs font-medium block leading-tight">Platform value</span>
                                        <div className="flex items-center gap-1 cursor-pointer">
                                            <span className="text-neutral-900 text-lg sm:text-sm font-bold">Dribbble</span>
                                            <ChevronDown className="w-4 h-4 sm:w-3 sm:h-3 text-neutral-500" />
                                        </div>
                                    </div>
                                </div>
                                {/* Section 2: Buttons */}
                                <div className="flex p-1 bg-white rounded-full border border-neutral-200 w-full sm:w-auto sm:bg-transparent sm:border-0 sm:rounded-none sm:p-0 sm:gap-1.5">
                                    <motion.button
                                        onClick={() => setActiveMetric("revenue")}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={cn(
                                            "flex-1 sm:flex-none py-2 sm:py-1.5 px-0 sm:px-3 rounded-full text-[13px] sm:text-xs font-semibold cursor-pointer transition-colors relative z-10",
                                            activeMetric === "revenue" ? "bg-neutral-900 text-white shadow-sm" : "text-neutral-500 bg-transparent hover:bg-neutral-50 sm:bg-white sm:text-neutral-700 sm:border sm:border-neutral-200"
                                        )}
                                    >
                                        Revenue
                                    </motion.button>
                                    <motion.button
                                        onClick={() => setActiveMetric("leads")}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={cn(
                                            "flex-1 sm:flex-none py-2 sm:py-1.5 px-0 sm:px-3 rounded-full text-[13px] sm:text-xs font-medium cursor-pointer transition-colors relative z-10",
                                            activeMetric === "leads" ? "bg-neutral-900 text-white shadow-sm" : "text-neutral-500 bg-transparent hover:bg-neutral-50 sm:bg-white sm:text-neutral-700 sm:border sm:border-neutral-200"
                                        )}
                                    >
                                        Leads
                                    </motion.button>
                                    <motion.button
                                        onClick={() => setActiveMetric("wl")}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={cn(
                                            "flex-1 sm:flex-none py-2 sm:py-1.5 px-0 sm:px-3 rounded-full text-[13px] sm:text-xs font-medium cursor-pointer transition-colors relative z-10",
                                            activeMetric === "wl" ? "bg-neutral-900 text-white shadow-sm" : "text-neutral-500 bg-transparent hover:bg-neutral-50 sm:bg-white sm:text-neutral-700 sm:border sm:border-neutral-200"
                                        )}
                                    >
                                        W/L
                                    </motion.button>
                                </div>
                            </div>
                        </div>

                        {/* Main Content Area */}
                        <div className="flex flex-col sm:flex-row bg-[#F4F4F5] sm:bg-[#ECECEC] p-2 pt-0 sm:p-0">

                            {/* MOBILE STATS CARD (Red Ribbon) - Visible only on Mobile */}
                            <div className="w-full h-[100px] bg-[#BE123C] rounded-[10px] flex overflow-hidden shadow-sm relative shrink-0 sm:hidden mb-6">
                                {/* Left Strip */}
                                <div className="w-8 h-full bg-[#9F1239] flex items-center justify-center">
                                    <span className="text-white/80 text-[9px] uppercase tracking-wider font-semibold -rotate-90 whitespace-nowrap">Average monthly</span>
                                </div>
                                {/* Right Stats Content */}
                                <div className="flex-1 flex items-center justify-between px-5 text-white">
                                    <div className="flex flex-col">
                                        <span className="text-pink-100 text-[11px] mb-0.5">Revenue</span>
                                        <span className="text-xl font-bold tracking-tight">$18,552</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-pink-100 text-[11px] mb-0.5">Leads</span>
                                        <span className="text-sm font-bold">373</span>
                                        <span className="text-[9px] text-pink-200/70">(97/276)</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-pink-100 text-[11px] mb-0.5">Win/lose</span>
                                        <span className="text-sm font-bold">16%</span>
                                        <span className="text-[9px] text-pink-200/70">(51/318)</span>
                                    </div>
                                </div>
                            </div>

                            {/* DESKTOP SIDEBAR (Pink Grid) - Visible only on Desktop */}
                            <div className="hidden sm:flex bg-[#E11D48] text-white w-full sm:w-[140px] py-4 sm:py-6 px-4 relative flex-col justify-center items-center rounded-t-[20px] sm:rounded-tr-[24px] sm:rounded-tl-none sm:rounded-l-none hover:shadow-lg transition-shadow duration-300 cursor-pointer hover:brightness-105">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 -translate-x-1/2 -rotate-90 origin-center whitespace-nowrap">
                                    <span className="text-base font-medium text-pink-200/70 tracking-wide">Average monthly</span>
                                </div>
                                <div className="flex flex-col gap-5 ml-6 items-start">
                                    <div>
                                        <span className="text-sm text-pink-200/80 block mb-1">Revenue</span>
                                        <span className="text-2xl font-bold">$18,552</span>
                                    </div>
                                    <div>
                                        <span className="text-sm text-pink-200/80 block mb-1">Leads</span>
                                        <div className="block">
                                            <span className="text-lg font-bold">373</span>
                                            <span className="text-pink-200/70 font-normal text-sm ml-1">97/276</span>
                                        </div>
                                    </div>
                                    <div>
                                        <span className="text-sm text-pink-200/80 block mb-1">Win/lose</span>
                                        <div className="block">
                                            <span className="text-lg font-bold">16%</span>
                                            <span className="text-pink-200/70 font-normal text-sm ml-1">51/318</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Bar Chart Area */}
                            <div className="flex-1 bg-[#F4F4F5] sm:bg-[#ECECEC] sm:p-4 sm:pl-6 pb-3">
                                <div className="flex h-[260px] sm:h-[240px] md:h-[200px] items-end justify-between relative">
                                    {/* Horizontal Grid Lines */}
                                    <div className="absolute left-[35px] right-0 sm:left-0 sm:right-12 top-0 bottom-12 sm:bottom-10 flex flex-col justify-between pointer-events-none">
                                        <div className="border-b border-neutral-300/50 sm:border-white"></div>
                                        <div className="border-b border-neutral-300/50 sm:border-white"></div>
                                        <div className="border-b border-neutral-300/50 sm:border-white"></div>
                                        <div className="border-b border-neutral-300/50 sm:border-white"></div>
                                        <div className="border-b border-neutral-300/50 sm:border-white"></div>
                                    </div>

                                    {/* Mobile Y-Axis Labels (Left Side) */}
                                    <div className="absolute left-0 top-0 bottom-12 flex sm:hidden flex-col justify-between text-[10px] text-neutral-400 font-medium w-[30px] pr-1 text-right">
                                        {activeMetric === "revenue" && (
                                            <>
                                                <span>$14k</span>
                                                <span>$11k</span>
                                                <span>$7.5k</span>
                                                <span>$4k</span>
                                                <span>$0</span>
                                            </>
                                        )}
                                        {activeMetric === "leads" && (
                                            <>
                                                <span>300</span>
                                                <span>225</span>
                                                <span>150</span>
                                                <span>75</span>
                                                <span>0</span>
                                            </>
                                        )}
                                        {activeMetric === "wl" && (
                                            <>
                                                <span>100%</span>
                                                <span>75%</span>
                                                <span>50%</span>
                                                <span>25%</span>
                                                <span>0%</span>
                                            </>
                                        )}
                                    </div>

                                    {/* Desktop Y-axis labels (Right Side) */}
                                    <div className="absolute right-0 top-0 bottom-9 h-[200px] sm:h-[240px] md:h-[160px] hidden sm:flex flex-col justify-between text-xs text-neutral-400 font-medium pl-1">
                                        {activeMetric === "revenue" && (
                                            <>
                                                <span>$14,500</span>
                                                <span>$11,000</span>
                                                <span>$7,500</span>
                                                <span>$4,000</span>
                                                <span>$0</span>
                                            </>
                                        )}
                                        {activeMetric === "leads" && (
                                            <>
                                                <span>300</span>
                                                <span>225</span>
                                                <span>150</span>
                                                <span>75</span>
                                                <span>0</span>
                                            </>
                                        )}
                                        {activeMetric === "wl" && (
                                            <>
                                                <span>100%</span>
                                                <span>75%</span>
                                                <span>50%</span>
                                                <span>25%</span>
                                                <span>0%</span>
                                            </>
                                        )}
                                    </div>

                                    {/* Bars Layer - positioned to align with grid */}
                                    <PlatformBarChart activeMetric={activeMetric} />

                                    {/* Avatars & Labels Layer - at the bottom */}
                                    {/* Avatars & Labels Layer - at the bottom */}
                                    <div className="absolute left-[35px] right-0 sm:left-0 sm:right-12 bottom-0 h-12 flex items-end justify-around pb-1 sm:pb-0">

                                        {/* ================= MOBILE AVATARS (Aligned 1:1) ================= */}
                                        {/* Sep Group (Mobile) */}
                                        <div className="flex sm:hidden flex-col items-center gap-1">
                                            <div className="flex items-end gap-[2px]">
                                                {['1599566150163-29194dcaad36', '1535713875002-d1d0cf377fde', '1527980965255-d3b416303d12'].map((id, i) => (
                                                    <div key={i} className="w-4 h-4 rounded-full overflow-hidden border border-white shadow-sm flex-shrink-0">
                                                        <img src={`https://images.unsplash.com/photo-${id}?w=50&h=50&fit=crop`} className="w-full h-full object-cover" />
                                                    </div>
                                                ))}
                                            </div>
                                            <span className="text-[9px] text-neutral-400 font-medium">Sep</span>
                                        </div>

                                        {/* Oct Group (Mobile) */}
                                        <div className="flex sm:hidden flex-col items-center gap-1">
                                            <div className="flex items-end gap-[2px]">
                                                {['1494790108377-be9c29b29330', '1507003211169-0a1dd7228f2d', '1438761681033-6461ffad8d80'].map((id, i) => (
                                                    <div key={i} className="w-4 h-4 rounded-full overflow-hidden border border-white shadow-sm flex-shrink-0">
                                                        <img src={`https://images.unsplash.com/photo-${id}?w=50&h=50&fit=crop`} className="w-full h-full object-cover" />
                                                    </div>
                                                ))}
                                            </div>
                                            <span className="text-[9px] text-neutral-400 font-medium">Oct</span>
                                        </div>

                                        {/* Nov Group (Mobile) */}
                                        <div className="flex sm:hidden flex-col items-center gap-1">
                                            <div className="flex items-end gap-[2px]">
                                                {['1500648767791-00dcc994a43e', '1544005313-94ddf0286df2', '1552058544-f2b08422138a'].map((id, i) => (
                                                    <div key={i} className="w-4 h-4 rounded-full overflow-hidden border border-white shadow-sm flex-shrink-0">
                                                        <img src={`https://images.unsplash.com/photo-${id}?w=50&h=50&fit=crop`} className="w-full h-full object-cover" />
                                                    </div>
                                                ))}
                                            </div>
                                            <span className="text-[9px] text-neutral-400 font-medium">Nov</span>
                                        </div>


                                        {/* ================= DESKTOP AVATARS (Overlapping) ================= */}
                                        {/* Sep Group (Desktop) */}
                                        <div className="hidden sm:flex flex-col items-center gap-3">
                                            <div className="flex items-center gap-2">
                                                <motion.div whileHover={{ scale: 1.2, zIndex: 10 }} className="w-6 h-6 rounded-full bg-neutral-600 border-2 border-white shadow-sm overflow-hidden cursor-pointer relative">
                                                    <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=50&h=50&fit=crop" alt="" className="w-full h-full object-cover" />
                                                </motion.div>
                                                <motion.div whileHover={{ scale: 1.2, zIndex: 10 }} className="w-6 h-6 rounded-full bg-neutral-600 border-2 border-white shadow-sm overflow-hidden cursor-pointer relative">
                                                    <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop" alt="" className="w-full h-full object-cover" />
                                                </motion.div>
                                                <motion.div whileHover={{ scale: 1.2, zIndex: 10 }} className="w-6 h-6 rounded-full bg-neutral-600 border-2 border-white shadow-sm overflow-hidden cursor-pointer relative">
                                                    <img src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=50&h=50&fit=crop" alt="" className="w-full h-full object-cover" />
                                                </motion.div>
                                            </div>
                                            <span className="text-xs text-neutral-400 font-medium">Sep</span>
                                        </div>

                                        {/* Oct Group (Desktop) */}
                                        <div className="hidden sm:flex flex-col items-center gap-3">
                                            <div className="flex items-center gap-1">
                                                <motion.div whileHover={{ scale: 1.2, zIndex: 10 }} className="w-6 h-6 rounded-full bg-neutral-600 border-2 border-white shadow-sm overflow-hidden cursor-pointer relative">
                                                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop" alt="" className="w-full h-full object-cover" />
                                                </motion.div>
                                                <motion.div whileHover={{ scale: 1.2, zIndex: 10 }} className="w-6 h-6 rounded-full bg-[#0EA5E9] border-[3px] border-[#0EA5E9] shadow-sm overflow-hidden cursor-pointer relative">
                                                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop" alt="" className="w-full h-full object-cover" />
                                                </motion.div>
                                                <motion.div whileHover={{ scale: 1.2, zIndex: 10 }} className="w-6 h-6 rounded-full bg-neutral-600 border-2 border-white shadow-sm overflow-hidden cursor-pointer relative">
                                                    <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop" alt="" className="w-full h-full object-cover" />
                                                </motion.div>
                                            </div>
                                            <span className="text-xs text-neutral-400 font-medium">Oct</span>
                                        </div>

                                        {/* Nov Group (Desktop) */}
                                        <div className="hidden sm:flex flex-col items-center gap-3">
                                            <div className="flex items-center gap-1">
                                                <motion.div whileHover={{ scale: 1.2, zIndex: 10 }} className="w-6 h-6 rounded-full bg-neutral-600 border-2 border-white shadow-sm overflow-hidden cursor-pointer relative">
                                                    <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop" alt="" className="w-full h-full object-cover" />
                                                </motion.div>
                                                <motion.div whileHover={{ scale: 1.2, zIndex: 10 }} className="w-6 h-6 rounded-full bg-[#0EA5E9] border-[3px] border-[#0EA5E9] shadow-sm overflow-hidden cursor-pointer relative">
                                                    <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop" alt="" className="w-full h-full object-cover" />
                                                </motion.div>
                                                <motion.div whileHover={{ scale: 1.2, zIndex: 10 }} className="w-6 h-6 rounded-full bg-neutral-600 border-2 border-white shadow-sm overflow-hidden cursor-pointer relative">
                                                    <img src="https://images.unsplash.com/photo-1552058544-f2b08422138a?w=50&h=50&fit=crop" alt="" className="w-full h-full object-cover" />
                                                </motion.div>
                                            </div>
                                            <span className="text-xs text-neutral-400 font-medium">Nov</span>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Sales Team */}
                <div className="space-y-4">
                    {/* Header Labels */}
                    <div className="hidden md:grid grid-cols-[140px_90px_100px_60px_200px] items-center px-4 text-xs font-semibold text-neutral-400 gap-1">
                        <div>Sales</div>
                        <div>Revenue</div>
                        <div>Leads</div>
                        <div>KPI</div>
                        <div>W/L</div>
                    </div>

                    {/* Armin A. Card (Collapsed) */}
                    {/* Armin A. Card (Collapsed) */}
                    {salesData.map((user) => (
                        <div
                            key={user.name}
                            onClick={() => setExpandedUser(user.name)}
                            className={cn(
                                "transition-all cursor-pointer relative overflow-hidden",
                                expandedUser === user.name
                                    ? "bg-gradient-to-r from-blue-50/80 via-purple-50/80 to-pink-50/80 rounded-[24px] py-3 px-4 shadow-sm ring-2 ring-pink-50 hover:ring-pink-100 hover:shadow-lg mb-4"
                                    : "bg-white rounded-[20px] py-3 px-4 shadow-sm gap-1 hover:shadow-md hover:scale-[1.01] mb-2"
                            )}
                        >
                            {expandedUser === user.name ? (
                                <>
                                    {/* Expanded Header Row */}
                                    <div className="flex flex-col md:grid md:grid-cols-[140px_90px_100px_60px_200px] items-start md:items-center relative z-10 mb-5 gap-3 md:gap-1">
                                        <div className="flex items-center gap-3 w-full justify-between md:justify-start">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-[#0EA5E9]">
                                                    <img src={user.image} alt="" className="w-full h-full object-cover" />
                                                </div>
                                                <span className="text-sm font-bold text-neutral-800 whitespace-nowrap">{user.name}</span>
                                            </div>
                                            {/* Mobile Expand Action */}
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setExpandedUser(null);
                                                }}
                                                className="md:hidden w-8 h-8 rounded-full bg-[#E11D48] text-white flex items-center justify-center shadow-md active:scale-95 transition-all"
                                            >
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="m18 15-6-6-6 6" />
                                                </svg>
                                            </button>
                                        </div>

                                        {/* Stats Grid for Mobile */}
                                        <div className="grid grid-cols-1 gap-3 w-full md:hidden mt-2">
                                            <div className="flex items-center justify-between border-b border-neutral-50 pb-2">
                                                <span className="text-[11px] text-neutral-400 font-semibold">Revenue</span>
                                                <div className="font-bold text-sm text-neutral-800">{user.revenue}</div>
                                            </div>
                                            <div className="flex items-center justify-between border-b border-neutral-50 pb-2">
                                                <span className="text-[11px] text-neutral-400 font-semibold">KPI</span>
                                                <div className="font-bold text-sm text-neutral-800">{user.kpi}</div>
                                            </div>
                                            <div className="flex items-center justify-between border-b border-neutral-50 pb-2">
                                                <span className="text-[11px] text-neutral-400 font-semibold">Leads</span>
                                                <div className="flex items-center gap-2">
                                                    <span className="w-7 h-6 rounded-full bg-neutral-800 text-white text-xs font-bold flex items-center justify-center">{user.leads.active}</span>
                                                    <span className="w-9 h-6 rounded-full bg-neutral-100 text-neutral-800 text-xs font-bold flex items-center justify-center">{user.leads.total}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-[11px] text-neutral-400 font-semibold">Win/Loss</span>
                                                <div className="flex items-center gap-1 whitespace-nowrap">
                                                    <span className="text-sm font-bold text-neutral-800">{user.winLoss.rate}</span>
                                                    <span className="w-7 h-6 rounded-full bg-neutral-900 text-white text-xs font-bold flex items-center justify-center">{user.winLoss.win}</span>
                                                    <span className="w-7 h-6 rounded-full bg-white text-neutral-800 text-xs font-bold flex items-center justify-center shadow-sm">{user.winLoss.loss}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Desktop Columns (Hidden on Mobile) */}
                                        <div className="hidden md:block font-bold text-sm text-neutral-800">{user.revenue}</div>
                                        <div className="hidden md:flex items-center gap-2">
                                            <span className="w-7 h-6 rounded-full bg-neutral-800 text-white text-xs font-bold flex items-center justify-center">{user.leads.active}</span>
                                            <span className="w-9 h-6 rounded-full bg-neutral-100 text-neutral-800 text-xs font-bold flex items-center justify-center">{user.leads.total}</span>
                                        </div>
                                        <div className="hidden md:block font-bold text-sm text-neutral-800">{user.kpi}</div>
                                        <div className="hidden md:flex items-center gap-1 whitespace-nowrap">
                                            <span className="text-sm font-bold text-neutral-800">{user.winLoss.rate}</span>
                                            <span className="w-7 h-6 rounded-full bg-neutral-900 text-white text-xs font-bold flex items-center justify-center">{user.winLoss.win}</span>
                                            <span className="w-7 h-6 rounded-full bg-white text-neutral-800 text-xs font-bold flex items-center justify-center shadow-sm">{user.winLoss.loss}</span>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setExpandedUser(null);
                                                }}
                                                className="ml-4 w-6 h-6 rounded-full bg-[#E11D48] text-white flex items-center justify-center shadow-md hover:scale-110 hover:bg-rose-600 active:scale-95 transition-all duration-300"
                                            >
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="m18 15-6-6-6 6" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Expanded Details (Badges & Graph) */}
                                    <div className="flex gap-2 mb-4 relative z-10">
                                        {user.status && (
                                            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-neutral-700 shadow-sm hover:scale-105 cursor-pointer transition-transform">
                                                {user.status}
                                            </span>
                                        )}
                                        <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-neutral-700 shadow-sm hover:scale-105 cursor-pointer transition-transform">
                                            Sales streak 🔥
                                        </span>
                                        <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-neutral-700 shadow-sm hover:scale-105 cursor-pointer transition-transform">
                                            Top review 👍
                                        </span>
                                    </div>

                                    {/* Work with platforms Header */}
                                    <div className="flex items-center justify-between mb-4 relative z-10">
                                        <h4 className="text-sm font-bold text-neutral-800">Work with platforms</h4>
                                        <div className="flex items-center gap-2">
                                            <span className="h-7 px-3 rounded-full bg-[#E11D48] text-white text-xs font-bold flex items-center justify-center shadow-sm">
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                                                    <path d="m18 15-6-6-6 6" />
                                                </svg> 3
                                            </span>
                                            <span className="h-7 px-3 rounded-full bg-[#E11D48] text-white text-xs font-bold flex items-center justify-center shadow-sm">
                                                {user.revenue}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Platforms Grid - Pixel-Perfect Layout */}
                                    <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-4 mb-3 relative z-10">
                                        {/* Left Side: Dribbble (Wide Card) */}
                                        <div className="bg-gradient-to-br h-[142px] from-rose-60 to-white rounded-[28px] p-5 relative overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                                            {/* Diagonal Stripes */}
                                            <div className="absolute right-0 top-0 bottom-0 w-16 opacity-[0.08]">
                                                <div className="w-full h-full bg-[repeating-linear-gradient(45deg,transparent,transparent_6px,#E11D48_6px,#E11D48_12px)]"></div>
                                            </div>
                                            {/* Header */}
                                            <div className="flex items-center gap-2.5 relative z-10">
                                                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm border border-rose-100">
                                                    <svg viewBox="0 0 24 24" fill="none" stroke="#E11D48" strokeWidth="2" className="w-4 h-4">
                                                        <circle cx="12" cy="12" r="10"></circle>
                                                        <path d="M8.5 2.5c3 6 5 9 8 18M3.5 10c7-1 14 1 18 6M6.5 19c2-7 6-12 11-15"></path>
                                                    </svg>
                                                </div>
                                                <span className="text-sm font-semibold text-neutral-500">Dribbble</span>
                                            </div>
                                            {/* Values */}
                                            <div className="relative z-10 mt-6">
                                                <div className="flex items-baseline gap-3">
                                                    <span className="text-[25px] font-semibold text-neutral-600 tracking-tight leading-none">45.3%</span>
                                                    <span className="text-[25px] font-semibold text-neutral-400 tracking-tight leading-none">$71,048</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right Side: Stacked Layout */}
                                        <div className="flex flex-col gap-3">
                                            {/* Top Row: Instagram & Google */}
                                            <div className="grid grid-cols-2 gap-3">
                                                {/* Instagram Card */}
                                                <div className="bg-white h-[98px] rounded-2xl p-2 shadow-sm flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                                                    <div className="flex items-center gap-1 mb-2">
                                                        <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] flex items-center justify-center">
                                                            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-4 h-4">
                                                                <rect x="2" y="2" width="20" height="20" rx="5"></rect>
                                                                <circle cx="12" cy="12" r="4"></circle>
                                                                <circle cx="17.5" cy="6.5" r="1" fill="white"></circle>
                                                            </svg>
                                                        </div>
                                                        <span className="text-xs font-semibold text-neutral-500">Instagram</span>
                                                    </div>
                                                    <div className="flex items-baseline gap-1">
                                                        <span className="text-base font-bold text-neutral-800">28.1%</span>
                                                        <span className="text-xs font-semibold text-neutral-300">$44,072</span>
                                                    </div>
                                                </div>

                                                {/* Parent */}
                                                <div className="items-center">
                                                    <div className="mb-2">
                                                        {/* Google Card */}
                                                        <div className="bg-white h-[55px] rounded-lg p-2 shadow-sm relative overflow-hidden flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                                                            {/* Stripe Pattern */}
                                                            <div className="absolute right-0 top-0 bottom-0 w-30 opacity-[0.04]">
                                                                <div className="w-full h-full bg-[repeating-linear-gradient(45deg,transparent,transparent_4px,#000_4px,#000_8px)]"></div>
                                                            </div>
                                                            {/* Google Header & Value */}
                                                            <div className="flex-1 items-center justify-between relative z-10 mb-3">
                                                                <div className="flex items-center gap-2 mb-2">
                                                                    <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center shadow-sm border border-neutral-100">
                                                                        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5">
                                                                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                                                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                                                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                                                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                                                        </svg>
                                                                    </div>
                                                                    <span className="text-[11px] font-semibold text-neutral-500">Google</span>
                                                                </div>
                                                                <div className="flex items-baseline gap-3">
                                                                    <span className="text-xs font-bold text-neutral-800">14.1%</span>
                                                                    <span className="text-[10px] font-semibold text-neutral-300">$22,114</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        {/* Google Card (Circles) */}
                                                        <div className="bg-white h-[32px] rounded-lg p-2 shadow-sm relative overflow-hidden flex flex-col justify-between hover:shadow-md hover:scale-[1.02] transition-all duration-300 cursor-pointer">
                                                            <div className="flex items-center justify-center relative z-10 h-full gap-1">
                                                                <div className="flex -space-x-1.5">
                                                                    <div className="w-4 h-4 rounded-full bg-neutral-900 border-2 border-white overflow-hidden">
                                                                        <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="" className="w-full h-full object-cover" />
                                                                    </div>
                                                                    <div className="w-4 h-4 rounded-full bg-neutral-500 border-2 border-white overflow-hidden">
                                                                        <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="" className="w-full h-full object-cover" />
                                                                    </div>
                                                                    <div className="w-4 h-4 rounded-full bg-neutral-200 border-2 border-white overflow-hidden">
                                                                        <img src="https://randomuser.me/api/portraits/men/62.jpg" alt="" className="w-full h-full object-cover" />
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-baseline gap-2">
                                                                    <span className="text-[10px] font-bold text-neutral-800">5.4%</span>
                                                                    <span className="text-[10px] font-semibold text-neutral-300">$8,469</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Bottom Row: Other Card (Full Width) */}
                                            <div className="bg-white h-[20px] rounded-[24px] p-4 shadow-sm flex items-center justify-between hover:shadow-md hover:bg-neutral-50 transition-all duration-300 cursor-pointer">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-5 h-5 rounded-lg bg-neutral-100 flex items-center justify-center border border-neutral-200">
                                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-neutral-600">
                                                            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4H6z"></path>
                                                            <line x1="3" y1="6" x2="21" y2="6"></line>
                                                            <path d="M16 10a4 4 0 01-8 0"></path>
                                                        </svg>
                                                    </div>
                                                    <span className="text-xs font-semibold text-neutral-500">Other</span>
                                                </div>
                                                <div className="flex items-baseline gap-3">
                                                    <span className="text-xs font-bold text-neutral-800">7.1%</span>
                                                    <span className="text-[10px] font-semibold text-neutral-400">$11,135</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Sales Dynamic */}
                                    <div className="relative z-10">
                                        <div className="flex justify-between items-center mb-2">
                                            <h4 className="text-sm font-bold text-neutral-700">Sales dynamic</h4>
                                            <button className="text-neutral-400">
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17l9.2-9.2M17 17V7H7" /></svg>
                                            </button>
                                        </div>
                                        {/* Chart */}
                                        <div className="h-20 relative">
                                            {/* Grid Lines/Labels */}
                                            <div className="absolute top-0 left-0 right-0 flex justify-between text-[10px] text-neutral-400 font-medium px-2">
                                                <span>W 1</span>
                                                <span>W 3</span>
                                                <span>W 5</span>
                                                <span>W 7</span>
                                                <span>W 9</span>
                                                <span>W 11</span>
                                            </div>
                                            <div className="absolute inset-0 top-6 flex justify-between px-2 pointer-events-none">
                                                <div className="w-px h-full border-l border-dashed border-neutral-300/50"></div>
                                                <div className="w-px h-full border-l border-dashed border-neutral-300/50"></div>
                                                <div className="w-px h-full border-l border-dashed border-neutral-300/50"></div>
                                                <div className="w-px h-full border-l border-dashed border-neutral-300/50"></div>
                                                <div className="w-px h-full border-l border-dashed border-neutral-300/50"></div>
                                                <div className="w-px h-full border-l border-dashed border-neutral-300/50"></div>
                                            </div>

                                            {/* Chart Path - Simplified Wave */}
                                            <svg className="absolute inset-0 top-6 w-full h-[60px] overflow-visible" preserveAspectRatio="none" viewBox="0 0 400 60">
                                                <path d="M0,50 C20,50 30,40 50,45 C70,50 80,30 100,35 C120,40 130,20 150,25 C170,30 180,45 200,40 C220,35 230,50 250,45 C270,40 280,30 300,35 C320,40 330,25 350,30 C370,35 380,20 400,25" fill="none" stroke="#F43F5E" strokeWidth="2" strokeLinecap="round" />
                                                <path d="M0,50 C20,50 30,42 50,45 C70,50 80,40 100,45 C120,50 130,40 150,45 C170,50 180,52 200,48 C220,45 230,52 250,48 C270,45 280,40 300,45 C320,50 330,40 350,45 C370,50 380,40 400,45" fill="none" stroke="#FDA4AF" strokeWidth="1.5" strokeDasharray="3 3" />
                                            </svg>

                                            {/* Bottom Avatars Track */}
                                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#E11D48] via-[#A3E635] to-[#4ADE80] rounded-full mt-2"></div>

                                            {/* Timeline Avatars */}
                                            <div className="absolute bottom-0 left-[45%] translate-y-2">
                                                <div className="relative">
                                                    <div className="w-6 h-6 rounded-lg bg-[#2563EB] border-2 border-white shadow-sm flex items-center justify-center -rotate-6">
                                                        <span className="text-[10px] font-bold text-white">Bē</span>
                                                    </div>
                                                    <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#E11D48] rounded-full border border-white flex items-center justify-center">
                                                        <svg width="6" height="6" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M18 15l-6-6-6 6" /></svg>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="absolute bottom-0 left-[60%] translate-y-2">
                                                <div className="relative">
                                                    <div className="w-6 h-6 rounded-lg bg-[#E1306C] border-2 border-white shadow-sm flex items-center justify-center rotate-3">
                                                        <svg viewBox="0 0 24 24" fill="white" className="w-3 h-3"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path></svg>
                                                    </div>
                                                    <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-black rounded-full border border-white flex items-center justify-center">
                                                        <svg width="6" height="6" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M6 9l6 6 6-6" /></svg>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="absolute bottom-0 right-[15%] translate-y-2">
                                                <div className="relative">
                                                    <div className="w-6 h-6 rounded-full border-2 border-white shadow-sm overflow-hidden">
                                                        <img src={user.image} alt="" className="w-full h-full object-cover" />
                                                    </div>
                                                    <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#E11D48] rounded-full border border-white flex items-center justify-center">
                                                        <svg width="6" height="6" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M18 15l-6-6-6 6" /></svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                /* Collapsed View */
                                /* Collapsed View */
                                <div className="flex flex-col md:grid md:grid-cols-[140px_90px_100px_60px_200px] items-start md:items-center gap-3 md:gap-0">
                                    <div className="flex items-center gap-3 w-full justify-between md:justify-start">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full overflow-hidden">
                                                <img src={user.image} alt="" className="w-full h-full object-cover" />
                                            </div>
                                            <span className="text-sm font-bold text-neutral-800 whitespace-nowrap">{user.name}</span>
                                        </div>
                                        {/* Mobile Revenue preview */}
                                        <div className="font-bold text-sm text-neutral-800 md:hidden">{user.revenue}</div>
                                    </div>

                                    {/* Desktop Columns */}
                                    <div className="hidden md:block font-bold text-sm">{user.revenue}</div>
                                    <div className="hidden md:flex items-center gap-2">
                                        <span className="w-7 h-6 rounded-full bg-neutral-900 text-white text-xs font-bold flex items-center justify-center">{user.leads.active}</span>
                                        <span className="w-9 h-6 rounded-full bg-neutral-100 text-neutral-800 text-xs font-bold flex items-center justify-center">{user.leads.total}</span>
                                    </div>
                                    <div className="hidden md:block font-bold text-sm text-neutral-800">{user.kpi}</div>
                                    <div className="hidden md:flex items-center gap-2">
                                        <span className="text-sm font-bold text-neutral-800">{user.winLoss.rate}</span>
                                        <span className="w-7 h-6 rounded-full bg-neutral-900 text-white text-xs font-bold flex items-center justify-center">{user.winLoss.win}</span>
                                        <span className="w-7 h-6 rounded-full bg-neutral-100 text-neutral-500 text-xs font-bold flex items-center justify-center">{user.winLoss.loss}</span>
                                    </div>

                                    {/* Mobile Stats Row */}
                                    <div className="flex md:hidden items-center justify-between w-full text-xs text-neutral-500">
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold">Leads:</span>
                                            <span className="font-bold text-neutral-800">{user.leads.total}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold">Win Rate:</span>
                                            <span className="font-bold text-neutral-800">{user.winLoss.rate}</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}

                    {/* Mikasa A. Card (Expanded) */}

                </div>
            </div>
        </div >
    );
}

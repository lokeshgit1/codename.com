"use client";
import Link from "next/link";
import { ArrowLeft, BarChart3, Users, DollarSign, Target, TrendingUp, Activity, PieChart } from "lucide-react";

export default function DetailsPage() {
    const dummyStats = [
        { label: "Total Revenue", value: "$1,234,567", icon: DollarSign, color: "text-blue-600", bg: "bg-blue-50" },
        { label: "Active Users", value: "12,345", icon: Users, color: "text-purple-600", bg: "bg-purple-50" },
        { label: "Conversion Rate", value: "3.2%", icon: Target, color: "text-emerald-600", bg: "bg-emerald-50" },
        { label: "Growth", value: "+12.5%", icon: TrendingUp, color: "text-rose-600", bg: "bg-rose-50" },
    ];

    const weeklyData = [
        { day: "Mon", sales: 120, leads: 40 },
        { day: "Tue", sales: 150, leads: 55 },
        { day: "Wed", sales: 180, leads: 70 },
        { day: "Thu", sales: 140, leads: 45 },
        { day: "Fri", sales: 210, leads: 85 },
        { day: "Sat", sales: 250, leads: 110 },
        { day: "Sun", sales: 190, leads: 60 },
    ];

    return (
        <div className="min-h-screen bg-neutral-50 p-8 font-sans">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6 md:gap-0">
                    <div className="flex items-center gap-4 md:gap-6">
                        <Link
                            href="/dashboard"
                            className="p-3 bg-white rounded-2xl shadow-sm hover:bg-neutral-50 transition-all border border-neutral-100 hover:scale-105 active:scale-95 group"
                        >
                            <ArrowLeft className="w-5 h-5 text-neutral-400 group-hover:text-neutral-600 transition-colors" />
                        </Link>
                        <div className="flex items-center gap-4 md:gap-5">
                            <div className="w-16 h-16 md:w-20 md:h-20 rounded-[24px] md:rounded-[28px] overflow-hidden border-4 border-white shadow-xl rotate-3 hover:rotate-0 transition-transform duration-500 shrink-0">
                                <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&h=200&fit=crop" alt="Armin" className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <div className="flex flex-wrap items-center gap-2 mb-1">
                                    <h1 className="text-2xl md:text-3xl font-black text-neutral-900 tracking-tight">Armin A.</h1>
                                    <span className="bg-emerald-100 text-emerald-600 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter shadow-sm whitespace-nowrap">Active Now</span>
                                </div>
                                <p className="text-neutral-400 text-xs md:text-sm font-medium">Senior Sales Rep • <span className="text-neutral-600">Performance</span></p>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2 w-full md:w-auto overflow-x-auto no-scrollbar">
                        <div className="bg-white p-2 rounded-2xl border border-neutral-100 shadow-sm flex flex-col items-center min-w-[80px] flex-1 md:flex-none">
                            <span className="text-[10px] font-bold text-neutral-400 uppercase">Rank</span>
                            <span className="text-lg font-black text-neutral-800">#01</span>
                        </div>
                        <div className="bg-white p-2 rounded-2xl border border-neutral-100 shadow-sm flex flex-col items-center min-w-[80px] flex-1 md:flex-none">
                            <span className="text-[10px] font-bold text-neutral-400 uppercase">Score</span>
                            <span className="text-lg font-black text-[#E11D48]">9.8</span>
                        </div>
                    </div>
                </div>

                {/* Main Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {dummyStats.map((stat, i) => (
                        <div key={i} className="bg-white p-6 rounded-[24px] shadow-sm border border-neutral-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                            <div className={`p-3 rounded-2xl ${stat.bg}`}>
                                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">{stat.label}</p>
                                <p className="text-xl font-bold text-neutral-900">{stat.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Performance Chart Placeholder */}
                    <div className="lg:col-span-2 bg-white p-6 rounded-[32px] shadow-sm border border-neutral-100">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold text-neutral-800 flex items-center gap-2">
                                <Activity className="w-5 h-5 text-[#E11D48]" />
                                Revenue Growth over Week
                            </h3>
                            <select className="bg-neutral-50 border-none text-xs font-bold text-neutral-600 rounded-lg px-3 py-2 outline-none cursor-pointer">
                                <option>Last 7 Days</option>
                                <option>Last 30 Days</option>
                            </select>
                        </div>

                        <div className="h-64 flex items-end justify-between gap-2 px-4">
                            {weeklyData.map((d, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center gap-3 group">
                                    <div className="w-full relative flex items-end justify-center h-full">
                                        <div
                                            className="w-12 bg-neutral-100 rounded-t-xl transition-all group-hover:bg-neutral-200"
                                            style={{ height: '100%' }}
                                        ></div>
                                        <div
                                            className="w-12 bg-gradient-to-t from-[#E1306C] to-[#F43F5E] rounded-t-xl absolute bottom-0 shadow-lg group-hover:scale-x-105 transition-all"
                                            style={{ height: `${(d.sales / 300) * 100}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-xs font-bold text-neutral-500">{d.day}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Side Info Cards */}
                    <div className="space-y-6">
                        <div className="bg-[#18181B] p-6 rounded-[32px] text-white overflow-hidden relative group">
                            <div className="relative z-10">
                                <h3 className="font-bold text-lg mb-2">Quarterly Goal</h3>
                                <p className="text-neutral-400 text-sm mb-6">You've reached 84% of your monthly target.</p>
                                <div className="h-2 w-full bg-neutral-800 rounded-full mb-4">
                                    <div className="h-full w-[84%] bg-[#E11D48] rounded-full shadow-[0_0_12px_rgba(225,29,72,0.5)]"></div>
                                </div>
                                <div className="flex justify-between text-xs font-bold">
                                    <span>$4.2M / $5M</span>
                                    <span className="text-[#E11D48]">84%</span>
                                </div>
                            </div>
                            <PieChart className="absolute -bottom-8 -right-8 w-32 h-32 text-neutral-800/20 group-hover:scale-110 transition-transform" />
                        </div>

                        <div className="bg-white p-6 rounded-[32px] shadow-sm border border-neutral-100">
                            <h3 className="font-bold text-neutral-800 mb-4 flex items-center gap-2">
                                <BarChart3 className="w-5 h-5 text-purple-600" />
                                Top Platforms
                            </h3>
                            <div className="space-y-4">
                                {[
                                    { name: "Instagram", value: "45%", color: "bg-[#E1306C]" },
                                    { name: "Google Ads", value: "30%", color: "bg-blue-600" },
                                    { name: "Facebook", value: "15%", color: "bg-blue-800" },
                                    { name: "Others", value: "10%", color: "bg-neutral-400" },
                                ].map((p, i) => (
                                    <div key={i} className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-2 h-2 rounded-full ${p.color}`}></div>
                                            <span className="text-xs font-bold text-neutral-700">{p.name}</span>
                                        </div>
                                        <span className="text-xs font-bold text-neutral-500">{p.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

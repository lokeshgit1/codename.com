"use client";

import Avatar from "./Avatar";
import { users } from "@/lib/data";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { ArrowDownRight, ArrowUpRight, ChevronDown, MoreHorizontal, MessageSquare } from "lucide-react";

export default function Table() {
    return (
        <div className="card p-0 overflow-hidden">
            {/* Table Header */}
            <div className="p-5 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold">Sales list</h3>
                </div>
                <div className="flex items-center gap-2">
                    <button className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-neutral-50">
                        <ArrowUpRight className="w-4 h-4 text-neutral-600" />
                    </button>
                    <button className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-neutral-50">
                        <MoreHorizontal className="w-4 h-4 text-neutral-600" />
                    </button>
                </div>
            </div>

            {/* Table Content */}
            <div className="overflow-x-auto">
                <table className="w-full min-w-[600px]">
                    <thead className="bg-neutral-50 text-xs font-semibold text-neutral-500 uppercase tracking-wider text-left">
                        <tr>
                            <th className="px-5 py-3 font-medium">User</th>
                            <th className="px-5 py-3 font-medium">Sales</th>
                            <th className="px-5 py-3 font-medium">Revenue</th>
                            <th className="px-5 py-3 font-medium">Badges</th>
                            <th className="px-5 py-3 font-medium text-right">Leads</th>
                            <th className="px-5 py-3 font-medium text-right">KPI</th>
                            <th className="px-5 py-3 font-medium text-right">Win / Loss</th>
                            <th className="px-5 py-3"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                        {users.map((user, index) => (
                            <tr key={user.id} className="hover:bg-neutral-50/50 transition-colors group">
                                <td className="px-5 py-3">
                                    <div className="flex items-center gap-3">
                                        <div className="relative">
                                            <Avatar name={user.name} size="sm" />
                                            {/* Online status dot */}
                                            {index === 0 && <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>}
                                        </div>
                                        <span className="text-sm font-medium text-neutral-900">{user.name}</span>
                                    </div>
                                </td>
                                <td className="px-5 py-3">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold">{formatNumber(user.sales)}</span>
                                    </div>
                                </td>
                                <td className="px-5 py-3">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold">{formatCurrency(user.revenue)}</span>
                                    </div>
                                </td>
                                <td className="px-5 py-3">
                                    {/* Badges - Custom layout based on row */}
                                    <div className="flex gap-1">
                                        {index === 0 ? (
                                            <>
                                                <span className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2 py-1 text-xs font-medium text-neutral-600">
                                                    👑 Top sales
                                                </span>
                                                <span className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2 py-1 text-xs font-medium text-neutral-600">
                                                    🔥 Streak
                                                </span>
                                            </>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2 py-1 text-xs font-medium text-neutral-600">
                                                👍 Top review
                                            </span>
                                        )}
                                    </div>
                                </td>
                                <td className="px-5 py-3 text-right">
                                    <span className="bg-black text-white text-xs font-bold px-2 py-1 rounded-full">
                                        {user.leads}
                                    </span>
                                </td>
                                <td className="px-5 py-3 text-right">
                                    <span className="bg-neutral-100 text-neutral-600 text-xs font-bold px-2 py-1 rounded-full">
                                        {user.kpi}%
                                    </span>
                                </td>
                                <td className="px-5 py-3 text-right">
                                    <div className="flex justify-end gap-1">
                                        <span className="bg-neutral-100 text-neutral-400 text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
                                            <span className="w-1 h-1 bg-neutral-400 rounded-full"></span> {user.winLoss.win}
                                        </span>
                                        <span className="bg-neutral-100 text-neutral-400 text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
                                            <span className="w-1 h-1 bg-neutral-400 rounded-full"></span> {user.winLoss.loss}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-5 py-3 text-right">
                                    <button className="text-neutral-400 hover:text-neutral-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <MessageSquare className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Footer */}
            <div className="p-4 bg-gradient-to-r from-pink-50 to-white flex justify-between items-center text-xs">
                <div className="flex items-center gap-2">
                    <span className="font-bold text-[#F43F5E]">Work with platforms</span>
                </div>
                <div className="flex items-center gap-4 text-neutral-500">
                    <span>Period: <strong className="text-black">Nov 1 - Nov 30, 2023</strong></span>
                </div>
            </div>
        </div>
    );
}

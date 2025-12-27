import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind CSS classes with proper conflict resolution
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Format number with commas
 */
export function formatNumber(num: number): string {
    return new Intl.NumberFormat("en-US").format(num);
}

/**
 * Format currency
 */
export function formatCurrency(num: number, currency = "USD"): string {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(num);
}

/**
 * Format percentage
 */
export function formatPercentage(num: number, decimals = 1): string {
    return `${num >= 0 ? "+" : ""}${num.toFixed(decimals)}%`;
}

/**
 * Get badge color based on status
 */
export function getBadgeColor(status: string): string {
    const colors: Record<string, string> = {
        active: "bg-accent-green text-white",
        won: "bg-accent-green text-white",
        lost: "bg-accent-red text-white",
        pending: "bg-accent-gray text-white",
        "top sales": "bg-accent-orange text-white",
        "sales streak": "bg-accent-pink text-white",
        "top review": "bg-accent-orange text-white",
    };
    return colors[status.toLowerCase()] || "bg-neutral-200 text-neutral-700";
}

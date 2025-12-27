import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
    title: string;
    value: string | number;
    icon?: LucideIcon;
    change?: number;
    variant?: "default" | "dark" | "gradient";
    className?: string;
}

export default function StatCard({
    title,
    value,
    icon: Icon,
    change,
    variant = "default",
    className,
}: StatCardProps) {
    const variantClasses = {
        default: "bg-card",
        dark: "bg-card-dark text-white",
        gradient: "bg-gradient-to-br from-primary to-primary-dark text-white",
    };

    return (
        <div
            className={cn(
                "rounded-card shadow-card p-5 card-hover",
                variantClasses[variant],
                className
            )}
        >
            <div className="flex items-start justify-between mb-3">
                <h3
                    className={cn(
                        "text-sm font-medium",
                        variant === "default" ? "text-neutral-500" : "text-white/70"
                    )}
                >
                    {title}
                </h3>
                {Icon && (
                    <div
                        className={cn(
                            "p-2 rounded-lg",
                            variant === "default" ? "bg-neutral-50" : "bg-white/10"
                        )}
                    >
                        <Icon className="w-4 h-4" />
                    </div>
                )}
            </div>
            <div className="flex items-end justify-between">
                <p className="text-2xl font-bold">{value}</p>
                {change !== undefined && (
                    <span
                        className={cn(
                            "text-sm font-semibold",
                            change >= 0 ? "text-accent-green" : "text-accent-red"
                        )}
                    >
                        {change >= 0 ? "+" : ""}
                        {change}%
                    </span>
                )}
            </div>
        </div>
    );
}

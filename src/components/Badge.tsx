import { cn, getBadgeColor } from "@/lib/utils";

interface BadgeProps {
    children: React.ReactNode;
    variant?: "green" | "red" | "gray" | "pink" | "orange" | "custom";
    className?: string;
}

export default function Badge({ children, variant = "custom", className }: BadgeProps) {
    const variantClasses = {
        green: "bg-accent-green text-white",
        red: "bg-accent-red text-white",
        gray: "bg-neutral-200 text-neutral-700",
        pink: "bg-primary text-white",
        orange: "bg-accent-orange text-white",
        custom: "",
    };

    return (
        <span
            className={cn(
                "inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium",
                variant !== "custom" && variantClasses[variant],
                className
            )}
        >
            {children}
        </span>
    );
}

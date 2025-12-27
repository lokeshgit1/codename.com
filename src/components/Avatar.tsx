import { cn } from "@/lib/utils";

interface AvatarProps {
    name: string;
    size?: "sm" | "md" | "lg";
    className?: string;
}

export default function Avatar({ name, size = "md", className }: AvatarProps) {
    const initials = name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

    const sizeClasses = {
        sm: "w-6 h-6 text-xs",
        md: "w-8 h-8 text-sm",
        lg: "w-10 h-10 text-base",
    };

    return (
        <div
            className={cn(
                "flex items-center justify-center rounded-full bg-gradient-to-br from-primary/80 to-primary font-semibold text-white",
                sizeClasses[size],
                className
            )}
        >
            {initials}
        </div>
    );
}

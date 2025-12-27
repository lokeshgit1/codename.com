import { cn } from "@/lib/utils";

interface ChartCardProps {
    title: string;
    children: React.ReactNode;
    tabs?: string[];
    filters?: string[];
    className?: string;
}

export default function ChartCard({
    title,
    children,
    tabs,
    filters,
    className,
}: ChartCardProps) {
    return (
        <div className={cn("card p-6", className)}>
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-base font-semibold text-foreground">{title}</h3>
                {tabs && (
                    <div className="flex gap-2">
                        {tabs.map((tab, index) => (
                            <button
                                key={index}
                                className={cn(
                                    "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                                    index === 0
                                        ? "bg-neutral-900 text-white"
                                        : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                                )}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                )}
                {filters && (
                    <div className="flex gap-2">
                        {filters.map((filter, index) => (
                            <button
                                key={index}
                                className="px-3 py-1.5 rounded-lg text-sm font-medium bg-neutral-100 text-neutral-600 hover:bg-neutral-200 transition-colors"
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                )}
            </div>
            <div>{children}</div>
        </div>
    );
}

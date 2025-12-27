import { cn, formatCurrency, formatPercentage } from "@/lib/utils";
import Avatar from "./Avatar";
import Badge from "./Badge";

interface RevenueCardProps {
    currentRevenue: number;
    previousRevenue: number;
    percentage: number;
    dateRange: string;
    topUser: {
        name: string;
        avatar: string;
        amount: number;
        percentage: number;
    };
    className?: string;
}

export default function RevenueCard({
    currentRevenue,
    previousRevenue,
    percentage,
    dateRange,
    topUser,
    className,
}: RevenueCardProps) {
    const formatRevenueWithDecimals = (amount: number) => {
        const strAmount = amount.toFixed(2);
        const [whole, decimals] = strAmount.split(".");
        // Simple manual formatting without locale
        const parts = whole.split("").reverse();
        const formatted = [];
        for (let i = 0; i < parts.length; i++) {
            if (i > 0 && i % 3 === 0) formatted.push(",");
            formatted.push(parts[i]);
        }
        return { whole: formatted.reverse().join(""), decimals };
    };

    const { whole: currentWhole, decimals: currentDecimals } = formatRevenueWithDecimals(currentRevenue);

    return (
        <div className={cn("card p-6", className)}>
            <h2 className="text-sm font-medium text-neutral-500 mb-4">Revenue</h2>
            <div className="flex items-baseline gap-2 mb-1">
                <h1 className="text-5xl font-bold text-foreground">
                    ${currentWhole}
                    <span className="text-neutral-300">.{currentDecimals}</span>
                </h1>
                <Badge variant="pink" className="text-xs px-2 py-1">
                    {formatPercentage(percentage, 1)}
                </Badge>
                <Badge variant="pink" className="text-xs px-2 py-1">
                    $27,235.03
                </Badge>
            </div>
            <p className="text-xs text-neutral-400 mb-6">{dateRange}</p>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <Avatar name={topUser.avatar} size="sm" />
                    <div>
                        <div className="text-xs font-semibold text-neutral-800" suppressHydrationWarning>
                            ${topUser.amount.toLocaleString("en-US")}
                        </div>
                        <div className="text-xs text-neutral-400">
                            {topUser.percentage.toFixed(2)}%
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Avatar name="U" size="sm" />
                    <div>
                        <div className="text-xs font-semibold text-neutral-800">
                            $156,841
                        </div>
                        <div className="text-xs text-neutral-400">
                            29.65%
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

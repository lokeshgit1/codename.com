export interface User {
    id: string;
    name: string;
    avatar: string;
    sales: number;
    revenue: number;
    leads: number;
    kpi: number;
    winLoss: number;
    badges: string[];
}

export interface Platform {
    name: string;
    icon: string;
    revenue: number;
    percentage: number;
}

export interface ChartDataPoint {
    date: string;
    value: number;
    label?: string;
}

export const users: User[] = [
    {
        id: "1",
        name: "Armin A.",
        avatar: "AA",
        sales: 208933,
        revenue: 118,
        leads: 0.84,
        kpi: 31,
        winLoss: 29,
        badges: [],
    },
    {
        id: "2",
        name: "Mikasa A.",
        avatar: "MA",
        sales: 156841,
        revenue: 103,
        leads: 0.89,
        kpi: 39,
        winLoss: 33,
        badges: ["Top sales", "Sales streak", "Top review"],
    },
    {
        id: "3",
        name: "Eren Y.",
        avatar: "EY",
        sales: 117115,
        revenue: 84,
        leads: 0.79,
        kpi: 32,
        winLoss: 15,
        badges: [],
    },
];

export const platforms: Platform[] = [
    {
        name: "Dribbble",
        icon: "dribbble",
        revenue: 227459,
        percentage: 43,
    },
    {
        name: "Instagram",
        icon: "instagram",
        revenue: 142823,
        percentage: 27,
    },
    {
        name: "Behance",
        icon: "behance",
        revenue: 89935,
        percentage: 11,
    },
    {
        name: "Google",
        icon: "google",
        revenue: 37029,
        percentage: 7,
    },
];

export const revenueData = {
    current: 528976,
    previous: 950141.79,
    percentage: 7.9,
    topUser: {
        name: "Mikasa",
        avatar: "MA",
        amount: 208833,
        percentage: 30.63,
    },
    secondUser: {
        name: "User",
        avatar: "U",
        amount: 156841,
        percentage: 29.65,
    },
};

export const kpiData = {
    topSales: {
        value: 72,
        user: "Mikasa",
        avatar: "MA",
        rating: 5,
    },
    bestDeal: {
        value: "$42,300",
        company: "Rolt Inc.",
        rating: 5,
    },
    deals: {
        value: 768,
        change: 7.9,
    },
    value: {
        value: "228k",
        change: 1.2,
    },
    winRate: {
        value: "88%",
        change: 1.2,
    },
};

export const platformRevenueChart: ChartDataPoint[] = [
    { date: "Mon", value: 11048 },
    { date: "Tue", value: 10000 },
    { date: "Wed", value: 11628, label: "$11,628" },
    { date: "Thu", value: 9500 },
    { date: "Fri", value: 8388, label: "$8,388" },
    { date: "Sat", value: 7000 },
    { date: "Sun", value: 6500 },
];

export const salesDynamicChart: ChartDataPoint[] = [
    { date: "Jan", value: 45.3 },
    { date: "Feb", value: 52.1 },
    { date: "Mar", value: 48.7 },
    { date: "Apr", value: 55.2 },
    { date: "May", value: 51.8 },
    { date: "Jun", value: 58.4 },
    { date: "Jul", value: 62.1 },
    { date: "Aug", value: 59.3 },
    { date: "Sep", value: 65.7 },
    { date: "Oct", value: 71.0 },
];

export const workPlatforms = [
    {
        name: "Dribbble",
        percentage: 23,
        amount: 196841,
    },
    {
        name: "Instagram",
        percentage: null,
        amount: null,
    },
    {
        name: "Google",
        percentage: 14.1,
        amount: 127162,
    },
    {
        name: "Other",
        percentage: null,
        amount: null,
    },
];

export const otherMetrics = [
    { label: "2B.1%", value: 141173 },
    { label: "38.7%", value: 141473 },
    { label: "5.4%", value: 80169 },
    { label: "7.1%", value: 111138 },
];

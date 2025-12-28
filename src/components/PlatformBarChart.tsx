"use client";

import { motion } from "framer-motion";

const DATA = {
    revenue: {
        sep: [
            { v: "$7,200", h: 70, isPattern: true, isHigh: true },
            { v: "$3,900", h: 36, isPattern: false, isHigh: false },
            { v: "$2,335", h: 32, isPattern: true, isHigh: false }
        ],
        oct: [
            { v: "$11,245", h: 128, isPattern: true, isHigh: true },
            { v: "$7,500", h: 80, isPattern: false, isHigh: false },
            { v: "$4,500", h: 56, isPattern: true, isHigh: false }
        ],
        nov: [
            { v: "$5,500", h: 64, isPattern: true, isHigh: false },
            { v: "$10,000", h: 112, isPattern: false, isHigh: true },
            { v: "$6,900", h: 72, isPattern: true, isHigh: false }
        ]
    },
    leads: {
        sep: [
            { v: "150", h: 50, isPattern: true, isHigh: true },
            { v: "80", h: 30, isPattern: false, isHigh: false },
            { v: "60", h: 25, isPattern: true, isHigh: false }
        ],
        oct: [
            { v: "280", h: 90, isPattern: true, isHigh: true },
            { v: "190", h: 60, isPattern: false, isHigh: false },
            { v: "120", h: 40, isPattern: true, isHigh: false }
        ],
        nov: [
            { v: "140", h: 45, isPattern: true, isHigh: false },
            { v: "250", h: 85, isPattern: false, isHigh: true },
            { v: "180", h: 60, isPattern: true, isHigh: false }
        ]
    },
    wl: {
        sep: [
            { v: "45%", h: 60, isPattern: true, isHigh: true },
            { v: "20%", h: 30, isPattern: false, isHigh: false },
            { v: "15%", h: 25, isPattern: true, isHigh: false }
        ],
        oct: [
            { v: "75%", h: 100, isPattern: true, isHigh: true },
            { v: "50%", h: 70, isPattern: false, isHigh: false },
            { v: "30%", h: 40, isPattern: true, isHigh: false }
        ],
        nov: [
            { v: "40%", h: 55, isPattern: true, isHigh: false },
            { v: "65%", h: 90, isPattern: false, isHigh: true },
            { v: "45%", h: 65, isPattern: true, isHigh: false }
        ]
    }
};

export default function PlatformBarChart({ activeMetric = "revenue" }: { activeMetric?: "revenue" | "leads" | "wl" }) {
    const parentVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2, // Stagger bars by 0.2s
            },
        },
    };

    const currentData = DATA[activeMetric] || DATA.revenue;

    const renderGroup = (bars: any[], delay: number) => (
        <motion.div
            className="flex items-end gap-0.5 relative"
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
            {bars.map((bar: any, index: number) => (
                <div key={index} className="relative group/bar w-4 sm:w-7 flex items-end justify-center">
                    <motion.span
                        className={`absolute bottom-full mb-1 left-1/2 -translate-x-1/2 text-[9px] font-bold text-white bg-[#E11D48] px-1.5 py-0.5 rounded-md whitespace-nowrap shadow-sm z-10 transition-all duration-300 ${bar.isHigh
                            ? "opacity-100"
                            : "opacity-0 group-hover/bar:opacity-100 translate-y-2 group-hover/bar:translate-y-0"
                            } pointer-events-none`}
                        initial={false}
                        animate={{ opacity: bar.isHigh ? 1 : undefined, y: bar.isHigh ? 0 : undefined }}
                    >
                        {bar.v}
                    </motion.span>
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: bar.h }}
                        whileHover={{ scale: 1.1, y: -4, transition: { type: "spring", stiffness: 400, damping: 10 } }}
                        transition={{ type: "spring", stiffness: 100, damping: 15 }}
                        className={`w-4 sm:w-7 rounded-t-[4px] relative overflow-hidden cursor-pointer transition-colors ${bar.isPattern
                            ? "bg-[#E5E5E5] group-hover/bar:opacity-90"
                            : "bg-[#D4D4D4] hover:bg-[#B0B0B0]"
                            }`}
                    >
                        {bar.isPattern && (
                            <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_25%,rgba(0,0,0,0.2)_25%,rgba(0,0,0,0.2)_50%,transparent_50%,transparent_75%,rgba(0,0,0,0.2)_75%,rgba(0,0,0,0.2)_100%)] bg-[length:6px_6px]"></div>
                        )}
                    </motion.div>
                </div>
            ))}
        </motion.div>
    );

    return (
        <motion.div
            className="absolute left-[35px] right-0 sm:left-0 sm:right-12 top-0 bottom-12 sm:bottom-10 flex items-end justify-around"
            variants={parentVariants}
            initial="hidden"
            animate="visible"
        >
            {renderGroup(currentData.sep, 0.5)}
            {renderGroup(currentData.oct, 0.7)}
            {renderGroup(currentData.nov, 0.9)}
        </motion.div>
    );
}

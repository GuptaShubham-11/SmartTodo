import { memo, useCallback } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, useSpring } from "framer-motion";
import { Move, Users, Clock, BarChart2 } from "lucide-react";
import { useRef, useState, useMemo } from "react";
import { FeatureCard } from "./FeatureCard";
import { type Item } from "./FeatureCard";

const FEATURES: Item[] = [
    {
        title: "Drag & Drop",
        subtitle: "Visual workflow",
        headline: { normal: "Move work", highlight: "naturally" },
        description: "Drag tasks between columns to keep work organized and moving.",
        icon: <Move size={22} />,
        color: "#f59e0b",
        tags: ["Easy reordering", "Kanban boards"],
    },
    {
        title: "Realtime Sync",
        subtitle: "Team collaboration",
        headline: { normal: "Everyone stays", highlight: "in sync" },
        description: "Updates appear instantly for everyone, without refreshing the page.",
        icon: <Users size={22} />,
        color: "#6c63ff",
        tags: ["Live updates", "No manual refresh"],
    },
    {
        title: "Smart Priorities",
        subtitle: "Focus first",
        headline: { normal: "See what", highlight: "matters most" },
        description: "Important tasks stand out clearly, even on busy boards.",
        icon: <Clock size={22} />,
        color: "#10b981",
        tags: ["Clear priorities", "Reduced clutter"],
    },
    {
        title: "Flow Analytics",
        subtitle: "Work insights",
        headline: { normal: "Understand", highlight: "progress" },
        description: "See how tasks move through your board and where work slows down.",
        icon: <BarChart2 size={22} />,
        color: "#d5265b",
        tags: ["Cycle time", "Bottleneck insights"],
    },
];

export const Feature = memo(() => {
    const ref = useRef<HTMLDivElement>(null);
    const [index, setIndex] = useState(0);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start center", "end center"],
    });

    const progress = useTransform(scrollYProgress, [0.15, 0.85], [0, FEATURES.length - 1]);

    // Memoized index setter for better performance
    const handleIndexChange = useCallback((v: number) => {
        const i = Math.round(v);
        if (FEATURES[i] && i !== index) {
            setIndex(i);
        }
    }, [index]);

    useMotionValueEvent(progress, "change", handleIndexChange);

    const railProgress = useTransform(scrollYProgress, [0.15, 0.85], [0, 1]);
    const smoothRail = useSpring(railProgress, {
        stiffness: 120,
        damping: 20,
        mass: 0.8,
    });

    const top = useTransform(smoothRail, [0, 1], ["0%", "100%"]);
    const current = useMemo(() => FEATURES[index], [index]);

    return (
        <section
            ref={ref}
            className=" sticky top-0 flex items-center justify-center bg-background text-text px-6 py-16 max-w-6xl mx-auto"
        >
            {/* Progress Rail */}
            <div className="absolute right-6 top-1/2 hidden h-40 -translate-y-1/2 md:block">
                <div className="relative h-full w-px bg-white/10" role="progressbar" aria-valuenow={index} aria-valuemin={0} aria-valuemax={FEATURES.length - 1}>
                    <motion.div
                        className="absolute left-1/2 h-3 w-3 -translate-x-1/2 rounded-full shadow-lg"
                        style={{
                            backgroundColor: current.color,
                            top,
                        }}
                        transition={{ ease: "easeInOut", duration: 0.5 }}
                        aria-label={`Feature ${index + 1} of ${FEATURES.length}`}
                    />
                </div>
            </div>

            <FeatureCard current={current} />
        </section>
    );
});

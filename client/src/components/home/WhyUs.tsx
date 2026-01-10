import { memo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const WhyUs = memo(() => {
    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start center", "end center"],
    });

    const expectationOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
    const realityOpacity = useTransform(scrollYProgress, [0.35, 0.7], [0, 1]);
    const expectationY = useTransform(scrollYProgress, [0, 0.4], [0, -20]);
    const realityY = useTransform(scrollYProgress, [0.35, 0.7], [20, 0]);

    // Memoize reality list items to prevent re-creation
    const realityItems = [
        "Syncs changes instantly",
        "Feels natural from the interaction",
        "Adapts to how your team already works",
        "Keeps focus without noise",
    ];

    return (
        <section
            ref={ref}
            className="sticky top-0 z-20 flex items-center justify-center bg-background px-6 py-16 max-w-6xl mx-auto text-text"
            role="region"
            aria-label="Why choose SmartTodo"
        >
            <div className="relative w-full max-w-xl">
                {/* EXPECTATION */}
                <motion.div
                    style={{ opacity: expectationOpacity, y: expectationY }}
                    className="absolute inset-0"
                    role="img"
                    aria-hidden="true"
                >
                    <p className="mb-2 text-sm tracking-wide text-secondary/60" role="status">
                        Expectation
                    </p>
                    <h3 className="mb-2 text-2xl font-medium tracking-tight text-text" role="heading" aria-level={3}>
                        Task tools should be…
                    </h3>
                    <ul className="space-y-2 text-lg text-secondary/80 ml-4" role="list">
                        <li>Simple to understand</li>
                        <li>Flexible enough for any workflow</li>
                        <li>Easy to use with a team</li>
                        <li>Clean and distraction-free</li>
                    </ul>
                </motion.div>

                {/* REALITY */}
                <motion.div
                    style={{ opacity: realityOpacity, y: realityY }}
                    className="relative"
                    role="complementary"
                >
                    <p className="mb-2 text-sm tracking-wide text-secondary/60" role="status">
                        Reality
                    </p>
                    <h3 className="mb-2 text-2xl font-medium tracking-tight text-text" role="heading" aria-level={3}>
                        Smart Todo actually…
                    </h3>
                    <ul className="space-y-2 text-lg text-secondary/80 ml-4" role="list">
                        {realityItems.map((text, index) => (
                            <li key={`${text}-${index}`} className="flex items-start gap-3" role="listitem">
                                <span className="text-[#10b981] flex-shrink-0 mt-0.5" aria-hidden="true">✓</span>
                                <span className="text-secondary/80">{text}</span>
                            </li>
                        ))}
                    </ul>
                </motion.div>
            </div>
        </section>
    );
});

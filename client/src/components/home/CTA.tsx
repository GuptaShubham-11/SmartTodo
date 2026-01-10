import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

export const CTA = memo(() => {
    const navigate = useNavigate();

    const handleDemo = () => navigate("/demo");
    const handleSignUp = () => navigate('/signup');

    // Memoize reassurance items
    const reassuranceItems = [
        "No credit card required",
        "Free forever for small teams",
        "Setup in under minutes"
    ];

    return (
        <motion.section
            id="cta"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="relative bg-surface px-6 py-16 text-text max-w-6xl mx-auto text-center"
            role="region"
            aria-label="Get started with SmartTodo"
        >
            {/* Headline */}
            <h2 className="mb-4 text-3xl font-semibold tracking-tight sm:text-4xl" role="heading" aria-level={2}>
                Ready to see if <span className="text-primary">Smart Todo</span> fits your team?
            </h2>

            {/* Supporting copy */}
            <p className="mx-auto mb-4 max-w-2xl text-sm text-secondary/70 sm:text-base" role="status">
                Start with a free board, invite your team, and experience a calmer way
                to manage work — no setup headaches.
            </p>

            {/* CTA Actions */}
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                {/* Secondary CTA */}
                <button
                    type="button"
                    onClick={handleDemo}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-surface px-7 py-3 text-sm text-text transition-colors hover:border-white/30"
                    aria-label="Watch 90-second demo"
                >
                    <Play className="h-4 w-4 text-secondary/70 shrink-0" />
                    Watch 90-sec demo
                </button>

                {/* Primary CTA */}
                <button
                    type="button"
                    onClick={handleSignUp}
                    className="inline-flex items-center gap-2 rounded-full border-t border-t-neutral-700 bg-accent px-4 py-2 text-sm text-white transition-colors hover:bg-[#554de3] font-semibold cursor-pointer"
                    aria-label="Try Smart Todo free trial"
                >
                    Try Smart Todo Free
                </button>
            </div>

            {/* Reassurance */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-secondary/60" role="list">
                {reassuranceItems.map((text, index) => (
                    <span key={`${text}-${index}`} className="flex items-center gap-1" role="listitem">
                        <span className="text-[#10b981] shrink-0" aria-hidden="true">✓</span>
                        {text}
                    </span>
                ))}
            </div>
        </motion.section>
    );
});

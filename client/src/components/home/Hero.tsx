import { memo } from "react";
import { Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Hero = memo(() => {
    const navigate = useNavigate();

    const handleDemo = () => navigate("/demo");
    const handleSignUp = () => navigate("/signup");

    return (
        <section className="flex flex-col items-center justify-center gap-6 bg-linear-to-br from-[#1c1c1e] to-surface px-6 py-16 max-w-6xl mx-auto">
            <div className="js-fade-in flex flex-1 flex-col items-center text-center">
                <h1 className="mb-4 flex min-w-full flex-col items-center justify-center text-balance text-3xl font-semibold leading-tight tracking-tight md:items-start md:text-5xl">
                    <span className="mb-1">
                        <span className="bg-primary px-1 text-surface">Smart Todo</span>{' '}
                        for Modern Team&apos;s
                    </span>
                    <span>
                        Work Using{' '}
                        <span className="bg-accent px-1 text-surface">Kanban</span> Technique
                    </span>
                </h1>

                <p className="mb-6 max-w-xl text-base text-secondary md:text-lg">
                    Streamline Your Workflow, Collaborate{' '}
                    <span className="bg-[#d5265b] px-1">Real-Time</span> and
                    Effectively.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3">
                    <button
                        type="button"
                        onClick={handleDemo}
                        className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-surface px-7 py-3 text-sm text-text transition-colors hover:border-white/30"
                        aria-label="Watch 90-second demo"
                    >
                        <Play className="h-4 w-4 text-secondary/70 shrink-0" />
                        Watch 90-sec demo
                    </button>

                    <button
                        type="button"
                        onClick={handleSignUp}
                        className="inline-flex items-center gap-2 rounded-full border-t border-t-neutral-700 bg-accent px-4 py-2 text-sm text-white transition-colors hover:bg-[#554de3] font-semibold cursor-pointer"
                        aria-label="Try Smart Todo free trial"
                    >
                        Try Smart Todo Free
                    </button>
                </div>
            </div>

            <img
                src="./KanbanBoard.svg"
                alt="Modern Kanban Board visualization"
                className="max-w-xs drop-shadow-2xl md:max-w-lg"
                loading="lazy"
                onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                }}
            />
        </section>
    );
});

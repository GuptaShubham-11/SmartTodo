import { memo } from "react";
import { useNavigate } from "react-router-dom";

export const Header = memo(() => {
    const navigate = useNavigate();

    const handleSignIn = () => navigate('/signin');
    const handleSignUp = () => navigate('/signup');
    const handleHome = () => navigate('/');

    return (
        <section className="w-full bg-surface">
            <header className="flex items-center justify-between bg-surface px-6 py-4 backdrop-blur-sm max-w-6xl mx-auto">
                <h3 onClick={handleHome} className="text-lg font-semibold flex items-center gap-1 bg-primary w-fit px-2 py-0.5 sm:px-4 text-background cursor-pointer">
                    <img
                        src="/brand.png"
                        alt="SmartTodo"
                        className="size-6"
                        loading="lazy"
                        onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                        }}
                    />
                    <span className="hidden sm:block">SmartTodo</span>
                </h3>

                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={handleSignIn}
                        className="inline-flex items-center gap-1 rounded-full border border-secondary px-4 py-2 text-sm font-semibold text-secondary transition-colors hover:bg-secondary/10 cursor-pointer"
                        aria-label="Sign in to your account"
                    >
                        Sign In
                    </button>

                    <button
                        type="button"
                        onClick={handleSignUp}
                        className="inline-flex items-center gap-1 rounded-full border-t border-t-neutral-700 bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#554de3] cursor-pointer"
                        aria-label="Get started with SmartTodo"
                    >
                        Get Started
                    </button>
                </div>
            </header>
        </section>
    );
});

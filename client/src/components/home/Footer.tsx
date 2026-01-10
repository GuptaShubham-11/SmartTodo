import { Twitter, Linkedin, Github } from "lucide-react";

export const Footer = () => {
    return (
        <footer className="bg-background text-secondary">
            {/* Top Divider */}
            <div className="h-px w-full bg-white/10" />

            <div className="mx-auto max-w-6xl px-6 py-20">
                {/* Brand */}
                <div className="md:col-span-2 visible sm:hidden">
                    <h3 className="text-lg font-semibold flex items-center gap-1 bg-primary w-fit px-4 text-background">
                        <img src="/brand.png" alt="SmartTodo" className="size-6" />
                        SmartTodo
                    </h3>
                    <p className=" mt-1 max-w-xs text-sm text-secondary/60">
                        A calm, flexible task management tool designed for modern teams
                        who value clarity and focus.
                    </p>
                </div>
                {/* Main Grid */}
                <div className="mt-4 grid gap-6 grid-cols-2 md:grid-cols-6">

                    {/* Brand */}
                    <div className="md:col-span-2 hidden sm:block sm:visible">
                        <h3 className="text-lg font-semibold flex items-center gap-1 bg-primary w-fit px-4 text-background">
                            <img src="/brand.png" alt="SmartTodo" className="size-6" />
                            SmartTodo
                        </h3>
                        <p className=" mt-1 max-w-xs text-sm text-secondary/60">
                            A calm, flexible task management tool designed for modern teams
                            who value clarity and focus.
                        </p>
                    </div>

                    {/* Product */}
                    <div>
                        <h4 className="mb-2 text-md font-semibold text-text">Product</h4>
                        <ul className="space-y-2 text-sm  text-secondary/60">
                            <li><a href="#" className="hover:text-secondary">Features</a></li>
                            <li><a href="#" className="hover:text-secondary">Pricing</a></li>
                            <li><a href="#" className="hover:text-secondary">Integrations</a></li>
                            <li><a href="#" className="hover:text-secondary">Roadmap</a></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-md mb-2 font-semibold text-text">Company</h4>
                        <ul className="space-y-2 text-sm text-secondary/60">
                            <li><a href="#" className="hover:text-secondary">About</a></li>
                            <li><a href="#" className="hover:text-secondary">Blog</a></li>
                            <li><a href="#" className="hover:text-secondary">Careers</a></li>
                            <li><a href="#" className="hover:text-secondary">Press</a></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="text-md mb-2 font-semibold text-text">Resources</h4>
                        <ul className="space-y-2 text-sm text-secondary/60">
                            <li><a href="#" className="hover:text-secondary">Help Center</a></li>
                            <li><a href="#" className="hover:text-secondary">API Docs</a></li>
                            <li><a href="#" className="hover:text-secondary">Status</a></li>
                            <li><a href="#" className="hover:text-secondary">Changelog</a></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="text-md mb-2 font-semibold text-text">Legal</h4>
                        <ul className="space-y-2 text-sm text-secondary/60">
                            <li><a href="#" className="hover:text-secondary">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-secondary">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-secondary">Security</a></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-6 sm:flex-row">
                    <p className="text-sm text-secondary/60 hover:text-text">
                        © 2025 SmartTodo. All rights reserved.
                    </p>

                    <div className="flex items-center gap-4">
                        <a
                            href="https://x.com/GuptaShubham91"
                            className="text-secondary/70 transition-colors hover:text-secondary"
                            aria-label="Twitter"
                        >
                            <Twitter size={18} />
                        </a>
                        <a
                            href="https://www.linkedin.com/"
                            className="text-secondary/70 transition-colors hover:text-secondary"
                            aria-label="LinkedIn"
                        >
                            <Linkedin size={18} />
                        </a>
                        <a
                            href="https://github.com/GuptaShubham-11"
                            className="text-secondary/70 transition-colors hover:text-secondary"
                            aria-label="GitHub"
                        >
                            <Github size={18} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

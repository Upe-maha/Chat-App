import Link from "next/link";
import { Twitter, Github } from "lucide-react";
import Brand from "@/components/shared/Brand";

export default function Footer() {
    return (
        <footer className="border-t border-border bg-background">
            <div className="mx-auto max-w-6xl px-4 py-14">
                <div className="grid gap-10 md:grid-cols-5">
                    <div className="md:col-span-2">
                        <Brand />
                        <p className="mt-3 max-w-sm text-sm text-muted-foreground">
                            The intelligent communication layer for modern teams — secure,
                            real-time, and built for clarity.
                        </p>
                    </div>

                    <div>
                        <p className="text-sm font-semibold text-foreground">Product</p>
                        <div className="mt-3 flex flex-col gap-2">
                            <Link
                                className="text-sm text-muted-foreground hover:text-foreground"
                                href="#features"
                            >
                                Features
                            </Link>
                            <Link
                                className="text-sm text-muted-foreground hover:text-foreground"
                                href="#pricing"
                            >
                                Pricing
                            </Link>
                            <Link
                                className="text-sm text-muted-foreground hover:text-foreground"
                                href="#solutions"
                            >
                                Mobile App
                            </Link>
                        </div>
                    </div>

                    <div>
                        <p className="text-sm font-semibold text-foreground">Company</p>
                        <div className="mt-3 flex flex-col gap-2">
                            <Link
                                className="text-sm text-muted-foreground hover:text-foreground"
                                href="#"
                            >
                                About
                            </Link>
                            <Link
                                className="text-sm text-muted-foreground hover:text-foreground"
                                href="#"
                            >
                                Careers
                            </Link>
                            <Link
                                className="text-sm text-muted-foreground hover:text-foreground"
                                href="#"
                            >
                                Blog
                            </Link>
                        </div>
                    </div>

                    <div>
                        <p className="text-sm font-semibold text-foreground">Social</p>
                        <div className="mt-3 flex items-center gap-4">
                            <Link
                                href="https://twitter.com"
                                target="_blank"
                                className="text-muted-foreground hover:text-foreground transition-colors"
                                aria-label="Twitter"
                            >
                                <Twitter className="h-5 w-5" />
                            </Link>
                            <Link
                                href="https://github.com"
                                target="_blank"
                                className="text-muted-foreground hover:text-foreground transition-colors"
                                aria-label="GitHub"
                            >
                                <Github className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
                    <span>© {new Date().getFullYear()} HateaChat</span>
                    <div className="flex gap-4">
                        <Link href="/privacy" className="hover:text-foreground">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="hover:text-foreground">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
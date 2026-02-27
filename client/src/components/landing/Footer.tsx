import Link from "next/link";
import { MessageSquare, Twitter, Github } from "lucide-react";

export default function Footer() {
    return (
        <footer className="py-8 bg-white border-t border-border">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* Logo & Copyright */}
                    <div className="flex items-center gap-4">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                                <MessageSquare className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-foreground">Vibe</span>
                        </Link>
                        <span className="text-sm text-muted-foreground">
                            © 2023 Vibe Communications Inc.
                        </span>
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-6">
                        <Link
                            href="/privacy"
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            href="/terms"
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Terms of Service
                        </Link>
                        <Link
                            href="/support"
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Support
                        </Link>
                    </div>

                    {/* Social Links */}
                    <div className="flex items-center gap-4">
                        <Link
                            href="https://twitter.com"
                            target="_blank"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <Twitter className="w-5 h-5" />
                        </Link>
                        <Link
                            href="https://github.com"
                            target="_blank"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <Github className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { MessageSquare, Menu, X, ArrowRight } from "lucide-react";

const navLinks = [
    { href: "#features", label: "Features" },
    { href: "#pricing", label: "Pricing" },
    { href: "/login", label: "Login" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        // Cleanup on unmount
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    // Close menu on route change or escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsOpen(false);
        };

        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, []);

    return (
        <>
            <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
                <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                            <MessageSquare className="h-4 w-4 text-primary-foreground" />
                        </span>
                        <span className="text-lg font-bold text-foreground">Vibe</span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden items-center gap-8 text-sm md:flex">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-muted-foreground transition-colors hover:text-foreground"
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link
                            href="/register"
                            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                        >
                            Get Started
                        </Link>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(true)}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary md:hidden"
                        aria-label="Open menu"
                    >
                        <Menu className="h-5 w-5" />
                    </button>
                </div>
            </header>

            {/* Mobile Full-Screen Menu */}
            <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </>
    );
}

function MobileMenu({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 z-60 bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"
                    }`}
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Slide-in Panel (Right Side) */}
            <div
                className={`fixed right-0 top-0 z-60 h-full w-[70%] max-w-sm transform bg-background shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="flex h-full flex-col">
                    {/* Header */}
                    <div className="flex h-16 items-center justify-between border-b border-border px-4">
                        <Link
                            href="/"
                            onClick={onClose}
                            className="flex items-center gap-2"
                        >
                            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                                <MessageSquare className="h-4 w-4 text-primary-foreground" />
                            </span>
                            <span className="text-lg font-bold text-foreground">Vibe</span>
                        </Link>
                        <button
                            onClick={onClose}
                            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary"
                            aria-label="Close menu"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* User Section (Optional - like your image) */}
                    <div className="border-b border-border px-6 py-6">
                        <div className="flex items-center gap-4">
                            <div className="h-14 w-14 overflow-hidden rounded-full bg-gradient-to-br from-primary to-secondary">
                                {/* Placeholder avatar - replace with user image */}
                                <div className="flex h-full w-full items-center justify-center text-lg font-bold text-white">
                                    G
                                </div>
                            </div>
                            <div>
                                <p className="font-semibold text-foreground">Guest User</p>
                                <p className="text-sm text-muted-foreground">
                                    Sign in to continue
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex-1 px-4 py-6">
                        <ul className="space-y-2">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        onClick={onClose}
                                        className="flex h-12 items-center rounded-lg px-4 text-base font-medium text-foreground transition-colors hover:bg-secondary"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Bottom CTA */}
                    <div className="border-t border-border p-4">
                        <Link
                            href="/register"
                            onClick={onClose}
                            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                        >
                            Get Started
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                        <p className="mt-3 text-center text-xs text-muted-foreground">
                            Free 14-day trial. No credit card required.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
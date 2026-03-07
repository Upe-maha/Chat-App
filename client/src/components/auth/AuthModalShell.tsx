"use client";

import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Github, X } from "lucide-react";
import GoogleIcon from "@/components/shared/GoogleIcon";
import Brand from "@/components/shared/Brand";

export default function AuthModalShell({
    title,
    description,
    children,
    footer,
    showSocial = true,
}: {
    title: string;
    description?: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
    showSocial?: boolean;
}) {
    const router = useRouter();

    const close = useCallback(() => {
        if (typeof window !== "undefined" && window.history.length > 1) {
            router.back(); // click backdrop => go back
            return;
        }
        router.push("/");
    }, [router]);

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") close();
        };

        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, [close]);

    return (
        <div
            className="fixed inset-0 z-50 bg-background/40 backdrop-blur-sm"
            onPointerDown={close}
            role="dialog"
            aria-modal="true"
        >
            <div className="flex min-h-screen items-center justify-center p-4">
                <div
                    className="
                        relative w-full max-w-md
                        bg-background card-base
                        rounded-xl shadow-xl
                        p-6 sm:p-8
                    "
                    onPointerDown={(e) => e.stopPropagation()} // only the actual card blocks closing
                >
                    <button
                        type="button"
                        onClick={close}
                        className="absolute right-4 top-4 rounded-md p-2 hover:bg-muted transition"
                        aria-label="Close"
                    >
                        <X className="h-5 w-5" />
                    </button>

                    <div className="flex flex-col items-center mb-6 mt-6 sm:mt-0">
                        <Brand showName={false} markSize={48} className="inline-flex" />

                        <h1 className="text-xl font-semibold mt-4">HateaChat</h1>
                        <p className="text-lg font-medium">{title}</p>

                        {description ? (
                            <p className="text-sm text-muted-foreground text-center">
                                {description}
                            </p>
                        ) : null}
                    </div>

                    {children}

                    {showSocial ? (
                        <>
                            <div className="flex items-center gap-3 my-6">
                                <div className="flex-1 h-px bg-border" />
                                <span className="text-xs text-muted-foreground">
                                    OR CONTINUE WITH
                                </span>
                                <div className="flex-1 h-px bg-border" />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    className="flex items-center justify-center gap-2 border border-input rounded-md py-2 text-sm hover:bg-muted transition"
                                >
                                    <GoogleIcon className="h-4 w-4" />
                                    Google
                                </button>

                                <button
                                    type="button"
                                    className="flex items-center justify-center gap-2 border border-input rounded-md py-2 text-sm hover:bg-muted transition"
                                >
                                    <Github className="h-4 w-4" />
                                    GitHub
                                </button>
                            </div>
                        </>
                    ) : null}

                    {footer ? <div className="mt-6">{footer}</div> : null}
                </div>
            </div>
        </div>
    );
}
import Link from "next/link";
import type { MouseEventHandler } from "react";

export function BrandMark({
    className,
    size = 32,
}: {
    className?: string;
    size?: number;
}) {
    return (
        <div
            className={"relative inline-flex shrink-0 " + (className ?? "")}
            style={{ width: size, height: size }}
            aria-hidden="true"
        >
            {/* Gradient background from global.css */}
            <div className="absolute inset-0 rounded-lg bg-gradient-brand opacity-70" />

            {/* Solid shapes on top (no gradient fill) */}
            <svg
                viewBox="0 0 64 64"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute inset-0 h-full w-full text-black"
            >
                {/* C-shape wrapping the left person */}
                <path
                    d="M26 14 A20 20 0 1 0 40 50"
                    fill="none"
                    stroke="white"
                    strokeWidth="10"
                    strokeLinecap="round"
                />

                {/* People */}
                <circle cx="22" cy="22" r="7" fill="currentColor" />
                <rect x="16" y="30" width="12" height="24" rx="6" fill="currentColor" />
                <circle cx="42" cy="22" r="7" fill="currentColor" />
                <rect x="36" y="30" width="12" height="24" rx="6" fill="currentColor" />

                {/* Hugging arm */}
                <path
                    d="M24 34 Q32 40 40 34"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="6"
                    strokeLinecap="round"
                />
            </svg>
        </div>
    );
}

export default function Brand({
    href = "/",
    showName = true,
    markSize = 32,
    className,
    onClick,
}: {
    href?: string;
    showName?: boolean;
    markSize?: number;
    className?: string;
    onClick?: MouseEventHandler<HTMLAnchorElement>;
}) {
    return (
        <Link
            href={href}
            className={className ?? "flex items-center gap-2"}
            onClick={onClick}
        >
            <BrandMark size={markSize} />
            {showName && <span className="text-lg font-bold text-foreground">HateaChat</span>}
        </Link>
    );
}
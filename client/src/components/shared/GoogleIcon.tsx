import type { ComponentPropsWithoutRef } from "react";

type SvgProps = ComponentPropsWithoutRef<"svg">;

export default function GoogleIcon(props: SvgProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            aria-hidden="true"
            focusable="false"
            {...props}
        >
            <path
                fill="#FFC107"
                d="M43.6 20.5H42V20H24v8h11.3C33.9 31.9 29.4 35 24 35c-6.1 0-11-4.9-11-11s4.9-11 11-11c2.8 0 5.3 1 7.2 2.7l5.7-5.7C33.6 6.7 29.1 5 24 5 12.9 5 4 13.9 4 25s8.9 20 20 20 20-8.9 20-20c0-1.6-.2-3.1-.4-4.5z"
            />
            <path
                fill="#FF3D00"
                d="M6.3 14.7l6.6 4.8C14.6 16.1 18.9 13 24 13c2.8 0 5.3 1 7.2 2.7l5.7-5.7C33.6 6.7 29.1 5 24 5c-7.7 0-14.3 4.3-17.7 10.7z"
            />
            <path
                fill="#4CAF50"
                d="M24 45c5.3 0 10.1-2 13.7-5.2l-6.3-5.2C29.5 36.6 26.9 37.5 24 37.5c-5.4 0-9.9-3.6-11.5-8.5l-6.5 5C9.4 40.6 16.1 45 24 45z"
            />
            <path
                fill="#1976D2"
                d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.1-3.4 5.7-6.3 7.2l6.3 5.2C39.9 36.8 44 31.4 44 25c0-1.6-.2-3.1-.4-4.5z"
            />
        </svg>
    );
}

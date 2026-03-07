import type { Metadata } from "next";
import "./global.css";

export const metadata: Metadata = {
    title: "HateaChat - Connect Smarter.",
    description: "Fast, secure, and designed for modern collaboration. Chat application",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className="min-h-screen bg-background text-foreground antialiased"
            >
                {children}</body>
        </html>
    );
}
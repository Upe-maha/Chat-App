"use client";

import { usePathname } from "next/navigation";

export default function PublicLayout({
    children,
    auth,
}: {
    children: React.ReactNode;
    auth: React.ReactNode;
}) {
    const pathname = usePathname();

    const isAuthOpen =
        pathname.startsWith("/login") ||
        pathname.startsWith("/register");

    return (
        <div className="relative min-h-screen">
            {/* Main Content */}
            <div
                className={`min-h-screen transition ${isAuthOpen ? "blur-lg pointer-events-none" : ""
                    }`}
            >
                {children}
            </div>
            {/* Modal Slot */}
            {isAuthOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    {auth}
                </div>
            )}
        </div>
    );
}
import React from "react";

export default function PublicLayout({
    children,
    auth,
}: {
    children: React.ReactNode;
    auth: React.ReactNode;
}) {
    return (
        <div className="relative min-h-screen bg-background/80 backdrop-blur-lg">
            <div id="main-content">
                {children}
            </div>
            {auth}
        </div>
    );
}
import Link from "next/link";
import { MessageSquare, User, Settings, LogOut } from "lucide-react";

// ── Main Layout ──────────────────────────────────
export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <aside className="hidden w-16 flex-col items-center gap-4 border-r bg-card py-4 md:flex">
                <Link
                    href="/chat"
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground"
                >
                    V
                </Link>

                <div className="h-px w-8 bg-border" />

                <nav className="flex flex-1 flex-col items-center gap-2">
                    <SidebarIcon href="/chat" icon={MessageSquare} label="Chats" />
                    <SidebarIcon href="/profile" icon={User} label="Profile" />
                    <SidebarIcon href="/settings" icon={Settings} label="Settings" />
                </nav>

                <button
                    className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                    title="Logout"
                >
                    <LogOut className="h-5 w-5" />
                </button>
            </aside>

            {/* Mobile Bottom Nav */}
            <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t bg-card py-2 md:hidden">
                <MobileNavIcon href="/chat" icon={MessageSquare} label="Chats" />
                <MobileNavIcon href="/profile" icon={User} label="Profile" />
                <MobileNavIcon href="/settings" icon={Settings} label="Settings" />
            </nav>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto pb-16 md:pb-0">
                {children}
            </main>
        </div>
    );
}

// ── Sidebar Icon (Desktop) ───────────────────────
function SidebarIcon({
    href,
    icon: Icon,
    label,
}: {
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    label: string;
}) {
    return (
        <Link
            href={href}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            title={label}
        >
            <Icon className="h-5 w-5" />
        </Link>
    );
}

// ── Mobile Nav Icon (Bottom Bar) ─────────────────
function MobileNavIcon({
    href,
    icon: Icon,
    label,
}: {
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    label: string;
}) {
    return (
        <Link
            href={href}
            className="flex flex-col items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
        >
            <Icon className="h-5 w-5" />
            <span className="text-[10px]">{label}</span>
        </Link>
    );
}
export default function LandingPage() {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="text-center">
                <h1 className="text-5xl font-extrabold">
                    Welcome to{" "}
                    <span className="text-primary">Vibe</span>
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    Connect. Collaborate. Chat.
                </p>
                <div className="mt-8 flex justify-center gap-4">
                    <a
                        href="/register"
                        className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground"
                    >
                        Get Started →
                    </a>
                    <a
                        href="/login"
                        className="rounded-full border px-6 py-3 text-sm font-medium text-foreground"
                    >
                        Login
                    </a>

                    {/* For demo purposes, quick access to protected pages */}
                    <a
                        href="/chat"
                        className="rounded-full border px-6 py-3 text-sm font-medium text-foreground"
                    >
                        Chat Now
                    </a>
                    <a
                        href="/profile"
                        className="rounded-full border px-6 py-3 text-sm font-medium text-foreground"
                    >
                        Profile
                    </a>
                    <a
                        href="/settings"
                        className="rounded-full border px-6 py-3 text-sm font-medium text-foreground"
                    >
                        Settings
                    </a>
                </div>
            </div>
        </div>
    );
}
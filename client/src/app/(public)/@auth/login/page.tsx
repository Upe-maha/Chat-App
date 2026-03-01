import LoginPage from "@/components/auth/Login";
import Link from "next/link";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen items-center justify-center px-4">

            <div className="w-full max-w-md rounded-2xl border bg-card p-8 shadow-xl">

                {/* Logo */}
                <Link href="/" className="mb-6 flex items-center justify-center gap-2">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
                        V
                    </span>
                    <span className="text-xl font-bold text-foreground">
                        Vibe
                    </span>
                </Link>

                <LoginPage />

                <p className="mt-6 text-center text-sm text-muted-foreground">
                    <Link href="/" className="hover:text-foreground hover:underline">
                        Back to home
                    </Link>
                </p>

            </div>

        </div>
    );
}
import Link from "next/link";

export default function AuthLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-secondary/30 px-4">

            <Link href="/" className="mb-8 flex items center gap-2">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
                    V
                </span>
                <span className="text-xl font-bold text-foreground">
                    Vibe
                </span>
            </Link>

            <div className="w-full max-w-md">
                {children}
            </div>

            <p className="mt-8 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-foreground hover: underline">
                    Back to home
                </Link>
            </p>
        </div>
    )
}
import Link from "next/link";

export default function CTA() {
    return (
        <section id="pricing" className="px-4 pb-24">
            <div className="mx-auto max-w-6xl">
                <div className="rounded-3xl border border-border bg-foreground px-6 py-14 shadow-sm sm:px-12">
                    <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
                        <div>
                            <h3 className="text-3xl font-extrabold tracking-tight text-background sm:text-4xl md:text-5xl">
                                Ready to transform your communication?
                            </h3>
                            <p className="mt-4 max-w-xl text-background/70">
                                Join teams who move faster with HateaChat.
                            </p>
                        </div>

                        <div className="flex flex-col items-start">
                            <Link
                                href="/register"
                                className="inline-flex items-center justify-center rounded-full bg-gradient-brand px-8 py-3.5 font-semibold text-white shadow-lg transition-all hover:opacity-90"
                            >
                                Create Your Free Account
                            </Link>
                            <p className="mt-3 text-xs text-background/60">
                                Free forever for up to 10 users
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
import Link from "next/link";

export default function CTA() {
    return (
        <section id="pricing" className="px-4 pb-20">
            <div className="mx-auto max-w-6xl">
                <div className="rounded-3xl border border-border bg-linear-to-br from-secondary/50 via-card to-secondary/30 px-6 py-16 text-center shadow-sm sm:px-12">
                    {/* Headline */}
                    <h3 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl">
                        Ready to find your vibe?
                    </h3>

                    {/* Subtitle */}
                    <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                        Join thousands of teams already using Vibe to communicate
                        better, work faster, and build stronger relationships.
                    </p>

                    {/* Button */}
                    <Link
                        href="/register"
                        className="mt-8 inline-block rounded-full bg-primary px-8 py-3.5 font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30"
                    >
                        Get Started Now
                    </Link>

                    {/* Note */}
                    <p className="mt-4 text-sm text-muted-foreground">
                        No credit card required. 14-day free trial.
                    </p>
                </div>
            </div>
        </section>
    );
}
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";

const chatMessages = [
    { text: "Hey team! Project update ready 🚀", sent: false },
    { text: "Awesome, let me check it out!", sent: true },
    { text: "The new design looks great", sent: false },
    { text: "Thanks! Worked on it all week 💪", sent: true },
    { text: "Let's ship it tomorrow", sent: false },
];

export default function Hero() {
    return (
        <section className="mx-auto max-w-6xl px-4 pb-20 pt-12 md:pt-20">
            <div className="grid items-center gap-10 md:grid-cols-2">
                <div className="text-left">
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        NEW: AI summaries 2.0
                    </div>

                    <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl">
                        Connect Smarter with{" "}
                        <span className="text-gradient-brand">HateaChat</span>
                    </h1>

                    <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
                        Secure, real-time messaging for modern teams — with helpful
                        AI features that keep conversations clear and actionable.
                    </p>

                    <div className="mt-8 flex flex-wrap items-center gap-3">
                        <Link
                            href="/register"
                            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90"
                        >
                            Start for Free
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                        <button className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-7 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary">
                            <Play className="h-4 w-4" />
                            Watch Demo
                        </button>
                    </div>

                    <div className="mt-6 flex items-center gap-3 text-sm text-muted-foreground">
                        <div className="flex -space-x-2">
                            <div className="h-6 w-6 rounded-full bg-muted" />
                            <div className="h-6 w-6 rounded-full bg-muted" />
                            <div className="h-6 w-6 rounded-full bg-muted" />
                        </div>
                        <span>Trusted by modern teams</span>
                    </div>
                </div>

                <div className="mx-auto w-full max-w-xl">
                    <div className="rounded-3xl border border-border bg-gradient-surface p-6 shadow-xl">
                        <div className="mx-auto w-full max-w-sm rounded-2xl border border-border bg-card p-4 shadow-sm">
                            <div className="mb-4 flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-semibold text-foreground">HateaChat</p>
                                    <p className="text-xs text-muted-foreground">Highlights</p>
                                </div>
                                <div className="h-8 w-8 rounded-full bg-primary/15" />
                            </div>
                            <div className="space-y-3">
                                {chatMessages.slice(0, 4).map((msg, i) => (
                                    <ChatBubble key={i} text={msg.text} sent={msg.sent} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function ChatBubble({ text, sent }: { text: string; sent: boolean }) {
    return (
        <div className={`flex ${sent ? "justify-end" : "justify-start"}`}>
            <div
                className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm ${sent
                    ? "rounded-tr-sm bg-primary text-primary-foreground"
                    : "rounded-tl-sm bg-secondary text-foreground"
                    }`}
            >
                {text}
            </div>
        </div>
    );
}
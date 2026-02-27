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
        <section className="mx-auto max-w-6xl px-4 pb-16 pt-16 text-center md:pt-24">
            {/* Badge */}
            <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
                v2.0 is now live
            </div>

            {/* Headline */}
            <h1 className="mx-auto max-w-4xl text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl md:text-7xl">
                Connect.{" "}
                <span className="text-gradient-primary">
                    Collaborate.
                </span>
                <br />
                Chat.
            </h1>

            {/* Subtitle */}
            <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
                Experience the seamless way to keep your team in sync. Fast,
                secure, and designed for modern collaboration.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link
                    href="/register"
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30"
                >
                    Get Started
                    <ArrowRight className="h-4 w-4" />
                </Link>
                <button className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-7 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary">
                    <Play className="h-4 w-4" />
                    Watch Demo
                </button>
            </div>

            {/* Chat Preview */}
            <div className="mx-auto mt-14 max-w-3xl">
                <div className="overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-rose-100/50 via-background to-violet-100/50 p-3 shadow-2xl sm:p-5">
                    <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
                        {/* Chat Header */}
                        <div className="mb-4 flex items-center gap-3 border-b border-border pb-3">
                            <div className="h-9 w-9 rounded-full bg-primary/20" />
                            <div className="text-left">
                                <p className="text-sm font-medium text-foreground">Team Chat</p>
                                <p className="text-xs text-muted-foreground">5 members online</p>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="space-y-3">
                            {chatMessages.map((msg, i) => (
                                <ChatBubble key={i} text={msg.text} sent={msg.sent} />
                            ))}
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
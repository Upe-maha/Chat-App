import { RefreshCw, Shield, Image } from "lucide-react";
import type { ComponentType } from "react";

interface Feature {
    title: string;
    description: string;
    icon: ComponentType<{ className?: string }>;
    iconStyle: string;
}

const features: Feature[] = [
    {
        title: "Real-time Sync",
        description:
            "Instant updates across all your devices so you never miss a beat. Works offline and syncs when you're back.",
        icon: RefreshCw,
        iconStyle: "bg-violet-100 text-violet-600",
    },
    {
        title: "End-to-end Encryption",
        description:
            "Your conversations are private and secure with state-of-the-art encryption standards.",
        icon: Shield,
        iconStyle: "bg-amber-100 text-amber-600",
    },
    {
        title: "Rich Media Sharing",
        description:
            "Share photos, videos, and large files effortlessly with drag-and-drop simplicity directly in chat.",
        icon: Image,
        iconStyle: "bg-sky-100 text-sky-600",
    },
];

export default function Features() {
    return (
        <section id="features" className="py-20">
            <div className="mx-auto max-w-6xl px-4">
                {/* Section Header */}
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                        Why Choose Vibe?
                    </h2>
                    <p className="mt-3 text-muted-foreground">
                        Everything you need to collaborate effectively, all in one place.
                    </p>
                </div>

                {/* Feature Cards */}
                <div className="mt-14 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                    {features.map((feature) => (
                        <FeatureCard key={feature.title} feature={feature} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function FeatureCard({ feature }: { feature: Feature }) {
    const Icon = feature.icon;

    return (
        <article className="group rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5">
            {/* Icon */}
            <div
                className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl ${feature.iconStyle} transition-transform duration-300 group-hover:scale-110`}
            >
                <Icon className="h-6 w-6" />
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold text-foreground">
                {feature.title}
            </h3>

            {/* Description */}
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
            </p>
        </article>
    );
}
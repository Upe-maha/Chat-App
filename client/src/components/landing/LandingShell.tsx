import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
// import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

export default function LandingShell() {
    return (
        <div className="relative min-h-screen overflow-hidden bg-background">
            <div className="pointer-events-none absolute -left-32 -top-28 h-80 w-80 rounded-full bg-primary/15 blur-3xl" />
            <div className="pointer-events-none absolute -right-32 top-24 h-96 w-96 rounded-full bg-secondary/15 blur-3xl" />
            <Navbar />
            <main>
                <Hero />
                <div id="solutions" className="sr-only" />
                <Features />
                {/* <CTA /> */}
            </main>
            <Footer />
        </div>
    );
}

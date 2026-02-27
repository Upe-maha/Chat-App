import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: "class",
    content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],

    theme: {
        container: {
            center: true,
            padding: "1.5rem",
            screens: {
                "2xl": "1280px",
            },
        },

        extend: {
            fontFamily: {
                sans: ["var(--font-sans)", "system-ui", "sans-serif"],
            },

            animation: {
                "fade-in": "fadeIn 0.3s ease-in-out",
                "slide-up": "slideUp 0.3s ease-out",
            },

            keyframes: {
                fadeIn: {
                    from: { opacity: "0" },
                    to: { opacity: "1" },
                },
                slideUp: {
                    from: { transform: "translateY(10px)", opacity: "0" },
                    to: { transform: "translateY(0)", opacity: "1" },
                },
            },
        },
    },

    plugins: [],
};

export default config;
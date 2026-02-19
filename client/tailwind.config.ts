import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: "class",
    content: [
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],

    theme: {
        container: {
            center: true,
            padding: "1.5rem",
            screens: {
                "2xl": "1280px",
            }
        },
        extend: {
            colors: {
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",

                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },

                secondery: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },

                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },

                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },

                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))"
                },

                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
            },

            borderRadius: {
                lg: "var(--radius",
                md: "calc(var(--radius) - 2px",
                sm: "calc(var(--radius) - 4px",
            },

            fontFamily: {
                sans: ["var(--font-sans)", "system-ui", "sans-serif"],
            },

            animation: {
                "fade-in": "fade-in 0.3s ease-in-out",
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
                }
            }
        }
    },
    plugins: [],
}

export default config;
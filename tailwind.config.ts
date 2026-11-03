import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["selector", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
        text: "var(--text)",
        muted: "var(--muted)",
        border: "var(--border)",
        accent: "var(--accent)",
        "accent-ink": "var(--accent-ink)",
        espresso: "var(--espresso)",
        "espresso-2": "var(--espresso-2)",
        peach: "var(--peach)",
        rose: "var(--rose)",
        blush: "var(--blush)",
        sand: "var(--sand)",
        champagne: "var(--champagne)",
        "ice-bg": "var(--ice-bg)",
        "ice-ink": "var(--ice-ink)",
        "blue-deep": "var(--blue-deep)",
        "blue-glow": "var(--blue-glow)",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["var(--font-inter)", "Inter", "-apple-system", "sans-serif"],
        bengali: ["var(--font-hind)", "Hind Siliguri", "sans-serif"],
      },
      letterSpacing: {
        widest: "0.16em",
        tightest: "-0.02em",
      },
      borderRadius: {
        stage: "28px",
        "stage-sm": "20px",
      },
      transitionTimingFunction: {
        "luxury-out": "cubic-bezier(0.22, 1, 0.36, 1)",
        "luxury-io": "cubic-bezier(0.65, 0, 0.35, 1)",
      },
      keyframes: {
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        shimmer: "shimmer 2s infinite",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;

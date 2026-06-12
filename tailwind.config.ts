import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#080808",
        foreground: "#f5f0e8",
        muted: "#a39e96",
        accent: {
          purple: "#8b5cf6",
          blue: "#3b82f6",
          red: "#ef4444",
        },
        surface: "#111111",
        border: "rgba(245, 240, 232, 0.12)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Impact", "sans-serif"],
        fig: ["var(--font-fig)", "Cairoli Fig", "Georgia", "serif"],
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        display: "0.12em",
        "display-tight": "0.04em",
        "display-wide": "0.2em",
      },
      animation: {
        marquee: "marquee var(--marquee-duration, 40s) linear infinite",
        "marquee-reverse":
          "marquee-reverse var(--marquee-duration, 40s) linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

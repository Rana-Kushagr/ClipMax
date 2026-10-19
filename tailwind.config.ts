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
        canvas: {
          deep: "#050608",
          DEFAULT: "#08090C",
        },
        surface: {
          DEFAULT: "#0E1015",
          subtle: "#14171F",
          elevated: "#1A1E29",
          glass: "rgba(14, 16, 21, 0.78)",
        },
        border: {
          DEFAULT: "rgba(255, 255, 255, 0.07)",
          strong: "rgba(255, 255, 255, 0.16)",
        },
        primary: {
          DEFAULT: "#F4F4F6",
          hover: "#FFFFFF",
          obsidian: "#08090C",
        },
        accent: {
          DEFAULT: "#3B82F6",
          hover: "#2563EB",
          pressed: "#1D4ED8",
          subtle: "rgba(59, 130, 246, 0.14)",
        },
        emerald: {
          DEFAULT: "#10B981",
          hover: "#059669",
          pressed: "#047857",
          subtle: "rgba(16, 185, 129, 0.14)",
        },
        warning: {
          DEFAULT: "#F59E0B",
          subtle: "rgba(245, 158, 11, 0.15)",
        },
        danger: {
          DEFAULT: "#EF4444",
          subtle: "rgba(239, 68, 68, 0.15)",
        },
        text: {
          primary: "#F4F4F6",
          secondary: "#A1A1AA",
          muted: "#71717A",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        editorial: ["var(--font-editorial)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        pill: "999px",
      },
      spacing: {
        "space-1": "4px",
        "space-2": "8px",
        "space-3": "12px",
        "space-4": "16px",
        "space-5": "20px",
        "space-6": "24px",
        "space-8": "32px",
        "space-10": "40px",
        "space-12": "48px",
        "space-16": "64px",
        "space-20": "80px",
        "space-24": "96px",
      },
      keyframes: {
        "pulse-subtle": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
      animation: {
        "pulse-subtle": "pulse-subtle 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;


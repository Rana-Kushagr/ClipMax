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
          deep: "#07090E",
          DEFAULT: "#0B0F17",
        },
        surface: {
          DEFAULT: "#111726",
          subtle: "#161F33",
          strong: "#1E2942",
          glass: "rgba(17, 23, 38, 0.78)",
        },
        border: {
          DEFAULT: "rgba(148, 163, 184, 0.14)",
          strong: "rgba(59, 130, 246, 0.45)",
        },
        primary: {
          DEFAULT: "#3B82F6",
          hover: "#2563EB",
          pressed: "#1D4ED8",
          subtle: "rgba(59, 130, 246, 0.14)",
        },
        accent: {
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
          primary: "#F8FAFC",
          secondary: "#CBD5E1",
          muted: "#94A3B8",
        },
      },
      fontFamily: {
        display: ["var(--font-manrope)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
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

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        canvas: {
          deep: "#040507",
          DEFAULT: "#08090B",
        },
        surface: {
          DEFAULT: "#0E1014",
          subtle: "#12151B",
          elevated: "#161920",
          strong: "#1D222C",
          glass: "rgba(14, 16, 20, 0.78)",
        },
        border: {
          DEFAULT: "rgba(255, 255, 255, 0.07)",
          strong: "rgba(255, 255, 255, 0.16)",
        },
        primary: {
          DEFAULT: "#F4F4F6",
          hover: "#FFFFFF",
          obsidian: "#08090B",
        },
        mint: {
          DEFAULT: "#10B981",
          hover: "#059669",
          subtle: "rgba(16, 185, 129, 0.14)",
        },
        emerald: {
          DEFAULT: "#10B981",
          hover: "#059669",
          subtle: "rgba(16, 185, 129, 0.14)",
        },
        amber: {
          DEFAULT: "#E06D3B",
          hover: "#C85828",
          subtle: "rgba(224, 109, 59, 0.14)",
        },
        gold: {
          DEFAULT: "#E5C158",
          hover: "#D4AE44",
          subtle: "rgba(229, 193, 88, 0.14)",
        },
        accent: {
          DEFAULT: "#3B82F6",
          hover: "#2563EB",
          subtle: "rgba(59, 130, 246, 0.14)",
        },
        text: {
          primary: "#F4F4F6",
          secondary: "#A1A1AA",
          muted: "#71717A",
        },
      },
      fontFamily: {
        display: ["'Plus Jakarta Sans'", "sans-serif"],
        editorial: ["'Instrument Serif'", "serif"],
        sans: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "20px",
        pill: "999px",
      },
      animation: {
        "pulse-subtle": "pulse-subtle 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        "pulse-subtle": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

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
        void: "#000000",
        cobalt: {
          DEFAULT: "#0047AB",
          deep: "#000B1D",
          dark: "#002D6E",
          subtle: "rgba(0, 71, 171, 0.25)",
        },
        sky: {
          DEFAULT: "#89CFF0",
          hover: "#A6DCF4",
          subtle: "rgba(137, 207, 240, 0.14)",
        },
        olive: {
          DEFAULT: "#757500",
          text: "#E2E260",
          subtle: "rgba(117, 117, 0, 0.22)",
        },
        canvas: {
          deep: "#000000",
          DEFAULT: "#00040A",
        },
        surface: {
          DEFAULT: "#050B16",
          subtle: "#091224",
          elevated: "#0C1A33",
          strong: "#102447",
          glass: "rgba(5, 11, 22, 0.82)",
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

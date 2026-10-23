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
        text: {
          muted: "#94A3B8",
          secondary: "#CBD5E1",
          primary: "#FFFFFF",
        },
        brand: {
          blue: "#0066FF",
          blueHover: "#0052CC",
          blueLight: "#EBF3FF",
          pink: "#FF1464",
          pinkBright: "#FF0055",
          pinkLight: "#FFF0F5",
          dark: "#0B0F19",
          slate: "#475569",
          muted: "#64748B",
          ice: "#F4F8FF",
          cardDark: "#0B0F17",
        },
      },
      fontFamily: {
        display: ["'Plus Jakarta Sans'", "sans-serif"],
        sans: ["'Inter'", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      borderRadius: {
        sm: "6px",
        md: "10px",
        lg: "14px",
        xl: "18px",
        "2xl": "22px",
        "3xl": "28px",
        pill: "999px",
      },
      boxShadow: {
        'electric': "0 10px 25px -5px rgba(0, 102, 255, 0.38)",
        'electric-lg': "0 14px 32px -4px rgba(0, 102, 255, 0.48)",
        'card-soft': "0 20px 50px -10px rgba(15, 23, 42, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;

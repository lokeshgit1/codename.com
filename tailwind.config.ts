import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#f5f5f7",
        foreground: "#1d1d1f",
        card: "#ffffff",
        "card-dark": "#2d2d2f",
        border: "#e5e5e7",
        primary: {
          DEFAULT: "#ff2d55",
          light: "#ff3b5c",
          dark: "#e6294d",
        },
        accent: {
          pink: "#ff2d55",
          green: "#34c759",
          red: "#ff3b30",
          gray: "#8e8e93",
          orange: "#ff9500",
        },
        neutral: {
          50: "#fafafa",
          100: "#f5f5f5",
          200: "#e5e5e5",
          300: "#d4d4d4",
          400: "#a3a3a3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#1a1a1a",
        },
      },
      boxShadow: {
        card: "0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06)",
        "card-hover": "0 4px 16px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.06)",
        subtle: "0 1px 3px rgba(0, 0, 0, 0.05)",
      },
      borderRadius: {
        card: "12px",
        lg: "10px",
        md: "8px",
        sm: "6px",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "2xs": "0.625rem",
      },
    },
  },
  plugins: [],
};
export default config;

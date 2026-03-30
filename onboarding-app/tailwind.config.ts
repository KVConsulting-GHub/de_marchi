import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "node_modules/flyonui/dist/js/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      colors: {
        brand: {
          primary: "#26CCAA",
          "primary-dark": "#1B8C76",
          secondary: "#1E2D52",
          "secondary-mid": "#273A6A",
          accent: "#0099F4",
        },
      },
      fontSize: {
        display: ["50px", { lineHeight: "1.1", letterSpacing: "-0.03em", fontWeight: "900" }],
        h1: ["38px", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "700" }],
        h2: ["28px", { lineHeight: "1.3", letterSpacing: "-0.01em", fontWeight: "600" }],
        h3: ["23px", { lineHeight: "1.35", fontWeight: "600" }],
        h4: ["21px", { lineHeight: "1.4", fontWeight: "500" }],
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease-out forwards",
        "cta-pulse": "ctaPulse 2.5s ease-in-out infinite",
        "slide-in": "slideIn 0.3s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        ctaPulse: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(38, 204, 170, 0.4)" },
          "50%": { boxShadow: "0 0 0 8px rgba(38, 204, 170, 0)" },
        },
        slideIn: {
          from: { opacity: "0", transform: "translateX(-8px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [require("flyonui")],
  flyonui: {
    themes: [
      {
        demarchi: {
          primary: "#26CCAA",
          "primary-content": "#ffffff",
          secondary: "#1E2D52",
          "secondary-content": "#ffffff",
          accent: "#0099F4",
          "accent-content": "#ffffff",
          neutral: "#D8DDE8",
          "neutral-content": "#1A1A2E",
          "base-100": "#FFFFFF",
          "base-200": "#F4F6F9",
          "base-300": "#E8ECF2",
          "base-content": "#1A1A2E",
          info: "#0099F4",
          success: "#26CCAA",
          warning: "#F59E0B",
          error: "#EF4444",
        },
      },
    ],
  },
};

export default config;

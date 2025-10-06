import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
    "./config/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        muted: "var(--muted)",
        border: "var(--border)",
        text: "var(--text)",
        accent: "var(--accent)",
        onaccent: "var(--onaccent)"
      },
      borderRadius: {
        xl: "0.75rem",
        "2xl": "1rem"
      },
      boxShadow: {
        soft: "0 4px 24px rgba(0,0,0,0.25)"
      },
      animation: {
        "fade-in-up": "fadeInUp 0.3s ease-out",
        "fade-in": "fadeIn 0.2s ease-out"
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        }
      }
    }
  },
  plugins: []
};

export default config;

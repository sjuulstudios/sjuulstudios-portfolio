import type { Config } from "tailwindcss";
const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./content/**/*.{md,mdx}", "./config/**/*.{ts,tsx}"],
  theme: { extend: { fontFamily: { sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"] }, colors: { bg: "var(--bg)", surface: "var(--surface)", muted: "var(--muted)", border: "var(--border)", text: "var(--text)", accent: "#FF5105", onaccent: "#FFFFFF" }, borderRadius: { xl: "0.75rem", "2xl": "1rem" }, boxShadow: { soft: "0 4px 24px rgba(0,0,0,0.25)" } } },
  plugins: []
};
export default config;

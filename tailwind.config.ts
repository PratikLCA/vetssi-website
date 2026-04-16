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
        navy:           "#0C2340",
        "navy-mid":     "#1A3D5C",
        steel:          "#2E6E9E",
        "steel-light":  "#5A9DC0",
        cream:          "#F7F5F0",
        "warm-gray":    "#E8E4DC",
        "text-primary": "#1A1A1A",
        "text-muted":   "#6B7280",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans:  ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;

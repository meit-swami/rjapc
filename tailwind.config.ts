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
        saffron: {
          DEFAULT: "#FF6B00",
          dark: "#E55F00",
          light: "#FF8533",
        },
        navy: {
          DEFAULT: "#0B3C5D",
          light: "#0F4D75",
        },
      },
      fontFamily: {
        devanagari: ["var(--font-noto-devanagari)", "sans-serif"],
        sans: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "splash-in": {
          "0%": { opacity: "0", transform: "scale(0.92)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "splash-bar": {
          "0%, 100%": { transform: "translateX(-100%)" },
          "50%": { transform: "translateX(200%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease-out forwards",
        "fade-in": "fade-in 0.6s ease-out forwards",
        float: "float 5s ease-in-out infinite",
        "splash-in": "splash-in 0.9s ease-out both",
        "splash-bar": "splash-bar 1.1s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;

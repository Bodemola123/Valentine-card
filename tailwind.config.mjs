/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        burst: "burst 1s ease-out infinite",
        pulse: "pulse 1.5s infinite",
      },
      keyframes: {
        burst: {
          "0%": { transform: "scale(0)" },
          "50%": { transform: "scale(1.5)" },
          "100%": { transform: "scale(0)", opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};

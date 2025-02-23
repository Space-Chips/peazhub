/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        green: { 400: "#10B981" },
        red: { 400: "#EF4444" },
      },
      animation: {
        pop: "pop 0.3s ease-in-out",
      },
      keyframes: {
        pop: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
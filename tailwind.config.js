/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        loading: "loading 8s ease infinite",
      },
      keyframes: {
        loading: {
          "0%": { opacity: 0, transform: "translateX(-150%)" },
          "50%": { opacity: 1 },
          "100%": { opacity: 0, transform: "translateX(20%)" },
        },
      },
    },
  },
  plugins: [],
};

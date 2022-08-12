/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/App.tsx", "./src/index.tsx", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      "2xs": "320px",
      filter: "430px",
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
    },
    extend: {},
  },
  plugins: [],
};

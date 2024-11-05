/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        main: "120rem",
      },
      gridTemplateColumns: {
        layout: "20rem 1fr",
      },
      gridTemplateRows: {
        layout: "auto 1fr",
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
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

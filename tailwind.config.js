/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false,
  content: [],
  theme: {
    colors: {
      custom_teal: {
        100: "#E3FDFD",
        200: "#CBF1F5",
        300: "#A6E3E9",
        400: "#71C9CE",
      },
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

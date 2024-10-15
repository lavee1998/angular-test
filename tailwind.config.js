const plugin = require("tailwindcss");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#020617",
        success: "#00FF00",
        error: "#FF0000",
        secondary: "#f8fafc",
      },
    },
    // colors: {
    //   success: "#00FF00",
    //   error: "#FF0000",
    //   primary: "#020617",
    //   secondary: "#f8fafc",
    // },
  },
  plugins: [],
};

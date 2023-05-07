/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    
    extend: {
      colors: {
        primary: "#050816",
        secondary: "#01ae7b",
        tertiary: "#151030",
        "black-100": "#100d25",
        "black-200": "#090325",
        "white-100": "#f3f3f3",
        "bg-yellow":"#eda225",
        "yellow-gradient":"#f6ac32",
        back: "#F7F7F7",
        background: "#2A363F",
        cyanShade: "#6ED9A0",
        whiteShade: "#f6f8f7",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
      },
      height: {
        400: "400px",
        500: "500px",
        550: "550px",
        600: "600px",
      },
      width: {
        400: "400px",
        500: "500px",
        600: "600px",
      },
      screens: {
        xs: "450px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
});

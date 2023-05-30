const path = require("path");

module.exports = {
  content: [path.join(__dirname, "./fe-apps/src/**/*.{js,jsx,ts,tsx}")],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        dark: {
          "primary": "#101010",
          "primary-content": "#202020",
          "secondary": "#414141",
          "accent": "#00B13F",
          "base-content": "#ACACAC",
          "neutral": "#4B4B4B",
          "neutral-content": "#292929",
          "base-100": "#808080",
          "base-200": "#777777",
          "base-300": "#A0A0A0",
          "info": "#D1D1D1",
        },
      },
    ],
  },
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#000000",
        surface: "#1B1D1E",
        outline: "#363B3D",
        heading: "#5E95D2",
        subHeading: "#B3B1AD",
        tertiaryText: "#EF6041",
        primary: "#0062CC",
        onSurface: "#51514E",
        secondaryText: "#7D776D",
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    fontFamily: {
      head: ["Roboto Slab", "sans-serif"],
      sub: ["Merriweather", "serif"],
      alt: ["Montserrat", "sans-serif"],
    },
  },
  fontFamily: {
    sans: ["Graphik", "sans-serif"],
    serif: ["Merriweather", "serif"],
  },
  plugins: [],
};
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#1E1E1E",
        surface: "#313131",
        surfaceVariant: "#121212",
        outline: "#58CDFF",
        // heading: "#34AAFF",
        // subHeading: "#B3B1AD",
        // tertiaryText: "#EF6041",
        primary: "#58CDFF",
        onSurface: "#FFFFFF",
        secondary: "#34AAFF",
        tertiary: "#34AAFF26",
        onSecondary: "#FFFFFF",
        // secondaryText: "#BDE0FF99",
        onPrimary: "#FFFFFF",
        codeSnippet: "#16181D",
      },
      borderRadius: {
        classic: "10px", // Define a custom radius of 10px
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "900px": "900px",
      'max-900': { 'max': '899px' },
      'max-570': { 'max': '570px' },
      'max-400' : {'max' : '400px'},
    },
    fontFamily: {
      head: ["Roboto", "sans-serif"],
      sub: ["Merriweather", "serif"],
      alt: ["Montserrat", "sans-serif"],
      mulish: ["Mulish", "sans-serif"],
      poppins: ["Poppins", "sans-serif"],
    },
  },
  fontFamily: {
    sans: ["Graphik", "sans-serif"],
    serif: ["Merriweather", "serif"],
  },
  plugins: [],
};

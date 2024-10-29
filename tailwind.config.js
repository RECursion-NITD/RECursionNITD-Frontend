// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: ["./src/**/*.{js,jsx,ts,tsx}"],
//   theme: {
//     extend: {
//       colors: {
//         background: "#23272F",
//         surface: "#1B1D1E",
//         outline: "#363B3D",
//         heading: "#5E95D2",
//         subHeading: "#B3B1AD",
//         tertiaryText: "#EF6041",
//         primary: "#0062CC",
//         onSurface: "#d7ECEF",
//         secondaryText: "#BDE0FF99",
//         onPrimary: "#002f68",
//         codeSnippet: "#16181D",
//         blue: '#1fb6ff',
//         purple: '#7e5bef',
//         pink: '#ff49db',
//         orange: '#ff7849',
//         green: '#13ce66',
//         yellow: '#ffc82c',
//         'gray-dark': '#273444',  // Added quotes for custom keys with hyphens
//         gray: '#8492a6',
//         'gray-light': '#d3dce6', // Added quotes for custom keys with hyphens
//       },
//       spacing: {
//         '8xl': '96rem',
//         '9xl': '128rem',
//       },
//       borderRadius: {
//         '4xl': '2rem',
//       }
//     },
//     screens: {
//       sm: "640px",
//       md: "768px",
//       lg: "1024px",
//       xl: "1280px",
//       "2xl": "1536px",
//     },
//     fontFamily: {
//       head: ["Roboto", "sans-serif"],
//       sub: ["Merriweather", "serif"],
//       alt: ["Montserrat", "sans-serif"],
//       sans: ['Graphik', 'sans-serif'],
//       serif: ['Merriweather', 'serif'],
//     },
//   },
//   plugins: [],
// };
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],  
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
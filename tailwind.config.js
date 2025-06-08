/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      default: "rgba(0, 0, 0, 1)",
      primary: "rgba(26, 26, 26, 1)",
      secondary: "rgb(38, 38, 38)",
      white: "rgba(255, 255, 255, 1)",
      "light-white": "rgb(247, 247, 245)",
      "light-white-second": "rgb(227, 227, 227)",
      "light-bg": "rgb(242, 242, 247)",
      "dark-bg": "rgb(28, 28, 30)",
      border: "rgba(17, 17, 17, 0.25)",
      grey: "rgba(60, 60, 67, 0.36)",
      "light-grey": "rgb(67, 67, 69)",
      "light-grey-second": "rgb(168, 168, 174)",
      "light-grey-third": "rgb(108, 108, 108)",
      "light-grey-forth": "rgb(43, 43, 45)",

      blue: "rgba(10, 132, 255, 1)",
      "light-blue-main-bg": "rgb(81, 141, 202)",
      "light-blue-menu-bg": "rgb(47, 100, 154)",
      "light-blue-bg": "rgba(49, 122, 191, 0.9)",
      "light-blue-text": "rgb(126, 200, 252)",
      "light-blue-input": "rgb(69, 128, 186)",
      "dark-blue": "rgba(10, 132, 255, 1)",

      "navy-main-bg": "rgb(32, 35, 66)",
      "navy-menu-bg": "rgb(24, 26, 47)",
      "navy-bg": "rgba(32, 35, 66, 0.9)",
      "navy-text": "rgb(110, 113, 144)",

      "grey-main-bg": "rgb(123, 175, 188)",
      "grey-menu-bg": "rgb(80, 96, 112)",
      "grey-bg": "rgba(123, 175, 188, 0.9)",
      "grey-text": "rgb(178, 230, 243)",
      "grey-input-bg": "rgb(105, 127, 140)",

      "dark-grey": "rgb(67, 67, 74)",
      "dark-grey-second": "rgba(44, 61, 77, 0.9)",
      "dark-grey-main-bg": "rgb(77, 103, 126)",
      "dark-grey-menu-bg": "rgb(44, 61, 77)",
      "dark-grey-bg": "rgba(77, 103, 126, 0.9)",
      "dark-grey-text": "rgb(138, 164, 187)",
      "dark-grey-input-bg": "rgba(54, 71, 87, 0.9)",

      seperator: "rgb(91, 118, 137)",
      "dark-seperator": "rgba(84, 84, 88, 0.65)",
    },
    fontFamily: {
      sans: ["Inter", "sans-serif"],
    },
    extend: {
      animation: {
        fade: "fade 1s linear infinite",
      },
      keyframes: {
        fade: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
    },
    screens: {
      sm: "320px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    variants: {},
  },
  plugins: [],
};

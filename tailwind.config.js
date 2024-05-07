/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#111827",
        secondary: "#718096",
        whiteBg: "#FFFFFF",
        grayBg: "#FAFAFA",
        grayBg2: "#EDF2F7",
        greenBg: "#0CAF60",
        orangeBg: "#FE964A",
        purpleBg: "#8C62FF",
        yellowBg: "#D4A701",
        redBg: "#FD6A6A",
        txtDark: "#797B89",
      },
      fontFamily: {
        generalSans: ['General Sans', "sans-serif"],
      },
      fontSize: {
        xs: "1.2rem",
        sm: "1.4rem",
        sm2: "1.6rem",
        xl: "2.4rem",
      },
      screens: {
        "2xs": "200px",
        "1xs": "350px",
        "1xl": "1400px",
        "3xl": "2000px",
      },
    },
  },
  plugins: [],
}


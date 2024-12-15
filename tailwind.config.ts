import type { Config } from "tailwindcss";
const { fontFamily } = require("tailwindcss/defaultTheme");

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brown: {
          light: "#944524",
          DEFAULT: "#73361c",
          dark: "#522714",
        },
        rose: {
          light: "#fcf5f2",
          DEFAULT: "#fcede4",
          dark: "#faddcc",
        },
      },
      fontFamily: {
        satoshi: ["Satoshi", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
} satisfies Config;

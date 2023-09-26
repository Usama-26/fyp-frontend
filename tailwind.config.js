/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)"],
        display: ["var(--font-display)"],
      },
      colors: {
        primary: colors.indigo,
        neutral: colors.gray,
        danger: colors.red,
        success: colors.green,
        warning: colors.yellow,
      },
    },
  },
  plugins: [],
};

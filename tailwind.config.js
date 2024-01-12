/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  darkMode: "class",
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
      boxShadow: {
        "custom-sm": "0px 0px 3px",
        "custom-md": "0px 0px 6px",
        "custom-lg": "0px 0px 9px",
        "custom-xl": "0px 0px 12px",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    // require("@tailwindcss/forms")
  ],
};

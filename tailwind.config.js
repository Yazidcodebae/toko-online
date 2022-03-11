module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        gray: { 1: "#f5f5f5", 2: "#e9eff6", 3: "#c4c4c4" },
      },
    },
  },
  variants: {
    extend: {
      margin: ["first", "last"],
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/line-clamp")],
};

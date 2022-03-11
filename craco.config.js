const path = require("path");
module.exports = {
  style: {
    postcss: {
      plugins: [require("tailwindcss"), require("autoprefixer")],
    },
  },
  webpack: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@commons": path.resolve(__dirname, "src/commons"),
      "@assets": path.resolve(__dirname, "src/assets"),
    },
  },
};

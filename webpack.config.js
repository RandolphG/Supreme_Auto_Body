const path = require("path");

module.exports = {
  context: __dirname,
  entry: "./public/index.js",
  mode: "development",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: "/dist/",
  },
};

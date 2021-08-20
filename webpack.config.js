const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const WEBPACK_MODE =
  process.env.NODE_ENV === "production" ? "production" : "development";

module.exports = {
  mode: WEBPACK_MODE,
  entry: {
    index: "./src/index.js",
    about: "./src/about.js",
  },
  devtool: "inline-source-map",
  output: {
    publicPath: "/",
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      chunks: ["index"],
      template: "./src/index.pug",
      filename: "index.html",
    }),
    new HtmlWebpackPlugin({
      inject: true,
      chunks: ["about"],
      template: "./src/about.pug",
      filename: "about.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.pug$/,
        use: [
          "html-loader",
          {
            loader: "pug-html-loader",
            options: {
              pretty: true,
            },
          },
        ],
      },
    ],
  },
  devServer: {
    historyApiFallback: {
      rewrites: [
        { from: /^\/about/, to: "/about.html" },
        { from: /./, to: "/index.html" },
      ],
    },
  },
};

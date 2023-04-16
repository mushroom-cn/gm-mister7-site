// Generated using webpack-cli https://github.com/webpack/webpack-cli
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");

const isProduction = process.env.NODE_ENV == "production";

const stylesHandler = MiniCssExtractPlugin.loader;

const config = {
  entry: {
    app: "./src/index.tsx",
    // video: "./src/plugins/videos/index.tsx"
  },
  devtool: isProduction ? undefined : "source-map",
  output: {
    filename: "[name].[chunkhash:8].js",
    path: path.resolve(__dirname, "dist"),
    clean: {
        dry: false, // Log the assets that should be removed instead of deleting them.
    },
  },
  devServer: {
    open: true,
    host: "localhost",
    compress: true,
    historyApiFallback: true,
    devMiddleware: {
      index: true,
    //   writeToDisk: true,
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
      chunks: ["app",],
    }),

    new MiniCssExtractPlugin(),

    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: "ts-loader",
        exclude: ["/node_modules/"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [stylesHandler, "css-loader", "postcss-loader", "sass-loader"],
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, "css-loader", "postcss-loader"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },
      {
        test: /\.worker\.tsx?$/,
        use: { loader: "worker-loader", options: { inline: isProduction } },
      },
      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", "..."],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";

    config.plugins.push(new WorkboxWebpackPlugin.GenerateSW());
  } else {
    config.mode = "development";
  }
  return config;
};

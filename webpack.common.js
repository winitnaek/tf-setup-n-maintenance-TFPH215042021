const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const IndexGeneratorPlugin = require("./build/indexGeneratorPlugin");
const AssetGenerator = require("./build/AssetGenerator");
const getAssetGeneratorConfig = require("./build/AssetGeneratorConfig");

const APP_DIR = path.resolve(__dirname, "src");

const commonConfig = {
  entry: [
    APP_DIR + "/tf_setup_n_maintenance.js" // Your appʼs entry point
  ],
  output: {
    filename: "tfSetupNMaintenanceBundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: { presets: ["es2015", "react"] }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader"],
          publicPath: "/dist"
        })
      },
      {
        test: /\.(jpg|png|gif|svg|pdf|ico)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name].[ext]"
            }
          }
        ]
      }
    ]
  },
  externals: {
    fs: "{}",
    tls: "{}",
    net: "{}",
    console: "{}",
    react: "React",
    "react-dom": "ReactDOM",
    redux: "Redux",
    "react-redux": "ReactRedux",
    "redux-thunk": "ReduxThunk",
    "prop-types": "PropTypes"
  },
  resolve: {
    extensions: ["jsx", ".js", ".css"]
  },
  plugins: [
    new webpack.EnvironmentPlugin(["NODE_ENV"]),
    new CopyWebpackPlugin([
      { from: "./index.html", to: "../dist/index.html" },
      { from: "./templates.html", to: "../dist/templates.html" },
      { from: "./manifest.json", to: "../dist/manifest.json" },
      {
        context: "./res/css",
        from: "**/*",
        to: "../dist/res/css"
      },
      {
        context: "./res/js",
        from: "**/*",
        to: "../dist/res/js"
      },
      {
        /* PDF.js web */ context: "./res/pdfjs/web",
        from: "**/*",
        to: "../dist/pdfjs/web"
      },
      {
        /* PDF.js build*/ context: "./res/pdfjs/build",
        from: "**/*",
        to: "../dist/pdfjs/build"
      }
    ]),
    new CleanWebpackPlugin(["dist/*.*", "dist/res", "dist/src", "dist/pdfjs"]),
    new ExtractTextPlugin({ filename: "tfBundle.css", allChunks: true }),
    new ProgressBarPlugin(),
    new IndexGeneratorPlugin()
  ]
};

if(!process.env.SKIP){
  commonConfig.plugins.push(new AssetGenerator(
    getAssetGeneratorConfig(
      process.env.NODE_ENV,
      "D:/W/TaxFactory/tf-artifacts/tf-new-arch-artifacts/Metadata-Mockdata"
    )
  ));
}
module.exports = commonConfig;

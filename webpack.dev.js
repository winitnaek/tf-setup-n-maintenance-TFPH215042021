const merge = require("webpack-merge");
const WebpackShellPlugin = require("webpack-shell-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");
const baseConfig = require("./webpack.common.js");
var path = require("path");
const BUILD_DIR = path.resolve(__dirname, "dist");

if (process.env.NODE_ENV === "development") {
  // baseConfig.plugins.push(new AssetGenerator(getAssetGeneratorConfig(process.env.NODE_ENV)));

  baseConfig.plugins.push(new WebpackShellPlugin({ onBuildEnd: ["node ./uitests/server/express.js"] }));

  baseConfig.plugins.push(
    new CopyWebpackPlugin([
      {
        from: "./uitests/data/CUSTOM_PAYMENTS_MOCKDATA.json",
        to: "../dist/CUSTOM_PAYMENTS_MOCKDATA.json"
      }
    ])
  );
  baseConfig.plugins.push(
    new CopyWebpackPlugin([
      {
        from: "./uitests/data/CUSTOM_TAX_PAYMENT_MOCKDATA.json",
        to: "../dist/CUSTOM_TAX_PAYMENT_MOCKDATA.json"
      }
    ])
  );
  baseConfig.plugins.push(
    new CopyWebpackPlugin([
      {
        from: "./uitests/data/RECENT_USAGE.json",
        to: "../dist/RECENT_USAGE.json"
      }
    ])
  );

  baseConfig.plugins.push(
    new CopyWebpackPlugin([
      {
        from: "./uitests/data/CUSTOM_TAX_FORMULAS_MOCKDATA.json",
        to: "../dist/CUSTOM_TAX_FORMULAS_MOCKDATA.json"
      }
    ])
  );
  baseConfig.plugins.push(
    new CopyWebpackPlugin([
      {
        from: "./uitests/data/COMPANIES_MOCKDATA.json",
        to: "../dist/COMPANIES_MOCKDATA.json"
      }
    ])
  );
  baseConfig.plugins.push(
    new CopyWebpackPlugin([
      {
        from: "./uitests/data/WORKSITES_MOCKDATA.json",
        to: "../dist/WORKSITES_MOCKDATA.json"
      }
    ])
  );
  baseConfig.plugins.push(
    new CopyWebpackPlugin([
      {
        from: "./uitests/data/DELETE_CUSTOM_PAYMENT.json",
        to: "../dist/DELETE_CUSTOM_PAYMENT.json"
      }
    ])
  );
  baseConfig.plugins.push(
    new CopyWebpackPlugin([
      {
        from: "./uitests/data/DELETE_CUSTOM_TAX_CODE.json",
        to: "../dist/DELETE_CUSTOM_TAX_CODE.json"
      }
    ])
  );
  baseConfig.plugins.push(
    new CopyWebpackPlugin([
      {
        from: "./uitests/data/SAVE_CUSTOM_PAYMENT.json",
        to: "../dist/SAVE_CUSTOM_PAYMENT.json"
      }
    ])
  );
  baseConfig.plugins.push(
    new CopyWebpackPlugin([
      {
        from: "./uitests/data/SAVE_CUSTOM_PAYMENT_MOCKDATA.json",
        to: "../dist/SAVE_CUSTOM_PAYMENT_MOCKDATA.json"
      }
    ])
  );
  baseConfig.plugins.push(
    new CopyWebpackPlugin([
      {
        from: "./uitests/data/SAVE_CUSTOM_TAX_PAYMENT_MOCKDATA.json",
        to: "../dist/SAVE_CUSTOM_TAX_PAYMENT_MOCKDATA.json"
      }
    ])
  );

  baseConfig.plugins.push(
    new CopyWebpackPlugin([
      {
        from: "./uitests/data/DATE_FIELD_DOC_MOCKDATA.json",
        to: "../dist/DATE_FIELD_DOC_MOCKDATA.json"
      }
    ])
  );
  baseConfig.plugins.push(
    new CopyWebpackPlugin([
      {
        from: "./uitests/data/PRINCIPAL_STATE_EMPLOYMENT.json",
        to: "../dist/PRINCIPAL_STATE_EMPLOYMENT.json"
      }
    ])
  );
  baseConfig.plugins.push(
    new CopyWebpackPlugin([
      {
        from: "./uitests/data/SAVE_CUSTOM_TAX_CODE.json",
        to: "../dist/SAVE_CUSTOM_TAX_CODE.json"
      }
    ])
  );
  baseConfig.plugins.push(
    new CopyWebpackPlugin([
      {
        from: "./uitests/data/SAVE_WORKSITE_MOCKDATA.json",
        to: "../dist/SAVE_WORKSITE_MOCKDATA.json"
      }
    ])
  );
}
module.exports = merge(baseConfig, {
  devtool: "source-map"
});

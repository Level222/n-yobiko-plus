const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    "report": "./src/content-scripts/report/index.js",
    "chapters": "./src/content-scripts/chapters/index.js",
    "monthly-reports": "./src/content-scripts/monthly-reports/index.js",
    "report-result": "./src/content-scripts/report-result/index.js",
    "disable-math-jax-focus": "./src/injections/disable-math-jax-focus.js"
  },
  output: {
    path: path.resolve(__dirname, "dist", "unpacked"),
    filename: "[name].bundle.js",
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.css/,
        use: [
          {
            loader: "style-loader",
            options: {
              injectType: "lazyStyleTag",
              insert: function insertIntoTarget(element, options) {
                var targetDocument = options?.document || document;
                var parent = targetDocument.head;
                parent.appendChild(element);
              }
            }
          },
          "css-loader"
        ]
      }
    ]
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: "./src/manifest.json"
        },
        {
          from: "./src/icons",
          to: "icons"
        }
      ]
    })
  ]
};

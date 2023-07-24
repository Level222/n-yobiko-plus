const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    "content-scripts": "./src/content-scripts/index.js",
    "disable-math-jax-focus-config": "./src/injections/disable-math-jax-focus-config.js"
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

let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let miniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");

module.exports = {
  optimization: {
    //优化项
    // 处理压缩css以外还得压缩js，因此这是一个数组
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]
  },
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build")
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html"
    }),
    new miniCssExtractPlugin({
      filename: "main.css"
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: [
              ["@babel/plugin-proposal-decorators", { legacy: true }],
              ["@babel/plugin-proposal-class-properties", { loose: true }]
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: [miniCssExtractPlugin.loader, "css-loader", "postcss-loader"]
      },
      {
        // 可以处理less文件
        test: /\.less$/,
        use: [
          miniCssExtractPlugin.loader,
          "css-loader", // @import 解析路径
          "postcss-loader",
          "less-loader" // 把less -> css
        ]
      }
    ]
  }
};

// 配置insert，让插入的style标签插在「title标签与head>style标签之间」，如果我们的模板html咩有写style标签
// 那么就是咩有写insert配置项默认的那样
function getStyleOptions() {
  return {
    insert: function insertBeforeAt(element) {
      const parent = document.querySelector("head");
      const target = document.querySelector("head > style");

      const lastInsertedElement = window._lastElementInsertedByStyleLoader;

      if (!lastInsertedElement) {
        parent.insertBefore(element, target);
      } else if (lastInsertedElement.nextSibling) {
        parent.insertBefore(element, lastInsertedElement.nextSibling);
      } else {
        parent.appendChild(element);
      }

      window._lastElementInsertedByStyleLoader = element;
    }
  };
}

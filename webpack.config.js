let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let miniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "bundle.[hash:8].js",
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
        test: /\.css$/,
        use: [miniCssExtractPlugin.loader, "css-loader"]
      },
      {
        // 可以处理less文件
        test: /\.less$/,
        use: [
          miniCssExtractPlugin.loader,
          "css-loader", // @import 解析路径
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

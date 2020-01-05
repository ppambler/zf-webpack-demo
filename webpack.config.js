let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let miniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");

const webpack = require("webpack");

module.exports = {
  optimization: {
    //优化项
    // 处理压缩css以外还得压缩js，因此这是一个数组
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]
  },
  externals: {
    jquery: "$"
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
    // new webpack.ProvidePlugin({
    //   //在每个模块里边都注入$
    //   $: "jquery"
    // })
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        use: {
          loader: "html-loader"
        }
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        // url-loader包含file-loader
        // 使用url-loader是为了做一个限制
        // 当我们的图片 小于 多少K的时候 用base64来转化
        // 否则就用file-loader产生真实的图片
        use: {
          loader: "url-loader",
          options: {
            esModule: false,
            limit: 10 * 1024
          }
        }
      },
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: [
              ["@babel/plugin-proposal-decorators", { legacy: true }],
              ["@babel/plugin-proposal-class-properties", { loose: true }],
              "@babel/plugin-transform-runtime",
              "@babel/plugin-transform-modules-commonjs"
            ]
          }
        },
        include: path.resolve(__dirname, "src"),
        exclude: /node_modules/
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

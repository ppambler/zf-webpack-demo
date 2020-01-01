// webpack 是node写出来的，所以我们就得采用node的写法运行

let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
// 导出配置文件

module.exports = {
  // 有了入口和出口之后，希望我们打包出来的代码更清楚一点
  // 模式，默认有两种，production development，不写mode。默认是production模式
  mode: 'production',
  // 入口，表示从哪个地方开始打包，可以写相对路径
  entry: './src/index.js',
  // 有了入口，那么我们还有把它打包到一个指定的位置，所以需要一个「出口」参数
  output: {
    // bundle,a bundle flowers,一束花之意，即把模块打包到一起去
    // 这是打包后的文件名，之前默认叫main.js
    filename: 'bundle.[hash:8].js',
    // 打包出来的bundle.js放到哪儿去呢？所以就需要一个路径，表示把打包出来的文件放到哪里去
    // 由于路径必须是一个绝对路径，因此我们引入了一个path模块
    path: path.resolve(__dirname, 'build')
  },
  // 开发服务器配置
  devServer: {
    port: 3000,
    progress: true, //在内存里边打包的时候，我希望看到一个进度条
    contentBase: './build', //指定build目录作为静态服务，不然，默认是根目录
    compress: true //gzip压缩
  },
  plugins: [  //数组  放着所有的webpack插件
    new HtmlWebpackPlugin({
      template: './src/index.html', //指定模板html的路径
      filename: 'index.html', //默认也就index.html这个名字，不过一般我们会指定它
      minify: {
        removeAttributeQuotes: true, //移除属性的引号，如果属性值里边有逗号，那就不用移除了
        collapseWhitespace: true //把空格收起来，
      }, //最小化，在build的时候，顺便把HTML也压缩了
      hash: true, //为往打包出来的index.html插入的bundle.js添加hash戳，如
    })
  ]
}





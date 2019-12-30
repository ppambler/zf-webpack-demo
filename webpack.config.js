// webpack 是node写出来的，所以我们就得采用node的写法运行

let path = require('path')

console.log(path.resolve('dist')) //g:\git-2019\zf-webpack-demo\dist

console.log(path.resolve(__dirname, 'dist'))

// 导出配置文件

module.exports = {
  // 有了入口和出口之后，希望我们打包出来的代码更清楚一点
  // 模式，默认有两种，production development，不写mode。默认是production模式
  mode: 'development',
  // 入口，表示从哪个地方开始打包，可以写相对路径
  entry: './src/index.js',
  // 有了入口，那么我们还有把它打包到一个指定的位置，所以需要一个「出口」参数
  output: {
    // bundle,a bundle flowers,一束花之意，即把模块打包到一起去
    // 这是打包后的文件名，之前默认叫main.js
    filename: 'bundle.js',
    // 打包出来的bundle.js放到哪儿去呢？所以就需要一个路径，表示把打包出来的文件放到哪里去
    // 由于路径必须是一个绝对路径，因此我们引入了一个path模块
    path: path.resolve(__dirname, 'build')
  }
}





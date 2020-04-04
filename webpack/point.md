[webpack官网: https://www.webpackjs.com/concepts/](https://www.webpackjs.com/concepts/)    
    webpack是一个现在的javaScript应用程序静态模块打包器，当webpack处理应用程序时，会递归的构建一个依赖关系图，其中包含应用程序需要的每个模块，然后将这些模块打包成一个或者多个bundle  
### 概念
1. entry 入口一个或者多个
2. output 出口输入bundle
3. loader 处理非JavaScript的文件
4. plugins 插件用于打包优化，压缩，重新定义环境中的变量,先require() 它，然后添加到plugins数组中，new创建一个实例
5. mode 模式启动相应模式下的webpack的内置优化
```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  mode: 'production',
  entry: './path/my/entry.file.js',
  output:{
    path: path.resolve(__dirname,'dist'),
    filename: 'my-first-webpack.bundle.js'
  },
  module:{
    rules: [
      { test: /\.txt$/, use: 'raw-loader'}
    ]
  },
  plugin: [
    new HtmlWebpackPlugin( {template:'./src/index.html'})
  ]
}
```

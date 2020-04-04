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
### 起步
1. 安装webpack
    1. npm install webpack webpack-cli -g
    2. npx webpack -v 查看版本
    3. npm info webpack 查看历史版本
    4. npx webpack --config webpack.config.js 更改配置文件
### 管理资源
1. 静态资源图片
    - file-loader 将文件发送到输出文件夹，并返回（相对）URL
    - url-loader 1.	像file loader 一样工作，但如果文件小于限制，可以返回 data URL
2. css文件  use: ['style-loader', 'css-loader', 'sass-loader'] 从左往右一次链式执行
    - style-loader 含有 CSS 字符串的 <style> 标签，将被插入到 html 文件的 <head> 中
    - css-loader 解析几个文件的关系后，使用 @import 加载，并且返回 CSS 代码
    - sass-loader 加载和转译 SASS/SCSS 文件 sass-loader node-sass
    - postcss-loader 补全css前缀， Autoprefixer时一款自动管理浏览器前缀的插件

        

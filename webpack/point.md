[webpack官网: https://www.webpackjs.com/concepts/](https://www.webpackjs.com/concepts/)    
    webpack是一个现在的javaScript应用程序静态模块打包器，当webpack处理应用程序时，会递归的构建一个依赖关系图，其中包含应用程序需要的每个模块，然后将这些模块打包成一个或者多个bundle  
    
###  概念
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
  entry: {
    app: './src/index.js',
    print: './src/print.js'
  },
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
    - url-loader 
        1. 像file loader 一样工作，但如果文件小于限制，可以返回 data URL
        2. Limit：2048 小于2kb则以base64打包到js
2. css文件  use: ['style-loader', 'css-loader', 'sass-loader'] 从左往右一次链式执行
    - style-loader 含有 CSS 字符串的 <style> 标签，将被插入到 html 文件的 <head> 中
    - css-loader 解析几个文件的关系后，使用 @import 加载，并且返回 CSS 代码
    - sass-loader 加载和转译 SASS/SCSS 文件 sass-loader node-sass
    - postcss-loader 补全css前缀， Autoprefixer时一款自动管理浏览器前缀的插件
### 管理输出
 1. 使用plugin  --save-dev安装 => require引入 => new pluginsName()
    - HtmlWebpackPlugin 创建HTML文件 
    - CleanWebpackPlugin 打包之前先删除
    
### 开发环境 
> 需要具有强大的、具有实时重新加载(live reloading)或热模块替换(hot module replacement)能力的 source map 和 localhost server。
1. **SourceMap** 将编译后的代码映射回原始源代码
2. **webpack-dev-server** 提供一个简单的web服务器，实时重新加载(live reloading).  `{ contentBase: './dist' }`
    > webpack-dev-middleware 是一个容器，可以把webpack处理后的文件传递给一个服务器  
    > 一个 webpack-dev-middleware 配合 express server 的示例 publicPath 也会在服务器脚本用到  
    
        output: {
            filename: '[name].bundle.js',
            path: path.resolve(__dirname, 'dist'),
            publicPath: '/'
        }
3. **HMR** 启用此功能实际上相当简单。而我们要做的，就是更新 webpack-dev-server 的配置 `{ hot: true }`
    - webpack.NamedModulesPlugin 以便更容易查看要修补(patch)的依赖
    - webpack.HotModuleReplacementPlugin
    - 其他代码和框架
        > 1. [React Hot Loader](https://github.com/gaearon/react-hot-loader)：实时调整 react 组件。
        > 2. [Vue Loader](https://github.com/vuejs/vue-loader)：此 loader 支持用于 vue 组件的 HMR，提供开箱即用体验。
        > 3. [Redux HMR](https://github.com/fluxxu/elm-hot-loader)：无需 loader 或插件！只需对 main store 文件进行简单的修改。
4. **tree shaking** 
     `通常用于描述移除 JavaScript 上下文中的未引用代码(dead-code),它依赖于 ES2015 模块系统中的静态结构特性，例如 import 和 export`
     - 将文件标记为无副作用(side-effect-free) `{ "sideEffects": false }`
        > 1. 如果所有代码都不包含副作用，我们就可以简单地将该属性标记为 false，来告知 webpack，它可以安全地删除未用到的 export 导出。
        > 2. 如果你的代码确实有一些副作用，那么可以改为提供一个数组
        > 3. 最后，还可以在 module.rules 配置选项 中设置 "sideEffects"。
        
            {
              "name": "your-project",
              "sideEffects": [
                "./src/some-side-effectful-file.js",
                "*.css"
              ]
            }
      - 压缩输出 引入一个能够删除未引用代码(dead code)的压缩工具(minifier)（例如 UglifyJSPlugin）。
        > 1. 通过 "mode" 配置选项轻松切换到压缩输出，只需设置为 "production" `{mode: "production"}`
        > 2. 启用 uglifyjs 压缩插件 UglifyJSPlugin = require('uglifyjs-webpack-plugin');
        
### 生产环境构建
> 在生产环境中，我们的目标则转向于关注更小的 bundle，更轻量的 source map，以及更优化的资源，以改善加载时间
1. 安装 **webpack-merge** 开始，并将之前指南中已经成型的那些代码再次进行分离
2. **source map**  
```javascript
        module.exports = merge(common, {
            devtool: 'source-map',
            plugins: [
                new UglifyJSPlugin({
                    sourceMap: true
                })
            ]
        });
```
3. **指定环境** 许多 library 将通过与 process.env.NODE_ENV 环境变量关联,可以使用 webpack 内置的 DefinePlugin 
`
     new webpack.DefinePlugin({
       'process.env.NODE_ENV': JSON.stringify('production')
     })
`
4. **Split CSS** ExtractTextPlugin 将 CSS 分离成单独的文件, css代码压缩合并 optimize-css-assets-webpack-plugins

### 代码分离
> 此特性能够把代码分离到不同的 bundle 中，然后可以按需加载或并行加载这些文件
1. 入口起点：使用 entry 配置手动地分离代码。
    - 种方法存在一些问题
        > 1. 果入口 chunks 之间包含重复的模块，那些重复模块都会被引入到各个 bundle 中。
        > 2. 这种方法不够灵活，并且不能将核心应用程序逻辑进行动态拆分代码
2. 防止重复：使用 CommonsChunkPlugin 去重和分离 chunk。 4比3删除了CommonsChunkPlugin，新增了优化后的SplitChunksPlugin
    - 从版本4 CommonsChunkPlugin开始，删除了，改为使用optimization.splitChunks和optimization.runtimeChunk选项。这是新流程的工作方式。
3. 动态导入：通过模块的内联函数调用来分离代码。
    - 使用符合 ECMAScript 提案 的 import() 语法,      
        ` return import(/* webpackChunkName: "lodash" */ 'lodash').then( _ => {} )`
    - 简化方法 由于 import() 会返回一个 promise，因此它可以和 async 函数一起使用      
        ` async function getComponent() {}`
4. bundle 分析(bundle analysis)
    - 下面是一些社区支持(community-supported)的可选工具：
        > 1. webpack-chart: webpack 数据交互饼图。
        > 2. webpack-visualizer: 可视化并分析你的 bundle，检查哪些模块占用空间，哪些可能是重复使用的。
        > 3. webpack-bundle-analyzer: 一款分析 bundle 内容的插件及 CLI 工具，以便捷的、交互式、可缩放的树状图形式展现给用户。
5. 懒加载 懒加载或者按需加载，是一种很好的优化网页或应用的方式。

    ```javascript
        optimization: {
            splitChunks: {
                chunks: "async", //async只对异步的代码分割 intial只对同步的代码分割 all全部分割
                minSize: 30000,  //引入的库大于30kb才去
                maxSize: 50000,  //最大分割字节数 
                minChunks: 1,    //最少引入几次
                maxAsyncRequests: 5,  //按需加载块时并行请求的最大数量将小于或等于5
                maxInitialRequests: 3,//初始页面加载时并行请求的最大数量将小于或等于3
                automaticNameDelimiter: '~',
                name: true,
                cacheGroups: { //配置缓存组
                    vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        priority: -10
                    },
                    default: {
                        minChunks: 2, //在拆分之前共享模块的最小块数
                        priority: -20,
                        reuseExistingChunk: true
                    }
                }
            }
        }
    ```

### 高级概念

1. **缓存**
    - 通过使用 output.filename 进行文件名替换, `[chunkhash] 替换`
    - 提取模板(Extracting Boilerplate) `{ optimization.splitChunks } ` 
    - 模块标识符(Module Identifiers) 让模块依赖的hash保持不变
        > 1. `new webpack.NamedModulesPlugin()` 建议用于开发环境
        > 2. `new webpack.HashedModuleIdsPlugin({  // 参数...})` 用于生产环境
        
2. **创建 Library**
    - 让我们以某种方式打包这个 library，能够实现以下几个目标：
        > 1. 不打包 lodash, 而是使用externals 来require用户加载好的lodash
        > 2. 设置 library 的名称为 webpack-numbers.
        > 3. 将 library 暴露为一个名为 webpackNumbers的变量。
        > 4. 能够访问其他 Node.js 中的 library。
    - 该 library 的使用方式如下：
        > 1. ES2015 模块。例如 import webpackNumbers from 'webpack-numbers'。
        > 2. CommonJS 模块。例如 require('webpack-numbers').
        > 3. 全局变量，当通过 script 脚本引入时
    - 外部化 lodash,  放弃对外部 library 的控制，而是将控制权让给使用 library 的用户,使用` externals` 配置来完成：
    - 外部扩展的限制
    - 暴露 library 
        > 1. 为了让你的 library 能够在各种用户环境(consumption)中可用，需要在 output 中添加 library 属性
        > 2. 为了让 library 和其他环境兼容，添加 libraryTarget 属性。这是可以控制 library 如何以不同方式暴露的选项。
    - 最终步骤
        > 1. 通过设置 package.json 中的 main 字段，添加生成 bundle 的文件路径。 `{  "main": "dist/webpack-numbers.js" } `
        > 2. 将其发布为一个 npm 包，并且在 unpkg.com 找到它并分发给你的用户。
            
            var path = require('path');
            module.exports = {
                entry: './src/index.js',
                output: {
                    path: path.resolve(__dirname, 'dist'),
                    filename: 'webpack-numbers.js',
                    library: 'webpackNumbers'
                },
                externals: {
                    lodash: {
                        commonjs: 'lodash',
                        commonjs2: 'lodash',
                        amd: 'lodash',
                        root: '_'
                    }
                }
            };
    
    
    


    
        

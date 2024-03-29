# Webpack基础
[webpack官网: https://www.webpackjs.com/concepts/](https://www.webpackjs.com/concepts/)    
- webpack 是一个用于现代 JavaScript 应用程序的 静态模块打包工具。当 webpack 处理应用程序时，它会在内部从一个或多个入口点构建一个 依赖图(dependency graph)，然后将你项目中所需的每一个模块组合成一个或多个 bundles，它们均为静态资源，用于展示你的内容。
    
### 1. entry: 入口一个或者多个
    
### 2. output: 出口输入bundle
    1. path: 输出的文件夹的绝对路径
    2. publicPath: '/cdn/'
        - 打包出来的index.html的src都会 `publicPath + filename`;
### 3. loader: 处理非JavaScript的文件
1. raw-loader 原生loader对引入的文件不做处理（防止默认为js文件）。
2. css的解析
    - css-loader style-loader less less-loader node-sass sass-loader

3. 图片的解析
    1. file-loader url-loader  html-loader
        - file-loader 可以指定要复制和放置资源文件的位置
        - url-loader   允许你有条件地将文件转换为内联的 base-64 URL (当文件小于给定的阈值)，这会减少小文件的 HTTP 请求数。如果文件大于该阈值，会自动的交给 file-loader 处理。
        - html-loader 将 HTML 导出为字符串。当编译器需要时，将压缩 HTML 字符串。 默认情况下，每个可加载属性（例如 - <img src="image.png"/> ）都将被导入（ const img = require ('./image.png') 或 import img from "./image.png"" ）
    2. 三种方式
        - css中url导入图片, css-loader解析处理
        - 放在静态文件根目录，html的img的src直接引用。html-loader解析处理。
        - 通过import require的方式引用
4. ES6和ES7的转义
    1. Babel是一个编译JavaScript的平台，可以把ES6和ES7,React的JSX转义为ES5;
    2. babel-loader @babel/core @babel/core @babel/preset-env @babel/preset-react @babel/polyfill
        1. babel-loader使用babel和webpack转译javascript文件。
        2. @babel/@babel/core Babel的编译的核心包。
        3. @babel/@babel/preset-ent为每一个环境的预设, 只能转ES6语法，箭头函数等。
            -  `useBuiltIns: usage`会根据项目中用到的polyfill，按需引入
        4. @babel/@babel/preset-react React插件的babel预设
        5. @babel/plugin-proposal-decorators 把类和对象装饰器编译成ES5的babel插件
        6. @babel/plugin-proposal-class-properties 转化静态属性以及使用属性初始化语法声明的属性。
            -  使用解析Decorator装饰配置，babel使用两个插件。配置jsconfig.json
        7. @babel/polyfill 从 Babel 7.4.0 开始，这个包已被弃用，取而代之的是直接包含core-js/stable
            - 需要安装core-js@3 regenerator-runtime/runtime
    3. 解析步骤
        1. 先把ES6转成ES6语法树babelcore.
        2. 然后调用预设preset-env把ES6语法树转成ES5语法树 preset-env
        3. 再把ES5语法树重新生成es5代码 babelCore
    4. legacy 和 loose 参数
        - legacy：true 使用stage1过期的语法
        - loose：true使用object.defineProperty()的语法解析对象的属性。
    5. polyfill-service 
        - polyfill.io自动化的javascript Polyfill服务
        - polyfill.io通过分析请求头信息中的 UserAgent实现自动爱在浏览器所需要的的polyfills
        - <script src="https://polyfill.io/v3/polyfill.min.js"></script>  
    6. **babel-polyfill 和 babel-runtime的区别的使用**
        1. babel-polyfill 打包比较小适合在项目里面用
            - Babel默认只转化javascript语法，而不转化新的API,比如Iterator, Generator, Set, Map, Proxy, Promise等全局对象。以及全局对象上的方法Object.assgin都不会转码
            - 比如ES6上的Array.from方法，babel就不会转码这个方法，想让让实现，就必须用babel-polyfill
            - `babel-polyfill`，是在构造函数的prototype上添加方法，引入polyfill,就可以使用es6编写了，缺点是会造成全局空间的污染，
            - **@babel/@babel/preset-env** 为每一个环境预设
                1. `useBuiltIns: false`此时不对polyfill做操作，如果引入了@babel/polufill,那么无视浏览器的配置，全量所有的polyfill. 
                2. `useBuiltIns: entry` 根据浏览器的兼容性，引入浏览器不兼容的polyfill, 需要在入口文件手动 `import @babel/polyfill`, 会自动根据browserList引入浏览器不兼容的polyfill.
                    - 如果 core-js的版本号是3的话，那么需要把`import @babel/polyfill`替换成`import 'core-js/stable'; import 'regenerator-runtime/runtime'`
                2. `useBuiltIns: usage` 根据浏览器的兼容性以及代码中使用到的API，进行polyfill **首选**
        2. babel-runtime 腻子垫片 需要什么引入什么不会污染全局变量 ，打包比较大适合在组件和类库中使用。
            - npm i babel-runtime -D
            - babel为了解决全局空间的污染问题，提供了单独的包babel-runtime用来编译模块的工具函数
            - 简单来说runtime更加像是一种按需加载的实现，如果在哪里需要Promise,那么在文件头 `import Promise from'babel-runtime/core-js/promise'`就行了
            -   **babel-plugin-transfrom-runtime** 不需要自己手动引入使用的API了，比如Promise.
                - 启用插件后，Babel就会使用babel-runtime下的工具函数，插件能够将这些工具函数的代码转成require语句，指向对babel-runtime的引用。
                ```
                    plugins: [
							"@babel/plugin-transform-runtime",
							{
							  "corejs": 3,
							  "helpers": true, //false的话就会自己在模块内部实现工具方法
							  "regenerator": true,
							}
						]
                ```
5. ESLint代码校验
    1. eslint(核心包), eslint-loader(loader), babel-eslint(es6的转化工具)
    2. 两步配置pugins, 添加.eslintrc.js文件
        1. 配置文件中的rule有很多，如果不知道，可以参考 eslint-config-airbnb 
    3. airbnb
        1. npm i eslint-config-airbnb eslint-loader eslint eslint-plugin-import eslint-plugin-react eslint-plugin-react-hooks  eslint-plugin-jsx-a11y   -D
    4. 自动修复
        1. 安装自动吸附vscode的插件eslint
        2. 配置自动修复配置
### 4. plugins： 插件用于打包优化，压缩，重新定义环境中的变量,先require() 它，然后添加到plugins数组中，new创建一个实例
1. 

### 5. mode ：模式启动相应模式下的webpack的内置优化
### 6. devServer 

### 7. source-map
1. 定义：
    - 是为了解决开发代码和实际运行代码不一致时，帮助我们debug带原始开发代码的技术。
    - webpack通过配置可以自动给我们生成source map文件， map文件时一种对应编译文件和源文件的方法。
2. 使用
    1.  webpack.config.js
        - devtool: 'cheap-source-map',
        - 组合规则 [inline | hidden | eval] [nosources-][cheap-[module]] source-map
    2. 5个关键字： 看下配置很多，其实就是五个关键字的组合。
        1. eval 每个模块会有自己的souecemap,好缓存,使用eval包裹代码块，has best performance, 会缓存sourcemap在rebuild的时候。
        2. sourcemap 产生.map文件
        3. cheap 提示报错不包含列信息，也不包含loader的sourcemap.
        4. module 包含loader的sourcemap(比如jsx to js, babel的sourceMap) 否则无法定义源文件
        5. inline 将.map作为DataURI嵌入，不单独生成.map文件。
        6. hidden 会生成sourcemap但是不会建立映射，在开发的借助工具使用。
3. 分类
    - source-map 最全的信息，不需要写module, 包含行和列的信息，包含loader的sourcemap
    - cheap-source-map  只包含行，不包含列，也不包含loader的sourcemap, 又想包含loader则需要加module
4. 最加实践： 
    1. 开发环境： 我们在开发环境对sourceMap的要求是： 快（eval）, 信息全（module）, 此时代码没有压缩我们并不在意列信息所以用 cheap, 所有在开发环境的最佳配置: `devtool: cheap-module-eval-source-map`;
    2. 生产环境：一般情况下我们并不希望任何人都可以在浏览器中直接看到我们未编译的源码，所以我们不应该直接提供sourceMap给浏览器，但我们又需要sourceMap来定位我们的错误信息，这时我们可以设置 `hidden-source-map`, 一方面webpack会生成sourcemap文件以提供给错误收集工具比如sentry,另一方面又不会为bundle添加引用注释，以避免浏览器使用。 
5. 可以用**SourceMapDevToolPlugin**， `devtool: false`
    - 实现了对source map生成，进行耕细粒度的控制，它可以替代devtool选项。
    - 使用：
        - 需要打开chrome的Enable JavaScript source maps
        - 安装文件管理插件 fileManager-webpack-plugin //文件管理插件
        - 
    ```
    module.exports = {
        // ...
        devtool: false,
        plugins: [new webpack.SourceMapDevToolPlugin({})],
    };
    ```
### 8. 打包第三方类库。 用lodash举例。
1. 直接引用
    - `import _ from 'lodash'`
2. 插件引入：webpack配置了ProvidePlugin后，在使用时将不需要import和require引用，直接使用即可
    - `new webpack.ProvidePlugin({ _: 'lodash'})`
    - 确定： 不能全局使用

3. expose-loader: 解决了ProvidePlugin不能全局引用的问题,https://www.npmjs.com/package/expose-loader
    - 需要安装 expose-loader  lodash
    - 缺点： 
    ```
            rules: [
            {
                test: require.resolve("lodash"),
                loader: "expose-loader",
                options: {
                    globalName: "_",
                    override: true,
                },
            },
            ],
    ```
4. cdn的方式引入 外链的方式引入
    - 手动在index.html引入cdn的链接，然后配置externals, 直接就是全局的不需要在单独引入
    ```
        externals: [{
            _: 'lodash'
        }]
    ```
5. Html-webpack-externals-plugin 方式引入
    - 只有当模块中使用了lodash, 那就可以动态的加载cdn的引入到index.html中。
    ```
        //entry还可以配置相对的static路径
        new HtmlWebpackExternalsPlugin({
            externals: [
                {
                    module: 'lodash',
                    entry: 'https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.21/lodash.js',
                    global: '_'
                }
            ]
        })
    ```
### 9. 环境变量的配置
1. 两种设置方式
    1. --env=development 
        - `"build": "webpack --env=development --open"`
        - 访问方式: 如果webpack.config.js配置文件是function的话那么会在参数中接收到env, https://www.npmjs.com/package/webpack-cli

    2. 设置process.env的NODE_ENV=development 或者 安装cross-env可以跨平台设置环境变量
        - `set NODE_ENV=development && webpack serve` 或者 `cross-env NODE_ENV=development webpack`
2. 怎么在代码中访问到环境变量，借用**DefinePlugin**
    1. 定义一些全局变量，在编译的时候访问到这些全局变量
    ```
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(process.env.NODE_ENV),
        })
    ```
3. 设置mode的值
    `webpack --mode=development`

### 10. watch 当代码变更之后可以重新编译数据
    1. 





















6. 依赖图(dependency graph) ： webpack 从命令行或配置文件中定义的一个模块列表开始，处理你的应用程序。 从这些 入口起点 开始，webpack 递归地构建一个 依赖图 ，这个依赖图包含着应用程序所需的每个模块，然后将所有这些模块打包为少量的 bundle - 通常只有一个 - 可由浏览器加载。
7. runtime 和 manifest，管理所有模块的交互。
    - Runtime： runtime 包含：在模块交互时，连接模块所需的加载和解析逻辑。包括浏览器中的已加载模块的连接，以及懒加载模块的执行逻辑。
    - Manifest： 当编译器(compiler)开始执行、解析和映射应用程序时，它会保留所有模块的详细要点。这个数据集合称为 "Manifest"，当完成打包并发送到浏览器时，会在运行时通过 Manifest 来解析和加载模块。无论你选择哪种模块语法，那些 import 或 require 语句现在都已经转换为 __webpack_require__ 方法，此方法指向模块标识符(module identifier)。通过使用 manifest 中的数据，runtime 将能够查询模块标识符，检索出背后对应的模块。
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
2. css文件  use: ['style-loader', 'css-loader', 'sass-loader'] 从右往左，从下往上依次链式执行
    - style-loader 含有 CSS 字符串的 <style> 标签，将被插入到 html 文件的 <head> 中
    - css-loader 解析几个文件的关系后，使用 @import 加载，并且返回 CSS 代码
    - sass-loader 加载和转译 SASS/SCSS 文件 sass-loader node-sass
    - postcss-loader 补全css前缀， Autoprefixer时一款自动管理浏览器前缀的插件
3. js文件
    - Babel 是一个工具链，主要用于将 ECMAScript 2015+ 版本的代码转换为向后兼
        > 1. @babel/core 是babel的核心库，把代码转换成抽象语法书
        > 2. @babel/preset-env 包含了所有把es6转成es5的规则
        > 3. @babel/polyfill 为低版本的浏览器做语法填充  全局的垫片
        > 4. @babel/cli支持你直接在命令行中编译代码。
        > 5. babel-runtime作为生产版本依赖（设置 --save）局部的垫片

    
### 管理输出
 1. 使用plugin  --save-dev安装 => require引入 => new pluginsName()
    - HtmlWebpackPlugin 创建HTML文件 
    - CleanWebpackPlugin 打包之前先删除
 2. **manifest**
    - webpack及其插件似乎“知道”应该哪些文件生成。答案是，通过 manifest，webpack 能够对「你的模块映射到输出 bundle 的过程」保持追踪。如果你对通过其他方式来管理 webpack 的输出更感兴趣，那么首先了解 manifest 是个好的开始
    - 通过使用 WebpackManifestPlugin，可以直接将数据提取到一个 json 文件，以供使用
                
            plugins: [
              new ManifestPlugin()
            ]
    
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
5. devServer.proxy
      - 如：对于浏览器请求，你想要提供一个 HTML 页面，但是对于 API 请求则保持代理。你可以这样做：
      
            proxy: {
              "/api": {
                target: "http://localhost:3000",
                bypass: function(req, res, proxyOptions) {
                  if (req.headers.accept.indexOf("html") !== -1) {
                    console.log("Skipping proxy for browser request.");
                    return "/index.html";
                  }
                }
              }
            }
      - 如果要代理到同一目标的多个特定路径，则可以使用一个或多个具有context属性的对象的数组  
      
            proxy: [{
                context: ["/auth", "/api"],
                target: "http://localhost:3000",
            }]

        
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
> 此特性能够把业务代码以及依赖库分离到不同的 bundle 中，然后可以按需加载或并行加载这些文件 
> 这块关系到cache，提取mainfest, 懒加载按需加载，http请求优化
1. 同步的代码分割
2. 动态导入：异步代码分割。
    - 使用符合 ECMAScript 提案 的 import() 语法,      
        ` return import(/* webpackChunkName: "lodash" */ 'lodash').then( _ => {} )`
    - 简化方法 由于 import() 会返回一个 promise，因此它可以和 async 函数一起使用      
        ` async function getComponent() {}`
3. bundle 分析(bundle analysis)
    - 下面是一些社区支持(community-supported)的可选工具：
        > 1. webpack-chart: webpack 数据交互饼图。
        > 2. webpack-visualizer: 可视化并分析你的 bundle，检查哪些模块占用空间，哪些可能是重复使用的。
        > 3. webpack-bundle-analyzer: 一款分析 bundle 内容的插件及 CLI 工具，以便捷的、交互式、可缩放的树状图形式展现给用户。
4. 懒加载 懒加载或者按需加载，是一种很好的优化网页或应用的方式。

    ```javascript
        optimization: {
            splitChunks: {
                chunks: "async", //async只对异步的代码分割 intial只对同步的代码分割 all全部分割
                minSize: 30000,  //引入的模块或者库大于30kb才去做代码分割
                maxSize: 50000,  //最大分割代码大小
                minChunks: 2,    //最少引入几次， 引入次数小于2则不会做代码分割了
                maxAsyncRequests: 5,  //按需加载块时并行请求的最大数量将小于或等于5， 只会分割前五个库，如果超过则不会进行代码分割
                maxInitialRequests: 3,//初始页面加载时并行请求的最大数量将小于或等于3， 入口文件做代码分割最多只能分割成3个
                automaticNameDelimiter: '~',
                name: true,
                cacheGroups: { //配置缓存组  比如把lodash和jquery打包到一个文件里
                    vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        priority: -10, //设置优先级
                        filename: "vendors.s" //可设置bundle的名字
                    },
                    default: {
                        minChunks: 2, //在拆分之前共享模块的最小块数
                        priority: -20,
                        reuseExistingChunk: true， //如果一个模块被打包过了，那么直接使用打包过的哪个模块
                        filename:  'default'
                    }
                }
            }
        }
    ```

### 高级概念

1. **缓存**
    - 通过使用 output.filename 进行文件名替换, `[chunkhash] 替换`
    - 提取模板(Extracting Boilerplate) `{ optimization.splitChunks } ` 
        > 使用代码分离把依赖的模块和manifest提取出来到单独的包中。
        >> 1. main bundle 会随着自身的新增内容的修改，而发生变化。
        >> 2. vendor bundle 会随着自身的 module.id 的修改，而发生变化。
        >> 3. manifest bundle 会因为当前包含一个新模块的引用，而发生变化。
    - 模块标识符(Module Identifiers) 让模块依赖的hash保持不变
        > 通过使用 bundle 计算出内容散列(content hash)作为文件名称，这样在内容或文件修改时，浏览器中将通过新的内容散列指向新的文件，从而使缓存无效。一旦你开始这样做，你会立即注意到一些有趣的行为。即使表面上某些内容没有修改，计算出的哈希还是会改变。这是因为，runtime 和 manifest 的注入在每次构建都会发生变化。可以使用两个插件来解决这个问题
        >> 1. `new webpack.NamedModulesPlugin()` 建议用于开发环境
        >> 2. `new webpack.HashedModuleIdsPlugin({  // 参数...})` 用于生产环境
    - [可预测的长效缓存](https://medium.com/webpack/predictable-long-term-caching-with-webpack-d3eee1d3fa31) 根据
        
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
3. shimming 两种使用场景 
    - shimming 全局变量
        > 1. 全局依赖（例如 jQuery 中的 $）。这些库也可能创建一些需要被导出的全局变量。这些“不符合规范的模块”就是 shimming 发挥作用的地方。
        > 2. 使用ProvidePlugin插件
                
                new webpack.ProvidePlugin({
                    _: 'lodash',
                    join: ['lodash', 'join'] //单独值
                })
        > 3. 传统的模块依赖的 this 指向的是 window 对象
    - 将polyfills 提供给到需要修补(patch)的浏览器（也就是实现按需加载）
    
            <script>
                var modernBrowser = (
                    'fetch' in window &&
                    'assign' in Object
                );

                if (!modernBrowser) {
                    var scriptElement = document.createElement('script');

                    scriptElement.async = false;
                    scriptElement.src = '/polyfills.bundle.js';
                    document.head.appendChild(scriptElement);
                }
            </script>
    
4. 渐进式网络应用程序的使用方法
> (Progressive Web Application - PWA) 在离线(offline)时应用程序能够继续运行功能。这是通过使用名为 Service Workers 的网络技术来实现的。
    - 使用 `http-server` 包启一个服务,修改 `package.json` 来添加一个 start 脚本`{ +  "start": "http-server dist" }`
        > 1. 请运行命令 npm run build 来构建你的项目。然后运行命令 npm start
    - 添加 Workbox, 添加 workbox-webpack-plugin 插件，并调整 webpack.config.js 文件
    
        new WorkboxPlugin.GenerateSW({
            // 这些选项帮助 ServiceWorkers 快速启用
            // 不允许遗留任何“旧的” ServiceWorkers
            clientsClaim: true,
            skipWaiting: true
        }),     
   - 入口文件中注册， 然后重新构建，在启动项目 则Service Worker 已经可以提供离线服务
   
         if ('serviceWorker' in navigator) {
              window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js').then(registration => {
                  console.log('SW registered: ', registration);
                }).catch(registrationError => {
                  console.log('SW registration failed: ', registrationError);
                });
              });
            }
6. 内容安全策略 
    - webpack 能够为其加载的所有脚本添加 nonce， 在入口指定 `__webpack_nonce__`
    
            __webpack_nonce__ = 'c29tZSBjb29sIHN0cmluZyB3aWxsIHBvcCB1cCAxMjM=';
    - 启用 CSP
        > 1. CSP 默认情况下不启用。需要与文档(document)一起发送相应的 CSP header 或 meta 标签 <meta http-equiv="Content-Security-Policy" ...>，以告知浏览器启用 CSP。
        
### 性能优化
1. 常规
    - Dlls:  `DLLPlugin` 和 `DLLReferencePlugin` DllPlugin和DllReferencePlugin提供分离包的方式可以大大提高构建时间性能。主要思想在于，将一些不做修改的依赖文件，提前打包，这样我们开发代码发布的时候就不需要再对这部分代码进行打包。
        > 1. `new webpack.DllPlugin(options)`单独webpack配置创建一个dll-only-bundle文件。 还会生成一个名为 manifest.json 的文件，这个文件是用来让 DLLReferencePlugin 映射到相关的依赖上去的
        > 2. `new webpack.DllReferencePlugin(options)`这个插件是在 webpack 主配置文件中设置的， 这个插件把只有 dll 的 bundle，引用到需要的预编译的依赖
        > 3. 需要手动的把bundle添加到html中 
        > 4. [用法参考](https://blog.csdn.net/janyxh/article/details/100131082)
    - code sliping
    - Worker Pool
        > 1. `thread-loader` 可以将非常消耗资源的 loaders 转存到 worker pool 中。
        > 2. 用法： 把这个 loader 放置在其他 loader 之前， 放置在这个 loader 之后的 loader 就会在一个单独的 worker 池(worker pool)中运行
    - 持久化缓存
        > 1. 使用 `cache-loader` 启用持久化缓存。使用 package.json 中的 "postinstall" 清除缓存目录。
        > 2. 用法: 在一些性能开销较大的 loader 之前添加此 loader，以将结果缓存到磁盘里。
        
        ```javascript
            module.exports = {
              module: {
                rules: [
                  {
                    test: /\.js$/,
                    use: [
                      'cache-loader',
                      'babel-loader'
                    ],
                    include: path.resolve('src')
                  }
                ]
              }
            }
        ```
2. development
    - Devtool
        > 1. "eval" 具有最好的性能，但并不能帮助你转译代码。
        > 2. 如果你能接受稍差一些的 mapping 质量，可以使用 cheap-source-map 选项来提高性能
        > 3. 使用 eval-source-map 配置进行增量编译。
    - code sliping
3. production
    - Source Maps 考虑这个的必要性
    - parallel-webpack: 它允许编译工作在 worker 池中进行。
    
    
    


    
        

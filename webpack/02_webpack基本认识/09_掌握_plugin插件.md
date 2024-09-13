### 一. 认识Plugin
1. plugin和loader的区别是什么？
    1. **plugin**: 用于扩展 Webpack 的功能，可以介入到打包的各个生命周期中，提供优化、分析和定制等多种功能，比如打包优化，资源管理，环境变量等
    2. 加载器（Loaders）：用于转换特定类型的模块文件，使其成为 Webpack 可以处理的模块。加载器在模块加载过程中被应用，只关心单个文件或资源的转换。


### 二. CleanWebpackPlugin

1. 前面我们演示的过程中,每次修改了一些配置,重新打包时,都需要`手动删除dist文件夹`:
    1. 可以使用`CleanWebpackPlugin`
2. 首先,我们先安装这个插件: `npm install clean-webpack-plugin -D`
3. webpack.config.js中配置:

```js
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports={
    plugins: [ 
        new CleanWebpackPlugin()
    ]
}
```


### 三.  [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin#options)

1. HtmlWebpackPlugin 简化了 HTML 文件的创建，以便为你的 webpack 包提供服务
2. 打包的时候，我们会发现,现在自动在dist文件夹中,生成了一个index.htm1的文件，也自动添加了我们打包的bundle.js文件;
3. 这个文件是怎么来的？
    1.  默认情况下是根据ejs的一个模板来生成的;
    2. html-webpack-plugin的源码中,有一个default_index.ejs模块;
4. **也可以自定义HTML模板**
    1. 需要一个属于自己的index.html模块:
5. **自定义模板数据填充**
    1. 会有一些类似这样的语法`<% 变量 %>`,这个是`EJS模块填充数据的方式`。
    2. 在配置`HtmlWebpackPlugin`时,我们可以添加如下配置:
        1. **template**: 指定我们要使用的模块所在的路径;
        2. **title**: 在进行`htmlWebpackPlugin.options.title`读取时,就会读到该信息

```js
// index.html模板中
<title><%= htmlWebpackPlugin.options.title %></title>
// webpack.config.js配置
    new HtmlWebpackPlugin({
      title: 'My Custom App',
      filename: 'index.html',
      template: './src/index.html',
      meta: {
        viewport: 'width=device-width, initial-scale=1',
      },
    }),
```


### 四. DefinePlugin（不需要单独安装）
1. `DefinePlugin` 是 Webpack 的一个内置插件，用于创建在编译时可以配置的全局常量。
2. 定义的全局变量可以用在任何地方， 最常见的应用场景是定义环境变量
3. 默认会注入`process.env.NODE_ENV`

```js
const { DefinePlugin } = require('webpack')
new DefinePlugin({
    version: "'1.1.0'"  //注意写法，默认是eval()执行定义的对象
}),
```


### 五. Mode配置
1. 前面我们一直没有讲mode。
2. Mode配置选项,可以告知webpack使用相应模式的内置优化:
    1. 默认值是`production`(什么都不设置的情况下);
    2. 可选值有:`'none'|development'|'production'`;
3. 这几个选项有什么样的区别呢?
    1. **development**: `会将DefinePlugin中process.env.NODE_ENV的值设置为development.为模块和chunk启用有效的名。`
    2. **production**: 会将`DefinePlugin`中`process.env.NODE_ENV`的值设置为 `production`, 为模块和chunk启用确定性的`混淆名称`,`FlagDependencyUsagePlugin`,`FlagIncludedChunksPlugin`,`ModuleConcatenationPlugin`, `NoEmitOnErrorsPlugin`和`TerserPlugin`。
    3. **none**: 不使用任何默认优化选项
4. Mode配置代表更多




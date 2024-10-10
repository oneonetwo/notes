### 一. 开启本地服务
1. 安装`webpack-dev-server`: `npm install webpack-dev-server -D`
2. 修改配置文件,启动时加上serve参数:
3. `webpack-dev-server`在编译之后不会写入到任何输出文件,而是将bundle文件保留在内存中
    -  事实上webpack-dev-server使用了一个库叫`memfs`(memory-fs  webpack自己写的)
    
```js
//  package.json 配置
"dev": "webpack serve --config wk.config.js",
// webpack.config.js 配置
    devServer:{}
```

### 二. HMR热模块替换
1. 修改webpack的配置：{ hot: true }
2. 但是你会发现,当我们修改了某一个模块的代码时,依然是刷新的整个页面:
这是因为我们需要去指定哪些模块发生更新时,进行HMR;
3. 框架的HMR，也需要我们手动的去写入`module.hot.accept`相关的API吗？
    - 事实上社区已经针对这些有很成熟的解决方案了:
        1. 比如vue开发中,我们使用`vue-loader`,此loader支持vue且件的HMR,提供开箱即用的体验;
        2. 比如react开发中,有`React Hot Loader`,实时调整react组件(目前React官方已经弃用了,改成使用react-refresh);

```js
if(module.hot){
    module.hot.accept("./util.js",()=> {
    console.log("util更新了");
}}
```


### 三. devServer配置
1. HOST的配置
    1. host设置主机地址
        - 默认值是localhost;
        - 如果希望其他地方也可以访问,可以设置为0.0.0.0;
    2. `localhost`和`0.0.0.0.0`的区别:
        1. `localhost`:本质上是一个域名,通常情况下会被解析成127.0.0.1:
            - 127.0.0.1: `回环地址(Loop Back Address)`,表达的意思其实是我们主机自己发出去的包,直接被自己接收;
            1. 正常的数据库包经常`应用层-传输层-网络层-数据链路层-物理层`
            2. 而回环地址,是在网络层直接就被获取到了,是不会经常数据链路层和物理层的;
            3. 比如我们监听127.0.0.1时,在同一个网段下的主机中,通过ip地址是不能访问的;
    3. `0.0.0.0`: 监听IPV4上所有的地址,再根据端口找到不同的应用程序;
        1. 比如我们监听0.0.0.0时,在同一个网段下的主机中,通过ip地址是可以证方问的
2. 


### 四. 开发和生产环境
1. 如何区分环境
    1. 对配置进行划分,方便我们维护和管理,那么,在启动时如何可以区分不同的配置呢;
    2. 
2. 入口文件解析
    1. 之前编写入口文件的规则是这样的:`./src/index.js`,但是如果我们的配置文件所在的位置变成了config目录,我们是否应该变成`../src/index.js`呢?
        - 如果我们这样编写,会发现是报错的,依然要写成`./src/index.js`;
        - 这是因为入口文件其实是和另一个属性时有关的`context`;
        - context的作用是用于解析`入口(entry point)`和`加载器loader`
    2. 官方说法: `默认是当前路径`(但是经过我测试,默认应该是`webpack的启动目录`)
        - 另外推荐在配置中传入一个值;


### 五. 静态资源
1. 在devserver中配置static，静态资源目录之后，
```js
    // 在devserver中配置
    static: {
        directory: path.join(__dirname, 'public'), //public/ 目录当中的所有内容并提供一个本地服务(serve)
    },

    // 比如在index.html中 直接引入文件public/a.js
    <script src="./a.js"></script>
```
2. 打包时，将 public 目录下的文件复制到 dist 目录
```js
const CopyWebpackPlugin = require('copy-webpack-plugin');
    plugins: [
        new CleanWebpackPlugin(), // 可用代替 output: { clean: true }
        new CopyWebpackPlugin({
            patterns: [
              { from: 'public', to: '../build' }, // 将 public 目录下的文件复制到 build 目录
            ],
        })
    ],
```

### 六. Proxy代理
1. `proxy`是我们开发中非常常用的一个配置选项,它的目的设置代理来解决跨域访问的问题:
    1. 比如我们的一个api请求是`http://localhost:8888`,但是本地启动服务器的域名是http://localhost:8080,这个时候发送网络请求就会出现跨域的问题;
    2. 那么我们可以将请求先发送到一个代理服务器,代理服务器和AP服务器没有跨域的问题,就可以解决我们的跨域问题了;
2. 我们可以进行如下的设置:
    1. `target`:表示的是代理到的目标地址,比如`/api-hy/moment`会皮代理到`http://localhost:8888/api-hy/moment`;
    2. `pathRewrite`:默认情况下,我们的`/api-hy`也会被写入到URL中,如果希望删除,可以使用`pathRewrite`;
    3. `changeOrigin`:它表示是否更新代理后请求的headers中host地址;

### 七. historyApiFallback
1. `historyApiFallback`是开发中一个非常常见的属性,它主要的作用是是解决SPA页面在路由跳转之后,进行页面刷新时,返回404的错误。
    1. boolean值:默认是false
    2. 如果设置为true,那么在刷新时,返回404错误时,会自动返回index.html的内容;

### 流程
1. webpack配置
    1. 客户端渲染： React代码在浏览器运行，消耗的的用户浏览器的性能；
    2. 服务端渲染： React代码在服务器上运行，消耗的是服务器的性能；
        - renderTOString
        - React.renderToString 是把 React 元素转成一个 HTML 字符串，因为服务端渲染已经标识了 reactid，所以在浏览器端再次渲染，React 只是做事件绑定，而不会将所有的 DOM 树重新渲染，这样能带来高性能的页面首次加载！同构黑魔法主要从这个 API 而来。
        - React.renderToStaticMarkup，这个 API 相当于一个简化版的 renderToString，如果你的应用基本上是静态文本，建议用这个方法，少了一大批的 reactid，DOM 树自然精简了，在 IO 流传输上节省一部分流量。
    3. 自动打包和自动启动服务
        1. 方法一： nodemon 启动两个窗口 
            - ` "start": "nodemon --watch build --exec node \"./build/bundle.js\"", `
            - ` "build": "webpack --config webpack.server.js --watch", `
        2. 方法二： 使用npm-run-all提升开发效率
    4. 拆分客户端和服务端的webpack配置
        1. 打包服务器和客户端的代码
        2. 客户端打包的js放到koa的静态文件中public
2. 代码同构
    - 1. 服务器端运行react代码渲染出HTML
    - 2. 发送HTML给浏览器
    - 3. 浏览器接收到并显示
    - 4. 浏览器加载js文件
    - 5. js中的React代码在浏览器端重新执行
    - 6. js中得react接管也页面操作
3. 路由同构
    1. 安装react-router-dom   {StaicRouter }
    2. StaicRouter用于服务器端的路由 `<StaticRouter location context={context}>`
        - 一个context对象，在渲染期间，组件可以向对象添加属性以存储优选渲染的信息；

4. 引入redux 
    1. 创建store，同时引入server和client的入口文件
    2. axios加载异步数据
        - 解决服务器端axios获取的内容是空的问题；componentDidMound 只会在客户端渲染；
5. 异步数据的服务端渲染：loadData方法以及路由重构；*react-router-dom Server-Rendering  Data-Loading*
    1. laodData  `https://reactrouter.com/web/guides/server-rendering`
    2. store预先填充数据：组件添加loadData静态方法，然后根据用户的请求地址和路由（借助matchPath），获取相应的异步数据
    3. 对于多层路由， matchPath只能配一层；所以使用 `import { matchRouts } from react-router-config`模块；
    4. 服务端获取异步数据；让匹配到的路由调用loadData执行dispatch准备数据； promise async await
    5. 数据的脱水和注水, 服务器获取一次数据直接传到客户端；
6. node作为中间层为客户端请求做中转
    1. #[koa-server-http-proxy](https://www.npmjs.com/package/koa-server-http-proxy) 
    2. 求情数据，在客户端代理正常，服务器异常：
        - 原因是服务器端直接访问的根目录，中间代理并不会起作用；对此需要配置不同的请求的url
    3. 利用axios的**instance**给请求做独特的配置；
    4. **借助redux-thunk的withExtraArgument方法可以向异步的函数注入自定义的参数** https://github.com/reduxjs/redux-thunk
7. 路由的多层嵌套
    1. import { renderRouters } from 'react-router-config'; 
        - renderRoutes做了两件事1.首先会渲染一级路由，并把二级路由的信息带给组件的props
8. 登录功能
    1. 编写相应接口
    2. cookies的问题的产生，
        - 当浏览器去请求页面的时候(携带了cookie)，NodeJS服务器进行服务端渲染去请求数据（没有携带cookie）
    3. 解决cookie登录的传递问题
        - 等服务器端请求数据的时候要携带客户端的cookie， 通过axios的header属性设置
9. 设置404，301 状态码，借助context实现404功能，实现服务端301重定向
    1. 借助staticRouter的context往子组件渗透值，设置notFount为true, res.status = 404;
        - `props.staticContext&&(props.staticContext.NotFount = true);`
    2. react-router的 Redirect只能显示客户端的重定向，服务端的重定向 要借助于staticRouter中的context
10. 数据请求失败的情况下的promise的处理
    1. 多加一层promise的处理，不管是then还是catch都执行resolve
11. css渲染的处理
    1. isomorphic-style-loader  css-loader createContext 自定义hook;  
12. react-helmet的使用 客户端和服务端的tdk定制

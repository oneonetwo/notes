#### 创建sreve side render
一. 项目基础构建
1. 创建一个node应用，webpack打包node应用，
    1. server.config.js 
2. 写一段vue组件代码，使用createSSRApp创建vue应用，
    1. renderToString把vue app转换成字符串 交给node服务返回
3. 创建client应用，用webpack打包
    1. client.config.js
4. hydration激活客户端: node创建静态资源服务，引入<script src="/client/client_bundle.js"></script>
5. 浏览器开发者工具中的警告用，weboack.definePlugin 
    1. __VUE_OPTIONS_API__：启用或禁用 Vue 的 Options API。通常情况下，如果你不使用 Composition API，可以设置为 true。
    2. __VUE_PROD_DEVTOOLS__：启用或禁用生产环境下的 Vue 开发工具。如果不需要在生产环境中使用 Vue Devtools，设置为 false。
    3. __VUE_PROD_HYDRATION_MISMATCH_DETAILS__：启用或禁用生产环境下的 hydration 错误详细信息。这通常用于调试生产环境下的 SSR 应用，设置为 false 可以减小包大小。

二. 多个页面 使用 vue-router
> https://router.vuejs.org/zh/guide/
1. 安裝vue-loader, 创建router实例
2. server的index.js中使用 createMemoryHistory()
3. client的index.js中使用hash或者history理由

三. Pinia
> https://pinia.vuejs.org/zh/introduction.html
1. 安装pinia, 避免请求状态污染，需要在每个请求中创建一个全新pinia
2. sever端创建createPinia(), 服务器中pinia的初始化的数据会同步到到客户端，
    1. server_pinia => json string => window._xx => hydration => window._xx => json object => client_pinia
3. client端创建createPinia(),


#### 注意事项
1. 跨请求污染
    1. 在服务端渲染中，每个请求都会创建一个新的应用实例。通过将应用创建逻辑封装在 createApp 函数中，确保每次调用该函数时都会创建一个新的 Vue 应用实例。这样可以避免在多个请求之间共享应用实例，从而避免共享状态导致的问题。
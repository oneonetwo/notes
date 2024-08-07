#### Nuxt配置（nuxt.config） nuxt.config.js配置文件位于项目的根目录，可对Nuxt进行自定义配置。

1. runtimeConfig: 运行时配置，即`定义环境变量`
    1. 也可通过.env文件中的环境变量来覆盖,优先级(.env>runtimeConffig)
    2. env的变量会打入到process.env中,符合规则的会覆盖runtimeContfig的变量
    3. .env一般用于某些终端启动应用时动态指定配置,同时支持dev和pro

2. appConfig: 可以用来定义`应用`的全局配置，这些配置可以在应用的任何地方访问。
3. app： app配置
    1. `head`给每个页面设置head信息，`也支持useHead配置和内置组件`
4. ssr: 指定应用的渲染模式
5. router: 配置路由相关的信息，比如在客户端渲染可以配置hash路由
6. alias: 路径的别名，默认已配好
7. modules: 配置Nuxt扩展的模块，比如 @pinia/nuxt  @nuxt/image
8. routeRules：定义路由规则，可更改路由的渲染模式或者分配基于路由缓存策略
9. builder: 可指定用vite还是webpack来构建应用，默认是vite,如切换为webpack还需要安装额外的依赖。

```js
    runtimeConfig: {
        // 私有配置，只有服务器端可以访问
        secretKey: 'my-secret-key',

        // 公共配置，客户端和服务器端都可以访问
        public: {
            apiBase: '/api'
        }
    }
```
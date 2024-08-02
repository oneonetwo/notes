#### Nuxt配置（nuxt.config）
1. nuxt.config.js配置文件位于项目的根目录，可对Nuxt进行自定义配置。
    1. runtimeConfig: 运行时配置，即`定义环境变量`
        1. 也可通过.env文件中的环境变量来覆盖,优先级(.env>runtimeConffig)
        2. env的变量会打入到process.env中,符合规则的会覆盖runtimeContfig的变量
        3. .env一般用于某些终端启动应用时动态指定配置,同时支持dev和pro
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
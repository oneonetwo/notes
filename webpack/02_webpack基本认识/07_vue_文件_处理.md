### 编写vue文件

1. 编写一个vue组件，在index.js中使用vue组件
```js
// 引入vue
import { createApp } from 'vue'
import Hello from './vue-demo/hello.vue'
// vue代码
createApp(Hello).mount('#app')
```

### vue-loader处理vue文件
1. 安装`vue-loader`: `npm install vue-loader -D`
2. 在 Webpack 配置文件中添加对 `vue-loader` 的配置，并使用 `VueLoaderPlugin`。 
    1. VueLoaderPlugin 的作用
        - 负责将 Vue 组件解析成可以由 Webpack 处理的 JavaScript、CSS 和 HTML。
        - 用于处理 .vue 文件中的不同块（template、script、style 等）。
        - 配合 `vue-loader` 实现 `Vue 组件的热更新`。

```js
// 配置 webpack.config.js 文件：
const { VueLoaderPlugin } = require('vue-loader');
{
    module: {
        rules: [
            {
                test: /.vue$/,
                loader: "vue-loader"
            }
        ]
    },
    plugins: [
       new VueLoaderPlugin(), // 必须包含这个插件
    ],
}

```
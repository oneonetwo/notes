### Nuxt3 集成 Pinia
> https://nuxt.com/modules/pinia

1. 安装依赖
    1. `npm install @pinia/nuxt --save`
        > @pinia/nuxt会处理state同步问题,比如不需要关心序列化或XSS攻击等问题
    2. `npm install pinia --save`
        > 如有遇到pinia安装失败,可以添加`--legacy-peer-deps`告诉NPM忽略对等依赖并继续安装。或使用yarn
2. Nuxt应用接入Pinia
    1. 在nuxt.config文件中添加:modules:['@pinia/nuxt],如下图月粽:
    ```JS
        import { defineNuxtConfig } from "nuxt/config";
        export default defineNuxtConfig({
        //配置Nuxt扩展的模块,模块可以继承Nuxt的核心功能和和添加更多的集成等
        modules: ["@pinia/nuxt"],
        });
    ```

3. useState VS Pinia
    1. Nuxt跨页面、跨组件全局状态共享,既可以使用 useState,也可以使用Pinia,那么他们有什么异同呢?
    2. 它们的共同点:
        1. 都支持全局状态共享,共享的数据都是响应式数据
        2. 都支持服务器端和客户端共享
    3. 但是Pinia比useState有更多的优势,比如:
        1. 开发工具支持(Devtools)
            - 跟踪动作,更容易调试
            - store可以出现在使用它的组件中
        2. 模块热更换
            - 无需重新加载页面即可修改store数据
            - 在开发时保持任何现有状态
        3. 插件:可以使用插件扩展Pinia功能
        4. 提供适当的TypeScript支持或自动完成



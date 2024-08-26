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


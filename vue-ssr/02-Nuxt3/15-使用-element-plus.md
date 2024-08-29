### Nuxt3 集成 Pinia


1. Element Plus官网:`https://element-plus.org/zh-CN/guide/quickstart.html`
2. 安装Element Plus的具体步骤:
    1. 第一步:
        - `npm install element-plus --save`
        - `npm install unplugin-element-plus --save-dev`
    2. 第二步: nuxt.config.js
        - 配置Babel对EP的转译
        - 配置自动导入样式
    3. 第三步:
        - 在组件中导入组件,并使用


```js

import ElementPlus from "unplugin-element-plus/vite";
export default defineNuxtConfig({
    // share build config
    build:{
        //如下ep依赖包,使用Babel进行转译
        transpile:["element-plus/es"],
    },
    vite:{
        //自动导入样式
        plugins:[ElementPlus()],
    },
}};

<template>
    <div>
        <el-button type="primary">Primary</el-button>
        <el-button type="success">Success</el-buttor١>
    </div>
</template>

<script setup>
//按需引入
import{ ElButton }from"element-plus";
</script>

```




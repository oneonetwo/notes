<template>
    <div class="home">
        <div>我是Home Page</div>
        <!-- 只展示在客户端 -->
        <!-- <ClientOnly fallback="loaidng..."></ClientOnly> -->
        <ClientOnly>
            <template #fallback>
                我是服务器渲染的loading...
            </template>
            <div>我只会在client 渲染</div>
        </ClientOnly>  

        <!-- 全局样式 -->
        <div class="global-1"> 这是global.scss</div>
        <div class="global-2"> 这是 main.css </div>

        <h1>字体包</h1>
        <i class="iconfont icon-mtiIcon-caozuo-baocun"></i>

    </div>
</template>

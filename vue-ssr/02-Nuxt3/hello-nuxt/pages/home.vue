<template>
    <div>
        <h2>Home page</h2>
    </div>
</template>


<script setup>
definePageMeta({
    // 定义匿名中间件(监听路由)
    middleware: [
        defineNuxtRouteMiddleware((to, from)=>{
            console.log('使用匿名中间件  1')
        }),
        'auth'
    ]
})
</script>
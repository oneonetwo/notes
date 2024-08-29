<template>
    <div>
        <h1>Login page</h1>

        <button @click="handleLogin"> login</button>
    </div>
</template>

<script setup>
// definePageMeta 是 Nuxt 3 中用于定义页面级别的元数据（Meta Data）的一个方法。它允许你在单个页面组件中设置该页面的标题、描述、元标签、布局、缓存策略等信息，而不需要在 nuxt.config.js 全局配置文件中进行设置。
// 定义使用的layout
definePageMeta({
    layout: "custom-layout"
})

async function handleLogin(){
    const {data} = await useFetch("/api/login", {method: "POST", body: {
        username: 'abcd',
        password: 12344
    }})

    console.log(data.value?.data)

    // cookie存放浏览器100s
    const cookie = useCookie('token', {
        maxAge: 100
    })
    cookie.value = data.value?.data.token
    return navigateTo("/")
}

</script>
<template>
    <div>
        <h2>plugins page</h2>
    </div>
</template>

<script setup>


const nuxtApp = useNuxtApp()
//使用插件
console.log('formData插件', nuxtApp.$formData())
console.log('version', nuxtApp.$version)

//全局
console.log('price', nuxtApp.$formPrice(12.3698525))
//只能在客户端
if(!nuxtApp.ssrContext){
    console.log('json.client', nuxtApp.$toJson({"name": 'jingyuaun'}))
}

</script>
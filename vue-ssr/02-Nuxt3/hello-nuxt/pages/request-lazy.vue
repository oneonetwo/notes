<template>
    <div>
        <h2>request lazy</h2>

        <button @click="handleRefresh">refresh</button>

        <br/>
        <br/>
        <br/>
        <br/>
    </div>
</template>

<script setup>
const BASE_URL = "http://localhost:3000/api"

// 1. useFetch默认会阻塞 页面的导航， 
// const { data } = await useFetch(BASE_URL+'/homeInfo', {method:'GET'})

// 2. useFetch默认会阻塞 页面的导航， 
// const { data } = await useFetch(BASE_URL+'/homeInfo', {
//     method:'GET',
//     lazy: true //不会阻塞页面的导航
// })
// console.log('>>>>>>>>>>>>>', data.value?.data)
// lazy：true 需要watch来监听数据
// watch(data, (newData)=>{
//     console.log("data=>", data);
// })

// 3. lazy的简写
const { data, refresh } = await useLazyFetch(BASE_URL+'/homeInfo', {
    method:'GET',
})

// 客户端 刷新请求
function handleRefresh(){
    refresh()
}
onMounted(()=>{
    console.log('onMounted')
})


</script>
<template>
    <div>
        <h2>more page</h2>
    </div>
</template>

<script setup>
const BASE_URL = "http://localhost:3000/api"
// interface  IResultData{
//     code: Number,
//     data: any
// }

// 1. 使用$fetch 来发起网络请求
// $fetch(BASE_URL + '/homeInfo', {
//     method: 'GET',
// }).then(res=>{
//     console.log(res);
// })

// 2. 使用官方提供的hooks API (在刷新页面的时候，客户端不会发起网络请求，可以减少客户端发起的一次请求)
// homeInfo为唯一key,
// const { data } = await useAsyncData('homeInfo', ()=>{
//     return $fetch(BASE_URL+'/homeInfo', {method:'GET'})
// })

// 3. useAsyncData的简写
// const { data } = await useFetch(BASE_URL+'/homeInfo', {method:'GET'})

// 4. useFetch 的options  https://nuxt.com/docs/api/composables/use-fetch
// const { data } = await useFetch('/homeInfo', {
//     method:'GET',
//     baseURL: BASE_URL,
//     query: {
//         name: 'kkk'
//     },
//     body: {},
//     headers: {}
// })

// 5. 拦截器
const { data } = await useFetch('/homeInfo', {
    method:'GET',
    baseURL: BASE_URL,
    query: {
        name: 'kkk'
    },
    //請求拦截器
    onRequest({request, options}){
        console.log(options.method)
        options.headers = {
            token: 'XXX'
        }
    },
    onRequestError({request, options, error}) {
        console.log('onRequestError')
    },
    onResponse({request, response, options}){
        console.log('onResponse')
        console.log(response._data)
    },
    onResponseError({request, response, options,error}) {
        console.log('onResponseError')
    }
  })
// console.log(data.value.data)




</script>
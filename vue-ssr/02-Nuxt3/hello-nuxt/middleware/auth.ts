export default defineNuxtRouteMiddleware((to, from)=>{
    console.log('我是命名中间件auth.js');
    let isLogin = true;
    if(!isLogin){
        return navigateTo('/login') 
    }
})
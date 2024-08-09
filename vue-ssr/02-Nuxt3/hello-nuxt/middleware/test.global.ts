export default defineNuxtRouteMiddleware((to, from)=>{
    if (process.server) {
        // SSR 环境中执行的代码
        
    } else if (process.client) {
        // 仅在客户端执行的代码
        console.log('全局中间件')
      }
})
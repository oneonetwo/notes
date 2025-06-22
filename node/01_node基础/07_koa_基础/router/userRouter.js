/*
 * @Descripttion: 
 * @version: 
 * @Author: D
 * @Date: 2024-06-04 11:12:06
 * @LastEditors: jy
 * @LastEditTime: 2024-06-04 11:13:24
 */
// 1. 创建路由对象
const KoaRouter = require('@koa/router')
const userRouter = new KoaRouter({prefix: '/users'})

// 2. 在路由中注册中间件 path/method
userRouter.get('/', (ctx, next)=>{
    ctx.body = 'list,,,'
})
userRouter.get('/:id', (ctx, next)=>{
    ctx.body = 'detail :id'
})
module.exports = userRouter
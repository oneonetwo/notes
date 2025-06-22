/**
 * @koa/router
 * 一般开始时，会把处理独立的路由业务封装到一个模块中 比如user模块
 */


const Koa = require('koa')
const userRouter = require('./router/userRouter')

// 创建app对象
const app = new Koa()

// // 1. 创建路由对象
// const userRouter = new KoaRouter({prefix: '/users'})

// // 2. 在路由中注册中间件 path/method
// userRouter.get('/', (ctx, next)=>{
//     ctx.body = 'list,,,'
// })
// userRouter.get('/:id', (ctx, next)=>{
//     ctx.body = 'detail :id'
// })
// 3. 让路由中间件生效
app.use(userRouter.routes())
app.use(userRouter.allowedMethods()) //如果客户端用没注册过的请求方式，则会返回 Methods Not Allowed


//启动服务器
app.listen(3000, ()=>{
    console.log('koa服务器启动成功~！')
})
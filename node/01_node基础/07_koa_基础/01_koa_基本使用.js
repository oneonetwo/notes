/**
 * 1. koa是通过注册中间件来完成请求操作的
 * 2. ctx: 上下文Context对象
 *      - ctx.request //请求对象
 *      - ctx.respones //获取相应对象
 */

const Koa = require('koa')
// 创建app对象
const app = new Koa()

app.use(async(ctx, next)=>{
    // 1. 请求对象
    console.log(ctx.request) //koa封装的请求对象
    console.log(ctx.req) //Node封装的请求对象
    next()
    // 2. 相应对象
    console.log(ctx.response) //koa封装的响应对象
    console.log(ctx.res) //Node封装的响应对象
    // 3. 其他属性 query params
    console.log(ctx.params)
    console.log(ctx.query)

    ctx.body = 'hello world'
})
app.use(async(ctx, next)=>{
    console.log('第二个中间件')
    next()
})



//启动服务器
app.listen(3000, ()=>{
    console.log('koa服务器启动成功~！')
})
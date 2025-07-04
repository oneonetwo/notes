/**
 * 如果同步组件的下一个中间件是一个异步操作函数，那么不会等待异步函数的结果，  直接执行下一步
 * 如果希望的等待异步执行的结果，那么需要next前加await 都转变为async函数
 */

const Koa = require('koa')

const app = new Koa

//测试代码
const testAsyncFun = ()=>{
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve('abc')
        }, 500)
    })
}

app.use(async (ctx, next)=>{
    console.log('koa ceil middleware 1')
    await next()
    console.log('koa floor middleware 11')
    ctx.body = ctx.msg + '-899'
})   

app.use(async (ctx, next)=>{
    console.log('koa middleware 2')
    ctx.msg = await testAsyncFun()
    next()
})
app.use((ctx, next)=>{
    console.log('koa middleware 3')
    ctx.msg += 'koa 3'
})

// koa 服务器启动成功~
// koa ceil middleware 1
// koa middleware 2
// koa middleware 3
// koa floor middleware 11


app.listen(9001, () => {
    console.log('koa 服务器启动成功~')
})

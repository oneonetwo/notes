const Koa = require('koa')

const app = new Koa


app.use((ctx, next)=>{
    console.log('koa ceil middleware 1')
    next()
    console.log('koa floor middleware 11')
    ctx.body = 'koa 1'
    ctx.body = 'koa 12'
    ctx.body = 'koa 13'
    ctx.body = 'koa 14'
    ctx.body = 'koa 15'
})

app.use((ctx, next)=>{
    console.log('koa ceil middleware 2')
    next()
    console.log('koa floor middleware 2')
    ctx.body = 'koa 2'

})
app.use((ctx, next)=>{
    console.log('koa middleware 3')
    ctx.body = 'koa 3'
})

// koa 服务器启动成功~
// koa ceil middleware 1
// koa ceil middleware 2
// koa middleware 3
// koa floor middleware 2
// koa floor middleware 11

app.listen(9001, () => {
    console.log('koa 服务器启动成功~')
})

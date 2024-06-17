 
const Koa = require('koa')

// 创建app对象
const app = new Koa()

// // 1. 创建路由对象
const userRouter = new KoaRouter({prefix: '/users'})

userRouter.get('/login', (ctx, next)=>{
    //服务器设置cookies
    ctx.cookies.set('slogan', 'ai pin', {
        maxAge: 60*1000*5
    })
    ctx.body = "登录成功"
})


userRouter.get('/list', (ctx, next)=>{
    let sloganCookie = ctx.cookies.get('slogan')
    if(sloganCookie === 'ai pin'){
        ctx.body = "User List data"

    }else{
        ctx.body = "please login"
    }    
})
app.use(userRouter.routes())
app.use(userRouter.allowedMethods()) //如果客户端用没注册过的请求方式，则会返回 Methods Not Allowed


//启动服务器
app.listen(3000, ()=>{
    console.log('koa服务器启动成功~！')
})
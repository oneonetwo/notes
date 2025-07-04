 
const Koa = require('koa')
const KoaRouter = require('@koa/router')
const koaSession = require('koa-session')

// 创建app对象
const app = new Koa()

// // 1. 创建路由对象
const userRouter = new KoaRouter({prefix: '/users'})


const session = koaSession({
    key: 'sessionid', //session的key名字
    signed: true, //是否使用signed签名认证，防止数据被篡改  默认是true
    maxAge: 60* 30,
    httpOnly: true, //只能服务器设置，不需要js获取cookie
    rolling: true, //每次响应时，刷新session的有效期
}, app)
//加盐操作
app.keys = ['aaa', 'bbb', 'why', 'kobe']
app.use(session)

userRouter.get('/login', (ctx, next)=>{

    ctx.session.slogan = 'ai pin'
    ctx.body = "登录成功"
})


userRouter.get('/list', (ctx, next)=>{
    let sloganCookie = ctx.session.slogan
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
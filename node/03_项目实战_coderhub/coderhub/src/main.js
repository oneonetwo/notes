const KoaRouter = require('@koa/router')
const app = new (require('koa'))
const cors = require('@koa/cors')


app.use(cors({
    origin: 'http://localhost:5173',// 允许的源
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowHeaders: ['Content-type', 'Authorization'],
    credentials: true,
    maxAge: 86400
}))

const userRouter = new KoaRouter({ prefix: '/users' });

userRouter.get('/login', (ctx, next) => { 
    ctx.status = 200
    ctx.body = {
        code: 0,
        message: '请求失败'
    }
})

app.use(userRouter.routes())
app.use(userRouter.allowedMethods())


app.listen(8000, () => { 
    console.log('服务启动了')
})
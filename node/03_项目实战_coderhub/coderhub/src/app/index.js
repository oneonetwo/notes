const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const registerRouters = require('../router')
// const cors = require('@koa/cors')
// const { userRouter } = require('../router/user.router')
// const { loginRouter } = require('../router/login.router')



// 1. 创建app
const app = new Koa()



//2. 将app启动起来
app.use(bodyParser())

//3. 动态注册路由
registerRouters(app)
// app.use(userRouter.routes())
// app.use(userRouter.allowedMethods())
// app.use(loginRouter.routes())
// app.use(loginRouter.allowedMethods())


module.exports = app
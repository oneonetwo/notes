const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const cors = require('@koa/cors')
const { userRouter } = require('../router/user.router')



// 1. 创建app
const app = new Koa()



//2. 将app启动起来
app.use(bodyParser())
app.use(userRouter.routes())
app.use(userRouter.allowedMethods())


module.exports = app
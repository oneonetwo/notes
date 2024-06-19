const KoaRouter = require('@koa/router')
const loginController = require('../controller/login.controller')
const { verifyLogin } = require('../middleware/login.middleware')


const loginRouter = new KoaRouter({ prefix: '/login' })

loginRouter.post('/', verifyLogin, loginController.sign)

module.exports = {
    loginRouter
}
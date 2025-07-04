const KoaRouter = require('@koa/router')
const { verifyUser, handlePassword } = require('../middleware/user.middleware')
const userController = require('../controller/user.controller')
// 1. 创建路由对象
const userRouter = new KoaRouter({prefix: '/users'})

//2. 定义路由映射
// 2.1处理用户注册
userRouter.post('/', verifyUser, handlePassword, userController.create)

// 2.2 为用户提供头像展示
userRouter.get('/avatar/:userId', userController.showAvatarImage)

module.exports = userRouter
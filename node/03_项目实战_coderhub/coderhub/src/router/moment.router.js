const KoaRouter = require('@koa/router')
const { verifyAuth } = require('../middleware/login.middleware')
const momentController = require('../controller/moment.controller')

const momentRouter = new KoaRouter({prefix: '/moment'})
//发布一个片段
momentRouter.post('/',verifyAuth, momentController.create)
//获取片段列表 是不需要验证用户的身份的
momentRouter.get('/list', momentController.list)
//获取片段详情
momentRouter.get('/detail/:id', momentController.detailById)

module.exports = momentRouter
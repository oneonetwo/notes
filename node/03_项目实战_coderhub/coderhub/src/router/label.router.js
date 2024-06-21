const KoaRouter = require('@koa/router')
const { verifyAuth } = require('../middleware/login.middleware')
const labelController = require('../controller/label.controller')
const labelRouter = new KoaRouter({prefix: '/label'})

// 1. 创建标签
labelRouter.post('/', verifyAuth, labelController.create)
// 2. 获取标签列表
labelRouter.get('/', verifyAuth, labelController.list)

module.exports = labelRouter
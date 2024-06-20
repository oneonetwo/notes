const KoaRouter = require('@koa/router')
const { verifyAuth } = require('../middleware/login.middleware')
const momentController = require('../controller/moment.controller')
// const { verifyMomentPermission } = require('../middleware/permission.middle')
const { verifyPermission } = require('../middleware/permission.middle')

const momentRouter = new KoaRouter({prefix: '/moment'})
//发布一个片段
momentRouter.post('/',verifyAuth, momentController.create)
//获取片段列表 是不需要验证用户的身份的
momentRouter.get('/list', momentController.list)
//获取片段详情
momentRouter.get('/:momentId', momentController.detailById)
// // 修改动态
// momentRouter.patch('/:momentId', verifyAuth, verifyMomentPermission, momentController.update)
// //删除动态
// momentRouter.delete('/:momentId', verifyAuth, verifyMomentPermission, momentController.remove)
momentRouter.patch('/:momentId', verifyAuth, verifyPermission, momentController.update)
momentRouter.delete('/:momentId', verifyAuth, verifyPermission, momentController.remove)


module.exports = momentRouter
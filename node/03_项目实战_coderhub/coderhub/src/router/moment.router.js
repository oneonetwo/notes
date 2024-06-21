const KoaRouter = require('@koa/router')
const { verifyAuth } = require('../middleware/login.middleware')
const momentController = require('../controller/moment.controller')
// const { verifyMomentPermission } = require('../middleware/permission.middle')
const { verifyPermission } = require('../middleware/permission.middle')
const { verifyLabelExits } = require('../middleware/label.middleware')

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

// 5. 给动态 添加标签
/**
 *  1. 是否登录
 *  2. 验证是否有操作这个动态的权限
 *  3. 额外中间件，验证label的那么是否已经在label中
 *       1. 如果存在，那么直接使用
 *      2. 如果没有存在，那么需要先将label的name添加label表
 *  4. 最终步骤
 *      1. 所有的labels都在已经label表
 *      2. 动态2和 labels关系添加到关系表中
 */
// /moment/2/labels POST
momentRouter.post('/:momentId/labels', verifyAuth, verifyPermission, verifyLabelExits, momentController.addLabels)

module.exports = momentRouter
const KoaRouter = require('@koa/router')
const { verifyAuth } = require('../middleware/login.middleware')
const commentController = require('../controller/comment.controller')


const commentRouter = new KoaRouter({prefix: '/comment'})
//新增评论
commentRouter.post('/', verifyAuth, commentController.create)
//新增 回复评论
commentRouter.post('/reply', verifyAuth, commentController.reply)



module.exports = commentRouter
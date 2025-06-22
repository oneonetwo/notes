const commentService = require("../service/comment.service")

class CommentController {
    async create(ctx, next){
        const {id} = ctx.user
        const {content, momentId} = ctx.request.body
        const result = await  commentService.create(content, momentId, id)
        ctx.body = {
            code: 0,
            message: "评论发布成功",
            data: result
        }
    }
    async reply(ctx, next){
        const {id} = ctx.user
        const {content, commentId, momentId} = ctx.request.body
        const result = await  commentService.reply(content,momentId, commentId, id)
        ctx.body = {
            code: 0,
            message: "回复评论成功",
            data: result
        }
    }
}


module.exports = new CommentController


const momentService = require("../service/moment.service")

class MomentController{
    async create(ctx, next){
        // 1. 获取moment信息
        const { content } = ctx.request.body
        // 2. 获取用户信息
        const { id } = ctx.user
        // 3. 将动态数据入库
        const result = await momentService.create(content, id)

        ctx.body = {
            code: 1,
            message: '发表成功',
            data: result
        }
    }

    async list(ctx, next){
        //获取url的参数
        const {offset, limit } = ctx.request.query
        const result = await momentService.queryList(offset, limit)

        ctx.body = {
            code: 0,
            message: "成功",
            data: result
        }
    }

    async detailById(ctx, next){
        //获取params  /detail/:id
        const { id } = ctx.request.params
        const result = await momentService.queryById(id)
        ctx.body = {
            code: 0,
            message: "成功",
            data: result[0]
        }
    }
}


module.exports = new MomentController
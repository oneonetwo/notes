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
        const { momentId } = ctx.request.params
        const result = await momentService.queryById(momentId)
        ctx.body = {
            code: 0,
            message: "成功",
            data: result[0]
        }
    }

    // 更新
    async update(ctx, next){
        const { momentId} = ctx.request.params
        const { content } = ctx.request.body
        const result = await momentService.update(content, momentId)
        ctx.body = {
            code: 0,
            message: "修改动态成功",
            data: result
        }

    }

    // 删除某个动态
    async remove(ctx, next){
        const { momentId} = ctx.request.params
        const result = await momentService.remove(momentId)
        ctx.body = {
            code: 0,
            message: "删除动态成功",
            data: result
        }
    }
}


module.exports = new MomentController
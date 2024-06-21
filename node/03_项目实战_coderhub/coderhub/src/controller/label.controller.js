const labelService = require("../service/label.service")

class LabelController {
    async create(ctx, next){
        const {name} = ctx.request.body
        const result = await labelService.create(name)
        ctx.body = {
            code: 0,
            message: "创建标签成功",
            data: result
        }
    }
    async list(ctx, next){
        const { id, name } = ctx.request.query

        const result = await labelService.list(id, name)
        ctx.body = {
            code: 0,
            message: "创建标签成功",
            data: result
        }
    }
}


module.exports = new LabelController


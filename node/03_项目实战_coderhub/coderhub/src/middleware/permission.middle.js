const { OPERATION_IS_NOT_ALLOWED } = require("../config/error-cons")
const permissionService = require("../service/permission.service")

// const verifyMomentPermission = async (ctx, next) => {
//     // 1. 获取用户id 修改动态的id
//     const { id } = ctx.user
//     const { momentId } = ctx.params
//     // 2. 查询userId是否有momentId的权限
//     const isPermission = await permissionService.checkMoment(momentId, id)
//     if(!isPermission){
//         return ctx.app.emit('error', OPERATION_IS_NOT_ALLOWED, ctx)
//     }
//     // 3. 执行下一个中间件
//     await next()
// }

const verifyPermission = async (ctx, next) => {
    // 1. 获取用户id 修改动态的id
    const { id } = ctx.user

    // 2. 查询userId是否有momentId的权限
    // 获取资源的name/id
    const keyName = Object.keys(ctx.params)[0]
    const keyValue = ctx.params[keyName]
    const tableName = keyName.replace('Id', '')

    const isPermission = await permissionService.checkResource(tableName, keyValue, id)
    if(!isPermission){
        return ctx.app.emit('error', OPERATION_IS_NOT_ALLOWED, ctx)
    }
    // 3. 执行下一个中间件
    await next()
}
module.exports = {
    verifyPermission
}
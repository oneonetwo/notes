/*
 * @Description: 
 * @Author: yjy
 * @Date: 2024-06-15 21:43:47
 * @LastEditTime: 2024-06-16 13:10:28
 * @LastEditors: yjy
 * @Reference: 
 */
const userService = require("../service/user.service")

class UserController {
    async create(ctx, next){
        // 1. 获取用户信息
        const user = ctx.request.body
        // 2. 验证user信息
        // 2.1 验证用户名和密码是否为空
        // const [name, password] = user
        
         // 2. 将user信息保存在数据库中
        const result = await userService.create(user)

        // 3. 响应请求数据
        ctx.body = {
            message: '用户创建成功',
            data: result
        }
    }
}

module.exports = new UserController
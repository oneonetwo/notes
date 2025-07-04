/*
 * @Description: 
 * @Author: yjy
 * @Date: 2024-06-15 21:43:47
 * @LastEditTime: 2024-06-22 11:58:28
 * @LastEditors: yjy
 * @Reference: 
 */
const fs = require('fs')
const fileService = require("../service/file.service")
const userService = require("../service/user.service")
const { UPLOAD_PATH } = require('../config/path')

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
        return
    }
    async showAvatarImage(ctx, next) { 
        // 1. 获取用户的id
        const { userId } = ctx.request.params
        // 2. 获取图片信息
        const avatarInfo = await fileService.queryAvatarById(userId)
        // 3. 拿去头像字段 创建可读流
        const { filename, mimetype } = avatarInfo
        
        const stream = fs.createReadStream(`${UPLOAD_PATH}/${filename}`)
        ctx.type=mimetype //告诉浏览器时图片
        ctx.body = stream

    }

}

module.exports = new UserController
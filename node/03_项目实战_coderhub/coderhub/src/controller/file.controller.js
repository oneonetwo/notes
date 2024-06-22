const fileService = require("../service/file.service")
const userService = require("../service/user.service")
const { SERVER_HOST, SERVER_PORT} = require('../config/server')

class FileController { 
    async create(ctx, next) { 
        // 1. 获取file信息
        const { filename, mimetype, size } = ctx.request.file
        const { id } = ctx.user
        // 2. 将图片信息存储
        const result = fileService.create(filename, mimetype, size, id)

        // 3. 将头像更新在用户表中
        const avatarUrl = `${SERVER_HOST}:${SERVER_PORT}/users/avatar/${id}`
        const result2 = userService.updateUserAvatar(avatarUrl, id)


        ctx.body = {
            code: 0,
            message: '上传成功',
            data: avatarUrl
        }
    }
}

module.exports = new FileController
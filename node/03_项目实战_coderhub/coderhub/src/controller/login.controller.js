const jwt = require('jsonwebtoken')
const { PRIVATE_KEY } = require('../config/screct')

class LoginController { 
    sign(ctx, next) { 
        // 1. 获取用户信息
        const { id, name } = ctx.user
        // 2. 颁发令牌
        const token = jwt.sign({ id, name }, PRIVATE_KEY, {
            expiresIn: 60 * 60, //一小时
            algorithm: 'RS256' //非对称加密
        })

        // 3. 返回用户信息
        ctx.body = {
            code: 0,
            data: {
                token,
                id,
                name
            }
        }
    }
}

module.exports = new LoginController
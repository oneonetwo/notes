const { NAME_OR_PASSWORD_IS_REQUIRED, PASSWORD_IS_INCORRECT, NAME_IS_NOT_EXISTS, UNAUTHORIZED } = require("../config/error-cons")
const jwt = require('jsonwebtoken')
const userService = require("../service/user.service")
const md5password = require("../utils/md5-password")
const { PUBLIC_KEY } = require("../config/screct")

const verifyLogin = async (ctx, next) => {
    const { name, password } = ctx.request.body
    if(!name || !password){
        return ctx.app.emit('error', NAME_OR_PASSWORD_IS_REQUIRED, ctx)
        
    }
    //用户不存在
    const user = await userService.queryUsersByName(name)
    console.log('user', user)
    if (!user[0]) { 
        return ctx.app.emit('error', NAME_IS_NOT_EXISTS, ctx)
    } 
    console.log('md5password(password)', md5password(password))
    //验证密码不正确
    if (user[0].password !== md5password(password)) { 
        return ctx.app.emit('error', PASSWORD_IS_INCORRECT, ctx)
    }
    //验证成功进行token的颁发
    ctx.user = user[0]
    // 3. 执行下一个中间件
    await next()
}

const verifyAuth = async (ctx, next) => {
    const { authorization } = ctx.headers
    if(!authorization){
        ctx.app.emit('error', UNAUTHORIZED, ctx)
        return
    }
    const token = authorization.replace('Bearer ', '')
    try {
        const result = jwt.verify(token, PUBLIC_KEY, {
            algorithms: ['RS256']
        })
        ctx.user = result
        await next()
    } catch (error) {
        ctx.app.emit('error', UNAUTHORIZED, ctx)        
    }
}

module.exports = {
    verifyLogin,
    verifyAuth
}
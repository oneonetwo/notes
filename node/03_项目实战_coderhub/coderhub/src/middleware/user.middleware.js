const { NAME_OR_PASSWORD_IS_REQUIRED, NAME_IS_ALREADY_EXISTS } = require("../config/error-cons")
const userService = require("../service/user.service")
const md5password = require("../utils/md5-password")

const verifyUser = async(ctx, next)=>{
    
    const { name, password } = ctx.request.body
    if(!name || !password){
        // ctx.body = {
        //     code: -1001,
        //     message: '用户名或者密码不能为空'
        // }
        return ctx.app.emit('error', NAME_OR_PASSWORD_IS_REQUIRED, ctx)
        
    }
    //用户名重复的验证
    const user = await userService.queryUsersByName(name)
    if(user.length){
        // ctx.body = {
        //     code: -1002,
        //     message: '用户名已经被占用，不能使用~'
        // }
        return ctx.app.emit('error', NAME_IS_ALREADY_EXISTS, ctx)
        
    } 
    // 3. 执行下一个中间件
    await next()
}

// 用户密码处理
const handlePassword = async (ctx, next) => { 
    // 1. 取出密码
    const { password } = ctx.request.body
    // 2. 对密码进行加密
    ctx.request.body.password = md5password(password)
    // 3. 执行下一个中间件
    await next()
}

module.exports = {
    verifyUser,
    handlePassword
}
const userService = require("../service/user.service")

const verifyUser = async(ctx, next)=>{
    
    const { name, password } = ctx.request.body
    if(!name || !password){
        ctx.body = {
            code: -1001,
            message: '用户名或者密码不能为空'
        }
        return
    }
    //用户名重复的验证
    const user = await userService.queryUsersByName(name)
    if(user.length){
        ctx.body = {
            code: -1002,
            message: '用户名已经被占用，不能使用~'
        }
        return
    } 
    // 3. 执行下一个中间件
    await next()
}
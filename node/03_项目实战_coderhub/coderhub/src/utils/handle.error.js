const app = require('../app')
const { NAME_IS_ALREADY_EXISTS, NAME_OR_PASSWORD_IS_REQUIRED, NAME_IS_NOT_EXISTS, PASSWORD_IS_INCORRECT, UNAUTHORIZED, OPERATION_IS_NOT_ALLOWED } = require('../config/error-cons')

app.on('error', (error, ctx) => { 
    let code = 0
    let message = ''
    switch (error) { 
        case NAME_OR_PASSWORD_IS_REQUIRED:
            code = -1001
            message = '用户名或者密码不能为空'
            break
        case NAME_IS_ALREADY_EXISTS:
            code = -1002
            message = '用户名已经被占用'
            break
        case NAME_IS_NOT_EXISTS:
            code = -1003
            message = '用户名不存在'
            break
        case PASSWORD_IS_INCORRECT:
            code = -1004
            message = '密码错误'
            break
        case UNAUTHORIZED:
            code = -404
            message = '未认证或token已过期'
            break
        case OPERATION_IS_NOT_ALLOWED:
            code = -403
            message = '没有操作权限'
            break
    }
    ctx.body = {
        code,
        message
    }
    
})
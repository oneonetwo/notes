const app = require('../app')
const { NAME_IS_ALREADY_EXISTS, NAME_OR_PASSWORD_IS_REQUIRED } = require('../config/error-cons')

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
    }
    ctx.body = {
        code,
        message
    }
    
})
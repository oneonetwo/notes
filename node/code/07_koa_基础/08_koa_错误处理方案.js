/**
 * koa的next不能传参 借助emit来统一处理
 * 
 * 
 */
const fs = require('fs')
const app = new require('koa')
const koaRouter = require('@koa/router')

const router = new koaRouter({prefix: '/login'})

let isAuth = false;
router.get('/', (ctx, next)=>{
    if(isAuth){
        ctx.body = {
            code: 0,
            message: 'success'
        }
    }else{
        //触发eventEmitter
        ctx.app.emit('error', -1001, ctx)
    }
})

//在error-handle.js页面处理
app.on('error', (code, ctx)=>{
    let message = ''
    switch(errcode){
        case -1001:
            message = '账号或者密码错误'
            break
        case -1002:
            message = '参数不正存'
            break
        case -1003:
            message = '未授权'
            break
    }
    ctx.body = {
        code,
        message
    }
})

app.use(router.routes())
app.use(router.allowedMethods())


app.listen(3000, _=>{
    console.log('服务创建')
})
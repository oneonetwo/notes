/**
 * Koa并没有提供methods的方式注册中间件也没提供path中间件来匹配路径
 * 那么如何将路径和method分离尼？
 *  - 方式一： 根据request自己判断
 *  - 方式二： 使用第三方路由中间件
 * 
 */

const Koa = require('koa')
// 创建app对象
const app = new Koa()

app.use(async(ctx, next)=>{
    if(ctx.path === 'user'){
        if(ctx.method === 'get'){
            ctx.body = 'user data list'
        }else if(ctx.method === 'post'){
            ctx.body = 'create user success~~'
        }
    }else if(ctx.path === 'home'){
        ctx.body = 'hello'
    }
})



//启动服务器
app.listen(3000, ()=>{
    console.log('koa服务器启动成功~！')
})
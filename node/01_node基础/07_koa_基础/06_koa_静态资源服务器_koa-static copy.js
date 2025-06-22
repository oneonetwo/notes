/**
 * 借助koa-static三方库
 * 
 */

const app = new require('koa')
const static = require('koa-static')

app.use(static('./uploads'))
app.use(static('./build'))



app.listen(3000, _=>{
    console.log('服务创建')
})
/**
 * 1. body类型是 string类型
 * 2. body类型是 buffer类型  Buffer.form('123')
 * 3. body类型是 stream类型  文件流
 * 4. body类型是(array/object) 使用最多
 * 5. null 什么都不返回 自动设置 对应httpCode 204 (no content)
 * 6. 如果response.status尚未设置，Koa会自动设置状态为200或者204   主要设置 ctx.status = 200
 */
const fs = require('fs')
const app = new require('koa')
const koaRouter = require('@koa/router')

const router = new koaRouter({prefix: '/users'})


router.get('/', (ctx, next)=>{
// 1. body类型是 string类型
    ctx.body = 'hello world'
// 2. body类型是 buffer类型  Buffer.form('123')
    ctx.body = Buffer.from('hello world')  //默认是utf-8
// 3. body类型是 stream类型  文件流
    const readStream = fs.createReadStream('./uploads/122.png')
    ctx.type = 'image/jpeg' //需要告诉浏览器type不然展示的buffer数据
    ctx.body = readStream
// 4. body类型是(array/object) 使用最多
    ctx.body = {
        code: 0,
        data: [{}]
    }
// 5. null 什么都不返回 自动设置 对应httpCode 204 (no content)
    ctx.body = null
// 6. 如果response.status尚未设置，Koa会自动设置状态为200或者204   主要设置 ctx.status = 200
    ctx.status = 200
    ctx.body = {
        code: 0,
        message: 'success',
        data: []
    }
})


app.use(router.routes())
app.use(router.allowedMethods())



app.listen(3000, _=>{
    console.log('服务创建')
})
/**
 * koa处理客户端请求的5种方式
 * 1. get params方式 比如 /:id
 * 2. get query方式 比如 ?name=jike&id=1
 * 3. post json方式 比如 {id:1, name: 'sd'}   需要三方库 koa-bodyparser
 * 4. post x-www-form-urlencoded  用的不多  需要三方库 koa-bodyparser
 * 5. post form-data        @koa/multer  multer
 */

const Koa = require('koa')
const KoaRouter = require('@koa/router')
const bodyparser = require('koa-bodyparser')
const multer = require('@koa/multer')

// 创建app对象
const app = new Koa()

// 使用第三方中间件解析body数据
app.use(bodyparser())
const formParser = multer()


// 创建路由对象
const userRouter = new KoaRouter({prefix: '/users'})




// * 1. get params方式 比如 /:id

userRouter.get('/:id', (ctx, next)=>{
    const id = ctx.params.id
    ctx.body = 'user list data' + id
})

// // * 2. get query方式 比如 ?name=jike&id=1
userRouter.get('/', (ctx, next)=>{
    console.log('query', ctx.query) //{ id: '1', name: '123213' }
    console.log('querystring', ctx.querystring) //id=1&name=123213
    ctx.body = 'qqqq'
})
// * 3. post json方式 比如 {id:1, name: 'sd'}  使用bodyparser解析
userRouter.post('/json', (ctx, next)=>{
    console.log(ctx.request.body)
    ctx.body = 'qqqq'
})
// * 4. post x-www-form-urlencoded  用的不多 使用bodyparser解析
userRouter.post('/urlencoded', (ctx, next)=>{
    console.log(ctx.request.body)

    ctx.body = 'qqqq'
    
})
// * 5. post form-data   添加中间件formParser
userRouter.post('/formdata', formParser.any(), (ctx, next)=>{
    console.log(ctx.request.body) //undefined 解析后： {name: 'carzy', age: '22'}
    ctx.body = 'qqqq'
    
})


app.use(userRouter.routes())
app.use(userRouter.allowedMethods()) //如果客户端用没注册过的请求方式，则会返回 Methods Not Allowed


//启动服务器
app.listen(3000, ()=>{
    console.log('koa服务器启动成功~！')
})
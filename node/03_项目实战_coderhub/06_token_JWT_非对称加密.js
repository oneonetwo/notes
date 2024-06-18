/*
 * @Description: 
 * @Author: yjy
 * @Date: 2024-06-18 22:05:09
 * @LastEditTime: 2024-06-18 23:37:58
 * @LastEditors: yjy
 * @Reference: 
 */
/**
 * 1. HS256加密算法用单密钥暴露是非常危险的
 *  1.1 比如在分布式系统中，每个子系统都需要获取到密钥
 *  1.2 拿到这个密钥后这个子系统可以发布令牌，也可以验证令牌
 *  1.3 但是对于一些资源服务器来说，他们只需要有验证令牌的能力就行了
 * 2. 这个时候我们可以使用非对称加密，RS256
 *  2.1 私钥private key: 用于发布令牌
 *  2.2 公钥public key: 用于验证令牌
 * 3. 我们可以使用openssl来生成一对私钥和公钥
 *  3.1 mac使用terminal window使用git bash
 *  3.2 输入openssl进入命令行，然后输入生成私钥：genrsa - out private.key 1024
 *  3.3 生成公钥：openssl rsa -in private.key -pubout -out public.key
 */

const fs = require('fs') 
const Koa = require('koa')
const KoaRouter = require('@koa/router')
// 引入 jsonwebtokne
const jwt = require('jsonwebtoken')

const app = new Koa()

const userRouter = new KoaRouter({prefix: '/users'})
// const secretKey = 'this is a secretkey' 
const privateKey = fs.readFileSync('./keys/private.key')
const publicKey = fs.readFileSync('./keys/public.key')


userRouter.get('/login', (ctx, next)=>{
    // 1. 颁发token
    const payload = {
        id: 111,
        name: 'why'
    }
    const token = jwt.sign(payload, privateKey, {
        expiresIn: 6000,  //6000秒
        algorithm: 'RS256'
    })
    ctx.body = {
        code: 0,
        token,
        message: '登录成功, 可以进行其他的操作'
    }
})


userRouter.get('/list', (ctx, next)=>{
    // 1. 获取客户端携带过来的token
    const authorization = ctx.headers.authorization
    const token = authorization.replace('Bearer ', '')
    console.log(token)
    // 2. 验证token
    try {
        const result = jwt.verify(token, publicKey, {
                    algorithms: ['RS256']
        })
        console.log(result)
        ctx.body = {
            code: 0,
            data: [
                { id: 111, name: 'why' },
                { id: 111, name: '222' },
                { id: 222, name: 'adf' }
            ]
        }
    } catch (error) {
        ctx.body = {
            code: -1010,
            message: "验证失败"
        }
    }
    

})
app.use(userRouter.routes())
app.use(userRouter.allowedMethods()) //如果客户端用没注册过的请求方式，则会返回 Methods Not Allowed


//启动服务器
app.listen(3000, ()=>{
    console.log('koa服务器启动成功~！')
})


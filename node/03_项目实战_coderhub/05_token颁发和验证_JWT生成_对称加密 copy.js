/*
 * @Description: 
 * @Author: yjy
 * @Date: 2024-06-18 22:05:09
 * @LastEditTime: 2025-07-03 14:41:33
 * @LastEditors: jy
 * @Reference: 
 */
/**
 * 1. session和cookie的缺点和局限性？
 *      1. session和cookie 对于分布式系统和服务器集群中不能正确传输
 *      2. cookie是明文传输，存在安全性问题
 * 2. token
 *      1. 就是令牌
 *      2. 服务端给客户端颁发的一个令牌
 *      3. 后续用户访问一些接口或者资源的凭证
 *      4. 根据这个凭证来判断用户是否有权限来访问
 * 3. 使用token的两个重要的步骤
 *      1. 生成token: 登录时，办法token
 *      2. 验证token: 访问某些资源或者接口时，验证token
 * **********************************************************************
 * token 设计目的： 不需要服务器端存储状态， 安全的传递非敏感信息
 * **********************************************************************
 * 一. JWT实现token机制（JSON web Token）
 * - 三部分组成 header(头部)  payload(荷载)  signature(签名)
 * 1. header
 *  1.1 alg: 采用的加密算法，默认是HMAC SHA256(HS256), 是对称加密算法，采用同一个密钥惊醒加密和解密 
 *  1.2 typ: JWT， 固定值，通常都写成JWT即可
 *  1.3 会通过base64Url算法进行编码
 * 2. payload
 *  2.1 携带的数据，比如我们可以将用户的id和name放到payload中，
 *  2.2 默认也会携带iat(issued at), 令牌的签发时间
 *  2.3 我们也会设置过期时间：exp(expiration time)
 *  2.4 会通过base64url算法进行编码
 * 3. signature
 *  3.1 设置一个secretKey 通过将前两个的结果合并后进行HMACSHA256的算法
 *  3.2 HMACSHA256(base64Url(header)+.+base64Url(payload), secretKey)
 *  3.3 当时如果secretKey暴露是一件非常危险的事情，因为之后就可以模拟办法token,也可以解密token * 
 * 
 */


const Koa = require('koa')
const KoaRouter = require('@koa/router')
// 引入 jsonwebtokne
const jwt = require('jsonwebtoken')

const app = new Koa()

const userRouter = new KoaRouter({prefix: '/users'})
const secretKey = 'this is a secretkey' 



userRouter.get('/login', (ctx, next)=>{
    console.log(ctx)
    // 1. 颁发token
    const payload = {
        id: 111,
        name: 'why'
    }
    const token = jwt.sign(payload, secretKey, {
        expiresIn: 6000  //6000秒
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
        const result = jwt.verify(token, secretKey)
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


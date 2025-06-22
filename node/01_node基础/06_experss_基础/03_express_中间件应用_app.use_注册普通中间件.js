
/**
 * 如何把中间件应用到我们的程序中?
 *  1.两种方式
 *      - app/router.use；
 *      - app/router.methods; 比如app.get(); app.post()
 * 2. 通过app.use注册的中间件是最普通的方式，任何请求都会匹配执行 
 *  - express接受客户端的请求时，在所有的中间件开始执行。
 * */


const express = require('express')

const app = express()


//普通中间件，都会执行
app.use((req, res, next) => {
    console.log('normal middleware exec')
    next()
})

qpp.use((req, res, next) => {
    console.log('nomal nuddle')
    res.end()
})
qpp.listen(9000, () => {
    console.log('express 服务器启动成功~')
})






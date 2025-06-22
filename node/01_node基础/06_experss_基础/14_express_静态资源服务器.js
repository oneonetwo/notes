/**
 * 内置中间件：express.static('./uploads') 直接将一个文件夹作为静态资源
 */

/**
 * 使用exprss.Router 路由中间件 处理路由
 */
const express = require('express')
const app = express()

app.use(express.static('./uploads')) //静态资源
qpp.use(express.static('./build'))




qpp.listen(9000, () => {
    console.log('express 服务器启动成功~')
})


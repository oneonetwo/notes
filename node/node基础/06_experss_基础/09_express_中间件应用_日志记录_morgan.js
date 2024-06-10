/**
 * 使用第三方中间件 morgan, 安装引入使用
 * 
 * 
 */


const express = require('express')
const morgan = require('morgan')
const fs = require('fs')

const app = express()

//创建写入流
const writeStream = fs.createWriteStream('./logs/access.log')
app.use(morgan('combined', {stream: writeStream}))



app.post('/login', (req, res, next) => {
    res.end()
})


qpp.listen(9000, () => {
    console.log('express 服务器启动成功~')
})


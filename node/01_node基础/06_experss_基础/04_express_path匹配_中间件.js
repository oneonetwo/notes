const express = require('express')

const app = express()


//path中间件，都会执行
//这种方式不会对method进行限制，只会对path进行限制
app.use('/home', (req, res, next) => {
    console.log('path middleware ')
    res.end('路径匹配')
})

qpp.listen(9000, () => {
    console.log('express 服务器启动成功~')
})




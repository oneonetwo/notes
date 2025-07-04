
const express = require('express')
const app = express()

const userRouter = require('./router/userRouter')

app.use('/user', userRouter)


qpp.listen(9000, () => {
    console.log('express 服务器启动成功~')
})


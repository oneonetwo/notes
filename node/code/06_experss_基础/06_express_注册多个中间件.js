const express = require('express')

const app = express()


//可以注册多个执行函数，主要看next,才会去执行
// 复杂操作进行拆分   验证身份  数据库操作
app.get('/home', (req, res, next) => {
    console.log('match /home get method middleware')
    next()
}, (req,res, next)=>{
    console.log('middleware second')
    next()
}, (req, res, next) => {
    console.log('meddlewate end')
    res.end()
})

qpp.listen(9000, () => {
    console.log('express 服务器启动成功~')
})




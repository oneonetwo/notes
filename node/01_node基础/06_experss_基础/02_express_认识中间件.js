/**
 * 中间件中可以执行哪些任务尼？
 * 1. 执行任何代码
 * 2. 更改请求（request）和响应（response）对象
 * 3. 结束请求-响应周期（返回数据）
 * 4. 调用栈中的下一个中间件
 * 如果当期那中间件没有结束请求-响应周期，则必须调用next()将控制权传递给下一个中间件功能。否则，请求被挂起。
 */
const express = require('express')

const app = express()

//给express创建一个app传入一个回调函数，这个回到函数就是中间件 middleware
app.post('/login', (req, res, next) => {
    //1. 执行任何代码

    // 2. 中间可以修改res和req对象
    req.name = 'jingyaun'
    // 3. 结束请求-响应周期（返回数据）
    res.end() //或者使用 res.json({id:1,name:'nihao'})
    //4.调用栈中的下一个中间件
    next()
})
//中间件
app.use((req, res, next) => {
    console.log('second middleware exec')
})

qpp.listen(9000, () => {
    console.log('express 服务器启动成功~')
})


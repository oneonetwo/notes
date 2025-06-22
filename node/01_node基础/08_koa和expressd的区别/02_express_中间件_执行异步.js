/**
 * 如果next内有异步函数，其他的函数是等不到这个结果的，默认不支持。
 */

const express = require('express')

const app = express()

//测试代码
const testAsyncFun = ()=>{
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve('abc')
        }, 500)
    })
}


app.use((req, res, next)=>{
    console.log('express middleware 1')
    next()
    console.log('express middleware 11')
    res.json('express hello')
})

app.use((req, res, next)=>{
    console.log('express middleware 2')
    next()

})
app.use(async (req, res, next)=>{
    console.log('express middleware 3')
    res.msg = await testAsyncFun()
})



app.listen(9000, () => {
    console.log('express 服务器启动成功~')
})


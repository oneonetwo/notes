
/**
 * 服务器返回数据的几种方式
 * 1. res.end('sd')
 * 
 * 2. json中可以传入很多类型 object, array, string, boolean, number, null 等都会被转成json格式返回
 *  res.json({  
 *      code: 200,
 *      message: 'success',
 *      data: ...
 *     }) //可以传任意类型
 *        
 * 3. res.status(200) 设置状态码。
 * 更多
 * https://www.expressjs.com.cn/4x/api.html#res
 * 
 */

const express = require('express')

const app = express()


// 1. 解析queryString
app.get('/home/list', (req, res, next) => {
    const queryInfo = req.query
    console.log(queryInfo)
    res.end('data list 数据')
})
// 2. 解析params   /users/:id
app.get('/users/:id', (req, res, next) => {
    const id = req.params.id
    console.log(id)
    res.end('data list 数据')
})


qpp.listen(9000, () => {
    console.log('express 服务器启动成功~')
})


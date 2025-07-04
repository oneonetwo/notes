/**
 * 如果是x-www-form-urlencoded传的数据，应该怎么解析？
 * 
 * 
 */


const express = require('express')

const app = express()


app.use(express.json()) //解析客户端的json数据


// 解析content-type: application/x-www-form-urlencoded传过来的数据时，默认使用node内置使用querystring模块，querystring模块已经废弃所以会弹出warning, 可以使用extended: true来解决(使用qs三方库来解决)
app.use(express.urlencoded({extended: true})) //解析客户端传的urlencoded  

app.post('/login', (req, res, next) => {
    res.end()
})


qpp.listen(9000, () => {
    console.log('express 服务器启动成功~')
})


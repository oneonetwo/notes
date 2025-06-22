const express = require('express')

const app = express()

//方式一: 自己解析处理body的数据
app.use((req, res, next) => {
    if(req.headers['content-type'] === 'application/json'){
        req.on('data', data=>{
            const jsonData = JSON.parse(data.toString())
            req.body = jsonInfo
        })
        req.on('end', ()=>{
            next()
        })
    }else{
        next()
    }
})
//方式二：直接使用express的中间件处理
app.use(express.json()) //跟方式一处理的结果一样 

app.post('/login', (req, res, next) => {
    //直接拿到数据处理逻辑
    console.log(req.body)
    res.end()
})
app.post('register', (req, res, next)=>{
    console.log(req.body)
    res.end()
})

qpp.listen(9000, () => {
    console.log('express 服务器启动成功~')
})




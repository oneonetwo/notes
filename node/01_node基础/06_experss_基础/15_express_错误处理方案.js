/**
 *  服务器给客户端返回错误的方案
 *  两种方案
 *  1. 返回http的错误码 res.status(401) res.json('未授权');
 *  2. 返回状态码是200，信息中会包含code/message res.json({code: -1001, message:'未授权'})
 * 
 */


const express = require('express')
const app = express()

app.use(express.json()) //处理post的body数据
app.post('/login', (req, res, next)=>{
    const {username, password} = req.body

    if(!username || !password){
        next(-1001)
    }else if(username!=='1' || password !== '123'){
        next(-1002)
    }else{
        res.json({
            code: 0,
            message: '登录成功，欢迎回来',
            token: '323dfagadsf123'
        })
    }
})

app.use((errCode, req, res, next)=>{
    let code = errCode
    let message = '未知错误'
    switch(code){
        case '-1001':
            message = '没输入用户名和密码'
            break
        case '-1002':
            message = '用户名或者密码错误'
            break
        default:
            break
    }
    res.json({code, message})
})




qpp.listen(9000, () => {
    console.log('express 服务器启动成功~')
})










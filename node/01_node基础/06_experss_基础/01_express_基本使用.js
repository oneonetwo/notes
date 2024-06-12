/**
 * Express安装
 * 1. 方式一：通过express提供的脚手架
 *      - 安装脚手架 npm install -g express-generator
 *      - 创建项目  express express-demo
 *      - 安装依赖 npm install 
 *      - 启动项目 node bin/www
 * 2. 方式二：自己搭建express应用结构
 *      - npm init -y
 * 
 * 基本使用
 * 1. 请求路径用 /users/:userId
 * 2. req.params.userId
 * 3. res.json()
 */

const express = require('express')
// 1.创建express服务器
const app = express()
app.post('/login', (req, res) => {
    res.end('登录成功，欢迎回来')
})
app.get('/home', () => {
    res.end('首页信息')
})
// 2. 设置监听
app.listen(9000, () => {
    console.log('express 服务器启动成功')
})
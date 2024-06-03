/**
 * 使用exprss.Router 路由中间件 处理路由
 */
const express = require('express')
const app = express()
// 1. 用户相关接口
app.get('users', (req, res, next)=>{})
app.get('users/:id', (req, res, next)=>{})
app.post('/user', (req, res, next)=>{})
app.delete('/user/:id', (req, res, next)=>{})
app.patch('/users/:id', (req, res, next)=>{})

//2. 将用户相关的接口定义在单独的路由对象中
const router = express.Router()
router.get('/', (req, res, next)=>{
    res.json('用户列表数据')
})
router.get('/:id', (req, res, next)=>{
    const id = req.params.id
    res.json('用户详情')
})
router.post('/', (req, res, next)=>{
    res.json('创建用户成功')
})
router.delete('/:id', (req, res, next)=>{
    const id = req.params.id
    res.json('删除一个用户数据', id)
})
router.patch('/:id', (req, res, next)=>{
    const id = req.params.id
    res.json('修改一个用户数据', id)
})
app.use('/user', router)




qpp.listen(9000, () => {
    console.log('express 服务器启动成功~')
})


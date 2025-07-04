
const express = require('express')
const app = express()

//创建路由对象
const router = express.Router()
//创建路由对应的映射接口
router.get('/', (req, res, next) => {
    res.json('用户列表数据')
})
router.get('/:id', (req, res, next) => {
    const id = req.params.id
    res.json('用户详情')
})
router.post('/', (req, res, next) => {
    res.json('创建用户成功')
})
router.delete('/:id', (req, res, next) => {
    const id = req.params.id
    res.json('删除一个用户数据', id)
})
router.patch('/:id', (req, res, next) => {
    const id = req.params.id
    res.json('修改一个用户数据', id)
})
module.exports = userRouter



/**
 * 多文件上传
 * 用于处理 multipart/form-data 请求
 */

const express = require('express')
const multer = require('multer')

const app = express()

//1.创建multer中间件  这种还未完成，保存的文件没有后缀，打不开
// const upload = multer({
//     dest: './uploads' //上传的文件存放路径
// })
//保存完整的文件,指定文件名称和后缀
const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, callback){
            //目标路径
            callback(null, './uploads')
        },
        filename(req, file, callback){
            //设置文件名称
            callback(null, Date.now()+'_'+file.originalname)
        }
    })
})

//2.添加使用upload中间件，进行当文件摘取
//单文件使用single方法 参数名avatar
app.post('/upload', upload.single('avatar'), (req, res, next) => {
    console.log(req.file) //属性可以查看拿到的文件
    res.end()
})

//多张图上传 参数名photos maxCount最大上传数
app.post('/photos', upload.array('photos', 10), (req, res, next)=>{
    console.log(res.files)
    res.end('多照片上传成功')
})


qpp.listen(9000, () => {
    console.log('express 服务器启动成功~')
})


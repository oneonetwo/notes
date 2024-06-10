/**
 * 跟express 用的库 是一样的
 * 
 * 
 * 
 * 
 * 
 */

const app = new require('koa')
const KoaRouter = require('@koa/router')
const multer = require('@koa/multer')


const router = new KoaRouter({prefix: '/upload'})

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb){
            cb(null, './uploads')
        },
        filename(req, file, cb){
            cb(null, Date.now()+'_'+file.originalname)
        }
    })
})



router.get('/avatar', upload.single('file'), (ctx, next)=>{
    console.log(ctx.request.file) //文件
    res.body = '上传成功'
})

router.get('/photos', upload.array('files'), (ctx, next)=>{
    console.log(ctx.request.files) //文件
    res.body = '上传成功'
})

app.use(router.routes())
app.use(router.allowedMethods())


app.listen(300, _=>{
    console.log('服务创建')
})
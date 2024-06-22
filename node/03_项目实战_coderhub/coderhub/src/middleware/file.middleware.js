/*
 * @Description: 
 * @Author: yjy
 * @Date: 2024-06-22 10:52:21
 * @LastEditTime: 2024-06-22 11:45:43
 * @LastEditors: yjy
 * @Reference: 
 */
const multer = require('@koa/multer')
const { UPLOAD_PATH } = require('../config/path')

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, UPLOAD_PATH) //文件存储路径
        },
        filename(req, file, cb) {
            cb(null, Date.now() + '_' + file.originalname)
        }
    }),
    // dest: './uploads'
})

const hanelUpload = upload.single('avatar')

module.exports = {
    hanelUpload
}
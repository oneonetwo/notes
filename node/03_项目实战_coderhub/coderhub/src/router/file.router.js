const fs = require('fs')
const FileRouter = require('@koa/router')

const { verifyAuth } = require('../middleware/login.middleware')
const { hanelUpload } = require('../middleware/file.middleware')
const fileController = require('../controller/file.controller')

const fileRouter = new FileRouter({ prefix: '/file' })

fileRouter.post('/', verifyAuth, hanelUpload, fileController.create)


module.exports = fileRouter
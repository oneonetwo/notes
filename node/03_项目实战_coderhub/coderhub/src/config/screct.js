const fs = require('fs')
const path = require('path')

// 路径是启动文件的相对路径
// const PRIVATE_KEY = fs.readFileSync('./src/config/keys/private.key')
// const PUBLIC_KEY = fs.readFileSync('./src/config/keys/public.key')
// __dirname 程序 当前路径
const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, './keys/private.key'))
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, './keys/public.key'))

module.exports = {
    PRIVATE_KEY,
    PUBLIC_KEY
}
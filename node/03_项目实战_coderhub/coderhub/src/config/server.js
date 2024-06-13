const dotenv = require('dotenv')
dotenv.config()
console.log(process.env.SERVER_PORT)
//会包含所有的变量
module.exports = {
    SERVER_PORT
} = process.env
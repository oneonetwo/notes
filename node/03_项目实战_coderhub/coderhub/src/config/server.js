/*
 * @Description: 
 * @Author: yjy
 * @Date: 2024-06-15 21:43:47
 * @LastEditTime: 2024-06-22 12:05:28
 * @LastEditors: yjy
 * @Reference: 
 */
const dotenv = require('dotenv')
dotenv.config()
//会包含所有的变量
module.exports = {
    SERVER_PORT,
    SERVER_HOST
} = process.env
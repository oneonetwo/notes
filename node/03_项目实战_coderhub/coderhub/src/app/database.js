const mysql = require('mysql2')
// 1. 创建链接池
const connectionPool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    database: 'music_db',
    user: 'root',
    password: 'root',
    connectionLimit: 5
})


// 2.获取链接是否成功
connectionPool.getConnection((err, connection) =>{
    // 1.判断是否有错误信息
    if(err){
        console.log('获取链接失败',  err)
        return
    }
    // 2.获取conntction,和数据库建立链接
    connection.connect(err=>{
        if(err){
            console.log('和数据库交互失败', err)
        }else{
            console.log('数据库链接成功，可操作')
        }
    })

})

const connection = connectionPool.promise()
module.exports = connection


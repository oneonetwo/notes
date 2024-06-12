const mysql = require('mysql2')

// 1. 创建链接
const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'music_db'
});

// 2. 执行sql语句
const statement = 'SELECT * FROM `students`;'
connection.query(statement, (err, values, fields) => { 
    if (err) { 
        console.log('查询失败', err)
        return
    }
    console.log('valuse', values) //返回查询数据
    console.log('fields', fields) //返回字段
})
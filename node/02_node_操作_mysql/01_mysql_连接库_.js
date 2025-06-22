const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'music_db'
});

const statement = `inset into products set ?;`
const phoneJSON = require('./phone.json')

for (let phone of phoneJSON) { 
    connection.query(statement, phone)
 }

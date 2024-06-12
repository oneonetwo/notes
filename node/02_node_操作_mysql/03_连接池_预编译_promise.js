/**
 * 1. （Prepared Statement）预编译语句
 *      1. 提高性能： 将语句模块发送给mysql,然后Mysql编译（解析，优化，转换）语句模块，并且存储它但是不执行，之后我们在真正的执行会给？提供实际的参数才会执行，就算多次执行，也只会编译一次，所以性能是更高的。 
 *      2. 防止SQL注入：之后传入的值不能像模块引擎那样就编译，那么一些SQL注入的内容不会被执行，or 1=1 不会被执行；
 * 2. Connection Pools 
 *      - 我们创建了一个连接（connection）, 但是如果我们有多个请求，该链接可能正在被占用，那么我们是否需要每次一个请求都去创建一个新的链接尼？
 *      1. 事实上，mysql2给我们提工了连接池
 *      2. 连接池可以在需要的时候自动创建连接，并且在创建的时候不会被销毁，会放在连接池中，后续可以继续使用；
 *      3. 我们可以在创还能连接池的时候设置LIMIT, 就是创建的最大个数；
 * 3. promise使用
 *      - 目前在JavaScript开发中我们更习惯Promise和await, async的方式，mysql2同样是支持的
 * 
 * 
 * 
 */
// 1. prepared 预编译
const statement = 'SELECT * FROM products WHERE price > ? and brand = ?;'
connection.execute(statement, [1000, '华为'], (err, results) => {
    console.log(results)
})
// 链接吃
const connectionPool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    database: 'music_db',
    user: 'root',
    password: 'root',
    connectionLimit: 5
})

connectionPool.promise().execute(statement, [1000, '华为']).then(res => {
    let [values, fields] = res;
    console.log(res)
}).catch(err => {
    console.log(err)
})
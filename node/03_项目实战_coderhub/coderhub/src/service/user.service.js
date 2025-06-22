const connection = require("../app/database")

class UserService {
    async create(user){
        // console.log('将用户数据放在数据库中')
        // connection.execute() //执行sql
        // 1. 获取用户信息
        const {name, password} = user
        // 2. 拼接statement
        const statement = 'insert into `user` (name, password) values (?, ?);'
        // 3. 执行sql
        const [ result ] = await connection.execute(statement, [name, password])
        return result
    }
    async queryUsersByName(name){
        const statement = 'select * from `user` where name = ?;'
        const [values, fields] = await connection.execute(statement, [name])
        return values
    }
    async updateUserAvatar(avatarUrl, userId) {
        const statement = 'UPDATE user SET avatar_url = ? WHERE id = ?;'
        // 3. 执行sql
        const [result] = await connection.execute(statement, [avatarUrl, userId])
        return result
    }
}

module.exports = new UserService
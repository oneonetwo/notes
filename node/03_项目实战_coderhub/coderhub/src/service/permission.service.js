const connection = require("../app/database")

class PermissionService{

    // async checkMoment(momentId, id){
    //     // 检查当前用户下的当前动态
    //     const statement = 'SELECT * FROM moment WHERE user_id=? AND id = ?'
    //     const [rows, fields] = await connection.execute(statement, [id, momentId])
    //     return !!rows.length
    // }

    async checkResource(tableName, keyValue, userId){
        // 检查当前用户下的当前动态
        const statement = `SELECT * FROM ${tableName} WHERE user_id=? AND id = ?`
        const [rows, fields] = await connection.execute(statement, [userId, keyValue])
        return !!rows.length
    }
}


module.exports = new PermissionService
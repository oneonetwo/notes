const connection = require('../app/database')

class CommentService{
    async create(content, momentId, userId){
        const statement = `INSERT INTO comment (content, moment_id, user_id) VALUES (?, ?, ?);`
        const [ result ] = await connection.execute(statement, [content, momentId, userId])
        return result
    }

    async reply(content, momentId, commentId, userId){
        const statement = `INSERT INTO comment (content, moment_id, comment_id, user_id) VALUES (?, ?, ?, ?);`
        const [ result ] = await connection.execute(statement, [content, momentId, commentId, userId])
        return result
    }

    async queryList(limit=10, offset=0){
        // const statement = 'SELECT * FROM `moment` LIMIT ? OFFSET ?;'
        const statement = "SELECT m.id, m.content, m.createAt createTime, m.updateAt updateTime, JSON_OBJECT('id', u.id, 'name', u.name, 'createTime', u.createAt, 'updateTime', u.updateAt) AS user FROM `moment` m LEFT JOIN `user` u ON  m.user_id = u.id LIMIT ? OFFSET ?"
        //这两个必须是字符串。
        const [rows, fields] = await connection.execute(statement, [String(limit), String(offset)])
        return rows
    }

    async queryById(id){
        const statement = `SELECT m.id, m.content, m.createAt createTime, m.updateAt updateTime, 
        JSON_OBJECT('id', u.id, 'name', u.name, 'createTime', u.createAt, 'updateTime', u.updateAt) AS user 
        FROM moment m 
        LEFT JOIN user u ON  m.user_id = u.id
        WHERE m.id=?
        `
        //这两个必须是字符串。
        const [rows, fields] = await connection.execute(statement, [String(id)])
        return rows
    }
    async update(content, momentId){
        const statement = 'UPDATE moment SET content=? where id=?;'
        const [rows, fields] = await connection.execute(statement, [content, momentId])
        return rows
    }
    async remove(momentId){
        const statement = 'DELETE FROM moment WHERE id=?'
        const [rows, fields] = await connection.execute(statement, [momentId])
        return rows
    }
}

module.exports = new CommentService
const connection = require('../app/database')

class MomentService{
    async create(content, userId){
        const statement = `INSERT INTO moment (content, user_id) VALUES (?, ?);`
        const [ result ] = await connection.execute(statement, [content, userId])
        return result

    }

    // {
    //     "id": 1,
    //     "content": "不要告诉我你不需要保护,不要告诉我你不寂寞,知微,我只希望你,在走过黑夜的那个时辰,不要倔强的选择一个人。",
    //     "createTime": "2024-06-19T08:49:35.000Z",
    //     "updateTime": "2024-06-19T08:49:35.000Z",
    //     "user": {
    //         "id": 3,
    //         "name": "伟子",
    //         "createTime": "2024-06-19 16:48:39.000000",
    //         "updateTime": "2024-06-19 16:48:39.000000"
    //     }
    // },
    async queryList(limit=10, offset=0){
        // const statement = 'SELECT * FROM `moment` LIMIT ? OFFSET ?;'
        // const statement = "SELECT m.id, m.content, m.createAt createTime, m.updateAt updateTime, JSON_OBJECT('id', u.id, 'name', u.name, 'createTime', u.createAt, 'updateTime', u.updateAt) AS user FROM `moment` m LEFT JOIN `user` u ON  m.user_id = u.id LIMIT ? OFFSET ?"
        const statement = `SELECT m.id, m.content, m.createAt createTime, m.updateAt updateTime, 
            JSON_OBJECT('id', u.id, 'name', u.name) AS user,
            (SELECT COUNT(*) FROM comment c WHERE m.id=c.moment_id) commentCount
            FROM moment m 
            LEFT JOIN user u ON  m.user_id = u.id 
            LIMIT ? OFFSET ?;`
        //这两个必须是字符串。
        const [rows, fields] = await connection.execute(statement, [String(limit), String(offset)])
        return rows
    }

    async queryById(id){
        const statement = `SELECT m.id, m.content, m.createAt createTime, m.updateAt updateTime,
        JSON_OBJECT('id', u.id, 'name', u.name) AS users, 
        (JSON_ARRAYAGG(JSON_OBJECT(
            'id', c.id, 
            'content', c.content, 
            'commentId', c.comment_id, 
            'momentId', c.moment_id, 
            'user',  JSON_OBJECT('id', cu.id, 'name', cu.name)
        )))  commentList
        FROM moment m 
        LEFT JOIN user u ON  m.user_id = u.id
        LEFT JOIN comment c ON m.id=c.moment_id
        LEFT JOIN user cu ON cu.id=c.user_id
        WHERE m.id=?
        GROUP BY m.id;
        `
        //这两个必须是字符串。
        const [rows, fields] = await connection.execute(statement, [id])
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

module.exports = new MomentService
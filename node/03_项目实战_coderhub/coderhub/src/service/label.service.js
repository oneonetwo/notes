const connection = require('../app/database')

class LabelService{
    async create(name){
        const statement = `INSERT INTO label (name) VALUES (?);`
        const [ result ] = await connection.execute(statement, [name])
        return result
    }
    async batchCreate(labels){
        const placeholder = labels.map(_=>`(?)`).join(',')
        const statement = `INSERT INTO label (name) VALUES ${placeholder};`
        const [ rows, fields ] = await connection.execute(statement, labels)
        return rows
    }

    async list(id, name, search){
        let params = []
        let statement = `SELECT * FROM label`
        if(id || name){
            statement += ' WHERE'
            if(id){
                statement += ` id = ?`
                params.push(id)
            }
            if(id && name){
                statement += ' AND'
            }
            if(name){
                statement += ' name = ?'
                params.push(name)
            }
        }
        const [ result ] = await connection.execute(statement, params)
        return result 
    }

    async queryLabelsByName(labels){
        const placeholder = labels.map(_=>'?').join(',')
        const statement = `SELECT * FROM label WHERE name IN  (${placeholder});`
        const [rows, fields] = await connection.execute(statement, labels)
        return rows
    }
}

module.exports = new LabelService
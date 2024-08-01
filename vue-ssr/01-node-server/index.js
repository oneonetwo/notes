let express = require('express')

let server = express()

server.get('/', (req, res)=>{
    res.send(`
        hello world    
    `)
})

server.listen(3000, ()=>{
    console.log('start node server on 3000 ~')
})
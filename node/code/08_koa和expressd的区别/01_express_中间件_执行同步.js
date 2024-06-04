/**
 * 
 */

const express = require('express')

const app = express()


app.use((req, res, next)=>{
    console.log('express middleware 1')
    next()
    console.log('express middleware 11')
    res.json('express hello')
})

app.use((req, res, next)=>{
    console.log('express middleware 2')
    next()

})
app.use((req, res, next)=>{
    console.log('express middleware 3')
})



app.listen(9000, () => {
    console.log('express 服务器启动成功~')
})


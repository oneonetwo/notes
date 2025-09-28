const ExpressMini = require('./expressMini')

const app = new ExpressMini()

app.use((req, res, next) => {
    console.log('中间件1')
    next()
})

app.use((req, res, next) => {
    console.log('中间件2')
    next()
})

app.get('/', (req, res) => {
    res.end('hello world')
})

app.get('/login', (req, res) => {
    res.setHeader('Content-Type', 'text/html;charset=utf-8')
    res.end('登录成功')
})


app.listen(3000, () => {
    console.log('server is running at http://localhost:3000')
})

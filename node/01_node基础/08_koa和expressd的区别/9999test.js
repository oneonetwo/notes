const http = require('http')
const url = require('url')



// 创建server服务器
const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'application/json;charset=utf8'
    })
    res.end(JSON.stringify({
        name: '杨景渊'
    }));
});

// 开启server服务器
server.listen(8090, () => {
    console.log('服务器开启成功了')
});
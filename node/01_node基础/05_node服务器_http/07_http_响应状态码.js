/**
 * 两种状态码的方式
 * 1. statusCode
 * 2. setHead 设置响应头
 */
const http = require('http');

// 创建server服务器
const server = http.createServer((req, res) => {
    // 1.statusCode
    res.statusCode = 403
    //2. 设置响应头 
    res.writeHead(200)
    res.writeHead(401, {
        contentType: 'application/json'
    })
    res.end('hello world');
});

// 开启server服务器
server.listen(8090, () => {
    console.log('服务器开启成功了')
});
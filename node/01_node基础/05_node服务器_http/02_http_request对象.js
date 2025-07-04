/**
 * request对象包含哪些信息
 * 1. url信息 req.url
 * 2. method 请求方式POST
 * 3. headers 请求头信息，比如客户端信息，接收数据格式，支持的编码格式
 * 4. 
 */
const http = require('http');

// 创建server服务器
const server = http.createServer((request, response) => {

    response.end('hello world');
});

// 开启server服务器
server.listen(8090, () => {
    console.log('服务器开启成功了')
});
const http = require('http');

// 创建server服务器
const server = http.createServer((request, response) => {
    const url = request.url
    const method = request.method
    if (url === '/login') {
        if (method === 'POST') {
            response.end('登录成功')
        } else {
            response.end('不支持的请求方式')
        }
    } else if (url === '/products') {
        response.end('天空好像夏雨。')
    }
});

// 开启server服务器
server.listen(8090, () => {
    console.log('服务器开启成功了')
});
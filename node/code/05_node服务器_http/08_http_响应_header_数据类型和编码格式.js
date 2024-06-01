const http = require('http');

// 创建server服务器
const server = http.createServer((req, res) => {
    // 1. 设置header信息，数据的类型和编码的格式
    //单独设置某个header
    res.setHeader('Content-Type', 'text/plain;charset=utf8')
    // 2. 跟code状态码一起
    res.writeHead(200, {
        'Content-type': 'application/json;charset=utf8'
    })
    res.end(JSON.stringify({
        name: '杨景渊'
    }));
});

// 开启server服务器
server.listen(8090, () => {
    console.log('服务器开启成功了')
});
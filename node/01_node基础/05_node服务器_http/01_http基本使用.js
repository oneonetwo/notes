/**
 * 1. 有createServer来创建服务器对象
 * 2. listen有三个参数，port, host, callback
 * 3. 两个工具： postman测试node的接口服务  nodemon(node moniter)来检测管理node服务
 */
const http = require('http');

const server = http.createServer((request, response) => {
    response.write('1234')
    response.end('abcd');
});

server.listen(8090, () => {
    console.log('服务器开启成功了')
});
const http = require('http');

const server = http.createServer((request, response) => {
    response.write('1234')
    response.end('abcd');
});

server.listen(8090, () => {
    console.log('服务器开启成功了')
});
/**·   
 * 1. response 是一个可写流  writable
 * 2. write方法，这是直接写出数据，但是并没有关闭流
 * 3. end方法：这是方式是写出最后的数据，并且写出后会关闭流
 * 4.如果没有调用end和close, 那么客户端会一直等待结果
 *      - 所以客户端在发送请求时，都会设置超时时间
 */
const http = require('http');

// 创建server服务器
const server = http.createServer((req, res) => {
    res.write('总金额受')
    res.write('再接再厉')
    res.end('完成写出 并关闭流')
});

// 开启server服务器
server.listen(8090, () => {
    console.log('服务器开启成功了')
});

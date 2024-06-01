/**
 * 1. content-type 
 * 2. content-length 文件的长度大小
 * 3. keep-alive node中默认是5s
 * 4. accept-encoding 告知服务器，客服端支持的文件压缩格式，比如js文件可以使用gzip编码。对应.gz文件
 * 5. accept 告知服务器，客户端可以接受的数据格式
 * 6. user-agent 客户端相关的信息
 * 7. 获取token req.headers['authorization']
 */
const http = require('http');

// 创建server服务器
const server = http.createServer((req, res) => {
    const headers = req.headers
    headers['content-type'] //数据类型
    headers['contetn-lenght'] //数据


    const token = req.headers['acthorization']
    response.end('hello world')

});

// 开启server服务器
server.listen(8090, () => {
    console.log('服务器开启成功了')
});
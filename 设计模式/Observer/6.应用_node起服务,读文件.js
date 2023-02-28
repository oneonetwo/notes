/*
 * @Description: 
 * @Author: yjy
 * @Date: 2023-02-28 07:23:09
 * @LastEditTime: 2023-02-28 07:23:49
 * @LastEditors: yjy
 * @Reference: 
 */
// let EventEmitter = require('events');
//实现
export { }
//流读文件，
let fs=require('fs');
let rs=fs.createReadStream('./1.txt');
rs.on('data',function (data) {
    console.log(data)
});
rs.on('end',function () {
    console.log('end')
});
//起服务
let http = require('http');
let server = http.createServer();
server.on('request', (req, res) => {
    res.end('hello'); 
});
server.listen(3000);
const http = require('http');

// 1. 发送get请求
http.get('http://localhost:8000', res => {
    // res 可读流
    res.on('data', data => {
        // data 为buffer对象
        const dataString = data.toString();
        console.log(JSON.parse(dataString));
    })
})

//2. http模块发送post请求  必须使用end关闭
const req = http.request({
    method: "POST",
    hostname: 'localhost',
    port: 8000
}, res => {
    res.on('data', data => {
        // data 为buffer对象
        const dataString = data.toString();
        console.log(JSON.parse(dataString));
    })
})
req.end();
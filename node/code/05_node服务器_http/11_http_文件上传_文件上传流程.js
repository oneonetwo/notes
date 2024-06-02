/**
 * 这展示的是文件上传接受的流程  但是有问题
 * 传文件一般用form-data表单数据 
 * 问题：图片数据要单独处理下
 */
const fs = require('fs')
const http = require('http');

// 创建server服务器
const server = http.createServer((req, res) => {
    //创建写入流
    const writeSteam = fs.createWriteStream('./foo.png', {
        flags: 'a+'
    })
    // req.pipe(writeSteam)
    req.on('data', data => {
        writeSteam.write(data)
    })

    req.on('end', _ => {
        console.log('文件接受完成')
        res.end('文件上传成功')
    })
});

// 开启server服务器
server.listen(8090, () => {
    console.log('服务器开启成功了')
});




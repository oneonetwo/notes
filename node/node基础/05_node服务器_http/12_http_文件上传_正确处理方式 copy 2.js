/**
 * 处理文件数据 都用binary二进制数据
 * 这展示的是文件上传接受的流程  正确的处理方式
 *      - 设置req的编码为二进制的数据binary，程序会把每个字节按照ASCII编码设置
 *      - debug查看data数据，可以看到数据包裹和隔离的boudary分隔符， 然后截取处理数据
 */
const fs = require('fs')
const http = require('http');

// 创建server服务器
const server = http.createServer((req, res) => {
    req.setEncoding('binary') //设置成二进制、会把每个
    const boundary = req.headers['content-type'].split('; ')[1].split('=')[1] //获取boundary的分割符
    let formdata = ''
    req.on('data', data => {

        formdata += data
    })

    req.on('end', _ => {
        // 1. 截取image/jpeg位置开始后面所有的数据
        const imageType = 'image/jpeg'
        const imageTypePosition = formdata.indexOf(imageType)
        const imageData = formdata.substring(imageTypePosition)
        //2. imageData数据前面会有空格
        imageData = imageData.replace('^/s/s*', '') //window的‘\r\n’就是一个空格，需要去掉
        //3. 替换最后的boundary 
        imageData = imageData.substring(0, imageData.indexOf(`--${boundary}--`))
        //4. 将imageData保存 二进制保存
        fs.writeFile('./名字.png', imageData, 'binary', () => {
            console.log('文件接受完成')
            res.end('文件上传成功')
        })
    })
});

// 开启server服务器
server.listen(8090, () => {
    console.log('服务器开启成功了')
});




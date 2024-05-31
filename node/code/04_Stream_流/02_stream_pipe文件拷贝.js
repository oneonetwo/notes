/**
 * 1. 方式一： 一次性读取 和 写入文件 
 */
const fs  = require('fs')
// fs.readFile('./input.txt', (err, data)=>{
//     fs.writeFile('./input_copy01.txt', data, (err)=>{
//         console.log('文件写入完成')
//     })
// })


/**
 * 2. 方式二： 流 读取和写入 
 */
const readerStream = fs.createReadStream('./input.txt');
const writeStream = fs.createWriteStream('./input_copy02.txt');
readerStream.on('data', data=>{
    writeStream.write(data);
})
readerStream.on('end', err=>{
    writeStream.close();
})

/**
 * 3. 方式三： 在可读流和可写流之间建立一个管道, 可读流的所有数据都会到可写流
 */
readerStream.pipe(writeStream);
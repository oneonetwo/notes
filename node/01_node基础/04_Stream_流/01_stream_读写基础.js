/**
 * 1. stream 是连续字节的一种表现形式和抽象概念，流是可读的，也是可写的
 * 2. 在之间的文件读写时，我们可以直接通过reaFile或者write方式读写文件，为什么还需要steam?
 *      - 直接读写文件的方式，虽然简单，但是无法直接控制一些细节的操作，
 *      - 比如从什么位置开始，读到什么位置，一次性读取多少个字节；
 *      - 读到某个位置后，暂停读取，某个时刻恢复继续读取等等；
 *      - 或者这个文件非常大，比如一个视频文件，一次性全部读取并不合适；
 * 3. Node的很多对象都是基于流实现的
 *      - http模块的Request和Response对象； 
 * 4. Node.js都有哪些流？ 有四种基本流类型
 *      - 1. Writable: 可以向其写入数据的流（例如 fs.createWriteStream()）。
 *      - 2. Readable: 可以从中读取数据的流（例如 fs.createReadStream()）。
 *      - 3. Duplex: 同时Readable和Writable (例如 net.Socket)。
 *      - 4. Tranform: Duplex可以在写入和读取数据时修改或转换数据的流 （例如zlib.createDeflate()）
 * 5. 所有的 Stream 对象都是 EventEmitter 的实例。常用的事件有：
 *      1. data - 当有数据可读时触发。
 *      2. end - 没有更多的数据可读时触发。
 *      3. error - 在接收和写入过程中发生错误时触发。
 *      4. finish - 所有数据已被写入到底层系统时触发。
 * 
 */

const fs = require('fs')
var data = ''
//1. 创建可读流
readerSteam = fs.createReadStream('input.txt', {
    start: 8, //读取位置
    end: 20,
    highWaterMark: 3, //每次读取的字节数
})
//设置编码utf8
readerStream.setEncoding('UTF8')
//处理流事件
readerStream.on('data', chunk=>{
    data += chunk
    readerStream.pause(); //每次读取三个字节 暂停
    setTimeout(()=>{
        readerStream.resume(); //恢复
    })
})
readerStream.on('end', ()=>{
    console.log('读到end为止，文件会自动关闭， 不需要手动关闭')
})
readerSrteam.on('close', ()=>{
    console.log('文件被关闭')
})
readerStream.on('error', (err)=>{
    console.log(err.stack)
})


//2. 可写流
// 1. 一次性写入
fs.writeFile('./bbb.txt', 'hello world', {
    encoding: 'uft-8',
    flag: 'a+', //追加
}, err=>{
    console.log('写入结果')
})
// 2.创建 
const writeStream = fs.createWriteStream('./ccc.txt', {
    flag: 'a' //结束位置添加
    // flag: 'r+', //以读写模式打开文件
    // start: 5 //指定位置  
})

writeStream.write('hello world')
writeStream.write('nbnn')
// 操作1
writeStream.close(); //写入完成时，手动close关闭
// 操作2 end相当于调用两步操作： 写入write的数据和调用close方法
writeStream.end('endend end') //写入完成 自动关闭文件 

writeStream.on('finish', ()=>{
    console.log('文件写入结束')
})



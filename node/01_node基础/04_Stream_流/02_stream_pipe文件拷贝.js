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


// 示例 2：使用 Transform 流做大小写转换
const { Transform } = require('stream')
const upperCaseTransform = new Transform({
    transform(chunk, encoding, callback){
        const upper = chunk.toString().toUpperCase()
        callback(null, upper)
    }
})

upperCaseTransform.pipe(process.stdout)

// ✅ 示例 3：网络中使用 Stream（HTTP响应）
// nodejs
const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
  const readStream = fs.createReadStream('./bigfile.txt');
  readStream.pipe(res); // 实时传输文件内容
}).listen(3000);

// 浏览器  因为 res.body 是 ReadableStream 对象，而 ReadableStream 是 Web Streams API 的核心类型，它定义了这个方法：
fetch('/api/stream')
    // ReadableStream.prototype.getReader()
  .then(res => res.body.getReader()) //这返回一个 Reader（读取器）对象，类型为：ReadableStreamDefaultReader<Uint8Array>
  .then(async reader => {
    const decoder = new TextDecoder();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      console.log(decoder.decode(value, { stream: true }));
    }
  });

// TextDecoder(); 是在 JavaScript 中创建一个文本解码器对象，用于将 二进制数据（如 Uint8Array、Buffer）解码为字符串。
const bytes = new Uint8Array([72, 101, 108, 108, 111]); // ASCII 编码: H e l l o
const decoder = new TextDecoder(); // 默认 utf-8
const text = decoder.decode(bytes);

console.log(text); // 输出: Hello

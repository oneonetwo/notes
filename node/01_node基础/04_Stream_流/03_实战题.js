/*
 * @Descripttion: 
 * @version: 
 * @Author: D
 * @Date: 2025-06-26 11:25:58
 * @LastEditors: jy
 * @LastEditTime: 2025-06-26 11:25:58
 */
/**
 * 🔨 实战题（动手练）
 * 📘题目 1：实现一个 CLI 工具，将文件内容转换成大写并写入新文件
 * ✅ 实现目标`node upperCase.js input.txt output.txt`
 * 🧠 要求使用 fs.createReadStream、Transform、fs.createWriteStream。
 * 💡 提示：
 * 1. 使用 fs.createReadStream 创建一个可读流，读取 input.txt 文件内容。
 * 2. 使用 Transform 流将内容转换为大写。
 * 3. 使用 fs.createWriteStream 创建一个可写流，将转换后的内容写入 output.txt 文件。
 * 4. 使用 pipe 方法将流连接起来。
 */

// 1. 获取文件内容
const fs = require('fs');
const path = require('path');
const { Transform } = require('stream');
//
const [, , inputFile, outputFile] = process.argv

if(!inputFile || !outputFile){
    console.log('用法: node upperCase.js <inputFile> <outputFile>')
    process.exit(1)
}
// 2. 创建可读流和可写流
const readStream = fs.createReadStream(inputFile);
const writeStream = fs.createWriteStream(outputFile);

// 3. 创建 Transform 流
const transform = new Transform({
    transform(chunk, encoding, callback){
        const upper = chunk.toString().toUpperCase()
        callback(null, upper)
    }
})

readStream.pipe(transform).pipe(writeStream).on('finish', () => {
    console.log(`✅ 文件已转换为大写并写入到: ${outputFile}`);
})

/** 
 * 📘题目 2：写一个 HTTP 文件服务器，浏览器访问时返回指定大文件内容，使用 stream 避免内存爆炸
 * 🧠要求使用 Stream。
 * 💡提示：
 */

const http = require('http')
const fs = require('fs')
const path = require('path')

const server = http.createServer((req, res) => {
    const readStream = fs.createReadStream(path.join(__dirname, 'bigfile.txt'))
    res.writeHead(200, {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked' // 使用 Transfer-Encoding 头来传输数据 分块传输
    })
    res.on('error', (err) => {
        console.error('读取错误', err)
        res.statusCode = 500;
        res.end('Internal Server Error');
    })
    readStream.pipe(res)
})

server.listen(3000)

/**
 * 📘题目 3：实现一个 Transform 流，统计文本流中总共有多少个英文单词（忽略大小写）
 * 🧠要求使用 Stream。
 * 💡提示：。
 */

const { Transform } = require('stream')

class WordCountTransform extends Transform {
    constructor(options){
        super(options)
        this.remaining = '' // 处理跨 chunk 的单词
        this.wordCount = 0
    }
    // 执行时机：每当有数据块流入 Transform 流时自动调用。
    _transform(chunk, encoding, callback){
        const text = this.remaining + chunk.toString().toLowerCase()
        // 先分词
        const words = text.split(/\W/) // 按非单词字符分割
        this.remaining = words.pop()
        this.wordCount += words.filter(Boolean).length
        callback()
    }
    // 执行时机：当所有数据都已经流过 Transform 流，且流即将结束时自动调用。
    _flush(callback){
        if(this.remaining){
            const lastWords = this.remaining.split(/\W+/);
            this.wordCount += lastWords.filter(Boolean).length;
        }
        // 输出最终结果
        this.push(`Total words: ${this.wordCount}\n`);
        callback();
    }
}
module.exports = WordCountTransform




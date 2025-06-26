/*
 * @Descripttion: 
 * @version: 
 * @Author: D
 * @Date: 2025-06-23 17:54:48
 * @LastEditors: jy
 * @LastEditTime: 2025-06-23 19:19:02
 */
const buf = Buffer.from('NodeJS')
console.log(buf.toString())

const buf2 = Buffer.from([78, 111, 100, 101])
console.log(buf2.toString())

const buf3 = Buffer.alloc(5)
console.log(buf3)


// 输出原 buffer 和 slice 后的 buffer 的内容
const buf4 = Buffer.from('ABCDEFG');
const bufslice = buf4.slice(1, 4); // B C D
bufslice.write('bcd', 0, 3); // 将 B C D 改成小写 b c d

console.log(bufslice.toString()); // 输出: bcd
console.log(buf4.toString());      // 输出: AbcdEFG（原始 buffer 被改动了！）

const buf5 = Buffer.from('你好')
console.log(buf5.toString('hex'))
const base645 = buf5.toString('base64')
console.log(Buffer.from(base645, 'base64').toString())

function toBase64(str) {
    return Buffer.from(str).toString('base64')
}

function fromBase64(base64) {
    return Buffer.from(base64, 'base64').toString()
}

const part1 = Buffer.from('Hello ');
const part2 = Buffer.from('World!');
const partCount = Buffer.concat([part1, part2])
console.log(partCount.toString())
console.log(partCount.length)
console.log(partCount.toString('base64'))


function truncateBuffer(buffer, maxLength=10) {
    if (buffer.length <= maxLength) {
        return buffer
    }
    return buffer.slice(0, maxLength)
}


const fs = require('fs')
const path = require('path')

// try {   
//     const imgPath = path.resolve(__dirname, 'img.png')
//     const txtPath = path.resolve(__dirname, 'test.txt')

//     const imgBuffer = fs.readFileSync(imgPath)
//     const base64Img = imgBuffer.toString('base64')

//     fs.writeFileSync(txtPath, base64Img)

// } catch (error) {
//     console.log(error)
// }

const buf6 = Buffer.from([
    0x00, 0x05, ...'Hello'.split('').map(c=>c.charCodeAt(0)), 
    0x00, 0x07, ...'World'.split('').map(c=>c.charCodeAt(0))
])

let offset = 0
const messages = []
while (offset < buf6.length) {
  // 1. 取出前两个字节作为 length（高位在前）
    const len = buf6.readUInt16BE(offset);
    offset += 2

    const message = buf6.slice(offset, offset + len)
    messages.push(message.toString())
    offset += len
}

console.log(messages) // ['Hello', 'Node.js']


console.log('****实现一个十六进制编辑器工具****')

const input = 'Hello'
const buf8 = Buffer.from(input)
console.log(Array.from(buf8).map(c=>c.toString(16).padStart(2, '0')).join(' '))
console.log(Array.from(buf8).map(b=>String.fromCharCode(b)))





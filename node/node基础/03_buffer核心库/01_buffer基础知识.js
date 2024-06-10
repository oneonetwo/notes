/**
 * 1. 创建buffer
 * 相当于一个字节的数组，数组中的每一项对应一个字节的大小
 * “why” =ascii=> "77 68 79"(16进制) =存储=> <Buffer 77 68 79>
 * 
 *0000 0000 8位二进制 为什么是8位一个字节尼？
 * 在计算机中，很少的清空会直接操作一位二进制，因为一位二进制存储的数据是非常有限的
 * 所以会将8位合在一起作为一个单元，称之为一个字节（byte）
 * 1byte = 8 bit  1kb = 1024byte  1M=1024kb
 * int类型是4个字节 long类型是8个字节
 * 比如TCP传输的是字节流，在写入和读取时都需要说明字节的个数；
 * 比如RGB的值分别都是255，所以本质上在计算机中都是用一个字节存储的。
 * 
*/
const buf = Buffer.from('runoob', 'ascii')
console.log(buf.toString('hex'))
console.log(buf.toString('base64')) 

// Node.js 目前支持的字符编码包括：

// ascii - 仅支持 7 位 ASCII 数据。如果设置去掉高位的话，这种编码是非常快的。

// utf8 - 多字节编码的 Unicode 字符。许多网页和其他文档格式都使用 UTF-8 。

// utf16le - 2 或 4 个字节，小字节序编码的 Unicode 字符。支持代理对（U+10000 至 U+10FFFF）。

// ucs2 - utf16le 的别名。

// base64 - Base64 编码。

// latin1 - 一种把 Buffer 编码成一字节编码的字符串的方式。

// binary - latin1 的别名。

// hex - 将每个字节编码为两个十六进制字符。
// Buffer.alloc(size[, fill[, encoding]])： 返回一个指定大小的 Buffer 实例，如果没有设置 fill，则默认填满 0
// 创建一个长度为 10、且用 0 填充的 Buffer。
const buf1 = Buffer.alloc(10, 'why', 'utf8');
一. 什么是Buffer
    1. JavaScript 是“字符优先语言”，它天生处理字符串很方便。但当你需要处理：
       1. 文件（图片、音频、PDF）
       2. 网络数据包
       3. 十六进制或 Base64 编解码
       4. TCP/HTTP/WebSocket 原始数据传输
    2. 这些都是二进制数据，就需要用 Buffer 来处理！ 
   
二. Buffer是什么
    1. Buffer 是 Node.js 提供的一个全局类（不需要 require）
    2. 用于表示一段原始的二进制数据
    3. Buffer 相当于在内存中开辟的一块固定长度的原始字节数组
    4. 每个元素是一个字节（8 位）

三. Buffer的创建
1. 

```js
// 1. 从字符串创建
Buffer.from('你好'); // 编码为 UTF-8 字节

// 2. 创建固定大小的 buffer（内容为0）
Buffer.alloc(10); // <Buffer 00 00 00 00 00 00 00 00 00 00>

// 3. 创建非初始化 buffer（更快，但内容随机）
Buffer.allocUnsafe(10); // 内容是旧内存内容

// 4. 从数组创建
Buffer.from([0x41, 0x42, 0x43]); // ABC
```
2. 创建一个包含 ASCII 编码的 Buffer
    ```js
    const buf = Buffer.form('Hello')
    console.log(buf);           // <Buffer 48 65 6c 6c 6f>
    console.log(buf.toString()); // Hello
    ```
    - 解释：'H' 的 ASCII 是 0x48
    - 所以 Buffer.from('Hello') 实际存的是 [0x48, 0x65, 0x6c, 0x6c, 0x6f]

3. 合并两个 Buffer
    ```js
    const buf1 = Buffer.from('Hello, ')
    const buf2 = Buffer.from('World')
    const buf3 = Buffer.concat([buf1, buf2])
    console.log(buf3.toString()) // Hello, World
    ```


四. Buffer的常用属性和方法
| 方法/属性                                         | 作用                |
| --------------------------------------------- | ----------------- |
| `buf.length`                                  | 返回 Buffer 长度（字节数） |
| `buf.toString([encoding])`                    | 转字符串，默认 `'utf8'`  |
| `buf.toJSON()`                                | 返回 JSON 表示        |
| `buf.slice(start, end)`                       | 裁剪 Buffer（不会复制）   |
| `Buffer.concat([buf1, buf2, ...])`            | 拼接多个 Buffer       |
| `Buffer.isBuffer(obj)`                        | 是否是 Buffer 实例     |
| `buf[index]`                                  | 访问字节值（0-255）      |
| `buf.write(string, offset, length, encoding)` | 写入字符串到 buffer 中   |

五. buffer与base64
```js
const buf = Buffer.from('Hello, Buffer!');
const base64 = buf.toString('base64');   // 转 base64
const back = Buffer.from(base64, 'base64'); // 再转回原文

console.log(base64); // SGVsbG8sIEJ1ZmZlciE=
console.log(back.toString()); // Hello, Buffer!
```

六. 常用的使用场景

| 场景        | 描述                                               |
| --------- | ------------------------------------------------ |
| 📁 文件读写   | `fs.readFile`, `fs.createReadStream` 都会返回 Buffer |
| 🌐 网络通信   | TCP/UDP/WebSocket 都基于 Buffer 接收数据包               |
| 🎧 音视频处理  | 音频 PCM 流、视频帧均是 Buffer 格式                         |
| 📦 加密签名   | Hash、AES 等加密算法都要求 Buffer 输入                      |
| 📷 图像处理   | 图片二进制、Buffer 与 base64 互转                         |
| 🛠️ 底层库封装 | 你写原生扩展或调用 C 库时都需 Buffer 处理原始内存数据                 |

七. 注意事项   

| 项目                | 说明                                 |
| ----------------- | ---------------------------------- |
| 不是字符串             | `Buffer` 是原始数据，不是 JS 字符串           |
| 编码很重要             | 默认是 UTF-8，写入/读取时记得指定               |
| 大文件要用流            | 不要用 `fs.readFileSync()` 读大文件，会占满内存 |
| `allocUnsafe` 不安全 | 会有旧内存内容，调试时要避免泄露信息                 |


八. copy和slice的区别

1. 记忆口诀
   1. slice —— 快，省内存，数据共享，彼此影响  
   2. copy  —— 慢，占内存，数据独立，安全隔离
2. 使用场景
| 场景                    | 建议使用      |
| --------------------- | --------- |
| 只读取一部分数据，不会修改内容       | `slice()` |
| 要生成一个新 Buffer，并修改其中数据 | `copy()`  |
| 处理粘包拆包等场景，需要数据独立      | `copy()`  |
| 性能优先、临时读取用途           | `slice()` |


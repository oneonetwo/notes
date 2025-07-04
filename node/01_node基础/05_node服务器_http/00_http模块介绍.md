### 1. 什么是http模块

1. http模块是node.js内置的模块，是基于`http协议`的封装的模块，提供了构建HTTP服务端和客户端的能力，底层是基于`TCP`构建的
2. 它允许你通过 JavaScript 创建一个 Web 服务器或发起 HTTP 请求，而无需使用 Nginx、Apache 等中间层。

### 2. 如何引用

```js
// # 内置模块不需要安装
const http = require('http');
```

### 3. 核心构成和原理

##### 👨‍💻 1. 创建 HTTP 服务器：http.createServer()
```js
const server = http.createServer((req, res)=>{
    res.write('hello world')
    res.end()
})
```

- 返回值是一个`http.Server`实例
- 它会监听客户端的链接，并将每个请求传入回调函数中， 参数
  1. `req`：请求对象，包含了请求的信息 `http.IncomingMessage`
  2. `res`：响应对象，包含了响应的信息 `http.ServerResponse`

##### 🌐 2. 启动监听：server.listen(port[, hostname])

```js
server.listen(3000, () => {
    console.log('服务器启动成功，监听3000端口')
})
```

- 参数：
  - `port`：端口号
  - `hostname`：主机名

##### 📥 3. 请求对象 req（http.IncomingMessage）
| 属性/方法            | 含义              |
| ---------------- | --------------- |
| `req.method`     | 请求方法，如 GET、POST |
| `req.url`        | 请求路径（包含查询字符串）   |
| `req.headers`    | 请求头对象           |
| `req.on('data')` | 接收请求体数据（POST等）  |
| `req.on('end')`  | 请求体接收完成事件       |

1. 示例
```js
let body = ''
req.on('data', chunk=>{
    body += chunk
})
req.on('end', ()=>{
    console.log(body)
})
```

##### 📤 4. 响应对象 res（http.ServerResponse）
| 方法/属性               | 描述          |
| ------------------- | ----------- |
| `res.writeHead()`   | 设置状态码和响应头   |
| `res.setHeader()`   | 单独设置响应头     |
| `res.write()`       | 写入响应体内容     |
| `res.end()`         | 结束响应（必须调用）  |
| `res.statusCode`    | 设置状态码（快捷方式） |
| `res.statusMessage` | 设置状态信息      |


### 4. http 模块的客户端功能：发送请求

##### 🚀 1. Node 也可以作为客户端发送请求，使用：
- `http.request(options[, callback])`
- `http.get(options[, callback])`
- 参数：
  - `options`：请求配置对象
    - `method`：请求方法
    - `url`：请求路径
    - `headers`：请求头
  - `callback`：回调函数

```js
const options = {
  hostname: 'example.com',
  port: 80,
  path: '/api',
  method: 'GET'
};

const req = http.request(options, res => {
  res.on('data', chunk => console.log(chunk.toString()));
});

req.end()
```


### 🔧 5. 常用场景
| 场景                  | 描述                |
| ------------------- | ----------------- |
| 创建 API 接口服务         | RESTful 风格接口      |
| 构建静态资源服务器           | 提供 HTML、CSS、JS 文件 |
| 模拟后端服务/Mock Server  | 前端调试用的本地 API      |
| 接收 POST 表单或 JSON 请求 | 表单处理、登录等          |
| 实现反向代理服务器           | 类似 Nginx 的代理功能    |

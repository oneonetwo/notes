在使用 `fetch()` 的 `body` 参数时，你可以根据请求类型（如 `POST`、`PUT` 等）传入不同格式的内容，比如 JSON、表单数据、纯文本、二进制等。

---

## ✅ 基本语法

```js
fetch(url, {
  method: 'POST',        // 或 PUT、PATCH 等
  headers: { ... },
  body: <请求体>
})
```

---

## 📌 常见用法对比表

| 类型          | `headers` 设置                                  | `body` 内容                             |
| ----------- | --------------------------------------------- | ------------------------------------- |
| JSON 数据     | `'Content-Type': 'application/json'`          | `JSON.stringify(obj)`                 |
| 表单数据        | 自动设置或设为 `'application/x-www-form-urlencoded'` | `'key=value&key2=value2'`             |
| FormData 对象 | 不设 `Content-Type`（浏览器自动设置）                    | `new FormData()`                      |
| 文本数据        | `'Content-Type': 'text/plain'`                | 字符串，如 `'Hello'`                       |
| 二进制数据       | `'Content-Type': 'application/octet-stream'`  | `ArrayBuffer`, `Blob`, `Uint8Array` 等 |

---

## ✅ 1. 发送 JSON 数据

```js
fetch('/api/user', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Tom',
    age: 30
  })
});
```

---

## ✅ 2. 发送 URL 编码表单数据

```js
const params = new URLSearchParams();
params.append('username', 'alice');
params.append('password', '123');

fetch('/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: params.toString()
});
```

---

## ✅ 3. 发送 FormData（用于上传文件）

```js
const formData = new FormData();
formData.append('file', fileInput.files[0]);
formData.append('desc', '上传的文件');

fetch('/upload', {
  method: 'POST',
  body: formData // 不需要设置 Content-Type，浏览器自动加 boundary
});
```

---

## ✅ 4. 发送纯文本内容

```js
fetch('/echo', {
  method: 'POST',
  headers: {
    'Content-Type': 'text/plain'
  },
  body: 'hello world'
});
```

---

## ✅ 5. 发送二进制数据（Blob、ArrayBuffer）

```js
fetch('/upload-binary', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/octet-stream'
  },
  body: someArrayBuffer
});
```

---

## ❗ 注意事项

| 情况                      | 说明                                           |
| ----------------------- | -------------------------------------------- |
| `GET`/`HEAD` 请求         | ❌ **不能设置 `body`**（浏览器会报错）                    |
| `POST`/`PUT`/`PATCH` 请求 | ✅ 支持 `body` 参数                               |
| 使用 `FormData` 上传文件时     | ❌ 不要设置 `Content-Type`，让浏览器自动生成带边界的 multipart |
| 发送中文/特殊字符时              | ✅ 使用 `UTF-8` 编码；JSON 默认支持                    |

---

## 🧪 示例：发送带 header 的 JSON 请求

```js
fetch('http://localhost:3000/api', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer token123'
  },
  body: JSON.stringify({ msg: 'hello' })
});
```

---


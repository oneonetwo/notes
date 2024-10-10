### 一. 安装
1. `npm i react react-dom` 
2. `npm i @babel/preset-react -D`

```js
// 修改 babel.config.js
module.exports = {
    presets: [
        "@babel/preset-env",
        "@babel/preset-react"
    ]
}

```
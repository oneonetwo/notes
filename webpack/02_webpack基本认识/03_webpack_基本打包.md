##### webpack基本使用
1. `npm init -y` 初始化 生成`package.json`文件
2. `npm webpack webpack-cli -D` 局部安装webpack webpack-cli 
3. 默认需要再src目录下编写入口文件 index.js, 执行`npx webpack` 就可以打包了
4. 如果需要 指定 入口文件，或者 打包的目录，则需要编写 `webpack.config.js`文件

```js
const path = require('path')

module.exports = {
    entry: './src/main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './build')
    }
}

```

5. 编写完之后，则执行`npx webpack`命令就可以继续打包了
6. 那`webpack.config.js`文件的名字改成`wk.config.js`，怎么打包，修改package.json的`scripts: { build: "webpack --config wk.config.js"} `, 则执行`npm run build`;
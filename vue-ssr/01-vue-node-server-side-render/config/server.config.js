const path = require("path")
const nodeExternals = require("webpack-node-externals");
// 1. VueLoaderPlugin 是 vue-loader 提供的一个插件，用于在 Webpack 中正确处理和解析 .vue 文件。vue-loader 是一个 Webpack 加载器，可以将 .vue 单文件组件（SFC）转换为可以被 Webpack 处理的 JavaScript 模块。
const { merge } = require('webpack-merge')
const baseConfig = require("./base.config") 
module.exports = merge(baseConfig, {
    target: "node", // 确保 Webpack 以 Node.js 环境为目标进行编译
    entry: "./src/server/index.js",
    output: {
        filename: "server_bundle.js",
        path: path.resolve(__dirname, "../build/server"),
    },
    externals: [nodeExternals()],  // 打包node程序时，排除 node_modules 目录中的所有模块
})
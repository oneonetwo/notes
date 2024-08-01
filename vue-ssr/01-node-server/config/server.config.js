const path = require("path")
const nodeExternals = require("webpack-node-externals");
const { VueLoaderPlugin } = require('vue-loader');
// 1. VueLoaderPlugin 是 vue-loader 提供的一个插件，用于在 Webpack 中正确处理和解析 .vue 文件。vue-loader 是一个 Webpack 加载器，可以将 .vue 单文件组件（SFC）转换为可以被 Webpack 处理的 JavaScript 模块。
module.exports = {
    target: "node", // 确保 Webpack 以 Node.js 环境为目标进行编译
    mode: "development",
    entry: "./src/server/index.js",
    output: {
        filename: "server_bundle.js",
        path: path.resolve(__dirname, "../build/server"),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                options: {
                    presets: ["@babel/preset-env"],
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ],
    resolve: {
        extensions: [".js", ".json", ".wasm", ".jsx", ".vue"],
    },
    externals: [nodeExternals()],  // 排除 node_modules 目录中的所有模块
}
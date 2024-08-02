const path = require("path")
const { DefinePlugin } = require("webpack")
const { merge } = require('webpack-merge')
const baseConfig = require("./base.config") 

// 1. VueLoaderPlugin 是 vue-loader 提供的一个插件，用于在 Webpack 中正确处理和解析 .vue 文件。vue-loader 是一个 Webpack 加载器，可以将 .vue 单文件组件（SFC）转换为可以被 Webpack 处理的 JavaScript 模块。
module.exports = merge(baseConfig, {
    target: "web", // 
    entry: "./src/client/index.js",
    output: {
        filename: "client_bundle.js",
        path: path.resolve(__dirname, "../build/client"),
    },
    plugins: [
        new DefinePlugin({
            __VUE_OPTIONS_API__: false,
            __VUE_PROD_DEVTOOLS__: false,
            __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false
        })
    ]
})

const path = require('path')
const  commonConfig = require('./webpack.common.config')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');


const {merge} = require('webpack-merge')

module.exports = merge( commonConfig, {
    mode: 'development',
    devtool: 'eval',
    output: {
        clean: true, //能做的很多，可以用正则 等等
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../build')
    },
    plugins: [
        new CleanWebpackPlugin(), // 可用代替 output: { clean: true }
        new CopyWebpackPlugin({
            patterns: [
              { from: 'public', to: '../build' }, // 将 public 目录下的文件复制到 dist 目录
            ],
        })
    ],

})
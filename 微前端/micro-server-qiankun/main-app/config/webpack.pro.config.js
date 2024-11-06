
const path = require('path')
const  commonConfig = require('./webpack.common.config')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');


const {merge} = require('webpack-merge')

module.exports = merge( commonConfig, {
    mode: 'production',
    devtool: 'eval',
    output: {
        clean: true, //能做的很多，可以用正则 等等
        filename: 'assets/js/[name].[contenthash:8].js', // JS 输出到 assets/js
        chunkFilename: 'assets/js/[name].[contenthash:8].chunk.js',
        path: path.resolve(__dirname, '../../dist'),
        assetModuleFilename: 'assets/[name]_[hash:6][ext]' // 其他资源输出到 assets
    },
    plugins: [
        new CleanWebpackPlugin(), // 可用代替 output: { clean: true }
        new CopyWebpackPlugin({
            patterns: [
              { from: 'public', to: '../dist/assets' }, // 将 public 目录下的文件复制到 dist 目录
            ],
        })
    ],

})
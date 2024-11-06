const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // 使用output的clean直接代替
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const { DefinePlugin } = require('webpack')
const path = require('path')

module.exports = {
    mode: 'development',
    entry: './src/main.js',
    resolve: {
        extensions: ['.js', '.json', '.vue'],
        alias: {
            '@': path.resolve(__dirname, '../src'),
            '@components': path.resolve(__dirname, '../src/components')
        },
        modules: ['node_modules'] //模块目录
    },
    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader, // 替换 style-loader
                        options: {
                            publicPath: '../' // 修复CSS中引用资源的路径
                        }
                    },
                  'css-loader', 'sass-loader', 'postcss-loader',
                ],
            },
            {
                test: /.m?jsx?$/,
                exclude: /node_modules/, // 排除 node_modules 文件夹
                use: [
                    'babel-loader'
                ]
            }, 
            {
                test:/\.(png|svg|jpg|jpeg|gif)$/i,
                type:"asset",
                generator:{
                    filename: "assets/images/[name]_[hash:6][ext]"
                },
                parser: {
                    dataUrlCondition:{ 
                        maxSize: 100 * 1024
                    }
                }
            },
            {
                test: /.vue$/,
                use: ["vue-loader"]
            }, 
        ]
    },
    plugins: [
        new VueLoaderPlugin(), //VueLoaderPlugin 是 vue-loader 4.x+ 版本必须的一个插件
        new MiniCssExtractPlugin({
            filename: 'assets/css/[name].[contenthash:8].css', // CSS 输出到 assets/css
            chunkFilename: 'assets/css/[name].[contenthash:8].chunk.css'
        }),
        new HtmlWebpackPlugin({
            title: '微服务-乾坤-测试',
            filename: 'index.html',
            template: './index.html',
            meta: {
              viewport: 'width=device-width, initial-scale=1',
            },
        }),
        new DefinePlugin({
            version: "'1.1.0'"
        }),
    ],

}
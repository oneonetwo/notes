const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const { DefinePlugin } = require('webpack')

module.exports = {
    mode: 'development',
    //多入口配置
    // entry: './src/index.js',
    // entry: {
    //     index: './src/index.js',
    //     main: './src/main.js',
    // },
    entry: {
        index: {
            import: './src/index.js',
            dependOn: 'shared' // 依赖的共享库的名字
        },
        main: {
            import: './src/main.js',
            dependOn: 'shared'
        },
        shared: ['axios'],  //shared共享的库
    },
    output: {
        clean: true, //能做的很多，可以用正则 等等
        filename: '[name]-bundle.js',
        path: path.resolve(__dirname, './build'),
        //单独针对分包的文件进行命名
        chunkFilename: 'chunk_[id]_[name].js'
    },
    devServer: {
        hot: true,
        host: '0.0.0.0',
        port: 8888,
        compress: true,
        static: {
            directory: path.join(__dirname, 'public'), //public/ 目录当中的所有内容并提供一个本地服务(serve)
        },
    },
    module: {
        rules: [
            {
                test: /\.(css|less)$/,
                use: ['style-loader', 'css-loader', 'less-loader', 'postcss-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader','postcss-loader']
            },
            {
                test: /\.(png|jpe?g|svg|gif)/,
                type:'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 60 * 1024  //64kb
                    }
                },
                generator: {
                    filename: 'img/[name]_[hash:8][ext]' 
                }

            },
            {
                test: /.m?js$/,
                exclude: /node_modules/, // 排除 node_modules 文件夹
                use: [
                    'babel-loader'
                ]
            }, {
                test: /.vue$/,
                use: ["vue-loader"]
            }
        ]
    },
    optimization: {
        minimize: true, // 是否启用代码压缩。设置为 true 时，Webpack 会使用压缩插件
        splitChunks: {
            chunks: 'all', // 对所有的 chunk 进行分割 'all': 分割同步和异步引入的代码块。'async': 仅分割异步加载的代码块（默认值）。'initial': 仅分割同步引入的代码块。
            minSize: 20000, // 大小超过 20KB 时才分割
            maxSize: 0, //规定代码块的最大大小。超过该大小时，Webpack 会尝试进一步分割该代码块。 默认值: 0（即不限制大小）
            cacheGroups: {//允许你定义如何将不同模块分组到不同的代码块中
                //专门处理来自 node_modules 的第三方库，将这些库分割到单独的 vendors 代码块中。
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    filename: '[name]_vendors.js', //分割后的代码块名称，这里命名为 'vendors'。
                    chunks: 'all',
                },
                utils: {
                    test: /utils/,
                    filename: '[name]_[hash:6].js'
                }
            },
        },
    },
    resolve: {
        extensions: ['.js', '.json', '.vue', '.jsx'],
        alias: {
            '@': './src',
            utils: path.resolve(__dirname, './src/utils')
        }
    },
    plugins: [
        new VueLoaderPlugin(), //VueLoaderPlugin 是 vue-loader 4.x+ 版本必须的一个插件
        // new CleanWebpackPlugin(), // 可用代替 output: { clean: true }
        new HtmlWebpackPlugin({
            title: 'My Custom App',
            filename: 'index.html',
            template: './index.html',
            meta: {
              viewport: 'width=device-width, initial-scale=1',
            },
        }),
        new DefinePlugin({
            version: "'1.1.0'"
        }),
    ]
}
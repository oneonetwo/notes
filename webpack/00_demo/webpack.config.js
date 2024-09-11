const path = require('path')

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './build')
    },
    module: {
        rules: [
            {
                test: /\.(css|less)$/,
                // 多个loader的使用顺序是重后往前
                // use: [
                //     { loader: 'style-loader'},
                //     { loader: 'css-loader'}
                // ],
                // 1. 简写 如果只有一個loader
                //      loader: 'css-loader'
                // 2. 简写2 多个loader不需要其他的属性时，可以直接写loader字符串的形式
                use: ['style-loader', 'css-loader', 'less-loader',]
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader',]
            }
        ]
    }
}
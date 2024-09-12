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
                use: ['style-loader', 'css-loader', 'less-loader', 'postcss-loader'
                    //下面的这些配置可以单独 写在postcss.config.js里
                    // {
                    //     loader: 'postcss-loader',
                    //     options: {
                    //         postcssOptions: {
                    //             plugins: [
                    //                 'autoprefixer'
                    //             ]
                    //         }
                    //     }
                    // }
                ]
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader','postcss-loader']
            },
            {
                test: /\.(png|jpe?g|svg|gif)/,
                //1.打包两张图片,并且这两张图片有自己的地址,将地址设置到img/bgi中
                //缺点:多图片加载的两次网络请求
                //type: "asset/resource"
                //-2.将图片进行base64的编码,并且直接编码后的源码放到打包的s文件中
                //缺点:·造成js文件非常大,下载js文件本身消耗时间非常长,还造成js代码的下载和解析/执
                //type: "asset/inline"
                //·3.合理的规范:
                //·3.1.对于小一点的图片,可以进行base64编码
                //-3.2.对于大一点的图片,单独的图片打包,形成urL地址,单独的请求这个url图片
                type:'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 60 * 1024  //64kb
                    }
                },
                generator: {
                    // 占位符
                    // name: 指向原来的图片名称
                    // ext: 扩展名
                    // hash: webpack生成的hash值
                    filename: 'img/[name]_[hash:8][ext]' 
                }

            }
        ]
    }
}
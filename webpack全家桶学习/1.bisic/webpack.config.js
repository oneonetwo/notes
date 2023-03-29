/*
 * @Descripttion:
 * @version:
 * @Author: D
 * @Date: 2023-03-23 15:53:41
 * @LastEditors: jy
 * @LastEditTime: 2023-03-29 17:43:08
 */
const { resolve, join } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')

module.exports = {
	mode: "development", //production development none
	devtool: 'cheap-source-map',
	entry: "./src/index.js",
	output: {
		path: resolve(__dirname, "dist"), //输出文件的绝对路径
		filename: "main.js", //输出的文件名
	},
	module: {
		rules: [
			// {
			// 	test: require.resolve("lodash"),
			// 	loader: "expose-loader",
			// 	options: {
			// 		//重新命名
			// 		exposes: {
			// 		  globalName: "_",
			// 		  override: true,
			// 		},
			// 	},
			// },
			{
				test: /\.jsx?$/,
				loader: 'eslint-loader', //先进行代码校验，在编译代码
				enforce: 'pre', //强制指定顺序，pre之前 pre normal inline post
				options: {fix: true}, //开启自动修复
				include: resolve(__dirname, 'src'), //只检查src的目录的名单，白名单。
				exclude: /node_modules/ //排除不用检查的代码
			},
            { test: /\.jsx?$/, use: [{
				loader: "babel-loader",
				options: {
					presets: [
						[
							"@babel/preset-env",//可以转化js语法
							{
								useBuiltIns: 'usage', //按需加载 polyfill
								corejs: 3,//指定corejs的版本号 2或者3 polyfill
							}
						], 
						"@babel/preset-react"//可以转化jsx语法
					],
					plugins: [
						["@babel/plugin-proposal-decorators", {"legacy": true}],
						// ["@babel/plugin-proposal-class-properties", {"loose": true}],  //不需要这个了
					]
				}
			}]},
            { test: /\.txt$/, use: "raw-loader" },
            { test: /\.css$/, use: ["style-loader", "css-loader"]},
            { test: /\.scss$/, use: ["style-loader", "css-loader", "sass-loader"]},
            { test: /\.less$/, use: ["style-loader", "css-loader", "less-loader"]},
            { test: /\.(png|jpg|jpeg|gif|bmp)$/, use: {
				loader: 'url-loader',
				options: {
					name: '[hash:10].[ext]',//hash默认是32位，截取10位
					limit: 20*1024,
				}
			}},
            { test: /\.html$/, use: "html-loader"},
        ],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./public/index.html",
			externals: [
				{
					module: 'lodash',
					entry: '',
					global: '_'
				}
			]
		}),
		new HtmlWebpackExternalsPlugin({
			externals: [
				{
					module: 'lodash',
					entry: 'https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.21/lodash.js',
					global: '_'
				}
			]
		})
		// new webpack.ProvidePlugin({
		// 	_: 'lodash'
		// })
	],
	// 外链的方式引入
	// externals: [
	// 	{
	// 		_:'lodash',
	// 	}
	// ],
	//devServer会启动一个HTTP开发服务器，把一个文件夹作为静态根目录
	devServer: {
		static: {
			directory: join(__dirname, "assets"), //想访问静态资源为没有导入的时候，告诉服务器位置
		},
		// writeToDisk: true, //指定词属性会把文件写入硬盘。
		compress: true, //是否启动压缩
		port: 8080, //HTTP服务器的端口号
		open: true, //自动打开浏览器
	},
};

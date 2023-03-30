/*
 * @Descripttion: 
 * @version: 
 * @Author: D
 * @Date: 2023-03-30 15:25:44
 * @LastEditors: jy
 * @LastEditTime: 2023-03-30 15:25:47
 */
/*
 * @Descripttion:
 * @version:
 * @Author: D
 * @Date: 2023-03-23 15:53:41
 * @LastEditors: jy
 * @LastEditTime: 2023-03-30 15:24:39
 */
const { resolve, join } = require("path");
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const FileManagerPlugin = require('filemanager-webpack-plugin');

module.exports = (env)=>{
	// console.log('env', env);
	// console.log('process', process.env.NODE_ENV);
	return {
	mode: "development", //production development none
	// devtool: 'cheap-source-map',
	devtool: false,
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
			// {
			// 	test: /\.jsx?$/,
			// 	loader: 'eslint-loader', //先进行代码校验，在编译代码
			// 	enforce: 'pre', //强制指定顺序，pre之前 pre normal inline post
			// 	options: {fix: true}, //开启自动修复
			// 	include: resolve(__dirname, 'src'), //只检查src的目录的名单，白名单。
			// 	exclude: /node_modules/ //排除不用检查的代码
			// },
            { test: /\.jsx?$/, use: [{
				loader: "babel-loader",
				options: {
					presets: [
						[
							"@babel/preset-env",//插件的集合，可以转化ES6语法
							// {
							// 	useBuiltIns: 'usage', //按需加载 polyfill
							// 	corejs: {version: 3},//指定corejs的版本号 2或者3 polyfill
							// 	targets: '>0.25%'
							// }
						], 
						"@babel/preset-react"//可以转化jsx语法
					],
					plugins: [
						// [
						// 	"@babel/plugin-transform-runtime",
						// 	{
						// 	  "corejs": 3,
						// 	  "helpers": true, //false的话就会自己在模块内部实现工具方法，适合些一些类库。
						// 	  "regenerator": true,
						// 	}
						// ],
						["@babel/plugin-proposal-decorators", {"legacy": true}],
						["@babel/plugin-proposal-class-properties", {"loose": true}],  //不需要这个了
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
		}),
		new webpack.DefinePlugin({
			PRODUCTION: JSON.stringify(process.env.NODE_ENV),
			VERSION: JSON.stringify('5fa3b9'),
			BROWSER_SUPPORTS_HTML5: true,
			TWO: '1+1',
			'typeof window': JSON.stringify('object'),
		}),
		// new webpack.ProvidePlugin({
		// 	_: 'lodash'
		// })
		new webpack.SourceMapDevToolPlugin({
			append: '\n//# sourceMappingURL=http://localhost:8080/sourcemap/[url]',
			filename: '[file].map',
		}),
		new FileManagerPlugin({
			events: {
				onEnd: {
					copy: [
						{
							source: './dist/**/*.map',
							destination: './sourcemap'
						}
					],
					delete: ['./dist/**/*.map']
				}
			}
		})
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
	}
};

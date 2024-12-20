const path = require("path");
const commonConfig = require("./webpack.common.config.js");
const { merge } = require("webpack-merge");

module.exports = merge(commonConfig, {
	mode: "development",
	devServer: {
		hot: true,
		host: "0.0.0.0",
		port: 8888,
		compress: true,
		static: [
			{
                directory: path.join(__dirname, "../public/"),//public/ 目录当中的所有内容并提供一个本地服务(serve)
                publicPath: '/assets' // 将 public 目录映射到 /assets 路径
            },
		],
        historyApiFallback: {
            // 添加重写规则
            rewrites: [
                // 将子应用的路由重定向到主应用的 index.html
                { 
                    from: /^\/sub-app-vite\/.*$/,
                    to: '/'
                }
            ]
        },
	}
});

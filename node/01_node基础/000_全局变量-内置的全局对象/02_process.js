// 1. process.env - 环境变量
// console.log(process.env.NODE_ENV); // 'development' / 'production'

// 1.1 需要在命令行运行时设置, 才能读取
// NODE_ENV=production node app.js （Windows 下：set NODE_ENV=production）
// 1.2 在.env文件中设置，需要配合 dotenv 模块使用
// 1.3 vite 项目中，命令行 --mode 指定环境，使用 `import.meta.env.MODE` 读取




// 2. process.argv - 命令行参数数组
// 获取执行脚本时命令行参数
// node  demo.js arg1 arg2
console.log(process.argv)
// 输出 【node路径，脚本路径，参数1， 参数2，...】

// 3. process.exit([code]) - 退出进程
// 退出 Node 进程。0 表示正常退出，非 0 表示异常退出。
// if (!config.ok) {
//     console.error("配置有误");
//     process.exit(1);
//   }

// 4. process.cwd() -當前工作目錄
// 获取当前运行时的工作目录（不是文件所在目录）
// console.log(process.cwd()) //E:\LEARN_2024\notes\node\01_node基础\10_全局变量-内置的全局对象

// 5. process.chdir(dir) 切换到当前工作目录
// process.chdir('/tmp')
// console.log(process.cwd()) // 'tmp'

// 6. process.memoryUsage() - 内存使用情况
// 返回一个对象，表示当前进程的内存占用情况（单位：字节）
// console.log(process.memoryUsage()) 
// {
//     rss: 20135936,
//     heapTotal: 5005312,
//     heapUsed: 3213856,
//     external: 1126158,
//     arrayBuffers: 9898
//   }

// 7. process.uptime() -运行时间（秒）
// console.log(`已经运行时间：${process.uptime()}秒`)  //已经运行时间：0.0324862秒

// 8. process.nextTick(callback) - 立即在下一个事件循环中执行回调
// 比setTimeout(fn, 0)更快，用于确保某段逻辑在当前执行栈后立即执行
// console.log('start');
// process.nextTick(() => {
//   console.log('nextTick');
// });
// console.log('end');
// 输出顺序: start -> end -> nextTick

// 9. process.on('exit', code => {}) - 监听退出
// 可以在程序退出前做清理工作
process.on('exit', code=>{
    console.log(`程序即将退出，退出码: ${code}`);
})

// 10. process.on('uncaughtException', handler) - 捕获未处理的异常
// 注意: 用这个方法只是兜底处理，并不能代替try/catch
process.on('uncaughtException', (err) => {
    console.error('发生未捕获异常:', err);
    process.exit(1); // 退出进程
})


// 捕获 Ctrl+C（终端中断信号）
process.on('SIGINT', () => {
    console.log('接收到 SIGINT（Ctrl+C），正在退出...');
    process.exit(0); // 正常退出
});

// 捕获 kill 命令发出的终止信号
process.on('SIGTERM', () => {
    console.log('接收到 SIGTERM，正在退出...');
    process.exit(0); // 正常退出
});

// 捕获信号
process.on('SIGQUIT', gracefulShutdown);  // 退出并转储内存（少用）	Ctrl+\（Linux）
process.on('SIGKILL', gracefulShutdown); //	 强制终止，无法捕获	kill -9 <pid>




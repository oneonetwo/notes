# NodeJS 基础
> 概念  
> 常见问题  
> API

## 概念
1. 认识：
    1. nodejs本身不是开发语言，他是一个工具和平台，在服务器解释、运行的JavaScript。
    2. nodejs利用Google V8来解释运行JavaScript, 但是系统真正执行的代码是用C++写的，JavaScript只是调用这些API。
2. 特性： 单线程，非阻塞I/O, 事件驱动
    1. NodeJs是单线程的Event Loop，但是它的运行机制不同于浏览器的环境
    2. V8引擎解释JavaScript脚本，解析后的代码，调用Node API。libuv库负责Node API的执行，他将不同的任务分配给不同的线程，形成一个Event Loop（事件循环），已异步的方式将任务的执行结果返回给V8引擎。V8引擎再将结果返回给用户。
    3. 

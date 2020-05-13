# NodeJS 基础
> 概念  
> 常见问题  
> API

## 概念
1. 认识：
    1. nodejs本身不是开发语言，他是一个工具和平台，在服务器解释、运行的JavaScript。
    2. nodejs利用Google V8来解释运行JavaScript, 但是系统真正执行的代码是用C++写的，JavaScript只是调用这些API。
    3. Node.js 被分为了四层，分别是 应用层、V8引擎层、Node API层 和 LIBUV层。
        - 应用层：   即 JavaScript 交互层，常见的就是 Node.js 的模块，比如 http，fs
        - V8引擎层：  即利用 V8 引擎来解析JavaScript 语法，进而和下层 API 交互
        - NodeAPI层：  为上层模块提供系统调用，一般是由 C 语言来实现，和操作系统进行交互 。
        - LIBUV层： 是跨平台的底层封装，实现了 事件循环、文件操作等，是 Node.js 实现异步的核心 。
2. 特性： 单线程，非阻塞I/O, 事件驱动
    1. NodeJs是单线程的[Event Loop](https://nodejs.org/zh-cn/docs/guides/event-loop-timers-and-nexttick/)，但是它的运行机制不同于浏览器的环境
    2. NodeJs的运行机制如下：
        - V8 引擎解析 JavaScript 脚本。
        - 解析后的代码，调用 Node API。
        - libuv 库负责 Node API 的执行。它将不同的任务分配给不同的线程，形成一个 Event Loop（事件循环），以异步的方式将任务的执行结果返回给 V8 引擎。
        - V8 引擎再将结果返回给用户。
    3. 当Node.js启动时会初始化event loop, 每一个event loop都会包含按如下顺序六个循环阶段
    4. NodeJs的事件循环机制：
        - Node 中的 Event Loop 和浏览器中的是完全不相同的东西。Node.js 采用 V8 作为 js 的解析引擎，而 I/O 处理方面使用了自己设计的 libuv，libuv 是一个基于事件驱动的跨平台抽象层，封装了不同操作系统一些底层特性，对外提供统一的 API，事件循环机制也是它里面的实现。
        - setImmediate() 对比 setTimeout()
            > - setImmediate() 设计为一旦在当前 轮询 阶段完成， 就执行脚本。  
            > - setTimeout() 在最小阈值（ms 单位）过后运行脚本。
        - process.nextTick 不属于事件循环的任何一个阶段，它属于该阶段与下阶段之间的过渡, 即本阶段执行结束, 进入下一个阶段前, 所要执行的回调

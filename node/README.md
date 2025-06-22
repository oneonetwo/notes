# NodeJS 基础
> 概念  
1. 内置模块（Built-in Modules）
```bash
node -p "require('module').builtinModules"
```
2. 第三方模块
3. 自定义模块
4. node的全局对象


> 常见问题  
> API

## express 和 Koa的区别
1. 架构
    1. express是完整的和强大的，内置了很多好用的功能（静态资源，路由，请求，响应）
    2. koa简单和自由，只包含核心的功能，并不会对其他的中间件进行任何的限制
        - get,post的方式也没提供，需要三方的中间件
    3. koa和express的核心都是中间件
        - 他们在中间件的实现上，他们的中间件的执行机制不同，特别是针对某个中间件中包含的异步操作时
        - 中间件的执行顺序

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
3. 优点：
    1. 高并发
    2. i/O密集型： 文件操作 网络操作  数据库操作
4. 缺点：
    1. 不适合CPU密集型应用；CPU密集型应用给Node带来的挑战主要是：由于JavaScript单线程的原因，如果有长时间运行的计算（比如大循环），将会导致CPU时间片不能释放，使得后续I/O无法发起；
        - 解决方案：分解大型运算任务为多个小任务，使得运算能够适时释放，不阻塞I/O调用的发起；
    2. 只支持单核CPU，不能充分利用CPU
    3. 可靠性低，一旦代码某个环节崩溃，整个系统都崩溃 

## 常见问题
1. require的加载机制
    1. 系统缓存：模块被执行后会进行缓存，首先进行缓存加载，判断是否存在
    2. 系统模块：原生模块，优先级仅次于缓存加载，
    3. 文件模块：优先加载.、..、/开头的，如果文件没有加上扩展名，会依次按照.js、.json、.node进行扩展名补足尝试，那么在尝试的过程中也是以同步阻塞模式来判断文件是否存在，从性能优化的角度来看待，.json、.node最好还是加上文件的扩展名。
    4. 目录作为模块：这种情况发生在文件模块加载过程中，也没有找到，但是发现是一个目录的情况，这个时候会将这个目录当作一个包来处理，Node这块采用了Commonjs规范，先会在项目根目录查找package.json文件，取出文件中定义的main属性("main": "lib/hello.js")描述的入口文件进行加载，也没加载到，则会抛出默认错误: Error: Cannot find module 'lib/hello.js'
    5. node_modules目录加载：对于系统模块、路径文件模块都找不到，Node.js会从当前模块的父目录进行查找，直到系统的根目录
2. 假设有a.js、b.js两个模块相互引用，会有什么问题？是否为陷入死循环？
    1. nodejs中的模块互相引用形成的“闭环”其实是用“断点”这一方式打开的，以断点为出口去执行其他模块，也以断点为入口进行返回，之后继续执行断点之后的代码。
3. node.js中exports与module.exports的区别分析
    1. Node.js应用在编译的过程中会对JavaScript文件的内容进行头尾的封装在进行了头尾封装之后，各个模块之间进行了作用域隔离，避免了污染全局变量
    2. exports只是module对象的exports的一个引用，在初始时exports和module.exports是指向同一块内存区域的；
    ```javascript
    //hello.js
    const hello = function(){
        console.log('hello world')
    }
    module.exports = {
        hello
    }
    //头尾封装后的js代码
    (function(exports, require, modulem __filename, __dirname)){
        const hello = function(){
            console.log('hello world')
        }
        module.exports = {
            hello
        }
    }
    ```

    

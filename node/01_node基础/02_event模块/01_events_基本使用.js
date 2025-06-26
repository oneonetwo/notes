/** 
 * 1. 基本使用
 */
const Event = require('events');
const emitter = new Event();
//注册监听事件
function handleMsg(){
    console.log('监听处理函数')
}
emitter.on('message', handleMsg)
//触发监听事件
setTimeout(()=>{
    emitter.emit('message');
}, 2000)

/** 
 * 2 取消事件
 */
emitter.off('message', handleMsg)

/** 
 * 3. 传递参数
 */
emitter.on('someEvent', function(...arg) { 
    console.log('listener2', arg); 
}); 
emitter.emit('someEvent', 'arg1 参数', 'arg2 参数'); 

/** 
 * 常见的方法
 */
emitter.eventNames(); //返回当前EventEmitter对象注册的时间字符串数组
emitter.getMaxListeners(); //返回当前EventMitter对象最大监听数量
emitter.listenerCount('事件名称'); //返回当前事件名称的监听器的个数
emitter.listeners('事件名称');//返回EventEmitter对象某个时间监听器上所有的监听器数组

/**
 * 
 * 常用方法
| 方法名 | 作用说明 |
|----------------------|---------------------------------------------|
| on(event, listener) | 监听某个事件，事件触发时执行 listener 回调 |
| once(event, listener) | 只监听一次，事件触发后自动移除监听器 |
| emit(event, [...args]) | 触发某个事件，并传递参数给监听器 |
| off(event, listener) | 移除某个事件的指定监听器（Node 10+，等价于 removeListener）|
| removeListener(event, listener) | 移除某个事件的指定监听器 |
| removeAllListeners([event]) | 移除某个事件的所有监听器 |
| listeners(event) | 返回某个事件的所有监听器数组 |
| eventNames() | 返回已注册的所有事件名数组 |

 * 
 * 
 * 2. 与其他模块的关系
 * 2.1  fs、http、net	都基于 EventEmitter 实现
 * 2.2  stream.Readable	触发 'data', 'end', 'error' 等事件
 * 2.3  child_process	可监听 'exit', 'error', 'close' 等
 * 2.4  process	本身就是一个 EventEmitter 实例（如 SIGINT, uncaughtException）
 * 
 * 
*/




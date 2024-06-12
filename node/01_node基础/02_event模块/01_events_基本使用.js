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


// once 
// prependListenter
// removeAllListeners() //不传移除所有的事件，传参数只移除写入的

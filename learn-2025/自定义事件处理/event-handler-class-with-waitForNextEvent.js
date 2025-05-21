/**
 * EventHandler 回调函数
 * @typedef {(event: {[key: string]: any}): void} EventHandlerCallbackType
 * 
 * 这是一个类型定义，表示事件处理器的回调函数类型：
 * - 它接收一个名为event的参数，该参数是一个对象
 * - event对象可以包含任意键值对（{[key: string]: any}表示键是字符串，值可以是任何类型）
 * - 函数不返回任何值（void）
 * - 这种类型的函数将被用于处理各种事件
 */

// 睡眠函数
const sleep = (t) => new Promise((r) => setTimeout(() => r(), t));

/**
 * RealtimeAPI 和 RealtimeClient 的继承类
 * 添加基本的事件处理功能
 * @class
 */
// 实时事件处理程序类
export class RealtimeEventHandler {
  /**
   * 创建一个新的 RealtimeEventHandler 实例
   * @returns {RealtimeEventHandler}
   */
  constructor() {
    this.eventHandlers = {};
    this.nextEventHandlers = {};
  }

  /**
   * 清除所有事件处理器
   * @returns {true}
   */
  clearEventHandlers() {
    this.eventHandlers = {};
    this.nextEventHandlers = {};
    return true;
  }

  /**
   * 监听特定事件
   * @param {string} eventName 要监听的事件名称
   * @param {EventHandlerCallbackType} callback 事件触发时执行的代码
   * @returns {EventHandlerCallbackType}
   */
  on(eventName, callback) {
    this.eventHandlers[eventName] = this.eventHandlers[eventName] || [];
    this.eventHandlers[eventName].push(callback);
    return callback;
  }

  /**
   * 监听指定类型的下一个事件
   * @param {string} eventName 要监听的事件名称
   * @param {EventHandlerCallbackType} callback 事件触发时执行的代码
   * @returns {EventHandlerCallbackType}
   */
  onNext(eventName, callback) {
    this.nextEventHandlers[eventName] = this.nextEventHandlers[eventName] || [];
    this.nextEventHandlers[eventName].push(callback);
    return callback;
  }

  /**
   * 关闭特定事件的监听
   * 如果不提供回调函数，将移除该事件的所有监听器
   * @param {string} eventName
   * @param {EventHandlerCallbackType} [callback]
   * @returns {true}
   */
  off(eventName, callback) {
    const handlers = this.eventHandlers[eventName] || [];
    if (callback) {
      const index = handlers.indexOf(callback);
      if (index === -1) {
        throw new Error(
          `无法关闭指定的事件监听器 "${eventName}": 未找到该监听器`,
        );
      }
      handlers.splice(index, 1);
    } else {
      delete this.eventHandlers[eventName];
    }
    return true;
  }

  /**
   * 关闭特定类型的下一个事件的监听
   * 如果不提供回调函数，将移除该事件的所有下一个事件监听器
   * @param {string} eventName
   * @param {EventHandlerCallbackType} [callback]
   * @returns {true}
   */
  offNext(eventName, callback) {
    const nextHandlers = this.nextEventHandlers[eventName] || [];
    if (callback) {
      const index = nextHandlers.indexOf(callback);
      if (index === -1) {
        throw new Error(
          `无法关闭指定的下一个事件监听器 "${eventName}": 未找到该监听器`,
        );
      }
      nextHandlers.splice(index, 1);
    } else {
      delete this.nextEventHandlers[eventName];
    }
    return true;
  }
//   async waitForNext(eventName, timeout = null) {
//     return new Promise((resolve, reject) => {
//         const handler = (event) => {
//             resolve(event);
//         };
        
//         this.onNext(eventName, handler);
        
//         if (timeout) {
//             setTimeout(() => {
//                 this.offNext(eventName, handler);
//                 resolve(null);
//             }, timeout);
//         }
//     });
// }
  /**
   * 等待特定类型的下一个事件并返回其载荷
   * @param {string} eventName
   * @param {number|null} [timeout]
   * @returns {Promise<{[key: string]: any}|null>}
   */
  async waitForNext(eventName, timeout = null) {
    const t0 = Date.now();
    let nextEvent;
    this.onNext(eventName, (event) => (nextEvent = event));
    while (!nextEvent) {
      if (timeout) {
        const t1 = Date.now();
        if (t1 - t0 > timeout) {
          return null;
        }
      }
      await sleep(1);
    }
    return nextEvent;
  }

  /**
   * 按添加顺序执行所有事件，.on() 事件处理器在 .onNext() 处理器之前执行
   * @param {string} eventName
   * @param {any} event
   * @returns {true}
   */
  dispatch(eventName, event) {
    // 使用[].concat()创建一个新数组的副本，而不是直接引用原数组
    // 这样可以防止在遍历过程中修改原数组导致的问题
    // 如果直接使用this.eventHandlers[eventName]，当处理程序在执行过程中
    // 添加或删除事件处理器时，可能会导致遍历错误或跳过某些处理器
    const handlers = [].concat(this.eventHandlers[eventName] || []);
    for (const handler of handlers) {
      handler(event);
    }
    const nextHandlers = [].concat(this.nextEventHandlers[eventName] || []);
    for (const nextHandler of nextHandlers) {
      nextHandler(event);
    }
    delete this.nextEventHandlers[eventName];
    return true;
  }
}

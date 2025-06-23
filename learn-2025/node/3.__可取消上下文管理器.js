const { EventEmitter } = require('events');

function createContext() {
  const emitter = new EventEmitter();
  let isDone = false;
  return {
    on: (event, listener) => emitter.on(event, listener),
    cancel: () => {
      if (!isDone) {
        isDone = true;
        emitter.emit('done');
      }
    },
    get done() {
      return isDone;
    },
  };
}

// 使用场景：模拟一个定时任务，但可以中途取消
function startPolling(ctx) {
  let i = 0;
  const timer = setInterval(() => {
    if (ctx.done) {
      console.log('任务已取消，停止轮询');
      clearInterval(timer);
      return;
    }
    console.log('轮询中...', ++i);
  }, 1000);

  ctx.on('done', () => {
    console.log('收到取消事件，清理资源');
    clearInterval(timer);
  });
}

const ctx = createContext();
startPolling(ctx);

// 5 秒后取消任务
setTimeout(() => {
  ctx.cancel();
}, 5000);


// 使用场景：模拟一个定时任务，但可以中途取消
// 轮询中... 1
// 轮询中... 2
// 轮询中... 3
// 轮询中... 4
// 轮询中... 5
// 收到取消事件，清理资源
// 任务已取消，停止轮询

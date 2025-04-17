#### 要实现类似 waitForNext 的点击事件扩展（例如：点击后等待异步操作完成再响应下一次点击），可以通过 ‌高阶函数封装‌ 或 ‌Promise链式调用‌ 实现。以下是两种具体方案：


##### 方案一：自定义事件扩展（通过高阶函数）
- 通过封装原生 addEventListener，添加异步等待逻辑：
  
```js
    // 为所有元素扩展 waitForNextClick 方法
    HTMLElement.prototype.waitForNextClick = function(options = {}) {
      return new Promise((resolve) => {
        const onceHandler = (e) => {
          this.removeEventListener('click', onceHandler);
          resolve(e);
        };
        this.addEventListener('click', onceHandler, options);
      });
    };

    // 使用示例
    const button = document.querySelector('#myButton');

    button.waitForNextClick().then((e) => {
      console.log('第一次点击完成，处理异步任务...');
      return someAsyncTask(); // 模拟异步操作
    }).then(() => {
      return button.waitForNextClick(); // 等待下一次点击
    }).then(() => {
      console.log('第二次点击被处理');
    });
```

##### 方案二：事件队列控制（防止重复点击）
- 利用队列机制强制事件按顺序执行：

```js

function createAsyncClickHandler(element, options = {}) {
  let isProcessing = false;
  const queue = [];

  element.addEventListener('click', async (e) => {
    if (options.allowConcurrent) { // 允许并发执行
      options.handler(e);
    } else { // 严格串行执行
      queue.push(e);
      if (!isProcessing) {
        while (queue.length > 0) {
          isProcessing = true;
          const nextEvent = queue.shift();
          await options.handler(nextEvent);
        }
        isProcessing = false;
      }
    }
  });
}

// 使用示例
createAsyncClickHandler(document.getElementById('myButton'), {
  handler: async (e) => {
    console.log('开始处理点击...');
    await new Promise(resolve => setTimeout(resolve, 1000)); // 模拟耗时操作
    console.log('点击处理完成');
  },
  allowConcurrent: false // 强制串行
});

```
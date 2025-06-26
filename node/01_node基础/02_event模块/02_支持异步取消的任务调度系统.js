/*
 *✅ 功能目标
 * 1. 支持异步任务调度（任务函数返回 Promise）
 * 2. 支持任务执行状态监听（start、success、fail、cancel）
 * 3. 支持任务主动取消（即使任务在进行中）
 * 4. 支持多个任务并行调度
 * 5. 可拓展（任务超时、中断、重试机制可后续接入） 
 * 
 * 
 */

 import { EventEmitter } from 'events'

 class TaskScheduler extends EventEmitter {
    constructor() {
        super()
        this.tasks = new Map()
    }
    /**
     * 添加并运行一个任务
     * @param {string} taskId  - 任务id
     * @param {Function} taskFn  - 返回Promise的任务函数 (signal) => Promise
     */
    run(taskId, taskFn){
        if(this.tasks.has(taskId)){
            throw new Error(`任务 ${taskId} 已存在`)
        }
        const controller = new AbortController()
        const { signal } = controller

        this.tasks.set(taskId, controller)
        this.emit('start', taskId)

        taskFn(signal)
            .then((res)=>{
                if(signal.aborted){
                    return
                }
                this.emit('success', taskId, res)
            }).catch((err)=>{
                if(signal.aborted){
                    return
                }
                this.emit('fail', taskId, err)
            }).finally(()=>{
                this.tasks.delete(taskId)
            })
    }
    /**
     * 取消一个任务
     * @param {string} taskId  - 任务id
     */
    cancel(taskId){
        const controller = this.tasks.get(taskId)
        if(controller){
            controller.abort()
            this.tasks.delete(taskId)
            this.emit('cancel', taskId)
        }
    }
    /**
     * 取消所有任务
     */
    cancelAll(){
        this.tasks.forEach((controller, taskId)=>{
            controller.abort()
            this.emit('cancel', taskId)
        })
        this.tasks.clear()
    }
 }

 // 测试使用示例
const scheduler = new TaskScheduler()
scheduler.on('start', (taskId)=>console.log(`任务 ${taskId} 开始`))
scheduler.on('success', (taskId, res)=>console.log(`任务 ${taskId} 成功`, res))
scheduler.on('fail', (taskId, err)=>console.log(`任务 ${taskId} 失败`, err))
scheduler.on('cancel', (taskId)=>console.log(`任务 ${taskId} 取消`))


// 模拟任务函数
function exampleTask(signal, duration = 3000){
    return new Promise((resolve, reject)=>{
        const timer = setTimeout(()=>{
            resolve('任务1完成')
        }, duration)
        signal.addEventListener('abort', ()=>{
            clearTimeout(timer)
            reject(new Error('任务被取消'))
        })
    })
}


scheduler.run('task1', (signal) => exampleTask(signal, 5000))
scheduler.run('task2', (signal) => exampleTask(signal, 2000))

setTimeout(()=>{
    scheduler.cancel('task2')
}, 1000)

 
// 模拟：每个任务下载一个文件（用 setTimeout 模拟耗时）
// download-demo.js
const schedulerDownload = new TaskScheduler();

schedulerDownload.on('start', (id) => console.log(`[${id}] 开始下载`));
schedulerDownload.on('success', (id, res) => console.log(`[${id}] 下载成功：${res}`));
schedulerDownload.on('fail', (id, err) => console.error(`[${id}] 下载失败：${err.message}`));
schedulerDownload.on('cancel', (id) => console.warn(`[${id}] 下载已取消`));

// 模拟下载任务
function simulateDownload(url, duration = 3000) {
  return (signal) => new Promise((resolve, reject) => {
    const timer = setTimeout(() => resolve(`内容来自：${url}`), duration);
    signal.addEventListener('abort', () => {
      clearTimeout(timer);
      reject(new Error('下载中断'));
    });
  });
}

// 启动多个下载任务
schedulerDownload.run('download-1', simulateDownload('https://example.com/a.jpg', 5000));
schedulerDownload.run('download-2', simulateDownload('https://example.com/b.jpg', 3000));
schedulerDownload.run('download-3', simulateDownload('https://example.com/c.jpg', 4000));

// 三秒后取消 download-1
setTimeout(() => {
  schedulerDownload.cancel('download-1');
}, 3000);


//  场景 2：自动化流程执行（流程任务链）

// flow-demo.js
const TaskScheduler = require('./TaskScheduler');
const schedulerFlow = new TaskScheduler();

schedulerFlow.on('start', (id) => console.log(`[${id}] 流程启动`));
schedulerFlow.on('success', (id, res) => console.log(`[${id}] 流程完成：${res}`));
schedulerFlow.on('fail', (id, err) => console.error(`[${id}] 流程失败：${err.message}`));
schedulerFlow.on('cancel', (id) => console.warn(`[${id}] 流程取消`));

// 定义流程任务函数（可取消的）
function createStep(name, duration, fail = false) {
  return (signal) => new Promise((resolve, reject) => {
    console.log(`开始步骤：${name}`);
    const timer = setTimeout(() => {
      if (fail) reject(new Error(`${name} 步骤失败`));
      else resolve(`${name} 完成`);
    }, duration);
    signal.addEventListener('abort', () => {
      clearTimeout(timer);
      reject(new Error(`${name} 被中断`));
    });
  });
}

// 串行流程控制器
function runWorkflow(signal) {
  const steps = [
    createStep('注册用户', 1000),
    createStep('身份验证', 1500),
    createStep('生成邀请码', 1200),
    createStep('发送通知', 1000),
  ];

  // 串行执行步骤
  return steps.reduce((promise, step) => {
    return promise.then(() => {
      if (signal.aborted) throw new Error('流程被取消');
      return step(signal);
    });
  }, Promise.resolve());
}

// 启动自动化流程
schedulerFlow.run('user-register-flow', runWorkflow);

// 取消整个流程（例如超时、手动取消）
setTimeout(() => {
  schedulerFlow.cancel('user-register-flow');
}, 3500);

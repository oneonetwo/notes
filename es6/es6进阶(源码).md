## [Es6 基础(2)](https://es6.ruanyifeng.com/#README)

1. Promise对象 [解析](https://juejin.im/post/5b83cb5ae51d4538cc3ec354)
    - 原理  
      > 1. 三种状态 PENDING, FULFILLED, REJECTED, 两种结果
      > 2. 发布订阅模式
      > 3. js事件循环机制,微任务
    - then的链式调用涉及到Promise的执行规则，包括值得传递和错误捕获
      > 1. 如果onFullfilled返回一个值x，
      >> - x是promise,则会执行一个新的promise，则之后then的回调，会等待该Promise的状态发生变化，才会被调用
      >> - x不是promise，则x直接作为新的resolve的参数
      > 2. 如果onFulfilled 不是函数且 promise1 状态为成功（Fulfilled）， promise2 必须变为成功（Fulfilled）并返回 promise1 成功的值
    ```javascript        
          // 判断变量否为function
          const isFunction = variable => typeof variable === 'function'
          // 定义Promise的三种状态常量
          const PENDING = 'PENDING'
          const FULFILLED = 'FULFILLED'
          const REJECTED = 'REJECTED'

        class MyPromise{
            constructor(handle){
                this._status = PENDING;
                this._value = undefined;
                this._fulfilledQueues = [];
                this._rejectedQueues = [];

                try{
                    handle(this._resolve.bind(this), this._reject.bind(this));
                }catch(err){
                    this._reject(err);
                }

            }

            //resolve
            _resolve(value){
                const run  = ()=>{
                    if(this._status !== PENDING) return;
                    this._status = FULFILLED
                    this._value = val
                    let cb;
                    while (cb = this._fulfilledQueues.shift()) {
                      cb(val)
                    }      
                }
                setTimeout(run ,0);       
            }
            _reject...
            //then start
            then(onFulfilled, onRejected){
                const {_value, _status} = this;
                return new MyPromise((onFulfilledNext, onRejectedNext)=>{
                    let fulfilled = value =>{
                        try{
                           if(!isFunction(onFulfilled)){
                                onFulfilledNext(value);
                            }else{
                                let res = onFulfilled(value);                        
                                if(res instanceof MyPromise){
                                    res.then(onFulfilledNext, onRejectedNext);
                                }else if(res !== undefined){
                                    onFulfilledNext(res);
                                }
                            }  
                        }catch(err){
                            onRejectedNext(err);
                        }

                    }
                    let rejected = ...
                    switch (_status) {

                        //处理异步的
                        case PENDING:
                            this._fulfilledQueues.push(fulfilled);
                            this._rejectedQueues.push(rejected);
                            break; 
                        case FULFILLED:
                            fulfilled(_value);
                            break;
                        case onRejected:
                            rejected(_value);
                            break;
                        default:
                            break;
                    }

                })

            }
        }
    
    ```
    - catch方法
      > 1. Promise.prototype.catch()方法是.then(null, rejection)或.then(undefined, rejection)的别名，用于指定发生错误时的回调函数。
    ```javascript
        catch(){
            return this.then(undefined, onRejected);
        }
    ```
    - 静态resolve方法
    ```javascript
        static resolve(value){
            if(value instanceof MyPromise) return value;
            return new MyPromise(resolve => resolve(value));
        }
    ```
    - 静态all方法
      > 1. Promise.all()方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。
    ```javascript
        static all(list){
            return new MyPromise((resolve, reject)=>{
                let count = 0;
                let values = [];
                for(let [i,p] of list.entries()){
                    MyPromise.resolve(p).then((res)=>{
                        values[i] = res;
                        count++;
                        if(count === list.length){
                            resolve(values);
                        }
                    },err=>{
                        reject(err);
                    })
                }
            })
        }
    ```
    - 静态race方法
      > 1. 应用： 设定图片加载超时时间等等
    ```javascript
        static race (list) {
            return new MyPromise((resolve, reject) => {
                for (let p of list) {
                // 只要有一个实例率先改变状态，新的MyPromise的状态就跟着改变
                    this.resolve(p).then(res => {
                        resolve(res)
                    }, err => {
                        reject(err)
                    })
                }
            })
        }
    ```
    - Promise.prototype.finally()
      > 1. finally()方法用于指定不管 Promise 对象最后状态如何，都会执行的操作
    ```javascript
        finally (cb) {
            return this.then(
                value  => MyPromise.resolve(cb()).then(() => value),
                reason => MyPromise.resolve(cb()).then(() => { throw reason })
            );
        };
    ```
2. Iterator 和 for...of循环 
    - Iterator遍历器生成函数
      > 1. 默认的Iterator结口部署在数据结构的`Symbol.iterator`属性上;调用这个接口，就会返回一个遍历器对象。
      > 2. Iterator 的作用有三个：
      >> - 为各种数据结构，提供一个统一的、简便的访问接口；
      >> - 使得数据结构的成员能够按某种次序排列；
      >> - 是 ES6 创造了一种新的遍历命令for...of循环，Iterator 接口主要供for...of消费。
      > 3. 调用 Iterator 接口的场合
      >> - 解构赋值 对数组和 Set 结构进行解构赋值时，会默认调用Symbol.iterator方法。
      >> - 扩展运算符 （...）也会调用默认的 Iterator 接口。
      >> - yield*后面跟的是一个可遍历的结构，它会调用该结构的遍历器接口。
      
      ```javascript
          //iterator接口
          function createIterator(lsit){
              let i = 0;
              return {
                  next (){
                      let done = i>=list.length;
                      return {
                          value: list[i++],
                          done
                      }
                  }
              }
          }
          
          //Generator
          function* createIterator(list){
              for(let i = 0;i<list.length;i++){
                  yeild lsit[i];
              }
          } 
          var arr = ['a','b','c'];
          arr[Symbol.iterator] = function * (list){
               for(let i = 0;i<list.length;i++){
                  yield arr[i];
              }
          }
      ```
      
3. Generator 函数
[实现原理](https://cloud.tencent.com/developer/article/1604360)
https://cloud.tencent.com/developer/article/1604360
https://www.cnblogs.com/chengxs/p/10870674.html
    - Generator 函数是 ES6 提供的一种异步编程解决方案
    - yield表达式与return语句既有相似之处，也有区别。相似之处在于，都能返回紧跟在语句后面的那个表达式的值。区别在于每次遇到yield，函数暂停执行，下一次再从该位置继续向后执行，而return语句不具备位置记忆的功能。一个函数里面，只能执行一次（或者说一个）return语句，但是可以执行多次（或者说多个）yield表达式。
    - next 方法的参数
      > 1. yield表达式本身没有返回值，或者说总是返回undefined。next方法可以带一个参数，该参数就会被当作上一个yield表达式的返回值。
    - Generator.prototype.throw()
      > 1. Generator 函数返回的遍历器对象，都有一个throw方法，可以在函数体外抛出错误，然后在 Generator 函数体内捕获。
    - Generator.prototype.return()
      > 1. Generator 函数返回的遍历器对象，还有一个return方法，可以返回给定的值，并且终结遍历 Generator 函数。
      > 2. 如果return方法调用时，不提供参数，则返回值的value属性为undefined。
    - next()、throw()、return()这三个方法本质上是同一件事，可以放在一起理解。它们的作用都是让 Generator 函数恢复执行，并且使用不同的语句替换yield表达式。 
    ```javascript
        const g = function* (x, y) {
            let result = yield x + y;
            return result;
        };
        const gen = g(1, 2);
        gen.next(); // Object {value: 3, done: false}

        gen.next(1); // Object {value: 1, done: true}
        // 相当于将 let result = yield x + y
        // 替换成 let result = 1;

        gen.throw(new Error('出错了')); // Uncaught Error: 出错了
        // 相当于将 let result = yield x + y
        // 替换成 let result = throw(new Error('出错了'));

        gen.return(2); // Object {value: 2, done: true}
        // 相当于将 let result = yield x + y
        // 替换成 let result = return 2;
    ```
4. async函数
    - 基本用法
      > 1. asnyc函数返回一个Promise对象，可以用then方法添加回调函数。
      > 2. 当函数执行的时候，一旦遇见await就会先返回，直到异步操作完成，在执行函数体内后面的语句
      > 3. 遇到return语句或者抛出错误，就不会向下执行
    - 原理,Promise包裹的Generator自动执行器
      > 1. 首先async 内部的await会等待异步执行完 Gen yield一样
      > 2. async返回的是Promise对象 通过异步
      > 3. await返回的值是Promise.resolve(next.value).then之后的结果
      > 4. 如果await 返回的reject 那么整个async不会往下执行直接返回reject
      > 5. 如果async代码中有return 则直接返回不会继续执行
    
    ```javascript
        async function fn(){}
        //相等于
        function fn(){
            return spawn(function* (){})
        }
        
        function spawn(genF){
            return new Promise((resolve, reject)=>{
                let gen = genF();
                function step(nextF){
                    let next;
                    try{
                        next = nextF();
                    }catch(e){
                        return reject(e);
                    }
                    if(next.done){
                        return resolve(next.value);
                    }
                    Promise.resolve(next.value).then((v)=>{
                        step(function(){return gen.next(v)});
                    },(e) => {
                        step(function(){return gen.throw(e)});
                    }) 
                }
                step(function(){ return gen.next(undefined)})
            })
        }
        
        //例子
        var fs =require('fs');
        var readFile = function (fileName){
            return new Promise(function (resolve, reject){
                fs.readFile(fileName, function(error, data){
                if (error) reject(error);
                resolve(data);
                });
            });
        };


        //generator
        let gen = function* (){
            let f1 = yield readFile('/etc/fstab');
            let f2 = yield readFile('/etc/fsba2');
            console.log(f1.toString(), f2.toString());
        }
        //async
        async function as(){
            let f1 = await readFile('/etc/fstab');
            let f2 = await readFile('/etc/fsba2');
            console.log(f1.toString(), f2.toString());
        }
    ```
    


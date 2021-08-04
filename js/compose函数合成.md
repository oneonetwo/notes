## 使用compose函数,实现中间件功能
### 首先看两个例子
1. 例子1： 
    - 从以下例子首先可以知道，又是闭包，compose返回的是一个函数；
    - 调用add6(6)，add6中a以闭包的形式存在内存中，就是函数参数中的初始值,那么此时add1中b是10，紧接着运行add2中，b是11,那么add3中b是13；
    ```javascript
    function add (a) {
        return function (b) {
            return a + b
        }
    }
    let addC = compose(add(1), add(2), add(3));
    addC(10) // 16
    ```
2. 例子2：
    - 以下例子中，func1，func2，func3都接收func这个形参，而func这个参数由于会被使用，所以会一直以闭包的形式保存在内存中，也就是说func1，func2，func3会一直存在在内存中，func1接收到的是say，func2接收到的是func1，func3接收到的是func2。
    ```javascript
    var say = function(){
        console.log(0000)
    }
    // 得到合成后的方法
    function func1(func) {
      return function(){
          console.log(1111)
          func()
          console.log(1111)
      }
    }
    function func2(func) {
      return function(){
          console.log(2222)
          func()
          console.log(2222)
      }
    }
    function func3(func) {
      return function(){
          console.log(3333)
          func()
          console.log(3333)
      }
    }
    var strongSay = compose(func3, func2, func1)(say);
    strongSay()
    ```
### 由以上两个例子推到compose函数
1. 逐步推到的，简单的，普通，容易理解的形式
    ```javascript
    function compose(...funcs){
        return (value)=>{
            let res = value;
            while(funcs.length){
                res=funcs.shift()(res);
            }
            return res;
        }
    }
    ```
2.  从例子中不难看出，很容易联想到数组的reduce方法，reduce形式；
    ```javascript
    function compose(...funcs){
        if(funcs.length === 0){
            return (...args) => args;
        }
        if(funcs.length === 1){
            return funcs[0];
        }
        return funcs.reduce((a,b)=>(...args)=>a(b(...args)))
    }
    ```
    


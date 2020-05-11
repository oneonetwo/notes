### 使用compose函数,实现中间件功能
- 两个例子，两种实现方式。
1. 例子1： 
  - 从以下例子首先可以知道，又是闭包，compose返回的是一个函数；
```javascript
function add (a) {
  return function (b) {
    return a + b
  }
}
let add6 = compose(add(1), add(2), add(3));
add6(10) // 16
```
2. 例子2：

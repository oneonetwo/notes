# clockintable
1. 数据结构和算法
2. typescript
    - extends的实现
    - import export 的实现
3. 浏览器原理
4. 计算机组成原理 操作系统 网络协议
5. 英语

2020.03.10
   1. 实例对象属性跟函数赋值，class类的getter setter的简单用法
   2. 隐参  let n = ['1','2','3'].map(Number)
#### 2021.04.16
1. 滚动条 element.scrollIntoView(scrollIntoViewOptions); // Object型参数
    - element.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
2. string localeCompare()方法返回一个数字指示
    - referenceStr.localeCompare(compareString[, locales[, options]])
    - compareString 用来比较的字符串
3. 复习二进制的原码，反码，补码，  
    - 负数的二进制就是它绝对值原码的补码
    - 负的二进制码怎么转成负的十进制 => 二进制取反的十进制加1变负
    - parseInt('a': string , radix=10) 表示把radix进制的数a转化成10进制, b默认是10进制
    - number.toSting(radix) number转成radix进制 
    - 位移运算
    - `num >> 1`num大于1时，右移1相当于除以2 
4. new UrlSearchParams('?name=jingyuan@age=28')
    - Object.fromEntries(s); 能把map变成object;
#### 20210513 
1. RegExp的技巧 
```javascript
/^([\w-]+:)?\/\/([^\/]+)/.test(url) && RegExp.$2 
```

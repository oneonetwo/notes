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
### 20210520
css grid
https://juejin.cn/post/6854573220306255880#heading-21
### 20210521
[CSS 变量教程](http://www.ruanyifeng.com/blog/2017/05/css-variables.html)
http://www.ruanyifeng.com/blog/2017/05/css-variables.html
### 20210522
react-spring react动画
https://aleclarson.github.io/react-spring/v9/
### 20210523 
meida媒体查询 Window matchMedia() 方法
https://www.runoob.com/jsref/met-win-matchmedia.html
```js
const columnCount = useMedia(
//         ['(min-width: 1500px)', '(min-width: 1000px)', '(min-width: 600px)'],
//         [5, 4, 3],
//         2
//     );
const useMedia = (queries, values, defaultValue)=>{
    const mediaQueryLists = queries.map(q => window.matchMedia(q));
    const getValue = ()=>{
        const index = mediaQueryLists.findIndex(mql=>mql.matches)
        return values[index] || defaultValue;
    }
    const [value, setValue] = useState(getValue);
    useEffect(()=>{
        const handler = ()=> setValue(getValue);
        mediaQueryLists.forEach(mql => mql.addListener(handler));
        return ()=>{
            mediaQueryLists.forEach(mql=> mql.removeListener(handler));
        }
    }, [])

    return value;
}
```
### 20210525
IntersectionObserver API '交叉观察器'使用
1. MutationObserver接口提供了监视对DOM树所做更改的能力。它被设计为旧的Mutation Events功能的替代品，该功能是DOM3 Events规范的一部分。
2. 性能监测对象 PerformanceObserver 用于监测性能度量事件，在浏览器的性能时间轴记录下一个新的 performance entries  的时候将会被通知 。
3.  ResizeObserver **实验中的功能可能被重新修订** 接口可以监听到 Element 的内容区域或 SVGElement的边界框改变。内容区域则需要减去内边距padding。（有关内容区域、内边距资料见盒子模型 ）
```js
const query = (selector)=>{
    return Array.from(document.querySelectorAll(selector));
}
const observer = new IntersectionObserver((changes)=>{
    changes.forEach(change=>{
        let container = change.target;
        let content = container.querySelector('template')?.content;
        container.appendChild(content);
        observer.unobserve(container);
    })
})

query('.lazy-loaded').forEach(function(item) {
    observer.observe(item);
})
```
https://zhuanlan.zhihu.com/p/174328231
sass内置有四种编译格式：nested、expanded、compact、compressed

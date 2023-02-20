# clockintable
1. 数据结构和算法
2. typescript
    - extends的实现
    - import export 的实现
3. 浏览器原理
4. 计算机组成原理 操作系统 网络协议
5. 英语

2020.06.10
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

# 20210618
react事件捕获机制
```
  <div onChange={ event => handleMenuChange(event.target as HTMLInputElement) } className={ styles.menuList }>
            { menuData?.data?.filter(d => d.key==1).map(d =>
                <label className={ styles.radioLabel } key={ d.key }>
                    <input type="checkbox" value={d.list.map(dc=>dc.key)}  defaultChecked={ d.list.every(s=>menuIds?.includes(s.key))}/> { d.value }
                </label>
            ) }
            { menuData?.data?.filter(d => d.key!=1).flatMap(d => d.list).map(d =>
                <label className={ styles.radioLabel } key={ d.key }>
                    <input type="checkbox" value={ d.key }  defaultChecked={ menuIds.some(id => id === d.key) }/> { d.value }
                </label>
            ) }
        </div>
```
### bind预置参数

### 2023.02.14
https://ttk-fed.github.io/blog/html/22.cookie.html

### 正则
1. 是否捕获
    - **`()`** 表示捕获分组，()会把每个分组的匹配的值都保存起来，使用`$n`(n是一个数字，表示第n个补货组的内容) 
    - **`(?:)`** 表示非捕获分组，和捕获分组的区别在于，非捕获分组匹配的值不会保存起来。
    - **`(?<...>)`** 表示命名捕获分组，反向引用一个命名分组的语法是 \k, 在replace()的方法的替换字符串中反向引用的是$
    ```js
        let values = 'user1000home';
        //1. 捕获
        let reg = /user(\d+)/
        reg.exec(values); //['user1000', '1000', index: 0, input: 'user1000home', groups: undefined]
        //2. 非捕获
        let reg2 = /user(?:\d+)/
        reg2.exec(values); //['user1000', index: 0, input: 'user1000home', groups: undefined]
        //3. 命名捕获分组
        let str = 'namejingyuanage30'; 
        let reg3 = /name(?<name>\w+)age(?<age>\d+)/;
        reg3.exec(str); //['namejingyuanage30', 'jingyuan', '30', index: 0, input: 'namejingyuanage30', groups: {name: 'jingyuan', age: '30'}]
        //正则的反向引用
        let str = 'youcanyoucan';
        str.match(/you(?<行>\w{3}).*(\1)/) // ['youcanyoucan', 'can', 'can', index: 0, input: 'youcanyoucan', groups: {行: 'can'}]
    ```

2. 前瞻和后顾 不消费只要用判定
    - **`(?=pathern)`** 正向肯定查找(前瞻)，后面必须跟着什么。
    - **`(?!pathern)`** 正向否定查找(前瞻)，后边不能跟着什么。
    - **`(?<=pathern)`** 反向肯定条件查找(后顾)，不捕获。
    - **`(?>=pathern)`** 反向否定条件查找(后顾)
    ```js
        //正向肯定前瞻
        console.log('1a'.match(/1(?=[a-z])([a-z])/)); // ['1a', 'a', index: 0, input: '1a', groups: undefined]
        //正向否定前瞻
        console.log('1ab'.match(/1(?![A-Z])([a-z])/));// ['1a', 'a', index: 0, input: '1ab', groups: undefined]
        //反向肯定后顾
        console.log('a1b'.match(/(?<=[a-z])1([a-z])/));// ['1b', 'b', index: 1, input: 'a1b', groups: undefined]
        //反向否定后顾
        console.log('a1b'.match(/(?<![A-Z])1([a-z])/));// ['1b', 'b', index: 1, input: 'a1b', groups: undefined]
    ```
3. 贪婪匹配模式 非贪婪匹配模式
    - 贪婪：正则表达式去匹配时，会尽量多的匹配符合条件的内容
    - 非贪婪: 尽量少的匹配符合条件的内容 `+?`，`??`，`*?`，`{n}?`，`{n,}?`，`{n,m}?` 就是量词后面加个?
    ```js 
        let str = 'aacbacbc';
        //1. 贪婪
        let reg = /a.*b/;
        str.match(reg); // ['aacbacb', index: 0, input: 'aacbacbc', groups: undefined]
        //2. 非贪婪
        let reg2 = /a.*?b/;
        str.match(reg2); //['aacb', index: 0, input: 'aacbacbc', groups: undefined]
    ```



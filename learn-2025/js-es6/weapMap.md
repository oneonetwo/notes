### WeakMap是JavaScript的内置对象，
1. 基本概念
    1. JavaScript 内置对象（ES6引入）
    2. 键值对集合，类似 Map
    3. 特点：键必须是对象，值可以是任意类型
    4. "弱引用"特性：不会阻止垃圾回收机制回收它的键所指向的对象 
2. 与普通的Map的区别
    
    ```js
    // 普通 Map
    const map = new Map();
    let obj = { id: 1 };
    map.set(obj, "some value");
    obj = null;  // obj 对象仍然被 map 引用，不会被垃圾回收

    // WeakMap
    const weakMap = new WeakMap();
    let obj2 = { id: 2 };
    weakMap.set(obj2, "some value");
    obj2 = null;  // obj2 可以被垃圾回收，WeakMap 不会阻止
    ```
3. 主要方法
    ```js
    const wm = new WeakMap();
    // 设置键值对
    wm.set(key, value);
    // 获取值
    wm.get(key);
    // 检查键是否存在
    wm.has(key);
    // 删除键值对
    wm.delete(key);
    ```
4. 使用场景
    1. DOM元素关联数据
    2. 私有数据存储
    3. 缓存或临时数据存储
    ```js
    // 1. dom
    const domData = new WeakMap()
    function addHandler(element) {
        domData.set(element, {
            clickCount: 0,
            handler: function(){
                let data = domData.get(element)
                data.clickCount++;
                console.log(`Clicked ${data.clickCount} times`)
            }
        })
        element.addEventListener('click', domData.get(element).handler)
    }
    // 2. 私有属性存储
    const privateData = new WeakMap();
    class User {
        constructor(name){
            privateData.set(this, {
                name: name
                loginAttempts: 0
            })
        }
        getName() {
            return privateData.get(this).name
        }
        incrementLoginAttempts() {
            const data = privateData.get(this)
            data.loginAttempts++;
        }
    }

    // 3. 缓存或临时数据存储
    const cache = new WeakMap();

    function processObject(obj) {****
        if (cache.has(obj)) {
            return cache.get(obj); // 返回缓存结果
        }
        
        const result = expensiveOperation(obj);
        cache.set(obj, result);
        return result;
    }
    ```
5. 优势
    - 自动内存管理
    - 防止内存泄漏
    - 适合临时数据关联
    - 私有数据存储
6. 注意事项
    - 键必须是对象
    - 不可遍历（没有 size、keys()、values() 等方法）
    - 不支持 clear() 方法
    - 键对象不可访问时，对应的值会被自动清理
7. 最佳实践
    - 用于对象关联数据时优先考虑 WeakMap
    - 需要遍历或键为原始值时使用 Map
    - 处理 DOM 元素相关数据时特别有用
    - 实现私有属性的好选择
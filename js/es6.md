## Es6 基础
1. let和const命令
    - let命令
      > 1. 块级作用域
      > 2. 不存在变量提升，变量一定要在声明后使用，否则报错
      > 3. 暂时性死区，在代码块内，使用let命令声明变量之前就使用这些变量，就会报错
      > 4. 不允许重复声明
    - const 命令
      > 1. 用来声明常量，一旦声明，其值就不能改变,只声明不赋值就会报错
      > 2. const声明一个对象， 不可变的只是这个地址，对象本身是可以变的，可以为他添加数据
        >> - 想冻结对象可以用 `Object.freeze({})`;
    - var命令和function命令声明的全局变量依旧是全局对象的属性，let命令，const命令和class命令声明的全局变量不属于全局对象的属性
2. 变量的解构赋值
    - 数组的解构赋值
      > 1. 只要某种数据结构具有Iterator接口，都可以采用数组形式的结构赋值
      > 2. 默认值 ES6内部使用严格相等运算符(===)判断一个位置是否有值，所以一个数组成员不严格等于undefined,默认值是不会生效的
      
      ```javascript        
                var [x =1] = null; //x null;
      ```
    - 对象的解构赋值
      > 1. 先找到内部的属性，在赋给对应的变量。真正被赋值的是后者不是前者。
      > 2. 变量会被赋值，模式不会被赋值
      > 3. 默认值 生效条件：对象的属性值严格等于undefined
      
      ```javascript          
                var { foo: baz } = { foo: "aaa", bar: "bbb"}   
                baz // "aaa";
                foo // erroe: foo is not defined;

                var { message:msg = 'something went wrong'} = {};   mgs // "something went wrong"

                var { x=3 } = { x: undefined };  x // 3
                var { x=3 } = { x: null };  x // null
      ```
3. 字符串的扩展
    - includes(), startsWith(), endsWith(); 返回布尔值
    - padStart(), padEnd() 补全
    - 模板字符串 所有的空格 缩进都会保留
4. 数组的扩展
    - Array.from() 将类数组对象和可遍历(iterable)对象 转化为真正的数组
    - Array,of() 将一组值转换为数组
    - copyWithin() 在当前数组内部将指定位置的成员复制到其他位置
    - 数组实例的find() 和 findIndex() 找出第一个符合条件的数组成员，没有则返回undefined；
    - fill() 填充数组，接受三个参数，（元素，起始位置，结束位置）
    - keys() values() entries() 都返回遍历器对象，可用 `for...of` 循环遍历
    - includes() 返回布尔值，表示某个数组是否包含给定的值
      > 1. indexOf有两个缺点 一是：不够语义化，二是 内部使用严格判断（===）
      
      ```javascript          
                [NaN].indexOf(NaN)   //-1
                [NaN].includes(NaN)  // true
      ```
    - 数组的空位
      > 1. ES5对空位处理不一致
        >> - forEach(), filter(), every(), some()都会跳过空位
        >> - map()会跳过空位，但会保留这个值
        >> - join(), toString()会将空位视为undefined，而undefined和null会被处理成字符串。
      > 2. ES6明确将空位转成 undefined
    - 数组推导
      > 1. ES7 babel已经支持
            
      ```javascript          
                var a1 = [1,2,3,4];
                var a2 = [for (i of a1) i * 2];
                a2 // [2,4,6,8];
                
                //for...of 附加 if语句
                var years = [1954, 1974, 1990, 2008, 2010, 2020]
                [for (year of years) if(year > 2000) if(year < 2010) year]    // 2008 
                [for (year of years) if(year > 2000 && year < 2010) year]    // 2008 
      ```
5. 函数的扩展
    - 函数参数的默认值
      > 1. 默认值直接写在参数定义的后面
      > 2. 参数变量是默认声明的，所以不能用const和let再次声明
      > 3. 函数的length属性，含义是该函数与其传入的参数个数， 制定了默认值以后，函数的length属性将返回没有指定默认值的参数个数，
      > 4. **作用域** [阮一峰](https://es6.ruanyifeng.com/#docs/function) 
        >> - 一旦设置了参数的默认值，函数进行声明初始化时，参数会形成一个单独的作用域（context）。等到初始化结束，这个作用域就会消失。
        >> - 如果参数默认值是一个变量，则该变量所处的作用域是当前函数，然后才是全局
        >> - 如果参数默认值是函数，那么该函数作用域是全局
    - rest参数 搭配的变量是个数组，
    - 扩展运算符 （...） 内部调用的是Iterator接口，因此具有Iterator接口的对象，都可以使用扩展运算符
      > 1. rest参数的逆运算，将数组转为用逗号分割的参数序列
      > 2. 替代apply方法
      > 3. 合并数组，与解构赋值结合
      > 4. 字符串 扩展运算符把字符串转成正真的数组
      > 5. 类似数组的对象 转为真正的数组
      > 6. Map和Set结构， Generator函数
      
      ``` javascript
            /**替代apply方法**/
            //es5
            function f(x, y, z){};
            var args = [0,1,2];
            f.apply(null, args);            
            //es6
            function f(x, y, z){}
            var args = [0,1,2]
            f(...args);
            
            //es5 Math.max.apply(null, [1,14,5]);
            //es6 Math.max(...[1,14,5]);
            Math.max(1,14,5);
            
            var arr1 = [0,1,2];
            var arr2 = [3,4,5];
            //es5  Array.prototype.push.apply(arr1, arr2);
            //es6  arr1.push(...arr2); 
            
            /**合并数组**/
            [].concat(...arr1) //二元数组
            [1,2].concat(arr1, arr2);
            [1,2, ...arr1, ...arr2];
            
            /**与解构赋值结合**/
            const [first, ...rest] = [1,2,3,4,5];  first //1   rest //[2,3,4,5]
            const [first, ...rest] = [];  first //undefined   rest //[]
            
            /**Map Set Generator**/
            let map = new Map([
                [1, 'one'],
                [2, 'two'],
                [3, 'three']
            ])
            [...map.keys()] //[1,2,3];
            var go = function* (){
                yeild 1;
                yeild 2;
                yeild 3;
            }
            [...go()]  //[1,2,3]
      ```
    - name属性 返回函数的名字 `fun1.name  //"fun1"`
    - 箭头函数
      > 1. 使用注意点
        >> - 函数体内的this对象就是定义时所在的对象，而不是调用时所在的对象；箭头函数中this时固定的
        >> - 不可以当构造函数，不能用new
        >> - 不能用arguments对象，使用rest参数
        >> - 不能使用yeild命令，因此箭头函数不能用作Generator函数
    - 函数绑定 箭头函数可以绑定this对象 ES7提案，
      > 1. 该运算符会自动将左边的对象作为上下文环境（this对象）绑定到右边的函数
      > 2. 由于双冒号运算符返回的还是原对象，因此可以采用链式写法
      
      ```javascript
            foo::bar   //   bar.bind(foo);
            foo::bar(...arguments)  // bar.apply(foo, arguments);            
      ```

    - 尾调用（Tail Call）
      > 1. 某个函数的最后一步调用另一个函数
      > 2. **调用帧**: 函数调用会在内存形成一个“调用记录”，又称“调用帧”（call frame），保存调用位置和内部变量等信息。
      > 3. **调用栈**: 如果在函数A的内部调用函数B，那么在A的调用帧上方，还会形成一个B的调用帧。等到B运行结束，将结果返回到A，B的调用帧才会消失。如果函数B内部还调用函数C，那就还有一个C的调用帧，以此类推。所有的调用帧，就形成一个“调用栈”（call stack）。
      > 4. 尾调用优化
        >> - 尾调用由于是函数的最后一步操作，所以不需要保留外层函数的调用帧，因为调用位置、内部变量等信息都不会再用到了，只要直接用内层函数的调用帧，取代外层函数的调用帧就可以了。
        >> - “尾调用优化”（Tail call optimization），即只保留内层函数的调用帧。如果所有函数都是尾调用，那么完全可以做到每次执行时，调用帧只有一项，这将大大节省内存。
    - 尾递归 函数调用自身，称为递归。如果尾调用自身，就称为尾递归。
      > 1. 递归非常耗费内存，因为需要同时保存成千上百个调用帧，很容易发生“栈溢出”错误（stack overflow）。但对于尾递归来说，由于只存在一个调用帧，所以永远不会发生“栈溢出”错误。
      > 2.  ES6 中只要使用尾递归，就不会发生栈溢出（或者层层递归造成的超时），相对节省内存。
      
      ```javascript
          //计算n的阶乘，最多需要保存n个调用记录，复杂度 O(n)
            function factorial(n) {
                if (n === 1) return 1;
                return n * factorial(n - 1);
            }
            factorial(5) // 120
           //成尾递归，只保留一个调用记录，复杂度 O(1) 。
            function factorial(n, total){
                if(n === 1 ) return total;
                return function(n-1, n*total);
            }
            factorial(5,1);
      ```
    - 递归函数的改写
      > 1. 尾递归的实现，往往需要改写递归函数，确保最后一步只调用自身。做到这一点的方法，就是把所有用到的内部变量改写成函数的参数。
      > 2. 柯里化（currying），意思是将多参数的函数转换成单参数的形式
      > 3. 对于其他支持“尾调用优化”的语言（比如 Lua，ES6），只需要知道循环可以用递归代替，而一旦使用递归，就最好使用尾递归。
        
      ```javascript
      //柯里化
            function currying(fn, n) {
                return function (m) {
                    return fn.call(this, m, n);
                };
            }
            function tailFactorial(n, total) {
                if (n === 1) return total;
                return tailFactorial(n - 1, n * total);
            }
            const factorial = currying(tailFactorial, 1);
            factorial(5) // 120
       //ES6函数默认值
            function factorial(n, total = 1) {
                if (n === 1) return total;
                return factorial(n - 1, n * total);
            }
            factorial(5) // 120
       ```
    - 严格模式
      > 1. ES6 的尾调用优化只在严格模式下开启，正常模式是无效的。
      > 2. 这是因为在正常模式下，函数内部有两个变量，可以跟踪函数的调用栈。尾调用优化发生时，函数的调用栈会改写，因此上面两个变量就会失真。
        >> - `func.arguments`：返回调用时函数的参数。
        >> - `func.caller`：返回调用当前函数的那个函数。
    - 尾递归优化的实现
      > 1. 正常模式下,采用“循环”换掉“递归”。
      > 2. 蹦床函数（trampoline）可以将递归执行转为循环执行。
      
      ```javascript
            function trampoline(f){
                while(f && f instanceof Function){
                    f = f();
                }
                return f;
            }
      ```
    - 函数参数的尾逗号 ES2017 允许函数的最后一个参数有尾逗号
    - Function.prototype.toString()  toString()方法返回函数代码一模一样的原始代码
    
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      

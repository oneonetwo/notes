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

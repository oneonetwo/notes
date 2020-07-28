# TypeScript
1. 编程语言的类型
    - 动态类型语言：
        1. 运行时做数据类型的检查，
        2. 不用给变量指定数据类型 
        3. javascript python Ruby,只有再运行时才会发现错误；
    - 静态类型语言
        1. 编译阶段就进行数据类型检查
        2. 编译时需要声明变量的类型 C C++ 
2. 是什么
    - JavaScript的超级
    - 静态类型风格的类型系统
    - 从es6到es10的语法支持
3. 为什么要用Typescript
    - 优点：
        1. 输入输出的参数类型，让程序更加容易理解
        2. 代码补全，接口提示，在不同的代码块中进行跳转，效率更高
        3. 编译期间就能发现错误，杜绝了常见的问题
        4. 非常好的包容性，流行项目都支持
    - 缺点：
        1. 增加学习成本，增加开发成本。
4. 辅助：
    - ts-node 只需要一句命令行就能执行ts
### 1. 基础类型 
1. 基础类型
2. NUll 和 undefined
    - null和undefined是其他任何类型的子类型
### 2. any类型和联合类型
1. any IDE没有补全，提示
2. Union Types联合类型
```typescript
let notSure: any = 4;
notSure = 'maybe it is a string';
notSure = true;

let numberOrString: number | string = 234;
```
### 3. Array和Tuple
1. 数组，类数组这种的有特定的类型
2. 元组: 限定了数组类型的数组
```typescript
//1. 数组
let arrOfNumbers: number[] = [1,2,3,4,5];
//2. 元组
let user: [string, number] = ['abcd', 1]
```
### 4. interface 接口
1. 对对象的形状（shape）进行描述
2. 对类Class进行抽象
3. Duck Typing(鸭子类型)
```typescript
//1.  
interface IPerson {
    name: string;
    age: number;
    sex?: strinmg;    //可选属性
    readonly id: number; //只读属性
} 
let viking: IPerson = {
    id: 123,
    name: 'jingyuan',
    age: '28'
}
```
### 5. 函数和类型判断
```typescript
1. 可选参数(只能在所有参数的最后面)，添加默认值
//1. 函数声明：
function add(x: number = 10, y: number, x?:number): numnber{
    if(typeof z === 'number'){
        return x + y + z;
    }else{
        return x + y;
    }
}
//2. 函数表达式：
//虽然没有给add添加类型，但是根据add2定义的类型能够推断出add的类型
const add = function(x: number ...同上);
const add2: (x:number, y: number, z?: number) => number = add;
```
### 6. 类 class 
1. 类： 定义了一切事物的抽象特点; 对象：类的实例
2. 面向对象（oop）三大特性： 封装，继承，多态；
    - 封装：将数据的操作细节隐藏起来，只暴露接口，外界只需要通过接口就能访问对象；
    - 继承：子类继承父类，除了拥有父类的特性外，还拥有自己的特性；
    - 多态：由继承产生的相关的类，对同一个方法有不同的响应；
    ```typescript
    class Animal {
        name: string;
        constructor(name: string){
            this.name = name;
        }
        run() {
            return `${this.name} is running`;
        }
    }
    const snake = new Animal('lily');
    //多态性的体现： 重写父类的方法 super
    class Cat extends Animal {
        constructor(name) {
            super(name)
        }
        run() {
            return 'miao'+ super.run();
        }
    }
    const mao = Cat('maomao')
    ```
2. 
### 7. 类和接口
### 8. 枚举
### 9. 泛型
### 10. 类型别名和类型断言
### 11. 声明文件

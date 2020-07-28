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
3. 修饰符 
    - public：  
    - private： 实例，继承的子类，都不能访问 
    - protected： 子类可以访问，只有子女可以访问
    - readonly：  属性只能读，不能修改；
    - static： 属性方法跟实例没有关系，就可以在类上定义静态的属性和方法，不需要实例化就能直接使用
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

//修饰符
class Animal {
    readonly name: string;
    static categoies: string[] = ['animal', 'bird'];
    static isAnimal(a) {
        return a instanceof Animal;
    }
    constructor(name: string){
        this.name = name;
    }
    run() {
        return `${this.name} is running`;
    }
    console.log(Animal.categoies);
    const snake = new Animal('lily');
    console.log(Animal.isAnimal(snake));
}
```
### 7. 类和接口 implements
```typescript
interface IRadio {
    switchRadio() : void;
}
interface IBattery {
    checkBatteryStatus();
}
interface IRadiowithBattery {
    checkBatteryStatus();
}
class Car implements IRadio{
    switchRadio() { }
}
class Cellphone implements IRadio{
    switchRadio() { }
}
class Cellphone1 implements IRadio, IBattery{
    switchRadio() { };
    checkBatteryStatus() { };
}
class Cellphone2 implements IRadioWithBattery {
    switchRadio() { };
    checkBatteryStatus() { };
}
```
### 8. 枚举 

1. 数字枚举 
    - 枚举类型会被编译成一个双向映射的对象
    - 默认情况下，第一个枚举成员的值是0，后面的枚举成员的值依次加1。也可以指定一个起始值。
2. 字符串枚举
    - 字符串枚举是不可以做双向映射的。
3. 常量枚举
    - 常量枚举其实就是是在 enum关键字前使用 const 修饰符
    - 作用：当我们不需要一个对象，而需要对象的值，就可以使用常量枚举，这样就可以避免在编译时生成多余的代码和间接引用
4. 计算枚举
    - computed enum（需要计算的枚举成员）
```javascript
//1. 数字枚举
enum Direction {
    UP,
    LEFT,
    DOWN,
    RIGHT
}
console.log(Derection.UP); //0
console.log(Derection[0]); //'UP'
//2. 常量枚举  编译之后，直接是枚举属性的值；
const enum Direction {
    Up = 'UP',
    Down = 'DOWN',
}
const value = 'UP';  
if(value === Direction.Up)

//3. 数字枚举为什么能做到双向映射 编译的代码
var Direction;
(function (Direction){
    Direction[Direction["UP"] = 0] = "UP";
    Direction[Direction["LEFT"] = 1] = "LEFT";
    Direction[Direction["DOWN"] = 2] = "DOWN";
    Direction[Direction["RIGHT"] = 3] = "RIGHT";
})(Direction || (Direction = {}))
{
    0: "UP"
    1: "LEFT"
    2: "DOWN"
    3: "RIGHT"
    DOWN: 2
    LEFT: 1
    RIGHT: 3
    UP: 0
}
```

### 9. 泛型
1. 在定义函数，接口，类的时候不具体的指定类型，等使用的时候再去指定；
2. 约束泛型
```typescript
//1. 泛型数组
function echo<T>(arg: T): T{
    return arg;
}
function two<T>(a: T[]) : T{
    return a[0];
}
function three<T>(a: Array<T>) : T{
    return a[0];
}
function swap<T, U>(tuple: [T,U]): [U, T] {
    return [tuple[1], tuple[0]]
}
const result = swap(['string', 123]);

//2. （约束泛型）
interface IWithLength {
    length: number;
}
//只要传入的参数有length属性就Ok
function echoWithLength<T extends IWithLength>(args: T): T {
    console.log(args.length);
    return args;
}
const str = echoWithLength('str');
const obj = echoWithLength({length: 10, with: 19});
const arr2 = echoWithLength([1,2,3]);
echoWithLength(12); //报错，number类型没有lenght属性。

//3. 泛型类
class Queue<T> {
    private data = [];
    push(item: T){
        return this.data.push(item);
    }
    pop(item): T{
        return this.data.shift();
    }
}
const queue = new Queue<number>();
queue.push(1);
console.log(queue.pop().tofixed);
const queue2 = new Queue<sting>();
queue.push('str');

//4. 泛型接口
interface IKeyPair<T, U> {
    key: T;
    value: U;
}
let kp1 = IKeyPair<number, string> = {key:123, value:'ac'};
//数组的两种表示
let arr: number[] = [1,2,3];
let arr: Array<number> = [1,2,3];

//5. 函数泛型
interface IPlus<T> {
    (a: T, b: T): T;
}
function plus(a:number, b: number): number { return a+b};
function connect(a: string, b: string): string {return a+b};
const a: IPlus<number> = plus;
const b: IPlus<string> = connect;
```
### 10. 类型别名和类型断言
### 11. 声明文件

### 1. 重塑“类型思维”
1. 强类型语言与弱类型
2. 动态类型与静态类型
3. 编写第一个 TypeScript 程序

    1. 初始化环境
        > - `npm init -y` 生成 package.json 文件;
        > - `npm install typescript -g` 全局安装 typescript, 能够在全局使用 `tsc 命令`, `tsc -h`查看帮助信息;
        > - `tsc --init` 生成 tsconfig.json 文件
        > - 可以官网的 Playground 查看编译后的 js 代码是什么样子 [https://www.typescriptlang.org/play](`https://www.typescriptlang.org/play);

    2. 配置打包工具
        > 1. `npm install webpack webpack-cli webpack-dev-server` 安装三个包
        > 2. 针对不同的环境配置不同的webpack的打包文件 webpack.dev.config.js webpack.pro.config.js webpack.config.js 
        > 3. `npm install ts-loader typescript -D` 安装ts-loder 本地再次安装typescript;
        > 4. `npm intall html-webpack-plugin -D` 安装这个插件帮助把输出的文件插入到模板文件中； 
        > 5. 配置dev环境中的sourceMap `devtool: cheap-module-eval-source-map` 官网推荐；
        > 6. `nom install clean-webpack-plugin -D` 每次在构建成功之后帮助我们清空dist目录；
        > 7. `npm install webpack-merge -D` 安装webpack-merge 把配置文件做合并 process.NODE_ENV判断是什么环境；
    3. 编辑package.json
2. 基本类型
	```typescript
	//原始类型
	let bool:boolean = true;
	let num: number = 123;
	let str: string = 'abc';
	//数组
	let arr1: number[] = [1, 2, 3];
	let arr2: Array<number | string> = [1,2,3,'q'];
	//元组
	let tuple: [number, string] = [0, '1']; 可以通过push添加新元素但是还是不能越界访问
	//函数
	let add = (x: numebr, y: number ): number => x + y; //通常函数类型可以省略，是ts类型推断的功能；
		//1. 定义函数类型
	let compute: (x: numebr, y: number) => number;
	compute = (a, b) => a+b;
	//对象
	let obj: { x: number, y: number} = {x: 1, y: 1};
	obj.x = 3;//只有定义了才能去改变类型；
	//symbol
	let s1: symbol = Symbol();
	//undefined; null;是任何类型的子类型
	let u: undefied = undefined;
	let n: null = null;
	//void; 是一种操作符，可以让任何的表达式返回undefined,表示没有返回值的函数
	let noReturn = ()=>{};
	//any 不指定变量类型，默认就是any
	let x;  
	x = 1; x= []; x=()=>{};

	//never 永远不会有返回值的函数 有两种
	let error = ()=>{ throw new Error('error')}
	let endless = ()=>{ while(true) {} }

	```
3. 枚举类型
4. 接口
    1. 对象类型接口
    2. 函数类型接口
### 5. 函数相关知识点整理
1. 函数的定义
```javascript
let add1 = (x:number, y: number) => x+y;
let add2: (x:number, y:number) => number;
type add3 = (x:number, y: number) => number;
interface add4 {
	(x: number, y: number): number;
}
```
2. 函数实参跟形参是一一对应的，可选参数要放在最后， 默认值得参数是不可以省略的；
3. 函数重载
	1. ts函数重载： 先定义一系列的名称相同的函数声明；
	2. 
	```js
	//重载声明
	function reload: (...rest: number): number;
	function reload: (...rest: string): string;
	//定义
	function reload: (...rest: any): any{
		let first = rest[0];
		if(typeof first ==== 'number'){
			return rest.reduce((pre, cur) => pre+cur);
		}	
		if(typeof first ==== 'string'){
			return rest.join('')
		}
	}
	//使用
	reload(1,2,3,4);
	reload('a', 'b', 'c');
	```
### 6. 类
1. 继承和成员修饰符
	1. 派生类的构造函数都必须包含super类的调用（super代表父类的实例）
	```javascript
	class Dog{
		contructor(name:string){
			this.name = name;
		}
		name: string = 'dog';
		run() {}
	}
	class Jenny extends Dog{
		constructor(name, color: string){
			super(name) //父类的调用；
			this.color = color;
		}
		color: string;
	}
	```
	2. 修饰符
		1. public 默认都是public;
		2. private  既不能被实例调用也不能被继承；
		3. pretected 是能在本身和实例中访问不能在子类中访问；
		4. readonly 
		5. static 静态成员只能通过类名来调用， 静态成员也能被继承；
	3. 构造函数也可以添加修饰符，变成实例属性；
2. 抽象类和多态 es6中并没有因用户抽象类的概念 
	1. 抽象类: 只能被继承不能实例化, 可以抽离出实例的一些共性，易于代码的复用和扩展 
	2. 多态： 不同的子类中对父类的方法进行了不同的实现；
	```js
	abstract class Animal{

	}
	class Dog extends Animal{}
	```
### 7. 类和接口的关系
1. 类和接口的关系；
	1. 接口可以对类中的成员属性类型进行约束；
	2. 类实现接口的时候必须实现接口的所有属性；
	3. 接口只能约束类的共有成员
	4. 接口不能约束类的构造函数；
2. 接口可以继承接口，也可以继承类（就是把类的成员都抽离出来，只有成员结构没有具体的实现）
3. 接口在抽离类的时候**不仅抽离公共成员还抽离了private成员和protected的成员**
```js
//定义一个类
class Auto { state: 1}
//定义一个接口继承类
interface AutoInterface extends Auto{

}
//接口的实现
class C implements AutoInterface{  state = 1 }
//定义一个子类继承父类并实现接口
class Bus extends Auto implements AutoInterface {

}
```
### 8. 泛型
1. 泛型函数和泛型接口
	1. 定义：
	> 1. 不预先确定数据的类型，具体的类型在使用的时候才能确定；
	> 2. 可以定义函数，也可以定义函数类型；  
	> 3. 可以用在接口中；
	> 4. 可以把泛型参数当做函数来看待，只不过是类型而不是值；
	```javascript
	//定义泛型函数后， 有两种调用方式；
	function log<T>(value: T): T{
		console.log(value);
		return value;
	}
	//调用
	1. log<string[]>(['a', 'b', 'c'])  2. 利用类型推断直接调用 log(['a', 'b'])

	//使用类型别名定义一个泛型函数类型
	type Log = <T>(value: T) => T; 
	let myLog: Log = log;

	//泛型接口
	interface Log{  //只能月月一个函数
		<T>(value: T): T;
	}
	interface Log<T = string>{ //放在接口名称后面可以约束整个接口  可以指定默认类型
		(value: T): T;
	}
	let myLog: Log<number> = log;   
	mylog(1);
	```
		
2. 泛型类和泛型约束
	1. 泛型可以约束类的成员，但是不能约束类的静态成员；
	2. 好处
	> 1. 函数和类可以轻松的支持多种类型，增强程序的扩展性；
	> 2. 不必写多余的函数重载；冗长的联合类型声明；，增强代码的可读性；
	> 3. 灵活控制类型的之间的约束；
	```JS
	class Log<T>{
		run(value: T){ } 
	}
	let log1 = new Log<number>();   log1.run(1);
	let log2 = new Log();    log2.run({a: '1'}); //如果不传泛型的类型，那么可以是任何的类型；

	//类型约束  定义一个泛型必须拥有length属性，T继承这个接口，实行对泛型的约束；
	interface Length{
		length: number;
	}
	function log<T extends Length>(value: T): T{
		return value; 
	}
	log([1]);     log({length: 1});   log('abcdefg');
	```
### 9. 类型检查机制
1. 类型推断
	1. 定义：
	> 1. 不需要指定变量的类型， ts根据某些规则自动推断出一个类型；
	2. 种类
		1. 基础类型推断
		> 1. 通常发生在初始化一个变量；
		> 2. 设置函数默认参数的时候， 确定函数返回值的时候；
		2. 最佳通用类型推断
		> 1. 当从多个类型中推断出一个类型的时候，ts会尽可能的推断出一个兼容性所有类型的最佳通用类型；
		3. 上下文类型推断（是从右往左的推断）
	3. 类型断言
	```js
	//基础类型推断
	let a = 1;
	let b = [2];
	let c (x = 1) => x+1;
	//最佳通用类型推断
	let b = [2, null];
	//上下文类型推断 如下事件绑定，ts会根据左侧的事件绑定类型推断出一个KeyboardEvemnt;
	window.onkeydown = (event){    }

	//类型断言
	interface Foo{
		bar: number;
	}
	let foo = {} as Foo;
	foo.bar = 1;
	```
2. 类型兼容性
	1. 当一个类型Y可以被赋值给另一个类型X时，我们可以说类型X兼容类型Y;
	2. 接口兼容性
	3. 函数兼容性
	4. 类兼容
	5. 口诀
	> 1. 结构之间兼容: **成员少的兼容成员多的**
	> 2. 参数之间兼容: **参数多的兼容参数少的**
	```js
	X兼容Y: X(目标类型) = Y(源类型)；
	//接口兼容性
	interface X {
		a: any;
		b: any;
	}
	interface Y {
		a: any;
		b: any;
		c: any;
	}
	let x: X = { a: 1, b: 2};
	let y: Y = { a: 1, b: 2, c: 3}
	x = y;
	```
3. 类型保护
	1. ts能够在特定的区块中保证变量属于某种确定的类型；
	2. 四种创建这种类型的方法； instanceof  in  typeof
	```js
	enum type {Strong, Week};
	class Java{
		helloJava(){
			console.log('java');
		}
	}
	class Javascript{
		helloJavascript(){
			console.log('javascript')
		}
	}
	//第四种 通过创建类型保护函数：返回值是 类型谓词  
	function isJava(lang: Java | Javascript): lang is Java{
		return (lang as Java).helloJava !== undefined;
	}
	//使用
	function getLanguage(type: Type){
		let lang = type===Type.lang?new Java(): new Javascript();
		if(isJava(lang)){
		//类型保护区块
		lang.helloJava();
		}else{
		//类型保护区块
		lang.helloJavascript();
		}
	}
	```
### 10. 高级类型 
1. 交叉类型和联合类型 
	1. 交叉类型就是将多个类型合并成一个类型， 适合对象混入的场景；

	```js
	//交叉类型
	interface Dog{
		run(): void;
	}
	interface Cat{
		jump(): void;
	}
	let pet: Dog & Cat ={
		run() {}
		jump() {}
	}
	//联合类型
	let a = 1 | 2 | 3;
	//对象的联合类型
	interface Square {
		king: 'square';
		size: number;
	}
	interface Rectangle{
		king: 'rectangle';
		width: number;
		height: number;
	}
	type Shape = Square | Rectangle;
	function area(s: Shape){
		switch (s.king){
			case 'square':
				return s.size* s.size;
			case 'rectangle':
				return s.width * s.height;
			//兜底升级
			default: 
				return ((e: never)=>{ throw new Error(e)})(s)
		}
	}
	```
### 2. 索引类型 
1. 索引类型的查询操作符  `keyof T` 表示类型T的所有公共属性的联合类型；
```js
let obj = { a: 1; b: 2; c: 3}
function getValues(obj, keys){
	keys.map(key=> obj[key]);
}
getValues(obj, ['a', 'b'])
//keyof T
interface Obj{
	a: number;
	b: string;
}
let key: keyof Obj;   //key: number | string;
//T[k]
let value: Obj['a']; //value: number;
//T extends U 改造getValues函数
function getValues<T, K extends keyof T>(obj: T, keys: K[]): T[k][] {
	return keys.map(key=> obj[key]);
}
```
### 3. 映射类型 
1. 本质上就是预先定义的泛型接口，通常还会结合索引类型，获取对象的属性和属性值；
2. 通过映射类型可以把旧的类型变成新的类型；
3. 三个同态高级操作符（只作用于类型的内部,不创建额外的属性）； Readonly  Partial Pick;
4. 非同态（会创建新的属性）， 例如Record
```js
interface Obj{
	a: number;
	b: string;
	c: boolean;
}
//转变成只读类型
type ReadonlyObj= Readonly<Obj>;
//所有属性变成可选
type PartialObj= Partial<Obj>;
//抽取一些属性类型的子集
type PickObj= Pick<obj, 'a'|'b'> // PickObj:{a: number; b:string}
type RecordObj= Record<'x'|'y', obj> // { x: Obj, y: Obj};
```
### 4. 条件类型 
1. 由条件表达式所决定的类型， 是类型有了不唯一性,增加了语言的灵活性；
```js
//T extends U? X: Y;
type TypeName<T> =
		T extends string? "string":
		T extends number? "number":
		T extends boolen? "boolean":
		T extends undefined? "undefined":
		T extends function? "function":
		"object";
type T1 = TypeName<string> // type T1 = "string";
type T2 = TypeName<string[]> //type T2 = "object"

//如果T是联合类型的情况下，会变成多个类型的联合类型
//(A | B) extends U?X:Y;  ==>   (A extends U?X:Y)|(B extends U?X:Y)
type T3 = TypeName<string | string[]>; // type T3 = "string" | "object";
//过滤一些类型
type Diff<T, U> = T extends U? never: T;
type T4 = Diff<"a"|"b"|"c"|"e", "a"|"e">; //type T4="b"|"c"
//NotNull
type NotNull<T> = Diff<T, null|undefined>;
type T5 = NotNull<string|number|null|undefined> //type T5 = string|number;
//官方已经实现了
实现的Diff过滤  ==>    Exclude<T, U>;
实现的NotNull  ==> NonNullable<T>;
在类型中抽取 ==> Extract<T, U>;
type T6 = Extract<"a"|"b"|"c", "a"|"b">;   //type T6 = "a";
获取函数的返回值类型 ==> ReturnType<T> 
type T7 = ReturnType<()=>string>  //type T7 = string;
```

##工程篇
11. ES6 和 CommonJS 的模块系统
12. 使用命名空间
13. 理解生命合并
14. 如何编写生命文件
15. 配置 tsconfig.json
    1. 文件选项
    2. 编译选项
    3. 工程引用
16. 工具
    1. 编译工具：从 ts-loader 到 babel
    2. 代码检查工具: 从 TSLint 到 ESLint
    3. 使用 jest 进行单元测试

## 实战篇

### 1. 创建项目
1. 
2. 组件与类型
    1. 函数组件与类组件
    2. 高阶组件与 Hooks
	```js
	interface Loading {
		loading: boolean;
	}
	function HelloHoc<P>(WrappedComponent: React.ComponentType<P>){
		return class extends Component<P & Loading>{
			render(){
				let { loading, ...props} = props;
				return loading
						?<div>loading...</div>
						:<WrappedComponent {...props as P}/>
			}
		}
	}
	```
3. 事件处理与数据请求
4. 列表渲染与路由
5. Redux 与类型
6. 搭建服务端开发环境
7. 列表的 CRUD
8. 到处 Excel
9. 搭建 Vue 开发环境
10. 组件
    1. 组件封装
    2. 组件发布
11. 策略
    1. 共存策略
    2. 宽松策略
    3. 严格策略

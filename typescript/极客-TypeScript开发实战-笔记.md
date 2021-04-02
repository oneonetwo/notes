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
5. 函数相关知识点整理
6. 类
    1. 继承和成员修饰符
    2. 抽象类和多态
7. 类和接口的关系
8. 泛型
    1. 泛型函数和泛型接口
    2. 泛型类和泛型约束
9. 类型检查机制
    1. 类型推断
    2. 类型兼容性
    3. 类型保护
10. 高级类型 1. 交叉类型和联合类型 2. 索引类型 3. 映射类型 4. 条件类型 ##工程篇
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

1. 创建项目
2. 组件与类型
    1. 函数组件与类组件
    2. 高阶组件与 Hooks
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

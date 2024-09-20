### 一. 为什么需要babel

1. 事实上,在开发中我们很少直接去接触babel,但是babel对于前前端开发来说,目前是不可缺少的一部分:
    1. 开发中,我们想要使用ES6+的语法,想要使用TypeScript,开发React项目,它们都是离不开`Babel`的;
    2. 所以,`学习Babel`对于我们理解代码从编写到线上的转变过程至关重要;
2. 那么,`Babel`到底是什么呢?
    1. `Babel`是一个工具链,主要用于旧浏览器或者环境中将`ECMAScript 2015+`代码转换为向后兼容版本的JavaScript;
    2. 包括:语法转换、源代码转换等;


### 二. Babel命令行使用

1. `babel本身可以作为一个独立的工具`(和postcss一样),不和webpack等构建工具配置来单独使用。
2. 如果我们希望在命令行尝试使用babel,需要安装如下库:
    - `@babel/core`: babel的核心代码,必须安装;
    - `@babel/cli`: 可以让我们在命令行使用babel;
    - `npm install @babel/cli @babel/core -D`
3. 使用babel来处理我们的源代码:
    1. `src`: 是源文件的目录;
    2. `--out-dir`: 指定要输出的文件夹dist;



### 三. 插件的使用(了解 自己测试代码，熟悉原理可以这样用，一般都用预设@babel/preset-env)

1. 比如我们需要转换箭头函数,那么我们就可以使用箭头函数转换相关的插件
    - `npm install @babel/plugin-transform-arrow-functions -D`
    - 直接使用babel的命令行：`npx babel src --out-dir dist --plugins=@babel/plugin-transform-arrow-functions`
2. 查看转换后的结果:我们会发现const并没有转成var
    1. 这是因为`plugin-transform-arrow-functions`,并没有提供这样的功能;
    2. 我们需要使用`plugin-transform-block-scoping`来完成这样的功能;
    - `npm install @babel/plugin-transform-block-scoping-D`
    - 直接使用命令行：`npx babel src --out-dir dist --plugins=@babe1/plugin-transform-block-scoping, @babel/plugin-transform-arrow-functions`
```js
{
    test:/\.js$/,
    use: {
        loader:"babel-loader",
        options:{
            plugins: [
                "@babel/plugin-transform-arrow-functions"
                "@babel/plugin-transform-block-scoping"
            ]
        }
    }
}
```


### 四. babel-loader 

1. 在实际开发中,我们通常会在构建工具中通过配置babel来对其进行使用的,比如在webpack中。 
2. 那么我们就需要去安装相关的依赖:
    1. 如果之前已经安装了`@babel/core`,那么这里不需要再次安装;
        - `npm install babel-loader -D`
    2. 我们可以设置一个规则,在加载js文件时,使用我们的`babel`:
```js
{
    test: /.m?js$/,
    use: {
        loader: 'babel-loader'
    }
}
```


### 五. Babel的预设  babel-preset
1. 但是如果要转换的内容过多,一个个设置是比较麻烦的,我们可以使用预设(preset):
    - 安装`@babel/preset-env`预设: `npm i @babel/preset-env -D`
2. 比如常见的预设有三个:
    1. env: ` @babel/preset-env`  // 用于转换 ES6+ 语法
    2. react: `@babel/preset-react`  // 用于转换 React JSX 语法
    3. TypeScript: `@babel/preset-typescript` // 用于转换 TypeScript 语法
3. 也可以配置**babel.config.js或者.babelrc文件**

```js
    {
        test: /.m?js$/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: [
                    [
                        // 它可以根据目标环境（如支持的浏览器版本）进行配置，自动启用需要的插件。
                        // 可以使用 targets 选项来指定需要支持的浏览器版本：
                        "@babel/preset-env"，
                         {
                            targets: {
                                browsers: ['> 1%', 'last 2 versions', 'not dead'],
                            },
                            useBuiltIns: 'usage', // 自动引入 polyfill
                            corejs: 3,            // 使用 core-js 版本 3
                        }
                    ]
                ]
            }
        }
    }
```


### 六. Babel的底层原理

1. babel是如何做到将我们的一段代码(ES6、TypeScript、Readt)转成另外一段代码(ES5)的呢?
    1. 就是`编译器`,事实上我们可以将babel看成就是一个`编译器`
    2. `Babel编译器的作用就是将我们的源代码,转换成浏览器可以直接识别的另外一段源代码;
2. `Babel也拥有编译器的工作流程`:
    1. **解析阶段(Parsing)**
    2. **转换阶段(Transformation)**
    3. **生成阶段(CodeGeneration)**
3. 一个小的编译器：可以看看源码`https://github.com/jamiebuilds/the-super-tiny-compiler`
4. babel编译器执行原理
    1. 原生源代码 => 词法分析(lexical Analysis) => tokens数组 => 语法分析(syntactic analysis) => AST抽象语法树
    2. 目标源代码 <= 新的AST  <=  应用插件(plugin)  <=  访问(visitor)  <=  遍历(Traversal)  <= AST抽象语法树







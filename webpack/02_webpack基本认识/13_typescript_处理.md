### 一. 安装
1. `npm i ts-loader -D` 
2. `tsc -init`初始化tsconfig.json文件，必须要有`tsconfig.json`的文件
    1. `tsconfig.json` 是 TypeScript 项目的配置文件，主要用于指定编译选项和项目的相关信息。它定义了 TypeScript 编译器（tsc）如何处理代码，并影响编译过程的各个方面。
3. 配置ts-loader
```js
    {
        test: /.ts$/,
        use: ["ts-loader"]
    }

```

4. 除了可以使用TypeScript Compiler来编译TypeScript之外,我们也可以使用Babel:
    1. Babel是有对TypeScript进行支持;
    2. 我们可以使用插件:`@babel/tranform-typescript`;
    3. 但是更推荐直接使用preset: `@babel/preset-typescript`;
5. 安装`@babel/preset-typescript`:
    1. `npm install @babel/preset-typescript -D`
    ```js
    module.exports = {
        presets: [
            "@babel/preset-env",
            "@babel/preset-react",
            ["@babel/preset-typescript", {
                useBuiltIns: "usage",
                corejs: 3.8
            }]
        ]
    }
    ```
    2.修改 module 中的rule
    ```js
            {
                test: /.ts$/,
                // use: ["ts-loader"] //添加ts预设之后修改为babel-loader
                use: ["babel-loader"]
            }
    ```

6. `ts-loader`和`babel-loader`怎么选择,那么我们在开发中应该选择ts-loader还是babel-loader呢?
    1. 使用`ts-loader` (TypeScript Compiler)
        1. 来直接编译TypeScript,那么只能将ts转换成js;
        2. 如果我们还希望在这个过程中添加对应的polyfill,那么ts-loader是无能为力的;
        3. 我们需要借助于babel来完成polyfill的填充功能;
    2. 使用`babel-loader` (Babel)
        1. 来直接编译TypeScript,也可以将ts转换成js,并且可以实现polyfill的功能;
        2. 但是babel-loader在编译的过程中 不会对类型错误进行检测;

7. **编译Typescript的最佳实践**
    1. 也就是说我们使用Babel来完成代码的转换,使用tsc来进行类型的检查。
    2. 但是,如何可以使用tsc来进行类型的检查呢?
        1. 在这里,我在scripts中添加了两个脚本,用于类型检查;
        2. 我们执行`npm run ts-check`可以对ts代码的类型进行检测;
        3. 我们执行`npm run ts-check-watch`可以实时的检测类型错误 

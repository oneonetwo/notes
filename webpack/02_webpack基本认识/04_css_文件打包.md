#### loader的配置
1. 配置方式表示的意思在我们的`webpack.config.js`文件中写明配置信息:
    1. `module.rules`中允许我们配置多个loader(因为我们也会继续使用其他的loader,来完成其他文件的加载);
    2. 这种方式可以更好的表示loader的配置,也方便后期的维护,同时也让你对各个Loader有一个全局的概览;

    
2. `module.rules`的配置如下:
    1. `rules`属性对应的值是一个数组:[Rule]
    2. 数组中存放的是一个个的Rule,Rule是一个对象,对象中可以设置多个属性:
        1. `test属性`: 用于对resource(资源)进行匹配的,通常会设置成正则表达式;
        2. `use属性`: 对应的值时一个数组:[UseEntry]
            1. `UseEntry`是一个对象,可以通过对象的属性来设置一些其他属性
                > `loader`: 必须有一个loader属性,对应的值是一个字符串;
                > `options`: 可选的属性,值是一个字符串或者对象,值会被传入到loader中;
                > `query`: 目前已经使用options来替代;
        4. **传递字符串(如:use:['style-loader'])是loader属性的简写方式(如:use:[{loader:'style-loader'}])**;
    3. `loader属性`: Rule.use:[{loader}]的简写。


#### css-loader的使用
1. 对代码中的`css文件`进行转化， 处理源码的css文件了

#### style-loader的使用
1. 经过`css-loader`处理的css文件，但是你会发现这个css在我们的代码中并没有生效(页面没有收果)。这是为什么呢?
2. **因为`css-loader只是负责将.css文件进行解析,并不会将解析之后后的css插入到页面中;**
3. 如果我们希望再完成插入style的操作,那么我们还需要另外一个loader,就是`style-loader`;
4. 在配置文件中,添加style-loader;
    - 注意:因为loader的执行顺序是从右向左(或者说从下到上,或者说从后到前的),所以我们需要将style-loader写到css-loader的前面;


#### less-loader 处理less文件
1. 安装`npm i less-loader -D`

### sass-loader 处理sass文件
1. 安装`npm i sass-loader sass -D`

### 认识PostCSS工具
1. 什么是PostCSS呢?
    1. PostCSS是一个通过JavaScript来转换样式的工具;
    2. 这个工具可以帮助我们进行一些`CSS的转换和适配`,比如自动活添加浏览器前缀、css样式的重置;
        - 但是实现这些功能,我们需要借助于`PostCSS对应的插件`:
2. 如何使用PostCSS呢?主要就是两个步骤:
    1. 第一步: 直找PostCSS在构建工具中的扩展,比如webpack中的`postcss-loader`;
    2. 第二步: 选择可以添加你需要的`PostCSS相关的插件`;
3. 使用 `postcss-loader`
    1. 我们来安装postcss-loader: `npm install postcss-loader -D`
    2. 我们修改加载css的loader:(配置文件已经过多,给出一部分了)
    3. 注意:**因为postcss需要有对应的插件才会起效果,所以我们需要记置它的plugin;**
    ```js
    {
        loader: 'postcss-loader',
        options: {
            postcssOptions: {
                plugins: [
                    'autoprefixer'
                ]
            }
        }
    }

    ```
4. 单独的`postcss`配置文件
    1. 因为需要添加前缀，需要安装`autoprefixer`
    2. 我们可以将这些配置信心放在一个单独的文件中进行管理
        1. 在根目录下创建 `postcss.config.js`
        ```js
        module.exports = {
            plugins: [
                require("autoprefixer")
            ]
        }

        ```
5. postcss-preset-env
    1. 事实上,在`配置postcss-loader时,我们配置插件并不需要使用autoprefixer`
    2. 我们可以使用另外一个插件:`postcss-preset-env`
        1. postcss-preset-env也是一个postcss的插件;
        2. 它可以帮助我们将一些现代的CSS特性,转成大多数浏览器认识的CSS,并且会根据目标浏览器或者运行时环境添加所需的`polyfill`;
        3. 也包括会自动帮助我们添加autoprefixer(所以相当于已经内置了);
    3. 首先,我们需要安装`postcss-preset-env`: `npm install postcss-preset-env -D`
    4. 之后,我们直接修改掉之前的autoprefixer即可:
    ```js
        plugins: [
            require("postcss-preset-env")
        ]
    ```









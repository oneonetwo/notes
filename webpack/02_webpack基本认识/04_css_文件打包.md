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

### sass-loader处理sass文件
1. 安装`npm i sass-loader sass -D`






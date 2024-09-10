### webpack的安装

1. webpack的安装目前分为两个:`webpack`,`webpack-cli`

2. 那么它们是什么关系呢?
    1. 执行`webpack命令`,会执行node_modules下的.bin目录下的webpack;
    2. webpack在执行时是依赖webpack-cli的,如果没有安装就会报错;
    3. 而webpack-cli中代码执行时,才是真正利用webpack进行编译和打包的过程;
    4. 所以在安装webpack时,我们需要同时安装webpack-cli(第三方的脚手架事实上是没有使用webpack-cli的,而是类似于自己的vue-service-cli的东西)
3. 安装
    1. `npm install webpack webpack-cli -g` # 全局安装
    2. `npminstallwebpack webpack-cli -D` # 局部安装
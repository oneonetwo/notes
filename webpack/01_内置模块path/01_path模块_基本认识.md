### path内置模块
##### 一. 基础认识
1. path模块用于对`路径和文件`进行处理,提供了很多好用的方法。
2. 我们知道在MacOS、Linux和window上的路径时不一样的的
    1. window上会使用\或者\\来作为文件路径的分隔符,当然目前也支持/;
    2. 在MacOS、Linux的Unix操作系统上使用/来作为文件路径经的分隔符
3. 那么如果我们在window上使用\来作为分隔符开发了一个应用程序,要部署到Linux上面应该怎么办呢?
    1. 显示路径会出现一些问题;
    2. 所以为了屏蔽他们之间的差异,在开发中对于路径的操作我们可以使用path模块;
4. 可移植操作系统接口(英语:PortableOperating System Interface,缩写为POSIX)
    1. Linux和Mac OS都实现了POSIX接口;
    2. Window部分电脑实现了POSIX接口;

 

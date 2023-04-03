# python基础语法入门
## 基础
### 基础类型
-   str int float bool list set map Dictionary
1. list列表 有序存储
    1. [] index insert append extend pop del remove clear count  
2. 元组 有序存储
    1.  (1,'hello', 'jingyuan')
    2. 一旦定义完成，元素不可以被修改 
    3. 方法： index  count len 
    4. 如果元素内的元素有list, 那么list是可以修改的。
3. 字符串
    1. 方法： index  replace(str1, str2)   split  strip('str')  count  

4. 序列：
    1. 内容连续，有序，支持下标索引的一类数据容器，比如 列表，元祖, 字符串
    2. 对序列的切片操作
        - 可以对list, tuple, string等进行切片
        - [1,2,4][1:2:2]  [开始:结束：步长]
    3. 序列[起始：结束：步长]
        - 起始可以省略，省略从头开始。
        - 结束可以省略，省略到尾结束。
        - 步长可以省略，省略步长为1（可以是负数，表示倒叙执行）
5. set(集合)：无序切元素不能重复
    1. set() 空集合只能是set();
    2. 方法：add   remove  pop随机取出   clear difference差集      difference_update     union   
    ```python
        set1 = {1, 3, 5, 7, 9}
        set2 = {2, 4, 6, 8, 10, 1}
        # 取差集，生成新的set, set1裡面有的元素，set2裡面沒有的元素。
        diffSet = set1.difference(set2)
        print(f"set1和set2的差集：{diffSet}")
        # 刪除差集，在set1中消除set2中相同的元素, set1会改变，set2不会变
        set1.difference_update(set2)
        print(f"set1消去差集：{set1}")
        # 合并成新的集合，set1和set2 不会改变
        unionSet = set1.union(set2)
        print(f"set1和set2合并的新集合：{unionSet}")
    ```
    3. 集合的遍历：
        1. for in
6. 字典dictionary key-value键值对的集合。
    1. 定义： {}空字典
    2. 操作： `dict.pop(key)`  `dict.clear()`  `dict.keys()`   `len(dict)`;    

7. 通用操作
    1. `len` `max`  `min`
    2. str() list() set() tuple()
    3. sorted() 对内容排序返回个列表   sorted(序列，[reverse=true])反排

8. 字符串大小比较
    1. ASCII码表 每个字符都对应一个ascii码值， 字符串额比较就是基于ascii码值大小进行比较的
    2. 字符串是按位比较，也就是一位一位的进行比较，只有有一位大，那么整体就大。
 
9. 函数
    1. return 多返回值 多个变量接受
    2. 函数参数
        1. 位置参数，
        2. 关键字参数user_info(name="xiaoming", age="20"), 可以不按照顺序传参 
        3. 缺省参数：定义函数的时候可以 给参数个默认值 def user_info(name, age, gender="男")； 默认参数必须写到最后面。
        4. 不定长参数，用*号表示
            1. def user_info(**kwargs){  kwargs是一个字典。 }   
            2. def user_info(*args) { args是一个元祖 }
     3. 函数作为参数
     4. lambda 匿名函数, 只能写一行
        -  `def test_fun(lambda x,y: x+y)`
        
### 文件操作
1. 文件编码
    1. 什么是编码
        - 编码是一种规则集合，记录了内容和二进制间进行相互转换的逻辑。编码有许多中，我们常用的是UTF-8编码
    2. 为什么需要编码
        - 计算机值识别0和1，所以需要将内容翻译成0和1才能保存在计算机中，同时也需要编码，将计算机的0和1，反向翻译成可以识别的内容。 
    
2. 文件读取
    1. 打开文件 open(name, mode, encoding)
        1. name 是文件所在的具体路径
        2. mode, 只读r，写入w，追加a 三种。
        3. encoding 编码格式(推荐使用UTF-8) 是关键字参数直接指定。
        4. f = open('python.txt', 'r', encoding="utf-8")
    2. 读写文件
        1. 读取
            1. f.read(1); 文件的读取 read不传则读取所有文本，
            2. f.readlines(); 读取所有行，返回一个list;
            3. f.readline(); 每次读取一行数据
            4. for循环读取 for line in open(...) //每次读取{line}一行
        2. 写入： w模式，没有文件则创建，符覆盖文件的内容。
            1. f.write('hello world'); 文件内筒写入到内存中
            2. f.flush()  将内存中内容写入硬盘。
        3. 追加模式 a, 如果文件不存在则创建文件，如果存在则追加，可以用\n来换行。
    3. 关闭文件
        1. f.close();给文件占用停掉  内置了f.flush的功能。
    4. `with open("D"/") as f` 通过with open语法打开文件可以自动关闭。 
### 异常捕获
1. 捕获方式以及API
    1. try except  else finaly
    ```
        #捕获一个异常
        try:
            print(name)
        except NameError as e:
            e是错误对象。
        #捕获多个异常  变量未定义或者1/0异常
        except (NameError, ZeroDivisionError) as e:
        #捕获全部的异常
        except: === except Exception as e: 
        #捕获的 else: 可选 如果没有异常要做执行的代码
        #捕获的finaly: 可选 有没有都会执行的
    ```
### 模块的概念和导入
1. 基本语法
    - `import 模块名.方法名`
    - `form 模块名 import 方法名`
    - `from [模块名] import *` 下面可以直接用方法名
    - 可以用as给模块或者方法名设置别名   
2. 自定义模块
    - 引用的模块会被直接运行，
    - __name__  防止被运行的模块的函数调用
    - __all__ 可以控制引用*的行为(*不写all就是全部)时候可以调用函数  `__all__=['test_A']`
    ```
        def test(a, b):
            return a+b

        if __name__ == '__main__': //mian是run的时候的文件的标识
            test(1, 3)
    ```
3. python包
    1. 是什么
        - 文件夹里面是模块文件
    1. 自定义python包  必须要有__init__.py文件
4. 安装第三方包
    1. 非Python内置的包
    2. cmd普通安装  pip是python内置的安装模块
       - `pip install '包名'`
       - 默认是下载国外的包，可以用清华大学提供的镜像网址 https://pypi.tuna.tsinghua.edu.cn/simple
           - `pip intall -i https://pypi.tuna.tsinghua.edu.cn/simple 包名`
    3. pycharm安装
       - 右下角点击选择interpreter settings 安装
    4. 比较常用的包
        - 科学计算  numpy
        - 数据分析  pandas
        - 大数据计算    pyspark apache-flink
        - 图像可视化    matplotlib / ˈmɑːplɒt / pyecharts
        - 人工智能  tensorflow / ˈtensər /



### JSON的数据格式
1. json 就是个字符串
2. json格式数据转化
    - 通过json.dumps(data) 把python数据转为json数据 如果有中文可以带上 ensure_ascii=False 参数来确保中文正常转换
    - 通过json.loads(data) 方法把json数据转化为python列表或者字典。

### pyechars模块
1. 百度开源的数据可视化
    - pyechars.org 
    - 画廊 gallery.pyecharts.org
2. 安装 pip install pyecharts

### 类和对象
1. class内置的方法
    1. 构造方法_init__
    2. __str__ __lt__ __le__ __eq__
2. 私有成员的定义 __开头
3. 继承 
    1. 单继承 `class 子类名(父类名):`
    2. 多继承 `class 类名(父类1，父类2，父类3...):`
    3. 子类使用父类的成员
        1. 父类名.成员名称(self)
        2. super().成员名称();  成员方法不需要传self
    4. 复写
4. 类型注解 显示提醒类型注解，是建议性的而不是强制性的
    1. 变量的类型注解

        ```
            # 类对象的类型注解。
                class Student:
                    pass
                stu: Student = Student()
            #容器的类型注解
                my_list: list[int] = [1, 2, 3]
                my_tuple: tuple[int, str] = [1, 'a']
                my_dict: dict[str, int] = {"name": 666}
        ```
    2. 函数的类型注解
        1. 形参的类型注解和返回值的类型注解
        ```
            def add(x: int, y: int) -> int:
                return x + y
        ```
    3.  注释进行类型注解
        `var_1 = random.randint(1, 10) # type: int`
    4. Union类型(联合类型注解)： 多个类型中的一个
        ```
        from typing import Union
        my_list: list[Union[str, int]] = [1,2,'name']
        def fun_1(name: Union[str, int]) -> Union[str, int]:
            pass
        ```
    5. 多态： 指的是多种状态，对于不同的对象执行同一个行为会得到不同的状态。
        1. 多态也会用在抽象类上

  ### SQL入门和实战
1. mysql命令行环境  www.mysql.com
    1. mysql -uroot -p  然后输入密码就进来了，
    2. show databases 管理的数据库
    3. use word 使用word数据库
    4. show tables 查看word库中的表
2. 安装工具
    1. https://dbeaver.io/download
3. SQL的概述
    1. SQL全称：Structured Query Language 结构化查询语言，用于访问和处理数据库的标准的计算机语言。
    2. SQL语言的分类
        1. 数据定义DDL Data Definition Language
            库的创建删除，表的创建删除
        2. 数据操纵DML Data Manipulation Language
            新增数据、删除数据、修改数据
        3. 数据控制DCL Data Control Language 
            新增用户、删除用户、密码修改、权限管理
        4. 数据查询DQL Data query languagte
            基于需求查询和计算数据

### Spark   pySpark
1. 介绍
    - Apache Spark用与大规模数据，处理的统一分析引擎。
    - Spark是一款分布式的计算框架，用于调度成败上千的服务器集群，计算TB，PB,以及EB级别的海量数据。
2. PySpark 是Spark官方开发的python的语言第三方库
    1. 作为python库进行数据处理
    2. 提交至Spark集群进行分布式集群计算。      
    

### 闭包
1. 有点
    1. 不用定义全局变量既可以实现通过函数，持续访问修改某个值
    2. 闭包使用的变量的所用于在函数内，难以被错误的调用修改。
2. 缺点：
    1. 由于内部函数持续引用外部函数的值，所以会导致这部分内存空间不被释放，一直占用内存。
3. nonlocal 关键字
    - 在闭包函数中想要修改外部函数的变量值，需要用nonlocal声明这个变量。

### 装饰器  @outer

### 多线程
1. 进程，线程，并行执行
    1. 进程：就是一个程序，运行在系统之上，那么久称这个程序为运行进程，并分配进程ID方便系统管理。
    2. 线程：线程归属于进程，一个进程可以开启多个线程，执行不同的工作是进程的最小单位
        - 进程之间内存隔离，线程之间内存共享
    3. 一个操作系统可以运行不同的程序，就是说可以并行多个进程，除了进程外，线程也是可以并行的
2. 多线程编程: 掌握使用`threading`模块完成多线程编程
    1. 使用
        - thread_obj = threading.Thread(target=func)
        - thread_obj.start() 启动线程执行。
    2. threading.Thread(group, target, name, args, kwargs)
        - target 執行的任務名
        - args以元祖的方式给任务传参 `(参数1, )`
        - kwrags: 以字典的形式给任务传参`{keys: 参数1}`
        - name：线程名，一般不设置
### socket： 套接字，是进程之间通信的一个工具。
    - Socket负责进程之间的网络数据的传输，好比数据的搬运工。
    - 借助网络调试助手 `https://github.com/nicedayzhu/netAssist/releases`
1. 服务端开发
2. 客户端开发
### 正则表达 使用re模块
1. 三个基础方法 match search findall
    1. re.match(匹配规则, 字符串)，
        - 从匹配字符串的开头进行匹配，成功则返回匹配对象，不成功返回None
        
    2. search(匹配规则，字符串) 
        - 搜索整个字符串，找出匹配的，从前向后，找到第一个就停止，不会继续向后, 找不到返回None
    3. findall 匹配全部找到返回list，没找到返回空的list
    ```
        s = 'jingyuan 123 yang'
        res = re.match('jing', s)
        if res:
            print(f"匹配的下标： {res.span()}")
            print(f"匹配的规则： {res.group()}")


        res2 = re.search('yuan', s)
        if res:
            print(res.span())
            print(res.group())

        res3 = re.findall('jingyuan', s)
        print(f"findall匹配： {res3}")

        res4 = re.findall(r'[\w\s](y)(\w)', s)
        print(f"这是正则：{res4}")
        # 这是正则：[('y', 'u'), ('y', 'a')]
        
    ```
2. 元字符匹配

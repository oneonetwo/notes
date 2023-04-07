# python基础语法入门
## 基础
1. 数字类型
    1. random.choice(seq) seq -- 可以是一个列表，元组或字符串。
    2. random.randrange ([start,] stop [,step])
    3. random()	随机生成下一个实数，它在[0,1)范围内。
    4. seed([x])  当我们预先使用 random.seed(x) 设定好种子之后，其中的 x 可以是任意数字
    5. shuffle(list)	将序列的所有元素随机排序
    6. random.uniform(x, y) 随机数的最小值，包含该值。 随机数的最大值，包含该值。
    ```
    str_list = ['a', 'b', 'c']
    print(random.choice(str_list))

    # 从 1-100 中选取一个奇数
    print("randrange(1,100, 2) : ", random.randrange(1, 100, 2))
    # 从 0-99 选取一个随机数
    print("randrange(100) : ", random.randrange(100))

    random.seed()
    print ("使用默认种子生成随机数：", random.random())
    random.seed(10)
    print ("使用整数 10 种子生成随机数：", random.random())

    random.seed("hello",2)
    print ("使用字符串种子生成随机数：", random.random())

    print ("uniform(5, 10) 的随机浮点数 : ",  random.uniform(5, 10))
    ```
2. 数组
    1. list.append(obj) 在列表末尾添加新的对象
    2. list.count(obj) 统计某个元素在列表中出现的次数
    3. list.extend(seq) 在列表末尾一次性追加另一个序列中的多个值（用新列表扩展原来的列表） seq -- 元素列表，可以是列表、元组、集合、字典，若为字典,则仅会将键(key)作为元素依次添加至原列表的末尾。
    4. list.index(x[, start[, end]]) 从列表中找出某个值第一个匹配项的索引位置
    5. list.insert(index, obj) 将对象插入列表的指定位置 index -- 可选参数，要移除列表元素的索引值，不能超过列表总长度，默认为 index=-1，删除最后一个列表值
    6. list.pop([index=-1]) 移除列表中的一个元素（默认最后一个元素），并且返回该元素的值
    7. list.remove(obj) 移除列表中某个值的第一个匹配项
    8. list.reverse() 反向列表中元素
    9. list.sort( key=None, reverse=False) 对原列表进行排序
        - key -- 主要是用来进行比较的元素，只有一个参数，具体的函数的参数就是取自于可迭代对象中，指定可迭代对象中的一个元素来进行排序。
        - reverse = True 降序， reverse = False 升序（默认）。
    10. list.clear() 清空列表
    11. list.copy() 复制列表
3. 字典
    1. `dict.clear()` 删除字典内所有元素
    2. `dict.copy()` 返回一个字典的浅复制
    3. `dict.fromkeys(seq, [value])` 函数用于创建一个新字典，以序列 seq 中元素做字典的键，value 为字典所有键对应的初始值。
        - seq -- 字典键值列表。value -- 可选参数, 设置键序列（seq）对应的值，默认为 None。
    4. `dict.get(key, default=None)`  函数返回指定键的值。
        - key -- 字典中要查找的键。
        - value -- 可选，如果指定键的值不存在时，返回该默认值。
    5.  `key in dict`  in 操作符用于判断键是否存在于字典中. not in
    6. `dict.items()` 字典 items() 方法以列表返回视图对象，是一个可遍历的key/value 对。
    7. `dict.keys()`
    8. `dict.values()`
    9. `dict.setdefault()`  setdefault() 方法和 get()方法 类似, 如果键不存在于字典中，将会添加键并将值设为默认值
    10. `dict.update(dict2)` dict2 -- 添加到指定字典dict里的字典。
    11. `pop(key[,default])` 删除字典 key（键）所对应的值，返回被删除的值。
        - key - 要删除的键
        - default - 当键 key 不存在时返回的值
    12. `dict.popitem()` 随机返回并删除字典中的最后一对键和值 
        - 如果字典已经为空，却调用了此方法，就报出 KeyError 异常。
4. 集合
    1. `set.add()`	为集合添加元素
    2. `set.clear()`	移除集合中的所有元素
    3. `set.copy()`	拷贝一个集合
    4. `set.difference(set)` 返回集合的差集，即返回的集合元素包含在第一个集合中，但不包含在第二个集合(
    5. `set.difference_update(set)`	方法是直接在原来的集合中移除元素，没有返回值。
    6. `set.discard()`	删除集合中指定的元素
    7. `set.intersection(set1, set2 ... etc)	 方法用于返回两个或更多集合中都包含的元素，即交集。
    8. `set.intersection_update()`	方法是在原始的集合上移除不重叠的元素。
    9. `set.isdisjoint()`	判断两个集合是否包含相同的元素，如果没有返回 True，否则返回 False。
    10. `set.issubset()`	方法用于判断集合的所有元素是否都包含在指定集合中，如果是则返回 True，否则返回 False。
    11. `set.issuperset()`	方法用于判断指定集合的所有元素是否都包含在原始的集合中，如果是则返回 True，否则返回 False。
    12. `set.pop()`	法用于随机移除一个元素。
    13. `set.remove()`	移除指定元素
    14. `set.symmetric_difference()`	返回两个集合中不重复的元素集合。。
    15. `set.symmetric_difference_update()`	移除当前集合中在另外一个指定集合相同的元素，并将另外一个指定集合中不同的元素插入到当前集合中。
    16. `set.union()`	方法返回两个集合的并集，即包含了所有集合的元素，重复的元素只会出现一次。
        - set1 -- 必需，合并的目标集合
        - set2 -- 可选，其他要合并的集合，可以多个，多个使用逗号 , 隔开。
    17. `set.update(set)`	合并两个集合，重复元素只会出现一次：
    18. 运算
        - 交集 & : x&y，返回一个新的集合，包括同时在集合 x 和y中的共同元素。
        - 并集 | : x|y，返回一个新的集合，包括集合 x 和 y 中所有元素。
        - 差集 - : x-y，返回一个新的集合,包括在集合 x 中但不在集合 y 中的元素。
        - 补集 ^ : x^y，返回一个新的集合，包括集合 x 和 y 的非共同元素。
### Python的标准库
### OS模块
    - 对文件和目录的操作
1. `os.rename('论文.txt', '我的论文.txt')` 文件重命名 
2. `os.remove(filename)` 删除文件
3. `os.mkdir('test/aa')` 创建目录
4. `os.rmdir('test/aa')` 删除目录
5. `os.getcwd()` get current working directory 获取当目录名称
6. `os.chdir(目录名)` 切换目录      ../返回上一级
7. `os.listdir()` 获取指定目录的内容， 返回列表

### File模块
### 类和对象
1. self 作为类中方法的第一个形参，不需要手动传递实参
2. 魔法方法：两个下划线开头和结尾，在满足某个条件下会自动调用。
    1. __init__ 构造函数 `def __init(self):`
        1. 调用时机：创建对象时会立即调用。
        2. 作用：
            1. 给对象添加属性，赋初始值
            2. 创建对象时，需要执行的业务逻辑。
    2. __str__  
        1. 调用时机：
            - `print(对象)`, 会自动调用`__str__`方法，打印输出的结果是方法的返回值 
            - `str(对象)`，类型转化
        2. 作用
            - 1. 打印对象的时候，输出一些属性信息
            - 2. 需要将对象转化为字符串的时候
        3. 注意：
            - 方法必须返回一个字符串，只有self一个参数
            - 没有定义`__str__`，返回的是引用地址
    3. __del__ 析构函数
        1. 调用时机：
            1. 对象在内存中被销毁，删除的时候自动调用__del__方法
                1. 程序代码结束，创建的对象和变量都会被删除
                2. 使用`del 变量` 将这个对象的引用计数变为0. 会自动调用这个方法。
        2. 注意
3. 继承
    1. `class A类(B类, C类...)` 
    2. 重写父类的方法
    3. 调用父类的三种方法   
        1. 父类.方法名(slef): `Dog.bark(self)`
        2. super(Dog, self).bark()
        3. super().bark()
    4. 子类给父类的_init__方法传参，需要手动调用
        1. `super().__init__(name)` 注意要先写父类的
4. 多继承
    1. 父类方法同名，那么先调用谁的就继承谁的
    2. 调用父类的方法
        1. 类名.方法名(self, 参数)
        2. super(类A, self).方法()
5. 私有属性,私有方法 只能在类内部使用前加两个下划线。
    1. 目的： 保证数据的相对安全。
    2. 使用：定义公有方法使用私有属性。
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

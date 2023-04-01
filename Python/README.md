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


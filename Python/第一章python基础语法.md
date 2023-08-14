## Python基础语法
一. [计算机组成](#一-计算机组成)  
二. [初始python与Pycharm设置](#二-初始python与pycharm设置)  
三. [变量定义与使用](#三-变量定义与使用)  
四. [Python的输入与输出](#四-Python的输入与输出)  
五. [类型转化](#五-类型转化)  
六. [分支结构-if-else](#六-分支结构-if-else)  
七. [分支结构-if嵌套与应用](#七-分支结构-if嵌套与应用)  
八. [循环结构-while](#八-循环结构-while)  
九. [循环结构-for](#九-循环结构-for)  
十. [循环中的关键词语总结](#十-循环中的关键词语总结)  
十一. [字符串的定义与切片](#十一-字符串的定义与切片)  
十二. [字符串常用方法](#十二-字符串常用方法)  
十三. [列表定义与基本使用](#十三-列表定义与基本使用)  
十四. [列表嵌套与应用与元祖](#十四-列表嵌套与应用与元祖)  
十五. [字典定义与基本使用](#十五-字典定义与基本使用)  
十六. [函数定义函数作用域](#十六-函数定义函数作用域)  
十七. [函数返回-嵌套调用及应用](#十七-函数返回-嵌套调用及应用)  
十八. [函数答疑总结复习](#十八-函数答疑总结复习)  
十九. [函数不定长参数及拆包](#十九-函数不定长参数及拆包)  
二十. [引用及引用参数](#二十-引用及引用参数)  
二十一. [学员管理系统-面向过程版本](#二十一-学员管理系统-面向过程版本)  
二十二. [递归函数与匿名函数](#二十二-递归函数与匿名函数)  
二十三. [匿名函数使用及列表推导式](#二十三-匿名函数使用及列表推导式)


### 一. 计算机组成
1. 计算机系统组成
    1. 是由`硬件系统`和`软件系统`两发部分组成的。
        - 硬件系统：主机部分（中央处理器，内存储器）和外设部分（输入设备，输出设备，外存储器）
        - 软件系统：系统软件（操作系统，驱动程序）和 应用软件（浏览器，音视频播放器等等）
2. 计算机如何处理程序的
    1. 打开应用程序，操作系统将程序内容和相关数据送入计算机内存，cpu根据程序内容从内存中读取指令，CPU分析处理指令, 如此重复操作，知道执行完程序中全部指令，最后将计算的结果放入指令的存储器地址中。

    2. cpu只能跟内存进行交互，不能操作硬盘。
3. 编程语言是什么？
    1. 用来定义计算机程序的形式语言，我们通过编程语言来编写程序代码，在通过语言处理程序执行向计算机发送指令，让计算机完成对应的工作。
### 二. 初始python与Pycharm设置
1. pep 8
    1. 行内注释需要两个空格
    2. 最后一行代码 要有个回车换行
    3. 代码要顶格
### 三. 变量定义与使用
1. 变量以及类型
    1. Numbers  
        1. int, long,  float,  complex
    2. 布尔类型
        1. True, False
    3. String
    4. List
    5. Tuple
    6. Dictionnary
2. type(a) 函数可以得到数据类型
3. 标识符
    1. python中变量区分大小写
    2. 小驼峰
    3. python中的标识符 多用下划线。
4. 关键字
### 四. Python的输入与输出
1. 输出 %d %f  %s
    - %f 输出小数，默认保留六位小数。`%.nf` 保留n位小数
```python
name = 'jingyuan'
print("我的名字是%s" % name)
height = 170.5
print("我的身高是%.2f cm" % height)
print("我的名字是%s,年龄是%d岁" % (name, age))

#输出50% 使用格式化输出的时候，想要输出一个%,需要使用两个%%
print("及格人数占比为%d%%" % 50)

age = 6
print("我的年龄是%03d" % age)
print(f"我的年龄是{age: 03d}")
#python3.6版本开始使用f-string, 占位统一使用{}占位
print(f"我的名字是{name}")
#指定小数点的位数
print(f"我的身高是{height:.2f}") 

# 转义字符\n 换行
# print()函数输出后，会默认添加一个换行，这个换行可以去掉
print("hello", end='')  #end必须是一个字符串
print("这是一个段落和另一个段落")
```
2. 输入 input 从键盘获取输入的内容，存入计算机程序， 得到的都是字符串类型。

```py
password = input("请输入密码：")
print(f"密码是{password}")
```
### 五. 类型转化
1. 将原始数据转化为我们需要的数据类型，在这个过程中，不会改变原始的数据，会生成一个新的数据。
2. 整数类型字符串=>int整数，小数类型的字符串=>float小数
3. eval('10') 去掉字符串的引号。 `eval('num1')去掉引号就是一个变量`
```py
#1.基本运算符
+ - * / // ** % ()
#2.比较运算符
==  !=  < > <= >=
#3.逻辑运算符
    and 逻辑与 
    or 逻辑或
    not 逻辑非
```
### 六. 分支结构-if-else
1. 判断的基本格式
### 七. 分支结构-if嵌套与应用
1. 三目运算
```py
变量 = 表达式1 if 判断条件 else 表达式2
```
### 八. 循环结构-while
1. while
```py
while True:  #无限循环
    print("这是，")

```
### 九. 循环结构-for
1. `for 临时变量 in  列表或者字符串等可迭代对象:`
```py
# range(n) 会生成[0, n)的数据序列，不包含n
for i in range(5):  # 0 1 2 3 4  
# range(a, b) 会生成[a, b)的整数序列，不包含b
for i in range(3, 7)
#  range(a, b, step) 的整数序列，但是每个数字之间的间隔（步长）是step
for i in range(1, 10, 3) # 1 4 7
```
### 十. 循环中的关键词语总结
1. `break continue pass`
2. for 配合 else的使用
```py
for x in xxx:
    if(x):
        break
else:   # for循环结束，但是不被break终止的时候会执行
    xxx
```
### 十一. 字符串的定义与切片
1. 字符串  `'hello' * 2  #hellohello` 
2. `f-strings`
3. `下标my.str[0]  获取长度 len(my_str)`
4. 切片：字符串，列表，元祖都支持切片操作
    1. 语法：【起始：结束：步长】
```py
my_str = "hello"
#1. step如果是1，即默认值，则可以不写
my_str[2:4]  #ll
#2. end位置不写，表示len(), 既可以取到最后一个元素
my_str[2:]  #llo
#3. start位置不写，表示是0，表示是0
my_str[:3]  #hel

#开始位置和结束位置都不写
my_str[::2]  #hlo
my_str[-4:-1] #ell
my_str[:]  #hello

#步长可以是负数
my_str[3:1:-1] 
my_str[::-1] 字符串的逆置
```
### 十二. 字符串常用方法
1. 字符串查找相关的
```py
find(sub_str, start, end)   # 找到返回下标，未找到返回-1
rfind(sub_str, start, end)  #从后面开始查找。
index(sub_str, start, end)  #找到返回下标，没有找到代码会报错。
rindex(sub_str, start, end)
count(sub_str, start, end)  #子字符串出现的次数，没有返回0， 
```
2. 字符串替换相关
```py
replace(old_str, new_str2, count) # old替换成new, count默认全部替换， 返回得到一个新写字符串，不会改变原来的字符串。
```
3. 字符串切割 和 链接
```py
split(str, count) #字符串以str进行切割，count为切割的次数
rsplit(str, count)

join(seq) #seq为可迭代的对象（str,tuple, list），
'-'.join(['a','b','c'])  #a-b-c
```
4. 字符串其他
```py
capitalize() #第一个字母变为大写
title() #每个单词的首字母变成大写
upper() #全部转为大写
lower() # 全部转为小写
startswith(str) # 以str开头
endswith(str) #以什么结尾
	
center(width, fillchar) # 返回一个指定的宽度 width 居中的字符串，fillchar 为填充的字符，默认为空格
rjust(20)
ljust(20)
strip() #去掉空格
lstrip()
rstrip()
partition(str) #按照str切割成及分布

isalpha() #查看是否全是字母或者数字中文
isalnum() #字母或者数字
isdigit() #是否全是数字
isnumeric() #是否只包含数字
isspace()

```
### 十三. 列表定义与基本使用
1. 常用的方法
```py
len(lists)
max(lists)
min(lists)
list(seq) #将元祖转化为列表

lsit1.index('jingyuan') #根据数据返回下标，没有找到则报错
lsit1.count('jingyuan') #当前元素在数组中出现的次数
'jingyuan' in list1  # in /not in  

list1.append(数据) #向尾部追加数据
list1.insert(1, 'jingyuan') 
list1.extend(list2) #在列表末尾一次性追加另一个序列的多个值 

list1.pop([index=-1]) #移除默认是尾部元素，返回这个元素的值
lsit1.remove('jingyuan') #移除列表中匹配的第一项，没有返回值， 不存在则报错
del list[2] #删除列表中的元素

list1.sort(key=None, reverse=False)  #直接在原列表进行排序，默认是升序处理
#补充 sorted(list1) 不会再原列表中进行排序，会返回新的列表
list1.reverse() #原列表中操作。   如果想操作新的列表使用切片 [::-1]
list1.clear()
list1.copy() #复制后的新列表想 相当于a[:]
```

2. enumerate(my_list) #将可迭代的元素所咋的小标和具体的元素放在元组中 `for i k enumerate(my_list):`
### 十四. 列表嵌套与应用与元祖
1. 元祖的重点注意
    1. 元组的值不可以修改
    2. `(2,)`必须要有逗号，没有则不时元祖
2. 方法
```py
tup3 = tup1 + tup2 #创建一个新的元祖
del tup #删除整个元祖
('Hi!',) * 4 #复制
3 in (1, 2, 3) #元素是否存在

tuple(list1) #转为元组
```
### 十五. 字典定义与基本使用
1. get的使用
    1. 如果key如果不存在，直接获取会报错，可以用get获取 `dict1.get('name')`  如果key不存在，则返回None,`dict1.get('name', 'jingyuan')`
2. 字段的方法
```py
my_dict = {}
# 1. 字段中添加和修改数据
my_dict['name'] = 'jingyuan'
my_dict.setdefault(key, default=None) # 和get()类似, 但如果键不存在于字典中，将会添加键并将值设为default
my_dict.update(dict2) #把字典dict2的键/值对更新到dict里

# 2. 字典中删除数据
del my_dect #直接删除这个字段了，之后就不能访问这个变量了
del my_dict['name']
my_dict.pop('name') #返回删除的元素
my_dict.popitem() #返回并删除字典中最后一对键值
my_dict.clear() #删除字典左右元素

# 3. 遍历 以及 拆包
my_dict.items()     # 获取字典中所有的键值对，得到的是 dict_items，key, value组成的元组类型， 1.可以使用list()，进行类型转换。2.可以用for循环遍历
my_dict.keys()      # 获取字典中所有的key，得到的是 dict_keys类型, 1.可以使用list()，进行类型转换。2.可以用for循环遍历
mu_dict.values()    # 获取所有的value,得到的是 dict_values类型，1.list(), 2.可用for
for k, v my_dict.items(): # k是元组中第一个数据，v是元组中的第二个数据。

# 4. key in dict #如果键在字典dict里返回true，否则返回false
```

3. 公共方法 和 python的内置函数
    1. `+`
    2. `* 整数`
    3. `in/not in`
    4. `max/min` 如果是字典，那么比较key值的大小
    5. `del()` del加空格 del()
    6. `len()`
    7. `count()`
### 十六. 函数定义函数作用域
1. 函数的定义 `def func():` 函数前端和后面都需要两个空行
2. 文档说明 
```py
def help():
    """
    这是一个打印的帮助函数
    """
    print('hello world')
```

3. 全局变量和局部变量
    1. 局部变量：只能在函数内部使用，不能在函数外部使用
        1. 作用域：当前函数内部
        2. 生命周期：当函数调用的时候被创建，函数调用结之后，被回收销毁。
    2. 全局变量：函数外部定义的变量
        1. 函数内部能访问全局变量的值，不能直接修改全局变量的值。
        2. 想要在函数内部修改全局变量的值，则 需要声明这个变量为全局变量`global g_num`
### 十七. 函数返回-嵌套调用及应用
1. return返回值
    1. 可以任意类型的数据， 返回多个值的情况：
    2. 可以不写数据值，默认代表返回None.
    ```py
    def func(a, b)
        return a+1, b+1     #默认是组成元祖进行返回的
    result =  func(1,2)
    result[0]
    result[1]
    ```
### 十八. 函数答疑总结复习
### 十九. 函数不定长参数及拆包
1. 函数传参的两种形式
    1. 位置传参： 按照形参的位置顺序
    2. 关键字传参: 指定实参传给哪个形参,`关键字参数要写在位置实参的后面。`
    3. 缺省参数：形参，在函数定义的时候给形参一个默认值，这个参数就是缺省参数。
        1. `缺省参数后面的形参都必须为缺省参数`
    4. 不定长参数：`*args`不定长元组形参 `**kwargs`不定长关键字形参
```py
# 1.普通，缺省参数
def func(a, b=1, ):
    pass
# 2. 普通参数，不定长位置参数
def func(a, *args)
    pass
# 3. 普通参数，缺省参数，位置参数，虽然这样写语法不会报错，但是缺省参数总不能用默认值。
def func(a, b=1, *args):
    pass
def func(a, *args, b=1):
    pass

# 4. 完整的顺序： 普通参数，不定长位置参数，缺省参数，关键字参数
def func(a, *args, b=1, **kwargs):
    pass
```
2. 拆包和组包
    1. 组包：将对个数据的值，给一个变量, 会默认组成一个元祖
    2. 拆包：将容器的数据分别给多个变量，需要注意数据的个数和变量的个数要保持一致。
    3. 应用：交换两个变量的值
```py
#组包
a = 1, 2, 3
print(a) #(1,2,3)
#拆包 元祖，字符串，字典都可以拆包
x, y, z = a

my_list = [10, 20]
x, y = my_list

my_str = 'abc'
x,y,z = my_str
print(x,y,z)

my_dict = {'name': 'jingyuan', 'age': '123'}
x, y = my_dict
print(x, y) # name, age
```
### 二十. 引用及引用参数
1. 不可变类型和可变类型
    1. 不可变类型： int fload boolean str  tuple
    2. 可变类型：dict list
```py
# 不可变类型：地址一样的，python内存优化，对与不可变类型进行的。 交互终端：小整数默认范围-5~255则使用相同的引用地址，如果不是，那么开辟新的内存。
a = 10
b = 10
print(id(a), id(b))  
```
2. 函数传参传递的也是引用
```py
# 对于可变类型 函数内部只有修改变量中的引用值时，需要global
my_list = [1,2,4]
def func():
    my_list.append(5)  # 因为是一个引用，所以不需要global
    global my_list  # 改变my_list的
    my_list = [1] 
    pass

# 对于列表的 += 相当于extend不会改变引用的地址，a = a + a会改变。
```
### 二十一. 学员管理系统-面向过程版本
1. 主要功能：增删改查的一些操作，存储学生的信息，功能菜单，业务框架。
### 二十二. 递归函数与匿名函数
1. 递归：1自己调用自己，2结束条件
2. 匿名函数： 使用lambda关键字定义的函数 `lambda 参数列表： 表达式 ` 例：`lambda: 1+2`, `lambda a, b: print(a, b)`
    1. 不能使用if语句，while循环，for循环。只能编写单行的表达式，或者函数调用，普通函数都可以。
    2. 匿名函数中返回结果不需要使用return,表达式的运行结果就是返回结果，普通函数返回结果必须return。
    3. 函数中也可以不返回结果，例如：`lambda: print('hello world')`
```py
#1. 无参数无返回值
(lambda: print('hello lambda'))()
f1 = lambda: print('hello lambda')  #不建议赋值给一个变量
f1()
#2. 无参数有返回值
f2 = lambda: 1+2
f2()
#3. 有参数无返回值 
f3 = lambda name: print(name)
f3('hello')
#4. 有参数有返回值
f4 = lambda *args: args
f4(1,2,3,4)

```

### 二十三. 匿名函数使用及列表推导式
1. 匿名函数作为函数参数使用
2. 匿名函数在列表排序中的使用
```py
my_list = [1,3,5,4,2,1]
my_list.sort()
print(my_list)

list2 = [{'name':'b', 'age': 18}, {'name':'aa', 'age': 22}, {'name':'cc', 'age': 35}]
list2.sort(key=lambda x: x['name'], reverse=False)
# 当第一个规则大小一致，会按照第二个规则进行排序
# sort(key= lambda 形参: (规则1, 规则2, ...))
list2.sort(key=lambda x: (x['age'], x['name']))
```
3. 列表推导式
```py
#1. 变量 = [生成规则 for 临时变量 in xxx]
my_list = [f"num_{i}" for i in range(5)]
#2. 变量 = [生成数据的规则 for 临时变量 in xxx if xxx]
my_list = [i for i in range(5) if i%2=0]
#3. 变量 = [生成规则 for i in xxx for j in xxx] 嵌套循环
my_list = [(i, j) for i in range(5) for j in range(6,11)]
```
4. 字典推导式
```py
# 变量 = {生成规则 for 临时变量 in  xxx}
my_dict = {f"name{i}": i for i in range(3)}
```
5. 集合 set {x1, x2,...}
    1. 集合中的数据必须是不可变类型
    2. 集合是可变类型
    3. 集合中的数据是无序的
    4. 集合中的数据没有重复数据
    5. remove(), pop(), add(), clear()

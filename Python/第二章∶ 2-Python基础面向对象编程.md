## Python基础语法
一. [文件常规读写操作](#一-文件常规读写操作)  
二. [文件其他操作及练习文件备份](#二-文件其他操作及练习文件备份)  
三. [文件案例-批量修改文件名](#三-文件案例-批量修改文件名)  
四. [类与对象初识](#四-类与对象初识)  
五. [对象属性访问及魔法方法使用](#五-对象属性访问及魔法方法使用)  
六. [面向对象案例-烤地瓜](#六-面向对象案例-烤地瓜)  
七. [案例-搬家具](#七-案例-搬家具)  
八. [面向对象-单继承](#八-面向对象-单继承)  
九. [面向对象-多继承及私有属性](#九-面向对象-多继承及私有属性)  
十. [面向对象-类属性、静态方法、多态](#十-面向对象-类属性、静态方法、多态)  
十一. [面向对象试题讲解及作用讲解](#十一-面向对象试题讲解及作用讲解)  
十二. [Python错误处理-Exception](#十二-Python错误处理-Exception)  
十三. [Python模块与包](#十三-Python模块与包)  
十四. [学生管理系统-面向对象版](#十四-学生管理系统-面向对象版)  


### 一. 文件常规读写操作
1. 打开文件，是从文件从硬盘中存到内存中。`open(file, mode='r', encoding=None)` 
    1. file要操作的文件名字，类型是str; 
    2. mode就是文件的打开方式，r(read)只读打开，w(write) 只写打开，a(append)追加打开
    3. encoding 文件的编码格式，常见的有两种一种是gbk, 一种是utf-8;
    4. 返回值，文件对象，后序所有的文件操作，都是在这个对象上进行。
```py 
#1. 以只读的方式打开文件
buf = open('1.txt', 'r')

#2.读文件 文件不存在会报错
buf.read() # 返回读取的内容
#3.关闭文件
buf.close()

#1. w方式打开文件，文件不存在，则会创建，文件存在，会覆盖清空源文件。 没有指定文件编码，windows默认是 gbk
buf2 = open('a.txt', 'w', encoding='utf-8')
buf2.write('hello world!\n')
buf2.write('你好，世界！')  # 使用默认的 gbk编码写入。则需要指定encoding='utf-8' 在pycharm中双击

#1. a方式追加文件，在文件的末尾写入内容
buf3 = buf3.open('a.txt', 'a', encoding='utf-8')
```
### 二. 文件其他操作及练习文件备份
1. 文件读操作
    1. `文件.read(n)` n是一次读取的多少字节的内容，默认不写，读取全部内容。
    2. `文件.readline()` 一次读取一行  参数表示的是读取的字节数，一般不写
    3. `文件.readlines()`   按行读取一次读取所有行，返回的是列表，列表的每一项即是一行的内容。
2. 模拟读取大文件, 两种方式
```py
# 1. readline
f = f.open('a.txt', 'r', encoding='utf-8')
while True:
    buf = f.readline()
    if buf: # if len(buf) > 0  容器，可直接作为判断条件，容器中有内容为True，没有数据是False
        print(buf, end='')
    else:
        #文件读取完成
        break
# 2. read(n)
while True:
    buf = f.read(5)  #5是字节数
    if buf:
        print(buf, end='')
    else:
        bread
f.close()
```
3. 文件的打开模式   
    1. 文本文件可以使用文本方式打开，也可以使用二进制的方式打开。
    2. 纹紧致的文件使用使用二进制的方式打开
        1. rb wb ab
```py
f = open('c.txt', 'wb')
bstr = '你好，世界'.encode()  # encode将字符串转为二进制 
f.write(bstr)
f.close

f1 = open('c.txt', 'rb')
buf = f1.read()
print(buf)  #b'\xe4\xbd\xa0\xe5\xa5\xbd\xef\xbc\x8c\xe4\xb8\x96\xe7\x95\x8c'
print(buf.decode()) #你好，世界
f1.close()
```
4. 文件的备份
```py
file_name = input('请输入文件名')
index = file_name.rfind('.')
# new_name = file_name[:index]  #文件名 
# suffix = file_name[index:]  #后缀
file1 = open(file_name, 'rb')
buf = file1.read()
file1.close()

new_file_name = file_name[:index] + '[备份]' + file_name[index:]
file2 = open(new_file_name, 'wb')
file2.write()
file2.close()
```

### 三. 文件案例-批量修改文件名
1. os模块  文件的相关操作
```py
# 1.  文件重命名 os.rename(原文件路径名, 新文件路径名)
os.rename('css.png', '这是图吧.png')

# 2. 删除文件 os.remove(文件的路径名) 找不到文件报错。
os.remove('a.txt')  

# 3. 创建目录 os.mkdir(目录名) make directory
os.mkdir('test')
os.mkdir('test/aa')

# 4. 删除空目录 os.rmdir(目录名) remove dorectory
os.rmdir('test/aa')

# 5. 获取当前所在的目录 os.getcwd()  get current working directory
os.getcwd()

# 6. 修改当前目录 os.chdir(目录名)  change dir
os.chdir('test')

# 7. 获取指定目录中的内容，os.listdir(目录)，默认不写参数，是获取当前目录中的内容。返回值是列表
buf = os.listdir()

# 8. 判断文件是否存在 os.path.exist(文件名) 存在True,不False
be = os.path.exist('a.txt')

```
2. 批量操作文件
```py
# 批量创建任务
def  create_files_1():
    # os.mkdir('test')
    # print(os.getcwd())
    os.chdir('test')
    for i in range(10, 20):
        file_name = 'file_'+str(i)+'.txt'
        f = open(file_name, 'w')
        f.write(str(i) * 100)
        f.close()
    os.chdir('../')
create_files_1()  

# 批量修改名称
def modify_files():
    os.chdir('test')
    files_list = os.listdir()
    print(files_list)
    for index,file in enumerate(files_list):
        print()
        os.rename(file, file + 'py' + str(index) + '_' + file)
    os.chdir('../')  #恢复到当前目录     


modify_files()

```
### 四. 类与对象初识
1. 类的定义与创建对象
```
class Dog(object):
class Dog():
class Dog:
```
### 五. 对象属性访问及魔法方法使用
1. self作为类方法中的第一个形参，在通过对象调用方法的时候，不需要手动的传递实参值。
    1. 类内部通过self操作属性。
2. 类的魔法方法, 在满足某个特定的情况下，会自动调用，这类方法，成为魔法方法。
    1. __init__ 相当于是`构造函数`
        1. 调用时机：在创建对象之后，会立即调用
        2. 作用：
            1. 用来给对象添加属性，给对象属性一个初始值
            2. 代码的业务需求，没创建一个对象，都需要执行的代码可以放在`__init__`函数中。
    2. __str__ 
        1. 调用时机：
            1. `print(对象)`，会自动调用`__str__`,输出的结果是`__str__`的返回值。
            2. `str(对象)`，类型转换，将自定义对象转换为字符串的时候，会自动调用
        2. 应用
            1. 答应对象的时候，输出一些属性信息
            2. 需要将对象转化为字符串类型的时候
        3. 注意点：
            `__str__`方法必须返回一个字符串，只有self一个参数。
    3. __del__ 析构函数， 引用计数
        1. 调用时机： 对象在内存中被销毁删除的时候会被调用'__del__'方法
            1. 程序代码运行结束，在程序运行过程中，创建的所有对象和变量都会被删除销毁
            2. 使用`del 变量`，将这个对象的引用计数变为0， 会自动调用`__del__`方法
        2. 应用：
            1. 对象被删除销毁的时候，要书写的代码放在`__del__`
        3. 注意点：
    4.__repr__ repr和str方法类似，也是返回一个字符串，调用之后不会返回引用地址，返回的是repr的返回值 
```py
class Dog(object):
    
    def __init__(self, name, age):
        self.name = name
        self.age = age
        print(f"我是__init__的方法，我被调用了{name}")


    def __str__(self):
        return f"狗子的名字是{self.name},年龄是{self.age}"

    def __del__(self):
        print(f"这是__def__的方法，被调用了")

    def __repr__(self):
        return f'{self.name}'

    def play(self):
        print('小狗快乐的拆家中...')
    

dog = Dog("花子", 22)
dog_list = [Dog('毛蛋', 4), Dog('小强', 4)]
del dog
print(123)  # 没有定义__str__，那么print默认输出对象的引用地址。
```
### 六. 面向对象案例-烤地瓜
1. 类的封装的使用
```py
# 烤地瓜
class Potato(object):
    def __init__(self):
        self.status = '生的'
        self.total_time = 0
    

    def cook(self, time):
        self.total_time += time
        if self.total_time < 3:
            self.status = '生的'
        elif self.total_time<6:
            self.status = '不生不熟'
        elif self.total_time<10:
            self.status = '熟了'
        else:
            self.status = '烤糊了'
    

    def __str__(self):
        return f'地瓜的状态{self.status}'
    
potato = Potato()
potato.cook(1)
print(potato)
potato.cook(3)
```
### 七. 案例-搬家具
```py
# 搬家具
class Furniture(object):
    
    def __init__(self, name, area):
        self.name = name 
        self.area = area
    
    def __str__(self):
        return f'家具name：{self.name},占用面积：{self.area}'


class House(object): 
    def __init__(self, address, area):
        self.address = address
        self.h_area = area  #总面积
        self.free_area = area  #剩余面积
        self.furniture_list = []
    
    def add_furniture(self, obj_furniture):
        if self.free_area > obj_furniture.area:
            self.furniture_list.append(obj_furniture)
            self.free_area -= obj_furniture.area
            print(f"家具添加成功")
        else:
            print(f"面积不够，不能添加")

  def __str__(self):
        #列表推导式打印家具信息
        h_furniture_name_list = [f.name for f in self.furniture_list]
        return f"房子的地址是：{self.address}, 剩余面积是：{self.free_area}, 有家具《{','.join(h_furniture_name_list)}》"


bed = Furniture('大床', 3)
plane = Furniture('飞机', 100)
house = House('北京', 200)
house.add_furniture(bed)
house.add_furniture(plane)
print(house)
```
### 八. 面向对象-单继承
1. 继承的基本概念   `class 类B(类A): pass`
    1. 单继承，多继承，多层继承
2. 重写父类的方法
    1. 子类调用父类的方法 
        1. 方法1：`父类名.方法名(self, 其他参数)`，  Dog.bark(self, param1)
        2. 方法二：`super(类A, self).方法名(参数)` 会调用当前类A父类中的方法，super(子类，self).bark(参数)
        3. 方法三：是方法二的简写 `super().方法名（参数）`，会调用当前类的父类，super().bark(参数)
3. 子类继承父类的__init__的属性
    1. 需要手动调用父类的__init__ `super().__init__(name)`
    2. 子类init方法的形参，一般先写父类的形参，再写子类的形参
```py 
#父类
class Dog(object):
    def __init(self, name):
        self.name = name
    def __str__(self):
        return self.name
#子类
class Hashiqi(Dog):
    def __init__(self, name, color):
        super().__init__(name)
        self.color = color
    def __str__(self):
        return f"狗名：{self.name}，颜色：{self.color}"
```

### 九. 面向对象-多继承及私有属性
1. 多继承 class 类C(类A, 类B)
    1. 如果父类中有同一个方法，那么先写继承谁就调用谁。
    2. `类名.__mro__`可以查看类的继承顺序，也是方法的调用顺序。
2. 私有属性和方法：在属性名和方法名前面 加上两个下划线__
    1. 不能通过对象直接访问，方式可以在类内部方法
    2. 不会被子类继承，子类无法访问。
    3. 用来处理类内部事件，不通过对象处理，起到安全作用

### 十. 面向对象-类属性、静态方法、多态
1. 类属性 和 对象属性
    1. 类属性： 类对象保存的一些属性信息，类内部定义的属性 访问和修改`类名.类属性 = 值`
    2. 对象属性： 通过self定义的属性
    3. `类对象.__dict__`查看类对象具有的属性，和实例对象具有的属性
    4. 注意：
        1. 如果不存在和实例属性相同的类属性，那么可以用实例对象访问类属性的值，但是不能修改。
        2. 如果存在和属性名相同的，那么实例对象访问的一定是实例属性。
2. 类方法 和 实例方法 
    1. 实例方法： 类中默认定义的方法 
    2. 类方法：使用`@classmethod`装饰的方法，第一个参数是cls，是类对象自己。
    3. 注意：
        1. 如果方法中出现了实例属性，那么必须为实例方法，如果没使用实例属性，可以用类方法。
3. 静态方法：使用`@staticmethod`定义的方法，内部既没有类属性，也没有对象属性。
4. 多态
    1. 在继承的基础上，通一个行为得到不同的结果，函数重写函数重载都是多态的实现。
```py

父类
class Dog(object):
    def __init__(self, name):
        self.name = name
    def __str__(self):
        return self.name


#子类
class Hashiqi(Dog):
    
    def __init__(self, name, color):
        super().__init__(name)
        self.color = color

    def __str__(self):
        return f"狗命：{self.name}，颜色：{self.color}"

g = Hashiqi('小红','红色')
print(g)

class Person(object):
    #类属性
    class_name = '人类'

    def __init__(self):
        self.name = '小红'
    #类方法
    @classmethod
    def get_class_name(cls):  #cls是默认的形参
        return cls.class_name
    #静态方法
    @staticmethod
    def show_info():
        print('这是一个静态方法')

print(Person.__dict__)
p = Person()
print(p.__dict__)
p.get_class_name()
Person.get_class_name()

# 多态
class Father(object):

    def __init__(self, name):
        self.name = name

    def play(self):
        print(f"Father{self.name} 在玩耍")

class Son(Father):
    def __init__(self, name, sname):
        super().__init__(name)
        self.son_name = sname

    def play(self):
        super().play()
        print(f"son{self.son_name} 在玩耍")

def handle_play(obj):
    obj.play()


son = Son('小头爸爸', '大头儿子')
f = Father('元始天尊')
handle_play(son)
handle_play(f)

```
### 十一. 面向对象试题讲解及作用讲解
### 十二. Python错误处理-Exception
1. 异常：当Python监测到一个错误时，解释器就无法继续执行了，反而出现了一些错误提示，这就是所谓的"异常" `ZeroDivisionError`,`ValueError`,`IOError`
    1. 组成： `异常类型：异常具体的描述信息`
2. 捕获所有异常： 
    1. Exception 是常见异常类的父类
3. 异常的传递：
    1. 内层代码的错误如果没有被捕获，则会传递到外层，直到捕获为止。
4. 抛出自定义的异常: 当程序代码遇到raise的时候，程序就报错了
    1. `raise 异常对象('...')
```py
try:
    #code
    pass
# except Exception as e:
except (异常类型1, 异常类型2,...) as e:
    print('异常信息：', e)

#异常的完整结构
try:
    pass
except Exception as e:
    pass
else:  #没有发生异常
    pass
finally:  #不管有没有发生异常，都会执行
    pass
```
### 十三. Python模块与包
1. 模块：别人已经写好的代码文件，文件中的函数类以及变量， 我们都可以使用 `random os`
2. 模块的制作
    1. 模块的名字要遵循标识符的规则（有字母，数字，下划线组成，不能以数字开头）
    2. 模块中可以定义变量，定义函数，定义类
3. 模块的导入: 自定义的模块 需要和代码在同一相对路径下。
    1. 方法一: `import 模块名`， 使用：模块名.功能名
    2. 方法二：`from 模块名 import 功能名1，功能名2`，使用：功能名
        1. 注意：如果存在重名的方法名，则会被覆盖
    3. 方法三：`from 模块名 import *`，将所有功能属性导入，使用：功能名
        1. 一般不建议使用 可能存在冲突进行覆盖。
    4. 使用`as`可以对模块和功能起别名
        1. `form my_module1 import func as my_fun1`
4. 模块中的变量`__all__`
    1. 可以在每个代码文（模块）中定义，类型可以是元组，列表
    2. 作用：只影响`from 模块名 import *`的导入行为，另外的两种导入方式不影响
        1. 如果没有定义__all__变量，模块中的所有功能都可以被导入
        2. 如果定义了__all__变量，只能导入变量中定义的内容
5. 模块中的变量`__name__`
    1. 判断是否是主模块（直接运行的代码）
6. 注意点：
    1. 自己定义的名字不要跟系统中你要使用的模块名字相同
    2. 模块的搜索顺序，当前目录---> 系统目录 ---> 程序报错 `print(sys.path)`
7. 包： 功能相近或者相似的模块放在一个目录中，并在目录中定义一个`__init__.py`文件，这个目录就是一个包
    1. 方法1: `import 包名.模块名`
    2. 方法2：`from 包名.模块名 import 功能名`
    3. 方法3：`from 包名.模块名 import *`
```py
# __all__
__all__ = ['num', 'func']
num = 2
def func():
    print('my_func....')

class Dog(object):
    @staticmethod
    def show_info():
        print("这是一个Dog类， my_module2 dog类")
    pass 

# __name__
if __name__ == "__main__":
    add(10, 20)
    # __name__变量，在每个模块即代码文件中都有，是系统自己定义的
    #1. 直接运行的代码值为__main__
    #2.吧文件模块作为模块导入时，运行结果是my_calc(文件名)
    print(__name__)
```
### 十四. 学生管理系统-面向对象版

  
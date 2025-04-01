# age = 18
# height = 150.5
# print('我的娘两是%d, 年龄是%.2f' % (age, height))
# print(f'我的娘两是{age}, 年龄是{height}')


# age = 6
# print("我的年龄是%03d" % age)
# print(f"我的年龄是{age: 03d}")

# for i in range(0, 10, 2): 
#     print(i, end=' ')

# print('')
# list1 = 'abcd'
# print('a' in list1)
# print('a' not in list1)

# list = [1, 2, 3, 4, 5]
# try:
#     print(list.index(6))
# except ValueError:
#     print('ValueError')
# print(list.index(3))

# my_dict = {'name': '张三', 'age': 18}
# my_dict[1] = '李四'
# # print(f'my_dict(1)的值：{my_dict}')
# # my_dict[1.0] = '李四1.0'
# # print(f'my_dict(1.0)的值：{my_dict}')
# print(my_dict.get('sex', '男'))
# print(f'my_dict.get()的值：{my_dict}')

# open('test.txt', 'w')

# file = open('a.txt', 'r', encoding='utf-8')
# while True:
#     buf = file.readline()
#     if buf:
#         print(buf, end='')
#     else:
#         break
# file.close()


# import os
# full_path = os.path.join('/path/a/c', 'file.txt')
# print(full_path)  # 输出：/path/to/file.txt


# files = os.listdir(os.getcwd())
# print(files)
# for file in files:
#     if os.path.isdir(file):
#         print(file)

class MyClass:
    class_variable = 0  # 这是一个类变量

    def __init__(self, value):
        self.instance_variable = value  # 这是一个实例变量

# 创建两个实例
obj1 = MyClass(10)
obj2 = MyClass(20)

# 修改类变量
MyClass.class_variable = 50

print(MyClass.class_variable)  # 输出: 50
print(obj1.class_variable)     # 输出: 50
print(obj2.class_variable)     # 输出: 50


obj1.class_variable = 100

print(MyClass.class_variable)  # 输出: 50
print(obj1.class_variable)     # 输出: 50
print(obj2.class_variable)     # 输出: 50

MyClass.class_variable = 200

print(MyClass.class_variable)  # 输出: 50
print(obj1.class_variable)     # 输出: 50
print(obj2.class_variable)     # 输出: 50


isinstance('hello', type(lambda: None))  # 输出: False
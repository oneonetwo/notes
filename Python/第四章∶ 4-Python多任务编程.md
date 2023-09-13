<!--
 * @Descripttion: 
 * @version: 
 * @Author: D
 * @Date: 2023-09-04 17:49:10
 * @LastEditors: jy
 * @LastEditTime: 2023-09-13 17:36:43
-->
## 多任务编程
一. [Python进程使用](#一-Python进程使用)  
二. [Python进程注意事项](#二-Python进程注意事项)  
三. [线程的使用及注意事项-批量修改文件名](#三-线程的使用及注意事项-批量修改文件名)  
四. [Python线程锁](#四-Python线程锁)  



### 一. Python进程使用
1. 多任务的介绍
    1. 多任务的概念：同一时间内执行多个任务，例如：现在电脑安装的操作系统都是多任务操作系统，可以同时运行多个软件。
    2. 好处：充分利用cpu的资源，提高程序的运行效率
    3. 多任务的执行方式：并发和并行是同时存在的，都是操作系统调用的
        1. 并发：多个任务交替去执行，（单核CPu一定是并发）
        2. 并行：在多核CPU中，多个任务多个CPU上同时执行，并行。
    4. 多任务的实现方式：
        1. 多进程实现
        2. 多线程实现
        3. 协程实现
    5. 时间片：操作系统分配给程序的一小段时间。 
2. 进程
    1. 一个正在运行的程序或者软件就是一个进行，他是操作系统进行资源分配的基本单位，也就是说每启动一个进程，操作系统都会给其分配一定的运行资源（内存资源）保证进程的运行。
        1. 一个程序运行后至少有一个进程，一个进程默认有一个线程，进程里面可以创建多个线程，线程依附在进程里面的，没有进程就没有线程。
    2. 作用：进程是实现多任务的一种方式。
    3. 进程的状态切换
        1. 新建态： 新创建一个进程，分配资源
        2. 就绪态：已经准备好，等待时间片
        3. 运行态：进程获取时间片，可以运行。
        4. 等待(堵塞)：等待外部条件的满足，代码中常用的sleep
        5. 死亡态：进程执行结束
            1. 只能是就绪态到运行态。
            2. 阻塞的条件满足，会再次进入就绪态，等待CPU
3. 进程的使用
    1. 导入进程包 `import multiprocessing`
    2. Process进程类的说明
        1. Process([group [,target,[,name [,args [,kwargs]]]]])
            1. group：指定进程组，目前只能使用None
            2. target：执行的目标任务名，函数名
            3. name：进程名字
            4. args: 以元祖的方式给执行任务传参
            5. kwargs: 字典方式给执行任务传参
        2. Process创建的实例对象的常用方法：
            1. start()：启动进程实例
            2. join(): 等待子进程执行结束
            3. terminate(): 不管任务是否完成，立即终止子进程。
        3. Process创建的实例对象的常用属性：
            1. name: 当前进程的别名，默认为Proces-N, N为从1开始递增的整数
3. 获取进程编号
    1. 获取当前进程对象 `multiprocessing.current_process()`
    2. 获取进程编号： `os.getpid()  multiprocessing.current_process().pid`
    3. 获取父进程编号：`os.getppid()`
    4. 结束杀死进程，9是固定的写法：`os.kill(进程编号，9)` 
4. 进程执行带参数的任务【理解】
    1. args传参是元祖，位置传参
    2. kwargs是字典 关键字传参
```py
    import multiprocessing
    import time

    def sing(singer, name):
        print("sing:", multiprocessing.current_process().name, os.getpid(), os.getppid())
        for i in range(5):
            print(f'{singer}正在唱{name}歌...')
            time.sleep(0.1)

    def dance(dancer, name):
        for i in range(5):
            print(f'{dancer}正在跳{name}舞...')
            time.sleep(0.1)

if __name__ == '__main__':
    # process_sing = multiprocessing.Process(target=sing)
    process_sing = multiprocessing.Process(target=sing, args=('刘德华，我的老家'))
    process_dance = multiprocessing.Process(target=dance, kwargs={'dancer':'lisa', 'name':'洋马'})
    process_sing.start()
    process_dance.start()
```

### 二. Python进程注意事项
1. 进程之间不共享全局变量
2. 主进程会等待所有的子进程执行结束在结束
    1. 方案一 进程对象.terminate() 终止进程的执行 `sub_process.terminate()`
    2. 方案二 这个子进程会随着主进程的结束而结束 `sub_process.daemon=True`
```py
import multiprocessing
import time

#进程之间不共享全局变量

g_list = []

#主进程默认会等待子进程结束
def func():
    for i in range(5):
        print(i)
        time.sleep(0.5) 
        g_list.append(i)
    print('func => g_lsit: ', g_list)
    print('子进程结束')

def read():
    print("read => g_list:", g_list)

if __name__ == '__main__':
    sub_process=multiprocessing.Process(target=func)
    sub_read = multiprocessing.Process(target=read)
    # 方案二 随着主进程的
    # sub_process.daemon=True #这个子进程会随着主进程的结束而结束
    sub_process.start()
    sub_process.join() #阻塞等待当前进程执行完成
    sub_read.start()
    time.sleep(1)
    print('主进程会等待子进程结束')
    #方案一 进程对象.terminate() 终止进程的执行
    # sub_process.terminate()   
```
### 三. 线程的使用及注意事项-批量修改文件名
1. 线程：是进程中执行代码的一个分支，每个执行分支（线程）要想工作执行代码需要cpu进行调度，也就是说线程cpu调用的基本单位，每个进程至少都有一个线程，而这个线程就是通常说的主线程。
    1. 程序启动默认会有一个主线程，代码自己创建的线程可以成为子线程，多线程可以完成多任务。
    2. 导入线程模块
        `import threading`
    3. 线程类Thread参数说明
        `Thread([group,[target,[name,[args,[kwargs]]]]])`
        1. group: 线程组，目前只能使用None
        2. target: 执行的目标任务名
        3. args: 以元祖的方式给执行任务参数
        4. kwargs: 以字典的方式给执行任务参数
        5. name: 线程名，一版不用设置
    4. 启动线程
        1. 启动线程使用start方法
2. 实现多任务
    1. 充分利用CPU资源，提到程序的执行效率
3. 线程传参
4. 线程注意点（理解）
    1. 线程之间执行时无序的
    2. 主线程会等待所有的子线程执行结束在结束
        1. 让子线程随着子线程的结束而结束有两个方案
            1. 方案一：`threading.Thread(target=func, daemon=True)`
            2. 方案二： 创建爱你对象之后进行设置 `sub_thread.daemon = True`
    3. 线程之间共享全局变量
    4. 线程之间共享全局变量数据出现错误问题
        1. 线程同步解决资源竞争问题【掌握】
        2. 全局变量中数据错误的解决办法
            1. 线程同步：保证同一时刻只能有一个线程去操作全局变量 同步：就是协同步调，按预定的先后次序进行运行。如：你说完，好比现实生活中的对讲机线程同步的方式；
                1. 线程等待（join）
                2. 互斥锁解决
    5. 互斥锁
        1. 概念：对共享数据进行锁定，保证同一时刻只能有一个线程去操作
        2. 注意：互斥锁是一个多个线程一起去抢，抢到锁的线程去执行，没有抢到锁的线程需要等待，等互斥锁使用完释放后，其他等待的线程再去抢这个锁。
        3. 使用： threading模塊中定义一个LOck变量，可以通过调用这个函数获取一把锁  
            1. 创建互斥锁`mutex = threading.Lock()`
            2. 上锁 `mutex.acquire()`
            3. 释放锁`mutex.release()`
    6. 死锁：一直等待对象释放锁的情景就是死锁
```py
#4. 线程注意点（理解） 1. 线程之间共享全局變量
import threading
import time

g_list=[]


def add_data():
    for i in range(10, 15):
        g_list.append(i)
        print(g_list,'**', '添加数据:', i )
        time.sleep(0.1)


def read():
    print('g_list', g_list)

if __name__ == '__main__':
    sub_add = threading.Thread(target=add_data)
    sub_read = threading.Thread(target=read)
    sub_add.start()
    sub_add.join()
    sub_read.start()

# 互斥锁的使用
import threading
import time
g_num = 0
mutex = threading.Lock()

def task():
    mutex.acquire()
    global g_num #全局变量用global声明
    print('当前全局变量的值：', g_num)
    for i in range(1000000):
        g_num += 1
    mutex.release()  
    print(threading.current_thread().name, g_num)

if __name__ == '__main__':
    sub_task1 = threading.Thread(target=task)
    sub_task2 = threading.Thread(target=task)
    sub_task1.start()
    sub_task2.start()
```
            


### 四. 进程和线程的对比
1. 关系对比
    1. 线程是依附在进程里面的，没有进程就没有线程
    2. 一个进程默认提供一条线程，进程可以创建多个线程
2. 区别
    1. 进程之间不共享全局变量
    2. 进程之间共享全局变量，但是要注意资源竞争的问题，解决办法：互斥锁和线程等待
    3. 创建进程的开销要比创建线程的开销要大
    4. 进程是操作系统资源分配的基本单位，线程是CPU调度的基本单位
    5. 线程不能独立执行，必须依存咋进程中
    6. 多进程开发比单进程多线程开发稳定性要强
    7. 进程适合计算密集型程序（大量的数学计算）
    8. 线程适合IO密集型程序（读写操作，爬虫程序）
3. 优缺点
    1. 进程：
        1. 优点：可以用多核
        2. 缺点：资源开销大
    2. 线程优缺点：
        1. 优点：资源开销小
        2. 缺点：不能使用多核
4. 补充CIL(了解)
    1. 全局解释其锁：
        1. 同一时间，只有一个线程使用CPU, 一个进程有一个CIL锁
        2. 不是python的特性，是Cpython解释器的概念
    2. GIL锁什么时候释放？
        1. 在当前线程执行超时后会自动释放
        2. 在当前线程执行阻塞操作时会自动释放（input, io/输入输出）
        3. 当前执行完成时
    3. GIL的弊端
        1. 对计算密集型的程序产生影响，因为计算密集型的程序，需要占用系统资源
        2. GIL的存在，相当于始终在进行单线程运算，这样自然就慢了
        3. IO密集型影响不大的原因在于，IO, input/output这两个词就表明程序的瓶颈在于输出输入所消耗的时间，线程大部分时间在等待，所以他们是多线程还是单线程是无所谓的 
    4. 提升多线程执行效率，解决方案：
        1. 更换解释器
        2. 改为多进程替换多线程
        3. 子线程使用c语言实现（绕过GIL锁）
    5. 必须注意的：
        1. cpu密集型不太适合多线程
        2. i/o密集型适合多线程（GIL锁会释放）爬虫程序
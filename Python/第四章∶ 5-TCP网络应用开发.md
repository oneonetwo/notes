## 第五章∶ 5-TCP网络应用开发
一. [IP地址的介绍](#一-IP地址的介绍)  
二. [端口和端口号](#二-端口和端口号)  
三. [tcp介绍](#三-tcp介绍)  
四. [scoket介绍](#四-scoket介绍)  
五. [tcp客户端程序开发](#五-tcp客户端程序开发)  
六. [tcp服务端程序开发](#六-tcp服务端程序开发)  
七. [多任务tcp服务端程序](#七-多任务tcp服务端程序)  
八. [协程](#八-协程)  


### 一. IP地址的介绍
1. ip地址的概念：标识网络中设备的一个地址
    1. 局域网IP（内网IP）:
        1. 大家通过路由器连接的WiFi,获得的ip都是局域网IP
        2. 只有在同一个局域网才能访问
        3. 大家目前使用的ip都是局域网IP
    2. 公网IP：需要购买
        1. 只要可以上网就可以访问公网IP
2. ip地址的表现形式：
    1. IPv4是目前使用的ip地址，点分十进制组成
    2. IPv6是由未来使用的ip地址，由冒号十六进制组成
3. 作用： 可以表示网络中唯一的一台设备，一个ip对应一个设备
4. 查看IP地址：
    1. Windows: ipconfig
    2. Mac和Linux: ifconfig
5. 检查网路是否正常：ping ip
6. 域名：是ip地址的别名
### 二. 端口和端口号
1. 端口：传输数据的通道，十数据传输必经之路
2. 端口号：可以标识唯一的一个端口
3. 端口号的分类：
    1. 知名端口号：就是众所周知的端口号，范围是从0到1023
    2. 动态端口号：一版程序员开发应用程序使用端口号成为动态端口号，返回为1024到65535
4. ip+端口可以确定网络中唯一的应用程序。     
### 三. tcp介绍
1. 概念：(transmission control protocol)简称传输控制协议，他是一种面向连接的，可靠的、基于字节流的传输层通信协议
    1. 通信步骤：创建连接，传输数据，关闭连接
2. 特点：
    1. 面向连接
        1. 通信双方必须先建立好连接才能进行数据的传输，数据传输完成后，双方必须断开此连接，以释放系统资源
    2. 可靠传输
        1. TCP采用发送应答机制
        2. 超时重传
        3. 错误校验
        4. 流量控制和阻塞管理
3. 总结
    TCP是一个稳定，可靠的传输协议，常用于对数据进行准备无误的传输，比如：文件下载，浏览器上网。

### 四. scoket介绍
1. socket(套接字)：进程之间网络通信的工具
### 五. tcp客户端程序开发
1. 
### 六. tcp服务端程序开发
### 七. 多任务tcp服务端程序
### 八. 协程

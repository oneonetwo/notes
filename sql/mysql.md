[优化相关](https://www.cnblogs.com/lijiasnong/p/9963905.html)  
[基础相关](https://www.cnblogs.com/yangyangfubin/p/8179172.html)
#### 一. 事务
1. 概念：事务是由一步或几步数据库操作序列组成逻辑执行单元，这系列操作要么全部执行，要么全部放弃执行。程序和事务是两个不同的概念。一般而言：一段程序中可能包含多个事务。
2. 特性:
    - 原子性： 事务是应用中最小的执行单位；
    - 一致性： 事务的执行结果，必须使数据库从一个一致性变成另一个一致性的状态；
    - 隔离性： 各个事务执行互不干扰；
    - 持续性： 事务一旦提交，对数据所做的改变都要记录到永久存储器中；
3. mysql如何支持事务，两种方法：
    1. 用begin  rollback  commit 来实现；
        - Begin 开始一个事务
        - Rollback 事务回滚
        - Commit 事务确认
    2. 直接用set 来改变mysql 的自动提交模式
        - Mysql 默认是自动提交的，也就是提交一个query，就直接执行
        - 可以通过 `set autocommit = 0 ` 禁止自动提交，` set autocommit = 1 ` 开启自动提交，来实现事务的处理。
#### 二. 管理数据库
> 1. ` use dname `
> 2. ` create database dname `
> 3. ` alter database dname `
> 4. ` drop database dname `
> 5. ` show databases dname `
#### 三. 表操作
1. 创建表结构
    ```sql
        create table student(
            name varchar(255) not null,   //列名 数据类型 数据约束
            age int(4)
        )
    ```
2. 更新表 `alter table 表名`
    ```sql
        /*表中新加字段*/
        alter table users add column age int(10);
        
        /*删除表中的字段*/
        alter table users drop age;
        
        /*修改表中字段的类型*/
        alter table users modify age varchar(10);
    ```
3. ` drop table 表名 `
4. ` show tables `
#### 四. 字段操作
1. 管理数据
    ```sql
        insert into users (name, age) values ("张三"， 10);
        
        update users set name="李四", age="20" where name="张三";
        
        delete from users where name="李四";
        
        select * from users where name="张三";
    ```
2. 查询操作
    - 别名：  id as '编号' （as可以省略）；
    - 合并列： 合并的字段必须使数值类型的字段
    ```sql
        select name as '姓名',(servet+mysql) as '总成绩' from students;
    ```
    - 去除重复
    ```sql
        select DISTINCT address from students;
    ```
    
    

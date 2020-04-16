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
3. 条件查询
    1. 逻辑条件 and or 
    2. 比较条件  >   <   >=   <=   =   <>   between and
    ```sql
        select * from student where servlet>=80 and servlet<=85;
        select * from student where servlet between 80 and 85;
    ```
    3. 判空条件： is null,  is not null,  ='',  <>'';
    ```sql
        /*查询没有性别数据的学生(数据‘男’或‘女’)*/
        select * from student where genter is null OR genter='';
    ```
    4. 模糊查询： like  %代表任意个字符  _代表一个字符
4. 联合函数查询
    1. max(),  min(),  avg(), count()统计表列数 sum()
    ```sql
       select count(*) from student;
    ```
5. 关键字
    1. ` limit [offset],[rows] `, offset偏移量，rows返回的行数
    2. ` order by `,  DESC降序，ASC升序
    3. ` group by ` *where必须放在 group by之前
    4. ` having ` 分组后筛选
    ```sql
        select * from student limit 255,10;
        
        select * from student order by age asc, servlet asc;
        
        select gender, count(*) from student where gender<>'' group by gender;  
        
        select address, count(*) from student group by address having count(*)>2; 
    ```
#### 五. 数据约束
1. default 默认值约束
2. not null 非空约束（不能不插入值）
3. unique 唯一约束
4. primary key 主键约束(唯一+非空)
5. auto increment 自增约束
6. references 外键约束
```sql
    /*员工表(副表:被别的表约束的表，外键设置在副表)*/
    Create table employee(
　　    Id int primary key auto_increment,
　　    name varchar(20),
　　    deptId int,
　　    /*添加外键约束(foreign key)*/
　　    Constraint employee_dept_fk foreign key(deptId) references dept(id)
     )
    /*部门表(主表:约束别人的表)*/
    Create table dept(
        Id int primary key auto_increment,
        Name varchar(20)
    )
```
7. cascade 级联技术 主表更新删除，副标也会更新删除
```sql
    Create table employee(
        Id int primary key auto_increment,
        name varchar(20),
        deptId int,
        /*添加外键约束(foreign key)*/
        /*添加级联修改:on update cascade*/
        /*添加级联修改:on delete cascade*/
        Constraint employee_dept_fk foreign key(deptId) references dept(id) on update cascade on delete cascade
    );
    /*部门表(主表:约束别人的表)*/
    Create table dept(
        Id int primary key auto_increment,
        Name varchar(20)
    );
```
#### 六. 夺表查询
1. 内连接查询(使用最多),多表查询的步骤:
    1. 确定查询哪些表
    2. 确定查询哪些字段
    3. 确定连接条件(规则:条件=表数量-1)
    ```sql
        select employee.name,dept.name
        from employee,dept
        where employee.deptId=dept.id;
        /*另一种语法*/
        select e.name,d.name
        from employee e
        inner join dept d
        on e.deptId=d.id;
    ```
2. 左外连接查询(左表数据全部显示，如果右边不满足，则显示null)
    ```sql
        select d.name,e.name
        from dept d
        left outer join employee e
        on d.id=e.deptId;
    ```
3. 右外连接查询(右表数据全部显示，如果左边不满足，则显示null)
    ```sql
        select d.name,e.name
        from employee e
        right outer join dept d
        on e.deptId=d.id;
    ```
    
    

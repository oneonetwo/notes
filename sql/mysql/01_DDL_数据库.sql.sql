-- 对数据库的操作
-- 1. 查看当前所有的数据库
show DATABASES;
-- 2. 使用某一个数据库
use music_db;
-- 3.查看正在选中的数据库
select DATABASE()
-- 4. 创建一个新的数据库
-- create DATABASE test_demo;
create database if not exists test_demo;
    
-- 4. 删除一个数据库
-- drop DATABASE test_demo;
drop DATABASE if exists test_demo;
-- 5. 修改数据库 一般就是修改编码格式
ALTER DATABASE test_demo CHARACTER SET = utf8 COLLATE = utf8_unicode_ci;
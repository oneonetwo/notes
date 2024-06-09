一. SQL的数据类型： 数字类型，时间和日期类型，字符串（字符和字节）类型，空间类型和JSON数据类型。
  1. 数字类型 多用int和double类型
    - 整数数字类型  TINYINT(1个字节) SMALLINT(2) MEDIUMINT(3) INT(4) BIGINT(8) 
    - 浮点数字类型 FLOAT(4) DOUBLE(8)
    - 精确数字类型： DECIMAL, NUMERIC ()
    
  2. 日期类型：用的比较多的是DATE类型 DATETIME
    - YEAR(YYYY) DATE(YYYY-MM-DD) DATETIME(yyyy-mm-dd hh:mm:ss) TIMESTAMP(yyyy-mm-dd hh:mm:ssUTC时间，时间元年1970)
  3. 字符串类型
    - CHAR(10) 0-255的固定长度
    - VARCHAR 可变长度，0-65535
  4. BINARY VARBINARY类型用于存储二进制字符串，存在的是字节字符串
  5. BLOB用户存储大的二进制类型
  6. text用存储大的字符串类型 （比如一篇文章）


		
		
		
			

-- 表的操作
-- 1. 查看当前数据库有哪些表
SHOW TABLES;

-- 2. 查看某一张表的结构
DESC users;

-- 3. 创建一张表 如果存在则报错，
CREATE TABLE if not exists `users`(
  name VARCHAR(10), 
  age INT,
  height DOUBLE
);
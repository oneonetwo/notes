-- 1. 新建商品表
CREATE TABLE IF NOT EXISTS `t_products`(
id INT PRIMARY KEY AUTO_INCREMENT,
title VARCHAR(20) UNIQUE NOT NULL,
description VARCHAR(200) DEFAULT '',
price DOUBLE DEFAULT 0,
publishTime DATETIME
)
-- 2. DML语句，插入语句
INSERT INTO  `t_products` (title, description, price, publishTime) VALUES ('iphone15', '4800注射', 99980, '2024-10-10');
INSERT INTO  `t_products` (title, description, price, publishTime) VALUES ('iphone15puls', '4800注射', 99980, '2024-10-10');
-- 3. 删除数据
-- 3.1这样会删除表中的所有数据
DELETE FROM `t_products`; 
-- 3.2 根据id删除某一条数据
DELETE FROM `t_products` WHERE id = 4;


-- 4. 修改数据
-- 4.1 修改表中的所有数据
UPDATE `t_products` SET price=888;
-- 4.2 修改表中的某一条数据
UPDATE `t_products` SET price=888, title='华为数据' WHERE id=6;

-- 5. 扩展：当修改某个数据的时候，自动记录更新的时间
ALTER TABLE `t_products` ADD `updateTime` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;



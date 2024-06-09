
二. 表约束 
	1. PRIMARY KEY 主键
		- 区分每条记录的唯一性，必须有个字段是不会重复的，并且不会为空，这样的字段称为主键
		- 主键是表中唯一的索引
		- 必须是NOT NULL的，如果没有设置NOT NULL,那么mysql也会隐式的设置为NOT NULL
		- 主键可以是多列索引，PRIMARY KEY(key_name1, ...),称为联合主键
	2. 唯一 UNIQUE
		- 某些字段在开发中我们希望是唯一的 不会重复，比如手机号码，身份证号等，这个字段我们可以使用UNIQUE来约束
		- 使用UNIQUE约束的字段在表中必须是不同的
		- UNIQUE索引允许列具有多个值null
	3. 不能为空： NOT NULL
	4. 默认值： DEFAULT('默认值')
	5. 自动递增： AUTO_INCREMENT
	6. 外键也是最常用的一种约束手段，我们在讲到多表关系，再补充


-- 1. 创建完整的表结构
CREATE TABLE IF NOT EXISTS `users`(
 id INT PRIMARY KEY AUTO_INCREMENT,
 name VARCHAR(20) UNIQUE NOT NULL,
 level INT DEFAULT(0),
 telPhone VARCHAR(20) UNIQUE 
);
-- 2. 修改表
-- 2.1修改表名
ALTER TABLE `users` RENAME TO `t_users`;
-- 2.2 添加表的字段
ALTER TABLE `users` ADD createTime TIMESTAMP;
-- 2.3 删除表的字段
ALTER TABLE `users` drop createTime;
-- 2.4 修改表的字段名称
ALTER TABLE `users` CHANGE createTime startTime DATETIME;
-- 2.4 修改表的字段的类型(id int=>bidint)
ALTER TABLE `users` MODIFY id BIGINT;



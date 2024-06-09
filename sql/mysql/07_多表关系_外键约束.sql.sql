-- 创建多张表

1. 创建一个歌曲表
CREATE TABLE IF NOT EXISTS `t_songs`(
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(20) NOT NULL,
  duration INT DEFAULT 0,
  singer VARCHAR(10),
  singer_id INT,
  FOREIGN KEY(singer_id) REFERENCES t_singers(id)
);
INSERT INTO `t_songs` (name, duration, singer) VALUES ('温柔', 100, '五月天');
INSERT INTO `t_songs` (name, duration, singer) VALUES ('离开月球表面', 120, '五月天');

2. 创建一个歌手表
CREATE TABLE IF NOT EXISTS `t_singers`(
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(10) NOT NULL,
  intro VARCHAR(200)
);
INSERT INTO `t_singers` (name, intro) VALUES ('五月天', '四个人 吹拉弹唱很是疯狂');


3. 修改歌曲表
ALTER TABLE `t_songs` DROP `singer`;
ALTER TABLE `t_songs` ADD `singerId` INT;


4. 为品牌单独创建一张表
CREATE TABLE IF NOT EXISTS `brands`(
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(10) UNIQUE NOT NULL,
  website VARCHAR(100),
  worldRank INT
);

5. 外键约束
  5.1 创建外键，将两张表联系起来，我们将products中`brand_id`关联到brand的id 格式 
  FOREIGN KEY (brand_id) REFERENCES brand(id)
  5.2 如果是表已经创建好，需要额外的添加外键;
  为products添加brand_id 并且添加外键约束
  ALTER TABLE `t_products` add `brand_id` INT;
  ALTER TABLE `t_products` add  FOREIGN KEY (brand_id) REFERENCES brand(id);
  
  5.3 更新表中外键的值
  UPDATE `t_products` SET `brand_id` = 1 WHERE `brand` = `华为`
  UPDATE `t_products` SET `brand_id` = 2 WHERE `brand` = `小米`
  
  5.4 外键存在时更新和删除数据
  5.4.1 将华为的brand表中的id改成100，应该怎们该？ 我们需要修改 on delete 或者 on update的值。
    1. PESTRICT(默认属性)：当更新和删除某个记录的时候 会检查是否有关联的外键记录，有的话会报错，不允许删除和更新
    2. NO ACTION: 和PESTRICT一致，是sql标准中定义的
    3. CASCADE: 当更新删除时，会检查关联记录，更新时：做对应的更新，删除时：关联的记录会被一起删掉
    4. SET NULL: 当更新和删除，会检查外键关联记录，有的话，会将对应的值设置为NULL;
  5.5 查看products表的外键
  SHOW CREATE TABLE `t_products`;
  5.5.1 设置on delete on update的值
  ALTER TABLE `t_products` ADD FOREIGN KEY (brand_id) REFERENCES brands(id) ON UPDATE CASCADE ON DELETE CASCADE;
  
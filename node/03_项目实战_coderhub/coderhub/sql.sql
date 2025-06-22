
   create TABLE  if not EXISTS `user`(
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(30) NOT NULL UNIQUE,
      password VARCHAR(200) NOT NULL,
      createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
   )
   

   
   CREATE TABLE IF NOT EXISTS `moment`(
      id INT PRIMARY KEY AUTO_INCREMENT,
      content VARCHAR(1000) NOT NULL,
      user_id INT NOT NULL,
      createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY(user_id) REFERENCES user(id)
   )



   INSERT INTO moment (content, user_id) VALUES ('不要告诉我你不需要保护,不要告诉我你不寂寞,知微,我只希望你,在走过黑夜的那个时辰,不要倔强的选择一个人。',3);
   INSERT INTO moment (content, user_id) VALUES ('If you shed tears when you miss the sun, you also miss the stars.如果你因失去了太阳而流泪,那么你也将失去群星了。',1);
   INSERT INTO moment (content, user_id) VALUES ('在世间万物中我都发现了你,涉小时,你是阳光下一粒种子,伟大大时,你隐身在高山海洋里。',2);
   INSERT INTO moment (content, user_id) VALUES ('限定目的,能使人生变得简洁。',2);
   INSERT INTO moment (content, user_id) VALUES ('某一天,突然发现,许多结果都与路径无关。',4);
   INSERT INTO moment (content, user_id) VALUES ('翅膀长在你的肩上,太在乎别人对于飞行姿势的批评,所以你飞不起来',4);
   INSERT INTO moment (content, user_id) VALUES ('一个人至少拥有一个梦想,有一个理由去坚强。心若没有栖息的地地方,到哪里都是在流浪。',2);
   INSERT INTO moment (content, user_id) VALUES ('不乱于心,不困于情。不畏将来,不念过往。如此,安好。',3);
   INSERT INTO moment (content, user_id) VALUES ('如果你给我的,和你给别人的是一样的,那我就不要了。',3);
   INSERT INTO moment (content, user_id) VALUES ('故事的开头总是这样,适逢其会,猝不及防。故事的结局总是这样,花开两朵,天各一方。',2);
   INSERT INTO moment (content, user_id) VALUES ('你不愿意种花,你说,我不愿看见它一点点调落。是的,为了避免结束,你避免了一切开始。',2);
   INSERT INTO moment (content, user_id) VALUES ('你如果认识从前的我,也许你会原谅现在的我。',4);
   INSERT INTO moment (content, user_id) VALUES ('每一个不曾起舞的日子,都是对生命的辜负。',2);
   INSERT INTO moment (content, user_id) VALUES ('向来缘浅,奈何情深。',2);
   INSERT INTO moment (content, user_id) VALUES ('心之所向 素履以往生如逆旅一苇以航',3);
   INSERT INTO moment (content, user_id) VALUES ('生如夏花之绚烂,死如秋叶之静美。',3);
   INSERT INTO moment (content, user_id) VALUES ('答案很长,我准备用一生的时间来回答,你准备要听了吗?',4);
   INSERT INTO moment (content, user_id) VALUES ('因为爱过,所以慈悲:因为懂得,所以宽容。',4);
   INSERT INTO moment (content, user_id) VALUES ('我们听过无数的道理,却仍旧过不好这一生。',1);
   INSERT INTO moment (content, user_id) VALUES ('我来不及认真地年轻,待明白过来时,只能选择认真地老去', 2);

-- 左链接
SELECT m.id, m.content, m.createAt createTime, m.updateAt updateTime,
JSON_OBJECT('id', u.id, 'name', u.name, 'createTime', u.createAt, 'updateTime', u.updateAt) AS users
FROM `moment` m
LEFT JOIN `user` u ON  m.user_id = u.id


UPDATE moment SET content='this a cold day' where id=22;


-- 查询当前用户下的当前内容
SELECT * FROM moment WHERE user_id=1 and id = 1
-- 删除动态
DELETE FROM moment WHERE id = 1


-- 新建评论表
CREATE TABLE IF NOT EXISTS comment(
	id INT PRIMARY KEY AUTO_INCREMENT,
	content VARCHAR(1000) NOT NULL,
	moment_id INT NOT NULL,
	user_id INT NOT NULL,
	comment_id INT DEFAULT NULL,
	createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEY(moment_id) REFERENCES moment(id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY(user_id) REFERENCES user(id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY(comment_id) REFERENCES comment(id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- 4. 查询动态 同时展示评论信息以及评论个数
-- 4.1 查询动态 同时展示信息个数 (子查询)
-- SELECT COUNT(*) FROM comment c WHERE moment_id= m.id;
SELECT m.id, m.content, m.createAt createTime, m.updateAt updateTime,
JSON_OBJECT('id', u.id, 'name', u.name) AS users, 
(SELECT COUNT(*) FROM comment  WHERE comment.moment_id= m.id ) commentCount
FROM moment m 
LEFT JOIN `user` u ON  m.user_id = u.id
LIMIT 10 OFFSET 0;
-- 4.2 查询动态，展示评论列表
SELECT m.id, m.content, m.createAt createTime, m.updateAt updateTime,
JSON_OBJECT('id', u.id, 'name', u.name) AS users, 
(JSON_ARRAYAGG(JSON_OBJECT(
	'id', c.id,
	'content', c.content,
	'commentId', c.comment_id,
	'momentId', c.moment_id,
  'user',  JSON_OBJECT('id', cu.id, 'name', cu.name)
))) commentList
FROM moment m 
LEFT JOIN `user` u ON  m.user_id = u.id
LEFT JOIN `comment` c ON c.moment_id=m.id
LEFT JOIN user cu ON cu.id=c.user_id
WHERE m.id=2
GROUP BY m.id;



-- 5. 创建标签表
CREATE TABLE IF NOT EXISTS `label` (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(10) NOT NULL UNIQUE,
  creatAt TIMESTAMP DEFAULT(CURRENT_TIMESTAMP),
  updateAt TIMESTAMP DEFAULT(CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP
)
-- 5.1 创建动态和标签的关系表 多对多   PRIMARY KEY(moment_id, label_id) 联合主键是不能重复的
CREATE TABLE IF NOT EXISTS `moment_label` (
  moment_id  INT NOT NULL,
  label_id INT NOT NULL,
  creatAt TIMESTAMP DEFAULT(CURRENT_TIMESTAMP),
  updateAt TIMESTAMP DEFAULT(CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY(moment_id, label_id),
  FOREIGN KEY (moment_id) REFERENCES moment(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (label_id) REFERENCES label(id) ON DELETE CASCADE ON UPDATE CASCADE
)

-- 5.2 查询已经存在的label
SELECT * FROM label WHERE name IN  ("动物", "植物", "蔬菜", "足球", "篮球");
-- 5.3 批量插入 
INSERT INTO label (name) VALUES ('动物'), ('植物'), ('蔬菜');
-- 5.4插入关系表
INSERT IGNORE INTO moment_label (moment_id, label_id) VALUES (2, 2);

-- 6. 动态和标签
-- 6.1 查询动态列表 标签的个数
SELECT m.id, m.content, m.createAt createTime, m.updateAt updateTime,
JSON_OBJECT('id', u.id, 'name', u.name) AS users, 
(SELECT COUNT(*) FROM comment  WHERE comment.moment_id= m.id ) commentCount,
(SELECT COUNT(*) FROM moment_label ml WHERE ml.moment_id = m.id) labelCount
FROM moment m 
LEFT JOIN `user` u ON  m.user_id = u.id
LIMIT 10 OFFSET 0;
-- 6.2 查询单个动态列表  加上标签列表 错误的方式是用left JOIN  labels会出现两次
SELECT m.id, m.content,
JSON_OBJECT('id', u.id, 'name', u.name) AS users, 
(JSON_ARRAYAGG(JSON_OBJECT(
	'id', c.id,
	'content', c.content,
	'commentId', c.comment_id,
	'momentId', c.moment_id,
  'user',  JSON_OBJECT('id', cu.id, 'name', cu.name)
))) commentList,
(JSON_ARRAYAGG(JSON_OBJECT(
	'id', l.id,
	'name', l.name
))) labelList
FROM moment m 
LEFT JOIN `user` u ON  m.user_id = u.id
LEFT JOIN `comment` c ON c.moment_id=m.id
LEFT JOIN user cu ON cu.id=c.user_id

LEFT JOIN moment_label ml ON ml.moment_id=m.id
LEFT JOIN label l ON ml.label_id = l.id

WHERE m.id=3
GROUP BY m.id;
-- 6.3 正确方式是用***********子查询
SELECT m.id, m.content,
JSON_OBJECT('id', u.id, 'name', u.name) AS users, 
(
  SELECT JSON_ARRAYAGG(JSON_OBJECT(
	'id', c.id, 'content', c.content, 'commentId', c.comment_id, 'momentId', c.moment_id,
  'user',  JSON_OBJECT('id', cu.id, 'name', cu.name)
  )) 
  FROM `comment` c
  LEFT JOIN user cu ON cu.id=c.user_id
  WHERE c.moment_id=m.id
) commentList,
(JSON_ARRAYAGG(JSON_OBJECT(
	'id', l.id,
	'name', l.name
))) labelList
FROM moment m 
LEFT JOIN `user` u ON  m.user_id = u.id
LEFT JOIN moment_label ml ON ml.moment_id=m.id
LEFT JOIN label l ON ml.label_id = l.id
WHERE m.id=3;



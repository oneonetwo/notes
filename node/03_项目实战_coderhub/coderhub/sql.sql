
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
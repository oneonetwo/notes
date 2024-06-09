-- 1. 华为手机价格的平均值 avg
SELECT AVG(price) FROM `t_products` WHERE brand='华为';
-- 2. 华为手机的平均评分
SELECT AVG(score) as miAVGScore from `t_products` WHERE `brand`='小米';
-- 3. 选择手机最高最低的分数
SELECT MAX(score) FROM `t_products`;
SELECT MIN(score) FROM `t_products`;
-- 4. 计算所有手机中有多少人投票
SELECT SUM(voteCnt) FROM `t_products`;
-- 5. 一共有多少个条目
SELECT COUNT(*) FROM `t_products` WHERE brand='华为';

-- 6. GROUP BY一般跟聚合函数一起使用 
SELECT brand FROM `t_products` GROUP BY brand;
SELECT brand, MAX(price), min(price) minPrice, AVG(price) avgPrice FROM `t_products` GROUP BY brand;

-- 7. GROUP BY中的条件查询用 HAVCING, 平均分在7分以上，价格在4000 一下
 SELECT brand, MAX(price), min(price), AVG(price) avgPrice, AVG(score) angScore FROM `t_products` 
 GROUP BY brand
 WHERE avgPrice < 4000 and avgScore >=7;
-- 查询格式
SELECT 字段1, [,字段2]...
  [FROM table_1]
  [WHERE where_condition]
  [ORDER BY expr [ASC|DESC]]}  
  [LIMIT {[offset,] row_count | row_count OFFSET offset}]
  [GROUP BY expr]
  [HAVING where_condition]
  
  
-- 1. 基本查询
-- 1.1查询苏哟有的字段
SELECT * FROM `t_products`;
-- 1.2查询相对应的字段
SELECT id, title, price FROM `t_products`;
-- 1.3 查询字段之后，给字段起别名(AS可以省略)
SELECT id AS pid, title `name` FROM `t_products`;

-- 2. 查询条件
-- 2.1比较运算符
SELECT * FROM `t_products` WHERE price>=1000;
SELECT * FROM `t_products` WHERE name = '华为';
SELECT * FROM `t_products` WHERE name != '华为';
-- 2.2 逻辑运算符 || && AND OR
SELECT * FROM `t_products` brand ='华为' && price > 2000;
SELECT * FROM `t_products` brand ='华为' AND price > 2000;
-- 2.3查询区间 BETWEEN AND 开区间
SELECT * FROM `t_products` WHERE price BETWEEN 1000 AND 2000;
-- 2.4 枚举多个结果的其中一个 
SELECT * FROM `t_products` WHERE price IN ('华为', '小米');

-- 2.5 模糊查询 LIKE关键字，结合两个特殊的符号 %（任意多个的任意字符） _(一个任意字符)
-- 2.5.1 查询v来头的title
SELECT * FROM `t_products` WHERE title LIKE 'v%';
-- 2.5.2 查询带M的title
SELECT * FROM `t_products` WHERE title LIKE '%M%';
-- 2.5.3 带M的必须是第三个字符
SELECT * FROM `t_products` WHERE title LIKE '__M%';

-- 2.6查询结果排序 ORDER BY 有两个常用的值 ASC（升序排列）DESC(降序排列)
-- 2.6.1 查询价格小于1000的说及，并且按照评分的降序获取结果
SELECT * FROM `t_products` WHERE price < 1000 ORDER BY score DESC;

-- 3. 分页查询 
-- 3.1 查询20条数据偏移10条， 不写默认是0偏移
SELECT * FROM `t_products` LIMIT 20 OFFSET 10;
-- 3.2 另外一写法 查询20偏移10
SELECT * FROM `t_products` LIMIT 10, 20;



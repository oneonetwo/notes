-- 1. 直接重两张表中查询信息 笛卡尔乘积
SELECT * FROM `t_products`, `brands`;
-- 2. 从两种表中查询所有数据,在结果进行过滤
SELECT * FROM `t_products`, `brands` WHERE t_products.brand_id = brands.id;

-- 3. 多表之间的连接 SQL JOINS, 
-- 3.1 左连接: 左表为主,获取左边表的所有数据, 完整LEFT [OUTER] JOIN, 但是OUTER可以省略.
   SELECT * FROM `t_products` LEFT JOIN `brands` on t_products.brand_id = brands.id;
--    查询左边的数据哪些是跟右边没有交集的
   SELECT * FROM `t_products` LEFT JSON `brands` ON t_products.brand_id=brands.id WHERE brands.id IS NOT NULL;
-- 3.2 右链接: 获取右边的数据,已有表为主
    SELECT * FROM `t_products` RIGHT JOIN `brands` ON `t_products`.id = `brands`.id;

3.3 内连接 [CROSS|inner] JOIN, 在两张表链接时就会约束数据之间的关系,来决定之后查询的结果
SELECT * FROM `t_products` INNER JOIN `brands`; 

3.4 全链接: SQL规范使用FULL JOIN,但是MySQL中没有对它的支持, 我们需要使用UNION来实现; 左连接+右链接
(SELECT * FROM `t_products` LEFT JOIN `brands` ON t_products.id=brands.id) UNION (SELECT * FROM `t_products` RIGHT JOIN `brands` ON t_products=brands.id)


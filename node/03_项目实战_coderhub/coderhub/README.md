#### 基础配置 node 18.16.0

1. 安装 koa 启动服务 koa koa-bodyparser @koa-router
2. 配置环境变量：编写.env 文件，`cnpm i dotenv` 对 env 的管理
3. 创建和启动服务
   1. 管理 router
   2. 提取 app
4. 用户注册接口
   1. 创建 controller 管理路由
   2. 创建 service 管理数据库的操作
   3. 创建 database.js 链接数据库
   ```sql
   create TABLE  if not EXISTS `user`(
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(30) NOT NULL UNIQUE,
      password VARCHAR(200) NOT NULL,
      createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
   )
   ```
   4. 创建 middleware 文件夹，创建 user.middleware.js 中间件，存放验证逻辑
   5. 创建 utils 工具，处理handle-error.js
   6. 对用户的密码进行加密   
5. 用户登录接口
   1. 用户登录接口 
      1. router编写
      2. 处理函数controller的编写
   2. 验证中间件
      1. 账号和密码是否为空
      2. 用户名是否存在
      3. 校验密码是否一致
   3. 登录成功返回凭证
      1. cookie + session
      2. Token 令牌
6. 验证token
   1. test 中间件 去验证每次请求的token
   2. postman设置全局的变量的token
   ```js
   const res = pm.response.json()
   pm.globals.set('token', res.data.token)
   ```
   3. 动态注册全部的路由
   
7. 动态发布
   ```sql
   CREATE TABLE IF NOT EXISTS `moment`(
      id INT PRIMARY KEY AUTO_INCREMENT,
      content VARCHAR(1000) NOT NULL,
      user_id INT NOT NULL,
      createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY(user_id) REFERENCES user(id)
   )
   ```
   1. 查询动态列表
   2. 查询动态详情
   3. 修改动态
      1. 登录的用户才能修改自己的动态
   4. 删除动态
   5. 抽象提取 verifyPermission  不是只验证moment的权限 

8. 评论 （子表查询，左链查询）
   1. 新增评论
   2. 新增回复评论
   3. 查询动态的时候，显示评论信息
      1. 查询多个动态，显示评论的个数
      2. 查询单个动态，显示评论的列表

   
9. 创建标签的表 （多对多的关系）关系表
   1. 定义router
      1. 创建标签的接口
      2. 获取标签列表接口
   2. 创建标签和动态关系表
   3. 定义给动态添加标签的接口
   4. 查询标签的接口
   6. 中间件
      1. 是否登录
      2. 验证是否有操作这个动态的权限
      3. 额外中间件，验证label的那么是否已经在label中
            1. 如果存在，那么直接使用
            2. 如果没有存在，那么需要先将label的name添加label表
      4. 最终步骤
         1. 所有的labels都在已经label表
         2. 动态2和 labels关系添加到关系表中
   ```sql 
   <!-- 使用联合主键 创建标签和动态的关联表  -->
   CREATE TABLE IF NOT EXISTS `moment_label` (
      moment_id  INT NOT NULL,
      label_id INT NOT NULL,
      createAt TIMESTAMP DEFAULT(CURRENT_TIMESTAMP),
      updateAt TIMESTAMP DEFAULT(CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY(moment_id, label_id),
      FOREIGN KEY (moment_id) REFERENCES moment(id) ON DELETE CASCADE ON UPDATE CASCADE,
      FOREIGN KEY (label_id) REFERENCES label(id) ON DELETE CASCADE ON UPDATE CASCADE
   )
   ```
   7. 插入已存在的数据
      在 MySQL 中，INSERT IGNORE 是一种插入数据的方法，它在遇到违反唯一性约束的情况下不会抛出错误，而是忽略这些冲突的记录并继续插入其他记录。这样可以避免由于重复键或其他约束冲突而导致的插入操作失败。
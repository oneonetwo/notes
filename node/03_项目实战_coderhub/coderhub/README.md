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
   CREATE TABLE IF NOT  EXISTS `user`(
       id INT PRIMARY KEY AUTO_INCREMENT,
       name VARCHAR(30) NOT NULL UNIQUE,
       password VARCHAR(30) NOT NULL,
       createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
       updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
   )
   ```
   4. 创建 middleware 文件夹，创建 user.middleware.js 中间件，存放验证逻辑
   5. 创建 utils 工具，处理handle-error.js
   

### 服务器部署多分支流水线项目（不同的分支部署到不同的服务器）
1. 项目下添加文件
    1. jenkins配置文件：Jenkinsfile  Jenkinsfile-QA Jenkinsfile-PROD 文件
    2. pm2配置入口文件： ecosystem.config.js
2. 登录Jenkins平台  
    1. 新建Scan 多分支流水线 Triggers
    2. Branch Sources 关联git 添加git项目地址
    3. 进入View Configuration => Build Triggers 查看GitLab webhook URL
3. 登录gitlab平台
    1. 进入项目 => Settings  =>  Integrations 添加 webHooks URL 其他的不用动。
4. 回到本地项目 push一次 测试

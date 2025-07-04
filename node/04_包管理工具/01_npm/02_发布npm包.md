##### npm发布自己的包
1. 准备项目
    1. 编写好包代码，导出。
2. `npm init` 生成配置文件，package.json, 完成配置文件的填写
3. 创建并且登录npm的账号
4. 在项目中命令行工具输入： - `npm login` 输入账号 密码
5. 输入：`npm publish`
    - 发布成功会看到+ your-package-name@1.0.0
6. 更新包
    1. 每次发布新的版本时，需要更新 package.json 文件中的版本号。例如，如果你要发布一个补丁版本，可以运行：`npm version patch`
    2. 这会自动更新 package.json 文件中的版本号，然后再运行：`npm publish`
    3. 
7. 删除/取消发布
    1. `npm unpublish 包名@版本号 --force` 
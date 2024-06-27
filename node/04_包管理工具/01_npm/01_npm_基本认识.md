1. NPM 的基本概念
    1. 包（Package）：一个包是一个包含文件和文件夹的目录，并且至少包含一个 package.json 文件。package.json 文件中定义了包的名称、版本、依赖项、脚本等信息。
    2. 注册表（Registry）：NPM 包注册表是一个数据库，存储了所有公开发布的 NPM 包。默认的注册表是 https://registry.npmjs.org/。
    3. 命令行工具：NPM 提供了 npm 命令行工具，用于执行各种操作，例如安装、更新、卸载包等

2. NPM 的核心功能 更多命令查看文档`https://docs.npmjs.com/cli/v8/commands`
    1. 安装包：`npm install <package>`：
        - 从注册表中安装一个包到当前项目中，并添加到 node_modules 目录。n
        - pm install：根据 package.json 文件中的依赖项安装所有依赖包。
    2. 更新包：`npm update <package>`
        - 更新一个包及其依赖项。
    3. 卸载包：`npm uninstall <package>`：
        - 从当前项目中移除一个包。
    4. 发布包：`npm publish`：
        - 将包发布到 NPM 注册表中，使其可以被其他人使用。
    5. 管理依赖项：`npm init`
        - package.json 文件中定义了项目的依赖项及其版本信息。NPM 使用这个文件来管理项目的依赖。
    6. 重新安装依赖包： `npm rebuild`
    7. 清楚缓存：`npm cache clean`
3. NPM的工作原理
    1. 安装包
        - 查询注册表：NPM 查询默认的 NPM 注册表来获取包的信息，包括版本、依赖等。
        - 下载包：NPM 从注册表下载包的压缩文件。
        - 解压包：将下载的包解压到 node_modules 目录。
        - 处理依赖：递归地安装包的依赖项，确保所有依赖项都被正确安装。
        - 更新 package.json：将包的信息添加到 package.json 文件的 dependencies 字段中。
    2. package.json文件 是 NPM 项目的配置文件，包含了项目的元数据和依赖信息
        - name：包的名称。
        - version：包的版本。
        - description：包的描述。
        - main：包的入口文件，设置程序的入口。
        - scripts：定义了可以通过 npm run 命令执行的脚本。
        - dependencies：项目运行时需要的依赖包。
        - devDependencies：项目开发时需要的依赖包（如测试框架）。   `npm install webpack --save-dev`
        - keywords：关键字数组，用于描述包。
        - author：包的作者。
        - license：包的许可证。
        - private：属性记录当前的项目是否是私有的，为true时，防止私有项目或模块发布出去
        - engines: 属性用于指定`Node和NPM的版本号`
        - browserslist：配置打包后JavaScript浏览器的兼容情况


4. npm的包通常需要需要遵从semver规范：
    1. 版本规范是 `X.Y.Z`
        - X: 是主版本号：当做不兼容的API修改（可能不兼容之前的版本）
        - Y: 做了向下兼容的功能性新增（新功能增加，兼容之前的版本）
        - Z: 做了向下兼容的问题修正（没有新功能，修复之前的版本的bug）
    2. package.json中devDependencies中版本号中的`~`和`^`是代表什么？
        - `x.y.z`: 表示的是一个明确的版本号
        - `^x.y.z`: 表示x保持不变，y 和 z 永远安装最新的版本
        - `~x.y.z`: 表示 x 和 y 不变，z 永远安装最新的版本

5. `npm install`细节
    1. `npm i yarn -g` 全局安装
    2. `npm i yarn` 默认是局部local安装
        1. `npm i axios -D`  `npm install webpack --save-dev` 开发依赖

        
6.  `package-lock.json`
    - 详细记录了项目中所有安装的依赖项的具体版本及其依赖关系。它的主要目的是确保在不同的环境中安装相同的依赖树，保证项目的稳定性和一致性。
    - 两个概念 一是标识符 二是明确包对应的准确版本
    1. name 和 version：项目的名称和版本。
    2. lockfileVersion：锁文件的版本。NPM 7 引入了版本 2 的锁文件格式，具有更好的性能和兼容性。
    3. requires：指示是否需要解析依赖关系。
    4. dependencies：高层次的依赖关系，指示哪些依赖包被安装以及它们的版本。
    5. integrity: 用来从缓存中获取索引，在通过索引获取压缩包文件
        - npm安装的包会有缓存的概念，package-lock中会有查找包缓存对应的标识符
    6. resolved: 来源
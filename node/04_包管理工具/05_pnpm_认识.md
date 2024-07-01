### performant npm

> pnpm 是一个快速、节省磁盘空间的包管理器，它与 npm 和 Yarn 类似，但在包管理和依赖处理方面有一些独特的特性。pnpm 使用了硬链接和符号链接来处理包依赖，从而减少了磁盘空间的使用和安装时间。

1. 硬链接和软链接的概念
    1. 硬链接（hard link）
        - 是电脑文件系统中的多个文件平等的共享一个文件存储单元
        - 删除一个文件名字后，还可以用其他名字继续访问该文件
    2. 符号链接（软链接soft link，symbolic link）
        - 是一类特殊的文件
        - 其中包含一条以绝对路径或者相对路径的形式指向其他文件或者目录的引用

2. 演练
    1. 文件copy
        - window: `copy foo.js foo_copy.js`
        - macos: `cp foo.js foo_copy.js`
    2. 文件的硬链接
        - window: `mklink /H aaa_hard.js aaa.js`
        - macos: `ln foo.js foo_hard.js`
    3. 文件的软链接
        - window: `mklink  aaa_soft.js aaa.js`
        - macos: `ln -s foo.js foo_soft .js`


### 3. pnpm到底做了什么呢?
1. 当使用npm或Yarn时,如果你有100个项目,并且所有项目都有一个相同的依赖包,那么,你在硬盘上就需要保存100份该相同依赖包的副本。
2. 如果是使用pnpm,依赖包将被存放在一个统一的位置,因此:  
    - 如果你对同一依赖包使用相同的版本,那么磁盘上只有这个依赖包的一份文件;
    - 如果你对同一依赖包需要使用不同的版本,则仅有版本之间间不同的文件会被存储起来;
    - 所有文件都保存在硬盘上的统一的位置:
        1. 当安装软件包时,其包含的所有文件都会硬链接到此位置,而不会占古用额外的硬盘空间
        2. 这让你可以在项目之间方便地共享相同版本的依赖包;

### pnpm常用的命令
1. npm install -g pnpm
2. pnpm init
3. pnpm install <package_name>
4. `pnpm install <package_name> --save-dev` 安装开发依赖
5. `pnpm add -g <package_name>` 安装全局包
6. `pnpm install`
7. `pnpm remove 包名`
8. `pnpm update 包名` 更新包
9. `pnpm run <script name>` 运行脚本
- 信息调试
10. `pnpm info 包名` 查看包信息
11. `pnpm list` 查看安装的包
12. `pnpm outdated` 查看过时的包
- 清理和缓存
13. `pnpm cache clean` 清理缓存
13. `pnpm prune` 删除`node_modules`文件夹中未使用的依赖
13. `pnpm store prune` 从store中删除当前违背引用的包来释放store的空间
13. `pnpm store path` 获取当前活跃的store目录





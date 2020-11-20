### git简介
1. 安装 
    1. $ git config --global user.name "your name"
    2. $ git config --global user.email "email@example.com"
2. 创建版本库
    1. repository 仓库，版本库
        - 创建文件夹 `mkdir learngit`;
        - 初始化文件夹变成仓库 `git init`;
### 时光穿梭机
1. 版本回退 
    1. 几个术语 
        - head： 当前的分支提交的commit; git commit 之后的状态；
        - index： 也称暂存区 staing area;  git add 之后的状态
        - working copy： 正在工作的那个文件集，工作区； git add 之前的状态
    2. 常用的几个命令
        - `git stauts` 查看工作区的状态 
        - `git diff` 不加参数即默认比较工作区与暂存区
        - `git log --graph --oneline` 
        - `git reset` 当前版本HEAD 上一个版本HEAD^ 上上个版本HEAD^^ 前一百个版本HEAD~100
            - 1. git reset --hard  HEAD^ 回退到上一个版本   
    3. #### --soft --hard --mixed区别  恢复的等级不同
        1. soft 使用这个参数那么，head会变，index跟working不会变，也就是说头指针会变，但是add之后的缓存和工作区的内容都不会变；
        2. hard 使用hard, 那么一切都会恢复。 head，index,working都会变
        3. mixed(default) 默认的，head和add的缓存index都会变， 但是working的内容不会变；
2. 工作区和暂存区
    1. 工作区（working copy）
    2. git add 之后就到了 暂存区了，staing aear index;
    3. git commit 会把暂存区的一次性提交到 版本库；
3. 管理修改
    - 用`git diff HEAD -- filename.txt`可以查看工作区和版本库最新版本的区别
4. 撤销修改
    1. `git checkout -- filename.txt` 将工作区修改撤销到最近的git commit或者git add的状态；
        - 命令中的--很重要，没有--，就变成了“切换到另一个分支”的命令
    2. `git reset HEAD filename.txt` 可以将暂存区的修改撤销，重新放到工作区 
5. 删除文件 
    1. git rm test.txt  然后git commit; 
    2. git checkout -- test.txt 误删了，可以使用还原，
        - git checkout 其实使用版本库里的版本替换工作区的版本，无论工作区是修改还是删除，都可以‘一键还原’
### 远程仓库
1. 添加远程仓库
    - ssh-keygen -t rsa -C "jingyuan@qq.com"  创建SSH Key
    - git remote add origin git@github.com....gitname  本地仓库与远程仓库做关联
2. 从远程仓库克隆
    - git clone   git:// https 支持多种协议
### 分支管理
1. 创建和合并分支
    - git 
2. 解决冲突
3. 分支管理策略
4. Bug分支
5. Feature分支
6. 多人协作
7. rebase
### 标签管理
1. 创建标签
2. 操作标签
### 自定义Git、
1. 使用SourceTree

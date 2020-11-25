# git flow
https://www.jianshu.com/p/41910dc6ef29
1. Production 分支
2. Develop分支
3. Feature
4. Release
5. Hotfix
# git简单使用
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
    1. `git rm test.txt`  然后git commit; 
    2. `git checkout -- test.txt` 误删了，可以使用还原，
        - git checkout 其实使用版本库里的版本替换工作区的版本，无论工作区是修改还是删除，都可以‘一键还原’
### 远程仓库
1. 添加远程仓库
    - `ssh-keygen -t rsa -C "jingyuan@qq.com"`  创建SSH Key
    - `git remote add origin git@github.com....gitname`  本地仓库与远程仓库做关联
2. 从远程仓库克隆
    - git clone   git:// https 支持多种协议
### 分支管理
1. 创建和合并分支
    - 查看分支 git branch 
    - 创建分支 git branch <name>
    - 切换分支 git checkout <name> 或者 git switch <name>
    - 创建+切换 git checkout -b <name> 或者 git switch -c <name>
    - 合并某分支 git merge <name>
        - `--no--ff`是指强行关闭fast-forward方式；保留分支的历史；
        - `--squash`把多次分支commit历史压缩为一次；
    - 删除分支 git branch -d <name>
2. 解决冲突
3. 分支管理策略
4. Bug分支
    1. `git stash`储藏当前分支，
    2. 切换到master上，创建bug分支 issue-001
    3. 修复bug后，提交，切换到master，merge分支并删除；
    4. 切换到dev；
        - `git stash list` 查看储藏list
        - `git stash apply` 恢复 `git stash drop`删除
        - 或者直接 `git stash pop` 恢复的同时stash也已经删除；  
    5. 此时bug仍然存在在当前dev分支上,使用cherry-pick;
        - `git cherry-pick 4c805e2`
5. Feature分支
    - 添加新功能，最好新建一个feature分支，完成后，合并，最后删除该feature分支；
    - 强行删除：`git branch -D feature-vbal`
6. 多人协作
    1. `git remote -v`显示更详细的信息
        - 显示了可以抓取和推送的origin的地址，吐过没有推送权限，看不见push的地址；
    2. 在本地创建和远程分支对应的分支，使用`git checkout -b branch-name origin/branch-name`本地和远程分支的名称最好一致；
    3. 建立本地分支和远程分支的关联，使用`git branch --set-upstream branch-name origin/branch-name`；
7. rebase
    1. rebase把本地的当前分支的提交挪动了位置，放在了需要merge的分支最后一次提交之后，所以变成了一条直线；
    2. rebase操作前后，最终提交的内容是一致的。
    3. rebase操作可以把本地末push的分叉提交历史真理成直线；
    4. rebase的目的是使我们在查看提交变化时更容易，因此分叉的提交要三方对比；
### 标签管理
1. 创建标签
2. 操作标签
### 自定义Git、
1. 使用SourceTree


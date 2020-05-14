# Linux常用的命令
http://www.92csz.com/study/linux/

### Linux文件和目录管理
1. pwd 当前所在的目录
2. cd 
3. echo 打印
    - 写入的作用就是这个">"在linux中叫做重定向，即把前面生产的输出写入到后面的文件中
    - `>` 是覆盖 `>>` 是追加
4. mkdir `mkdir[-mp][目录名称]` 
    - `-m` 设置目录权限 `-p` 递归创建目录
5. rm `rm[-rf][目录]` 
    - `-r`可以删除不为空的目录  `-f`强制删除  `-i`提示是否删除    
6. alias
    - 用来设置指令的别名语法： `alias[别名]=[指令名称]`  例如 `alias rm='rm -i'`
7. 环境变量PATH
    - 输入 echo $PATH，这里的echo其实就是打印的意思，而PATH前面的$表示后面接的是变量。  
8. ls命令
    - `-a`全部(包含隐藏)文件  `-l`文件的详细信息    
    - `ll` 相当于ls -l;
9. cp cp[选项][来源文件][目的文件]  `把test1 拷贝成test2` ，这样即可 `cp test1 test2`
    - `-d` 如果不加这个-d 则拷贝软连接时会把软连接的目标文件拷贝过去，而加上后，其实只是拷贝了一个连接文件（即快捷方式）。
    - `-r` 如果你要拷贝一个目录，必须要加-r选项，否则你是拷贝不了目录的
    - `-i` 如果遇到一个存在的文件，会问是否覆盖。
10. mv `mv [ 选项 ] [源文件] [目标文件]` 
    - -u  -I   重命名用mv
11. 查看文件内容
    - cat  `-n` 查看文件时，把行号也显示到屏幕上 `-A` 显示所有东西出来，包括特殊字符
    - tac 是cat的反写，同样的功能也是反向打印文件的内容到屏幕上。
    - more 当内容特别多时，用more可以一屏一屏查看，按空格切换到下一屏，按q键退出；
    - less 作用跟more一样，但比more好在可以上翻，下翻。空格键同样可以翻页，而按”j”键可以向下移动（按一下就向下移动一行），按”k”键向上移动。在使用more和less查看某个文件时，你可以按一下”/” 键，然后输入一个word回车，这样就可以查找这个word了。如果是多个该word可以按”n”键显示下一个。另外你也可以不按”/”而是按”?”后边同样跟word来搜索这个word，唯一不同的是，”/”是在当前行向下搜索，而”?”是在当前行向上搜索。
    - head 后直接跟文件名，则显示文件的前十行。如果加 –n 选项则显示文件前n行。
    - tail
        - tail 和head一样，后面直接跟文件名，则显示文件最后十行。如果加-n 选项则显示文件最后n行。
        - -f 动态显示文件的最后十行，如果文件是不断增加的，则用-f 选项。如：tail -f /var/log/messages
### 文件权限操作
- lrwxrwxrwx，包含的东西有该文件类型和所属主、所属组以及其他用户对该文件的权限
1. chgrp 更改所属组  `chgrp [组名] [文件名]`
2. chown 更改文件的所属主 
    - `-R`选项递归更改
    - `chown [ -R ] 账户名 文件名`   `chown [ -R ] 账户名：组名 文件名`
3. chmod 改变用户对文件的读写执行权限 
    - 默认目录的权限755，文件默认权限644.
    - 770  rwx = 4+2+1=7; rwx= 4+2+1=7; --- = 0+0+0=0
    - `chmod [-R] xyz 文件名` （这里的xyz，表示数字）
4. 特殊属性 chattr 修改文件的特殊属性 lsattr 列出文件/目录的特殊属性 

### 查找命令
1. which
    - 用来查找可执行文件的绝对路径。which只能用来查找PATH环境变量中出现的路径下的可执行文件。
2. whereis `whereis [-bmsu] [文件名称]`
    - whereis 通过预先生成的一个文件列表库去查找跟给出的文件名相关的文件
3. find  `find [路径] [参数]` 下面介绍几个经常用的参数
    - `-name filename` 直接查找该文件名的文件，这个使用最多了。 eg. `find /root -name test3`
    - -type type ：通过文件类型查找。文件类型在前面部分已经简单介绍过，相信你已经大体上了解了。type 包含了 f, b, c, d, l, s 等等。后续的内容还会介绍文件类型的。 eg. `find ./file1 -type d`
    
### ln建立链接档
- 硬连接（hard link）和软连接（symbolic link）
1. ln ： `ln [-s] [来源文件] [目的文件]`  -s ，不加是建硬连接，加是建立软连。

### 用户以及用户组的管理
1. 认识/etc/passwd和/etc/shadow
    - /etc/passwd由':'分割成7个字段分别表示  `用户名：口令：uid用户标识号：gid组标识号：注释说明：用户的家目录：shell`  
    ![passwd](https://static.prnasia.com/pro/gift/7_1.png)
        1. 口令用x代替，存放到/etc/shadow中了
        2. uid取值范围是0~65535，0是超级用户（root）的标识号，1~499由系统保留，作为管理账号，普通用户标识号是大于或等于500的。 
        3. gid。这个字段对应着/etc/group 中的一条记录
        4. shell，用户登录后要启动一个进程，用来将用户下达的指令传给内核，这就是shell。Linux的shell有很多种sh, csh, ksh, tcsh, bash等，而Redhat/CentOS的shell就是bash。查看/etc/passwd文件，该字段中除了/bin/bash外还有/sbin/nologin比较多，它表示不允许该账号登录。如果你想建立一个账号不让他登录，那么就可以把该字段改成/sbin/nologin，默认是/bin/bash。
2. 新增/删除用户和用户组
    - 新增一个组 `groupadd [-g GID] groupname`;
    - 删除组   `groupdel groupname`;
    - 增加用户 `useradd [-u UID] [-g GID] [-d HOME] [-M] [-s]`
        -u 自定义UID
        -g 使其属于已经存在的某个GID
        -d 自定义用户的家目录
        -M 不建立家目录
        -s 自定义shell
    - 删除用户 `userdel [-r] username`;  -r是连同家目录一起删除
3. 创建修改一个用户的密码
    - `passwd [username]` 
4. 用户身份切换
    - 用test账号登录linux系统，然后使用su - 就可以切换成root身份，前提是知道root的密码。
    - 使用`echo $LOGNAME`来查看当前登录的用户名
    - **默认只有root用户能使用sudo命令，普通用户想要使用sudo，是需要root预先设定的，即，使用visudo命令去编辑相关的配置文件/etc/sudoers。如果没有visudo这个命令，请使用” yum install -y sudo”安装。**
        - 默认root能够sudo是因为这个文件中有一行” root ALL=(ALL) ALL” 在该行下面加入” test ALL=(ALL) ALL”就可以让test用户拥有了sudo的权利。如果每增加一用户就设置一行，这样太麻烦了。所以你可以这样设置。  
        ![](https://static.prnasia.com/pro/gift/7_32.png)
        - 把这一行前面的”#”去掉，让这一行生效。它的意思是，wheel这个组的所有用户都拥有了sudo的权利。接下来就需要你把想让有sudo权利的所有用户加入到wheel这个组中即可。  
        - ![](https://static.prnasia.com/pro/gift/7_33.png)
### 文本编辑工具vim   一般模式、编辑模式、命令模式

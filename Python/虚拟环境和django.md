一. 搭建虚拟环境
1. 方法一：使用virtualenv
```
	1. 安装 
	pip install virtualenv
	2. 创建虚拟环境 
	virtualenv -p  python3  py10_my_env      
	3. 启动虚拟环境
	py10_my_env\Scripts\activate.bat
	4. 退出虚拟环境
	deactivate
```
2. 方法二：使用virtualenvwrapper
```
	1. 安装
	pip install virtualenvwrapper-win
	2. 创建虚拟环境， 设置环境变量 WORKON_HOME 指定virtualenvwrapper虚拟环境默认路径，比如设置为 c:venv，并创建venv目录。 如果不设置，会自动在当前用户目录创建相关文件夹。
	3. 创建虚拟环境
	mkvirtualenv py10_my_env -p python3
	4. 查看虚拟环境和启动虚拟环境
	workon
	workon py10_my_env
	5. 退出虚拟环境,必须在当前虚拟环境下
	deactivate
	6. 如果需要删除虚拟环境，
	rmvirtualenv py10_my_env	
```

二. 创建项目和子应用
1. 安装django（当前虚拟环境下）
	1. pip install django==2.2.5 长期维护的执行版本
2. 创建项目工程
	1. django-admin startproject  bookmanager
	2. 设置pycharm的interpreter解释器
	3. `python manage.py runserver` 启动服务 默认是127.0.0.1：8000
		1. python manage.py runserver 0.0.0.0:8888 可以指定ip和端口号  需要修改settings中的ALLOWED_HOSTS 
3. 项目子应用 
	1. 创建 `python mamage.py startapp book` 	 book为子任务名称
	2. 注册安装到工程 在settings.py 中INSTALL_APPS

三. 使用Django进行数据库开发的步骤
1. 使用django定义模型类
	2. models.py
3. 模型迁移(建表) 迁移分两步
	1.  生成迁移文件：根据模型类生成迁移表的语句
		`python manage.py makemigrations`    	
	3.  执行迁移：根据第一步生成的语句在数据库中创建表
		`python manage.py migrate`
5. 操作数据库
 	 

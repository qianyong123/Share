# 前言

 - 最近在自己的服务器上安装了mysql，下面记录了我在Linux(Centos 8)环境下安装Mysql的完整过程。

 - 本文档讲解安装版本为mysql-5.7.24，对于5.7.24之后的版本，不适用此说明文档，主要原因在于之后版本的mysql配置文件的目录位置和结构有所改变，使用此说明可能会出现找不到配置文件或者配置后不生效的情况。


# 安装前准备

1、检查是否已经安装过mysql，执行命令，如果没有安装过mysql就可以跳过这步了

```
[root@localhost /]# rpm -qa | grep mysql

```

从执行结果，可以看出我们已经安装了mysql-libs-5.1.73-5.el6_6.x86_64，执行删除命令

```
[root@localhost /]# rpm -e --nodeps mysql-libs-5.1.73-5.el6_6.x86_64
```

再次执行查询命令，查看是否删除

```
[root@localhost /]# rpm -qa | grep mysql
```

2、查询所有Mysql对应的文件夹
```
[root@localhost /]# whereis mysql
mysql: /usr/bin/mysql /usr/include/mysql
[root@localhost lib]# find / -name mysql
/data/mysql
/data/mysql/mysql
```

删除相关目录或文件

```
[root@localhost /]#  rm -rf /usr/bin/mysql /usr/include/mysql /data/mysql /data/mysql/mysql 
```

验证是否删除完毕

```
[root@localhost /]# whereis mysql
mysql:
[root@localhost /]# find / -name mysql
[root@localhost /]# 
```

3、检查mysql用户组和用户是否存在，如果没有，则创建

```
[root@localhost /]# cat /etc/group | grep mysql
[root@localhost /]# cat /etc/passwd |grep mysql
[root@localhost /]# groupadd mysql
[root@localhost /]# useradd -r -g mysql mysql
[root@localhost /]# 
```


# 安装Mysql

- 从官网下载是用于Linux的Mysql安装包

- 切换到文件存放目录 **/usr/local**

```
[root@localhost /]# cd /usr/local

```
下载命令：

```
[root@localhost /local]# wget https://dev.mysql.com/get/Downloads/MySQL-5.7/mysql-5.7.24-linux-glibc2.12-x86_64.tar.gz

```

- 也可以去mysql官网下载对应的版本 [mysql官网](https://downloads.mysql.com/archives/community/)

1、在执行wget命令的目录下或你的上传目录下找到Mysql安装包：mysql-5.7.24-linux-glibc2.12-x86_64.tar.gz
执行解压命令：

```
[root@localhost /local]#  tar xzvf mysql-5.7.24-linux-glibc2.12-x86_64.tar.gz
[root@localhost /local]# ls
mysql-5.7.24-linux-glibc2.12-x86_64
mysql-5.7.24-linux-glibc2.12-x86_64.tar.gz
```
- 解压完成后，可以看到当前目录下多了一个解压文件，将文件夹名称修改为mysql。

2、在 **/usr/local/mysql** 目录下创建data目录

```
[root@localhost /]# mkdir /usr/local/mysql/data
```

3、更改mysql目录下所有的目录及文件夹所属的用户组和用户，以及权限

```
[root@localhost /]# chown -R mysql:mysql /usr/local/mysql
[root@localhost /]# chmod -R 755 /usr/local/mysql

```
4、编译安装并初始化mysql,**务必记住初始化输出日志末尾的密码（数据库管理员临时密码）**

```

[root@localhost /]# cd /usr/local/mysql/bin
[root@localhost bin]# ./mysqld --initialize --user=mysql --datadir=/usr/local/mysql/data --basedir=/usr/local/mysql

```
5、运行初始化命令成功后，输出日志如下：

![mysql1.webp](/img/mysql1.webp)

记录日志最末尾位置**root@localhost:** 后的字符串，此字符串为mysql管理员临时登录密码。

6、编辑配置文件my.cnf，添加配置如下

```
[root@localhost bin]#  vi /etc/my.cnf
```

按i插入，复制下面内容到my.cnf，复制完后按esc退出插入，在命令行输入:wq，保存提交

```
[mysqld]
datadir=/usr/local/mysql/data
port=3306
sql_mode=NO_ENGINE_SUBSTITUTION,STRICT_TRANS_TABLES
symbolic-links=0
max_connections=600
innodb_file_per_table=1
lower_case_table_names=1

```
7、测试启动mysql服务器

```
[root@localhost /]# /usr/local/mysql/support-files/mysql.server start

```
显示如下结果，说明数据库安装并可以正常启动

![mysql2.webp](/img/mysql2.webp)

## 异常情况

如果出现如下提示信息

```
Starting MySQL... ERROR! The server quit without updating PID file
```
查看是否存在mysql和mysqld的服务，如果存在，则结束进程，再重新执行启动命令

```
#查询服务
ps -ef|grep mysql | grep -v grep
ps -ef|grep mysqld | grep -v grep

#结束进程
kill -9 PID

#启动服务
 /usr/local/mysql/support-files/mysql.server start
```
![mysql3.webp](/img/mysql3.webp)

8、添加软连接，并重启mysql服务

```
[root@localhost /]#  ln -s /usr/local/mysql/support-files/mysql.server /etc/init.d/mysql 
[root@localhost /]#  ln -s /usr/local/mysql/bin/mysql /usr/bin/mysql
[root@localhost /]#  service mysql restart

```

9、登录mysql，密码为步骤5生成的临时密码 ,然后在修改密码

```
[root@localhost /]#  mysql -u root -p
Enter password:
mysql>set password for root@localhost = password('youpass');

```

10、开放远程连接

```
mysql>use mysql;
msyql>update user set user.Host='%' where user.User='root';
mysql>flush privileges;

```
![mysql4.webp](/img/mysql4.webp)

11、设置开机自动启动

```
1、将服务文件拷贝到init.d下，并重命名为mysql
[root@localhost /]# cp /usr/local/mysql/support-files/mysql.server /etc/init.d/mysqld
2、赋予可执行权限
[root@localhost /]# chmod +x /etc/init.d/mysqld
3、添加服务
[root@localhost /]# chkconfig --add mysqld
4、显示服务列表
[root@localhost /]# chkconfig --list

```

至此，mysql5.7.24版本的数据库安装，已经完成。








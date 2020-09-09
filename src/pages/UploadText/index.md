

Linux系统上安装 nodejs和环境配置

由于直接 yum 安装的 nodejs 版本太低，所以本篇文章向大家介绍在 Linux 上安装 Node.js 最新版的方法。

nodejs官网下载地址：
 英文网址：https://nodejs.org/en/download/
 中文网址：http://nodejs.cn/download/

安装环境
本机系统：CentOS Linux release 8.0
Node.js：v12.18.1
Linux 上安装 Node.js

创建你要放置node的目录
cd home
mkdir nodejs
wget https://nodejs.org/dist/v12.18.1/node-v12.18.1-linux-x64.tar.xz    // 下载
tar xf node-v12.18.1-linux-x64.tar.xz                                   // 解压
cd node-v12.18.1-linux-x64     // 进入解压目录
cd bin  
运行 ./node -v
显示版本号说明nodejs安装好了

添加软连
cd / 返回根目录
ln -s /home/nodejs/bin/node /usr/local/bin
ln -s /home/nodejs/bin/npm /usr/local/bin

配置全局的环境变量，可以在其他目录下都可以使用node命令

解压文件的 bin 目录底下包含了 node、npm 等命令，我们可以修改linux系统的环境变量（profile）来设置直接运行命令：
vim /etc/profile，按i键插入
在最下面添加 export PATH=$PATH: 后面跟上 node 下 bin 目录的路径

export PATH=$PATH:/root/node-v12.18.1-linux-x64/bin
按esc退出插入

在命令框输入 :wq (保存提交)

立即生效

source /etc/profile

node -v
显示版本号就说明安装配置好了




yarn的安装方法一样，先去官网下载对应的版本

环境变量

vim .bash_profile


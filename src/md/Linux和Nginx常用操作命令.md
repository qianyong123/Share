
# Nginx命令

- 查看版本：nginx -v
- 查看nginx安装目录：ps  -ef | grep nginx
- 检查配置文件：nginx -t
- 启动：systemctl start nginx.service
- 停止：systemctl stop nginx.service
- 重启：systemctl restart nginx.service
- 设置开机自启动：systemctl enable nginx.service
- 停止开机自启动：systemctl disable nginx.service
- 查看当前状态：systemctl status nginx.service
- 查看所有已启动的服务：systemctl list-units --type=service


# Linux命令 

* 文件和目录

- cd /home 进入 '/ home' 目录' 
- cd .. 返回上一级目录 
- cd ../.. 返回上两级目录 
- cd 进入个人的主目录 
- cd ~user1 进入个人的主目录 
- cd - 返回上次所在的目录 
- pwd 显示工作路径 
- ls 查看目录中的文件 
- ls -F 查看目录中的文件 
- ls -l 显示文件和目录的详细资料 
- ls -a 显示隐藏文件 
- ls *0-9* 显示包含数字的文件名和目录名 
- tree 显示文件和目录由根目录开始的树形结构
- lstree 显示文件和目录由根目录开始的树形结构
- mkdir dir1 创建一个叫做 'dir1' 的目录' 
- mkdir dir1 dir2 同时创建两个目录 
- mkdir -p /tmp/dir1/dir2 创建一个目录树 
- rm -f file1 删除一个叫做 'file1' 的文件' 
- rmdir dir1 删除一个叫做 'dir1' 的目录' 
- rm -rf dir1 删除一个叫做 'dir1' 的目录并同时删除其内容 
- rm -rf dir1 dir2 同时删除两个目录及它们的内容 
- mv dir1 new_dir 重命名/移动 一个目录 
- cp file1 file2 复制一个文件 
- cp dir/* . 复制一个目录下的所有文件到当前工作目录 
- cp -a /tmp/dir1 . 复制一个目录到当前工作目录 
- cp -a dir1 dir2 复制一个目录 


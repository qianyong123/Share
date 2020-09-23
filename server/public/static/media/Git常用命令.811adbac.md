

# git初始化仓库

git init

# 配置用户名和邮箱

- git config --global user.name "name"
- git config --global user.email "email"

### 版本管理



- git status当前状态
- git diff文件查看区别
- git log查看历史记录详细
- git log –pretty = oneline查看历史记录简洁
- git reset –hard HEAD ^回滚上一个版本
- git reflog查看执行过的操作
- git checkout — 文件更改工作区的修改（暂存区/版本库回来）
- git reset HEAD 文件暂存区返回工作区
- git rm 文件删除文件（没啥用）
- git add命令实际上就是把要提交的所有修改放到暂存区（Stage），然后，执行git commit就可以一次性把暂存区的所有修改提交到分支。


# 远程仓库

- git remote add origin git @ ****(添加远程仓库)
- git push -u origin master将本地主机与远程master相关联并推
- git clone git @ ****(克隆远程仓库)

# 分支管理

- git checkout -b 分支创建分支
- git branch查看当前分支
- git checkout branch切换分支
- git checkout命令加上-b参数表示创建并切换，相当于以下两条命令：git branch && git checkout


- git merge 分支合并分支到当前分支
- git merge –no-ff -m commit_message 分支另外，快进合并（保留之前分支数据）
- git的分支-d 分支删除分支
- git branch -D branch强制删除分支
- git push origin – 删除分支删除远程分支
- Bug分支主要流程：用于在其他分支工作时紧急修复master分支的bug

- git stash储存工作现场
- git checkout master返回主分支
- git checkout -b issue-101建立Bug分支
- git checkout master完成修复后回到主分支
- git merge –no-ff -m “合并的bug修复101” 问题-101部分快进合并
- git branch -d 问题-101删除错误分支
- git stash list查看工作现场
- git stash apply恢复工作现场
- git stash drop删除工作现场
- git stash pop恢复工作现场并删除

# nodejs express框架 配置热启动

```
之前的启动
"start": "node ./bin/www",
安装
cnpm install -g supervisor
运行
supervisor app.js

```

# nodejs 获取get post参数
```
npm i body-parser -S

var bodyParser = require('body-parser');//解析,用req.body获取post参数

// 创建application/json 解析器
var jsonParser = bodyParser.json()

/* GET users listing. */
router.post('/query',jsonParser, function(req, res, next) {
    dbAction.queryAll(req, res, next)
});

// post 请求
req.body
// get请求

req.query

```

# forever 
```
forever -h

start:启动守护进程
stop:停止守护进程
stopall:停止所有的forever进程
restart:重启守护进程
restartall:重启所有的foever进程
list:列表显示forever进程
config:列出所有的用户配置项
set <key> <val>: 设置用户配置项
clear <key>: 清楚用户配置项
logs: 列出所有forever进程的日志
logs <script|index>: 显示最新的日志
columns add <col>: 自定义指标到forever list
columns rm <col>: 删除forever list的指标
columns set<cols>: 设置所有的指标到forever list
cleanlogs: 删除所有的forever历史日志


```
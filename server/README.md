
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
//显示所有运行的服务
forever list

// 1. 停止所有运行的node App
forever stopall

// 2. 停止其中一个node App
forever stop app.js
// 当然还可以这样
// forever list 找到对应的id，然后：
forever stop [id]

// 启动一个服务
forever start app.js
// 1. 启动所有
forever restartall
```

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
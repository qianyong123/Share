
var express = require('express');
var dbAction = require('../common/admin');
var bodyParser = require('body-parser');//解析,用req.body获取post参数
var router = express.Router();

// 创建application/json 解析器
var jsonParser = bodyParser.json()

/* GET users listing. */

const callback = function(req, res, next,fun) {
    console.log(req.url)
    dbAction[fun](req, res, next)
     // 响应超时处理
     res.setTimeout(8000, function() {
        res.json({ msg: "请求超时" });
    });
}

router.get('/query',(req, res, next)=> callback(req, res, next,'queryAll'));
router.post('/add',jsonParser,(req, res, next)=> callback(req, res, next,'add'));
router.post('/update',jsonParser,(req, res, next)=> callback(req, res, next,'update'));
router.get('/detail',(req, res, next)=> callback(req, res, next,'getDetail'));
router.get('/deleteData',(req, res, next)=> callback(req, res, next,'deleteData'));
router.get('/ClassifyList',(req, res, next)=> callback(req, res, next,'ClassifyList'));

module.exports = router;



var express = require('express');
var dbAction = require('../common/basicConnection');
var bodyParser = require('body-parser');//解析,用req.body获取post参数
var router = express.Router();

// 创建application/json 解析器
var jsonParser = bodyParser.json()

/* GET users listing. */
router.post('/query',jsonParser, function(req, res, next) {
    dbAction.queryAll(req, res, next)
});

router.get('/query', function(req, res, next) {
   
    dbAction.queryAll(req, res, next)
});

router.post('/add', jsonParser,function(req, res, next) {
   
    dbAction.add(req, res, next)
});

module.exports = router;


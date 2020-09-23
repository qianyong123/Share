
var express = require('express');
var dbAction = require('../common/admin');
var bodyParser = require('body-parser');//解析,用req.body获取post参数
var router = express.Router();

// 创建application/json 解析器
var jsonParser = bodyParser.json()

/* GET users listing. */

router.get('/query', function(req, res, next) {
    console.log(req.query)
    dbAction.queryAll(req, res, next)
});

router.post('/add', jsonParser,function(req, res, next) {
   
    dbAction.add(req, res, next)
});

router.post('/update', jsonParser,function(req, res, next) {
   
    dbAction.update(req, res, next)
});

router.get('/detail',function(req, res, next) {
   
    dbAction.getDetail(req, res, next)
});

router.get('/deleteData',function(req, res, next) {
   
    dbAction.deleteData(req, res, next)
});


router.get('/ClassifyList',function(req, res, next) {
   
    dbAction.ClassifyList(req, res, next)
});

module.exports = router;


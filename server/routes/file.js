

var express = require('express');
var dbAction = require('../common/file');
var router = express.Router();



/* GET users listing. */

const callback = function(req, res, next,fun) {
    console.log(req.url)
    dbAction[fun](req, res, next)
     // 响应超时处理
     res.setTimeout(8000, function() {
        res.json({ msg: "请求超时" });
    });
}


router.post('/upload',(req, res, next)=> callback(req, res, next,'upload'));
router.get('/download',(req, res, next)=> callback(req, res, next,'download'));



module.exports = router;


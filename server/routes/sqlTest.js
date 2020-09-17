
var express = require('express');
var dbAction = require('../common/basicConnection');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    dbAction.queryAll(req, res, next)
});

module.exports = router;


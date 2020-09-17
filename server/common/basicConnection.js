

var mysql = require('mysql');
var dbConfig = require('../config/mysql');

// 使用连接池连接数据库，避免开太多的线程，提升性能
var pool = mysql.createPool(dbConfig);

/**
 * 封装数据库查询结果，返回JSON
 */
function responseDoReturn(res,result,err){
    if (typeof result === 'undefined'){
        res.json(err);
    } else {
        res.json(result);
    }
};

/**
 * 封装数据库查询
 */
function query(req, res, next){
    pool.getConnection(function(err, connection){
        connection.query('select * FROM article_list',function(err2,rows){
          console.log('rows',rows,err2)
            responseDoReturn(res,rows,err2);
            // 释放数据库连接
            connection.release();
        })
    })
}

// 导出模块
module.exports = {
    queryAll: query
}
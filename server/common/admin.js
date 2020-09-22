

var mysql = require('mysql');
var dbConfig = require('../config/mysql');

// 使用连接池连接数据库，避免开太多的线程，提升性能
var pool = mysql.createPool(dbConfig);

function connectionQuery(sql,callback){
    pool.getConnection(function(err, connection){

        connection.query(sql,(err2,rows)=> callback(err2,rows,connection))
    })
}

/**
 * 封装数据库查询结果，返回JSON
 */
function responseDoReturn(res,result,err){
    if (typeof result === 'undefined'){
        console.log('err', err)
        res.json({
            code:201,
            msg:err
        });
    } else {
        res.json({
            code:200,
            data:result
        });
    }
};

// 查询分页，总条数
function responsePage(res,result,total,err){
    if (typeof result === 'undefined'){
        console.log('err', err)
        res.json({
            code:201,
            msg:err
        });
    } else {
        res.json({
            code:200,
            data:result,
            total
        });
    }
};

/**
 * 封装数据库查询
 */
function query(req, res, next){
    const {classify,title,pageNumber=1,pageSize=10} = req.query
    const number = (pageNumber - 1) * pageSize
    const limit = `LIMIT ${number},${pageSize}`
    let sql = `SELECT type,text,classify,title,id,DATE_FORMAT(time,'%Y-%m-%d') time FROM article_list `
    let sql2 = `SELECT COUNT(id) as total from article_list`

    if(classify && title){
        sql = `${sql} WHERE classify='${classify}' AND title LIKE '%${title}%' ${limit}`
        sql2 = `${sql2} WHERE classify='${classify}' AND title LIKE '%${title}%'`
    }
    else if(classify){
        sql = `${sql} WHERE classify='${classify}' ${limit}`
        sql2 = `${sql2} WHERE classify='${classify}'`
    } else if(title){
        sql = `${sql} WHERE title LIKE '%${title}%' ${limit}`
        sql2 = `${sql2} WHERE title LIKE '%${title}%'`
    }

    connectionQuery(sql,function(err,result){

        connectionQuery(sql2,function(err2,rows,connection){
            if (err2) throw err2;
              
            const total = rows[0]['total']

            responsePage(res,result,total,err);
            // 释放数据库连接
            connection.release();
        })
        // 释放数据库连接
    })

}

function add(req, res, next){
    const {text,type,classify,title,time} = req.body 
    const sql = `INSERT INTO article_list VALUES (${null},'${text}','${type}','${classify}','${title}','${time}')`
    pool.getConnection(function(err, connection){
        connection.query(sql,function(err2,rows){
            responseDoReturn(res,rows,err2);
            // 释放数据库连接
            connection.release();
        })
    })
}

function getDetail(req, res, next){
    const {id} = req.query
    const sql = `SELECT * FROM article_list WHERE id=${Number(id)}`
    pool.getConnection(function(err, connection){
        connection.query(sql,function(err2,rows){
            responseDoReturn(res,rows,err2);
            // 释放数据库连接
            connection.release();
        })
    })
}

function ClassifyList(req, res, next){
    const sql = `SELECT * FROM classify`
    pool.getConnection(function(err, connection){
        connection.query(sql,function(err2,rows){
            responseDoReturn(res,rows,err2);
            // 释放数据库连接
            connection.release();
        })
    })
}


// 导出模块
module.exports = {
    queryAll: query,
    add,
    getDetail,
    ClassifyList
}


var mysql = require('mysql');
var dbConfig = require('../config/mysql');
const fs = require('fs')
var path = require('path');
var marked = require("marked");

// 使用连接池连接数据库，避免开太多的线程，提升性能
var pool = mysql.createPool(dbConfig);

function connectionQuery(sql, callback,) {

    pool.getConnection(function (err, connection) {
        connection.query(sql, (err2, rows) => callback(err2, rows, connection))
    })

}

/**
 * 封装数据库查询结果，返回JSON
 */
function responseDoReturn(res, result, err) {

    if (typeof result === 'undefined') {
        console.error(err);
        res.json({
            code: 201,
            msg: err
        });
    } else {

        res.json({
            code: 200,
            data: result
        });
    }
};

// 查询分页，总条数
function responsePage(res, result, total, err) {
    if (typeof result === 'undefined') {
        console.error(err);
        res.json({
            code: 201,
            msg: err
        });
    } else {
        res.json({
            code: 200,
            data: result,
            total
        });
    }
};

/**
 * 封装数据库查询
 */
function query(req, res, next) {
    const { classify, title, pageNumber, pageSize } = req.query

    if (isNaN(pageNumber) || isNaN(pageSize)) return res.json({ msg: "请传分页参数" })

    const number = (Number(pageNumber) - 1) * Number(pageSize)
    const limit = `ORDER BY time DESC LIMIT ${number},${Number(pageSize)}`

    let sql = `SELECT type,text,classify,title,id,DATE_FORMAT(time,'%Y-%m-%d') time FROM article_list`
    let sql2 = `SELECT COUNT(id) as total from article_list`

    if (classify && title) {
        sql = `${sql} WHERE classify='${classify}' AND title LIKE '%${title}%' ${limit}`
        sql2 = `${sql2} WHERE classify='${classify}' AND title LIKE '%${title}%'`
    }
    else if (classify) {
        sql = `${sql} WHERE classify='${classify}' ${limit}`
        sql2 = `${sql2} WHERE classify='${classify}'`
    } else if (title) {
        sql = `${sql} WHERE title LIKE '%${title}%' ${limit}`
        sql2 = `${sql2} WHERE title LIKE '%${title}%'`
    } else {
        sql = `${sql} ${limit}`
    }

    connectionQuery(sql, function (err, result, connection) {
        console.log('query', 'sql111')
        // 释放数据库连接
        connection.release();

        connectionQuery(sql2, function (err2, rows, connection) {
            if (err2) throw err2;
            const total = rows[0]['total']

            responsePage(res, result, total, err);
            // 释放数据库连接
            connection.release();
        })
        // 释放数据库连接
    }, res)
}

function add(req, res, next) {
    const { text, type, classify, title, time } = req.body
    const sql = `INSERT INTO article_list VALUES (${null},'${text}','${type}','${classify}','${title}','${time}')`
    connectionQuery(sql, function (err, rows, connection) {
        responseDoReturn(res, rows, err);
        // 释放数据库连接
        connection.release();
    })

}

function update(req, res, next) {
    const { text, type, classify, title, time, id, usedText } = req.body
    if (isNaN(id)) return res.json({ msg: '请传id' + id })

    const sql = `UPDATE article_list SET text='${text}',type='${type}',classify='${classify}',title='${title}',time='${time}' WHERE id=${Number(id)}`
    connectionQuery(sql, function (err, rows, connection) {
        if (rows && usedText !== text) {
            console.log(usedText)
            fs.unlinkSync(usedText);
        }
        responseDoReturn(res, rows, err);
        // 释放数据库连接
        connection.release();
    })
}


function getDetail(req, res, next) {
    const { id,admin } = req.query
    if (isNaN(id)) return res.json({ msg: '请传id' + id })

    const sql = `SELECT type,text,classify,title,id,DATE_FORMAT(time,'%Y-%m-%d') time  FROM article_list WHERE id=${Number(id)}`
    connectionQuery(sql, function (err, rows, connection) {
        if (err) throw err;
        if(rows){
            const path = rows[0].text
            if(admin){
                responseDoReturn(res, rows, err);
                return;
            } 
            fs.readFile(path, 'utf-8', function (err, data) {
                if (err) {
                    console.log(err);
                    res.send("文件不存在！");
                } else {
                    // str = marked(data.toString());
                    const list = [{...rows[0],text: data}]
                    responseDoReturn(res, list, err);

                }
            });
        } else {
            res.json({msg:err})
        }
        // 释放数据库连接
        connection.release();
    })

}

function deleteData(req, res, next) {
    const { id } = req.query
    if (isNaN(id)) return res.json({ msg: '请传id' + id })

    const sql = `DELETE FROM article_list WHERE id=${Number(id)}`
    connectionQuery(sql, function (err, rows, connection) {
        responseDoReturn(res, rows, err);
        // 释放数据库连接
        connection.release();
    })
}


function ClassifyList(req, res, next) {
    const sql = `SELECT * FROM classify`
    connectionQuery(sql, function (err, rows, connection) {
        responseDoReturn(res, rows, err);
        // 释放数据库连接
        connection.release();
    })
}

function upload(req, res, next) {
    console.log(req.files)
    const file = req.files[0]
    // 因为上传过来的文件名称比较复杂,我们需要给文件重新命名
    var newName = (file.path).replace('\\', '/') + path.parse(file.originalname).ext
    // var newName = 'upload/' + req.files[0].originalname


    // 利用fs模块的文件重命名
    //   req.files[0].path这个是文件的在传递中被修改的名字，newName是文件原名称,function回调函数
    fs.rename(req.files[0].path, newName, function (err, data) {
        if (err) {
            res.json({ code: 201, msg: err })
        } else {
            res.json({ code: 200, path: newName })
        }
    })
}



// router.post('/filename',jsonParser,function(req, res) {
//     var path="/server/upload/f8dd22578c767f302fd10aa447507eae.md";
//     console.log(path)
//     fs.readFile(path,'utf-8', function(err, data){
//         if(err){
//             console.log(err);
//             res.send("文件不存在！");
//         }else{
//         console.log(data);
//             str = marked(data.toString());
//             console.log(str);
//             res.json(str) ;
//         } 
//     });
// });



// 导出模块
module.exports = {
    queryAll: query,
    add,
    getDetail,
    ClassifyList,
    update,
    deleteData,
    upload
}
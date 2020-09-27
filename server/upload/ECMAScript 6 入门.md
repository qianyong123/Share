

# 前言11

ECMAScript 6.0（以下简称 ES6）是 JavaScript 语言的下一代标准，已经在 2015 年 6 月正式发布了。它的目标，是使得 JavaScript 语言可以用来编写复杂的大型应用程序，成为企业级开发语言。我在这里简单介绍下ES6常用语法的使用，之前阮一峰老师写的ECMAScript 6 入门已经很详细了，[ECMAScript 6.0 入门](https://es6.ruanyifeng.com/)

```jsx


function getDetail(req, res, next) {
    const { id } = req.query
    if (isNaN(id)) return res.json({ msg: '请传id' + id })

    const sql = `SELECT type,text,classify,title,id,DATE_FORMAT(time,'%Y-%m-%d') time  FROM article_list WHERE id=${Number(id)}`
    connectionQuery(sql, function (err, rows, connection) {
            if(err) throw err;
            if(rows){
                const text = rows[0].text
                fs.readFile(text,'utf-8', function(err, data){
                    if(err){
                        console.log(err);
                        responseDoReturn(res, 'undefined', err);
                    }else{
                        str = marked(data.toString());
                        rows[0].text = str
                        responseDoReturn(res, rows, err);
                    } 
                });
            }
           
        // 释放数据库连接
        connection.release();
    })

}

```
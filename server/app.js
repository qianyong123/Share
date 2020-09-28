var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
const multer = require('multer')

var objMulter = multer({dest: './upload/'})
// 允许所有类型的文件传递过来
app.use(objMulter.any())

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');




var login = true
// 请求拦截，必须要放在最上面，next 执行下一步
// app.all('*', function(req,res,next){
//   if(login) return res.json({msg:"请登录"})
//   next()
// })



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//  引入新建的路由文件
var admin = require('./routes/admin'); 
// 映射路由访问地址
app.use('/api/admin',admin);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(__dirname + '/public'))

//配置任何请求都转到index.html，而index.html会根据React-Router规则去匹配任何一个route
app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

app.use(express.static(__dirname + '/public'))

//配置任何请求都转到index.html，而index.html会根据React-Router规则去匹配任何一个route
app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})


app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});



// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

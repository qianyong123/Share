

const fs = require('fs')
var path = require('path');



function upload(req, res, next) {
  console.log(req.files)
  const file = req.files[0]
  // 因为上传过来的文件名称比较复杂,我们需要给文件重新命名
  // var newName = (file.path).replace('\\', '/') + path.parse(file.originalname).ext
  var newName = 'upload/' + req.files[0].originalname


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

function download (req, res, next){
  const {text} = req.query
  try {
    let name = 'app-debug.apk';
    let size = fs.statSync(text).size;
    let f = fs.createReadStream(text);
  
      res.writeHead(200, {
        'Content-Type': 'application/force-download',
        'Content-Disposition': 'attachment; filename=' + name,
        'Content-Length': size,
        'Content-Name': name,

      });
      f.pipe(res);
  }
  catch (err){
    res.json({
      code:500,
      msg:err
    })
  }
  

  
  
  
}

// 导出模块
module.exports = {

  upload,
  download,

}

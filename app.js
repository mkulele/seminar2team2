var express = require("express");
var util = require('util');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var multer=require('multer');
const PORT = process.env.PORT;
//const PORT = 3000;
var app = express();


//views설정
app.use(express.static('views'));
app.get('/', function(req, res){
    fs.readFile('./index.html','utf8', function(error, data){

        res.end(data);
    });
});
app.get('/admin', function(req, res){
    fs.readFile('./views/admin.html','utf8', function(error, data){
        res.end(data);
    });
});

//파일다운로드
app.get('/download/:fileid', function(req, res){
    var fileId = req.params.fileid; //fileid = 각각의 파일을 구분하는 파일ID 값
    var origFileNm, savedFileNm, savedPath, fileSize; //DB에서 읽어올 정보들

    // 원본파일명, 저장파일명, 파일저장경로, 파일사이즈
    if( fileId == '1'  ){
        origFileNm = 'spyout_1.0.zip';
        savedFileNm = 'spyout_1.0.zip';
        savedPath = __dirname+'/upload';

    }else if( fileId == '1.1'  ){
        origFileNm = 'spyout_1.1.zip';
        savedFileNm = 'spyout_1.1.zip';
        savedPath = __dirname+'/upload';
    }

    var file = savedPath + '/' + savedFileNm;
   console.log('file : ', file);
    mimetype = mime.lookup( origFileNm );
  console.log('mimetype : ' + mimetype);

    res.setHeader('Content-disposition', 'attachment; filename=' + origFileNm );
    res.setHeader('Content-type', mimetype);

    var filestream = fs.createReadStream(file);
    filestream.pipe(res);
});



//파일업로드
var Storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, "./upload");
    },
    filename:function (req,file,callback) {
        callback(null,file.originalname);}
});
var upload = multer({
    storage: Storage
}).array("fu", 1); //Field name and max count
app.post("/admin/upload", function(req, res) {
    upload(req, res, function(err) {
        if (err) {
            return res.end("Something went wrong!");
        }
        return res.end("File uploaded sucessfully!.");
    });
});


app.listen(PORT,function(){
    console.log("server start");
});
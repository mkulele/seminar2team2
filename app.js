var express = require("express");
var util = require('util');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
const PORT = process.env.PORT;
var app = express();

app.use(express.static('views'));
app.get('/', function(req, res){
    fs.readFile('./index.html', function(error, data){
        res.writeHead(200, {'Content-Type':'text/html'});
        res.end(data);
    });
});



app.get('/download/:fileid', function(req, res){
    var fileId = req.params.fileid; //fileid = 각각의 파일을 구분하는 파일ID 값
    var origFileNm, savedFileNm, savedPath, fileSize; //DB에서 읽어올 정보들

    // 원본파일명, 저장파일명, 파일저장경로, 파일사이즈
    if( fileId == '1'  ){
        origFileNm = 'Battle.net-Setup.zip';
        savedFileNm = 'Battle.net-Setup.zip';
        savedPath = __dirname+'/download';
        fileSize = '6209';
    }/*else if( fileId == '1.1'  ){
        origFileNm = '2src_files.zip';
        savedFileNm = '2wsx3edc-201604061231';
        savedPath = 'ledownload/files'
        fileSize = '160931';

    }*/

    var file = savedPath + '/' + savedFileNm;
   console.log('file : ', file);
    mimetype = mime.lookup( origFileNm );
  console.log('mimetype : ' + mimetype);

    res.setHeader('Content-disposition', 'attachment; filename=' + origFileNm );
    res.setHeader('Content-type', mimetype);

    var filestream = fs.createReadStream(file);
    filestream.pipe(res);
});



app.listen(PORT,function(){
    console.log("server start");
});
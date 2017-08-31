var  fs=  require('fs');
module.exports={
    readImg:function(path,res){
        fs.readFile(path,'binary',function(err, filedata)  {
            if  (err)  {
                console.log("错误")
                console.log(err);
                return;
            }else{
                console.log("输出文件");
                    //res.writeHead(200,  {'Content-Type':'image/jpeg'});
                    res.write(filedata,'binary');
                    res.end();
            }
        });
    },
    readfile:function (path,rell){
        fs.readFile(path,function (err,data){
            if(err){
                console.log("错误")
            }else{
                rell(data);
            }
        });
    }
};   
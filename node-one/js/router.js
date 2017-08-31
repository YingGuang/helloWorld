
var  optfile  =  require('./fun/optfile');
function  getRecall(req,res){
    res.writeHead(200,    {'Content-Type':'text/html;charset=utf-8'});  
    function  recall(data){
        res.write(data);
        res.end('');//不写则没有http协议尾
        console.log("结束")
    }
    return  recall;
}
module.exports={
        login:function(req,res){
      	
        recall  =  getRecall(req,res);

        optfile.readfile('./html/page.html',recall);
        },
        zhuce:function(req,res){
        
        recall  =  getRecall(req,res);
                optfile.readfile('./views/zhuce.html',recall);
        },
    writefile:function(req,res){
        function  recall(data){
            res.write(data);
            res.end('');//不写则没有http协议尾
        }
        optfile.writefile('./views/one.txt','今天阳光灿烂',recall);
    },
    showImg:function(req,res){
        res.writeHead(200,{'Content-Type':'image/jpeg'});
        optfile.readImg('./images/tu.png',res);
    }
}
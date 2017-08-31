var  fs=  require('fs');
module.exports={
    readfile:function(path,rell){          //异步执行
        fs.readFile(path,  function  (err,  data)  {
            if  (err)  {
              console.log("读取发生错误");
            }else{
            	console.log(data)
              rell(data);
            }
        });
        console.log("异步方法执行完毕");
    },
    readfileSync:function(path,rst){      //同步读取
        var  data  =  fs.readFileSync(path,'utf-8');
        //console.log(data);
        console.log("同步方法执行完毕");
        rst.write(data.toString());
        rst.end("结束")
        return  data; 
    }
}
var connPool = require("./ConnPool");
module.exports={
    zhuce:function(req,res){
        pool = connPool();
        //从pool中获取连接(异步,取到后回调) 
        pool.getConnection(function(err,conn){
            if(err){
                //console.log('insert err:',err.message);
                res.send("数据库获取错误,错误原因:"+err.message);
                return;
            }
            var userAddSql = 'insert into user (email,pwd,createtime) values(?,?,current_timestamp)';
            var param = [req.body['email'],req.body['pwd']];
            conn.query(userAddSql,param,function(err,rs){
                if(err){
                    //console.log('insert err:',err.message); 
                    res.send("注册错误,错误原因:"+err.message);
                    return;
                }
                res.send('注册成功');
            })
            conn.release();
        });
    },
    login:function(req,res){
        return a+b;
    }
} 
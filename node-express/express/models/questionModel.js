var connPool = require("./ConnPool");
module.exports={
    ask:function(req,res){
        loginbean = req.session.loginbean;
        pool = connPool();
        //从pool中获取连接(异步,取到后回调)
        pool.getConnection(function(err,conn){
            // res.send("数据库错误,错误原因:"+err.message);
            var userAddSql = 'insert into question (typeid,title,content,createtime) values(?,?,?,current_timestamp)';
            var param = [req.body['typeid'],req.body['title'],req.body['content'],loginbean.id];
            conn.query(userAddSql,param,function(err,rs){
                console.log(123);
                    if(err){
                        //console.log('insert err:',err.message);
                        // res.send("写入错误,错误原因:"+err.message);
                        return;
                    }
                res.send('<script>alert("提问成功");</script>');
                // res.redirect('../');
            })
            conn.release();
        });
    },

}
var connPool = require("./ConnPool");
var async=require("async");
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

                    if(err){
                        console.log('写入错误,错误原因:',err.message);
                        // res.send("写入错误,错误原因:"+err.message);
                        return;
                    }
                res.send('<script>alert("提问成功");location.href="../"</script>');
                // res.redirect('../');
            })
            conn.release();
        });
    },
    queList:function(req,res){
        pool = connPool();
        //从pool中获取连接(异步,取到后回调)
        pool.getConnection(function(err,conn)
        {
            if(err)
            {
                //console.log('insert err:',err.message);
                res.send("获取连接错误,错误原因:"+err.message);
                return;
            };
            page=1;
            if(req.query['page']!=undefined){
                page = parseInt(req.query['page']);
                if(page<1){
                    page=1;
                }
            };
            pageSize = 5;
            pointStart = (page-1)*pageSize;
            count=0;
            countPage=0;
            var countSql = 'select count(*) as count from question';
            var listSql = 'select id,qid,title,looknum,renum,finished,updtime,createtime from question order by qid desc limit ?,?';
            var param = [pointStart,pageSize];

            async.series({
                one: function(callback){
                    conn.query(countSql,[],function(err,rs){
                        count=rs[0]["count"];
                        countPage = Math.ceil(count/pageSize);
                        if(page>countPage){
                            page=countPage;
                            pointStart = (page-1)*pageSize;
                            param = [pointStart,pageSize];
                        }
                        callback(null, rs);
                    })
                },
                two: function(callback){
                    conn.query(listSql,param,function(err,rs){
                        callback(null, rs);
                    })
                }
            },function(err, results) {
                //console.log(results);

                rs=results['two'];
                res.render('index', {loginbean:loginbean,page:page,rs:rs,count:count,countPage:countPage});
                //res.send('查完');
            });
            conn.release();
        });
    },
    queDetail:function (req,res) {
        id = req.query['id'];
        if(id!=undefined){
            sqlupd = 'update question set looknum=looknum+1 where id=?';
            sqldetail = 'select id,title,content,qid,looknum,renum,finished,updtime,createtime from question where id=?';
            param=[id];
            pool = connPool();
            //从pool中获取连接(异步,取到后回调)
            pool.getConnection(function(err,conn)
            {
                if(err)
                {
                    //console.log('insert err:',err.message);
                    res.send("获取连接错误,错误原因:"+err.message);
                    return;
                }
                async.series({
                    one: function(callback){
                        conn.query(sqlupd,param,function(err,rs){
                            callback(null, rs);
                        });
                    },
                    two: function(callback){
                        conn.query(sqldetail,param,function(err,rs){
                            callback(null, rs);
                        })
                    }
                },function(err, results) {
                    console.log(results);
                    rs=results['two'];
                    res.render('queDetail', {rs:rs});
                    //res.send('查完');
                });

                conn.release();
            });
        }else{
            res.send('没传入id');
        }
    }
}
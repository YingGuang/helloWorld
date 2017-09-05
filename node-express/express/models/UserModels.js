var connPool = require("./ConnPool");
var LoginBean = require("../jsbean/LoginBean");
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
            var userAddSql = 'insert into segment (email,pwd,nicheng,createtime) values(?,?,?,current_timestamp)';
            var param = [req.body['email'],req.body['pwd'],req.body['nicheng']];
            var emailuniq=req.body['email'];
            var nichenguiq=req.body['nicheng'];
            conn.query(userAddSql,param,function(err,rs){
                if(err){
                    //console.log('insert err:',err.message);
                    // res.send("注册错误,错误原因:"+err.message);
                    errStr = err.message;
                    sendStr = "<script> ";
                    if(errStr.indexOf(emailuniq)>-1){
                        sendStr += "alert('email重复');";
                    }else if(errStr.indexOf(nichenguiq)>-1){
                        sendStr += "alert('昵称重复');";
                    }else{
                        sendStr+="alert('数据库错误')";
                    }
                    sendStr += " history.back();</script>"
                    res.send(sendStr);
                    return;
                }
                res.redirect(307,'./login');
                // res.send("<script>alert('注册成功')</script>");
            })
            conn.release();
        });
    },
    login:function(req,res)
    {
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
            var userSql = 'select id,nicheng from segment where email=? and pwd=?';
            var param = [req.body['email'],req.body['pwd']];
            conn.query(userSql,param,function(err,rs){
                if(err){
                    //console.log('insert err:',err.message);
                    res.send("数据库错误,错误原因:"+err.message);
                    return;
                }
                console.log(rs);
                //console.log(rs.length);
                if(rs.length>0){
                    loginbean = new LoginBean();
                    loginbean.id=rs[0].id;
                    loginbean.nicheng = rs[0].nicheng;
                    req.session.loginbean = loginbean;
                    // res.send('登录成功');
                    res.redirect('/');    //跳转回index页
                }else{
                    res.send("email/密码错误");
                }
            })
            conn.release();
        });
    }
} 
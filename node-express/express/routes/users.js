var express = require('express');
var router = express.Router();
var c = require("../models/UserModels");
/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  res.send('输出users');
});
// 登陆注册
router.all('/login', function(req, res) {
    subflag = req.body['subflag'];
    //console.log(subflag);
    //console.log(subflag==undefined);
    if(subflag==undefined){
        res.render('login');
    }else{
        c.login(req,res);
        //res.send("执行登录");  //必须去掉
    }
});
router.post('/zhuce', function(req, res) {
    // var babab=req.body['email'];
    c.zhuce(req,res)
    // res.send("注册成功");
});
module.exports = router;

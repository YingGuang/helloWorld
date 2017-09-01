var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  res.send('输出users');
});
//  /list_user 页面 GET 请求
router.get('/list_user', function (req, res) {
    console.log("/list_user GET 请求");
    res.send('用户列表页面');
});
//  POST 请求
router.post('/', function (req, res) {
    console.log("主页 POST 请求");
    res.send('Hello POST');
})
module.exports = router;

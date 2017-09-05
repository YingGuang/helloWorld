var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  // res.send("zheshisdhsihdsi")
    loginbean = req.session.loginbean;
    // console.log(loginbean);
    res.render('index', {'loginbean':loginbean});
});
//----注销session
router.get('/logout',function(req,res){
    req.session.destroy(function(err) {
        //res.send("location.href='/index';");
        res.redirect('/');
    })
});

module.exports = router;
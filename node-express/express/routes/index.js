var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { name: '输出ejs文件' });
  // res.send("zheshisdhsihdsi")
});

module.exports = router;
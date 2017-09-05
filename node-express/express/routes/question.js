var express = require('express');
var router = express.Router();
var questionModel=require('../models/questionModel');
var CheckSession = require('../jsbean/CheckSession');
router.all('/ask', function(req, res) {
    loginbean=CheckSession.check(req, res);
    if(!loginbean){
        return;
    };
    subflag = req.body['subflag'];
    if(subflag==undefined){
        res.render('ask', {loginbean: loginbean});
    }else{
        //发提问
        questionModel.ask(req,res);
    }
    res.render('ask');
});
module.exports = router;
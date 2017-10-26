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
        return;
    }else{
        //发提问
        questionModel.ask(req,res);
        return
    }
    res.render('ask');
});
router.get('/detail',function(req, res) {
    questionModel.queDetail(req,res);
});
module.exports = router;
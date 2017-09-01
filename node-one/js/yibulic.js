var async = require('async');
function exec(){
    async.waterfall([
        function(done){  
            ii=0;  
            setInterval(function(){  
                console.log('aaa='+new Date());  
                ii++;  
                if(ii==3){  
                    clearInterval(this);  
                    done(null,'这是异步流的第一层');  
                }  
            },1000);  
        },  
        function(preValue,done){  
            jj=0;  
            setInterval(function(){  
                console.log('bbb='+preValue);  
                jj++;  
                if(jj==3){  
                    clearInterval(this);  
                    done(null,preValue+',这是异步流的第二层');  
                }  
            },1000);  
        }  
    ],function(err,rs) {   
            console.log(err);  
            console.log(rs);  
        });  
}  
exec(); 

// function oneFun() 
// { 
//     /* 
//     setTimeout(function(){ 
 
//     },1000); 
//     */ 
//     ii=0; 
//     setInterval(function(){ 
//         console.log("aaa="+new Date()); 
//         ii++; 
//         if(ii==3){ 
//             clearInterval(this); 
//         } 
//     },1000); 
//     console.log("oneFun"); 
// } 
// function twoFun() 
// { 
//     jj=0; 
//     setInterval(function(){ 
//         console.log("bbb="+new Date()); 
//         jj++; 
//         if(jj==3){ 
//             clearInterval(this); 
//         } 
//     },1000); 
//     console.log("oneFun执行完毕"); 
// }  
    
// oneFun(0);console.log("oneFun执行");    
// twoFun();  
// console.log("twoFun执行");   
// console.log("主进程执行完毕");  
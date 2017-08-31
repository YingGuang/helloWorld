var  http = require('http');
var url=require('url');
var  root = require('./fun/root');
http.createServer(function  (request,  response)  {
    response.writeHead(200,  {'Content-Type': 'text/html; charset=utf-8'});
    if(request.url!=="/favicon.ico"){  //清除第2此访问
        console.log('访问成功');
        // response.write('hello,world');
        var pathname = url.parse(request.url).pathname;
        console.log(pathname);
            pathname = pathname.replace(/\//,'');//替换掉前面的/
        root[pathname](response);

       
    }
}).listen(8000);
console.log('Server  running  at  http://127.0.0.1:8000/');
var fss=require('../fss');
module.exports={
	login:function (rst){
		function rell(data){
			rst.write(data);
			rst.end('程序结束');//不写则没有http协议尾
		};
		fss['readfile']('./fun/path.js',rell);
	},
	ends:function (rst){
		fss.readfileSync('./fun/path.js',rst);
	},
	flies:function (rst){
		var datas="更换掉全部的内容";
		function refn(err){
			if(err){
				console.log("发送错误")
			}
			rst.write("写入成功");
			rst.end("结束");
		};
		fss.xfile('./fun/ts.txt',datas,refn)
	}
}
var fss=require('../fss');
module.exports={
	login:function (res){
		function rell(data){
			res.write(data);
			res.end('程序结束');//不写则没有http协议尾
		};
		fss['readfile']('./fun/path.js',rell);
	},
	ends:function (rst){
		fss.readfileSync('./fun/path.js',rst);
	}
}
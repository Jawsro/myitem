const express=require("express");
const router=express.Router();
const pool=require("../pool.js");
/******************  查询购物车是否已存在该产品，若存在获取该产品的件数************** */
router.get("/sel",function(req,res){
	var $s_pid=req.query.pid;
	var sql="select * from shopping_car where s_pid=?"
	pool.query(sql,[$s_pid],function(err,result){
        if(err) throw err;
	if(result.length>0){
		res.send(result);
	}else{res.send("0");}
	console.log(result);
	})
})
/****************  修改已经存在的产品的件数******************* */
router.get("/updete",function(req,res){
	var $s_pid=req.query.pid;
	var s_count=req.query.cont;
	var sql="updete shopping_car set s_count=? where s_pid=?"
	pool.query(sql,[$s_pid],function(err,result){
        if(err) throw err;
	if(result.affectedRows>0){
		res.send("成功");
	}else{res.send("失败");}
	
	})
})
/*************向购物车表添加相关信息 ************/
router.get('/shopping_car',function(req,res){
    var $s_pid=req.query.pid;//console.log($s_pid);
    var $s_img=req.query.img;
    var $s_title=req.query.short_title;
    var $s_price=req.query.price;
    var $s_count=req.query.count;
	var $s_uid=req.query.uid;
    var sql1='insert into shopping_car values( ? ,? ,?, ?,?,?,?)';
    pool.query(sql1,[null,$s_uid,$s_pid,$s_img,$s_title,$s_price,$s_count],function(err,result){
	if(err) throw err;
	if(result.length>0){
		res.send("1");
	}else{res.send("0");}
	//console.log(result);
    })
})
/***************获取购物车里面的数据，上传到购物车页面**********/
router.get('/car',function(req,res){
	var $s_uid=req.query.s_uid1;
     var sql2="select * from shopping_car where s_uid=?";
    pool.query(sql2,[$s_uid],function(err,result){
        if(err) throw err;
	if(result.length>0){
		res.send(result);
	}else{res.send("0");}
	console.log(result);
   
    })
})
/*************************  删除产品  ********************* */
router.get('/delect',function(req,res){
    var $sid=req.query.sid;
	pool.query('delete from shopping_car where sid=?',[$sid],function(err,result){
		if(err) throw err;
		//console.log(result);
		if (result.affectedRows>0){
			res.send("1");//成功
		}else{
			res.send("0");//失败
			}
	})
})

  module.exports=router;
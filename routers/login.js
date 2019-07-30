/****************登录 注册路由 */
const express=require("express");
const router=express.Router();
const pool=require("../pool.js");
//查询前端传过来的手机号码，看该号码是否存在
router.get('/sel',function(req,res){
    var $uphone=req.query.uphone;
    var sql2="select * from user where uphone=?";
    pool.query(sql2,[$uphone],function(err,result){
        if(err) console.log(err);
        if(result.length>0){
			res.send("1");
		}else{
			res.send("0");
		}
       
    })
})
router.post('/insert',function(req,res){
    var $uphone=req.body.uphone;
    var $pwd=req.body.pwd;
    var sql1='insert into user values( ? ,? ,?)';
    pool.query(sql1,[null,$uphone,$pwd],function(err,result){
         if(err) console.log(err);
         if(result.length>0){
		    res.send("1");
	    }else{res.send("0");}
    })
})
router.post('/login',function(req,res){
    var $uphone=req.body.phonein;
    var $pwd=req.body.pwdin;
    var sql2="select * from user where uphone=? and upwd=?";
    pool.query(sql2,[$uphone,$pwd],function(err,result){
         if(err) console.log(err);console.log(result)
         if(result.length>0){
		    res.send(result);//登录成功
	    }//else{res.send("0");}//用户名或密码错误
    })
})
 module.exports=router;//导出路由
 
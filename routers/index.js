//引入express板块
const express=require("express");
//创建路由
const router=express.Router();
//引入连接池模块
const pool=require("../pool.js");
//导出路由
module.exports=router;
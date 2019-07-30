//使用express构建服务器
const express=require("express");
const bodyParser=require("body-parser");
//引入路由板块
const index=require("./routers/index.js");
const product_list=require("./routers/product_list.js");
const shopping_car=require("./routers/shopping_car.js");
const login=require("./routers/login.js");
//npm i -save cors
const cors=require("cors");
//创建服务器
var server=express();
//监听端口
server.listen(8080);
//前后端分离，跨域，只写一次，就可以让整个服务器端所有接口都支持跨域
// server.use(cors({
//     origin:['http://localhost:5500',"http://127.0.0.1:5500"],
//     credentials:true
// }))
//使用body-parser中间件
server.use(bodyParser.urlencoded({
    extended:false//不使用扩展的qs模块，而是使用querystring模块
}))
//静态资源托管到public
server.use(express.static("public"));
//使用用户路由来管理路由
server.use("/index",index);
server.use("/product_list",product_list);
server.use("/shopping_car",shopping_car);
server.use("/login",login);

#设置客户端连接服务器的编码为utf-8
set names utf8;

#丢弃数据库
drop database if exists kaola;
create database kaola CHARSET=utf8;
#创建新的数据库

#进入数据库
use kaola;
#创建保存数据表用户注册的信息表 user
create table user(
    uid int primary key auto_increment,
    uphone varchar(11),
    upwd varchar(16)
);
#插入数据
insert into user values(1,'13586593356','12534ffg');
insert into user values(null,'13586693356','12588ffg');
insert into user values(null,'13588693356','12504ffg');
insert into user values(null,'13586542356','12564ffg');
insert into user values(null,'13533542356','125648ff');

#创建保存产品品牌分类表 product_family
create table product_family(
    fid int primary key auto_increment,#编号
    fname varchar(20)#产品品牌名称
);
insert into product_family values(1,"悦木之源");
insert into product_family values(null,"Dermafirm 德妃");
insert into product_family values(null,"CLINIQUE 倩碧");
insert into product_family values(null,"LANCÔME 兰蔻");
#创建保存数据表产品表 product
create table product(
    pid int primary key auto_increment,#编号
    family_id int,#所属品牌编号
    img varchar(200),#产品图片
    title varchar(200),#主标题
    subtitle VARCHAR(300), #副标题
    short_title  VARCHAR(100),#短标题
    price DECIMAL(8,2), #价格
    foreign key (family_id) references product_family(fid)
);
#插入数据
insert into product values(1,1,"img/sqlImg/sm/aa.jpg","【陈柏霖同款】ORIGINS 悦木之源 灵芝焕能精华水 菌菇水 200毫升 靠它撑过","【新老包装随机发货】由内强化肌底，向外抵御环境侵害，深层修护受损肌底，强韧肌肤保护屏障，肌肤一天天改善，实现健康透亮，有效对抗暗黄脸。","灵芝焕能精华水",189.00);
insert into product values(null,2,"img/sqlImg/sm/bb.jpg","【平价黛珂】Dermafirm 德妃 限量版紫苏水乳套装","平价版黛珂，绝不输黛珂！0添加，产品更温和，敏感肌肤和孕妇都可以使用。水乳里添加了珍贵的积雪草成分，可以帮助调节肤质、防止肌肤老化，淡化斑痕，还原白嫩美肤！"," 限量版紫苏水乳套装",268.00);
insert into product values(null,3,"img/sqlImg/sm/cc.jpg","CLINIQUE 倩碧 卓越润肤啫喱 无油黄油 125毫升 天才黄油","精简护肤步骤，无油配方小黄油，简直是“外油内干”人群的福音。柔滑的啫喱质地，还原天然肌肤。水油黄金比例，调节肌肤水油平衡，既补充肌肤所需水分，应对干燥，又不显得厚重黏腻，减轻肌肤负担。","卓越润肤啫喱",159.00 );
insert into product values(null,4,"img/sqlImg/sm/dd.jpg","LANCÔME 兰蔻 玫瑰露清滢柔肤粉水 400毫升 干皮真爱","【新老包装随机发货，目前新包装与页面展示均有差异】夏季的烈日，冬季的妖风都让干皮妹子们深深苦恼。这瓶兰蔻粉水专为干燥肌肤而设，上脸后轻轻拍打几下就被肌肤吸收，用完后感觉肌肤亮了一个度，水润又饱满~","玫瑰露清滢柔肤粉水",319.00 );
#创建保存数据表产品图片 product_pic
create table product_img(
    iid int primary key auto_increment,#编号
    p_id int,#产品编号
    sm VARCHAR(128),#小图片路径
    md VARCHAR(128),#中图片路径
    lg VARCHAR(128), #大图片路径
    foreign key (p_id) references product(pid)
);
insert into product_img values(1,1,"img/sqlImg/sm/aa.jpg","img/sqlImg/md/aa.jpg","img/sqlImg/lg/aa.jpg");
insert into product_img values(null,1,"img/sqlImg/sm/aa1.jpg","img/sqlImg/md/aa1.jpg","img/sqlImg/lg/aa1.jpg");
insert into product_img values(null,1,"img/sqlImg/sm/aa2.jpg","img/sqlImg/md/aa2.jpg","img/sqlImg/lg/aa2.jpg");
insert into product_img values(null,2,"img/sqlImg/sm/bb.jpg","img/sqlImg/md/bb.jpg","img/sqlImg/lg/bb.jpg");
insert into product_img values(null,2,"img/sqlImg/sm/bb1.jpg","img/sqlImg/md/bb1.jpg","img/sqlImg/lg/bb1.jpg");
insert into product_img values(null,3,"img/sqlImg/sm/cc.jpg","img/sqlImg/md/cc.jpg","img/sqlImg/lg/cc.jpg");
insert into product_img values(null,3,"img/sqlImg/sm/cc1.jpg","img/sqlImg/md/cc1.jpg","img/sqlImg/lg/cc1.jpg");
insert into product_img values(null,3,"img/sqlImg/sm/cc2.jpg","img/sqlImg/md/cc2.jpg","img/sqlImg/lg/cc2.jpg");
insert into product_img values(null,3,"img/sqlImg/sm/cc3.jpg","img/sqlImg/md/cc3.jpg","img/sqlImg/lg/cc3.jpg");
insert into product_img values(null,3,"img/sqlImg/sm/cc4.jpg","img/sqlImg/md/cc4.jpg","img/sqlImg/lg/cc4.jpg");
insert into product_img values(null,3,"img/sqlImg/sm/cc5.jpg","img/sqlImg/md/cc5.jpg","img/sqlImg/lg/cc5.jpg");
insert into product_img values(null,4,"img/sqlImg/sm/dd.jpg","img/sqlImg/md/dd.jpg","img/sqlImg/lg/dd.jpg");
insert into product_img values(null,4,"img/sqlImg/sm/dd1.jpg","img/sqlImg/md/dd1.jpg","img/sqlImg/lg/dd1.jpg");
#购物车shopping_car
create table shopping_car(
    sid int primary key auto_increment,#编号
    s_uid int,#用户编号
    s_pid int,#产品的编号
    s_img varchar(200),#产品图片
    s_title varchar(200),#小标题
    s_price DECIMAL(8,2), #价格
    s_count int #加入购物车的产品的数量
);
insert into shopping_car values(1,1,1,"img/sqlImg/sm/aa.jpg","灵芝焕能精华水",189.00,5);
insert into shopping_car values(null,1,2,"img/sqlImg/sm/bb.jpg"," 限量版紫苏水乳套装",268.00,3);
insert into shopping_car values(null,1,3,"img/sqlImg/sm/cc.jpg","卓越润肤啫喱",159.00,1);
insert into shopping_car values(null,1,4,"img/sqlImg/sm/dd.jpg", "玫瑰露清滢柔肤粉水",319.00,3);
insert into shopping_car values(null,4,4,"img/sqlImg/sm/dd.jpg", "玫瑰露清滢柔肤粉水",319.00,1);
insert into shopping_car values(null,4,2,"img/sqlImg/sm/bb.jpg"," 限量版紫苏水乳套装",268.00,1);
insert into shopping_car values(null,4,1,"img/sqlImg/sm/aa.jpg","灵芝焕能精华水",189.00,5);
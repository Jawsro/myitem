(function(){
    //打开页面1秒后弹出活动浮框
    $(document).ready(function(){
        //1秒后浮框显示出来
        setTimeout(function(){
             $("#float-center").toggleClass("in");
        },1000)
       //点 × 浮框隐藏
        $("p.close").click(function(){
            $("#float-center").toggleClass("in");
        })
        //页面绑定scroll事件
        $(document).scroll(function(){
            //获取滚动条相对于window对象垂直到顶部的距离
            var scroll_top=$(this).scrollTop();
            console.log(scroll_top);
            //当距离大于300时，
            if(scroll_top>300){
                //修改左右浮窗 的样式
                $('#aside-left').css({
                    "position":"fixed",
                    "top":300,
                });
                $("#aside-right").css({
                    "position":"fixed",
                    "top":300,
                })
            }else{
                $('#aside-left').css({
                    "position":"absolute",
                    "top":726,
                });
                $("#aside-right").css({
                    "position":"absolute",
                    "top":726,
                });
            }
        })
    })
    var banner=document.getElementById("banner");//要移动的div
    var divs=banner.getElementsByTagName("div");//每个图片外的div
    var timer=null;
    var index=0;//现在正在显示第几张图片，从0开始
    var imgwidth=1400;//每张图片固定宽度
    var banner_nav=document.getElementById("banner_nav");
    //查找小圆点的元素
    var spots=document.getElementById("spots");
    var spans=spots.getElementsByTagName("span");
    
        //图片切换
        function moveTo(to){
            //如果用户没有传入要跳到第几张图，就默认跳到当前图的下一个张
            if(to==undefined){
                to=index+1;
            }
            if(index==0){
                if(to>index){
                //如果滚动从头开始，再重新加上动画样式
                    banner.style.transitionProperty="all";
                    banner.style.transitionDuration="0.5s";
                    banner.style.transitionTimingFunction="linear";
                }else{
                    banner.style.transitionProperty="none";
                    banner.style.transitionDuration="none";
                    banner.style.transitionTimingFunction="none";
                    banner.style.marginLeft=-(divs.length-1)*imgwidth+"px";
                    setTimeout(function(){
                        moveTo(divs.length-2)
                    },100)
                    return;
                }
            }
            //先将表示第几张图片的变量index变为目标位置
            //再用index计算 banner的marginLeft距离
            index=to;
            banner.style.marginLeft=-index*imgwidth+"px";
             //先删除所有小圆点的class
             for(var span of spans){
                 span.className="";
             }
             if(index==divs.length-1){
                 index=0;//当transition动画播放完之后，才
                 setTimeout(function(){//清楚动画样式
                    banner.style.transitionProperty="none";
                    banner.style.transitionDuration="none";
                    banner.style.transitionTimingFunction="none";
                    banner.style.marginLeft=0;//将 banner拉回0位置
                 },500)
             }
             //再给当前位置的小圆点添加class active-red
             spans[index].className="active-red"
        }
        //鼠标划过时清除定时器
        banner_nav.onmouseover=function(){
            clearInterval(timer)
        }
        //鼠标离开时，定时器继续
        banner_nav.onmouseout=function(){
            timer=setInterval(function(){
                moveTo()
            },2000)
        }
        banner_nav.onmouseout();
   

//下一张
    var next=document.getElementById("next");
    var prve=document.getElementById("prve");//console.log(prve)
    var canClick=true;
    next.onclick=function(){
    move(1)
    }
    function move(n){
        if(canClick){
            moveTo(index+n);
            canClick=false;
            setTimeout(function(){
                canClick=true;
            },600)
        }
    }
    //上一张
    prve.onclick=function(){
        move(-1);
    }
   
    //小圆点
    //查找要操作的元素已查找
    var canClick=true;console.log(spans);
    spots.onclick=function(e){
        if(canClick){
            var span=e.target;
            if(span.nodeName=="SPAN"){
                if(span.className!=="active-red"){
                    for(var i=0;i<spans.length;i++){
                        if(spans[i]==span){
                            break;
                        }
                    }
                    moveTo(i);
                    setTimeout(function(){
                        canClick=true;
                    },500);
                }
            }
        }
    }



    /*倒计时*/ 
    window.onload=clock;
    function clock(){
        //计算两个日期时间相差的毫秒数
        var now=new Date();
        var target=new Date('2019/11/23 12:00:00');
        //console.log( target.getTime()-now.getTime() );
        //两个对象相减得到的就是相差的毫秒数
        var d=target-now;
        //转成相差的秒数
        d=Math.floor(d/1000);
        //获取相差的天数=总的秒数/一天的秒数
        var day=Math.floor(d/(24*60*60));
        //获取相差的小时
        //总的秒数%一天的秒数=不满一天的秒数
        //不满一天转成小时
        var houres=d%(24*60*60);
        houres=Math.floor(houres/3600);
        //获取相差的分钟
        //总的秒数%一小时的秒数=不满一小时的秒
        //转成分钟
        var minutes=d%3600;
        minutes=Math.floor(minutes/60);
        //获取相差的秒数
        //总的秒数%一分钟的秒数=不满一分钟的秒
        var seconds=d%60;
        //console.log('距离还有'+day+'天'+houres+'小时'+minutes+'分'+seconds+'秒');
        setTimeout(clock,1000); 

        var today=document.getElementById("today");
        var hours=today.querySelector(".hours");//console.log(hours)
        hours.innerHTML=houres;
        var min=today.querySelector(".min");
        min.innerHTML=minutes;
        var second=today.querySelector(".second");
        second.innerHTML=seconds
    }
    /******************************** */
    
    $("#change").css("display","none")
    var g_id=sessionStorage.getItem("uid");console.log(g_id,typeof g_id)
    if(g_id){
        $("#change").css("display","block");
        $("#login_in").css("display","none")
    }
    $("#change").click(function(){
        sessionStorage.clear();
            location.href=location.search;
    })
})()


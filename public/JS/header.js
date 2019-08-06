     
    var g_id=sessionStorage.getItem("uid");
     console.log(g_id,typeof g_id)
    $.ajax({
        url:"header.html",
        type:"get",
        success:function(result){
            console.log(location.href)
       
            //动态添加link元素，引入header.css，给header元素添加样式
            
            //head指的是html中的head
            // console.log(result);
            $('header').html(result)
              var links=$('.lg').attr('href')+'?'+location.href
             //////////////////////////
           $('.lg').attr('href',links)
             /////////////////////////
           //header指的是<header id="headerin"></header>中的元素header
           ////////////////////////////////
           $("#change1").css("display","none")
           if(g_id!=undefined){
        $("#change1").css("display","block");
        $("#login_in").css("display","none")
    }
    $("#change1").click(function(){
        sessionStorage.clear();
            location.href="http://127.0.0.1:5500/item.html";
    })
        }
    })
   
    
    
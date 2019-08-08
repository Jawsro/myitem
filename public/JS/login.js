(function(){
     $(document).scroll(function(){
            var scroll_top=$(this).scrollTop();
            //console.log(scroll_top)
            if(scroll_top>300){
               $("#aside-right").css({
                    "position":"fixed",
                    "top":300,
                })
            }else{
                 $("#aside-right").css({
                    "position":"absolute",
                    "top":726,
                });
            }
        })
    //点击 去登录 ，注册信息隐藏，手机登录显示
    //查找要操作的元素
    //注册信息的元素
    var login=document.getElementById("login");
    //登录信息的元素
    var checkin=document.getElementById("checkin");
    var a=login.firstElementChild//div
    .lastElementChild//a
    //console.log(a)
    //绑定鼠标单击事件
    a.onclick=function(){
    //当事件触发时，注册信息元素添加.check{display: none;}样式
    login.style.display="none";
    //手机注册显示
    checkin.style.display="block"
    }
    //当点击手机快捷注册时，手机登录隐藏，注册信息显示
    //查找手机快捷注册所在的元素
    var input_a=checkin.lastElementChild//div.form
        .lastElementChild//div.c-img
    .children[4];
    //console.log(input_a)
    //绑定鼠标单击事件
    input_a.onclick=function(){
    login.style.display="block";
    checkin.style.display="none";
    }
    //当点击手机登录页面的邮箱登陆时，手机登录隐藏，邮箱登录显示
    var email=document.getElementById("email");
    var email_a=checkin.firstElementChild.lastElementChild;//console.log(email_a)
    //绑定鼠标单击事件
    email_a.onclick=function(){
    checkin.style.display="none";
    email.style.display="block";
    }
    //当点击邮箱登录页面的手机登陆时，手机登录显示，邮箱登录隐藏
    var email_a2=email.firstElementChild.firstElementChild;
    email_a2.onclick=function(){
    email.style.display="none";
    checkin.style.display="block";
    }
    })()

/************************用户注册************* */
    //当失去焦点时
    $("input#phone").blur(function(){
        if($(this).val()==''){
          $("#button").prop("disabled",true)  
        }else{
            $("#button").prop("disabled",false)
        }      
        //获取用户输入的手机号码
        var uphone=$("input#phone").val();console.log(uphone, typeof uphone)
        //发送ajax请求，判断注册号码
        $.ajax({
            url:"http://localhost:8080/login/sel",
            data:{uphone},
            type:"get",
            dataType:"json",
            success:function(result){
                //1.如果没有注册
                if(result=="1"){
                    $("#i_html").html("该手机号已注册");
                }
                else {
                    var a=/^1[3-8]\d{9}$/;
                    
                    if(a.test(uphone)){
                        $("#i_html").html("");//手机号未注册，且格式正确
                        //console.log(a.test(uphone))
                      }else if(!a.test(uphone)){
                        $("#i_html").html("手机号格式错误");
                    }
                    $("#psaaword").focus(function(){
                      $("#i_html").html("");
                    })
                }
             }
        })
        
    })
 //获得焦点时，修改相关内容  
 $("input#phone").focus(function(){
         $("#i_html").html("");
    })
        
/****设置button 的初始状态*/ 
 $(function(){
     var uphone=$("input#phone").val();//console.log(uphone, typeof uphone)
     var pwd=$("#psaaword").val();
     if(uphone==""||pwd==""){
      $("#button").prop("disabled",true)   
     }else{
         $("#button").prop("disabled",false) 
     }
 })
  /**************点击注册按钮时********* */
 //注册号码和输入的密码格式正确才能注册成功，提交给数据库
 //点击  注册按钮时
  $("#button").click(function(){
     //alert("11111")
     var uphone=$("input#phone").val();console.log(uphone, typeof uphone)
     var pwd=$("#psaaword").val();
    if(uphone==""){
        //1.未输入手机号，提示信息 "请输入手机号"
        console.log('111')
        $("#i_html").html("请输入手机号");  
    }
    else if(pwd==""){
        //2.未输入密码，提示信息 "请输入密码"
        $("#i_html").html("请输入密码");
    }
    else if(pwd.length<6||pwd.length>16){
        $("#i_html").html("密码须由6-16个字符组成，区分大小写");
    }
     $.ajax({
            url:"http://localhost:8080/login/sel",
            data:{uphone},
            type:"get",
            dataType:"json",
            success:function(result){
                if(result=="0"){ //手机号未被注册
                    var a=/^1[3-8]\d{9}$/;
                    var reg=/^[a-zA-Z0-9]{6,16}$/;
                    if(a.test(uphone)&&reg.test(pwd)){
                    $.ajax({
                            url:"http://localhost:8080/login/insert",
                            data:{uphone,pwd},
                            type:"post",
                            success:function(result){
                                alert("注册成功");
                                location.href="http://localhost:8080/item.html"
                            }

                        })
                    }
                }
        }
    })
 })

/***************************登录页面*******/

$("#gologin").click(function(){
    //alert("111")
    var phonein=$("#phonein").val();console.log(phonein)
    var pwdin=$("#pwdin").val();
    if(phonein==""){
        $("#c-html").html("请输入手机号")
    }else if(pwdin==""){
        $("#c-html").html("请输入密码");
    }
    var a=/^1[3-8]\d{9}$/;//判断手机号码的格式
    var reg=/^[a-zA-Z0-9]{6,16}$/;//判断密码的格式
    //判断手机号码的格式
    if(!a.test(phonein)){
        $("#c-html").html("手机号格式错误")
    }else if(!reg.test(pwdin)){
         $("#c-html").html("密码格式错误")
    }else if(a.test(phonein)&&reg.test(pwdin)){
        $.ajax({
            url:"http://localhost:8080/login/login",
            data:{phonein,pwdin},
            type:"post",
            success:function(result){
                if(result.length<0){
                     $("#c-html").html("用户名或密码错误")
                }else if(result.length>0){
                     $("#c-html").html("登录成功")
                     var uid=result[0].uid;//获取登录用户的id
                     console.log(uid)
                     sessionStorage.setItem("uid",uid);//浏览器保存用户id
                   location.href = location.search.slice(1)
                }
            }

        })
    }
})

/*************************手机号码输入获取焦点或失去焦点时，需要修改的********************/
$("#phonein").focus(function(){
     $("#c-html").html("");//console.log($("#phonein").parent())
     $("#phonein").parent().css("border-color","lightblue");
})
$("#phonein").blur(function(){
     $("#phonein").parent().css("border-color","#E8E8EA");
})
/*************************密码输入获取焦点或失去焦点时，需要修改的********************/
$("#pwdin").focus(function(){
     $("#c-html").html("");//console.log($("#pwdin").parent())
     $("#pwdin").parent().css("border-color","lightblue");
})
$("#pwdin").blur(function(){
     $("#pwdin").parent().css("border-color","#E8E8EA");
})



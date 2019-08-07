/**************点击注册按钮时********* */
 //注册号码和输入的密码格式正确,并且未注册过才能注册成功，提交给数据库
 //点击  注册按钮时
 $("#button").click(function(){
     //alert("11111")
     var uphone=$("input#phone").val();//console.log(uphone, typeof uphone)
     var pwd=$("#psaaword").val();
      $.ajax({
            url:"http://localhost:8080/login/sel",
            data:{uphone},
            type:"get",
            dataType:"json",
            success:function(result){
                //1.如果没有注册
                if(result.length<0){
                    $("#i_html").html("该手机号已注册");
                }
                else{ 
                    if(uphone==""){
                        //1.未输入手机号，提示信息 "请输入手机号"
                        $("#i_html").html("请输入手机号")
                    }
                    else if(pwd==""){
                        //2.未输入密码，提示信息 "请输入密码"
                        $("#i_html").html("请输入密码");
                    }
                    else if(pwd.length<6||pwd.length>16){
                        $("#i_html").html("密码须由6-16个字符组成，区分大小写");
                    }
                    else{
                         $.ajax({
                            url:"http://localhost:8080/login/insert",
                            data:{uphone,pwd},
                            type:"post",
                            success:function(){}

                        })
                    }
                }


            }
      })

 })


                
                
                  
    
   
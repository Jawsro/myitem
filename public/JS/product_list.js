$(function () {
    //右侧浮窗
    $(document).scroll(function () {
        //变量保存鼠标滚轴的高度
        var scroll_top = $(this).scrollTop();
        //console.log(scroll_top)
        //如果鼠标滚轴的高度超过300px时
        if (scroll_top > 300) {
            $("#aside-right").css({
                //#aside-right变成固定定位，距离顶部300px
                "position": "fixed",
                "top": 300,
            })
        } else { //否则#aside-right变成绝对定位，距离顶部726px
            $("#aside-right").css({
                "position": "absolute",
                "top": 726,
            });
        }
        /* 固定在顶部的浮窗  购物车  */
        if (scroll_top > 1000) {
            $("#float_top").css({
                "position": "fixed",
                "display": "block"
            })
            $("#float_none").css("display", "none")
        } else {
            $("#float_top").css({
                "position": "absolute",
                "display": "none"
            })
            $("#float_none").css("display", "block")
        }
    })
    //点击 展开 内容显示
    $("#open").click(function () {
        $(this).hide();
        $("#close").show();
    });
    $("#hide").click(function () {
        $("#open").show();
        $("#close").hide();
        //console.log(111)
    })
    //评论点赞
    //点击元素时
    // console.log($(".zan").children().eq(0))
    $(".zan").click(function (e) {
        var $a = $(this);
        //找到带有点赞数字的元素
        var $span = $a.find(".zan_num");
        //获得当前点赞的数量，转成数字类型
        var num = parseInt($span.html()); //console.log(num)
        //用是否有add类名来判断是否已经点过赞
        //如果没有add类名，说明没有点赞
        if (!$span.hasClass('add')) {
            //点击一次 +1
            $span.html(num + 1);
            //并且为这个元素添加一个add类名
            $span.addClass('add');
            //表示已经点过赞，添加下面样式
            $a.children().first().css("background", "pink")
        }
        //否则表示已经点过赞了，再点一次表示取消本次点赞
        else {
            //console.log(111)
            //移除add类名，
            $span.removeClass('add');
            //取消本次点赞，点赞数量减1
            $span.html(num - 1);
            //表示为点赞，样式不发生变化
            $a.children().first().css("background", "none")
        }
    })

    /*************动态导入产品详细内容和图片*************************/
    //如果返回URL的查询部分不是空的
    if (location.search !== "") {
        //获得地址栏中的？lid=1中的1
        //以“=”未分割获取1
        var lid = location.search.split("=")[1];
        // console.log(lid)
        $.ajax({
            url: "http://localhost:8080/product_list",
            type: "get",
            data: {
                lid
            },
            dataType: "json", //JSON.parse()
            success: function (result) {
                //现将得到的两大块数据结构出来
                var {
                    product,
                    pics
                } = result;
                //1.先填充右上角产品的基本新，标题，副标题。。。。
                //先将详细信息从product中结构出来
                var {
                    title,
                    subtitle,
                    price
                } = product;
                $("#title-sql").html(title);
                $("#subtitle").html(subtitle);
                $("#price-sql").html(price);
                //2放大镜效果
                //2.1填充图片
                //先填充小图片
                //先定义空的html,准备接多个模块片段
                var html = "";
                //遍历pics数组中的每张图片对象
                for (var p of pics) {
                    html += `<div class="s-img1 all-simg">
					<img src="${p.sm}" data-md="${p.md}" data-lg="${p.lg}" alt="">
				</div>`
                }
                //将整个html片段填充到ul-imgs中
                var $ulImgs = $("#ul-imgs");
                //定义每个div的宽度
                var divWidth = 81; //图片大小+边距+边框
                //将整个html片段填充到ul-imgs中，并根据临时传入的图片计算ul-imgs的长度
                $ulImgs.html(html)
                    .css("width", pics.length * divWidth) //图片张数*图片大小
                //填充中图片1张
                //设置mimg的src为pics中第一张图片为中图片版本
                var $mImg = $("#mimg");
                var $lgDiv = $("#div-lg");
                $mImg.attr("src", pics[0].md)
                //同时为lgDiv设置背景图图为第一张的lg版本
                $lgDiv.css(
                    "background-image",
                    `url(${pics[0].lg})`
                )
                //点击箭头。移动小图片
                var $btnLeft = $("#btn-left");
                var $btnRight = $("#btn-right");
                $btnLeft.addClass("disabled")
                //当图片数量<=4张时，右边的按钮禁用
                if (pics.length <= 4) {
                    $btnRight.addClass("disabled")
                }
                var times = 0; //记录单机按钮的次数，初始化为0
                //每单击右边的按钮，次数+1
                $btnRight.click(function () {
                    //按钮上没有disabled才能点击
                    if (!$btnRight.is(".disabled")) {
                        times++;
                        //点击一次，就往左右移动 图片大小+边距+边框 的距离
                        $ulImgs.css("margin-left", -times * divWidth);
                        //只要右按钮按过一次，左边就可以点击了
                        $btnLeft.removeClass("disabled");
                        //如果times==pics.length-4
                        if (times == pics.length - 4) {
                            //说明所有的图片移动完了，右边的按钮禁用
                            $btnRight.addClass("disabled")
                        }
                    }
                })
                //每点击一次左边按钮，times-1，ulImgs的margin-left重新计算
                $btnLeft.click(function () {
                    //如果$btnLeft没有disabled属性，说名可以点击
                    if (!$btnLeft.is(".disabled")) {
                        //每点击一次，times减1
                        times--;
                        //重写ulImgs的样式
                        $ulImgs.css("margin-left", -times * divWidth);
                        //只要左边点击了一次，右侧就可以点击了
                        //移除disabled属性
                        $btnRight.removeClass("disabled");
                        //如果times==0时，说明图片点击结束，左键禁用
                        if (times == 0) {
                            $btnLeft.addClass("disabled")
                        }
                    }
                })
                /*  鼠标进入小图片，中图片切换*/
                //事件委托，为父元素绑定鼠标进入事件，但是只用进入img时，才触发事件
                $ulImgs.on("mouseenter", ".all-simg>img", function () {
                    //获得当前的图片和其data-md属性
                    $mImg.attr("src", $(this).attr("data-md"));
                    //同时获得当前小图片的data-lg属性，给大图做背景图片
                    $lgDiv.css("background-image", `url(${$(this).attr("data-lg")})`)
                })
                //当鼠标进入中图片上面的透明遮罩层时，
                //切换鼠标滑过中图片时的黑色半透明样式的显示和隐藏
                var $mask = $("#mask"); //小遮罩层
                var $smask = $("#super-mask"); //大透明层
                var MASK = 200; //小遮罩层的大小
                var SMASK = 400; //大透明层的大小
                $smask.hover(function () {
                        $mask.toggleClass("d-none");
                        //$lgDiv 大图和 $mask 小遮罩层同显示，同隐藏
                        $lgDiv.toggleClass("d-none");
                    })
                    //让遮罩层跟随鼠标移动
                    .mousemove(function (e) {
                        var top = e.offsetY - MASK / 2;
                        var left = e.offsetX - MASK / 2;
                        if (top < 0) {
                            top = 0;
                        } else if (top > SMASK - MASK) {
                            top = SMASK - MASK
                        }
                        if (left < 0) {
                            left = 0
                        } else if (left > SMASK - MASK) {
                            left = SMASK - MASK
                        }
                        //鼠标每次移动时，动态给 $mask添加距离顶部和左边的样式
                        $mask.css({
                            top: top + "px",
                            left: left + "px"
                        })
                        //同时也要修改大图背景图片的位置

                        $lgDiv.css("background-position", `${-left*2}px ${-top*2}px`)
                    })

            }
        })
    }
    /************************点击按钮时，产品数量加 减************ */
    //获取元素
    var btn1 = $(".jia");
    // console.log(btn1)
    var count = 1; //产品件数初始化

    //#count失去焦点时，获取该元素的内容
    $("#count").focusout(function () {
        count = $("#count").val();
    })
    var num;
    //点击 + 时，件数+1
    $(".jia").click(function () {
        num = num + 1
        $("#count").val(num + 1); //将件数传给#count
        //再count 接触发事件后的"#count的值
        count = $("#count").val();
        //  console.log(count)
        //alert("teng ")
    })
    $(".jian").click(function () {
        if (num > 1) {
            $(".jian").addClass(".disabled");
            num--;
            $("#count").val(num);
            count = $("#count").val();
            console.log(count)
            //alert("teng ")
        }
    })
    /*****************点击加入购物车按钮，购物数字+1 ****************/
    var uid = sessionStorage.getItem("uid"); //获取用户id
    //获取元素
    var $btn = $("#btn_car");
    var cont = $("#count").val();
    //绑定点击事件
    $btn.click(function () {
        // alert("111")
        var lid = location.search.split("=")[1];
        console.log(lid);
        //判断用户是否登录
        if (uid == null) {
            alert("请先登录")
        } else {
            /*******触发事件发送ajax请求 *******/
            $.ajax({ //先获得该lid下的产品的所有信息
                url: "http://localhost:8080/product_list/cart_table",
                data: {
                    uid,
                    lid,
                    cont
                },
                type: "get",
                dataType: "json",
                success: function (result) {
                    if (result == 1) {
                        alert("添加成功")
                    }
                    if (result == 0) {
                        $.ajax({
                            url: "http://localhost:8080/product_list",
                            type: "get",
                            data: {
                                lid
                            },
                            dataType: "json", //JSON.parse()
                            success: function (result) {
                                //将产品信息结构出来
                                var {
                                    product
                                } = result;
                                console.log(product);
                                //再将产品的详细信息结构处理来
                                var {
                                    pid,
                                    img,
                                    short_title,
                                    price
                                } = product;
                                console.log(pid)
                                /********************************添加购物车***********************************/
                                //发送ajax请求，将该信息添加到数据库，表示用户已经将该产品加入到购物车里
                                $.ajax({
                                    url: "http://localhost:8080/shopping_car/shopping_car",
                                    data: {
                                        pid,
                                        img,
                                        short_title,
                                        price,
                                        count,
                                        uid
                                    },
                                    type: "get",
                                    dataType: "json",
                                    success: function (result) {
                                        if (result == 0) {
                                            alert('添加成功')
                                        }

                                    }
                                })
                            }



                        })
                    }
                }
            })
        }
    })
})
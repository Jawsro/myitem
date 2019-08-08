$(function () {
    /**************************发送请求获取购物车里面产品的信息******** */
    /********************动态添加购物车**************/
    var s_uid1 = sessionStorage.getItem("uid");
    console.log(s_uid1) //获取登录用户保存在浏览器中d的 id
    $.ajax({
        url: "http://localhost:8080/shopping_car/car",
        data: {
            s_uid1
        },
        type: "get",
        dataType: "json",
        success: function (result) {
            //var arr=JSON.parse(result);
            console.log(result)
            console.log(result[0].s_img);
            console.log(result[0].s_title);
            console.log(result[0].s_price);
            console.log(result[0].s_count);
            var html = "";
            for (var i = 0; i < result.length; i++) {
                html += `
                    <li>
                        <div class="col">
                            <input type="checkbox" class="btn add" >
                        </div>
                        <div class="col1">
                            <img src="${result[i].s_img}" alt="" data-id="${result[i].sid}">
                            <span>自营</span>
                            <a class="font-co red" href="http://127.0.0.1:5500/product_list.html?lid=${result[i].s_pid}">
                                ${result[i].s_title}
                             </a>
                            
                        </div>
                        <div class="price">
                            ${result[i].s_price.toFixed(2)}
                        </div>
                        <div class="botton">
                            <button>-</button>
                            <span class="font-co">${result[i].s_count}</span>
                            <button>+</button>
                        </div>
                        <div class="total price">
                            ${(result[i].s_price*result[i].s_count).toFixed(2)}
                        </div>
                        <div class="dele font-co move" data-sid=${result[i].sid}>
                            删除
                        </div>
                    </li>`
            }
            var html1 = `
                <li class="price_total">
                    <span class="font-co"><input type="checkbox" class="btn chball">全选 </span>
                    <span class="font-co tex"> 商品应付总计：</span>
                    <span class="p_total"> 0</span>
                </li>
            `
            $(".car").html("")
            $(".car").html(html + html1);
            /*********************************购物车功能 ************************/
            /************************ 删除功能 ***************************/
            $(".move").click(function () {
                var sid = $(this).attr('data-sid');
                $.ajax({
                    url: "http://localhost:8080/shopping_car/delect",
                    data: {
                        sid
                    },
                    type: "get",
                    dataType: "json",
                    success: function (result) {
                        if (result == "1") {
                            var s_uid1 = sessionStorage.getItem("uid");
                            $.ajax({
                                url: "http://localhost:8080/shopping_car/car",
                                data: {
                                    s_uid1
                                },
                                type: "get",
                                dataType: "json",
                                success: function (result) {
                                    var html = "";
                                    for (var i = 0; i < result.length; i++) {
                                        html += `
                                        <li>
                                            <div class="col">
                                                <input type="checkbox" class="btn add" >
                                            </div>
                                            <div class="col1">
                                                <img src="${result[i].s_img}" alt="" data-id="${result[i].sid}">
                                                <span>自营</span>
                                                <a class="font-co red" href="http://127.0.0.1:5500/product_list.html?lid=${result[i].s_pid}">
                                                    ${result[i].s_title}
                                                </a>
                                                
                                            </div>
                                            <div class="price">
                                                ${result[i].s_price.toFixed(2)}
                                            </div>
                                            <div class="botton">
                                                <button>-</button>
                                                <span class="font-co">${result[i].s_count}</span>
                                                <button>+</button>
                                            </div>
                                            <div class="total price">
                                                ${(result[i].s_price*result[i].s_count).toFixed(2)}
                                            </div>
                                            <div class="dele font-co move" data-sid=${result[i].sid}>
                                                删除
                                            </div>
                                        </li>`
                                    }
                                    var html1 = `
                                    <li class="price_total">
                                        <span class="font-co"><input type="checkbox" class="btn chball">全选 </span>
                                        <span class="font-co tex"> 商品应付总计：</span>
                                        <span class="p_total"> 0</span>
                                    </li>
                                `
                                    $(".car").html("")
                                    $(".car").html(html + html1);
                                }
                            })
                        }

                    }
                })
            })
            //查找需要绑定事件的元素
            var car = document.getElementsByClassName("car")[0]; //console.log(botton)
            var btns = car.querySelectorAll("li div.botton button"); //console.log(btns)
            //循环，遍历每一个button，为其绑定鼠标单击事件
            for (var btn of btns) {
                //绑定鼠标单击事件
                btn.onclick = function () {
                    var btn = this;
                    //span为当前button的父元素的第二个孩子
                    var span = btn.parentElement.children[1];
                    var n = parseInt(span.innerHTML);
                    if (btn.innerHTML == "+") {
                        n++
                    } else if (n > 1) {
                        n--
                    }
                    span.innerHTML = n

                    //计算单件商品的总价
                    //先找到该商品的单价
                    //先获得单价的父元素
                    var div = btn.parentElement;
                    var price = div.previousElementSibling;
                    //获取单价，保留小数
                    var unit = parseFloat(price.innerHTML);
                    var sum_price = unit * n;
                    //找到商品总价的元素
                    var total = btn.parentElement.nextElementSibling;
                    total.innerHTML = `${sum_price.toFixed(2)}`;
                }
            }
            /*点击多选框，所选商品的总价累加显示到商品应付总计的位置*/
            //查找要操作的元素
            var input = document.querySelectorAll(".add"); //console.log(input)
            car.onclick = function () {
                var arr = [];
                //应付总价先初始化为0
                var price_total = 0;
                for (var i = 0; i < input.length; i++) {
                    if (input[i].checked) {
                        arr.push(input[i])
                    }
                }
                // console.log(arr);
                for (var i = 0; i < arr.length; i++) {
                    var sumpri = arr[i].parentElement //div
                        .parentElement //li
                        .querySelector(".car>li>.total");
                    price_total += parseFloat(sumpri.innerHTML);
                    //console.log(sumpri)
                    car.lastElementChild.lastElementChild.innerHTML = `${ price_total.toFixed(2)}`
                }
            }
            /*  全选  */
            //DOM 4步:
            //1. 查找触发事件的元素
            //--前边已经找过input了,可直接使用
            //2. 绑定事件处理函数
            //--遍历input中每个input
            var chball = car.lastElementChild.firstElementChild.firstElementChild; //console.log(chball)
            for (var a of input) {
                //--每遍历一个chb就绑定单击事件
                a.onclick = function () {
                    //3. 查找要修改的元素
                    //--已经找过chball了,可直接使用
                    //4. 修改元素
                    //先获得当前input
                    var a = this;
                    //如果当前input取消选中
                    if (a.checked == false) {
                        //则chball一定不全选
                        chball.checked = false;
                    } else {
                        //先查找li>div.col下一个未选中的input
                        var unchecked =
                            document.querySelector(
                                "li>div.col input:not(:checked)"
                            ); //console.log(unchecked)
                        //找不到未选中的chb了
                        if (unchecked == null) {
                            //才全选
                            chball.checked = true;
                        }
                    }
                }
            }
            /*点全选，操作下边的所有checkbox*/
            //DOM 4步:
            //1. 查找触发事件的元素
            //2. 绑定事件处理函数
            chball.onclick = function () {
                var chball = this; //获得当前单击的chball
                //3. 查找要修改的元素
                //--直接使用外部查找过的input
                //4. 修改元素
                //--遍历input中每个a
                for (var a of input) {
                    //每遍历一个chb就让他的checked属性和chball的checked保持一致
                    a.checked = chball.checked;
                }
            }
        }


    })
})
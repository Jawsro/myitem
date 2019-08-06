$(function(){
    $.ajax({
        url:"footer.html",
        type:"get",
        success:function(result){
            //console.log(result);
            $(result).replaceAll("footer");//footer指的是<footer ></footer>中的元素footer
            //动态添加link元素，引入header.css，给header元素添加样式
            $(`<link rel="stylesheet" href="footer.css">`).appendTo("head");//head指的是html中的head
        }
    })
})
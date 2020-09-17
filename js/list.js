//轮播
function listMove(){
    var a = 0;
    var timer = null;
    $("#a .daohang-1 div").click(function(){
        a = $(this).index();
        tab();
    })
    timer = setInterval(function(){
        a++;
        tab()
        if(a == 2){
            $("#a .daohang-1 div").eq(0).css("background","orange").siblings().css("background","gray");
        }
    },4000)
    $("#a .a-1 ul").mouseenter(function(){
        clearInterval(timer);
    }).mouseleave(function(){
        timer = setInterval(function(){
            a++;
            tab()
            if(a == 2){
                $("#a .daohang-1 div").eq(0).css("background","orange").siblings().css("background","gray");
            }
        },4000)
    })
    function tab(){
        $("#a .daohang-1 div").eq(a).css("background","orange").siblings().css("background","gray");
        $("#a .a-1 ul").animate({
            left:-2560*a
        },1000,function(){
            if(a == 2){
                $("#a .a-1 ul").css("left",0);
                a=0;
            }
        })
    }
}
//下拉菜单
function leftMove2() {
    $.ajax({
        url: "nav.json",
        success: function (data) {
            var arr = data.sideNav;
            for (var i = 0; i < arr.length; i++) {
                $(`<li><span>${arr[i].title}</span><i class="iconfont icon-zuokuohao1"></i></li>`).appendTo("#header .fenlei ul");
                var childArr = arr[i].child;
                var e = Math.ceil(childArr.length / 6);
                var newDiv = $(` <div class="right-20"></div>`);
                newDiv.appendTo("#header .right-50");
                for (var j = 0; j < childArr.length; j++) {
                    if (j % 6 == 0) {
                        var newUl = $(`<ul></ul>`);
                        newUl.appendTo(newDiv);
                    }
                    $(`<li>
                        <a href="#">
                            <img src="${childArr[j].img}" alt="">
                            <span>${childArr[j].title}</span>
                        </a>
                </li>`).appendTo(newUl);
                }
            }
        },
        error: function (msg) {
            alert(msg);
        }
    })
}
function xiala(){
    $("#header .center li").eq(0).mouseenter(function(){
        $("#header .shenan").css("display","block");
        $("#header .fenlei").css("display","block");
    }).mouseleave(function(){
        // $("#header .fenlei").css("display","none");
        $("#header .fenlei ul").on("mouseenter","li",function(){
            var a = $(this).index();
            $(this).addClass("clear1").siblings().removeClass("clear1");
            $("#header .right-20").eq(a).css("display","block").siblings().css("display","none");
        })
    })
    $("#a").mouseenter(function(){
        aaa();
    })
    $("#header .shenan").mouseleave(function(){
        aaa();
    })
    $("#header .center ul").on('mouseenter',"li",function(){
        var a = $(this).index();
        if(a >0){
            aaa();
        }
    })
    function aaa(){
        $("#header .shenan").css("display","none");
        $("#header .right-20").css("display","none");
        $("#header .fenlei ul li").removeClass("clear1");
        $("#header .fenlei").css("display","none");
    }
}

//商品列表
function commodityList(){
    $.ajax({
        url:"goodsList2.json",
        success:function(data){
            var arr = data;
            $(`<div class="top">
            <a href="particulars.html?product_id=${arr[0].product_id}">
                <div class="top1 l">
                    <div>
                        <img src="${arr[0].image}" alt="">
                    </div>
                </div>
            </a>
            <a href="particulars.html?product_id=${arr[0].product_id}">
                <div class="top2 l">
                    <p>
                        ${arr[0].name}
                    </p>
                    <p>${arr[0].desc}</p>
                    <p>
                        <span>${arr[0].price}</span>元起
                        <del>${arr[0].del}元</del>
                    </p>
                    <p>
                        立即购买
                    </p>
                </div>
            </a>
        </div>`).appendTo("#main .plate1");
        for(var i =1;i<arr.length;i+=2){
            $(`<div class="container plate">
            <div class="left l">
                <div class="left1 jianju">
                    <a href="particulars.html?product_id=${arr[i].product_id}">
                        <div>
                            <img src="${arr[i].image}" alt="">
                        </div>
                    </a>
                </div>
                <div class="left2">
                    <a href="particulars.html?product_id=${arr[0].product_id}">
                        <p>${arr[i].name}</p>
                        <p>${arr[i].desc}</p>
                        <p>
                            <span>${arr[i].price}</span>元起
                            <del>${arr[i].del}元</del>
                        </p>
                    </a>
                </div>
            </div>
            <div class="left l">
                <div class="left1">
                    <a href="particulars.html?product_id=${arr[i+1].product_id}">
                        <div>
                            <img src="${arr[i+1].image}" alt="">
                        </div>
                    </a>
                </div>
                <div class="left2">
                    <a href="particulars.html?product_id=${arr[0].product_id}">
                        <p>${arr[i+1].name}</p>
                        <p>${arr[i+1].desc}</p>
                        <p>
                            <span>${arr[i+1].price}</span>元起
                            <del>${arr[i+1].del}元</del>
                        </p>
                    </a>
                </div>
            </div>
            
        </div>
        `).appendTo("#main");
        }
        },
        error:function(msg){
            alert(msg);
        }
    })
    
}
function listAnimate(){
    $("#main").on("mouseenter",".plate .left",function(){
        $(this).animate({
            position:"relative",
            top:-10,
            boxShadow:"2px 5px 10px 5px #999",
            transition:"all .5s"
        },500)
    })
}
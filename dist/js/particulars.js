//提取字符串
function str(search, name) {
    //http://localhost:8887/particulars.html?product_id=10000150
    var start = search.indexOf(name + '=');
    if (start == -1) {
        return null;
    } else {
        var end = search.indexOf("&", start);
        if (end == -1) {
            end = search.length;
        }
        var str = search.substring(start, end);
        var arr = str.split("=");
        return arr[1];
    }

}
//插入数据
function particulars() {
    $.ajax({
        url: "goodsList.json",
        success: function (data) {
            var arr = data;
            var product_id = str(location.search, 'product_id');
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].product_id == product_id) {
                    $(`<div class="top container">
                    <ul>
                        <li><a href="#" class="a-1">${arr[i].name}</a></li>
                        <li><span>|</span><a href="#" class="a-2">${arr[i].name}</a></li>
                    </ul>
                    <ul class="r a-3">
                        <li><a href="#">概述</a><span>|</span></li>
                        <li><a href="#">参数</a><span>|</span></li>
                        <li><a href="#">F码通道</a><span>|</span></li>
                        <li><a href="#">用户产品</a></li>
                    </ul>
                </div>`).appendTo("#a");
                    var node = $(`<div class="container main1">
                    <div class="zuo">
                    <i class="iconfont icon-zuokuohao"></i>
                </div>
                <div class="you">
                    <i class="iconfont icon-zuokuohao2"></i>
                </div>
                <div class="left l">
                    <div class="left-1">
                        <ul>
                            

                        </ul>
                    </div>
                    <div class="left-2 l">
                    <div class="left-2-1" style="margin-left:276px">
                    <ul></ul></div>

                    </div>
                </div>
                <div class="right l">
                    <div class="right-1">
                        <p>${arr[i].name}</p>
                        <span>${arr[i].product_desc_ext}</span>
                        <p>小米自营</p>
                        <p>
                            <span>${arr[i].price_max}</span>
                            <del>${arr[i].market_price_max}</del>
                        </p>
                    </div>
                    <div class="right-2">
                        <div class="right-2-1">
                            <p class="l">
                                <i class="iconfont icon-shandian"></i>
                                <span>秒杀</span>
                            </p>
                            <p class="r">
                                距结束
                                <span>00</span>
                                时
                                <span>00</span>
                                分
                                <span>00</span>
                                秒
                            </p>
                        </div>
                        <div class="right-2-2">
                            <p class="z-1">
                                <span><i class="iconfont icon-renminbi"></i>${arr[i].price_max}元</span>
                                <del><i class="iconfont icon-renminbi"></i><span>${arr[i].market_price_max}元</span></del>
                            </p>
                            <p class="z-2">
                            ${arr[i].value}
                            </p>
                            <p class="z-3">
                                <span>秒杀价</span>
                                <span>:</span>
                                <span>${arr[i].price_max}元</span>
                            </p>
                            <p class="z-4">
                                <span>${arr[i].price_max}元</span>
                                <del>${arr[i].market_price_max}元</del>
                            </p>
                        </div>
                        <div class="right-2-3">
                            <div class="x-1 l" id="${arr[i].product_id}">
                                加入购物车
                            </div>
                            
                            <a href="goodCart.html"><div class="x-2 l">
                            查看购物车
                        </div></a>
                        </div>
                    </div>
                </div>
            </div>`);
                    node.appendTo("#main");
                    var imgArr = arr[i].images;
                    for (var j = 0; j < imgArr.length; j++) {
                        $(`<li>
                        <a href="#">
                            <img src="${imgArr[j]}"" class="lunbo">
                        </a>
                    </li>
                    `).appendTo(node.find(".left-1 ul"));
                    $(` <li class="daohang">
                            </li >`).appendTo(node.find(".left-2-1 ul"));
                    };

                }
            }
        },
        error: function (msg) {
            alert(msg);
        }
    })
}

//轮播图
function particularsMove() {
    window.onload = function () {
        var a = 0;
        var timer = null;
        var aBtns = null; //获取所有的小块
        var aImgs = null; //获取所有的图片
        var b = $("#main .left-1 ul li").size();
        $("#main").on("mouseenter", ".left-2-1 ul li", function () {
            a = $(this).index();
            tab();
        })
        timer = setInterval(function () {
            a++;
            tab()
        }, 4000)
        $("#main .lunbo").mouseenter(function(){
            clearInterval(timer);
        }).mouseleave(function(){
            timer = setInterval(function () {
                a++;
                tab()
            }, 4000)
        })
        $("#main .zuo").click(function(){
            a--;
            if(a == -1){
                a = b-1;
            }
            tab();
        });
        $("#main .you").click(function(){
            a++;
            tab();
        })
        function tab() {
            if (a == b) {
                a = 0;
            }
            //图片切换
            $("#main .lunbo").hide().css("opacity", 0.2).eq(a).show().animate({ opacity: 1 }, 500);
            //对应的小圆圈指定当前是哪张图片显示
            $("#main .daohang").css("background", "grey").eq(a).css("background", "red");
        }
    }

}

//加入购物车
function addShoppingTrolley(){
    $("#main").on("click",".right-2 .right-2-3 .x-1",function(){
        var id =this.id;
        var first = $.cookie("good") == null? true:false;
        if(first){
            var arr = [{id:id,num:1}];
            $.cookie("good",JSON.stringify(arr),{
                expires:7
            });
        }else{
            var cookieStr = $.cookie("good");
            var cookieArr = JSON.parse(cookieStr);
            var same = false;//假设商品不存在
            for(var i = 0 ; i < cookieArr.length ; i++){
                if(cookieArr[i].id == id){
                    cookieArr[i].num++;
                    same = true;
                    break;
                }
            }
            if(!same){
                cookieArr.push({id:id , num : 1});
            }
            $.cookie("good",JSON.stringify(cookieArr),{
                expires:7
            });
            
        }
    })
    
}
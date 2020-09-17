function download() {
    $.ajax({
        url: "nav.json",
        success: function (data) {
            var arr = data.banner;
            for (var i = 0; i < arr.length; i++) {
                var node = $(`<a href="${arr[i].url}">
                <img class = 'lunbo-1' src = './images/banner/${arr[i].img}' alt="" style="z-index:${5 - i}"/>
            </a>`).appendTo("#main .lunbo");
                var node = $(` <span href="#" class = 'daohang-1'></span>`);
                if (i == 0) {
                    node.addClass("clear");
                }
                node.appendTo("#main .daohang");
            }
        },
        error: function (msg) {
            alert(mag);
        }
    })
}
//轮播
function banner() {
    var a = 0;
    var timer = null;
    timer = setInterval(function () {
        a++;
        tab();
    }, 2500)
    $("#main .lunbo,#main .right-1,#main .right-2").mouseover(function () {
        clearInterval(timer);
    }).mouseout(function () {
        timer = setInterval(function () {
            a++;
            tab();
        }, 2500)
    })
    function tab() {
        if (a == 5) {
            a = 0;
        }
        //图片切换
        $("#main .lunbo-1").hide().css("opacity", 0.2).eq(a).show().animate({ opacity: 1 }, 500);
        //对应的小圆圈指定当前是哪张图片显示
        $("#main .daohang-1").css("background", "grey").eq(a).css("background", "ivory");
    }
    $("#main .daohang").on("click", "span", function () {
        a = $(this).index();
        tab();
    })
    //切换
    $("#main .right-1,#main .right-2").on("click", function () {
        if (this.className == 'right-1') {
            a--;
            if (a == 0) {
                a = 4;
            }
        } else {
            a++;
        }
        tab();
    })
}
//左边左拉菜单
function leftMove() {
    $.ajax({
        url: "nav.json",
        success: function (data) {
            var arr = data.sideNav;
            for (var i = 0; i < arr.length; i++) {
                $(`<li><span>${arr[i].title}</span><i class="iconfont icon-zuokuohao1"></i></li>`).appendTo("#main .left");
                var childArr = arr[i].child;
                var e = Math.ceil(childArr.length / 6);
                var newDiv = $(` <div class="center"></div>`);
                newDiv.appendTo("#main .right-10");
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
    //caidan
    $("#main .left").on("mouseenter","li",function(){
        var a = $(this).index();
        $(this).css("background","orange");
        $("#main .center").eq(a).css("display","block");
    })
    $("#main .right").on("mouseleave","li",function(){
        var a = $(this).index();
        $(this).css("background","");
        $("#main .center").eq(a).css("display","none");
        $("#main .right-10").on("mouseover",".center",function(){
            $(this).css("display","block")
        }).on("mouseout",".center",function(){
            $(this).css("display","")
        })
    })
}

//下拉菜单
function topMove(){
    $.ajax({
        url:"nav.json",
        success:function(data){
            var arr = data.topNav;
            // arr.push({title: "服务"}, {title: "社区"});
            for(var i =0 ;i<arr.length;i++){
                $(`<li>${arr[i].title}</li>`).appendTo("#header .center ul");
                if(i == 0){
                    var newUl3 = $(`<ul class="clear1"></ul>`)
                    newUl3.appendTo("#header .left .container");
                    var childArr = arr[i].childs;
                    for(var j = 0; j < childArr.length; j++){
                        $(`<li>
                        <img src="${childArr[j].img}" alt="">
                        <p>${childArr[j].a}</p>
                        <p>${childArr[j].i}</p>
                    </li>`).appendTo(newUl3);
                }
                }
                if(i>0&&i<7){
                    var newUl3 = $(`<ul></ul>`)
                    newUl3.appendTo("#header .left .container");
                    var childArr = arr[i].childs;
                    for(var j = 0; j < childArr.length; j++){
                        $(`<li>
                        <img src="${childArr[j].img}" alt="">
                        <p>${childArr[j].a}</p>
                        <p>${childArr[j].i}</p>
                    </li>`).appendTo(newUl3);
                }
                }
            }
        },
        error:function(msg){
            alert(msg)
        }
    })
    //下拉
    $("#header .center ul").on('mouseenter',"li",function(){
        var a = $(this).index()-1;
        $("#header .center li").removeClass("clear");
        $(this).addClass("clear");
        if(a>=0&&a<=6){
            $("#header .left").stop(true).animate({
                height:200,
                paddingTop:30
            },500)
            $("#header .left ul").eq(a).css("display","block").siblings().css("display","none")
        }else{
            $("#header .left").stop(true).animate({
                height:0,
                paddingTop:0
            },500)
            $("#header .left ul").css("display","none")
        }
    }).on("mouseleave","li",function(){
        var a = $(this).index()-1;
        $("#header .left").mouseleave(function(){
            $("#header .left").stop(true).animate({
                height:0,
                paddingTop:0
            },500);
            $("#header .left ul").css("display","none")
            $("#header .center li").removeClass("clear");
        })
    })
    $("#hgroup").mouseenter(function(){
        //list页面
        $("#header .right-20").css("display","none");
        $("#header .fenlei ul li").removeClass("clear1");
        $("#header .fenlei").css("display","none");
        
        $("#header .left").stop(true).animate({
            height:0,
            paddingTop:0
        },500);
        $("#header .left ul").css("display","none")
        $("#header .center li").removeClass("clear");
    })
    //输入框
    $(".xiala").mousedown(function () {
        $(".xiala1").css("display", 'block');
    }).blur(function () {
        $(".xiala1").css("display", 'none');
    })
}

//滚动商品列表
function rollCommodity(){
    $.ajax({
        url:"slide.json",
        success:function(data){
            var slideArr = data.data.list.list;
            for(var i = 0;i<slideArr.length;i++){
                $(`<li class = '' >
                <a href="#" target = "_blank">
                    <div class = 'content'>
                        <div class = 'thumb'>
                            <img width="160" height="160" src="${slideArr[i].img} " alt=""/>
                        </div>
                        <h3 class = 'title'>${slideArr[i].goods_name}</h3>
                        <p class = 'desc'>${slideArr[i].desc}</p>
                        <p class = 'price'>
                            <span>${slideArr[i].seckill_Price}</span>元
                            <del>${slideArr[i].goods_price}元</del>
                        </p>
                    </div>
                </a>
            </li>`).appendTo("#b .right ul");
            }
        },
        error:function(msg){
            alert(msg)
        }
    })
}

function rollMove(){
    var a = 0;
    var sBtns = $("#b .top").find("button");
    var b = Math.ceil(26 / 4) -1;
    timer1();
    sBtns.click(function(){
        if($(this).index() == 0){
            a--;
            a = Math.max(0, a);
        }else{
            a++;
            a = Math.min(b, a)
        }
        tab();
    })
    
    function tab(){
        
        var c = a == b ? a * -976 + 488 : a * -976;
        $("#b .right ul").animate({
            left: c
        },500)
    }
    function tab1(){
        
        var c =a == 0 ?  6344-(6-a)*976 : 6344-(6-a)*976-488
        $("#b .right ul").animate({
            left: -c
        },500)
    }
    function timer1(){
        var timer = null;
        timer = setInterval(function(){
            a++;
            tab();
            if(a == b){
                clearInterval(timer);
                    timer = setInterval(function(){
                        a--;
                        tab1();
                        if(a == 0){
                            clearInterval(timer);
                            timer1();
                        }
                    },4000)
            }
        },4000)
    }
}

  //定时器倒计时，每天14:00开枪，每天22:00开枪
function countDown(){
    var nowDate = new Date();
    var hour = nowDate.getHours();
    var date = nowDate.getDate();
    var afterDate = new Date();
    
    //计算倒计时时间间隔
    if(hour < 14){
        afterDate.setHours(14);
        $("#b .left-1").html("14:00 场");
        
    }else if(hour >= 14 && hour < 22){
        afterDate.setHours(22);
        $("#b .left-1").html("22:00 场");
    }else{
        $("#b .left-1").html("明日14:00 场");
        afterDate.setHours(14);
        afterDate.setDate(date + 1);
    }
    afterDate.setMilliseconds(0);
    afterDate.setSeconds(0);
    afterDate.setUTCMilliseconds(0);

    //计算倒计时总秒数
    var count = parseInt((afterDate.getTime() - nowDate.getTime()) / 1000);
    var aSpans = $("#b .left-4").find("span");
    
    var timer = setInterval(function(){
        count--;
        aSpans.eq(0).html(doubleNum(parseInt(count / 3600) % 24));
        aSpans.eq(1).html(doubleNum(parseInt(count / 60) % 60));
        aSpans.eq(2).html(doubleNum(count % 60));

        if(count == 0){
            clearInterval(timer);
            $("#b .left-3").html("本次活动结束,敬请期待~");
        }
    }, 1000);
    function doubleNum(num){
        if(num < 10){
            return "0" + num;
        }else{
            return num;
        }
    }
}







//下载数据
function good1() {
    $.ajax({
        url: "goodsCarList.json",
        success: function (data) {
            var arr = data.data;
            for (var i = 0; i < arr.length; i++) {
                $(`<li class = 'brick-item brick-item-m brick-item-m-2'>
                <a href="#">
                    <div class = ' figure-img'>
                        <img width="160" height="160" src="${arr[i].image}" alt=""/>
                    </div>
                    <h3 class = 'title'>${arr[i].name}</h3>
                    <p class = 'price'>
                        <span class = 'num'>${arr[i].price}</span>元
                    </p>
                    <p class = 'desc'>${arr[i].comments}人好评</p>
                    <div class="sa-1" id="${arr[i].productid}">
                        加入购物车
                    </div>
                </a>
            </li>`).appendTo("#main .brick-list .aaaa");
            }
        },
        error: function (msg) {
            alert(msg);
        }
    })
}

function cartMove() {
    //鼠标移入显示购物车按钮 
    $("#main .brick-list .aaaa").on("mouseenter", ".brick-item", function () {
        $(this).find(".desc").css("display", "none");
        $(this).find(".sa-1").css("display", "block");
    }).on("mouseleave", ".brick-item", function () {
        $(this).find(".desc").css("display", "block");
        $(this).find(".sa-1").css("display", "none");
    })
    //加入购物车
    $("#main .brick-list .aaaa").on("click", ".brick-item .sa-1", function () {
        $("#main .liebiao").html("");
        goodCart();
        var id = this.id;
        var first = $.cookie("good") == null ? true : false;
        if (first) {
            var arr = [{ id: id, num: 1 }];
            $.cookie("good", JSON.stringify(arr), {
                expires: 7
            });
        } else {
            var cookieStr = $.cookie("good");
            var cookieArr = JSON.parse(cookieStr);
            var same = false;//假设商品不存在
            for (var i = 0; i < cookieArr.length; i++) {
                if (cookieArr[i].id == id) {
                    cookieArr[i].num++;
                    same = true;
                    break;
                }
            }
            if (!same) {
                cookieArr.push({ id: id, num: 1 });
            }
            $.cookie("good", JSON.stringify(cookieArr), {
                expires: 7
            });

        }
        // alert($.cookie("good"));
        return false;//阻止事件冒泡
    })
}

//购物车数据
function goodCart() {
    $("#main .liebiao").html("");
    $.ajax({
        url: "goodsList2.json",
        success: function (data) {
            var arr1 = data
            $.ajax({
                url: "goodsCarList.json",
                success: function (data) {
                    var arr2 = data.data;
                    var arr = arr2.concat(arr1);
                    var cookieStr = $.cookie("good");
                    var cookieArr = JSON.parse(cookieStr);
                    if (cookieArr) {
                        var newArr = [];
                        for (var i = 0; i < cookieArr.length; i++) {
                            for (var j = 0; j < arr.length; j++) {
                                if (cookieArr[i].id == arr[j].product_id || cookieArr[i].id == arr[j].productid) {
                                    arr[j].num = cookieArr[i].num;
                                    arr[j].id = arr[j].product_id ? arr[j].product_id : arr[j].productid;
                                    newArr.push(arr[j]);
                                }
                            }
                        }
                        // console.log(newArr)
                        var num1 = 0;//商品件数
                        var total = 0;//总价
                        for (var i = 0; i < newArr.length; i++) {
                            $(`<div class="top1" id="${newArr[i].id}">
                            <div class="a-1 l">
                                <i class="iconfont icon-icon_checkbox l">
                                <i class="clear">
                            <svg class="icon " aria-hidden="true">
                                <use xlink:href="#icon-xuanzekuangxuanzhongzhuangtai"></use>
                            </svg>
                        </i>
                                </i>
                            </div>
                            <div class="a-2 l">
                                <img src="${newArr[i].image}" alt="">
                            </div>
                            <div class="a-3 l">${newArr[i].name}</div>
                            <div class="a-4 l">${newArr[i].price}元</div>
                            <div class="a-5 l">
                                <div class="a-5-1">
                                    <span class="v-1 l">-</span>
                                    <span class="v-2 l">${newArr[i].num}</span>
                                    <span class="v-3 l">+</span>
                                </div>
                            </div>
                            <div class="a-6 l">${(newArr[i].num * newArr[i].price).toFixed(2)}元</div>
                            <div class="a-7 l"><i class="iconfont icon-delete"></i></div>
                        </div>`).appendTo("#main .liebiao");
                            num1 += newArr[i].num;
                            $("#main .bottom2 .i1").html(num1);
                        }
                    }
                    isCheck();
                },
                error: function (msg) {
                    alert(msg);
                }
            })
        },
        error: function (msg) {
            alert(msg);
        }
    })
}

//选择商品
function checkAll() {
    $("#main .top .a-1 .icon-icon_checkbox").click(function () {
        var oIs = $("#main .liebiao").find(".icon-icon_checkbox")
        if ($(this).find("i").hasClass("clear")) {
            $(this).add(oIs).find("i").removeClass("clear");
        } else {
            $(this).add(oIs).find("i").addClass("clear");
        }
        isCheck();

        return false;
    });
    $("#main .liebiao").on("click", ".icon-icon_checkbox ", function () {
        var ois = $("#main .top .icon-icon_checkbox")
        if ($(this).find("i").hasClass("clear")) {
            $(this).find("i").removeClass("clear");
        } else {
            $(this).add(ois).find("i").addClass("clear");
        }
        isCheck();

        return false;
    })
}
//判断是否被选中
function isCheck() {
    var oIs1 = $("#main .liebiao").find(".top1");
    var a = true;//假设商品全被选择
    var b = 0;//选中商品的数量
    var c = 0;//选中商品的总价
    oIs1.each(function (index, item) {
        if ($(item).find(".a-1").find(".icon-icon_checkbox i").hasClass("clear")) {
            a = false;//有商品没有被选中
            // alert(a)
        } else {
            b += parseInt($(item).find(".a-5").find(".a-5-1").find(".v-2").html());
            c += parseFloat($(item).find(".a-5").find(".a-5-1").find(".v-2").html()) * parseFloat($(item).find(".a-4").html());
        }
    });
    $("#main .bottom2 .i2").html(b);
    $("#main .bottom-2-1 .em1").html(c);
    if (a) {
        $("#main .top .a-1 .icon-icon_checkbox").find("i").removeClass("clear");
    } else {
        $("#main .top .a-1 .icon-icon_checkbox").find("i").addClass("clear");
    }
}
//购物车数量加减和删除
function changeCart() {
    //购物车数量加减
    $("#main .liebiao").on("click", ".top1 .a-5 span", function () {
        var a = $(this).index();
        var id = $(this).closest(".top1").attr("id");
        var cookieStr = $.cookie("good");
        var cookieArr = JSON.parse(cookieStr);
        if (a == 0) {
            for (var i = 0; i < cookieArr.length; i++) {
                if (cookieArr[i].id == id) {
                    if (cookieArr[i].num == 1) {
                        alert("在该商品数量已经不能再少了")
                    } else {
                        cookieArr[i].num--;
                    }
                    goodCart();
                }

            }
        } else if (a == 2) {
            for (var i = 0; i < cookieArr.length; i++) {
                if (cookieArr[i].id == id) {
                    cookieArr[i].num++;;
                }
            }
            goodCart();
        }
        $.cookie("good", JSON.stringify(cookieArr), {
            expires: 7
        });
        //删除商品信息
    })
    $("#main .liebiao").on("click", ".a-7 i", function () {
        // var a = $(this).index();
        var id = $(this).closest(".top1").attr("id");
        $(this).closest(".top1").remove()
        var cookieStr = $.cookie("good");
        var cookieArr = JSON.parse(cookieStr);
        for (var i = 0; i < cookieArr.length; i++) {
            if (cookieArr[i].id == id) {
                cookieArr.splice(i, 1);
                break;
            }
        }
        if (!cookieArr) {
            $.cookie("good", null);
        } else {
            $.cookie("good", JSON.stringify(cookieArr), {
                expires: 7
            });
        }
        isCheck()
        goodCart();
    })
    //更新商品信息
    // function shuliang(){
    //     $(this).siblings(".v-2").html(cookieArr[i].num);
    //     var price =  parseFloat($(this).closest(".a-4").html());
    //     $(this).closest(".a-6").html((price * cookieArr[i].num).toFixed(1) + "元");
    // }
}



// 购物车数据
// function goodCart1() {
//     new Promise(function (resolve, reject) {
//         $.ajax({
//             url: "goodsList2.json",
//             success: function (data) {
//                 resolve(data);
//             },
//             error: function (msg) {
//                 reject(msg);
//             }
//         }).then(function (arr1) {
//             return new Promise(function (resolve, reject) {
//                 $.ajax({
//                     url: "goodsCarList.json",
//                     success: function (data) {
//                         var arr2 = data.data;
//                         var arr3 = arr2.concat(arr1);
//                         resolve(arr3);
//                         console.log(arr3)
//                     },
//                     error: function (msg) {
//                         reject(msg);
//                     }
//                 });
//             });
//         }).then(function (arr) {

//             var cookieStr = $.cookie("good");
//             var cookieArr = JSON.parse(cookieStr);
//             if (cookieArr) {
//                 var newArr = [];
//                 for (var i = 0; i < cookieArr.length; i++) {
//                     for (var j = 0; j < arr.length; j++) {
//                         if (cookieArr[i].id == arr[j].product_id || cookieArr[i].id == arr[j].productid) {
//                             arr[j].num = cookieArr[i].num;
//                             arr[j].id = arr[j].product_id ? arr[j].product_id : arr[j].productid;
//                             newArr.push(arr[j]);
//                         }
//                     }
//                 }
//                 console.log(newArr);
//             }

//                 for (var i = 0; i < newArr.length; i++) {
//                     $(`<div class="top1">
//                 <div class="a-1 l">
//                     <i class="iconfont icon-icon_checkbox l">
//                         <i class="iconfont icon-icon_checkbox_gouxuan l"></i>
//                     </i>
//                 </div>
//                 <div class="a-2 l">
//                     <img src="images/80-80-new.png" alt="">
//                 </div>
//                 <div class="a-3 l">商品名称</div>
//                 <div class="a-4 l">单价</div>
//                 <div class="a-5 l">
//                     <div class="a-5-1">
//                         <span>-</span>
//                         <span>3</span>
//                         <span>+</span>
//                     </div>
//                 </div>
//                 <div class="a-6 l">小计</div>
//                 <div class="a-7 l"><i class="iconfont icon-delete"></i></div>
//             </div>`).appendTo("#main .liebiao")
//                 }
//         });
//     });
// }

//

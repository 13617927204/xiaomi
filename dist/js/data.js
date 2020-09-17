function productList() {
    $.ajax({
        url: "data.json",
        success: function (arr) {
            var firstData = arr[0];

            var node = $(`
            <div class = 'bottom'>

            <a href="#">
                <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/1a2f39c9fe0804ace1d3707574c7c86f.jpg?thumb=1&w=1226&h=120&f=webp&q=90" alt=""/>
            </a>
        </div>
        <div class = "home-brick-box home-brick-row-2-box xm-plain-box">
            <div class = 'box-hd'>
                <h2 class = 'h2'>${firstData.title}</h2>
                <div class = "more1">
                    <a href="list.html" class = 'more-link'>
                        查看全部
                        <i class = 'iconfont icon-youjiantou'></i>
                    </a>
                </div>
            </div>
            <div class = 'botttom1'>
                <div class = 'row'>
                    <div class = 'span4'>
                        <ul class = 'brick-promo-list clearfix'>
                            <li class = 'b-1'>
                                <a href="#">
                                <img width="234" height="690" src="${firstData.img}" alt=""/>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class = 'span16'>
                        <ul class = 'brick-list '>
                        </ul> 
                    </div>
                </div>
            </div>
        </div>`);
            node.appendTo("#b .charu");
            //通过循环将子元素进行创建
            for (var i = 0; i < firstData.childs.length; i++) {
                $(`<li class = 'brick-item'>
                <a href="#">
                    <div class = 'figure1 '>
                        <img  src="${firstData.childs[i].img}" alt=""/>
                    </div>
                    <h3 class = 'title'>
                        ${firstData.childs[i].title}
                    </h3>
                    <p class = 'desc'>${firstData.childs[i].desc}</p>
                    <p class = 'price'>
                        <span class = 'num'>${firstData.childs[i].price}</span>
                        元
                        <span>起</span>
                        ${firstData.childs[i].del == 0 ? "" : "<del>" + firstData.childs[i].del + "元<del>"}
                    </p>
                </a>
            </li>`).appendTo(node.find(".botttom1 .span16 ul"));
            }

            //后续节点
            for (var i = 1; i < arr.length; i++) {//(.home-brick-box .more li )
                var node1 = $(`<div class = 'bottom'> 
                        <a href="#">
                            <img src="${arr[i].topImg}" alt=""/>
                        </a>
                    </div>
                    <div class = 'home-brick-box home-brick-row-2-box xm-plain-box'>
                        <div class = 'box-hd clearfix'>
                            <h2 class = 'h2 l'>${arr[i].title}</h2>
                            <div class = 'more'>
                                <ul class = 'tab-list'>
                                    <li class="r">
                                    ${arr[i].subTitle}
                                    </li>
                                    <li class = 'tab-active r clear'>
                                        热门
                                    </li>
                                    
                                </ul>
                            </div>
                        </div>
                        <div class = 'box-bd'>
                            <div class = 'row'>
                                <div class = 'span41 l'>
                                    <ul class = 'brick-promo-list clearfix'>
                                        <li class = 'brick-item1  brick-item-m'>
                                            <a href="#">
                                                <img src="${arr[i].leftChilds[0]}" alt=""/>
                                            </a>
                                        </li>
                                        <li class = 'brick-item1  brick-item-m'>
                                            <a href="#">
                                                <img src="${arr[i].leftChilds[1]}" alt=""/>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div class = 'span16'>
                                    <ul class = "brick-list clearfix  ">
                                            
                                    </ul>
                                    <ul class = "brick-list clearfix hide">
                                            
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`);
                node1.appendTo("#b .charu");


                var hotChilds = arr[i].hotChilds;
                for (var k = 0; k < hotChilds.length - 1; k++) {
                    $(`<li class = 'brick-item brick-item-m brick-item-m-2'>
                        <a href="#">
                            <div class = ' figure-img'>
                                <img width="160" height="160" src="${hotChilds[k].img}" alt=""/>
                            </div>
                            <h3 class = 'title'>${hotChilds[k].title}</h3>
                            <p class = 'desc'>${hotChilds[k].desc}</p>
                            <p class = 'price'>
                                <span class = 'num'>${hotChilds[k].price}</span>元
                                ${hotChilds[k].del == 0 ? "" : "<del><span class = 'num'>" + hotChilds[k].del + "</span>元</del>"}
                            </p>
                        </a>
                    </li>`).appendTo(node1.find(".span16 .brick-list ").eq(0));
                }
                $(`<li class="brick-item brick-item-s ">
                <ul>
                    <li class = ' brick-item-s aa1'>
                        <a href="#">
                            <div class = 'figure-img1'>
                                <img width="80" height="80" src="${hotChilds[7].img}" alt=""/>
                            </div>
                            <h3 class = 'title1'>${hotChilds[7].title} </h3>
                            <p class = 'price1'>
                                <span class = 'num'>${hotChilds[7].price}</span>元
                                <span>起</span>
                            </p>
                        </a>
                    </li>
                
                    <li class = ' brick-item-s '>
                        <a href="#">
                            <div class = ' figure-more l'>
                                <i class = 'iconfont icon-icon-right'></i>
                            </div>
                            <div class = 'more l'>
                                浏览更多
                                <p>热门</p>
                            </div>
                        </a>
                    </li>
                </ul>
            </li>`).appendTo(node1.find(".span16 .brick-list").eq(0));
            

                var childs = arr[i].childs;
                for (var l = 0; l < childs.length; l++) {
                    if(l == 7){
                        $(`<li class="brick-item brick-item-s ">
                <ul>
                    <li class = ' brick-item-s aa1'>
                        <a href="#">
                            <div class = 'figure-img1'>
                                <img width="80" height="80" src="${childs[l].img}" alt=""/>
                            </div>
                            <h3 class = 'title1'>${childs[l].title} </h3>
                            <p class = 'price1'>
                                <span class = 'num'>${childs[l].price}</span>元
                                <span>起</span>
                            </p>
                        </a>
                    </li>
                    <li class = ' brick-item-s '>
                        <a href="#">
                            <div class = ' figure-more l'>
                                <i class = 'iconfont icon-icon-right'></i>
                            </div>
                            <div class = 'more l'>
                                浏览更多
                                <p>热门</p>
                            </div>
                        </a>
                    </li>
                </ul>
            </li>`).appendTo(node1.find(".span16 .brick-list").eq(1));
                    }else{
                        $(`<li class = 'brick-item brick-item-m brick-item-m-2'>
                        <a href="#">
                            <div class = ' figure-img'>
                                <img width="160" height="160" src="${childs[l].img}" alt=""/>
                            </div>
                            <h3 class = 'title'>${childs[l].title}</h3>
                            <p class = 'desc'>${childs[l].desc}</p>
                            <p class = 'price'>
                                <span class = 'num'>${childs[l].price}</span>元
                                ${childs[l].del == 0 ? "" : "<del><span class = 'num'>" + childs[l].del + "</span>元</del>"}
                            </p>
                        </a>
                    </li>`).appendTo(node1.find(".span16 .brick-list ").eq(1));
                    }

                }
                
            
            }
        },
        error: function (msg) {
            alert(msg);
        }
    })
}

 //通过事件委托添加切换函数
function tabMenu(){
    $("#b .charu").on("mouseenter", ".home-brick-box .tab-list li", function(){
        var a = $(this).index();
        if(a ==0){
            a =1;
        }else if(a==1){
            a=0;
        }
        $(this).addClass("clear").siblings("li").removeClass("clear");

        //同时切换显示的商品内容
        $(this).closest("#b .home-brick-box").find(".span16 .brick-list ").addClass("hide").eq(a).removeClass("hide");
        // $("#b .span16 .brick-list ").eq(a).removeClass("hide").siblings().addClass(hide);
    })
}



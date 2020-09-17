function login(){
    $("#login-button").click(function(){
        $.ajax({
            type:"post",
            url:"php/login.php",
            data:{
                username: $(".item_account").eq(0).val(),
                password: $(".item_account").eq(1).val(),
            },
            success:function(result){
                var obj = JSON.parse(result);
                if(obj.code != 8){
                    $(".err_tip").find("em").attr("class", "icon_error")
                }else{
                    $(".err_tip").find("em").attr("class", "icon_select icon_true");
                    setTimeout(function(){
                        location.assign("index.html");
                    }, 1000);
                }
                $(".err_tip").show().find("span").html(obj.message);

            },
            error:function(msg){
                console.log(msg)
            }
        })
    })
}
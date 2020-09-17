//购物车数据
function goodCart(){
    new Promise(function(resolve,reject){
        $.ajax({
            url:"goodsCarList.json",
            success:function(data){
                resolve(data.data);
            },
            error:function(msg){
                reject(msg);
            }
        }).then(function(arr){
            return new Promise(function(resolve,reject){
                $.ajax({
                    url:"goodsList2.json",
                    success:function(data){
                        var newArr = arr.concat(data);
                        resolve(newArr);
                        console.log(newArr)
                    },
                    error:function(msg){
                        reject(msg);
                    }
                })
            })
        })
    })
}
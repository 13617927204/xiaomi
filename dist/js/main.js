console.log("加载完毕");

require.config({
    paths: {
        "jquery": "jquery-1.11.3",
        "jquery-cookie": "jquery.cookie",
        //引入banner图效果
        "nav": "nav",
    },
    shim:{
        "jquery-cookie":["jquery"],
    }
})
require(["nav"],function(nav){
    nav.download();
})
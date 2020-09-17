const gulp = require("gulp");
const scss = require("gulp-scss");
const minifyCss = require("gulp-minify-css");
const rename = require("gulp-rename");

//处理js文件
gulp.task("scripts",function(){
    return gulp.src(["js/*.js","!gulpfile.js"])
    .pipe(gulp.dest("dist/js"))
    .pipe(connect.reload());
})
//处理html文件
gulp.task("copy-html",function(){
    return gulp.src("*.html")
    .pipe(gulp.dest("dist"))
    .pipe(connect.reload());
})
//处理数据
gulp.task("copy-json",function(){
return gulp.src(["*.json","!package.json"])
    .pipe(gulp.dest("dist"))
    .pipe(connect.reload());
})
//处理图片
gulp.task("images",function(){
    return gulp.src("images/**/*")
    .pipe(gulp.dest("dist/images"))
    .pipe(connect.reload());
})
//处理css文件
gulp.task("css",function(){
    return gulp.src("css/*.css")
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
})
//一次性执行多个任务
gulp.task("build", gulp.series("scripts","copy-html","images","copy-json","css",  function(){
    console.log("项目建立成功");
}));
//建立监听
gulp.task("watch",function(node){
    /*
    第一个参数，是文件监听的路径
    第二个参数，我们要去执行的任务
    */
    gulp.watch("*.html",gulp.series("copy-html")); 
    gulp.watch("images/**/*",gulp.series("images"));
    gulp.watch(["js/*.js","!gulpfile.js"],gulp.series("scripts"));
    gulp.watch(["*.json","!package.json"],gulp.series("copy-json"));
    gulp.watch("css/*.css",gulp.series("css"));
    node();
});

//启动一个服务器
const connect = require("gulp-connect");
gulp.task("server",function(){
    connect.server({
        root:"dist",
        port: 8887,
        livereload:true
    })
})
//启动一个默认的任务
gulp.task("default",gulp.series("watch","server"));

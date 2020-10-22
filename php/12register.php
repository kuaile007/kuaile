<?php

// 0 解决中文乱码
include './base.php';

// 1 获取前段POST传递的数据
// 在php里面有一个预定义的变量$_POST,是一个关联型数组,里面包含前端POST请求发送的数据,用法类似$_GET
$uname = $_POST['username'];//获取前端传递的用户名
$upass = $_POST['password'];//获取前端传递的密码
// 测试是否获取到传递的数据
// echo $uname;
// echo $upass;

// 2 把用户信息存储在数据库里面
// 2-1 连接数据库
$conn = mysqli_connect('localhost','root','root','user');
// 2-2 执行sql语句
$sql = "INSERT INTO `info` VALUES (null,'$uname','$upass')";
$res = mysqli_query($conn,$sql);
// 2-3 不需要解析数据
// 2-4 断开连接
mysqli_close($conn);

if($res){
    //如果$res为true,说明插入成功
    //跳转登录页面
    header('location:../html/denglu.html');
}else{
    //如果$res为false,说明$sql有语法错误
    echo "服务器错误";
}

?>
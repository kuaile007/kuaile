<?php

include './base.php';

// 1 获取前端传递来的数据
$uname = $_GET['username'];
$upass = $_GET['password'];


// 2 使用前端给的数据去数据库里面对比
// 2-1 连接数据库
$conn = mysqli_connect('localhost','root','root','user');
// 2-2 执行sql语句
// 查询info表里面是否有一条数据,username=$uname并且password=$upass
$sql = "SELECT * FROM `info` WHERE `username`='$uname' AND `password`='$upass'";
$res = mysqli_query($conn,$sql);
// 2-3 解析结果
$row = mysqli_fetch_assoc($res);
// 2-4 断开连接
mysqli_close($conn);


// 根据用户名和密码是否存在来输出结果
if($row){
    // 如果$row强制布尔是true,说明有结果
    // 表示登陆成功
    header('location:../html/vivo.html');
}else{
    // 如果$row是null
    // 表示登陆失败
    echo "用户名或密码错误!";
}
?>
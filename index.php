<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
if(is_file('./360safe/360webscan.php')){
    require_once('./360safe/360webscan.php');
} // 注意文件路径
header('content-type:text/html; charset=utf-8');
define('APP_DEBUG',false);
define('APP_PATH','./Application/');
define('APP_NAME','fentutu');
define('HTML_PATH',APP_PATH."Runtime/html");
define('WEBROOT', dirname(__FILE__));
//define('BUILD_LITE_FILE',true);
//var_dump($_SERVER);exit;

require './ThinkPHP/ThinkPHP.php';
//require APP_PATH.'/lite.php';
<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
header('content-type:text/html; charset=utf-8');
//define('APP_DEBUG',true);
define('APP_PATH','./Application/');
define('APP_NAME','fentutu');
define('WEBROOT', dirname(__FILE__));
//define('BUILD_LITE_FILE',true);
//var_dump($_SERVER);exit;

require './ThinkPHP/ThinkPHP.php';
//require APP_PATH.'/lite.php';
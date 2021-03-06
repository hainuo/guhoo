<?php
$config=M('Config')->getField('name,value');
C($config);
return array(
	'HTML_CACHE_ON'     =>    false, // 关闭静态缓存
	'HTML_CACHE_TIME'   =>   3, //C('DATA_CACHE_TIME'),   // 全局静态缓存有效期（秒）
	'HTML_FILE_SUFFIX'  =>    '.shtml', // 设置静态缓存文件后缀
	'HTML_CACHE_RULES'  =>     array(
		'index:'=>array('{$_SERVER.REQUEST_URI}'),
		),
	
	// 'TMPL_CACHE_TIME'       =>  0,//模板缓存有效期
	'DONGTAI_NEED'  =>  4.9,//这里的为动态评分查找时的默认值
    'URL_ROUTER_ON' => true, //开启路由模式
    'URL_ROUTE_RULES' => array(
        'news/:id\d'=>'News/view',
        '/^get(\w+[^\/|^\.])/'=>function(){
                $_SERVER['PATH_INFO']='/Index/'.$_SERVER['PATH_INFO'];
        	return false;
        }
    ),
);
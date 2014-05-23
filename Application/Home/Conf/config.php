<?php
$config=M('Config')->getField('name,value');
C($config);
return array(
	'HTML_CACHE_ON'     =>    true, // 开启静态缓存
	'HTML_CACHE_TIME'   =>    C('DATA_CACHE_TIME'),   // 全局静态缓存有效期（秒）
	'HTML_FILE_SUFFIX'  =>    '.shtml', // 设置静态缓存文件后缀
	'HTML_CACHE_RULES'  =>     array(
		'index:'=>array('{$_SERVER.REQUEST_URI}'),
		),
	
	'TMPL_CACHE_TIME'       =>  1,//模板缓存有效期
	'DONGTAI_NEED'  =>  4.9,//这里的为动态评分查找时的默认值
	);
?>
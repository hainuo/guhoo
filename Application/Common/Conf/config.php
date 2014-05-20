<?php
return array(
	//'配置项'=>'配置值'
    //'RUNTIME_LITE_FILE'=> APP_PATH.'lite.php',  
	'DB_TYPE'   => 'mysql', // 数据库类型
	'DB_HOST'   => 'localhost', // 服务器地址
	'DB_NAME'   => 'taobao', // 数据库名
	'DB_USER'   => 'root', // 用户名
	'DB_PWD'    => 'root', // 密码
	'DB_PORT'   => 3306, // 端口
	'DB_PREFIX' => 'taobao_', // 数据库表前缀 
    'DEFAULT_MODULE'     => 'Home', //默认模块
    'DEFAULT_CONTROLLER'    =>  'Index',//默认控制器
    'DEFAULT_ACTION'        =>  'index', // 默认操作名称
    'MODULE_ALLOW_LIST'    =>    array('Home','Admin'),
    'URL_MODEL'          => '2', //URL模式
    'URL_CASE_INSENSITIVE' =>false, // 默认false 表示URL区分大小写 true则表示不区分大小写
    'URL_HTML_SUFFIX'       =>  'html',  // URL伪静态后缀设置
    //数据库缓存和数据缓存 需要进一步对数据进行设置
    'DB_SQL_BUILD_CACHE'    =>  true, 
    // 数据库查询的SQL创建缓存
    'DB_SQL_BUILD_QUEUE'    =>  'file',   
    // SQL缓存队列的缓存方式 支持 file xcache和apc
    'DB_FIELDS_CACHE'       =>  true,        // 启用字段缓存  
    'DB_SQL_LOG'            =>  true,       //SQL执行日志记录
    'LOG_RECORD'            =>  true,   // 记录日志
    'LOG_TYPE'              =>  'File', // 日志记录类型 默认为文件方式
    'LOG_LEVEL'             =>  'EMERG,ALERT,CRIT,ERR',// 允许记录的日志级别
    'LOG_EXCEPTION_RECORD'  =>  true,    // 是否记录异常信息日志


    //'DATA_CACHE_TIME'       =>  3,      // 数据缓存有效期 0表示永久缓存  已经写入数据库中
    'DATA_CACHE_COMPRESS'   =>  false,   // 数据缓存是否压缩缓存
    'DATA_CACHE_CHECK'      =>  true,   // 数据缓存是否校验缓存
    'DATA_CACHE_PREFIX'     =>  'think_',     // 缓存前缀
    'DATA_CACHE_TYPE'       =>  'File',  
    // 数据缓存类型,支持:File|Db|Apc|Memcache|Shmop|Sqlite|Xcache|Apachenote|Eaccelerator
    'DATA_CACHE_PATH'       =>  TEMP_PATH,// 缓存路径设置 (仅对File方式缓存有效)
    'DATA_CACHE_SUBDIR'     =>  true,    // 使用子目录缓存 (自动根据缓存标识的哈希创建子目录)
    'DATA_PATH_LEVEL'       =>  1,        // 子目录缓存级别
    'SESSION_AUTO_START'    =>  true,   //自动打开session
    'SESSION_TYPE'          =>  'Db',  //开启session的数据库驱动模式
    'SESSION_PREFIX'        =>  'TB',  //定义session本地化前缀
    'URL_ROUTER_ON'   => false, //开启路由模式
    'URL_ROUTE_RULES'=>array( 
                //'/Admin\/(.*)\.html/' => 'Admin/:1',
                ),
    'TOKEN_ON'      =>    true,  // 是否开启令牌验证 默认关闭
    'TOKEN_NAME'    =>    '__hash__',    // 令牌验证的表单隐藏字段名称，默认为__hash__
    'TOKEN_TYPE'    =>    'md5',  //令牌哈希验证规则 默认为MD5
    'TOKEN_RESET'   =>    true,  //令牌验证出错后是否重置令牌 默认为true    
);
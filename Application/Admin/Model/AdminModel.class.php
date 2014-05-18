<?php

namespace Admin\Model;
use Think\Model;
class AdminModel extends Model {
	    protected $_validate =array(
        array('name', 'require', '淘宝号不能为空',1),
        array('password', 'require', '淘宝号不能为空',1),
    );
}
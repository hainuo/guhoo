<?php

namespace Home\Model;
use Think\Model;
class MemberModel extends Model {
	    protected $_validate =array(
        array('username', 'require', '淘宝号不能为空',1),
    );
}
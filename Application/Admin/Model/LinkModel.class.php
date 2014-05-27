<?php

namespace Admin\Model;

use Think\Model;

class LinkModel extends Model
{
    protected $_validate = array(
        array('name', 'require', '淘宝号不能为空', 1),
        array('url', 'require', 'url不能为空', 1),
    );
}
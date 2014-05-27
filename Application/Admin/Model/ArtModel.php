<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 14-5-27
 * Time: 下午2:40
 */

namespace Admin\Model;

use Think\Model;

class ArtModel extends Model
{
    protected $tableName = 'article';
    protected $_validate = array(
        array('title', 'require', 'title不能为空', 1),
        array('contetn', 'require', 'content不能为空', 1),
    );
} 
<?php
/**
 * Created by PhpStorm.
 * User: hainuo
 * Date: 14-5-27
 * Time: 下午9:29
 */

namespace Home\Controller;
use Think\Controller;

class NewsController extends Controller{
    public function index(){
        $this->error('操作出错');
    }
    public function view(){
        $id=I('get.id');
        $artModel=D('Article');
        if($id){
            $dataList=$artModel->order('create_time DESC')->select();
            if($dataList){
                $this->assign('dataLists',$dataList);
                $this->assign('id',$id);
                $this->seo();
                $this->display();
            }else
                $this->error('您的操作有误！');
        }else
            $this->error('您的操作有误！');;

    }
    public function seo()
    {
        $this->assign('title', C(ACTION_NAME . '_title'));
        $this->assign('keywords', C(ACTION_NAME . '_keyWords'));
        $this->assign('description', C(ACTION_NAME . '_description'));
    }
} 
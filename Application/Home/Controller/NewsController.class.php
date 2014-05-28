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
                    foreach($dataList as $k=>$v){
                        $ids[]=$v['id'];
                        if($k==0) $last=$v;
                        if($id==$v['id']){
                            $previousData=$dataList[$k-1];
                            $data=$v;
                            $nextData=$dataList[$k+1];
                        }
                    }
                    $this->assign('data',$data);
                    $this->assign('last',$last);
                    $this->assign('dataLists',$dataList);
                    $this->assign('nextData',$nextData);
                    $this->assign('previousData',$previousData);
                    $this->assign('count',$this->getTotalCount());
                    $this->seo();
                    $this->display();
            }else
                $this->error('您的操作有误！');
        }else
            $this->error('您的操作有误！');
    }
    public function seo()
    {
        $this->assign('title', C(ACTION_NAME . '_title'));
        $this->assign('keywords', C(ACTION_NAME . '_keyWords'));
        $this->assign('description', C(ACTION_NAME . '_description'));
    }
    /**
     * NewsController::getTotalCount()
     * //得到查询的总次数
     * TODO  本方法没有判断是否查询，不管是否查询，只要调用本方法，查询次数会自动加1
     * @return
     */
    public function getTotalCount()
    {
        //获取查询taobao帐户的总次数
        $nuberModel = D('Number');
        $count = $nuberModel->where('name="taobao"')->find();
        //dump($count);
        //trace(serialize($count),'总次数数据');
        $count['val'] += rand(1,5);
        //var_dump($count['val']);
        $nuberModel->save($count);
        //return $count['val'];
        $code = '';
        $val = str_split($count['val']);
        $val=array_reverse($val);
        $length=count($val);
        foreach ($val as $k => $v) {
            $code = '<i class="numbers-i wh n' . $v . '"></i>'.$code ;
            if (($k+1) % 3 == 0 && ($k+1)!=$length)
                $code = '<img src="/Public/images/Comma.png" />'.$code;
        }
        return $code;
    }
} 
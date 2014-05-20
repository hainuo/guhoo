<?php
// 本类由系统自动生成，仅供测试用途
namespace Home\Controller;
use Think\Controller;
class IndexController extends Controller {
	/**
	 * IndexController::index()
	 * 
	 * @return
	 */
	public function index(){

		$this->redirect('getMember/');
	}
	/**
	 * IndexController::getMember()
	 * 获取淘宝会员信息
	 * @return
	 */
	public function getMember() {
        $userName=I('request.username');
        if(preg_match('/\?.*=/',__SELF__,$url)){
            $url="/Index/getMember/username/".$userName;
            $this->redirect($url);
        }
		if($userName){
			if($cache=S($userName.'-userInfo'))
                $userInfo=$cache;
            else
                $userInfo=$this->getUserInfo($userName);

            $this->assign('data',$userInfo);
            $this->assign('display','1');//用于显示用户信息模块
            //TODO display 设置值是因为在测试中发现tp模板中无法对username的值判断空，所以设置了，可以进行修改，但必须更改模板中相关代码
		}else{
		      $this->assign('data','');
              $this->assign('display','');
		
		}
        
        $this->seo();
        $this->assign('count',$this->getTotalCount());
        $this->display();
	}
    
    /**
     * IndexController::getWeight()
     * 获取权重  第一次遍历得到所有的商品信息
     * @return
     */
    public function getWeight(){
        $userName=I('request.username');        
        if(preg_match('/\?.*=/',__SELF__,$url)){
            $url="/Index/getWeight/username/".$userName;
            $this->redirect($url);
        }
        $page=I('get.page');
		if($userName && ($userName != '输入淘宝帐号')){
		  $taobao = new \Org\Util\Taobao($userName);
          $data = $taobao->getXLRank();
          C($userName.'_totalPage_XLURl',$data->page->totalPage);//总页数  写入配置文件方便读取
          C($userName.'_pageSize_XLURl',$data->page->pageSize);//每页项目数  写入配置文件方便读取
          //trace(json_encode($data->page),'跟踪测试data');
          $userInfo=$this->getUserInfo($userName);
          $model=D('goods');
		  if(!empty($data)) {
            if($data=='该用户没有宝贝'){
                $map['goodsNum']='0';
                $map['info']='该用户没有宝贝';
                $this->assign('data',$map);//往模板中赋值
                		      
            }else{
                $cache=S($userName.'-getAllGoods');
                if(!empty($cache)){//设置缓存时间为3天
                //TODO 需要对缓存时间在config文件中进行统一设置为系统常量，方便更改   如不需要，暂不做此处更改
                    //$list=$model->where('username="'.$userName.'"')->order('xl_index ASC')->select();
                    $list=$cache;
                }else{
                    $list=$this->getAllGoodS($userName,C($userName.'_totalPage_XLURl'),$data->page->pageSize);
                //必须保证有userName totalpage，pagesize 后两者全部有淘宝获取，否则出错。  虽然pagesize可能没有用到
                    S($userName.'-getAllGoods',$list);//设置缓存
                }
            }
             $map['goodsNum']=count($list);
             $map['itemList']=$list;
             $this->assign('data',$map);
          }
        $this->assign('userInfo',$userInfo);//往模板中赋值
        }
        $this->seo();
        $this->assign('count',$this->getTotalCount());
        $this->display();
    }
    
    public function getRank(){
        if(IS_AJAX){
            $userName=I('get.username');
            $type=I('get.type');
            $sortType=I('get.sortType');
            $key=I('get.key');
            $nowPage=I('get.nowPage');
            $taobao = new \Org\Util\Taobao($userName);
            $data=$taobao->getRankBykeyword($userName,$sortType,$key,$type,$nowPage);
            $this->getUserInfo($userName);
            $this->getTotalCount();
            //$this->ajaxReturn($data);
            echo $data;
        }else{
            $this->seo();
            $this->assign('count',$this->getTotalCount()); 
            $this->display();
            }
    }
    
    public function getExpress(){
        $this->assign('count',$this->getTotalCount());
        $this->seo();
        $this->display();
    }
    
    public function getHistory(){
        $model=D('member');
        $count=$model->field('id')->count();
        $page = new \Think\Page($count,30);// 实例化分页类 传入总记录数和每页显示的记录数(25)
        $show = $page->show();// 分页显示输出
        $list = $model->order('create_time desc')->limit($page->firstRow.','.$page->listRows)->select();
        $this->assign('list',$list);// 赋值数据集
        $show= str_replace('/Home/Index','',$show);
        $this->assign('page',$show);// 赋值分页输出
        $this->assign('count',$this->getTotalCount());
        $this->seo();
        $this->display();
    }    
    /**
     * IndexController::getTotalCount()
     * //得到查询的总次数  
     * TODO  本方法没有判断是否查询，不管是否查询，只要调用本方法，查询次数会自动加1
     * @return
     */
    public function getTotalCount(){
        //获取查询taobao帐户的总次数
        $nuberModel=D('Number');
        $count=$nuberModel->where('name="taobao"')->find();
        //dump($count);
        //trace(serialize($count),'总次数数据');
        $count['val'] +=1;
        $nuberModel->save($count);
        return $count['val'];
    }
    
    /**
     * IndexController::getUserInfo()
     * 获取用户的详细信息，从getMember中提取出来，方便查询和调用，减少系统资源占用。
     * @param mixed $userName
     * @return
     */
    public function getUserInfo($userName){
            $model = D('Member');
            $goodModel=D('goods');
            $taobao = new \Org\Util\Taobao($userName);            
            if($userName){
                $map['username']=$userName;
                $data=$model->where($map)->find();
                $list=$goodModel->where('username="'.$userName.'"')->select();
                if($list)
                    $goodNum=count($list);
                else{
                    $page=$taobao->getXLRank()->page;
                    $list=$this->getAllGoodS($userName,$page->totalPage,$page->pageSize);
                    $goodNum=count($list);
                    }
                if(!empty($data)){
                    //trace('username='.$map['username'].'存在','信息');
                    //trace(serialize($data),'输出data序列化数据');
                    $time=time();//获取当前时间
                    $expTime=strtotime($data['create_time'].'+'.C('DATA_CACHE_TIME'));
                }
            }
//TODO 注意此处逻辑有点问题，首先判断数据库是否有数据，如果有 则检查数据存储是否超时，如果没有超时那么读取数据，如果超时，则需要重新调取淘宝数据，如果数据库没有也需要重新调取淘宝数据。
//  我这里反其道行之，先判断前面两个条件是否达成  如果有一个不行则直接读取淘宝数据，并插入数据库  如果有更好的方法请修改，并测试通过。
            if(empty($data) || $time-$expTime > 0)
                {
                    if(!empty($data))//数据过期时进行删除操作 
                        $model->where($map)->delete();                    
                    $data=$taobao->getMember();
                    //trace(json_encode($data),'输出data序列化数据');
                    if($data){
                        //trace('创建数据库数据','信息');//跟踪方法测试是否数据准确
                        $data['goodNum']=$goodNum;//创建商品数量栏
                        $map=$data;//新变量，防止下面对data进行修改时，往模板中赋值出错。
                        
                        $score=json_encode($data['score']);//使用json_encode转换成文本序列
                        $data['score']=$score;
                                               
                        $dongtai=json_encode($data['dongtai']);
                        $data['dongtai']=$dongtai;
                        //trace(json_encode($data),'data');
                        $model->add($data);
                        return $map;
                    }
                    else
                        $this->error($model->getError());                      
                }
                else
                {
                    //数据转换  将data.score 转换成序列 使用json_decode转换成数组
                    $score=json_decode($data['score']);
                    $data['score']=$score;
                    
                    $dongtai=json_decode($data['dongtai']);
                    $data['dongtai']=$dongtai;
                    S($userName.'-userInfo',$data);//设置缓存
                    return  $data;
                    //trace('使用数据库数据，且没有超时','信息');//跟踪方法测试是否数据准确
                }        
    }
    /**
     * IndexController::getAllGoodS()
     * 获取所有的商品信息  只有数据库中没有时才使用此方法   可以优化
     * 先分别读取数据，分别对数据进行更新，然后全部select出来
     * @param mixed $userName
     * @param mixed $totalpage
     * @param mixed $pagesize
     * @return
     */
    public function getAllGoodS($userName,$totalpage,$pagesize){
                $model = D('goods');
                //$config =   M('Config')->getField('name,value');  把这里的操作转移到后台，每次更新数据后重新加载一遍。
                //C($config);
        //TODO 优化 缓存和数据库的读取逻辑
        //TODO 优化 数据库和淘宝数据的读取逻辑
        $create_time=$model->where('username="'.$userName.'"')->limit(1)->getfield('create_time');
        $pagesize=$pagesize==C($userName.'_pageSize_XLURl')?$pagesize:C($userName.'_pageSize_XLURl');
        //trace($create_time,'create_time');
        if (empty($create_time) || strtotime($create_time+C('DATA_CACHE_TIME')<time())) {
            //trace('ssss 重新查询');
            $model->where('username="'.$userName.'"')->delete();//先删除所有数据库中的相关信息        
            $totalpage=C($userName.'_totalPage_XLURl');
            trace($totalpage,'$totalpage 开始');
            $taobao = new \Org\Util\Taobao($userName);
            for($i=1;$i<=C($userName.'_totalPage_XLURl');$i++)
                $taobao->getAllGoodsByXLRank($userName,$i,$pagesize);
        }
//            for($i=1;$i<=$totalpage;$i++)//隐性降权不是使用的人气排名，所以下面更新人气排名信息的方法去掉
//                $rqData=$taobao->updateGoodsRQIndexByRQRank($userName,$i,$pagesize);
            $list=$model->where('username="'.$userName.'"')->order('tradenum DESC')->select();
            $page=1;//直接定义死这一项，粉兔兔中读取数据库中数据时就是使用的这一方法，
            if(is_array($list))foreach ($list as $k => $v) {
                    $list[$k]['index2'] = $k + 1 + $pagesize * ($page - 1);
                    if($list[$k]['tradenum'] != 0)//销量为0时因为没有可比性，所以没有隐形降权值
                        $list[$k]['index3'] = $list[$k] ['index2']-$list[$k]['xl_index'];
                    else
                        $list[$k]['index3']=0;

            }
        return $list;
        //return $this->assign('data',$list);
    }
    public function seo(){
        $this->assign('title',C(ACTION_NAME.'_title'));
        $this->assign('keywords',C(ACTION_NAME.'_keyWords'));
        $this->assign('description',C(ACTION_NAME.'_description'));
    }
}
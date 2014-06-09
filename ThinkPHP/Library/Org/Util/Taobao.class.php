<?php


namespace Org\Util;

define('__PUBLIC__','/Public');
/**
 * Taobao
 * 
 * @package tpFentutu
 * @author hainuo
 * @copyright 2014
 * @version $Id$
 * @access public
 */
class Taobao {

    public $username;
    public $error;

    /**
     * Taobao::__construct()
     * 
     * @param mixed $username
     * @return
     */
    public function __construct($username) {
        $this->truename = $username;
        $this->username = urlencode(iconv('utf-8', 'gbk', $username));
    }

    /**
     * Taobao::getRank()
     * 
     * @param integer $page
     * @return
     */
    public function getXLRank($page = 1 , $pagesize = 96,$urlType=1) {
        $username = $this->truename;
        $pagesize = ($pagesize==96)?$pagesize:C($username.'_pageSize_XLURl');//默认淘宝的每页项目数，防止出错
        $pageStart = ($page - 1) * $pagesize;
        $__arr = Time::millisecond();
        $__t = $__arr['second'] . sprintf('%03d', floor($__arr['millisecond'] * 1000));
        $__r = rand(100, 10000);
        $__call = 'jsonp' . ($__r + 1);
        //\Think\Log::record('记录getRank开始','WARN');
        //按销量排名的，实际排名
        $urlType=0;//因为算法更改，不在需要XLurl进行操作了。
        //$XLurl= 'http://search1.taobao.com/itemlist/default.htm?cat=0&s=' . $pageStart . '&sort=biz30day&as=0&viewIndex=1&commend=all&atype=b&nick='.urlencode($username) .'&style=list&tid=0&isnew=2&json=on&tid=0&data-key=s&data-value='.$pageStart.'&module=page&&_input_charset=utf-8&json=on&_ksTS='.$__t.'_'.$__r.'&callback='.$__call;
        $XLurl='http://search1.taobao.com/itemlist/default.htm?cat=0&s='.$pageStart.'&sort=coefp&as=0&viewIndex=1&commend=all&atype=b&nick='.urlencode($username).'&style=list&tid=0&isnew=2&pSize='.$pagesize.'&data-key=s&data-value='.$pageStart.'&data-action&module=page&_input_charset=utf-8&json=on&_ksTS='.$__t.'_'.$__r.'&callback='.$__call;
        $RQurl= 'http://search1.taobao.com/itemlist/default.htm?cat=0&s=' . $pageStart . '&sort=coefp&as=0&viewIndex=1&commend=all&atype=b&nick='.urlencode($username).'&style=list&tid=0&isnew=2&json=on&tid=0&data-key=s&data-value='.$pageStart.'&module=page&&_input_charset=utf-8&json=on&_ksTS='.$__t.'_'.$__r.'&callback='.$__call;
        $url=$urlType?$XLurl:$RQurl;//urlType 为真是选择销量排名，为假时选择人气排名
        //trace($url,'url获取地址');
        //\Think\Log::record('url已经获取到了'.$url,'WARN');
        $str = file_get_contents($url);
        //\Think\Log::record('或得到对应url返回信息'.$str,'WARN');
        if (strpos($str, '淘宝') == false)
            $str=iconv( 'gbk','utf-8', $str);
        //\Think\Log::record('转换成utf8后的字符串'.$str,'WARN');
        if ($str) {
            $str = trim($str);
            $str = substr($str, strlen($__call));
            $str = trim($str);
            $str = substr($str, 1, -1);
            //\Think\Log::record('去掉jsonp后的字符串'.$str,'WARN');   
            $arr = json_decode($str);
            //trace($arr,'json解码后的str');
            //\Think\Log::record('去掉jsonp后的字符串'.$str,'WARN');
            
            /**
             * arr部分主要内容示例
             * 
             *      ["page"] => object(stdClass)#606 (3) {
             *      ["totalPage"] => string(3) "100"
             *      ["currentPage"] => string(2) "15"
             *      ["pageSize"] => string(2) "96"
             *        }
             * 
             * 其他所有内容请参考 View/Public/getRank_example.php  主要参考的就是itemList 对象
             **/
            if (is_object($arr) && !empty($arr->page)) {//$arr是一个对象，
                return $arr;
            }else {
                return '该用户没有宝贝';
            }
        } else
            return '读取失败';
    }
    
    
    
    /**
     * Taobao::getMember()
     * 获取会员相关的所有直接资料信息
     * @return
     */
    public function getMember() {
        $url = 'http://member1.taobao.com/member/user_profile.jhtml?user_id=' . $this->username;
        $html = file_get_contents($url);
        $html = iconv('gbk', 'utf-8', $html); //匹配时要转码
        $regTime='';
        if (strpos($html, '該用戶已經被查封') !== false || strpos($html, '该用户已经被查封')) {
            $this->error = '该用户已经被查封';
            return false;
        }

        if (preg_match('/注册时间：\s*(\d+)年(\d+)月(\d+)日/', $html, $matches)) {
            $regTime = mktime(0, 0, 0, $matches[2], $matches[3], $matches[1]);
            $regTime += rand(6 * 3600, 86399); //提取买家注册时间戳
        }
        if(preg_match('/suerId=(\d+)[^"]"\/>/', $html,$matches)){
            $uid=$matches[1];
        }
        //根据注册时间判断是否买家或卖家，匹配到是买家 否则卖家
        if ($regTime) { //如果是买家
            $member['regTime'] = $regTime;
        }

        if (preg_match('/http:\/\/rate\.taobao\.com\/user-rate-(\w+)\.htm/', $html, $matches)) {
            $url = $matches[0]; //信誉页面
            $sid = $matches[1]; //卖家id
            $member['sid'] = $sid;
            $member['rateurl'] = $url;
            $member['username'] = $this->truename;
        }
        $html = file_get_contents($url); //打开卖家信誉页面 如：http://rate.taobao.com/user-rate-UvFx4vmg4MmcT.htm
        $html = iconv('gbk', 'utf-8', $html);
        if (preg_match('/<div\s*class=\"hd\">卖家信息<\/div>/', $html, $matches)) {
            $member['is_seller'] = 1; //
        } elseif (preg_match('/<h4>个人信息<\/h4>/', $html, $matches)) {
            $member['is_buyer'] = 1;
        }
        if (preg_match('/卖家信用：\s*(\d+)/', $html, $matches)) { //<a id="J_BuyerRate" href="javascript:void(0)">3</a>
            $member['sscore'] = intval($matches[1]); //匹配卖家信用数量
            $member['sscore_img'] = $this->getIco($member['sscore']);
        }
        if (preg_match('/买家信用：\s*(\d+)/', $html, $matches) || preg_match('/<a\s*id=\"J_BuyerRate\"\s*href=\"javascript\:void\(0\)\">(.*)<\/a>/', $html, $matches)) {
            $member['bscore'] = intval($matches[1]);
            $member['bscore_img'] = $this->getIco($member['bscore'], true);
        }
        if (preg_match('/<span\s*id=\"chart-name\"\s*class=\"data\">(.*)<\/span>/', $html, $matches)) {//当前主营
            $member['zhuying'] = $matches[1];
        }
        if (preg_match('/所在地区：\s*([^\s<]+)\s*</', $html, $matches)) {
            $member['area'] = $matches[1];
        }
        //获取好评 中评 差评  
        //$member['score']=  json_encode($this->getScore($html));
        
        $member['score'] = $this->getScore($html);
        //<em style="color:gray;">好评率：98.87%</em> 
        if (preg_match('/好评率：(.*)<\/em>/', $html, $matches)) {//好评率
            $member['haopinglv'] = $matches[1];
        }
        //动态评分
        // <em title="4.77616分" class="count">4.7</em>分
        // if (preg_match_all('/<em\s*title=\".*\"\s*class=\"count\">(.*)<\/em>分/', $html, $matches)) {//动态的分
        //     $member['dongtai'] = $matches[1];
        // }
        $member['dongtai']=$this->getTotalScore($html);


        //主营占比：21.42%
        if (preg_match('/主营占比：\s*(.*)<\/div>/U', $html, $matches)) {//好评率
            $member['zhanbi'] = $matches[1];
        }
        
        if (!$regTime) { //如果是买家
            if (preg_match('/<input[^>]*name="shopStartDate"[^>]*value="(\d+)-(\d+)-(\d+)"[^>]*>/', $html, $matches)) {
                $regTime = mktime(0, 0, 0, $matches[2], $matches[3], $matches[1]);
                $regTime += rand(6 * 3600, 86399);
                $member['regTime'] = $regTime;
            } elseif (preg_match('/创店时间：.*?(\d+)-(\d+)-(\d+)/', $html, $matches)) {
                $regTime = mktime(0, 0, 0, $matches[2], $matches[3], $matches[1]);
                $regTime += rand(6 * 3600, 86399);
                $member['regTime'] = $regTime;
            }
        }
        
        if (preg_match('/userId: \'(\d+)\'/', $html, $matches) || preg_match('/userID: \'(\w+)\'/', $html, $matches)) {//匹配卖家 userid
            if(!isset($uid))
                $member['uid'] = $matches[1];
            else
                $member['uid'] = $uid;
        }
        if (strpos($html, '支付宝实名认证') !== false)
            $member['utype'] = 1;
        if (strpos($html, '支付宝个人认证') !== false)
            $member['utype'] = 1;
        elseif (strpos($html, '淘宝个人实名认证') !== false)
            $member['utype'] = 1 << 1;
        if (strpos($html, '手机验证') !== false)
            $member['utype'] = 1 << 2;
        if (strpos($html, '网店经营者营业执照信息') !== false)
            $member['utype'] = 1 << 3; //网店经营者营业执照信息
            
        //TODO  获取保证金信息deposit 
        if(isset($member['is_seller']) && $member['is_seller']==1){
            $member['deposit']=$this->getDeposit($html);
            $member['url']=$this->getShopUrl($html);
            preg_match('/data-item-id="(\d+)[^"]/',$html,$sellerId);
            //trace(json_encode($sellerId),'获取sellerId');
            if(!empty($sellerId))
                $member['sellerId']=$sellerId[1]?$sellerId['1']:$member['sid'];
            else
                $member['sellerId']=$member['uid']?$member['uid']:$member['sid'];
                //trace($member['sellerId'],'已经找到sellerId');
            }
        return $member;
    }

    /**
     * Taobao::getDeposit()
     * 返回卖家保证金
     * @param mixed $html
     * @return
     */
    private function getDeposit($html) {

           $str=String::dg_string2($html, 'div', '<div class="charge">');
           $str=String::dg_string2($str, 'span', '<span>');
           //trace($str,'getDeposit:::::::::');
            //preg_match('/￥[\d+](.+)/', $str, $matches); 
            //TODO此处使用的是去掉html标签，最好的方式应该是正则匹配，但是匹配不好办            
            $matches=strip_tags($str);
            //trace($matches,'最后的matches');
            return $matches;

    }
    
    /**
     * Taobao::getShopUrl()
     * 返回卖家店铺地址
     * @param mixed $html
     * @return
     */
    private function getShopUrl($html) {

           //$str=String::dg_string2($html, 'div', '<div class="title">
           //             <a href');//TODO  此处不能够修改，否则无法正确截取字符串
           //trace($str,'getUStr');

           //$str=String::dg_string($str, '<a', 'target="_blank" >');

           preg_match('/(http:\/\/store\.taobao\.com\/shop.*\.htm)["]/', $html, $matches);
       // \Think\Log::write('getUrl:::::::::'.$matches[0]."    url2   ".$matches[1]);
            //$matches=strip_tags($str);
            //trace($matches,'最后的matches');
            return $matches[1];

    }    

    /**
     * Taobao::getScore()
     * //获取买家、卖家相关积分信息
     * @param mixed $html
     * @return
     */
    private function getScore($html) {
        if ($str = String::dg_string2($html, 'div', '<div class="rate-box box-his-rate')) {
            //trace('已经获取到score的数据');
            /* if (preg_match_all('/<tr>\s*<td>总数<\/td>\s*<td class="rateok">\s*<a.*?>(\d+)<\/a>\s*<\/td>\s*<td class="ratenormal">\s*<a.*?>(\d+)<\/a>\s*<\/td>\s*<td class="ratebad">\s*<a.*?>(\d+)<\/a>\s*<\/td>\s*<\/tr>/s', $str, $matches, PREG_SET_ORDER)) { */
            if (preg_match_all('/<tr>\s*<td>总数<\/td>\s*<td class="rateok">(.*?)<\/td>\s*<td class="ratenormal">(.*?)<\/td>\s*<td class="ratebad">(.*?)<\/td>\s*<\/tr>/s', $str, $matches, PREG_SET_ORDER)) {
                if (count($matches) == 4) {
                    $rs = array();
                    foreach ($matches as $v) {
                        unset($v[0]);
                        $v = array_values($v);
                        foreach ($v as $k2 => $v2) {
                            $v2 = trim($v2);
                            if (!is_numeric($v2)) {
                                $v2 = String::getPregVal('/>\s*(\d+)\s*</', $v2);
                            }
                            $v[$k2] = $v2;
                        }
                        $rs[] = $v;
                    }
                    return $rs;
                }
            }
        }
        return array(array(0, 0, 0), array(0, 0, 0), array(0, 0, 0), array(0, 0, 0));
    }
   
    /**
     * Taobao::getIco()
     * 获得好评相应的图标
     * @param mixed $score
     * @param bool $isBuyer
     * @return
     */
    public function getIco($score, $isBuyer = false) {
        $img = '';
        if ($score < 11)
            $img = 'red_1.gif';
        elseif ($score < 41)
            $img = 'red_2.gif';
        elseif ($score < 91)
            $img = 'red_3.gif';
        elseif ($score < 151)
            $img = 'red_4.gif';
        elseif ($score < 251)
            $img = 'red_5.gif';

        elseif ($score < 501)
            $img = 'blue_1.gif';
        elseif ($score < 1001)
            $img = 'blue_2.gif';
        elseif ($score < 2001)
            $img = 'blue_3.gif';
        elseif ($score < 5001)
            $img = 'blue_4.gif';
        elseif ($score < 10001)
            $img = 'blue_5.gif';

        elseif ($score < 20001)
            $img = 'cap_1.gif';
        elseif ($score < 50001)
            $img = 'cap_2.gif';
        elseif ($score < 100001)
            $img = 'cap_3.gif';
        elseif ($score < 200001)
            $img = 'cap_4.gif';
        elseif ($score < 500001)
            $img = 'cap_5.gif';

        elseif ($score < 1000001)
            $img = 'crown_1.gif';
        elseif ($score < 2000001)
            $img = 'crown_2.gif';
        elseif ($score < 5000001)
            $img = 'crown_3.gif';
        elseif ($score < 10000001)
            $img = 'crown_4.gif';
        else
            $img = 'crown_5.gif';
        return 'http://pics.taobaocdn.com/newrank/' . ($isBuyer ? 'b_' : 's_') . $img;
    }

    /**
     * Taobao::curl()
     * 
     * @param mixed $url
     * @return
     */
    public function curl($url) {
        $curl = curl_init();

        //设置选项
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_HEADER, 0); //是否开启输出头信息
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1); //是否返回数据
        //执行
        $response = curl_exec($curl);
        //关闭
        curl_close($curl);
//           
        return iconv('gbk', 'utf-8', $response);
    }

    /**
     * Taobao::millisecond()
     * 
     * @return
     */
    public function millisecond() {
        list($millisecond, $second) = explode(' ', microtime());
        return array('millisecond' => (double) $millisecond, 'second' => (double) $second);
    }
    
    /**
     * Taobao::getAllGoodsByXLRank()
     * 获取所有商品信息以及商品在店铺搜索中的销量排名信息 并写入数据库
     * 数据库结构在根目录下  文件名是taobao_goods.sql
     * @param integer $page
     * @param integer $pagesize
     * @return void
     */
    public function getAllGoodsByXLRank($username,$page=1,$pagesize=96){
        $model=D('goods');
        $map['username']=$username;
        //trace($username,'开始获取用户的商品信息'.$page.'页码配置文件中totalpage是'.C($username.'_totalPage_XLURl'));
        //trace('chaxunkaishi sssssssssssssssssssssssss');
        if(empty($list)){
        	$pageSize=C($username.'_pageSize_XLURl');
            $arr=$this->getXLRank($page,$pagesize);
            C($username.'_totalPage_XLURl',$arr->page->totalPage);//总页数 每次查询都将这个参数进行设置，防止淘宝缓存导致数据查询问题，查询时读取这个配置
            C($username.'_pageSize_XLURl',$arr->page->pageSize);//每页项目数 每次查询都将这个参数进行设置，防止淘宝缓存导致数据查询问题，查询时读取这个配置
            //trace(C($username.'_totalPage_XLURl'),'totalPage');
            //trace(C($username.'_pageSize_XLURl'),'pagesize');            
            $list = array();
            $pageStart = ($page - 1) * $pagesize;
            foreach ($arr->itemList as $k => $v) {
               $v = array(
               'xl_index' => $pageStart + $k + 1,
               'itemid' => String::getPregVal('/item.htm\?id=(\d+)/', $v->href),
               'title' => $v->title,
               'href' => $v->href,
               'price' => $v->price,
               'currentPrice' => !empty($v->currentPrice) ? $v->currentPrice : $v->price,
               'tradenum' => intval($v->tradeNum),
               'username' => $v->nick,
               'commend' => $v->commend,
               'commendHref'=>$v->commendHref,
               'page'=>    $page
               );
               //trace(json_encode($v),'list第'.$v['xl_index'].'项');//增加此方法是为了防止信息重复提交
               $data=$model->where('itemid="'.$v['itemid'].'"')->find();
               if($data)
                    $model->where('itemid="'.$v['itemid'].'"')->save($v);     
               else   
                    $model->data($v)->add();
               $list[] = $v;
            }            
        }
        return  $list;
    }
    
    ///**
//     * Taobao::updateGoodsRQIndexByRQRank()
//     *  更新商品在店家商品搜索中的人气排名信息 到数据库中
//     * @param integer $page
//     * @param integer $pagesize
//     * @return void
//     */
//    public function updateGoodsRQIndexByRQRank($username,$page=1,$pagesize=96){
//                $model=D('goods');
//        $map['username']=$username;
//        trace($username,'开始获取人气排名'.$page.'页码');
//        if(empty($list)){
//            $arr=$this->getXLRank($page,$pagesize,$urlType='0');//通过赋值urlType
//            $list = array();
//            $pageStart = ($page - 1) * $pagesize;
//            foreach ($arr->itemList as $k => $v) {
//               $v = array(
//               'rq_index' => $pageStart + $k + 1,
//               'itemid' => String::getPregVal('/item.htm\?id=(\d+)/', $v->href),
//               );
//               trace(json_encode($v),'更新itemid='.$v['itemid'].'项rq_index信息 销量排行'.$v['xl_idnex'].' 当前是人气'.$v['rq_index'].'项');
//               $data=$model->where('itemid="'.$v['itemid'].'"')->find();
//               if($data)
//                    $model->where('itemid="'.$v['itemid'].'"')->save($v);     
//               else
//                    $model->data($v)->add();  
//            }            
//        }
//    }
/* 此方法需要修改输出部分，才能使用
 *     public function getRankBykeywordByDOM($username,$sortType,$key,$type,$nowPage,$perPage=44){//使用dom扩展类                比较方便
        $cache=s($username.'-'.$key.'-'.$sortType.'-'.$type.'-'.$nowPage);
        if($cache)
            return $cache;
        else{
            if($key && ($type == 1 && $username || $type == 0)) {
                $url0 = 'http://s.taobao.com/search?q='.urlencode(iconv("utf-8", 'GBK', $key)).'&commend=all&style=list&tab=coefp&s=';
                //var_dump($url0);
                $url = $url0.($nowPage * $perPage).($sortType ? '&sort='.$sortType : '');
                $contents = file_get_contents($url);
                if (strpos($contents, '淘宝') == false)
                    $contents=iconv( 'gbk','utf-8', $contents);

                if (strpos($contents, 'item-not-found') !== false)
                    $rsErr = 'ResultCode:001';
                elseif (strpos($contents, 'cat-noresult') !== false)
                    $rsErr = 'ResultCode:002';
                else{
                    import('Org.Util.Dom');
                    $dom=new \Dom;
                    $dom->load($contents);
                    foreach($dom->find('div.list-view div.item') as $k=> $code){
                        $rsList[] = array(
                            'index'     => $k,
                            'url'       => trim($code->find('h3.summary a',0)->href),//商品url
                            'title'     => trim($code->find('h3.summary a',0)->plaintext),//商品标题
                            'saleCount' => trim($code->find('.dealing div',0)->plaintext),//成交数量
                            'price'     => trim($code->find('.total .price',0)->plaintext),//商品价格
                            'nick'      => trim($code->find('.seller a',0)->plaintext),//商家昵称
                            'tmall'     => preg_match('/tmall\.com/',$code->find('.seller a',0)->href,$matches)?true:false,
                            'title0'    => trim($code->find('h3.summary a',0)->title),//商品连接的title属性
                            'shopUrl'   => $code->find('.seller a',0)->href,//淘宝店地址
                        );
                    }
                }
            } else
                $error = '参数错误';
            if($error)
                return  $error;
            elseif($rsErr)
                return  $rsErr;
            else
                if($rsList)
                    foreach($rsList as $k=>$v){
                        $code.= '<tr>';
                        $code .= '<td>第<b>';
                        $code.=$nowPage * $perPage  + $k +1 .'</b>位</td>';
                        $code.='<td class="un"><a href="';
                        $code.=$url0.($nowPage * $perPage);
                        $code.='" target="_blank">第';
                        $code.= $nowPage + 1 ;
                        $code.='页</a>，第';
                        $code.=$k + 1 .'位</td>';
                        $code.='<td><font color="#000">'. $v["saleCount"] .'</font>笔</td>';
                        $code.='<td> <font color="#000">'.$v["price"].'</font> 元</td>';
                        $code.='<td class="pl"><a href="'.$v["shopUrl"].'" target="_blank">';
                        if($v["nick"]==$username)
                            $code.='<b><font color="red">'.$username.'</font></b>';
                        else
                            $code.=$v["nick"];
                        $code.='</a>';
                        if($v["tmall"])
                            $code.='<img src="'.__PUBLIC__.'/images/tmall.gif" />';
                        $code.='</td><td class="time" width="30%"><a href="'.$v["url"].'" target="_blank" title="'.$v["title0"].'">'.$v["title"].'</a></td></tr>';
                    }
                else{
                    $code.='<tr><td></td><td></td><td></td><td></td><td>第';
                    $code.= $nowPage + 1 ;
                    $code.='页无</td><td></td></tr>';
                }
            s($username.'-'.$key.'-'.$sortType.'-'.$type.'-'.$nowPage,$code,3600);
            return $code;
        }
    }*/
    public function getRankBykeyword($username,$sortType,$key,$type,$nowPage,$perPage=44){
        $cache=s($username.'-'.$key.'-'.$sortType.'-'.$type.'-'.$nowPage);
        $code='';
        if($cache)
            return $cache;
        else{
            if($key && ($type == 1 && $username || $type == 0)) {
                header("Content-type:text/html;charset=UTF-8");
                import('Org.JAE.QueryList');
                $url0 = 'http://s.taobao.com/search?q='.urlencode(iconv("utf-8", 'GBK', $key)).'&commend=all&style=list&tab=coefp&s=';
                $url = $url0.($nowPage * $perPage).($sortType ? '&sort='.$sortType : '');
                if (strpos(file_get_contents($url), 'cat-noresult') !== false)
                    $rsErr = 'ResultCode:002';
                else{
                    $reg = array(
                        "saleCount"=>array(".dealing div:eq(0)","text"),//成交量
                        "title"=>array("h3.summary a:eq(0)","text"),//商品标题
                        "url"=>array("h3.summary a:eq(0)","href"),//商品url
                        "title1"=>array("h3.summary a:eq(0)","title"),//商品alt属性
                        "seller"=>array(".seller a:eq(0)","text"),//卖家帐号
                        "shop"=>array(".seller a:eq(0)","href"),//淘宝店铺url
                        "price"=>array(".total .price","text"),//淘宝店铺url
                    );
                    $rang = ".list-view div.item";
                    $hj = new \QueryList($url,$reg,$rang,'curl','');
                    $rsList=$hj->jsonArr;
                    if(empty($rsList))
                        $rsErr = 'ResultCode:001';
                }
            }else
                $error="参数错误";
        }
        if($error)
            return  $error;
        if($rsErr)
            return  $rsErr;
        if($rsList)
            foreach($rsList as $k=>$v){
                $codeList.= '<tr>';
                $codeList .= '<td>第<b>';
                $codeList.=$nowPage * $perPage  + $k +1 .'</b>位</td>';
                $codeList.='<td class="un"><a href="';
                $codeList.=$url0.($nowPage * $perPage);
                $codeList.='" target="_blank">第';
                $codeList.= $nowPage + 1 ;
                $codeList.='页</a>，第';
                $codeList.=$k + 1 .'位</td>';
                $codeList.='<td><font color="#000">'. $v["saleCount"] .'</font>笔</td>';
                $codeList.='<td> <font color="#000">'.$v["price"].'</font> 元</td>';
                $codeList.='<td class="pl"><a href="'.$v["shopUrl"].'" target="_blank">';
                if($v["nick"]==$username)
                    $codeList.='<b><font color="red">'.$username.'</font></b>';
                else
                    $codeList.=$v["nick"];
                $codeList.='</a>';
                if($v["tmall"])
                    $codeList.='<img src="'.__PUBLIC__.'/images/tmall.gif" />';
                $codeList.='</td><td class="time" width="30%"><a href="'.$v["url"].'" target="_blank" title="'.$v["title0"].'">'.$v["title"].'</a></td></tr>';
                if($type=='1' && $v['nick']==$username){
                    $code.=$codeList;//当只查询自己的时候显示。
                }
            }
        if($type==0 && $codeList)
                $code=$codeList;//当查询所有的时候显示
         elseif(empty($code)){
             $code.='<tr><td></td><td></td><td></td><td></td><td>第';
             $code.= $nowPage + 1 ;
             $code.='页无</td><td></td></tr>';
         }
        s($username.'-'.$key.'-'.$sortType.'-'.$type.'-'.$nowPage,$code,3600);//强制缓存3600s
        return $code;
    }

    public function getSellerScoreMember($total, $now, $need){ //计算达到5还需要多少单
        //($now * $total + 5 * $count) / ($total + $count) = $need;
        //$now * $total + 5 * $count = $need * $total + $need * $count;
        //($need - $now) * $total = (5 - $need) * $count;
        if ($need >= 5) return 0;
        $count = (($need - $now) * $total) / (5 - $need);
        if ($count < 0) return 0;
        $count > floor($count) && $count = floor($count) + 1;
        return $count;
    }
    //获取动态评分的相关信息
    public function getTotalScore($html,$need=4.9){
        if(C('DONGTAI_NEED')) $need=C('DONGTAI_NEED');
        $html = String::dg_string2($html, 'ul', 'id="dsr"');
        preg_match_all('/<li class="J_RateInfoTrigger.*?>.*?<em title="(\d+(?:\.\d+)?)分".*?<div class="total">.*?共<span>(\d+)<\/span>人.*?<div class="count count5">\s*<span class="small-star-no5"><\/span>(.*?)<\/div>.*?<div class="count count4">\s*<span class="small-star-no4"><\/span>(.*?)<\/div>.*?<div class="count count3">\s*<span class="small-star-no3"><\/span>(.*?)<\/div>.*?<div class="count count2">\s*<span class="small-star-no2"><\/span>(.*?)<\/div>.*?<div class="count count1">\s*<span class="small-star-no1"><\/span>(.*?)<\/div>.*?<\/li>/s', $html, $matches, PREG_SET_ORDER);
        $sList = array();
        foreach ($matches as $k => $v) {
            $sList[$k]['score']=$v[1];
            $sList[$k]['total']=$v[2];
            $sList[$k]['need']=$this->getSellerScoreMember($v[2],$v[1],$need);
            $sList[$k]['pscore']=floor($v[1]*10)/10;
        }
        $list=array();
        list($list['miaoshu'] ,$list['fuwu'] ,$list['fahuo'] )=$sList;        
        return (array)$list;
    }
// helper functions
// -----------------------------------------------------------------------------
// get html dom from file
// $maxlen is defined in the code as PHP_STREAM_COPY_ALL which is defined as -1.
    function file_get_html($url, $use_include_path = false, $context=null, $offset = -1, $maxLen=-1, $lowercase = true, $forceTagsClosed=true, $target_charset = DEFAULT_TARGET_CHARSET, $stripRN=true, $defaultBRText=DEFAULT_BR_TEXT)
    {
        // We DO force the tags to be terminated.
        $dom = new Dom(null, $lowercase, $forceTagsClosed, $target_charset, $defaultBRText);
        // For sourceforge users: uncomment the next line and comment the retreive_url_contents line 2 lines down if it is not already done.
        $contents = file_get_contents($url, $use_include_path, $context, $offset);
        // Paperg - use our own mechanism for getting the contents as we want to control the timeout.
//    $contents = retrieve_url_contents($url);
        if (empty($contents))
        {
            return false;
        }
        // The second parameter can force the selectors to all be lowercase.
        $dom->load($contents, $lowercase, $stripRN);
        return $dom;
    }

// get html dom from string
    function str_get_html($str, $lowercase=true, $forceTagsClosed=true, $target_charset = DEFAULT_TARGET_CHARSET, $stripRN=true, $defaultBRText=DEFAULT_BR_TEXT)
    {
        $dom = new Dom(null, $lowercase, $forceTagsClosed, $target_charset, $defaultBRText);
        if (empty($str))
        {
            $dom->clear();
            return false;
        }
        $dom->load($str, $lowercase, $stripRN);
        return $dom;
    }

// dump html dom tree
    function dump_html_tree($node, $show_attr=true, $deep=0)
    {
        $node->dump($node);
    }

}
?>
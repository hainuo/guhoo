<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>
<?php echo ($title); ?>
</title>
<meta name="keywords" content="<?php echo ($keywords); ?>">
<meta name="description" content="<?php echo ($description); ?>">
<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
<link rel="stylesheet" type="text/css" href="/Public/css/main-ico.css" />
<link rel="stylesheet" type="text/css" href="/Public/css/other.css?v=1.3" />
<script type="text/javascript" src="/Public/js/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="/Public/js/main.js"></script>
<script type="text/javascript" src="/Public/js/placeholder.js"></script>
</head>
<style>
.content .result{width: 100%;border: #f2f2f2 solid 1px;height: 360px;background: white;font-size:13px;}
.result .left{width: 120px;height: 100%;border-right: #f2f2f2 1px solid;float: left;text-align: center;}
.result .left .warn-ico{margin: 0 auto;width: 74px;padding:20px 0px;}
.result .right{float: left;width: 629px;*width:600px;}
.result font{font-size:12px;}
.result .right .r-t{height: 40px;border-bottom: 1px #f2f2f2 solid;padding-top:20px;}
.result .r-t ul{float: left;margin-left: 15px;display: inline;}
.result .r-t ul li{float: left;margin-left: 15px;}
.result .right .r-c{height: 65px;border-bottom: 1px #f2f2f2 solid;padding:10px 10px;}
.result .right .r-c ul{float: left;width: 33%;overflow: hidden;}
.result .right .r-c span{color: gray;}
.result .right .r-c li{margin-bottom: 8px;}
.result .r-c .clf{height:14px;line-height:14px;}
.result .right a{color:#246F9B;}
.result .right a:hover{color:#E07800;}
.result .right .f-gray li a{color:gray}
.result .r-b{position: relative;padding:10px 10px;padding-top: 20px;}
.result .r-b .u{float: left;width: 50%;}
.result .r-b .u li{margin-top: 8px;}
.result .r-b span{color:gray;}
.result .r-b a{color:#246f9b;}
.result .r-b a:hover{color:rgb(224,120,0);}
.result .r-b .msg-green{position: absolute;left: 137px;top:80px;display: block;}
.result .r-b .msg-blue{position: absolute;left: 440px;top:80px;display: block;}
.result .r-b .position-info ul{font-size:12px;padding-top: 15px;padding-left: 5px;}
.result .r-b .position-info ul li{height: 20px;line-height: 20px;}
.result .r-b .position-info font{color: #3366e5}
.result a.mini-dsr span{vertical-align: top;}
.result a.mini-dsr {color: #3c3c3c;text-decoration: none!important;}
.result .r-b .dsr-wrap-left a {vertical-align: top;}
.result .r-b .dsr-wrap-left,.dsr-wrap-right{display: inline-block;width: 3px;height: 14px;border: 1px solid #ccc;_position: relative;_margin-top: -2px;}
.result .r-b .dsr-wrap-left {border-right: 0 none;}
.result .r-b .dsr-wrap-right {border-left: 0 none;}
.result .r-b .dsr-num.red {color: #da4453;}
.result .r-b .dsr-split {display: inline-block;width: 0;height: 12px;border-right: #eee solid 1px;margin: 3px 3px 0 2px;_margin: 0 6px 0 3px;}

.tzlj{width: 118px; height: 25px; cursor: pointer; padding: 2px; }
.tzlj:hover{background: none repeat scroll 0% 0% rgb(245, 245, 245);text-decoration: none;}
.nametz:hover{text-decoration:none;color:green;}

.other-n{background:url("/Public/images/other-n.png") no-repeat scroll -479px -286px;display: inline-block;width: 20px;height: 15px;}
.other-i.safe{height:22px;vertical-align: text-top;cursor: pointer;}
.info-block {width:230px;padding: 10px 0 10px 10px;display:none;position: absolute;top:182px;left:125px;border-right: #f2f2f2 1px solid;background: #f4f4f4;border-radius: 5px;z-index:10;box-shadow: 0 0 5px rgba(0,0,0,0.3);border: #dedede 1px solid;background:#f6f6f6;}
.info-block .xiaobao1,.info-block .xiaobao2 {float: left;background: url(/Public/images/xiaobao.png) no-repeat 0 -64px;width: 76px;height: 81px;}
.info-block .xiaobao2 {background-position: -80px -64px}
.info-block .desc {padding-left:10px;height:90px;overflow: hidden;zoom: 1;}
.info-block .desc .title {height: 25px;}
.info-block .title {margin-bottom: 10px;}
.info-block ul li {margin-bottom: 9px;}
.info-block .desc ul .xiaofei,.info-block .desc ul .seven,.info-block .desc ul .fake,.info-block .desc ul .thirty,.info-block .desc ul .lightning,.info-block .desc ul .safe,.info-block .desc ul .xb-three {background: url(images/baozheng.png) no-repeat scroll 0 0 transparent;display: inline-block;margin-right: 5px;vertical-align: middle;margin-top: -2px;height: 16px;width: 16px;}
.info-block .desc ul{margin-left:0px;float:none;}
.info-block .desc ul li{height:22px;margin-left:0px;float:none;}
.info-block .desc ul li a{color: #36c;font: 12px/1.5 tahoma,arial,5b8b4f53;}
.info-block .desc ul .xiaofei{background-position:-50px -417px}
.info-block .desc ul .seven{background-position:-18px -417px}
.info-block .desc ul .fake{background-position:-200px -417px}
.info-block .desc ul .thirty{background-position:-181px -417px}
.info-block .desc ul .lightning{background-position:-159px -417px}
.info-block .desc ul .safe{background-position:-2px -417px}
.info-block .charge {margin-top: 10px;}
.info-block .charge span {font-weight: 700;color: #F60;}
.rank{vertical-align: text-top;}
.numbers{font-size:30px;color:red;font:italic bold arial,sans-serif,微软雅黑;}
#bdshare{width: auto;height: 25px;text-align:center;}

</style>
<body>
<div class="siteHeader"><?php echo showAd('siteHeader');?> </div>
<div class="header">
	<div class="detail">
		<ul>
			<li ><a class="header-i <?php if(ACTION_NAME == 'getMember'): ?>hover <?php else: ?>deafult<?php endif; ?> i1" href="/">淘宝信誉查询</a></li>
			<li ><a class="header-i <?php if(ACTION_NAME == 'getWeight'): ?>hover <?php else: ?>deafult<?php endif; ?>  i2" href="/Index/getWeight.html">淘宝隐形降权查询</a></li>
			<li ><a class="header-i <?php if(ACTION_NAME == 'getRank'): ?>hover <?php else: ?>deafult<?php endif; ?>  i3" href="/Index/getRank.html">淘宝排名查询</a></li>
			<li ><a class="header-i <?php if(ACTION_NAME == 'getExpress'): ?>hover <?php else: ?>deafult<?php endif; ?>  i4" href="/Index/getExpress.html">淘宝快递查询</a></li>
			<li ><a class="header-i <?php if(ACTION_NAME == 'getHistory'): ?>hover <?php else: ?>deafult<?php endif; ?>  i5" href="/Index/getHistory.html">卖家查询记录</a></li>
			<li ><a class="header-i deafult  i6" href="http://tb.wdfxy.com/" target="_blank">dddd</a></li>
		</ul>
	</div>
 </div>
<div class="content">
        <div class="detail">
                <div class="other-i logo">
                </div>
                <form class="search" action="/index/getmember.html" method="get">
                        <i class="other-i ww" style="position: absolute;top:5px;left:5px;">
                        </i>
                        <input class="index-input-s" type="text" name="username" id="txtKey" <?php if($display) echo 'value="'.$data[ 'username']. '"'?>
                        />
                        <input class="other-i button-s" type="submit" value="" />
                </form>
                <div class="clf">
                </div>
                <?php if(!empty($data)): ?><div class="result">
                        <div class="left f-green f-size-14">
                                <div class=" warn-ico">
                                        <i class="other-i warning-green">
                                        </i>
                                </div>
                                <p>
                                        安全等级：安全
                                </p>
                        </div>
                        <div class="right">
                                <div class="r-t">
                                        <ul>
                                                <span class="f-green f-size-14">
                                                        <strong>
                                                                <a href="<?php echo ($data['rateurl']); ?>" class='nametz' target="_blank" style='color:green;'><?php echo ($data['username']); ?></a>
                                                        </strong>
                                                </span>
                                                <a target="_blank" href="http://amos.alicdn.com/msg.aw?v=2&uid=<?php echo ($data['username']); ?>&site=cntaobao&s=1&charset=utf-8">
                                                <img border="0" src="http://amos.alicdn.com/online.aw?v=2&uid=<?php echo ($data['username']); ?>&site=cntaobao&s=1&charset=utf-8" alt="点击这里给我发消息" />
                                                </a>
                                                <?php if(!empty($data['is_seller'])):?>
                                                <span class="other-i safe">
                                                        <div class="info-block info-block-first">
                                                                <div class="xiaobao-box">
                                                                        <div class="xiaobao1">
                                                                        </div>
                                                                        <div class="desc">
                                                                                <div class="title">
                                                                                        卖家已向消费者承诺：
                                                                                </div>
                                                                                <ul>
                                                                                        <li>
                                                                                                <span class="xiaofei">
                                                                                                </span>
                                                                                                <a href="http://www.taobao.com/go/act/315/xb_20100707.php#rushi" title="卖家承诺消费者保障服务" target="_blank">消费者保障</a>
                                                                                        </li>
                                                                                </ul>
                                                                        </div>
                                                                        <div class="charge">
                                                                                卖家当前保证金余额
                                                                                <span>
                                                                                        <?php echo ($data["deposit"]); ?>
                                                                                </span>
                                                                                元
                                                                        </div>
                                                                </div>
                                                        </div>
                                                </span>
                                                <?php  endif;?>
                                                <!--<span class="other-i tmall"></span>-->
                                        </ul>
                                        <ul class="f-size-12 f-gray">
                                                <li>
                                                        <a href="<?php echo ($data['rateurl']); ?>" target="_blank"><span class="other-i good"></span><font>好评</font><p style="color: red; font-weight: bold;text-align:center;"><?php echo $data['score'][0][0]+ $data['score'][1][0]+$data['score'][2][0]+$data['score'][3][0];?></p></a>
                                                </li>
                                                <li>
                                                        <a href="<?php echo ($data['rateurl']); ?>" target="_blank"><span class="other-i normal"></span><font>中评</font><p style="color: #F5CC04; font-weight: bold;text-align:center;"><?php echo $data['score'][0][1]+ $data['score'][1][1]+$data['score'][2][1]+$data['score'][3][1];?></p></a>
                                                </li>
                                                <li>
                                                        <a href="<?php echo ($data['rateurl']); ?>" target="_blank"><span class="other-i bad"></span><font>差评</font><p style="color: black; font-weight: bold;text-align:center;"><?php echo $data['score'][0][2]+ $data['score'][1][2]+$data['score'][2][2]+$data['score'][3][2];?></p></a>
                                                </li>
                                                <!-- <li><a href="http://favorite.taobao.com/collect_item_relation---33454965-0.htm" target="_blank"><span class="other-n"></span><font>收藏</font><p style="color: #67bbfe; font-weight: bold;text-align:center;">2901</p></a></li> -->
                                        </ul>
                                </div>
                                <div class="r-c">
                                        <ul>
                                                <li>
                                                        <span>
                                                                实名认证：
                                                        </span>
                                                        <font>
                                                                支付宝认证
                                                        </font>
                                                </li>
                                                <li>
                                                        <span>
                                                                主营行业：
                                                        </span>
                                                        <font>
                                                                <?php echo ($data['zhuying']); ?>
                                                        </font>
                                                </li>
                                        </ul>
                                        <ul>
                                                <li>
                                                        <span>
                                                                所在地区：
                                                        </span>
                                                        <font>
                                                                <?php echo ($data['area']); ?>
                                                        </font>
                                                </li>
                                                <li>
                                                        <span>
                                                                主营占比：
                                                        </span>
                                                        <font>
                                                                <?php echo ($data['zhanbi']); ?>
                                                        </font>
                                                </li>
                                        </ul>
                                        <ul>
                                                <li>
                                                        <span>
                                                                注册时间：
                                                        </span>
                                                        <font>
                                                                <?php echo date( 'Y-m-d H:i:s',$data[ 'regTime']);?>
                                                        </font>
                                                        <br>
                                                        <span style="font-size:12px;color:green;">
                                                        </span>
                                                </li>
                                        </ul>
                                        <div class="clf">
                                                <span>
                                                        详细信息：
                                                </span>
                                                <font>
                                                        <a href="<?php echo ($data['rateurl']); ?>" target="_blank"><?php echo ($data['rateurl']); ?></a>
                                                </font>
                                        </div>
                                </div>
                                <div class="r-b">
                                        <ul class="u">
                                                <li>
                                                        <strong>
                                                                买家信用
                                                        </strong>
                                                        　
                                                        <span class="msg-blue-u" style="font: 12px/1.5 tahoma,arial,'Hiragino Sans GB',\5b8b\4f53,sans-serif;display:none;">
                                                                加载中...
                                                        </span>
                                                </li>
                                                <li>
                                                        <a href="<?php echo ($data['rateurl']); ?>" target="_blank"><img src="<?php echo ($data['bscore_img']); ?>" border="0"/></a>
                                                        <span>
                                                                &nbsp;
                                                                <b style="color:#333;">
                                                                        <?php echo $data[ 'bscore'] ?>
                                                                </b>
                                                                （
                                                                <?php echo isset($data[ 'is_buyer']) ? $data[ 'haopinglv'] :0?>
                                                                        ）
                                                        </span>
                                                        <img border="0" align="absmiddle" class="rank" src="http://img01.taobaocdn.com/tps/i1/T1GYuIXcRkXXXXXXXX-16-16.png">
                                                </li>
                                                <li>
                                                        <a class='tzlj' href="<?php echo ($data['rateurl']); ?>"><span style="color:#3C3C3C">最近一周：</span><font style='color:#246f9b;font-weight: bold;' title="好评：<?php echo isset($data['is_buyer']) ? $data['score'][0][0] :0?>点　中评：<?php echo isset($data['is_buyer']) ? $data['score'][0][1] :0?>点　差评：<?php echo isset($data['is_buyer']) ? $data['score'][0][2] :0?>点"><?php echo isset($data['is_buyer']) ?array_sum($data['score'][0]) : 0; ?>点</font></a>
                                                </li>
                                                <li>
                                                        <a class='tzlj' href="<?php echo ($data['rateurl']); ?>"><span style="color:#666666">最近一月：</span><font style='color:#246f9b;font-weight: bold;' title="好评：<?php echo isset($data['is_buyer']) ? $data['score'][1][0] :0?>点　中评：<?php echo isset($data['is_buyer']) ? $data['score'][1][1] :0?>点　差评：<?php echo isset($data['is_buyer']) ? $data['score'][1][2] :0?>点"><?php echo isset($data['is_buyer']) ?array_sum($data['score'][1]) : 0; ?>点</font></a>
                                                </li>
                                                <li>
                                                        <a class='tzlj' href="<?php echo ($data['rateurl']); ?>"><span style="color:#828282">最近半年：</span><font style='color:#246f9b;font-weight: bold;' title="好评：<?php echo isset($data['is_buyer']) ? $data['score'][2][0] :0?>点　中评：<?php echo isset($data['is_buyer']) ? $data['score'][2][1] :0?>点　差评：<?php echo isset($data['is_buyer']) ? $data['score'][2][2] :0?>点"><?php echo isset($data['is_buyer']) ?array_sum($data['score'][2]) : 0; ?>点</font></a>
                                                </li>
                                                <li>
                                                        <a class='tzlj' href="<?php echo ($data['rateurl']); ?>"><span style="color:#9D9D9D">半年以前：</span><font style='color:#246f9b;font-weight: bold;' title="好评：<?php echo isset($data['is_buyer']) ? $data['score'][3][0] :0?>点　中评：<?php echo isset($data['is_buyer']) ? $data['score'][3][1] :0?>点　差评：<?php echo isset($data['is_buyer']) ? $data['score'][3][2] :0?>点"><?php echo isset($data['is_buyer']) ?array_sum($data['score'][3]) : 0; ?>点</font></a>
                                                </li>
                                                <!--<li class="f-size-12 f-green">（此帐号已开通淘宝店，买家信用明细无法查询！）</li>-->
                                        </ul>
                                        <ul class="u">
                                                <li>
                                                        <strong>
                                                                卖家信用
                                                        </strong>
                                                        　
                                                        <a class="mini-dsr" href="<?php echo ($data['rateurl']); ?>" target="_blank" style="font: 12px/1.5 tahoma,arial,'Hiragino Sans GB',\5b8b\4f53,sans-serif;">
                                                        <span class="mini-dsr-wrap dsr-wrap-left"></span>
                                                        <span class="dsr-title">描述</span>
                                                        <span class="dsr-num red"><?php echo ($data['dongtai'][0]); ?></span>
                                                        <span class="dsr-split"></span>
                                                        <span class="dsr-title">服务</span>
                                                        <span class="dsr-num red"><?php echo ($data['dongtai'][1]); ?></span>
                                                        <span class="dsr-split"></span>
                                                        <span class="dsr-title">物流</span>
                                                        <span class="dsr-num red"><?php echo ($data['dongtai'][2]); ?></span>
                                                        <span class="mini-dsr-wrap dsr-wrap-right"></span>
                                                        </a>
                                                </li>
                                                <li>
                                                        <a href="<?php echo ($data['rateurl']); ?>" target="_blank"><img src="<?php echo ($data['sscore_img']); ?>" border="0"/></a>
                                                        <span>
                                                                &nbsp;
                                                                <b style="color:#333;">
                                                                        <?php echo $data[ 'sscore'];?>
                                                                </b>
                                                                (
                                                                <?php echo isset($data[ 'is_seller']) ? $data[ 'haopinglv'] :0?>
                                                                        )
                                                        </span>
                                                        <font>
                                                                <a href="<?php echo ($data['rateurl']); ?>" target="_blank">查看店铺</a>
                                                        </font>
                                                </li>
                                                <li>
                                                        <a class='tzlj' href="<?php echo ($data['rateurl']); ?>"><span style="color:#3C3C3C">最近一周：</span><font style='color:#246f9b;font-weight: bold;' title="好评：<?php echo isset($data['is_seller']) ? $data['score'][0][0] :0?>点　中评：<?php echo isset($data['is_seller']) ? $data['score'][0][1] :0?>点　差评：<?php echo isset($data['is_seller']) ? $data['score'][0][2] :0?>点"><?php echo isset($data['is_seller']) ?array_sum($data['score'][0]) : 0; ?>点</font></a>
                                                </li>
                                                <li>
                                                        <a class='tzlj' href="<?php echo ($data['rateurl']); ?>"><span style="color:#666666">最近一月：</span><font style='color:#246f9b;font-weight: bold;' title="好评：<?php echo isset($data['is_seller']) ? $data['score'][1][0] :0?>点　中评：<?php echo isset($data['is_seller']) ? $data['score'][1][1] :0?>点　差评：<?php echo isset($data['is_seller']) ? $data['score'][1][2] :0?>点"><?php echo isset($data['is_seller']) ?array_sum($data['score'][1]) : 0; ?>点</font></a>
                                                </li>
                                                <li>
                                                        <a class='tzlj' href="<?php echo ($data['rateurl']); ?>"><span style="color:#828282">最近半年：</span><font style='color:#246f9b;font-weight: bold;' title="好评：<?php echo isset($data['is_seller']) ? $data['score'][2][0] :0?>点　中评：<?php echo isset($data['is_seller']) ? $data['score'][2][1] :0?>点　差评：<?php echo isset($data['is_seller']) ? $data['score'][2][2] :0?>点"><?php echo isset($data['is_seller']) ?array_sum($data['score'][2]) : 0; ?>点</font></a>
                                                </li>
                                                <li>
                                                        <a class='tzlj' href="<?php echo ($data['rateurl']); ?>"><span style="color:#9D9D9D">半年以前：</span><font style='color:#246f9b;font-weight: bold;' title="好评：<?php echo isset($data['is_seller']) ? $data['score'][3][0] :0?>点　中评：<?php echo isset($data['is_seller']) ? $data['score'][3][1] :0?>点　差评：<?php echo isset($data['is_seller']) ? $data['score'][3][2] :0?>点"><?php echo isset($data['is_seller']) ?array_sum($data['score'][3]) : 0; ?>点</font></a>
                                                </li>
                                                <!--<li class="f-size-12 f-green"></li>-->
                                        </ul>
                                        <div class="clf">
                                        </div>
                                        <!--<div class="position-info other-i msg-green">
                                        <ul>
                                        <li><span>描述相符：</span><font></font></li>
                                        <li><span>服务态度：</span><font></font></li>
                                        <li><span>发货速度：</span><font></font></li>
                                        </ul>
                                        </div>
                                        <div class="position-info other-i msg-blue">
                                        <ul>
                                        <li><span>加载中</span><font>...</font></li>
                                        </ul>
                                        </div>-->
                                </div>
                        </div>
                </div><?php endif; ?>
        </div>
</div>
<script>
        
	/*下拉safe style*/
$('.safe').hover(function(){
	$(".info-block").css('display','block');
});
$('.safe').mouseleave(function (){
	$(".info-block").css('display','none');
});

					
</script>
	<div class="beautiful"><?php echo showAd('siteFooter');?></div>
<!-- 联接 -->
<div class="two_link" >
	<div style="margin: 0px auto; color: rgb(102, 102, 102); width: 790px;">
	<p>淘宝买家信誉的好处： </p>
	1、当买家一周信用点数超出20点，有可能这个号已经被淘宝列入黑名单，所以他再拍的东西，就有可能被列为炒作，卖家有降权危险。 <br>
	2、注册时间小于30天的，容易给他人中评、差评，或有可能是骗子，请谨慎交易！ <br>
	3、如果买家给他人中评或差评过多的，或喜欢随随便便就给他人中、差评的买家。请谨慎交易！免得惹来不必要的麻烦。<br>
	4、每一次查询要大麦都会生成一个记录,方面其他用户查看。详情请点击买家<a target="_blank" href="/Index/getHistory.html" title='历史查询记录'>历史查询记录</a>或<a target="_blank" title='淘宝隐形降权查询' href="/Index/getWeight.html">淘宝隐形降权查询</a>
	</div>
</div>
<!-- 尾巴 -->
<div class="footer">


	<div class="detail">
		<table class="number" cellpadding="0" cellspacing="0">
			<tr>
				<td>
			<div class="total">
				<img width="88" height="31" src="/Public/images/total.png" />
			</div>
			<div class="numbers" clear="left">
				<?php echo ($count); ?>
			</div>
			<div class="once">
				<img width="16" height="27" src="/Public/images/once.png" />
			</div>
				</td>
			</tr>
		</table>
		<div class="font">
			<p class="first">
				<a target="_blank" href="#">联系我们</a> | <a href='javascript:void(0);'>加入收藏</a> | <a href="#">添加桌面</a>
			</p>
			<p>
				<?php echo C('beian');?>
			</p>
			<p>
				<?php echo C('footer_code'); echo C('siteCount');?>
			</p>
		</div>
	</div>

</div>

<!-- 加入收藏 -->
<script>
$(function(){
	$(".font .first a:eq(1)").click(function(){
			Favorite(/index/getmember.html,'<?php echo ($title); ?>');
	});

});
Favorite = function Favorite(sURL, sTitle) {
	try {
		window.external.addFavorite(sURL, sTitle);
	}
	catch (e) {

		try {
			window.sidebar.addPanel(sTitle, sURL, "");
		}

		catch (e) {
			alert("加入收藏失败,请手动添加.");
		}

    }
}
</script>
<?php echo C('baidu_share_code');?>
</body>
</html>
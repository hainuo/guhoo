<?php

//echo strtotime('2013-10-09 10:22:35'.'+1 day');
//$url = 'http://rate.taobao.com/user-rate-UvF8GMCcGvGgG.htm';
//$html = file_get_contents($url);
//$html = iconv('gbk', 'utf-8', $html); 
//if(preg_match('/￥([\d]+)(,[\d]{3})*(\.[\d]{2}){1,1}/',$html,$matches))
//    print_r($matches);
//$html='<a class="shop-name " href="http://leohainuo.taobao.com?spm=a1z0b.7.0.0.kTER9f" data-spm-anchor-id="a1z0b.7.0.0">';
//$data=strip_tags($html);
//var_dump($data);
//$a='1ozJPFJBXXXXXXXXX_!!2-item_pic.png_sum.jpg"/>举报2014夏新款真皮粗跟女士凉鞋简约高跟休闲女鞋鱼嘴鞋33码小码包邮百丽品牌代购站
//
//￥118.00运费：0.00广东广州55人付款17人收货<d';
//$a = preg_replace("/(.*)报/","",$a);
//echo $a;
//
$a='<script>window._bd_share_config={"common":{"bdSnsKey":{},"bdText":"","bdMini":"2","bdMiniList":false,"bdPic":"","bdStyle":"0","bdSize":"16"},"slide":{"type":"slide","bdImg":"7","bdPos":"right","bdTop":"110.5"},"image":{"viewList":["qzone","tsina","tqq","renren","weixin"],"viewText":"分享到：","viewSize":"32"},"selectShare":{"bdContainerClass":null,"bdSelectMiniList":["qzone","tsina","tqq","renren","weixin"]}};with(document)0[(getElementsByTagName("head")[0]||body).appendChild(createElement("script")).src="http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion="+~(-new Date()/36e5)];</script>
';
$b=addslashes($a);
var_dump($a);
var_dump($b);
var_dump(stripslashes($b));

?>
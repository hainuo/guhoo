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

$a='j_huwaiyi';
// var_dump($b);
echo "<pre>";
$b=iconv('UTF-8', 'GBK', $a);
$x=mb_detect_encoding($a);
$y=mb_detect_encoding($b);
var_dump($x,$y);
var_dump(urlencode($b));

$arrayA=array(1,3,2,4,5,6,9,10,100,101);
$arrayB=array(1,2,3,103,7,8,20,21,22,300);

$arrayMerge=array_merge($arrayA,$arrayB);
function bubbleSort($array){
	$count=count($array);
	for($i=0;$i<$count-1;$i++){//循环比较
		for($j=$i+1;$j<$count;$j++){
			if($array[$j]<array[$i]){//执行交换
				$temp=$array[$i];
				$$array[$i]=$array[$j];
				$array[$j]=$temp;
			}
		}
	}
	return$array;
}
var_dump(bubbleSort($arrayMerge));
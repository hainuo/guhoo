<?php
function showAd($keyword) //广告处理方法如果图片为空则不显示该广告
{
    $adModel = M('Ad');
    $ad = $adModel->where('keyword="' . $keyword . '"')->find();
    $html = '';
    if ($ad && !empty($ad['image'])) {
        $html = '<a href="' . $ad['url'] . '" target="_blank" title="' . $ad['name'] . '"><img src="' . $ad['image'] . '" border="0" ';
        //if($keyword=='siteFooter')
        $html .= ' width="960px" height="100px"';
        $html .= '/></a>';
    }
    if (isset($html))
        return $html;
    else
        return '<!-- 暂未设置该广告 -->';
}

function loadConfig($keyword)
{ //此方法是用来，及时更新缓存配置的，如果配置没有更新，则使用此方法更新一次
    $configModel = M('Config')->getFiled('name,value');
    C($Config);
}

function showLink($num = 7)
{
    $linkModel = M('Link');
    $linkInfos = $linkModel->order('id ASC')->select();
    $html = '<p class="footLink" >  友情链接：';
    foreach ($linkInfos as $key => $value) {
        $html .= '<a href="' . $value['url'] . '" target="_blank" index="' . $value['id'] . '" title="' . $value['name'] . '">';
        if ($value['image'])
            $html .= '<img src="' . $value['image'] . '" width="90px" height="20px" />';
        else
            $html .= $value['name'];
        $html .= "</a>";
        if ($key != 0 && $key % $num == 0)
            $html .= '<br />';
    }
    $html .= "</p>";
    echo $html;
}
/*
 * 显示用户查询历史
 *
 */
function showLastHistory($num = 17)
{ //默认取十条数据
    $data = M('Member')->order('create_time DESC')->limit($num)->select();
    $html = '';
    if ($data) {
        foreach ($data as $k => $v) {
            $html .= '<li class="lastHistory"><a href="/getMember/username/' .$v['username'] . '.html" target="_blank" title = " '.addslashes( $v['username']).'">';
            $html .=msubstr($v['username'],0,10,'utf-8',false)   . '</a></li>';
        }
        $html .= "<li class='more'><a href='/getHistory.html' target='_blank'>查看更多</a></li>";
        echo $html;
    } else {
        echo '快来查询一个人吧！';
    }
}
function showNews($limit=10){
    $data=D('Article')->order('create_time DESC')->limit($limit)->select();
    $code="<ul >";
    if($data)
        foreach($data as $val){
            $code.='<li><a href="/News/'.$val['id'].'.html" target="_blank" title="'.$val['title'].'">';
            $code.=$val['title'];
            $code.="</a></li>";
        }
    $code.='</ul>';
    echo $code;
}
/**
 * 字符串截取，支持中文和其他编码
 * @static
 * @access public
 * @param string $str 需要转换的字符串
 * @param string $start 开始位置
 * @param string $length 截取长度
 * @param string $charset 编码格式
 * @param string $suffix 截断显示字符
 * @return string
 */
function msubstr($str, $start = 0, $length, $charset = "utf-8", $suffix = true)
{
    if (function_exists("mb_substr"))
        $slice = mb_substr($str, $start, $length, $charset);
    elseif (function_exists('iconv_substr')) {
        $slice = iconv_substr($str, $start, $length, $charset);
        if (false === $slice) {
            $slice = '';
        }
    } else {
        $re['utf-8'] = "/[\x01-\x7f]|[\xc2-\xdf][\x80-\xbf]|[\xe0-\xef][\x80-\xbf]{2}|[\xf0-\xff][\x80-\xbf]{3}/";
        $re['gb2312'] = "/[\x01-\x7f]|[\xb0-\xf7][\xa0-\xfe]/";
        $re['gbk'] = "/[\x01-\x7f]|[\x81-\xfe][\x40-\xfe]/";
        $re['big5'] = "/[\x01-\x7f]|[\x81-\xfe]([\x40-\x7e]|\xa1-\xfe])/";
        preg_match_all($re[$charset], $str, $match);
        $slice = join("", array_slice($match[0], $start, $length));
    }
    return $suffix ? $slice . '...' : $slice;
}
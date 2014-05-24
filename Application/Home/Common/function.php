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

function showLastHistory($num = 17)
{ //默认取十条数据
    $data = M('Member')->order('create_time DESC')->limit($num)->select();
    $html = '';
    if ($data) {
        foreach ($data as $k => $v) {
            $html .= '<li class="lastHistory"><a href="/Index/getWeight/username/' . $v['username'] . '.html" target="_blank" >';
            $html .= $v['username'] . '</a></li>';
        }
        $html .= "<li class='more'><a href='/Index/getHistory.html' target='_blank'>查看更多</a></li>";
        echo $html;
    } else {
        echo '快来查询一个人吧！';
    }
}

?>
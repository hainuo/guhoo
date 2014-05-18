<?php
	function showAd( $keyword )
	{
		$adModel= M('Ad');
		$ad=$adModel->where('keyword="'.$keyword.'"')->find();
		if($ad){
			$html='<a href="'.$ad['url'].'" target="_blank" title="'.$ad['name'].'"><img src="'.$ad['image'].'" border="0" ';
			if($keyword=='siteFooter')
				$html .= ' width="960px" height="100px"';
			$html.='/></a>';
		}
		if($html) 
			return $html;
		else
		return '<!-- 暂未设置该广告 -->';
	}
	function loadConfig($keyword){//此方法是用来，及时更新缓存配置的，如果配置没有更新，则使用此方法更新一次
		$configModel=M('Config')->getFiled('name,value');
		C($Config);
	}

?>
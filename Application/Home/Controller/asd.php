<?php 	
	$url = 'http://member1.taobao.com/member/user_profile.jhtml?user_id='.urlencode(iconv('utf-8', 'gbk', I('post.username')));
			if ($html = file_get_contents($url)) {
				$html=iconv('gbk', 'utf-8', $html);
				if (strpos($html, '該用戶已經被查封') !== false || strpos($html, '该用户已经被查封')) {
					$this->error('该用户被查封');
				}
				if (preg_match('/http:\/\/rate\.taobao\.com\/user-rate-(\w+)\.htm/', $html, $matches)) {//(匹配到说明是买家，否则是卖家)
					$url = $matches[0];//信誉页面

					$sid = $matches[1];
					//卖家UvFx4vmg4MmcT
					//买家742c9fb82e010f2ffd04e140f917fda9
					$regTime = 0; //初始化时间
					$area    = ''; //初始化地区
					if (preg_match('/注册时间：\s*(\d+)年(\d+)月(\d+)日/', $html, $matches)) {
						
						$regTime = mktime(0, 0, 0, $matches[2], $matches[3], $matches[1]);
						$regTime += rand(6 * 3600, 86399);//提取注册时间戳 

					}// else return self::$msgList['getMember'];
					if (preg_match('/<li>所 在 地：(.+?)<\/li>/', $html, $matches)) {
						$area = $matches[1];//提取地区
					}
						if ($html = file_get_contents($url)) {

	                    $html=iconv('gbk', 'utf-8', $html);

						if (!$regTime) { //如果是卖家
							
							if (preg_match('/<input[^>]*name="shopStartDate"[^>]*value="(\d+)-(\d+)-(\d+)"[^>]*>/', $html, $matches)) {
								$regTime = mktime(0, 0, 0, $matches[2], $matches[3], $matches[1]);
								$regTime += rand(6 * 3600, 86399);
							} elseif (preg_match('/创店时间：.*?(\d+)-(\d+)-(\d+)/', $html, $matches)) {
								$regTime = mktime(0, 0, 0, $matches[2], $matches[3], $matches[1]);
								$regTime += rand(6 * 3600, 86399);
							}
						}
						if (!$area) {
							if (preg_match('/所在地区：\s*([^\s<]+)\s*</', $html, $matches)) {
								$area = $matches[1];
							}
						}

						$area == '&nbsp;' && $area = '';

						$isSeller = false;

	                    $p_flag=preg_match('/userId: \'(\d+)\'/', $html, $matches); //匹配卖家 userid
	                   	
	                    if(!$p_flag)  $p_flag=preg_match('/userID: \'(\w+)\'/', $html, $matches);
	                    
					    	if ($p_flag) {
							$uid = $matches[1];
							$rs = array(
								'id'       => $uid,
								'sid'      => $sid,
								'area'     => $area,
								'regTime'  => $regTime,
								'utype'    => 0,
								'isSeller' => $isSeller ? 1 : 0,
								'isTmall'  => 0,
								'bscore'   => 0,
								'bscore00' => 0,
								'bscore01' => 0,
								'bscore02' => 0,
								'bscore10' => 0,
								'bscore11' => 0,
								'bscore12' => 0,
								'bscore20' => 0,
								'bscore21' => 0,
								'bscore22' => 0,
								'bscore30' => 0,
								'bscore31' => 0,
								'bscore32' => 0,
								'sscore'   => 0,
								'sscore00' => 0,
								'sscore01' => 0,
								'sscore02' => 0,
								'sscore10' => 0,
								'sscore11' => 0,
								'sscore12' => 0,
								'sscore20' => 0,
								'sscore21' => 0,
								'sscore22' => 0,
								'sscore30' => 0,
								'sscore31' => 0,
								'sscore32' => 0
							);

							if (preg_match('/卖家信用：\s*(\d+)/', $html, $matches)) {
								$rs['sscore'] = intval($matches[1]);
							}
							$isTmall = strpos($html, 'tmall-pro') !== false;
							if ($isTmall) {
								$isSeller = true;
							} else {
								$isSeller = $rs['sscore'] > 0;
							}
							$rs['isSeller'] = $isSeller ? 1 : 0;
							if (preg_match('/买家信用：\s*(\d+)/', $html, $matches)) {
								$rs['bscore'] = intval($matches[1]);
							}
							$scoreArr = array();

							if (!$isTmall) {
								
								$scoreArr = self::getScore($html,$rs['isSeller']);
								//if (!is_array($scoreArr)) return $scoreArr;
							} else {
								$rs['isTmall'] = 1;
								$isSeller = true;
							}
							$scoreName = '';
							if ($isSeller) {//卖家
								$scoreName = 'sscore';
							} else {//买家
								$scoreName = 'bscore';
								if (!$rs['bscore']) {
									if (preg_match('/买家信用：\s*<a.*?>(\d+)<\/a>/', $html, $matches)) {
										$rs['bscore'] = intval($matches[1]);
									}
								}
							}
							if (strpos($html, '支付宝实名认证')         !== false) $rs['utype'] |= 1;
							if (strpos($html, '支付宝个人认证')         !== false) $rs['utype'] |= 1;
							if (strpos($html, '淘宝个人实名认证')       !== false) $rs['utype'] |= 1 << 1;
							if (strpos($html, '手机验证')               !== false) $rs['utype'] |= 1 << 2;
							if (strpos($html, '网店经营者营业执照信息') !== false) $rs['utype'] |= 1 << 3;//网店经营者营业执照信息
							if (!$isTmall && is_array($scoreArr)) {
								foreach ($scoreArr as $k => $v) {
									$rs[$scoreName.$k.'0'] = $v[0];
									$rs[$scoreName.$k.'1'] = $v[1];
									$rs[$scoreName.$k.'2'] = $v[2];
								}
							}
	                      
							print_r($rs);
						}
					}
				}
			}
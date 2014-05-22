# SQL-Front 5.1  (Build 4.16)

/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE */;
/*!40101 SET SQL_MODE='NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES */;
/*!40103 SET SQL_NOTES='ON' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS */;
/*!40014 SET FOREIGN_KEY_CHECKS=0 */;


# Host: localhost    Database: taobao
# ------------------------------------------------------
# Server version 5.5.36

DROP DATABASE IF EXISTS `taobao`;
CREATE DATABASE `taobao` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `taobao`;

#
# Source for table taobao_ad
#

DROP TABLE IF EXISTS `taobao_ad`;
CREATE TABLE `taobao_ad` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `keyword` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `remark` varchar(5000) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

#
# Dumping data for table taobao_ad
#

LOCK TABLES `taobao_ad` WRITE;
/*!40000 ALTER TABLE `taobao_ad` DISABLE KEYS */;
INSERT INTO `taobao_ad` VALUES (1,'siteHeader','','','站点顶部  宽960px 高100px','');
INSERT INTO `taobao_ad` VALUES (2,'siteFooter','http://www.baidu.com','','站点底部  宽960px 高100px','百度新闻');
/*!40000 ALTER TABLE `taobao_ad` ENABLE KEYS */;
UNLOCK TABLES;

#
# Source for table taobao_admin
#

DROP TABLE IF EXISTS `taobao_admin`;
CREATE TABLE `taobao_admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

#
# Dumping data for table taobao_admin
#

LOCK TABLES `taobao_admin` WRITE;
/*!40000 ALTER TABLE `taobao_admin` DISABLE KEYS */;
INSERT INTO `taobao_admin` VALUES (1,'admin','21232f297a57a5a743894a0e4a801fc3');
/*!40000 ALTER TABLE `taobao_admin` ENABLE KEYS */;
UNLOCK TABLES;

#
# Source for table taobao_config
#

DROP TABLE IF EXISTS `taobao_config`;
CREATE TABLE `taobao_config` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL COMMENT '配置名',
  `value` longtext COMMENT '配置值',
  `remark` varchar(255) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;

#
# Dumping data for table taobao_config
#

LOCK TABLES `taobao_config` WRITE;
/*!40000 ALTER TABLE `taobao_config` DISABLE KEYS */;
INSERT INTO `taobao_config` VALUES (1,'DATA_CACHE_TIME','3600','前台数据缓存时长，以秒计算');
INSERT INTO `taobao_config` VALUES (2,'getMember_title','淘宝信誉查询_淘宝买家信用查询_卖家信用查询_淘宝小号查询_粉兔兔信誉查询','信誉查询页面标题');
INSERT INTO `taobao_config` VALUES (3,'getMember_description','粉兔兔淘宝信誉查询网站,免费提供淘宝买家信誉查询,卖家信誉查询,淘宝信用等级查询等各项淘宝信誉查询服务,是淘宝防降权,淘宝小号查询必备工具箱。','信誉查询页面说明');
INSERT INTO `taobao_config` VALUES (4,'getMember_keyWords','粉兔兔工具箱,淘宝信誉查询,淘宝小号查询,买家信誉查询,淘宝卖家工具,粉兔兔','信誉查询页面关键字');
INSERT INTO `taobao_config` VALUES (5,'getWeight_title','淘宝隐形降权查询_淘宝宝贝隐形降权查询_商品隐形降权查询_淘宝店铺隐形降权查询_粉兔兔隐性降权查询','隐性降权查询页面标题');
INSERT INTO `taobao_config` VALUES (6,'getWeight_description','粉兔兔信誉查询网站,免费提供淘宝买家信誉查询,淘宝卖家信誉查询,淘宝信用等级查询等各项淘宝信誉查询服务,是淘宝防降权,淘宝小号查询必备工具箱。粉兔兔隐性降权查询工具箱，您的贴身助手','隐性降权查询页面说明');
INSERT INTO `taobao_config` VALUES (7,'getWeight_keyWords','粉兔兔,淘宝信誉查询,淘宝小号查询,买家信誉查询,淘宝卖家工具,粉兔兔卖家助手','隐性降权查询页面关键字');
INSERT INTO `taobao_config` VALUES (8,'getRank_title','淘宝信誉查询_宝贝排名查询_粉兔兔卖家工具箱_粉兔兔排名助手','宝贝排名查询页面标题');
INSERT INTO `taobao_config` VALUES (9,'getRank_description','粉兔兔信誉查询网站,免费提供淘宝买家信誉查询,淘宝卖家信誉查询,淘宝信用等级查询等各项淘宝信誉查询服务,是淘宝防降权,淘宝小号查询必备工具箱。粉兔兔贴身宝贝排名助手','宝贝排名查询页面说明');
INSERT INTO `taobao_config` VALUES (10,'getRank_keyWords','粉兔兔宝贝排名,淘宝信誉查询,淘宝小号查询,买家信誉查询,淘宝卖家工具,粉兔兔贴身排名助手','宝贝排名查询页面关键字');
INSERT INTO `taobao_config` VALUES (11,'getExpress_title','快递查询_粉兔兔卖家工具箱_粉兔兔邮件快查','快递查询页面标题');
INSERT INTO `taobao_config` VALUES (12,'getExpress_description','粉兔兔快递速查网站，淘宝信誉查询网站,免费提供淘宝买家信誉查询,淘宝卖家信誉查询,淘宝信用等级查询等各项淘宝信誉查询服务,是淘宝防降权,淘宝小号查询必备工具箱。','快递查询页面说明');
INSERT INTO `taobao_config` VALUES (13,'getExpress_keyWords','粉兔兔,淘宝信誉查询,淘宝小号查询,买家信誉查询,淘宝卖家工具,粉兔兔邮件快查助手,粉兔兔贴身助手，邮件贴身管家','快递查询页面关键字');
INSERT INTO `taobao_config` VALUES (14,'getHistory_title','淘宝信誉查询_粉兔兔卖家工具箱_粉兔兔工具快查中心','查询历史页面标题');
INSERT INTO `taobao_config` VALUES (15,'getHistory_description','粉兔兔信誉查询网站,免费提供淘宝买家信誉查询,淘宝卖家信誉查询,淘宝信用等级查询等各项淘宝信誉查询服务,是淘宝防降权,淘宝小号查询必备工具箱。粉兔兔贴身管家','历史记录页面说明');
INSERT INTO `taobao_config` VALUES (16,'getHistory_keyWords','粉兔兔,淘宝信誉查询,淘宝小号查询,买家信誉查询,淘宝卖家工具,粉兔兔查询助手，粉兔兔淘宝助手','历史记录页面关键字');
INSERT INTO `taobao_config` VALUES (17,'baidu_share_code','<div class=\"bdsharebuttonbox\"><a href=\"#\" class=\"bds_more\" data-cmd=\"more\"></a><a href=\"#\" class=\"bds_mshare\" data-cmd=\"mshare\" title=\"分享到一键分享\"></a><a href=\"#\" class=\"bds_qzone\" data-cmd=\"qzone\" title=\"分享到QQ空间\"></a><a href=\"#\" class=\"bds_qq\" data-cmd=\"qq\" title=\"分享到QQ收藏\"></a><a href=\"#\" class=\"bds_tsina\" data-cmd=\"tsina\" title=\"分享到新浪微博\"></a><a href=\"#\" class=\"bds_tqq\" data-cmd=\"tqq\" title=\"分享到腾讯微博\"></a><a href=\"#\" class=\"bds_renren\" data-cmd=\"renren\" title=\"分享到人人网\"></a><a href=\"#\" class=\"bds_weixin\" data-cmd=\"weixin\" title=\"分享到微信\"></a><a href=\"#\" class=\"bds_sqq\" data-cmd=\"sqq\" title=\"分享到QQ好友\"></a><a href=\"#\" class=\"bds_bdysc\" data-cmd=\"bdysc\" title=\"分享到百度云收藏\"></a><a href=\"#\" class=\"bds_diandian\" data-cmd=\"diandian\" title=\"分享到点点网\"></a><a href=\"#\" class=\"bds_ty\" data-cmd=\"ty\" title=\"分享到天涯社区\"></a></div>\n<script>window._bd_share_config={\"common\":{\"bdSnsKey\":{},\"bdText\":\"\",\"bdMini\":\"2\",\"bdMiniList\":false,\"bdPic\":\"\",\"bdStyle\":\"1\",\"bdSize\":\"16\"},\"share\":{}};with(document)0[(getElementsByTagName(\'head\')[0]||body).appendChild(createElement(\'script\')).src=\'http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=\'+~(-new Date()/36e5)];</script>','百度分享代码');
INSERT INTO `taobao_config` VALUES (18,'baian','<a href=\'http://www.miitbeian.gov.cn/\' target=\"_blank\">沪ICP备13001718</a>','备案编号');
INSERT INTO `taobao_config` VALUES (19,'footer_code','Copyright © 2013 粉兔兔.保留所有权利。','底部自定义代码');
INSERT INTO `taobao_config` VALUES (24,'getDongtai_title','1','宝贝动态评分页面标题');
INSERT INTO `taobao_config` VALUES (25,'getDongtai_keyWords','2','宝贝动态评分页面关键字');
INSERT INTO `taobao_config` VALUES (26,'getDongtai_discription','3','宝贝动态评分页面说明');
/*!40000 ALTER TABLE `taobao_config` ENABLE KEYS */;
UNLOCK TABLES;

#
# Source for table taobao_goods
#

DROP TABLE IF EXISTS `taobao_goods`;
CREATE TABLE `taobao_goods` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL COMMENT '店家',
  `itemid` varchar(255) DEFAULT NULL COMMENT '商品id',
  `title` varchar(255) DEFAULT NULL COMMENT '商品title',
  `href` varchar(255) DEFAULT NULL COMMENT '商品地址',
  `xl_index` int(11) DEFAULT NULL COMMENT '销量排行名次',
  `price` float DEFAULT NULL COMMENT '价格',
  `currentPrice` float DEFAULT NULL COMMENT '当前价格',
  `tradenum` int(11) DEFAULT NULL COMMENT '销量',
  `commend` int(11) DEFAULT NULL COMMENT '点评数',
  `commendHref` varchar(255) DEFAULT NULL COMMENT '点评地址',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `page` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=158 DEFAULT CHARSET=utf8;

#
# Dumping data for table taobao_goods
#

LOCK TABLES `taobao_goods` WRITE;
/*!40000 ALTER TABLE `taobao_goods` DISABLE KEYS */;
INSERT INTO `taobao_goods` VALUES (1,'yuzunyi0423','19684746474','【官网移动/联通/电信+现货+送豪礼】MIUI/小米 红米手机 红米1S','http://item.taobao.com/item.htm?id=19684746474&pm2=1',1,891,799,4609,6187,'http://item.taobao.com/item.htm?id=19684746474&pm2=1&on_comment=1','2014-05-22 11:44:13',1);
INSERT INTO `taobao_goods` VALUES (2,'yuzunyi0423','17431892080','【官网原封移动/联通/电信版】MIUI/小米 小米手机3 M3小米3代Mi3','http://item.taobao.com/item.htm?id=17431892080&pm2=2',2,1831,1699,1009,9628,'http://item.taobao.com/item.htm?id=17431892080&pm2=2&on_comment=1','2014-05-22 11:44:13',1);
INSERT INTO `taobao_goods` VALUES (3,'yuzunyi0423','37047811660','原封包邮现货Huawei/华为 G750-T00  荣耀3X 畅玩版八核双卡手机','http://item.taobao.com/item.htm?id=37047811660&pm2=3',3,1208,1058,209,633,'http://item.taobao.com/item.htm?id=37047811660&pm2=3&on_comment=1','2014-05-22 11:44:13',1);
INSERT INTO `taobao_goods` VALUES (4,'yuzunyi0423','37128636846','【现货当天发+豪礼】Coolpad/酷派 8297 大神F1 移动3g手机有联通','http://item.taobao.com/item.htm?id=37128636846',4,1037,878,99,288,'http://item.taobao.com/item.htm?id=37128636846&on_comment=1','2014-05-22 11:44:13',1);
INSERT INTO `taobao_goods` VALUES (5,'yuzunyi0423','37051905146','原封包邮当天发Huawei/华为 H30-T00华为荣耀3C智能华为手机 正品','http://item.taobao.com/item.htm?id=37051905146',5,929,818,145,666,'http://item.taobao.com/item.htm?id=37051905146&on_comment=1','2014-05-22 11:44:13',1);
INSERT INTO `taobao_goods` VALUES (6,'yuzunyi0423','17020535642','官网原封现货送豪礼 MIUI/小米 2S(MI2S)手机 M2S 标准/电信 正品','http://item.taobao.com/item.htm?id=17020535642',6,1609,1378,161,2607,'http://item.taobao.com/item.htm?id=17020535642&on_comment=1','2014-05-22 11:44:13',1);
INSERT INTO `taobao_goods` VALUES (7,'yuzunyi0423','36126219578','小米手机 M3手机 官网原装至简翻盖支架保护套 小米3原装皮套包邮','http://item.taobao.com/item.htm?id=36126219578',7,42,35,58,251,'http://item.taobao.com/item.htm?id=36126219578&on_comment=1','2014-05-22 11:44:13',1);
INSERT INTO `taobao_goods` VALUES (8,'yuzunyi0423','36289362160','【官网移动/联通/电信+现货+送豪礼】MIUI/小米 红米1S 红米手机','http://item.taobao.com/item.htm?id=36289362160',8,891,799,80,29,'http://item.taobao.com/item.htm?id=36289362160&on_comment=1','2014-05-22 11:44:13',1);
INSERT INTO `taobao_goods` VALUES (9,'yuzunyi0423','38669630806','小米路由器 官网原封当天发带票 无线智能双频5G MIWIFI穿墙王','http://item.taobao.com/item.htm?id=38669630806',9,799,699,128,41,'http://item.taobao.com/item.htm?id=38669630806&on_comment=1','2014-05-22 11:44:13',1);
INSERT INTO `taobao_goods` VALUES (10,'yuzunyi0423','38485624442','小米原装移动电源正品10400mAh毫安 小米3 红米手机平板充电宝','http://item.taobao.com/item.htm?id=38485624442',10,69,69,33,11,'http://item.taobao.com/item.htm?id=38485624442&on_comment=1','2014-05-22 11:44:13',1);
INSERT INTO `taobao_goods` VALUES (11,'yuzunyi0423','39010723312','【名品数码/预售最先到】MIUI/小米 小米平板米pad 平板 火爆预售','http://item.taobao.com/item.htm?id=39010723312',11,1499,1499,25,0,'http://item.taobao.com/item.htm?id=39010723312&on_comment=1','2014-05-22 11:44:13',1);
INSERT INTO `taobao_goods` VALUES (12,'yuzunyi0423','17895914687','【名品数码】小米M2A原装电池小米2手机电池 2S 小米红米电池正品','http://item.taobao.com/item.htm?id=17895914687',12,49,49,35,108,'http://item.taobao.com/item.htm?id=17895914687&on_comment=1','2014-05-22 11:44:13',1);
INSERT INTO `taobao_goods` VALUES (13,'yuzunyi0423','38233859256','包邮MIUI/小米 手机壳红米手机1S红米NOTE 翻盖水钻保护皮套手工','http://item.taobao.com/item.htm?id=38233859256',13,29,29,29,9,'http://item.taobao.com/item.htm?id=38233859256&on_comment=1','2014-05-22 11:44:13',1);
INSERT INTO `taobao_goods` VALUES (14,'yuzunyi0423','38261864461','原封包邮现货Huawei/华为 荣耀3X 畅玩版G750-T01 八核双卡手机','http://item.taobao.com/item.htm?id=38261864461',14,1088,968,10,10,'http://item.taobao.com/item.htm?id=38261864461&on_comment=1','2014-05-22 11:44:13',1);
INSERT INTO `taobao_goods` VALUES (15,'yuzunyi0423','38116298543','【名品数码】包邮MIUI/小米 手机壳小米皮套M3翻盖水钻保护套手工','http://item.taobao.com/item.htm?id=38116298543',15,39,29,17,6,'http://item.taobao.com/item.htm?id=38116298543&on_comment=1','2014-05-22 11:44:13',1);
INSERT INTO `taobao_goods` VALUES (16,'yuzunyi0423','35014363476','【名品数码】小米官网正品红米电池原装红米手机电池','http://item.taobao.com/item.htm?id=35014363476',16,49,49,29,79,'http://item.taobao.com/item.htm?id=35014363476&on_comment=1','2014-05-22 11:44:13',1);
INSERT INTO `taobao_goods` VALUES (17,'yuzunyi0423','38279064094','小米官网正品 小米随身wifi 迷你无线wifi路由器 移动wifi路由360','http://item.taobao.com/item.htm?id=38279064094',17,19.9,19.9,16,4,'http://item.taobao.com/item.htm?id=38279064094&on_comment=1','2014-05-22 11:44:13',1);
INSERT INTO `taobao_goods` VALUES (18,'yuzunyi0423','37653532595','【现货+包邮+送豪礼】Huawei/华为 荣耀X1 7D-501u 四核7寸屏','http://item.taobao.com/item.htm?id=37653532595',18,1787,1688,6,36,'http://item.taobao.com/item.htm?id=37653532595&on_comment=1','2014-05-22 11:44:13',1);
INSERT INTO `taobao_goods` VALUES (19,'yuzunyi0423','37097460963','小米活塞耳机 原装正品 红米 M2S耳机小米3耳机2A 1S M2线控耳机','http://item.taobao.com/item.htm?id=37097460963',19,69,69,16,32,'http://item.taobao.com/item.htm?id=37097460963&on_comment=1','2014-05-22 11:44:13',1);
INSERT INTO `taobao_goods` VALUES (20,'yuzunyi0423','37218399099','小米红米手机后壳 拆原装电池后盖 白色手机壳 红色保护壳 现货','http://item.taobao.com/item.htm?id=37218399099',20,19,19,26,36,'http://item.taobao.com/item.htm?id=37218399099&on_comment=1','2014-05-22 11:44:13',1);
INSERT INTO `taobao_goods` VALUES (21,'yuzunyi0423','37078719640','【名品】小米原装贴膜 M3原装贴膜 手机保护膜小米3贴膜MI3两片装','http://item.taobao.com/item.htm?id=37078719640',21,9,9,14,24,'http://item.taobao.com/item.htm?id=37078719640&on_comment=1','2014-05-22 11:44:13',1);
INSERT INTO `taobao_goods` VALUES (22,'yuzunyi0423','17959938811','【名品数码】小米 原装 MI3 M3 米2 M2S 红米 高透贴膜 2S 两片装','http://item.taobao.com/item.htm?id=17959938811',22,9,9,13,28,'http://item.taobao.com/item.htm?id=17959938811&on_comment=1','2014-05-22 11:44:13',1);
INSERT INTO `taobao_goods` VALUES (23,'yuzunyi0423','38313035117','小米2/2s手机屏幕防刮钢化玻璃保护膜 MI2S手机防摔高清保护贴膜','http://item.taobao.com/item.htm?id=38313035117',23,35,35,8,1,'http://item.taobao.com/item.htm?id=38313035117&on_comment=1','2014-05-22 11:44:13',1);
INSERT INTO `taobao_goods` VALUES (24,'yuzunyi0423','38360278274','【现货当天发+豪礼】Coolpad/酷派 8297W大神F1 联通3g手机有移动','http://item.taobao.com/item.htm?id=38360278274',24,1037,878,6,2,'http://item.taobao.com/item.htm?id=38360278274&on_comment=1','2014-05-22 11:44:13',1);
INSERT INTO `taobao_goods` VALUES (25,'yuzunyi0423','38248478056','【原封当天发+包邮+延保+豪礼】Huawei/华为 H30-U10 荣耀3C手机','http://item.taobao.com/item.htm?id=38248478056',25,929,818,12,7,'http://item.taobao.com/item.htm?id=38248478056&on_comment=1','2014-05-22 11:44:13',1);
INSERT INTO `taobao_goods` VALUES (26,'yuzunyi0423','38704922482','小米活塞简装耳机 原装正品 红米 M2S耳机小米3 2A 1S M2线控耳机','http://item.taobao.com/item.htm?id=38704922482',26,45,45,11,5,'http://item.taobao.com/item.htm?id=38704922482&on_comment=1','2014-05-22 11:44:13',1);
INSERT INTO `taobao_goods` VALUES (27,'yuzunyi0423','17925421476','真正原装MIUI/小米M2 M2S M2A红米线控耳机小米正品耳机活塞耳机','http://item.taobao.com/item.htm?id=17925421476',27,99,99,10,164,'http://item.taobao.com/item.htm?id=17925421476&on_comment=1','2014-05-22 11:44:13',1);
INSERT INTO `taobao_goods` VALUES (28,'yuzunyi0423','18872970530','官网原装 M2/2S亮彩高光后盖小米手机 M2/2S暗彩电池盖 正品特价','http://item.taobao.com/item.htm?id=18872970530',28,39,39,9,33,'http://item.taobao.com/item.htm?id=18872970530&on_comment=1','2014-05-22 11:44:13',1);
INSERT INTO `taobao_goods` VALUES (29,'yuzunyi0423','38010382048','现货当天发 Nokia/诺基亚X 诺基亚 X 正品行货 双卡安卓版系统','http://item.taobao.com/item.htm?id=38010382048',29,819,599,5,13,'http://item.taobao.com/item.htm?id=38010382048&on_comment=1','2014-05-22 11:44:13',1);
INSERT INTO `taobao_goods` VALUES (30,'yuzunyi0423','38349749543','【蓝白现货】K-Touch/天语 nibiru火星一号H1 尼比鲁八核智能手机','http://item.taobao.com/item.htm?id=38349749543',30,1108,998,3,2,'http://item.taobao.com/item.htm?id=38349749543&on_comment=1','2014-05-22 11:44:13',1);
INSERT INTO `taobao_goods` VALUES (31,'yuzunyi0423','17591005401','M2 二代小米手机2代 小米2S 3100 毫安大电池加厚后盖 原装正品','http://item.taobao.com/item.htm?id=17591005401',31,55,55,6,61,'http://item.taobao.com/item.htm?id=17591005401&on_comment=1','2014-05-22 11:44:13',1);
INSERT INTO `taobao_goods` VALUES (32,'yuzunyi0423','38712008175','note红米后盖 彩色后盖 红米note手机后盖 红米note原装后盖现货','http://item.taobao.com/item.htm?id=38712008175',32,29,29,3,0,'http://item.taobao.com/item.htm?id=38712008175&on_comment=1','2014-05-22 11:44:13',1);
INSERT INTO `taobao_goods` VALUES (33,'yuzunyi0423','22385763112','纯原封Apple/苹果 iPhone 5S原封港版 国行 三网V版 苹果5s土豪金','http://item.taobao.com/item.htm?id=22385763112',33,4320,4289,3,14,'http://item.taobao.com/item.htm?id=22385763112&on_comment=1','2014-05-22 11:44:13',1);
INSERT INTO `taobao_goods` VALUES (34,'yuzunyi0423','9878204244','【名品数码】★大学生创业★皇冠信用★ 立体声蓝牙耳机','http://item.taobao.com/item.htm?id=9878204244',34,66,66,5,7,'http://item.taobao.com/item.htm?id=9878204244&on_comment=1','2014-05-22 11:44:13',1);
INSERT INTO `taobao_goods` VALUES (35,'yuzunyi0423','19433503715','小米盒子2 新小米盒子电视机顶盒 高清网络机顶盒 送OTG线','http://item.taobao.com/item.htm?id=19433503715',35,310,310,10,28,'http://item.taobao.com/item.htm?id=19433503715&on_comment=1','2014-05-22 11:44:13',1);
INSERT INTO `taobao_goods` VALUES (36,'yuzunyi0423','38342420172','红米手机钢化玻璃保护膜 小米钢化防刮防爆手机贴膜 手机保护膜','http://item.taobao.com/item.htm?id=38342420172',36,36,36,4,2,'http://item.taobao.com/item.htm?id=38342420172&on_comment=1','2014-05-22 11:44:13',1);
INSERT INTO `taobao_goods` VALUES (37,'yuzunyi0423','38457067591','小米官网正品红米清水软胶保护套红米手机保护套保护壳后盖配件','http://item.taobao.com/item.htm?id=38457067591',37,39,39,4,4,'http://item.taobao.com/item.htm?id=38457067591&on_comment=1','2014-05-22 11:44:13',1);
INSERT INTO `taobao_goods` VALUES (38,'yuzunyi0423','38182248531','【现货】TCL S720t 么么哒 真八核5.5黑钻屏 双卡双待智能 移动3G','http://item.taobao.com/item.htm?id=38182248531',38,789,778,0,3,'http://item.taobao.com/item.htm?id=38182248531&on_comment=1','2014-05-22 11:44:13',1);
INSERT INTO `taobao_goods` VALUES (39,'yuzunyi0423','38447366507','【四皇冠+已经到货+送豪礼 】中兴V5 红牛手机 4G手机ZTE/中兴V5S','http://item.taobao.com/item.htm?id=38447366507',39,898,798,4,3,'http://item.taobao.com/item.htm?id=38447366507&on_comment=1','2014-05-22 11:44:13',1);
INSERT INTO `taobao_goods` VALUES (40,'yuzunyi0423','39093389958','【现货】ZTE/中兴 STAR1 S2002 4G金属 1号智能机手机 星星一号','http://item.taobao.com/item.htm?id=39093389958',40,1399,1399,0,0,'http://item.taobao.com/item.htm?id=39093389958&on_comment=1','2014-05-22 11:44:13',1);
INSERT INTO `taobao_goods` VALUES (41,'yuzunyi0423','17841768534','【名品数码】大学生创业Samsung/三星 I9300 GALAXY SIII现货包邮','http://item.taobao.com/item.htm?id=17841768534',41,1996,1695,0,3,'http://item.taobao.com/item.htm?id=17841768534&on_comment=1','2014-05-22 11:44:13',1);
INSERT INTO `taobao_goods` VALUES (42,'yuzunyi0423','23777160937','【名品数码】 小米2和2S通用 原装后壳 MI2极简原色后盖（7色）','http://item.taobao.com/item.htm?id=23777160937',42,55,55,2,7,'http://item.taobao.com/item.htm?id=23777160937&on_comment=1','2014-05-22 11:44:13',1);
INSERT INTO `taobao_goods` VALUES (43,'yuzunyi0423','38182485005','【名品数码】包邮MIUI/小米手机壳皮套M2 2S翻盖水钻保护皮套手工','http://item.taobao.com/item.htm?id=38182485005',43,29,29,3,5,'http://item.taobao.com/item.htm?id=38182485005&on_comment=1','2014-05-22 11:44:13',1);
INSERT INTO `taobao_goods` VALUES (44,'yuzunyi0423','38266433880','小米官网正品 小米移动电源5200mAh 小米3红米手机平板通用充电宝','http://item.taobao.com/item.htm?id=38266433880',44,49,49,3,3,'http://item.taobao.com/item.htm?id=38266433880&on_comment=1','2014-05-22 11:44:13',1);
INSERT INTO `taobao_goods` VALUES (45,'yuzunyi0423','18887193573','【名品数码】小米2A原装后盖MI2A亮彩高光电池盖手机壳官网正品','http://item.taobao.com/item.htm?id=18887193573',45,49,49,0,0,'http://item.taobao.com/item.htm?id=18887193573&on_comment=1','2014-05-22 11:44:13',1);
INSERT INTO `taobao_goods` VALUES (46,'yuzunyi0423','18389725326','现货包邮Samsung/三星 GALAXY S4 I9500 i9508 i9502 i959 盖世4','http://item.taobao.com/item.htm?id=18389725326',46,2850,2850,0,15,'http://item.taobao.com/item.htm?id=18389725326&on_comment=1','2014-05-22 11:44:13',1);
INSERT INTO `taobao_goods` VALUES (47,'yuzunyi0423','38256047935','【名品数码】Samsung/三星 GALAXY S5 盖世5 I9600 G900V现货送礼','http://item.taobao.com/item.htm?id=38256047935',47,4070,4070,0,0,'http://item.taobao.com/item.htm?id=38256047935&on_comment=1','2014-05-22 11:44:13',1);
INSERT INTO `taobao_goods` VALUES (48,'yuzunyi0423','17733153501','【名品数码】大学生创业 Samsung/三星 I9082 双卡双待双核 包邮','http://item.taobao.com/item.htm?id=17733153501',48,1620,1620,0,0,'http://item.taobao.com/item.htm?id=17733153501&on_comment=1','2014-05-22 11:44:13',1);
INSERT INTO `taobao_goods` VALUES (49,'yuzunyi0423','19950524772','暑期大促真原封港版/三网V版 Apple/苹果 iPhone 5 苹果5包邮送礼','http://item.taobao.com/item.htm?id=19950524772',49,5180,4180,0,0,'http://item.taobao.com/item.htm?id=19950524772&on_comment=1','2014-05-22 11:44:13',1);
INSERT INTO `taobao_goods` VALUES (50,'yuzunyi0423','3544672866','【名品数码】大学生创业 正品行货Apple/苹果 iphone 4  8G','http://item.taobao.com/item.htm?id=3544672866',50,2890,2140,0,1,'http://item.taobao.com/item.htm?id=3544672866&on_comment=1','2014-05-22 11:44:13',1);
INSERT INTO `taobao_goods` VALUES (51,'yuzunyi0423','18729793827','Nokia/诺基亚 105(1050)老人机 超长待机 1050正品手机 黑蓝现货','http://item.taobao.com/item.htm?id=18729793827',51,189,179,1,3,'http://item.taobao.com/item.htm?id=18729793827&on_comment=1','2014-05-22 11:44:13',1);
INSERT INTO `taobao_goods` VALUES (52,'yuzunyi0423','38266553569','小米旗舰店官方正品 小米10400mAh移动电源保护套 充电宝保护套','http://item.taobao.com/item.htm?id=38266553569',52,19,19,2,0,'http://item.taobao.com/item.htm?id=38266553569&on_comment=1','2014-05-22 11:44:13',1);
INSERT INTO `taobao_goods` VALUES (53,'yuzunyi0423','21267791046','【名品数码】小米2红米 小米2S  2A 高/大容量商务手机电池板正品','http://item.taobao.com/item.htm?id=21267791046',53,39,39,3,5,'http://item.taobao.com/item.htm?id=21267791046&on_comment=1','2014-05-22 11:44:13',1);
INSERT INTO `taobao_goods` VALUES (54,'yuzunyi0423','8392713916','【名品数码】大学生创业★五年经营五钻信誉★全新金士顿TF 8G卡','http://item.taobao.com/item.htm?id=8392713916',54,50,50,4,4,'http://item.taobao.com/item.htm?id=8392713916&on_comment=1','2014-05-22 11:44:13',1);
INSERT INTO `taobao_goods` VALUES (55,'yuzunyi0423','22572779123','【名品数码】大学生创业Apple/苹果 iPhone 5C当天发','http://item.taobao.com/item.htm?id=22572779123',55,3530,3530,1,2,'http://item.taobao.com/item.htm?id=22572779123&on_comment=1','2014-05-22 11:44:13',1);
INSERT INTO `taobao_goods` VALUES (56,'yuzunyi0423','9945014408','爱德龙 新品移动电源USB输出充电宝iphone三星小米通用型','http://item.taobao.com/item.htm?id=9945014408',56,99,99,0,5,'http://item.taobao.com/item.htm?id=9945014408&on_comment=1','2014-05-22 11:44:13',1);
INSERT INTO `taobao_goods` VALUES (57,'yuzunyi0423','35284551864','真原装小米2S 小米2 MIUI/小米 3000mAh大容量电池套装','http://item.taobao.com/item.htm?id=35284551864',57,99,99,0,2,'http://item.taobao.com/item.htm?id=35284551864&on_comment=1','2014-05-22 11:44:13',1);
INSERT INTO `taobao_goods` VALUES (58,'yuzunyi0423','19256450364','MIUI/小米 MI2A原装电池','http://item.taobao.com/item.htm?id=19256450364',58,99,99,0,0,'http://item.taobao.com/item.htm?id=19256450364&on_comment=1','2014-05-22 11:44:13',1);
INSERT INTO `taobao_goods` VALUES (59,'yuzunyi0423','3852350438','【现货】Nokia/诺基亚 1050 老人手机 学生机 备用机 正品行货','http://item.taobao.com/item.htm?id=3852350438',59,185,175,2,6,'http://item.taobao.com/item.htm?id=3852350438&on_comment=1','2014-05-22 11:44:13',1);
INSERT INTO `taobao_goods` VALUES (60,'yuzunyi0423','26567028628','小米手机2 原装睿智暗彩后壳','http://item.taobao.com/item.htm?id=26567028628',60,59,59,0,1,'http://item.taobao.com/item.htm?id=26567028628&on_comment=1','2014-05-22 11:44:13',1);
INSERT INTO `taobao_goods` VALUES (61,'yuzunyi0423','16956284567','【名品数码】★大学生创业★ 超薄磨砂外壳 保护套 彩壳','http://item.taobao.com/item.htm?id=16956284567',61,25,25,0,0,'http://item.taobao.com/item.htm?id=16956284567&on_comment=1','2014-05-22 11:44:13',1);
INSERT INTO `taobao_goods` VALUES (62,'yuzunyi0423','14251532945','【名品数码】★S4 Zoom 拍照升级SAMSUNG/三星 GT-I9082iC101','http://item.taobao.com/item.htm?id=14251532945',62,3840,3440,0,0,'http://item.taobao.com/item.htm?id=14251532945&on_comment=1','2014-05-22 11:44:13',1);
INSERT INTO `taobao_goods` VALUES (63,'yuzunyi0423','16365226879','【名品数码】★大学生创业Sony/索尼Sony/索尼 lt29i','http://item.taobao.com/item.htm?id=16365226879',63,2080,1880,0,0,'http://item.taobao.com/item.htm?id=16365226879&on_comment=1','2014-05-22 11:44:13',1);
INSERT INTO `taobao_goods` VALUES (64,'yuzunyi0423','14677147517','【名品数码】★大学生创业★皇冠信用Sony/索尼 LT26ii','http://item.taobao.com/item.htm?id=14677147517',64,2520,1920,0,0,'http://item.taobao.com/item.htm?id=14677147517&on_comment=1','2014-05-22 11:44:13',1);
INSERT INTO `taobao_goods` VALUES (65,'yuzunyi0423','24435536890','HTC one (M7)801e The New 新One 四核智能手机安卓 4.7寸 现货','http://item.taobao.com/item.htm?id=24435536890',65,3580,3580,0,0,'http://item.taobao.com/item.htm?id=24435536890&on_comment=1','2014-05-22 11:44:13',1);
INSERT INTO `taobao_goods` VALUES (66,'yuzunyi0423','21560187963','手机数据线 小米数据线正品100cm','http://item.taobao.com/item.htm?id=21560187963',66,20,20,1,7,'http://item.taobao.com/item.htm?id=21560187963&on_comment=1','2014-05-22 11:44:13',1);
INSERT INTO `taobao_goods` VALUES (67,'yuzunyi0423','22323028852','【名品数码】Apple/苹果 iPad4(32G)WIFI版 现货','http://item.taobao.com/item.htm?id=22323028852',67,3660,3660,0,0,'http://item.taobao.com/item.htm?id=22323028852&on_comment=1','2014-05-22 11:44:13',1);
INSERT INTO `taobao_goods` VALUES (68,'yuzunyi0423','17731159631','Apple/苹果 iPad mini(16G)WIFI版 ipad迷你ipadmini 2港版真原封','http://item.taobao.com/item.htm?id=17731159631',68,2730,2530,0,2,'http://item.taobao.com/item.htm?id=17731159631&on_comment=1','2014-05-22 11:44:13',1);
INSERT INTO `taobao_goods` VALUES (69,'yuzunyi0423','17875503898','【名品数码】Apple/苹果 iPad4(16G)WIFI版 四代平板电脑 送贴膜','http://item.taobao.com/item.htm?id=17875503898',69,3100,3000,0,0,'http://item.taobao.com/item.htm?id=17875503898&on_comment=1','2014-05-22 11:44:13',1);
INSERT INTO `taobao_goods` VALUES (70,'yuzunyi0423','38342260504','小米3钢化玻璃屏幕保护膜 MI3防摔防指纹手机钢化保护贴膜','http://item.taobao.com/item.htm?id=38342260504',70,38,38,2,1,'http://item.taobao.com/item.htm?id=38342260504&on_comment=1','2014-05-22 11:44:13',1);
INSERT INTO `taobao_goods` VALUES (71,'yuzunyi0423','26706808466','小米2s手机高透贴膜小米2s贴膜 小米2s手机保护膜 小米官网正品','http://item.taobao.com/item.htm?id=26706808466',71,19,19,2,3,'http://item.taobao.com/item.htm?id=26706808466&on_comment=1','2014-05-22 11:44:13',1);
INSERT INTO `taobao_goods` VALUES (72,'yuzunyi0423','20085934720','Samsung/三星 GALAXY Note III N900 盖世3 note3手机','http://item.taobao.com/item.htm?id=20085934720',72,3520,3520,1,1,'http://item.taobao.com/item.htm?id=20085934720&on_comment=1','2014-05-22 11:44:13',1);
INSERT INTO `taobao_goods` VALUES (73,'yuzunyi0423','37262238223','【现货当天发】Coolpad/酷派 9976A 大神 7英寸3G双卡双待8核手机','http://item.taobao.com/item.htm?id=37262238223',73,1999,1818,1,1,'http://item.taobao.com/item.htm?id=37262238223&on_comment=1','2014-05-22 11:44:13',1);
INSERT INTO `taobao_goods` VALUES (74,'yuzunyi0423','13928720179','【名品数码】大学生创业Apple/苹果 iPhone 4s当天发','http://item.taobao.com/item.htm?id=13928720179',74,3330,2530,1,3,'http://item.taobao.com/item.htm?id=13928720179&on_comment=1','2014-05-22 11:44:13',1);
INSERT INTO `taobao_goods` VALUES (75,'yuzunyi0423','25958616765','【名品数码】线控通话耳机HTC 耳机','http://item.taobao.com/item.htm?id=25958616765',75,20,20,0,0,'http://item.taobao.com/item.htm?id=25958616765&on_comment=1','2014-05-22 11:44:13',1);
INSERT INTO `taobao_goods` VALUES (76,'yuzunyi0423','23872752494','品胜 高品质电池 BM20手机电池 小米M2电池小米2S 性能PK原装电池','http://item.taobao.com/item.htm?id=23872752494',76,39,39,0,0,'http://item.taobao.com/item.htm?id=23872752494&on_comment=1','2014-05-22 11:44:13',1);
INSERT INTO `taobao_goods` VALUES (77,'yuzunyi0423','15753125849','【名品数码】 大学生创业 移动电源 充电宝 5600毫安 外接电池','http://item.taobao.com/item.htm?id=15753125849',77,70,70,0,1,'http://item.taobao.com/item.htm?id=15753125849&on_comment=1','2014-05-22 11:44:13',1);
INSERT INTO `taobao_goods` VALUES (78,'yuzunyi0423','37396158523','【官网原封现货送208元礼】MIUI/小米 红米Note增强版/标准版手机','http://item.taobao.com/item.htm?id=37396158523',78,1257,1158,1556,956,'http://item.taobao.com/item.htm?id=37396158523&on_comment=1','2014-05-22 11:44:13',1);
INSERT INTO `taobao_goods` VALUES (79,'yuzunyi0423','37908186523','官方原封现货+包邮送豪礼 MIUI/小米红米Note标准版/增强版 手机','http://item.taobao.com/item.htm?id=37908186523',79,1258,1158,171,100,'http://item.taobao.com/item.htm?id=37908186523&on_comment=1','2014-05-22 11:44:13',1);
INSERT INTO `taobao_goods` VALUES (80,'yuzunyi0423','8115328950','【名品数码】大学生创业★皇冠信誉五年经营★全新金士顿TF卡16G','http://item.taobao.com/item.htm?id=8115328950',80,90,90,2,4,'http://item.taobao.com/item.htm?id=8115328950&on_comment=1','2014-05-22 11:44:13',1);
INSERT INTO `taobao_goods` VALUES (81,'yuzunyi0423','13415413173','延长保修','http://item.taobao.com/item.htm?id=13415413173',81,20,20,139,516,'http://item.taobao.com/item.htm?id=13415413173&on_comment=1','2014-05-22 11:44:13',1);
INSERT INTO `taobao_goods` VALUES (82,'yuzunyi0423','17783097267','官网正品小米盒子2电视机顶盒 高清网络机顶盒 送OTG线 当天发货','http://item.taobao.com/item.htm?id=17783097267',82,410,310,1,3,'http://item.taobao.com/item.htm?id=17783097267&on_comment=1','2014-05-22 11:44:13',1);
INSERT INTO `taobao_goods` VALUES (83,'yuzunyi0423','8114939330','【名品数码】大学生创业五年经营★全新金士顿 TF 卡 32G','http://item.taobao.com/item.htm?id=8114939330',83,150,150,0,0,'http://item.taobao.com/item.htm?id=8114939330&on_comment=1','2014-05-22 11:44:13',1);
INSERT INTO `taobao_goods` VALUES (84,'yuzunyi0423','38645475955','Lenovo/联想 S898T+ S8 黄金斗士S8 真八核 双卡智能安卓手机现货','http://item.taobao.com/item.htm?id=38645475955',84,899,799,0,0,'http://item.taobao.com/item.htm?id=38645475955&on_comment=1','2014-05-22 11:44:13',1);
INSERT INTO `taobao_goods` VALUES (85,'古玩世家1983','37979024454','匠门 海南黄花梨 满鬼脸手串 黄花梨佛珠手链 对鬼眼手串 男款','http://item.taobao.com/item.htm?id=37979024454&pm2=1',1,4688,4688,11,6,'http://item.taobao.com/item.htm?id=37979024454&pm2=1&on_comment=1','2014-05-22 16:33:41',1);
INSERT INTO `taobao_goods` VALUES (86,'古玩世家1983','20127586987','匠门饰品 小叶紫檀手串 满金星小叶紫檀佛珠手链手串20mm 男士款','http://item.taobao.com/item.htm?id=20127586987&pm2=2',2,1380,1380,6,6,'http://item.taobao.com/item.htm?id=20127586987&pm2=2&on_comment=1','2014-05-22 16:33:41',1);
INSERT INTO `taobao_goods` VALUES (87,'古玩世家1983','27423628209','匠门饰品 小叶紫檀手串 满金星佛珠手串 小叶紫檀手链 手串 20mm','http://item.taobao.com/item.htm?id=27423628209&pm2=3',3,668,668,15,13,'http://item.taobao.com/item.htm?id=27423628209&pm2=3&on_comment=1','2014-05-22 16:33:41',1);
INSERT INTO `taobao_goods` VALUES (88,'古玩世家1983','38156386259','匠门 小叶紫檀 紫檀佛珠手链 手串 鸡血紫檀 小叶鸡血手串情侣款','http://item.taobao.com/item.htm?id=38156386259',4,688,688,3,2,'http://item.taobao.com/item.htm?id=38156386259&on_comment=1','2014-05-22 16:33:41',1);
INSERT INTO `taobao_goods` VALUES (89,'古玩世家1983','39072798172','匠门 海南黄花梨手串 黄花梨佛珠手链 满鬼脸 虎皮纹 手串 男款','http://item.taobao.com/item.htm?id=39072798172',5,2980,2980,0,0,'http://item.taobao.com/item.htm?id=39072798172&on_comment=1','2014-05-22 16:33:41',1);
INSERT INTO `taobao_goods` VALUES (90,'古玩世家1983','39072514250','匠门 海南黄花梨手串 黄花梨佛珠手链 满鬼脸 满天眼 手串 男款','http://item.taobao.com/item.htm?id=39072514250',6,3688,3688,0,0,'http://item.taobao.com/item.htm?id=39072514250&on_comment=1','2014-05-22 16:33:41',1);
INSERT INTO `taobao_goods` VALUES (91,'古玩世家1983','20122189910','匠门饰品 小叶紫檀手串 金星小叶子檀 满金星佛珠手链18mm男士款','http://item.taobao.com/item.htm?id=20122189910',7,1182,1182,5,2,'http://item.taobao.com/item.htm?id=20122189910&on_comment=1','2014-05-22 16:33:41',1);
INSERT INTO `taobao_goods` VALUES (92,'古玩世家1983','39079824657','匠门 海南黄花梨 海黄满鬼脸手串 黄花梨佛珠手链 黄花梨 情侣款','http://item.taobao.com/item.htm?id=39079824657',8,1999,1999,0,0,'http://item.taobao.com/item.htm?id=39079824657&on_comment=1','2014-05-22 16:33:41',1);
INSERT INTO `taobao_goods` VALUES (93,'古玩世家1983','37856232691','匠门 满金星手串 小叶紫檀佛珠 手链 紫檀手串 金星紫檀 佛珠手串','http://item.taobao.com/item.htm?id=37856232691',9,7988,7988,2,0,'http://item.taobao.com/item.htm?id=37856232691&on_comment=1','2014-05-22 16:33:41',1);
INSERT INTO `taobao_goods` VALUES (94,'古玩世家1983','20280801375','天然水晶 巴西正品专柜 糖果天然碧玺手链6mm手链 爱情旺夫款饰品','http://item.taobao.com/item.htm?id=20280801375',10,168,168,0,0,'http://item.taobao.com/item.htm?id=20280801375&on_comment=1','2014-05-22 16:33:41',1);
INSERT INTO `taobao_goods` VALUES (95,'古玩世家1983','39101820377','匠门 海南黄花梨 满鬼脸手串 黄花梨佛珠手链 热销 情侣','http://item.taobao.com/item.htm?id=39101820377',11,1288,1288,0,0,'http://item.taobao.com/item.htm?id=39101820377&on_comment=1','2014-05-22 16:33:41',1);
INSERT INTO `taobao_goods` VALUES (96,'古玩世家1983','38247157251','匠门 小叶紫檀 紫檀佛珠手链  满金星手链 鸡血紫檀 小叶鸡血手串','http://item.taobao.com/item.htm?id=38247157251',12,8699,8699,0,1,'http://item.taobao.com/item.htm?id=38247157251&on_comment=1','2014-05-22 16:33:41',1);
INSERT INTO `taobao_goods` VALUES (97,'古玩世家1983','37953195215','匠门 小叶紫檀手链 紫檀佛珠手串 老料同料顺文小孔手链6mm 女款','http://item.taobao.com/item.htm?id=37953195215',13,118,118,0,9,'http://item.taobao.com/item.htm?id=37953195215&on_comment=1','2014-05-22 16:33:41',1);
INSERT INTO `taobao_goods` VALUES (98,'古玩世家1983','38297281046','匠门 金丝楠金丝楠手串 阴沉木 手链 金丝楠佛珠手串20mm 男款','http://item.taobao.com/item.htm?id=38297281046',14,999,999,0,0,'http://item.taobao.com/item.htm?id=38297281046&on_comment=1','2014-05-22 16:33:41',1);
INSERT INTO `taobao_goods` VALUES (99,'古玩世家1983','35219825323','匠门饰品 小叶紫檀 老料同料顺纹小孔佛珠手链216颗 5mm女士款','http://item.taobao.com/item.htm?id=35219825323',15,258,258,0,5,'http://item.taobao.com/item.htm?id=35219825323&on_comment=1','2014-05-22 16:33:41',1);
INSERT INTO `taobao_goods` VALUES (100,'古玩世家1983','37700606956','匠门 小叶紫檀手串 金星佛珠手链 小叶紫檀满星念珠8mm 情侣款','http://item.taobao.com/item.htm?id=37700606956',16,3299,3299,0,0,'http://item.taobao.com/item.htm?id=37700606956&on_comment=1','2014-05-22 16:33:41',1);
INSERT INTO `taobao_goods` VALUES (101,'古玩世家1983','38387484443','匠门 小叶紫檀 紫檀佛珠手链 手串 鸡血紫檀 小叶鸡血手串情侣款','http://item.taobao.com/item.htm?id=38387484443',17,1680,1680,0,0,'http://item.taobao.com/item.htm?id=38387484443&on_comment=1','2014-05-22 16:33:41',1);
INSERT INTO `taobao_goods` VALUES (102,'古玩世家1983','36926592704','孤品 满金星手串 小叶紫檀金星佛珠手串 同料顺纹手串手链 20MM','http://item.taobao.com/item.htm?id=36926592704',18,3999,3999,0,1,'http://item.taobao.com/item.htm?id=36926592704&on_comment=1','2014-05-22 16:33:41',1);
INSERT INTO `taobao_goods` VALUES (103,'古玩世家1983','37622363991','匠门 小叶紫檀佛珠手串 满金星手串手链 金星紫檀手串20MM情侣款','http://item.taobao.com/item.htm?id=37622363991',19,428,428,0,10,'http://item.taobao.com/item.htm?id=37622363991&on_comment=1','2014-05-22 16:33:41',1);
INSERT INTO `taobao_goods` VALUES (104,'古玩世家1983','35292808213','匠门饰品  流行饰品 黄水金手链 5A级巴西天然黄水晶手链 女士款','http://item.taobao.com/item.htm?id=35292808213',20,299,299,0,0,'http://item.taobao.com/item.htm?id=35292808213&on_comment=1','2014-05-22 16:33:41',1);
INSERT INTO `taobao_goods` VALUES (105,'古玩世家1983','37875381040','匠门 海南黄花梨 海黄满鬼脸手串 黄花梨佛珠手链 对鬼眼手串男款','http://item.taobao.com/item.htm?id=37875381040',21,3299,3299,1,0,'http://item.taobao.com/item.htm?id=37875381040&on_comment=1','2014-05-22 16:33:41',1);
INSERT INTO `taobao_goods` VALUES (106,'古玩世家1983','37846566163','匠门 海南黄花梨手串 佛珠手串手链 满鬼脸手串 满蜘蛛纹手链 男','http://item.taobao.com/item.htm?id=37846566163',22,5888,5888,1,1,'http://item.taobao.com/item.htm?id=37846566163&on_comment=1','2014-05-22 16:33:41',1);
INSERT INTO `taobao_goods` VALUES (107,'古玩世家1983','39053256799','匠门 孤品 小叶紫檀满金星手串 金星佛珠手串手链 紫檀佛珠手串','http://item.taobao.com/item.htm?id=39053256799',23,1999,1999,0,0,'http://item.taobao.com/item.htm?id=39053256799&on_comment=1','2014-05-22 16:33:41',1);
INSERT INTO `taobao_goods` VALUES (108,'古玩世家1983','36848874382','沉香手串 印尼加里曼丹沉香佛珠手串手链 沉香佛珠手串15mm情侣款','http://item.taobao.com/item.htm?id=36848874382',24,498,498,1,7,'http://item.taobao.com/item.htm?id=36848874382&on_comment=1','2014-05-22 16:33:41',1);
INSERT INTO `taobao_goods` VALUES (109,'古玩世家1983','37452492956','匠门 满金星小叶紫檀 手链 高密度8MM佛珠手链 满金星手串 情侣款','http://item.taobao.com/item.htm?id=37452492956',25,3699,3699,1,0,'http://item.taobao.com/item.htm?id=37452492956&on_comment=1','2014-05-22 16:33:41',1);
INSERT INTO `taobao_goods` VALUES (110,'古玩世家1983','37849678187','匠门 海南黄花梨手串 满蜘蛛纹手串 手链 满鬼脸手串 佛珠手链','http://item.taobao.com/item.htm?id=37849678187',26,6666,6666,0,0,'http://item.taobao.com/item.htm?id=37849678187&on_comment=1','2014-05-22 16:33:41',1);
INSERT INTO `taobao_goods` VALUES (111,'古玩世家1983','37877813682','匠门 海南黄花梨手串 黄花梨佛珠手链 满鬼脸 满天眼 手串 男款','http://item.taobao.com/item.htm?id=37877813682',27,1299,1299,0,1,'http://item.taobao.com/item.htm?id=37877813682&on_comment=1','2014-05-22 16:33:41',1);
INSERT INTO `taobao_goods` VALUES (112,'古玩世家1983','36327981652','匠门饰品 黄花梨满鬼脸佛珠手串手链 黄花梨手串 手链 海南黄花梨','http://item.taobao.com/item.htm?id=36327981652',28,7699,7699,0,2,'http://item.taobao.com/item.htm?id=36327981652&on_comment=1','2014-05-22 16:33:41',1);
INSERT INTO `taobao_goods` VALUES (113,'古玩世家1983','20280537571','匠门饰品正品巴西天然紫水晶手链 水晶手链饰品 紫晶手链 8mm女款','http://item.taobao.com/item.htm?id=20280537571',29,188,188,0,2,'http://item.taobao.com/item.htm?id=20280537571&on_comment=1','2014-05-22 16:33:41',1);
INSERT INTO `taobao_goods` VALUES (114,'古玩世家1983','38364177620','匠门 小叶紫檀手串 金星老料 高密度20MM佛珠手链 金星手串 男款','http://item.taobao.com/item.htm?id=38364177620',30,1288,1288,0,0,'http://item.taobao.com/item.htm?id=38364177620&on_comment=1','2014-05-22 16:33:41',1);
INSERT INTO `taobao_goods` VALUES (115,'古玩世家1983','38323749529','匠门 小叶紫檀手串 金星老料 高密度20MM佛珠手链 手串 男款 热销','http://item.taobao.com/item.htm?id=38323749529',31,1688,1688,0,0,'http://item.taobao.com/item.htm?id=38323749529&on_comment=1','2014-05-22 16:33:41',1);
INSERT INTO `taobao_goods` VALUES (116,'古玩世家1983','37316381054','匠门 小叶紫檀满金星 手串 佛珠手串手链 满金星佛珠手串 男款','http://item.taobao.com/item.htm?id=37316381054',32,458,458,0,20,'http://item.taobao.com/item.htm?id=37316381054&on_comment=1','2014-05-22 16:33:41',1);
INSERT INTO `taobao_goods` VALUES (117,'古玩世家1983','37851011382','匠门 小叶紫檀手串 佛珠手串 手链 同料顺纹手链8mm情侣款','http://item.taobao.com/item.htm?id=37851011382',33,218,218,0,9,'http://item.taobao.com/item.htm?id=37851011382&on_comment=1','2014-05-22 16:33:41',1);
INSERT INTO `taobao_goods` VALUES (118,'古玩世家1983','37707901091','匠门 小叶紫檀手链 紫檀佛珠手串 老料同料顺文小孔手链6mm 女款','http://item.taobao.com/item.htm?id=37707901091',34,128,128,0,22,'http://item.taobao.com/item.htm?id=37707901091&on_comment=1','2014-05-22 16:33:41',1);
INSERT INTO `taobao_goods` VALUES (119,'古玩世家1983','35061591166','匠门饰品 印度小叶紫檀烟嘴 三重过滤烟嘴 正品专卖','http://item.taobao.com/item.htm?id=35061591166',35,88,88,0,21,'http://item.taobao.com/item.htm?id=35061591166&on_comment=1','2014-05-22 16:33:41',1);
INSERT INTO `taobao_goods` VALUES (120,'古玩世家1983','35511177896','匠门饰品 小叶紫檀佛珠手串 紫檀手串 手链 拆房老料手串8mm','http://item.taobao.com/item.htm?id=35511177896',36,228,228,0,34,'http://item.taobao.com/item.htm?id=35511177896&on_comment=1','2014-05-22 16:33:41',1);
INSERT INTO `taobao_goods` VALUES (121,'古玩世家1983','35182995217','匠门饰品 小叶紫檀手串 老料 同料顺纹佛珠手串 手链 6mm 女款','http://item.taobao.com/item.htm?id=35182995217',37,159,159,0,36,'http://item.taobao.com/item.htm?id=35182995217&on_comment=1','2014-05-22 16:33:41',1);
INSERT INTO `taobao_goods` VALUES (122,'古玩世家1983','20135094957','天然水晶 纯天然正品巴西三禅碧玺多层手链 多圈时尚韩版女款5mm','http://item.taobao.com/item.htm?id=20135094957',38,218,218,0,1,'http://item.taobao.com/item.htm?id=20135094957&on_comment=1','2014-05-22 16:33:41',1);
INSERT INTO `taobao_goods` VALUES (123,'古玩世家1983','37654682433','匠门 小叶紫檀手串 满金星手串 紫檀佛珠手链 金星紫檀手串手链','http://item.taobao.com/item.htm?id=37654682433',39,1888,1888,0,0,'http://item.taobao.com/item.htm?id=37654682433&on_comment=1','2014-05-22 16:33:41',1);
INSERT INTO `taobao_goods` VALUES (124,'古玩世家1983','36960982564','小叶紫檀手串 满金星佛珠手串手链 金星紫檀 满金星手串20MM 男款','http://item.taobao.com/item.htm?id=36960982564',40,4999,4999,0,1,'http://item.taobao.com/item.htm?id=36960982564&on_comment=1','2014-05-22 16:33:41',1);
INSERT INTO `taobao_goods` VALUES (125,'古玩世家1983','37661408290','匠门 满金星手串 小叶紫檀金星佛珠手链 紫檀手串 老料同料手串','http://item.taobao.com/item.htm?id=37661408290',41,5888,5888,0,0,'http://item.taobao.com/item.htm?id=37661408290&on_comment=1','2014-05-22 16:33:41',1);
INSERT INTO `taobao_goods` VALUES (126,'古玩世家1983','37831679518','匠门 小叶紫檀手串 满金星佛珠手链 金星紫檀 满金星手串 手链','http://item.taobao.com/item.htm?id=37831679518',42,9999,9999,0,0,'http://item.taobao.com/item.htm?id=37831679518&on_comment=1','2014-05-22 16:33:41',1);
INSERT INTO `taobao_goods` VALUES (127,'古玩世家1983','37631003773','匠门 孤品 小叶紫檀满金星手串 金星佛珠手串手链 紫檀佛珠手串','http://item.taobao.com/item.htm?id=37631003773',43,7299,7299,0,0,'http://item.taobao.com/item.htm?id=37631003773&on_comment=1','2014-05-22 16:33:41',1);
INSERT INTO `taobao_goods` VALUES (128,'古玩世家1983','37811463885','匠门 小叶紫檀手串 满金星佛珠手链 金星紫檀 满金星手串 男款','http://item.taobao.com/item.htm?id=37811463885',44,8888,8888,0,0,'http://item.taobao.com/item.htm?id=37811463885&on_comment=1','2014-05-22 16:33:41',1);
INSERT INTO `taobao_goods` VALUES (129,'古玩世家1983','37496380924','匠门 小叶紫檀手串 满金星 高密度20MM佛珠手链 满金星手串 男款','http://item.taobao.com/item.htm?id=37496380924',45,9999,9999,0,1,'http://item.taobao.com/item.htm?id=37496380924&on_comment=1','2014-05-22 16:33:41',1);
INSERT INTO `taobao_goods` VALUES (130,'古玩世家1983','20144522143','天然水晶 巴西正品专柜 糖果天然碧玺手链6mm手链 爱情旺夫款','http://item.taobao.com/item.htm?id=20144522143',46,218,218,1,0,'http://item.taobao.com/item.htm?id=20144522143&on_comment=1','2014-05-22 16:33:41',1);
INSERT INTO `taobao_goods` VALUES (131,'古玩世家1983','20157205571','正品巴西天然紫水晶手链 水晶手串 饰品 紫水晶手链 女款6mm','http://item.taobao.com/item.htm?id=20157205571',47,268,268,0,0,'http://item.taobao.com/item.htm?id=20157205571&on_comment=1','2014-05-22 16:33:41',1);
INSERT INTO `taobao_goods` VALUES (132,'古玩世家1983','38466740502','匠门 海南黄花梨 海黄满蜘蛛纹手串 黄花梨佛珠手链 瘤疤手串男款','http://item.taobao.com/item.htm?id=38466740502',48,9999,9999,0,0,'http://item.taobao.com/item.htm?id=38466740502&on_comment=1','2014-05-22 16:33:41',1);
INSERT INTO `taobao_goods` VALUES (133,'古玩世家1983','38874387986','匠门 海南黄花梨 满花脸手串 黄花梨佛珠手链 蝴蝶纹手串 男款','http://item.taobao.com/item.htm?id=38874387986',49,5688,5688,0,0,'http://item.taobao.com/item.htm?id=38874387986&on_comment=1','2014-05-22 16:33:41',1);
INSERT INTO `taobao_goods` VALUES (134,'古玩世家1983','38015978868','匠门 印度小叶紫檀烟嘴 三重过滤烟嘴 紫檀烟嘴 正品专卖男士专用','http://item.taobao.com/item.htm?id=38015978868',50,99,99,1,3,'http://item.taobao.com/item.htm?id=38015978868&on_comment=1','2014-05-22 16:33:41',1);
INSERT INTO `taobao_goods` VALUES (135,'古玩世家1983','36252643337','匠门饰品 黄杨木雕 猛虎下山商务家居摆件 居家工艺品 木雕 摆件','http://item.taobao.com/item.htm?id=36252643337',51,188,188,0,1,'http://item.taobao.com/item.htm?id=36252643337&on_comment=1','2014-05-22 16:33:41',1);
INSERT INTO `taobao_goods` VALUES (136,'古玩世家1983','36498707252','黄杨木工艺品 木雕 一休和尚摆件 商务礼品 居家摆件 木雕工艺','http://item.taobao.com/item.htm?id=36498707252',52,189,189,0,0,'http://item.taobao.com/item.htm?id=36498707252&on_comment=1','2014-05-22 16:33:41',1);
INSERT INTO `taobao_goods` VALUES (137,'古玩世家1983','36272798418','黄杨木工艺品 木雕招财进宝弥勒佛摆件 商务礼品 居家摆件 木雕','http://item.taobao.com/item.htm?id=36272798418',53,229,229,0,0,'http://item.taobao.com/item.htm?id=36272798418&on_comment=1','2014-05-22 16:33:41',1);
INSERT INTO `taobao_goods` VALUES (138,'古玩世家1983','36285991301','黄杨木工艺品 木雕 元宝弥勒佛摆件 商务礼品 居家摆件 木雕工艺','http://item.taobao.com/item.htm?id=36285991301',54,229,229,0,0,'http://item.taobao.com/item.htm?id=36285991301&on_comment=1','2014-05-22 16:33:41',1);
INSERT INTO `taobao_goods` VALUES (139,'古玩世家1983','39140980853','匠门 海南黄花梨 海黄满鬼脸手串 黄花梨佛珠手链 黄花梨 情侣款','http://item.taobao.com/item.htm?id=39140980853',55,6800,6800,0,0,'http://item.taobao.com/item.htm?id=39140980853&on_comment=1','2014-05-22 16:33:41',1);
INSERT INTO `taobao_goods` VALUES (140,'古玩世家1983','38544227144','匠门 印尼加里曼丹沉香 高油脂沉香手串 佛珠 15mm手串手链 情侣','http://item.taobao.com/item.htm?id=38544227144',56,2299,2299,1,0,'http://item.taobao.com/item.htm?id=38544227144&on_comment=1','2014-05-22 16:33:41',1);
INSERT INTO `taobao_goods` VALUES (141,'古玩世家1983','38548142445','匠门 印尼加里曼丹沉香 高油脂沉香手串 佛珠 15mm手串手链 情侣','http://item.taobao.com/item.htm?id=38548142445',57,2699,2699,1,0,'http://item.taobao.com/item.htm?id=38548142445&on_comment=1','2014-05-22 16:33:41',1);
INSERT INTO `taobao_goods` VALUES (142,'古玩世家1983','37868595181','匠门 海南黄花梨手串 手链 黄花梨佛珠手串 满水波影 满鬼脸手串','http://item.taobao.com/item.htm?id=37868595181',58,6899,6899,0,0,'http://item.taobao.com/item.htm?id=37868595181&on_comment=1','2014-05-22 16:33:41',1);
INSERT INTO `taobao_goods` VALUES (143,'古玩世家1983','39145657132','匠门 海南黄花梨 海黄满水波影手串 黄花梨佛珠手链 黄花梨 情侣','http://item.taobao.com/item.htm?id=39145657132',59,3999,3999,0,0,'http://item.taobao.com/item.htm?id=39145657132&on_comment=1','2014-05-22 16:33:41',1);
INSERT INTO `taobao_goods` VALUES (144,'古玩世家1983','39149097046','匠门 海南黄花梨 海黄满水波影手串 黄花梨佛珠手链 黄花梨 情侣','http://item.taobao.com/item.htm?id=39149097046',60,3688,3688,0,0,'http://item.taobao.com/item.htm?id=39149097046&on_comment=1','2014-05-22 16:33:41',1);
INSERT INTO `taobao_goods` VALUES (145,'古玩世家1983','38482329802','纯手工十字锈成品琴棋书画大幅客厅350cm*145cm人工锈好的成品','http://item.taobao.com/item.htm?id=38482329802',61,88888,88888,0,0,'http://item.taobao.com/item.htm?id=38482329802&on_comment=1','2014-05-22 16:33:41',1);
INSERT INTO `taobao_goods` VALUES (146,'才高吧斗','38526902607','正品美国coppertone水宝宝防晒霜乳SPF50 237ml 无油无香防水海边','http://item.taobao.com/item.htm?id=38526902607&pm2=1',1,95,68,176,133,'http://item.taobao.com/item.htm?id=38526902607&pm2=1&on_comment=1','2014-05-22 17:49:52',1);
INSERT INTO `taobao_goods` VALUES (147,'才高吧斗','38552576737','水宝宝防晒霜正品防水 SPF70 237ml 海边成人 防晒霜 防紫外线','http://item.taobao.com/item.htm?id=38552576737&pm2=2',2,99,75,16,10,'http://item.taobao.com/item.htm?id=38552576737&pm2=2&on_comment=1','2014-05-22 17:49:52',1);
INSERT INTO `taobao_goods` VALUES (148,'才高吧斗','38522815494','美国正品 水宝宝 晒后修复芦荟胶 226g 舒缓冰凉啫喱 防晒修护','http://item.taobao.com/item.htm?id=38522815494&pm2=3',3,90,75,6,5,'http://item.taobao.com/item.htm?id=38522815494&pm2=3&on_comment=1','2014-05-22 17:49:52',1);
INSERT INTO `taobao_goods` VALUES (149,'才高吧斗','38542705599','分装瓶  旅游乳液分装瓶化妆瓶按压瓶','http://item.taobao.com/item.htm?id=38542705599',4,3,3,0,0,'http://item.taobao.com/item.htm?id=38542705599&on_comment=1','2014-05-22 17:49:52',1);
INSERT INTO `taobao_goods` VALUES (150,'沈氏家纺城','37757779134','水星毛巾毯全棉毛巾被 单人双人毛巾被超柔爽肤毛巾毯特价包邮','http://item.taobao.com/item.htm?id=37757779134&pm2=1',1,120,70,77,24,'http://item.taobao.com/item.htm?id=37757779134&pm2=1&on_comment=1','2014-05-22 18:19:38',1);
INSERT INTO `taobao_goods` VALUES (151,'沈氏家纺城','38838691592','家纺正品蚕丝被 春秋夏被冬被空调被 天丝贡缎子母四季被特价包邮','http://item.taobao.com/item.htm?id=38838691592&pm2=2',2,299,99,11,3,'http://item.taobao.com/item.htm?id=38838691592&pm2=2&on_comment=1','2014-05-22 18:19:38',1);
INSERT INTO `taobao_goods` VALUES (152,'沈氏家纺城','39097676462','全棉水星羽绒枕芯 磁疗枕颈椎枕 单双人儿童成人通用枕芯特价包邮','http://item.taobao.com/item.htm?id=39097676462&pm2=3',3,59,59,1,0,'http://item.taobao.com/item.htm?id=39097676462&pm2=3&on_comment=1','2014-05-22 18:19:38',1);
INSERT INTO `taobao_goods` VALUES (153,'沈氏家纺城','37746911853','水星四件套 全棉活性印花四件套 纯棉四件套 床品件套特价包邮','http://item.taobao.com/item.htm?id=37746911853',4,669,279,0,0,'http://item.taobao.com/item.htm?id=37746911853&on_comment=1','2014-05-22 18:19:38',1);
INSERT INTO `taobao_goods` VALUES (154,'沈氏家纺城','38351370549','水星韩版欧式四件套 全棉活性印花四件套 被套床单套件特价包邮','http://item.taobao.com/item.htm?id=38351370549',5,729,266,0,0,'http://item.taobao.com/item.htm?id=38351370549&on_comment=1','2014-05-22 18:19:38',1);
INSERT INTO `taobao_goods` VALUES (155,'沈氏家纺城','37779212438','水星素色双拼四件套 水星家纺活性全棉四件套 婚庆套件特价包邮','http://item.taobao.com/item.htm?id=37779212438',6,469,169,1,0,'http://item.taobao.com/item.htm?id=37779212438&on_comment=1','2014-05-22 18:19:38',1);
INSERT INTO `taobao_goods` VALUES (156,'沈氏家纺城','38643026433','方顶蚊帐三开门拉链加高坐床蚊帐 蒙古包蚊帐通用清仓特价包邮','http://item.taobao.com/item.htm?id=38643026433',7,198,73,0,0,'http://item.taobao.com/item.htm?id=38643026433&on_comment=1','2014-05-22 18:19:38',1);
INSERT INTO `taobao_goods` VALUES (157,'沈氏家纺城','37770534301','水星天丝提花四件套 活性印花四件套 全棉婚庆套件床品特价包邮','http://item.taobao.com/item.htm?id=37770534301',8,758,238,0,0,'http://item.taobao.com/item.htm?id=37770534301&on_comment=1','2014-05-22 18:19:38',1);
/*!40000 ALTER TABLE `taobao_goods` ENABLE KEYS */;
UNLOCK TABLES;

#
# Source for table taobao_link
#

DROP TABLE IF EXISTS `taobao_link`;
CREATE TABLE `taobao_link` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

#
# Dumping data for table taobao_link
#

LOCK TABLES `taobao_link` WRITE;
/*!40000 ALTER TABLE `taobao_link` DISABLE KEYS */;
INSERT INTO `taobao_link` VALUES (1,'海诺博客','http://www.hainuo.info','');
INSERT INTO `taobao_link` VALUES (6,'芳草园','http://www.wdfxy.com','');
/*!40000 ALTER TABLE `taobao_link` ENABLE KEYS */;
UNLOCK TABLES;

#
# Source for table taobao_member
#

DROP TABLE IF EXISTS `taobao_member`;
CREATE TABLE `taobao_member` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(60) NOT NULL DEFAULT '' COMMENT '淘宝id',
  `sid` varchar(100) NOT NULL DEFAULT '',
  `dongtai` varchar(500) DEFAULT NULL,
  `is_seller` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '是否卖家',
  `sellerId` varchar(255) DEFAULT NULL,
  `goodNum` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `sscore` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '卖家信用',
  `sscore_img` varchar(500) DEFAULT NULL,
  `deposit` varchar(255) DEFAULT NULL COMMENT '保证金',
  `bscore` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '买家信用',
  `bscore_img` varchar(500) DEFAULT NULL,
  `haopinglv` varchar(10) NOT NULL DEFAULT '' COMMENT '好评率',
  `area` varchar(30) NOT NULL DEFAULT '' COMMENT '地区',
  `rateurl` varchar(200) NOT NULL DEFAULT '' COMMENT '信用页面url',
  `zhuying` varchar(60) NOT NULL DEFAULT '' COMMENT '当前主营',
  `regTime` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '注册时间/创店时间',
  `uid` varchar(100) NOT NULL DEFAULT '' COMMENT 'uid',
  `utype` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '认证状态',
  `score` text NOT NULL COMMENT '信用',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '数据创建时间',
  `is_buyer` varchar(255) DEFAULT NULL COMMENT '是否为买家',
  `zhanbi` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

#
# Dumping data for table taobao_member
#

LOCK TABLES `taobao_member` WRITE;
/*!40000 ALTER TABLE `taobao_member` DISABLE KEYS */;
INSERT INTO `taobao_member` VALUES (1,'leohainuo','UvF8GMCcGvGgG','{\"fahuo\":{\"score\":\"5.00000\",\"total\":\"1\",\"need\":0,\"pscore\":5},\"fuwu\":{\"score\":\"5.00000\",\"total\":\"1\",\"need\":0,\"pscore\":5},\"miaoshu\":{\"score\":\"5.00000\",\"total\":\"1\",\"need\":0,\"pscore\":5}}',1,'153673383',NULL,'http://store.taobao.com/shop/view_shop-339822ac0c909c4ab9c3cbe539b9b89f.htm',4,'http://pics.taobaocdn.com/newrank/s_red_1.gif','',246,'http://pics.taobaocdn.com/newrank/b_red_5.gif','100.00%','滨州','http://rate.taobao.com/user-rate-UvF8GMCcGvGgG.htm','游戏/话费',1268751531,'153673383',1,'[[\"0\",\"0\",\"0\"],[\"1\",\"0\",\"0\"],[\"3\",\"0\",\"0\"],[\"1\",\"0\",\"0\"]]','2014-05-23 01:25:45',NULL,'100%');
INSERT INTO `taobao_member` VALUES (3,'lcncn','UMGIWOmguvCkG','{\"fahuo\":{\"score\":\"4.65116\",\"total\":\"43\",\"need\":108,\"pscore\":4.6},\"fuwu\":{\"score\":\"4.69048\",\"total\":\"42\",\"need\":88,\"pscore\":4.6},\"miaoshu\":{\"score\":\"4.65909\",\"total\":\"44\",\"need\":107,\"pscore\":4.6}}',1,'720887293',NULL,'http://store.taobao.com/shop/view_shop-fb16a276960fe74a47d3d417d365642a.htm',113,'http://pics.taobaocdn.com/newrank/s_red_4.gif','￥1,000.00',37,'http://pics.taobaocdn.com/newrank/b_red_2.gif','99.12%','&nbsp;','http://rate.taobao.com/user-rate-UMGIWOmguvCkG.htm','行业服务市场',1373295256,'720887293',1,'[[\"0\",\"0\",\"0\"],[\"1\",\"0\",\"0\"],[\"72\",\"0\",\"0\"],[\"41\",\"1\",\"0\"]]','2014-05-23 01:40:59',NULL,'21.24%');
INSERT INTO `taobao_member` VALUES (4,'vnqhkq195394','369fe11d06e2a4e07d6441280d47d8ed','{\"fahuo\":null,\"fuwu\":null,\"miaoshu\":null}',0,NULL,'0',NULL,0,NULL,NULL,18,'http://pics.taobaocdn.com/newrank/b_red_2.gif','100.00%','','http://rate.taobao.com/user-rate-369fe11d06e2a4e07d6441280d47d8ed.htm','',1355486150,'UvFHWMFQGMGxuMQTT',1,'[[\"1\",\"0\",\"0\"],[\"5\",\"0\",\"0\"],[\"18\",\"0\",\"0\"],[\"0\",\"0\",\"0\"]]','2014-05-23 01:44:02','1',NULL);
INSERT INTO `taobao_member` VALUES (5,'沈氏家纺城','UvCNYvCHbvGISvNTT','{\"fahuo\":{\"score\":\"4.96552\",\"total\":\"29\",\"need\":0,\"pscore\":4.9},\"fuwu\":{\"score\":\"4.96552\",\"total\":\"29\",\"need\":0,\"pscore\":4.9},\"miaoshu\":{\"score\":\"4.96552\",\"total\":\"29\",\"need\":0,\"pscore\":4.9}}',1,'2012153290','8','http://store.taobao.com/shop/view_shop-2c35747a250a2825ee699cb7f3c26e52.htm',44,'http://pics.taobaocdn.com/newrank/s_red_3.gif','￥1,000.00',0,'http://pics.taobaocdn.com/newrank/b_red_1.gif','100.00%','&nbsp;','http://rate.taobao.com/user-rate-UvCNYvCHbvGISvNTT.htm','家居用品',1394376659,'2012153290',1,'[[\"14\",\"0\",\"0\"],[\"39\",\"0\",\"0\"],[\"44\",\"0\",\"0\"],[\"0\",\"0\",\"0\"]]','2014-05-23 01:51:43',NULL,'100%');
/*!40000 ALTER TABLE `taobao_member` ENABLE KEYS */;
UNLOCK TABLES;

#
# Source for table taobao_number
#

DROP TABLE IF EXISTS `taobao_number`;
CREATE TABLE `taobao_number` (
  `name` varchar(16) DEFAULT NULL,
  `val` bigint(20) unsigned NOT NULL DEFAULT '0',
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

#
# Dumping data for table taobao_number
#

LOCK TABLES `taobao_number` WRITE;
/*!40000 ALTER TABLE `taobao_number` DISABLE KEYS */;
INSERT INTO `taobao_number` VALUES ('taobao',168062178,1);
/*!40000 ALTER TABLE `taobao_number` ENABLE KEYS */;
UNLOCK TABLES;

#
# Source for table taobao_session
#

DROP TABLE IF EXISTS `taobao_session`;
CREATE TABLE `taobao_session` (
  `session_id` varchar(255) NOT NULL,
  `session_expire` int(11) NOT NULL,
  `session_data` blob,
  UNIQUE KEY `session_id` (`session_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

#
# Dumping data for table taobao_session
#

LOCK TABLES `taobao_session` WRITE;
/*!40000 ALTER TABLE `taobao_session` DISABLE KEYS */;
INSERT INTO `taobao_session` VALUES ('4fu68levno1gieblfu32uj61q0',1400782543,X'5F5F686173685F5F7C613A383A7B733A33323A226230376635666638336461353031336664343532386332353039306466653236223B733A33323A226535663637636364396562656530663536633166313165356435303835386166223B733A33323A223938336634666534353639626233303630313838323636303566333137613465223B733A33323A223564636535616434316630393430613464383164386435383631313262613362223B733A33323A223962633666363064626565656634393234393732636236646431336663626361223B733A33323A226331663766326237383932336565616161373366653639663033623264633762223B733A33323A226665633462303465613561653238343939313732373233353639376166396466223B733A33323A223765313532613238623336396339333565336263323038353235653166393263223B733A33323A223837623738663665323537393966663838376232643265386336386432646434223B733A33323A223233636134373038353234376433303164326161643034383762623463616163223B733A33323A223235633530333831346439373437303534396231353636326163323332363838223B733A33323A223734326636323365613666636261666463633065366637616263303161346236223B733A33323A223532643630303934343638393237323837633262313332326365613266623636223B733A33323A223332343731373563643235343933316562633163636531373932653930343337223B733A33323A223938613961346131633838663837396235393539383035376333356531363334223B733A33323A223864646365323261656561323762313865323431396234326463656533653237223B7D');
/*!40000 ALTER TABLE `taobao_session` ENABLE KEYS */;
UNLOCK TABLES;

/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;

﻿DROP TABLE IF EXISTS `taobao_article`;
CREATE TABLE `taobao_article` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `content` text,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '数据创建时间',
  `username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;



INSERT INTO `taobao_article` VALUES (1,'范德萨分','&lt;p&gt;范德萨分是&lt;/p&gt;&lt;p&gt;法师打飞机啊圣诞快乐福建可拉萨的减肥 是否大家看法来看 萨达夫金克拉&lt;/p&gt;','2014-05-27 20:02:38','admin');
INSERT INTO `taobao_article` VALUES (2,'发生大法师的','<p>防守打法萨达夫仨</p>','2014-05-27 15:43:07','admin');
INSERT INTO `taobao_article` VALUES (5,'粉兔兔网站欢迎你','&lt;p&gt;粉兔兔网站欢迎你&lt;/p&gt;','2014-05-27 20:30:32','admin');

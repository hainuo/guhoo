create table taobao_member (
id int unsigned not null primary key auto_increment,
username varchar(60) not null default '' comment '淘宝id',
sid varchar(100) not null default '',
sscore int unsigned not null default 0 comment '卖家信用',
bscore int unsigned not null default 0 comment '买家信用',
haopinglv varchar(10) not null default '' comment '好评率',
area varchar(30) not null default '' comment '地区',
rateurl varchar(200) not null default '' comment '信用页面url',
zhuying varchar(60) not null default '' comment '当前主营',
regTime int unsigned not null default 0 comment '注册时间/创店时间',
uid varchar(100)  not null default '' comment 'uid',
utype int unsigned not null default 0 comment '认证状态',
is_seller tinyint unsigned not null default 0 comment '是否卖家',
score varchar(200) not null default '' comment '信用'
)engine=myisam default charset=utf8;
<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>粉兔兔 管理中心</title>
<link rel="stylesheet" type="text/css" href="/Public/css/style.css" />
<link href='http://fonts.googleapis.com/css?family=Belgrano' rel='stylesheet' type='text/css'>
<link href='/Public/css/ligerui-all.css' rel='stylesheet' type='text/css'>
<link href='/Public/css/ligerui-icons.css' rel='stylesheet' type='text/css'>
<!-- jQuery file -->
<script src="/Public/js/jquery-1.7.2.min.js"></script>
<script src="/Public/js/jquery.tabify.js" type="text/javascript" charset="utf-8"></script>
<script src="/Public/js/ligerui.min.js" type="text/javascript" charset="utf-8"></script>
<!--
<script type="text/javascript">
var $ = jQuery.noConflict();
$(function() {
$('#tabsmenu').tabify();
$(".toggle_container").hide(); 
$(".trigger").click(function(){
	$(this).toggleClass("active").next().slideToggle("slow");
	return false;
});
});
</script>
-->
<style type="text/css">
    
    td{padding:1px;margin: 0px;}
    body{word-break:break-all;}
</style>
</head>
<body>
<div id="panelwrap">
  	
	<div class="header">
    <div class="title"><a href="#">Panelo Admin</a></div>
    
    <div class="header_right">Welcome <?php echo ($userName); ?>, <a href="#" class="settings">Settings</a> <a href="<?php echo U('/Admin/Index/logout');?>" class="logout">Logout</a> </div>
    
    <div class="menu">
    <ul>
    <li><a href="#" class="selected">管理中心</a></li>
    <li><a href="#">系统配置</a></li>
    <li><a href="#">分类管理</a></li>
    <li style="display:none;"><a href="#">Edit categories</a></li>
    <li style="display:none;"><a href="#">Categories</a></li>
    <li><a href="#">缓存管理</a></li>
    <li><a href="#">友情链接</a></li>
    <li><a href="#">帮助</a></li>
    <li><a href="/" target="_blank">前台首页</a></li>
    </ul>
    </div>
    
    </div>
      
    <div class="center_content">  
 
    <div id="right_wrap">
    <div id="right_content"> 
    <h2>广告设置</h2> 
                    
                    
<table class ="rounded-corner" width="600px" style="overflow-wrap:normal;word-wrap:normal;">
    <thead>
        <tr>
        <th>id</th>
        <th>keyword</th>
        <th>image&url</th>
        <th>name</th>
        <th>remark</th>
        <th>editor</th>
        </tr>
    </thead>
        <tfoot>
        <tr>
            <td colspan="6">这里列出的是广告配置，为防止恶意数据，已经禁用添加和删除操作</td>
        </tr>
    </tfoot>
    <tbody>
    <?php if(empty($ads)): ?><tr>
            <td></td>
            <td></td>
            <td></td>
            <td>没有内容</td>
            <td></td>
    </tr>

    <?php else: ?>
    <?php if(is_array($ads)): $i = 0; $__LIST__ = $ads;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><tr class=" <?php if(($mod) == "1"): ?>even<?php else: ?>odd<?php endif; ?>  ">
        <td><?php echo ($vo["id"]); ?></td>
        <td><?php echo ($vo["keyword"]); ?></td>
        <td><a href="<?php echo ($vo["image"]); ?>" target="_blank" title="<?php echo ($vo["remark"]); ?>"><img src="<?php echo ($vo["image"]); ?>" width="90px"  /></a><br /><?php echo ($vo["url"]); ?></td>
        <td><?php echo ($vo["name"]); ?></td>
        <td><?php echo ($vo["remark"]); ?></td>
        <td><a href="javascript:changeAd(<?php echo ($vo["id"]); ?>)"><img src="/Public/images/edit.png" alt="" title="" border="0" /></a></td>
        </tr><?php endforeach; endif; else: echo "" ;endif; ?>
    <script type="text/javascript">
    function changeAd(id){
            if (parseInt(id)) {
                $.ligerDialog.open({ url: '<?php echo U('/Admin/Index/adManage');?>?type=change'+'&id='+id, title:'编辑配置', height: 600,width: 550, });
            };
    }
    </script><?php endif; ?>
    </tbody>
</table> 
<br />
<!-- end ad -->               
    <h2>系统配置</h2> 
<table class="rounded-corner" width="600px" style="overflow-wrap:normal;word-wrap:normal;">
    <thead>
    	<tr>
        	<th>id</th>
            <th>remark</th>
            <th>name</th>
            <th width="200px">value</th>

            <th>Edit</th>
        </tr>
    </thead>
        <tfoot>
    	<tr>
        	<td colspan="6">这里列出的是系统配置和SEO优化配置，如果不必须，请勿修改,已经尽禁用了删除操作。为防止恶意数据，已经禁用添加操作</td>
        </tr>
    </tfoot>
    <tbody>
    <?php if(empty($configs)): ?><tr>
            <th></th>
            <th></th>
            <th></th>
            <th>没有内容</th>
            <th></th>
            <th></th>
    </tr>

    <?php else: ?>
    <?php if(is_array($configs)): $i = 0; $__LIST__ = $configs;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><tr class=" <?php if(($mod) == "1"): ?>even<?php else: ?>odd<?php endif; ?>  ">
            <td width="20px"><?php echo ($vo["id"]); ?></td>
            <td width="100px"><?php echo ($vo["remark"]); ?></td>
            <td ><?php echo ($vo["name"]); ?></td>
            <td ><div style="width:350px;word-wrap:break-word;word-break:break-all;"><?php echo ($vo["value"]); ?></div></td>
            <td width="40px"><a href="javascript:changeConfig(<?php echo ($vo["id"]); ?>)"><img src="/Public/images/edit.png" alt="" title="" border="0" /></a></td>
            
        </tr><?php endforeach; endif; else: echo "" ;endif; ?>
    <script type="text/javascript">
    function changeConfig(id){
            if (parseInt(id)) {
                $.ligerDialog.open({ url: '<?php echo U('/Admin/Index/configManage');?>?type=change'+'&id='+id, title:'编辑配置', height: 500,width: 550, });
            };
    }
    </script><?php endif; ?>
    </tbody>
</table>

     </div>
     </div><!-- end of right content-->
                    
    <div class="sidebar" id="sidebar">
    <?php if(!empty($users)): ?><h2>管理员列表</h2>
    
        <ul>
            <!--li><a href="#" class="selected">Main page</a></li>
            <li><a href="#">Template settings</a></li>
            <li><a href="#">Add page</a></li>
            <li><a href="#">Edit section</a></li>
            <li><a href="#">Templates</a></li-->
            <?php if(is_array($users)): $i = 0; $__LIST__ = $users;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><li><a href="#" id="user—<?php echo ($vo["name"]); ?>"><?php echo ($vo["name"]); ?>&nbsp;&nbsp;&nbsp;<img src="/Public/images/edit.png" onclick="changePwd(<?php echo ($vo["id"]); ?>)" alt="修改密码" border="0" class="changPwd"  />   &nbsp;&nbsp;&nbsp;<img src="/Public/images/trash.gif" alt="删除用户" onclick="delUser(<?php echo ($vo["id"]); ?>)" border="0" /></a> </li><?php endforeach; endif; else: echo "" ;endif; ?>
            <li><a href="#" id="addUser">新增用户</a></li>
            <script type="text/javascript">
				$("#addUser").click(function(event) {
				 	 $.ligerDialog.open({ height: 400, url: '<?php echo U('/Admin/Index/userManage');?>?type=add', width: 550, showMax: true, showToggle: true, showMin: true, isResize: true, slide: false, title: '添加用户' }); 
				});
				function changePwd(id){
					if (parseInt(id)) {
						$.ligerDialog.open({
							width:550,height:400,url:'<?php echo U('/Admin/Index/userManage/');?>?type=change'+'&userId='+id,showMin:true,showToggle:true,showMax:true,isResize:true,slide:false,title:'编辑用户'
						})
					};
				}
				function delUser(id){
					if (parseInt(id)) {
							$.ligerDialog.open({ url: 'about:blank', title:'你确定删除这个用户吗？', height: 50,width: 200, buttons: [ { text: '确定', onclick: function (item, dialog) { dialog.setUrl('<?php echo U("/Admin/Index/userManage");?>?type=del'+'&userId='+id) } }, { text: '取消', onclick: function (item, dialog) { dialog.close(); } } ] });

					};
				}
            </script>
        </ul><?php endif; ?>
    <?php if(!empty($links)): ?><h2>友情链接</h2>
        <ul>
        	<?php if(is_array($links)): $i = 0; $__LIST__ = $links;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><li><a href="#" title="<?php echo ($vo["url"]); ?>" ><?php $image = $vo["image"]; ?>    <?php if(empty($image)): echo ($vo["name"]); else: ?> <img src="<?php echo ($image); ?>" width="90px"><?php endif; ?>&nbsp;&nbsp;&nbsp;<img src="/Public/images/edit.png"  alt="修改链接" border="0" onclick="changeLink(<?php echo ($vo["id"]); ?>)"  />  &nbsp;&nbsp;&nbsp; <img src="/Public/images/trash.gif"  alt="删除链接" border="0" onclick="delLink(<?php echo ($vo["id"]); ?>)"  /></a></li><?php endforeach; endif; else: echo "" ;endif; ?>
<!--             <li><a href="#">Templates</a></li>
            <li><a href="#">Clients</a></li>
            <li><a href="#">Docs and info</a></li> -->
            <li><a href="#" id="addLink">新增链接</a></li>
        </ul> 
        <script type="text/javascript">
        $('#addLink').click(function(event) {
            $.ligerDialog.open({ url:'<?php echo U('Admin/Index/linkManage/');?>?type=add', title:'新增链接',isResize:true,width:550,height:600});
        });
        function changeLink(id){
            if (parseInt(id)) {
                $.ligerDialog.open( { url:'<?php echo U('Admin/Index/linkManage/');?>?type=change&id='+id, title:'编辑链接',isResize:true,width:550,height:600});
            };
        }
        function delLink(id){
                    if (parseInt(id)) {
                            $.ligerDialog.open({ url: 'about:blank', title:'你确定删除这个链接吗？', height: 180,width: 500, buttons: [ { text: '确定', onclick: function (item, dialog) { dialog.setUrl('<?php echo U("/Admin/Index/linkManage");?>?type=del&id='+id) } }, { text: '取消', onclick: function (item, dialog) { dialog.close(); } } ] });

                    };
                }        
        </script><?php endif; ?>
    
    <h2>管理团队</h2> 
    <div class="sidebar_section_text">
    
    UI NAME    : Panelo - Free Admin<br />
    PHPVersion : Hainuo<br />
      siter    : Zangtao<br />
    Program    : Hainuo<br />
      Q Q      : 399709335
      
    </div>         
    
    </div>                  
    <div class="clear"></div>
    </div> <!--end of center_content-->
<div class="footer">
<?php echo C('site_count');?>
</div>

</div>

    	
</body>
</html>
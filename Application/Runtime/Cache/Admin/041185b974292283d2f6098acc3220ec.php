<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Panelo - Free Admin Template</title>
<link rel="stylesheet" type="text/css" href="/Public/css/style.css" />
<link href='http://fonts.googleapis.com/css?family=Belgrano' rel='stylesheet' type='text/css'>
</head>
<body>
<div id="loginpanelwrap">
  	
	<div class="loginheader">
    <div class="logintitle"><a href="#">Panelo Admin</a></div>
    </div>

<form action="/Admin/Index/login.html" method="post" name="login">
    <div class="loginform">
        
        <div class="loginform_row">
        <label>Username:</label>
        <input type="text" class="loginform_input" name="userName" />
        </div>
        <div class="loginform_row">
        <label>Password:</label>
        <input type="password" class="loginform_input" name="password" />
        </div>
        <div class="loginform_row">
        <label>verify:</label>
        <input type="text" class="loginform_input" name="verify" id="verify" />
        </div>        
        <div class="loginform_row">
        <input type="submit" class="loginform_submit" value="Login" />
        <img src="<?php echo U('Admin/Index/buildVerfy');?>" id="verifyImg">
        <a class="reloadverify" title="换一张" href="javascript:void(0)" onclick="fleshVerify();">
                    换一张？
                </a>
        </div> 
        <div class="clear"></div>
    </div>
</form>     

</div>
<script language="JavaScript">
    function fleshVerify() {
        //重载验证码
        var time = new Date().getTime();
        document.getElementById('verifyImg').src = '/admin/Index/buildVerfy/' + time;
    }
 </script>
    	
</body>
</html>
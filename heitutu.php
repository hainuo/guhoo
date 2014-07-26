<?php 
$Shortcut = "[InternetShortcut] 
URL=http://www.heitutu.com/ 
IDList= 
IconFile=http://www.heitutu.com/favicon.ico 
IconIndex=1
[{000214A0-0000-0000-C000-000000000046}] 
Prop3=19,2 "; 
$ua = $_SERVER["HTTP_USER_AGENT"]; 
$filename = "黑兔兔heitutu.com.url"; 
$encoded_filename = urlencode($filename); 
$encoded_filename = str_replace("+", "%20", $encoded_filename); 
header('Content-Type: application/octet-stream'); 
if(preg_match("/MSIE/", $ua)){ header('Content-Disposition: attachment; filename="'.$encoded_filename.'"'); 
}else if(preg_match("/Firefox/", $ua)){ header('Content-Disposition: attachment; filename*="utf8\'\''.$filename.'"'); 
}else{ header('Content-Disposition: attachment; filename="'.$filename.'"'); } 
echo $Shortcut; 
?>
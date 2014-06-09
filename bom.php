<?php 
// 设定你要清除BOM的根目录（会自动扫描所有子目录和文件）
$HOME = dirname(__FILE__);
// 如果是Windows系统，修改为：$WIN = 1;
$WIN = 1;
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>UTF8 BOM 清除器</title>
<style>
body { font-size: 10px; font-family: Arial, Helvetica, sans-serif; background: #FFF; color: #000; }
.FOUND { color: #F30; font-size: 14px; font-weight: bold; }
</style>
</head>
<body>
<?php
$BOMBED = array();
RecursiveFolder($HOME);
echo '<h2>These files had UTF8 BOM, but i cleaned them:</h2><p class="FOUND">';
foreach ($BOMBED as $utf) { echo $utf ."<br />\n"; }
echo '</p>';
// 递归扫描
function RecursiveFolder($sHOME) {
 global $BOMBED, $WIN;
 $win32 = ($WIN == 1) ? "\\" : "/";
 $folder = dir($sHOME);
 $foundfolders = array();
 while ($file = $folder->read()) {
  if($file != "." and $file != "..") {
   if(filetype($sHOME . $win32 . $file) == "dir"){
    $foundfolders[count($foundfolders)] = $sHOME . $win32 . $file;
   } else {
    $content = file_get_contents($sHOME . $win32 . $file);
    $BOM = SearchBOM($content);
    if ($BOM) {
     $BOMBED[count($BOMBED)] = $sHOME . $win32 . $file;
     // 移出BOM信息
     $content = substr($content,3);
     // 写回到原始文件
     file_put_contents($sHOME . $win32 . $file, $content);
    }
   }
  }
 }
 $folder->close();
 if(count($foundfolders) > 0) {
  foreach ($foundfolders as $folder) {
   RecursiveFolder($folder, $win32);
  }
 }
}
// 搜索当前文件是否有BOM
function SearchBOM($string) { 
  if(substr($string,0,3) == pack("CCC",0xef,0xbb,0xbf)) return true;
  return false; 
}
?>
</body>
</html>